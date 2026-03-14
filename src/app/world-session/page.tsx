"use client";

import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Cover from "@/app/components/reusable/Cover";
import {
  COVER_SESSION3_CONFIG,
  COVER_SESSION3_ITEMS,
} from "@/app/data/cover_session3.data";
import { useStarsVisibility } from "@/app/hooks/useStarsVisibility";
import { API_BASE_URL } from "@/utils/appConfig";
import { getAudioUrl } from "@/utils/cloudinaryUtils";
import ErrorModal from "../components/modal/ErrorModal";
import LoadingScreen from "../components/reusable/LoadingScreen";
import ProgressBar from "../components/reusable/ProgressBar";
import ScrollTo from "../components/ScrollTo";
import { useAudio } from "../contexts/AudioContext";
import { useUser } from "../contexts/UserContext";
import S8_1, { type S8_1Data } from "./s8_1";
import S8_2, { type S8_2Data } from "./s8_2";
import S8_3 from "./s8_3";
import S8_4, { type S8_4Data } from "./s8_4";
import S8_5, { type S8_5Data } from "./s8_5";

// ────────────────────────────────────────────────────
//  WorldData: accumulated data from all sections
// ────────────────────────────────────────────────────

export interface WorldData {
  calledUponAnswer: string;
  selectedGifts: string[];
  customGifts: string[];
  noManualChoice: string;
  mismatchChoice: string;
  futureValueAnswer: string;
}

