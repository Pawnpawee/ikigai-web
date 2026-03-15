"use client";

import { useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Cover from "@/app/components/reusable/Cover";
import {
  COVER_SESSION1_CONFIG,
  COVER_SESSION1_ITEMS,
} from "@/app/data/cover_session1.data";
import { useStarsVisibility } from "@/app/hooks/useStarsVisibility";
import { API_BASE_URL } from "@/utils/appConfig";
import { getAudioUrl } from "@/utils/cloudinaryUtils";
import ErrorModal from "../components/modal/ErrorModal";
import LoadingScreen from "../components/reusable/LoadingScreen";
import ProgressBar from "../components/reusable/ProgressBar";
import ScrollTo from "../components/ScrollTo";
import { useAudio } from "../contexts/AudioContext";
import { useUser } from "../contexts/UserContext";
import type { S6_1Data } from "./s6_1";

//? Lazy load below-the-fold sections — reduces initial JS
const S6_1 = dynamic(() => import("./s6_1"), {
  ssr: false,
  loading: () => null,
});
const S6_4 = dynamic(() => import("./s6_4"), {
  ssr: false,
  loading: () => null,
});

export default function SessionLovePage() {
  //? Single ref for entire page
  const ref = useRef<HTMLDivElement>(null);
  const { setBgMusic } = useAudio();
  const { userId, isLoading } = useUser();
  const lenis = useLenis();
  const router = useRouter();

  const [isS6_1Completed, setIsS6_1Completed] = useState(false);
  const [s6_1Data, setS6_1Data] = useState<S6_1Data | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScrollLockedByGate, setIsScrollLockedByGate] = useState(false);
  const isScrollLockedByGateRef = useRef(false);

  //? Single scrollYProgress for entire page (0-1 for 1500vh)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  //? Transform scrollYProgress to section-specific ranges
  // Cover: 0-0.133 → 0-1
  const coverProgress = useTransform(scrollYProgress, [0, 0.133], [0, 1]);
  // S6_1: 0.133-0.533 → 0-1
  const s6_1Progress = useTransform(scrollYProgress, [0.133, 0.533], [0, 1]);
  // S6_4: 0.533-1.0 → 0-1
  const s6_4Progress = useTransform(scrollYProgress, [0.533, 1.0], [0, 1]);
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

  //? ตั้งเพลง bg ทุกครั้งที่เข้าหน้า ไม่ว่าจะ mute หรือไม่ เพื่อให้ soundRef ตรงกับหน้าปัจจุบัน
  useEffect(() => {
    setBgMusic(getAudioUrl("Sound/6/majestic-sky.mp3"));
  }, [setBgMusic]);

  const isResettingScroll = useRef(false);

  //? Scroll lock effect สำหรับ s6_1
  useEffect(() => {
    if (!lenis || !ref.current) return;

    const setLockHint = (locked: boolean) => {
      if (isScrollLockedByGateRef.current === locked) return;
      isScrollLockedByGateRef.current = locked;
      setIsScrollLockedByGate(locked);
    };

    const handleScroll = (e: {
      scroll: number;
      animatedScroll: number;
      velocity: number;
    }) => {
      if (isS6_1Completed || !ref.current) {
        setLockHint(false);
        return;
      }

      if (isResettingScroll.current) {
        //? ระหว่างเด้งกลับจาก lock ให้คงสถานะ lock ไว้ เพื่อไม่ให้ข้อความสลับกลับ
        setLockHint(true);
        return;
      }

      const scrollStart = ref.current.offsetTop;
      const sectionHeight = ref.current.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = sectionHeight - viewportHeight;

      //? Lock ที่ 0.72 (90% ของ s6_1 section)
      // Cover = 200vh, S6_1 = 600vh → Total before S6_4 = 800vh
      // S6_1 lock at 90%: (200 + 600*0.9) / 1500 = 740/1500 ≈ 0.72
      const lockThreshold = scrollStart + scrollableDistance * 0.5;

      const tolerance = 2;

      if (e.animatedScroll >= lockThreshold - tolerance) {
        setLockHint(true);
      } else {
        setLockHint(false);
      }

      if (e.animatedScroll > lockThreshold + tolerance) {
        isResettingScroll.current = true;

        lenis.scrollTo(lockThreshold, {
          immediate: true,
          force: true,
          lock: true,

          onComplete: () => {
            requestAnimationFrame(() => {
              isResettingScroll.current = false;
            });
          },
        });
      }
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis, isS6_1Completed]);

  useEffect(() => {
    //? เช็คว่ามี userId จาก Context หรือไม่
    if (!isLoading && !userId) {
      router.push("/prologue/into-dark");
    }
  }, [userId, isLoading, router]);

  //? Handler: S6_1 status change (hobbies selected/unselected)
  const handleS6_1Completed = (data: S6_1Data | null) => {
    if (data) {
      //? เก็บข้อมูล hobbies ที่ user เลือก
      setS6_1Data(data);
      setIsS6_1Completed(true);

      if (ref.current && lenis) {
        const scrollStart = ref.current.offsetTop;
        const scrollableDistance =
          ref.current.scrollHeight - window.innerHeight;
        //? Scroll to start of S6_4 section (at 0.55 = 800vh / 1500vh)
        const scrollTarget = scrollStart + scrollableDistance * 0.56;
        lenis.scrollTo(scrollTarget, { duration: 1.5 });
      }
    } else {
      //! Unselect ต่ำกว่า threshold → ล็อค scroll กลับ
      setIsS6_1Completed(false);
    }
  };

  //? Handler: Navigate to next session after s6_4 completed
  const handleS6_4Continue = async (selectedChoice: string) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/progress/love`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          selectedHobbies: s6_1Data?.selectedHobbies,
          customHobbies: s6_1Data?.customHobbies,
          topThreeHobbies: s6_1Data?.topThreeHobbies,
          dreamAnswer: selectedChoice,
        }),
      });

      if (!response.ok) {
        setIsSubmitting(false);
        setShowErrorModal(true);
        return;
      }

      router.push("/skill-session");
    } catch (error) {
      console.error("Error submitting data:", error);
      setIsSubmitting(false);
      setShowErrorModal(true);
    }
  };

  //? Hide stars when entering S6_1 section (after 0.133)
  useStarsVisibility(scrollYProgress, {
    shouldShow: (p) => p <= 0.133,
  });

  return (
    <div ref={ref} className="h-[1500vh] w-full relative bg-black">
      <ScrollTo
        opacity={scrollToOpacity}
        message={
          !isS6_1Completed && isScrollLockedByGate
            ? "ยังเลื่อนไปต่อไม่ได้ เลือกอย่างน้อย 1 ข้อ"
            : "เลื่อนต่อเพื่อดำเนินเรื่อง..."
        }
        tone={!isS6_1Completed && isScrollLockedByGate ? "warning" : "default"}
        icon={!isS6_1Completed && isScrollLockedByGate ? "lock" : "down"}
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

      {/* Cover Section - 200vh (0-200vh, progress: 0-0.133) */}
      <div className="h-[200vh] w-full">
        <Cover
          scrollYProgress={coverProgress}
          items={COVER_SESSION1_ITEMS}
          titleImage={COVER_SESSION1_CONFIG.titleImage}
          iconImage={COVER_SESSION1_CONFIG.iconImage}
          sessionText={COVER_SESSION1_CONFIG.sessionText}
        />
      </div>

      {/* S6_1 Section - 600vh (200-800vh, progress: 0.133-0.533) */}
      <div className="h-[600vh] w-full">
        <S6_1
          scrollYProgress={s6_1Progress}
          onCompleted={handleS6_1Completed}
        />
      </div>

      {/* S6_4 Section - 700vh (800-1500vh, progress: 0.533-1.0) */}
      <div className="h-[700vh] w-full">
        <S6_4 scrollYProgress={s6_4Progress} onContinue={handleS6_4Continue} />
      </div>

      {/* ProgressBar: scrollYProgress ของหน้านี้ */}
      <div className="pointer-events-none">
        <ProgressBar scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
