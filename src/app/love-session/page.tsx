"use client";

import { useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
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
import { getSessionUser } from "@/utils/storage";
import { useAudio } from "../contexts/AudioContext";
import S6_1, { type S6_1Data } from "./s6_1";
import S6_4 from "./s6_4";

export default function SessionLovePage() {
  //? Single ref for entire page
  const ref = useRef<HTMLDivElement>(null);
  const { setBgMusic, isMuted } = useAudio();
  const lenis = useLenis();
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  const [isS6_1Completed, setIsS6_1Completed] = useState(false);
  const [s6_1Data, setS6_1Data] = useState<S6_1Data | null>(null);

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

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (!isMuted) {
      setBgMusic(getAudioUrl("Sound/6/majestic-sky.mp3"));
    }
  }, [setBgMusic, isMuted]);

  const isResettingScroll = useRef(false);

  //? Scroll lock effect สำหรับ s6_1
  useEffect(() => {
    if (!lenis || !ref.current) return;

    const handleScroll = (e: {
      scroll: number;
      animatedScroll: number;
      velocity: number;
    }) => {
      if (isS6_1Completed || !ref.current || isResettingScroll.current) return;

      const scrollStart = ref.current.offsetTop;
      const sectionHeight = ref.current.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = sectionHeight - viewportHeight;

      //? Lock ที่ 0.72 (90% ของ s6_1 section)
      // Cover = 200vh, S6_1 = 600vh → Total before S6_4 = 800vh
      // S6_1 lock at 90%: (200 + 600*0.9) / 1500 = 740/1500 ≈ 0.72
      const lockThreshold = scrollStart + scrollableDistance * 0.5;

      const tolerance = 2;

      if (e.animatedScroll > lockThreshold + tolerance && e.velocity > 0) {
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
    //? 1. ดึงข้อมูลจาก Session Storage
    const user = getSessionUser();

    //? 2. เช็คว่ามีข้อมูลไหม?
    if (user?.id) {
      console.log("Found User ID:", user.id);
      setUserId(user.id);
    } else {
      router.push("/prologue/into-dark");
    }
  }, [router]);

  //? Handler: Auto-scroll to s6_4 เมื่อ s6_1 completed
  const handleS6_1Completed = (data: S6_1Data) => {
    //? เก็บข้อมูล hobbies ที่ user เลือก
    setS6_1Data(data);

    setIsS6_1Completed(true);

    if (ref.current && lenis) {
      const scrollStart = ref.current.offsetTop;
      const scrollableDistance = ref.current.scrollHeight - window.innerHeight;
      //? Scroll to start of S6_4 section (at 0.55 = 800vh / 1500vh)
      const scrollTarget = scrollStart + scrollableDistance * 0.56;
      lenis.scrollTo(scrollTarget, { duration: 1.5 });
    }
  };

  //? Handler: Navigate to next session after s6_4 completed
  const handleS6_4Continue = async (selectedChoice: string) => {
    try {
      await fetch(`${API_BASE_URL}/api/user/progress/love`, {
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

      router.push("/skill-session");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  //? Hide stars when entering S6_1 section (after 0.133)
  useStarsVisibility(scrollYProgress, {
    shouldShow: (p) => p <= 0.133,
  });

  return (
    <div ref={ref} className="h-[1500vh] w-full relative bg-black">
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
    </div>
  );
}