export default function WorldSessionPage() {
  //? Single ref for entire page
  const ref = useRef<HTMLDivElement>(null);
  const { userId, isLoading } = useUser();
  const { setBgMusic, playSfx, stopAllSfx } = useAudio();
  const lenis = useLenis();
  const router = useRouter();
  const [, setActiveSceneIndex] = useState(0);

  //? SFX tracking ref สำหรับเสียง ambient (river_flow + bird_sound)
  const hasPlayedAmbient = useRef(false);

  const [isS8_1Completed, setIsS8_1Completed] = useState(false);
  const [isS8_2Completed, setIsS8_2Completed] = useState(false);
  //? S8_3 is purely visual — no completion state needed
  const [isS8_4_Q1Completed, setIsS8_4_Q1Completed] = useState(false);
  const [isS8_4Completed, setIsS8_4Completed] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrollLockMessage, setScrollLockMessage] = useState<string | null>(
    null,
  );
  const scrollLockMessageRef = useRef<string | null>(null);

  //? Accumulated data from each section
  const [s8_1Data, setS8_1Data] = useState<S8_1Data | null>(null);
  const [s8_2Data, setS8_2Data] = useState<S8_2Data | null>(null);
  const [s8_4Data, setS8_4Data] = useState<S8_4Data | null>(null);

  //? Single scrollYProgress for entire page (0-1 for 2100vh)
  //? Cover 200vh + S8_1 700vh + S8_2 200vh + S8_3 300vh + S8_4 300vh + S8_5 400vh = 2100vh
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  //? Transform scrollYProgress to section-specific ranges (proportional to height)
  //? Cover: 0 → 200/2100 ≈ 0.0952
  const coverProgress = useTransform(scrollYProgress, [0, 0.0952], [0, 1]);
  //? S8_1: 200/2100 ≈ 0.0952 → 900/2100 ≈ 0.4286
  const s8_1Progress = useTransform(scrollYProgress, [0.0952, 0.4286], [0, 1]);
  //? S8_2: 900/2100 ≈ 0.4286 → 1100/2100 ≈ 0.5238
  const s8_2Progress = useTransform(scrollYProgress, [0.4286, 0.5238], [0, 1]);
  //? S8_3: 1100/2100 ≈ 0.5238 → 1400/2100 ≈ 0.6667
  const s8_3Progress = useTransform(scrollYProgress, [0.5238, 0.6667], [0, 1]);
  //? S8_4: 1400/2100 ≈ 0.6667 → 1700/2100 ≈ 0.8095
  const s8_4Progress = useTransform(scrollYProgress, [0.6667, 0.8095], [0, 1]);
  //? S8_5: 1700/2100 ≈ 0.8095 → 2100/2100 = 1.0
  const s8_5Progress = useTransform(scrollYProgress, [0.8095, 1.0], [0, 1]);
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

  //? Scroll lock: ล็อคไม่ให้ scroll ผ่าน S8_1 ถ้ายังไม่ตอบคำถาม
  //? Total 900vh, scrollableDistance = 800vh
  //? S8_1 lock at end of section
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

      //? Lock S8_1: prevent scrolling past S8_1 until answered (at 900/2100 ≈ 0.4286)
      if (!isS8_1Completed) {
        const s8_1Lock = scrollStart + scrollableDistance * 0.42;
        if (e.animatedScroll >= s8_1Lock - tolerance) {
          setLockMessage("ยังเลื่อนไปต่อไม่ได้ ตอบคำถามในส่วนแรกก่อน");
        } else {
          setLockMessage(null);
        }
        if (e.animatedScroll > s8_1Lock + tolerance) {
          isResettingScroll.current = true;
          lenis.scrollTo(s8_1Lock, {
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

      //? Lock S8_2: prevent scrolling past S8_2 until gifts selected (at 1100/2100 ≈ 0.5238)
      if (isS8_1Completed && !isS8_2Completed) {
        const s8_2Lock = scrollStart + scrollableDistance * 0.49;
        if (e.animatedScroll >= s8_2Lock - tolerance) {
          setLockMessage(
            "ยังเลื่อนไปต่อไม่ได้ เลือกสิ่งที่อยากมอบให้โลกอย่างน้อย 1 ข้อ",
          );
        } else {
          setLockMessage(null);
        }
        if (e.animatedScroll > s8_2Lock + tolerance) {
          isResettingScroll.current = true;
          lenis.scrollTo(s8_2Lock, {
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

      //? S8_3 is purely visual — no scroll lock needed

      //? Lock S8_4 Q1: prevent scrolling past Q1 until No Manual answered (at 1600/2100 ≈ 0.7619)
      if (isS8_2Completed && !isS8_4_Q1Completed) {
        const s8_4_q1Lock = scrollStart + scrollableDistance * 0.76;
        if (e.animatedScroll >= s8_4_q1Lock - tolerance) {
          setLockMessage("ยังเลื่อนไปต่อไม่ได้ ตอบคำถามข้อแรกให้ครบก่อน");
        } else {
          setLockMessage(null);
        }
        if (e.animatedScroll > s8_4_q1Lock + tolerance) {
          isResettingScroll.current = true;
          lenis.scrollTo(s8_4_q1Lock, {
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

      //? Lock S8_4 Q2: prevent scrolling past S8_4 until Mismatch answered (at 1700/2100 ≈ 0.8095)
      if (isS8_4_Q1Completed && !isS8_4Completed) {
        const s8_4Lock = scrollStart + scrollableDistance * 0.8;
        if (e.animatedScroll >= s8_4Lock - tolerance) {
          setLockMessage("ยังเลื่อนไปต่อไม่ได้ ตอบคำถามข้อที่สองให้ครบก่อน");
        } else {
          setLockMessage(null);
        }
        if (e.animatedScroll > s8_4Lock + tolerance) {
          isResettingScroll.current = true;
          lenis.scrollTo(s8_4Lock, {
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
  }, [
    lenis,
    isS8_1Completed,
    isS8_2Completed,
    isS8_4_Q1Completed,
    isS8_4Completed,
  ]);

  //? Check user authentication
  useEffect(() => {
    if (!isLoading && !userId) {
      router.push("/prologue/into-dark");
    }
  }, [userId, isLoading, router]);

  //? ตั้งเพลง bg ทุกครั้งที่เข้าหน้า ไม่ว่าจะ mute หรือไม่ เพื่อให้ soundRef ตรงกับหน้าปัจจุบัน
  useEffect(() => {
    setBgMusic(getAudioUrl("Sound/8/ancient-egypt.mp3"));
  }, [setBgMusic]);

  //? Cleanup: หยุด SFX ทั้งหมดเมื่อออกจากหน้า (ป้องกันเสียง ambient หลุดไปหน้าถัดไป)
  useEffect(() => {
    return () => {
      stopAllSfx();
    };
  }, [stopAllSfx]);

  //? Handler: S8_1 completed (Called Upon answered)
  const handleS8_1Completed = (data: S8_1Data) => {
    setIsS8_1Completed(true);
    setS8_1Data(data);
    scrollLockMessageRef.current = null;
    setScrollLockMessage(null);
  };

  //? Handler: S8_2 completed (Gifts selected)
  const handleS8_2Completed = (data: S8_2Data | null) => {
    if (data) {
      setIsS8_2Completed(true);
      setS8_2Data(data);
      scrollLockMessageRef.current = null;
      setScrollLockMessage(null);
    } else {
      setIsS8_2Completed(false);
    }
  };

  //? S8_3 is purely visual — no handler needed

  //? Handler: S8_4 Q1 completed (No Manual answered — unlocks Q2 scroll)
  const handleS8_4_Q1Completed = () => {
    setIsS8_4_Q1Completed(true);
    scrollLockMessageRef.current = null;
    setScrollLockMessage(null);
  };

  //? Handler: S8_4 completed (both No Manual + Mismatch answered)
  const handleS8_4Completed = (data: S8_4Data) => {
    setIsS8_4Completed(true);
    setS8_4Data(data);
    scrollLockMessageRef.current = null;
    setScrollLockMessage(null);
  };

  //? Handler: S8_5 completed (Future Value answered — final section, triggers submit)
  const handleS8_5Completed = (data: S8_5Data) => {
    if (!s8_1Data || !s8_2Data || !s8_4Data) return;
    handleWorldSubmit({
      calledUponAnswer: s8_1Data.calledUponAnswer,
      selectedGifts: s8_2Data.selectedGifts,
      customGifts: s8_2Data.customGifts,
      noManualChoice: s8_4Data.noManualChoice,
      mismatchChoice: s8_4Data.mismatchChoice,
      futureValueAnswer: data.futureValueAnswer,
    });
  };

  //? Submit world data to API (all sections 1-5)
  const handleWorldSubmit = async (data: WorldData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/progress/world`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          calledUponAnswer: data.calledUponAnswer,
          selectedGifts: data.selectedGifts,
          customGifts: data.customGifts,
          noManualChoice: data.noManualChoice,
          mismatchChoice: data.mismatchChoice,
          futureValueAnswer: data.futureValueAnswer,
        }),
      });

      if (!response.ok) {
        setIsSubmitting(false);
        setShowErrorModal(true);
        return;
      }

      //? Navigate to next session
      router.push("/paid-session");
    } catch (error) {
      console.error("Error submitting world data:", error);
      setIsSubmitting(false);
      setShowErrorModal(true);
    }
  };

  //? Hide stars after Cover section (200/2100 ≈ 0.0952)
  useStarsVisibility(scrollYProgress, {
    shouldShow: (p) => p <= 0.0952,
  });

  //? เล่นเสียง ambient (river_flow + bird_sound) ตลอด S8_1-S8_5
  //? เริ่มเมื่อเข้า S8_1 (progress > 0.0952), หยุดเมื่อออกจาก page
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.0952) {
      setActiveSceneIndex(0);
    } else if (latest < 0.4286) {
      setActiveSceneIndex(1);
    } else if (latest < 0.5238) {
      setActiveSceneIndex(2);
    } else if (latest < 0.6667) {
      setActiveSceneIndex(3);
    } else if (latest < 0.8095) {
      setActiveSceneIndex(4);
    } else {
      setActiveSceneIndex(5);
    }

    if (latest > 0.0952 && !hasPlayedAmbient.current) {
      playSfx(getAudioUrl("Sound/8/river_flow.mp3"), { loop: true });
      playSfx(getAudioUrl("Sound/8/bird_sound.mp3"), { loop: true });
      hasPlayedAmbient.current = true;
    } else if (latest <= 0.05 && hasPlayedAmbient.current) {
      stopAllSfx();
      hasPlayedAmbient.current = false;
    }
  });

  return (
    <div ref={ref} className="h-[2100vh] w-full relative bg-black">
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

      {/* Cover Section — 200vh (0-200vh, progress: 0-0.0952) */}
      <div className="h-[200vh] w-full">
        <Cover
          scrollYProgress={coverProgress}
          items={COVER_SESSION3_ITEMS}
          titleImage={COVER_SESSION3_CONFIG.titleImage}
          iconImage={COVER_SESSION3_CONFIG.iconImage}
          sessionText={COVER_SESSION3_CONFIG.sessionText}
        />
      </div>

      {/* S8_1 Section — Called Upon — 700vh (200-900vh, progress: 0.0952-0.4286) */}
      <div className="h-[700vh] w-full">
        <S8_1
          scrollYProgress={s8_1Progress}
          onCompleted={handleS8_1Completed}
        />
      </div>

      {/* S8_2 Section — Select Gifts — 200vh (900-1100vh, progress: 0.4286-0.5238) */}
      <div className="h-[200vh] w-full">
        <S8_2
          scrollYProgress={s8_2Progress}
          onCompleted={handleS8_2Completed}
        />
      </div>

      {/* S8_3 Section — Visual Transition — 300vh (1100-1400vh, progress: 0.5238-0.6667) */}
      <div className="h-[300vh] w-full">
        <S8_3 scrollYProgress={s8_3Progress} />
      </div>

      {/* S8_4 Section — No Manual + Mismatch — 300vh (1400-1700vh, progress: 0.6667-0.8095) */}
      <div className="h-[300vh] w-full">
        <S8_4
          scrollYProgress={s8_4Progress}
          onQ1Completed={handleS8_4_Q1Completed}
          onCompleted={handleS8_4Completed}
        />
      </div>

      {/* S8_5 Section — Future Value — 400vh (1700-2100vh, progress: 0.8095-1.0) */}
      <div className="h-[400vh] w-full">
        <S8_5
          scrollYProgress={s8_5Progress}
          onCompleted={handleS8_5Completed}
        />
      </div>

      {/* ProgressBar: scrollYProgress ของหน้านี้ */}
      <div className="pointer-events-none">
        <ProgressBar scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
