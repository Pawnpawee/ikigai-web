"use client";

import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Cover from "@/app/components/reusable/Cover";
import {
  COVER_SESSION4_CONFIG,
  COVER_SESSION4_ITEMS,
} from "@/app/data/cover_session4.data";
import { useStarsVisibility } from "@/app/hooks/useStarsVisibility";
import { API_BASE_URL } from "@/utils/appConfig";
import { getAudioUrl } from "@/utils/cloudinaryUtils";
import ErrorModal from "../components/modal/ErrorModal";
import LoadingScreen from "../components/reusable/LoadingScreen";
import ProgressBar from "../components/reusable/ProgressBar";
import ScrollTo from "../components/ScrollTo";
import { useAudio } from "../contexts/AudioContext";
import { useUser } from "../contexts/UserContext";
import type { S9_1Data } from "./s9_1";
import type { S9_2Data } from "./s9_2";
import type { S9_3Data } from "./s9_3";

//? Lazy load below-the-fold sections — reduces initial JS
const S9_1 = dynamic(() => import("./s9_1"), {
  ssr: false,
  loading: () => null,
});
const S9_2 = dynamic(() => import("./s9_2"), {
  ssr: false,
  loading: () => null,
});
const S9_3 = dynamic(() => import("./s9_3"), {
  ssr: false,
  loading: () => null,
});

//! ─── Types ─────────────────────────────────────────
//? PaidData รวมข้อมูลจากทุก section ก่อนส่ง API
export interface PaidData {
  everPaidAnswer: string;
  selectedJobCards: string[];
  monetizableExperience: string;
}

//? Total scroll height = Cover(200vh) + S9_1(400vh) + S9_2(200vh) + S9_3(200vh) = 1000vh
const TOTAL_HEIGHT_VH = 1000;

export default function PaidSessionPage() {
  //? Single ref for entire page
  const ref = useRef<HTMLDivElement>(null);
  const { setBgMusic, playSfx, stopAllSfx } = useAudio();
  const { userId, isLoading } = useUser();
  const lenis = useLenis();
  const router = useRouter();
  const [, setActiveSceneIndex] = useState(0);

  const [isS9_1Completed, setIsS9_1Completed] = useState(false);
  const [isS9_2Completed, setIsS9_2Completed] = useState(false);
  const [s9_1Data, setS9_1Data] = useState<S9_1Data | null>(null);
  const [s9_2Data, setS9_2Data] = useState<S9_2Data | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrollLockMessage, setScrollLockMessage] = useState<string | null>(
    null,
  );
  const scrollLockMessageRef = useRef<string | null>(null);

  //? SFX tracking ref สำหรับเสียง ambient (market + person_walking)
  const hasPlayedAmbient = useRef(false);

  //? Single scrollYProgress for entire page (0-1 for 1000vh)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  //? Transform scrollYProgress to section-specific ranges
  //? Cover: 0-200vh → 0 to 0.333
  const coverProgress = useTransform(
    scrollYProgress,
    [0, 200 / TOTAL_HEIGHT_VH],
    [0, 1],
  );
  //? S9_1: 200-600vh → progress 0.20 to 0.60
  const s9_1Progress = useTransform(
    scrollYProgress,
    [200 / TOTAL_HEIGHT_VH, 600 / TOTAL_HEIGHT_VH],
    [0, 1],
  );
  //? S9_2: 600-800vh → progress 0.60 to 0.80
  const s9_2Progress = useTransform(
    scrollYProgress,
    [600 / TOTAL_HEIGHT_VH, 800 / TOTAL_HEIGHT_VH],
    [0, 1],
  );
  //? S9_3: 800-1000vh → progress 0.80 to 1.0
  const s9_3Progress = useTransform(
    scrollYProgress,
    [800 / TOTAL_HEIGHT_VH, 1],
    [0, 1],
  );
  const scrollToOpacity = useTransform(
    scrollYProgress,
    [0, 0.9, 0.98, 1],
    [1, 1, 0, 0],
  );

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  const isResettingScroll = useRef(false);

  //? Scroll lock: ไม่ให้ scroll ผ่าน S9_1 ถ้ายังไม่ตอบคำถาม
  useEffect(() => {
    if (!lenis || !ref.current) return;

    const setLockMessage = (message: string | null) => {
      if (scrollLockMessageRef.current === message) return;
      scrollLockMessageRef.current = message;
      setScrollLockMessage(message);
    };

    const handleScroll = (e: {
      scroll: number;
      animatedScroll: number;
      velocity: number;
    }) => {
      if (!ref.current) return;

      if (isResettingScroll.current) {
        return;
      }

      const scrollStart = ref.current.offsetTop;
      const sectionHeight = ref.current.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = sectionHeight - viewportHeight;
      const tolerance = 2;

      //? Lock S9_1: ไม่ให้ scroll ผ่าน S9_1 ถ้ายังไม่ตอบ
      if (!isS9_1Completed) {
        //? S9_1 ends at 600vh → lock at ~93% of S9_1 range
        const s9_1Lock =
          scrollStart + scrollableDistance * (560 / TOTAL_HEIGHT_VH);
        if (e.animatedScroll >= s9_1Lock - tolerance) {
          setLockMessage("ยังเลื่อนไปต่อไม่ได้ เลือกคำตอบในส่วนแรกก่อน");
        } else {
          setLockMessage(null);
        }
        if (e.animatedScroll > s9_1Lock + tolerance) {
          isResettingScroll.current = true;
          lenis.scrollTo(s9_1Lock, {
            immediate: true,
            force: true,
            lock: true,
            onComplete: () => {
              requestAnimationFrame(() => {
                isResettingScroll.current = false;
              });
            },
          });
          return;
        }
      }

      //? Lock S9_2: ไม่ให้ scroll ผ่าน S9_2 ถ้ายังไม่เลือก job cards
      if (isS9_1Completed && !isS9_2Completed) {
        //? S9_2 ends at 800vh → lock at ~93% of S9_2 range
        const s9_2Lock =
          scrollStart + scrollableDistance * (700 / TOTAL_HEIGHT_VH);
        if (e.animatedScroll >= s9_2Lock - tolerance) {
          setLockMessage("ยังเลื่อนไปต่อไม่ได้ เลือกสาขาอาชีพอย่างน้อย 1 ข้อ");
        } else {
          setLockMessage(null);
        }
        if (e.animatedScroll > s9_2Lock + tolerance) {
          isResettingScroll.current = true;
          lenis.scrollTo(s9_2Lock, {
            immediate: true,
            force: true,
            lock: true,
            onComplete: () => {
              requestAnimationFrame(() => {
                isResettingScroll.current = false;
              });
            },
          });
          return;
        }
      }

      setLockMessage(null);
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis, isS9_1Completed, isS9_2Completed]);

  //? Check user authentication
  useEffect(() => {
    if (!isLoading && !userId) {
      router.push("/prologue/into-dark");
    }
  }, [userId, isLoading, router]);

  //? ตั้งเพลง bg ทุกครั้งที่เข้าหน้า ไม่ว่าจะ mute หรือไม่ เพื่อให้ soundRef ตรงกับหน้าปัจจุบัน
  useEffect(() => {
    setBgMusic(getAudioUrl("Sound/9/travel_inarab.mp3"));
  }, [setBgMusic]);

  //? Cleanup: หยุด SFX ทั้งหมดเมื่อออกจากหน้า (ป้องกันเสียง ambient หลุดไปหน้าถัดไป)
  useEffect(() => {
    return () => {
      stopAllSfx();
    };
  }, [stopAllSfx]);

  //? เล่นเสียง ambient (market + person_walking) ตลอด S9_1-S9_3
  //? Cover จบที่ 200/1000 = 0.2 → เริ่มเล่นหลัง Cover
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 200 / TOTAL_HEIGHT_VH) {
      setActiveSceneIndex(0);
    } else if (latest < 600 / TOTAL_HEIGHT_VH) {
      setActiveSceneIndex(1);
    } else if (latest < 800 / TOTAL_HEIGHT_VH) {
      setActiveSceneIndex(2);
    } else {
      setActiveSceneIndex(3);
    }

    if (latest > 0.2 && !hasPlayedAmbient.current) {
      playSfx(getAudioUrl("Sound/9/market.mp3"), { loop: true });
      playSfx(getAudioUrl("Sound/9/person_walking.mp3"), { loop: true });
      hasPlayedAmbient.current = true;
    } else if (latest <= 0.15 && hasPlayedAmbient.current) {
      stopAllSfx();
      hasPlayedAmbient.current = false;
    }
  });

  //? Handler: S9_1 completed (ever paid answer selected)
  const handleS9_1Completed = (data: S9_1Data) => {
    setS9_1Data(data);
    setIsS9_1Completed(true);
    scrollLockMessageRef.current = null;
    setScrollLockMessage(null);
  };

  //? Handler: S9_2 completed (job cards selected)
  const handleS9_2Completed = (data: S9_2Data | null) => {
    if (data) {
      setS9_2Data(data);
      setIsS9_2Completed(true);
      scrollLockMessageRef.current = null;
      setScrollLockMessage(null);
    } else {
      setIsS9_2Completed(false);
    }
  };

  //? Handler: S9_3 completed → combine all data & submit
  const handleS9_3Completed = (data: S9_3Data) => {
    handlePaidSubmit({
      everPaidAnswer: s9_1Data?.everPaidAnswer ?? "",
      selectedJobCards: s9_2Data?.selectedJobCards ?? [],
      monetizableExperience: data.monetizableExperience,
    });
  };

  //? Submit paid data to API
  const handlePaidSubmit = async (data: PaidData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/progress/paid`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          everPaidAnswer: data.everPaidAnswer,
          selectedJobCards: data.selectedJobCards,
          monetizableExperience: data.monetizableExperience,
        }),
      });

      if (!response.ok) {
        setIsSubmitting(false);
        setShowErrorModal(true);
        return;
      }

      //? Navigate to next session
      router.push("/journey-temple");
    } catch (error) {
      console.error("Error submitting paid data:", error);
      setIsSubmitting(false);
      setShowErrorModal(true);
    }
  };

  //? Hide stars after Cover section
  useStarsVisibility(scrollYProgress, {
    shouldShow: (p) => p <= 200 / TOTAL_HEIGHT_VH,
  });

  return (
    <div ref={ref} className="h-[1000vh] w-full relative bg-black">
      <ScrollTo
        opacity={scrollToOpacity}
        message={scrollLockMessage ?? "เลื่อนต่อเพื่อดำเนินเรื่อง..."}
        tone={scrollLockMessage ? "warning" : "default"}
        icon={scrollLockMessage ? "lock" : "down"}
      />

      {/* Loading Screen */}
      <LoadingScreen isLoading={isSubmitting} />

      {/* Error Modal */}
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="ขออภัย"
        message="ส่งข้อมูลไม่สำเร็จ กรุณาลองอีกครั้ง"
      />

      {/* Cover Section — 200vh (0-200vh, progress: 0-0.333) */}
      <div className="h-[200vh] w-full">
        <Cover
          scrollYProgress={coverProgress}
          items={COVER_SESSION4_ITEMS}
          titleImage={COVER_SESSION4_CONFIG.titleImage}
          iconImage={COVER_SESSION4_CONFIG.iconImage}
          sessionText={COVER_SESSION4_CONFIG.sessionText}
        />
      </div>

      {/* S9_1 Section — Ever Paid — 400vh (200-600vh, progress: 0.333-1.0) */}
      <div className="h-[400vh] w-full">
        <S9_1
          scrollYProgress={s9_1Progress}
          onCompleted={handleS9_1Completed}
        />
      </div>

      {/* S9_2 Section — Job Cards Selection — 200vh (600-800vh, progress: 0.60-0.80) */}
      <div className="h-[200vh] w-full">
        <S9_2
          scrollYProgress={s9_2Progress}
          onCompleted={handleS9_2Completed}
        />
      </div>

      {/* S9_3 Section — Monetizable Experience — 200vh (800-1000vh, progress: 0.80-1.0) */}
      <div className="h-[200vh] w-full">
        <S9_3
          scrollYProgress={s9_3Progress}
          onCompleted={handleS9_3Completed}
        />
      </div>

      {/* ProgressBar: scrollYProgress ของหน้านี้ */}
      <div className="pointer-events-none">
        <ProgressBar scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
