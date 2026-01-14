"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useLenis } from "lenis/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Cover from "@/app/components/reusable/Cover";
import {
  COVER_SESSION1_CONFIG,
  COVER_SESSION1_ITEMS,
} from "@/app/data/cover_session1.data";
import { useAudio } from "../contexts/AudioContext";
import { useUI } from "../contexts/UIStarContext";
import S6_1 from "./s6_1";
import S6_4 from "./s6_4";

export default function SessionLovePage() {

  //? Cover Section (0-200vh)
  const coverRef = useRef<HTMLDivElement>(null);
  const { setShowStars } = useUI();
  const { scrollYProgress: coverProgress } = useScroll({
    target: coverRef,
    offset: ["start start", "end end"],
  });

  // //? S6_1 Section (300-900vh)
  const s6_1Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: s6_1Progress } = useScroll({
    target: s6_1Ref,
    offset: ["start start", "end end"],
  });

  const s6_4Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: s6_4Progress } = useScroll({
    target: s6_4Ref,
    offset: ["start start", "end end"],
  });

  const { setBgMusic, isMuted } = useAudio();
  const lenis = useLenis();
  const [isS6_1Completed, setIsS6_1Completed] = useState(false);
  //! Flag เพื่อป้องกัน infinite loop ใน scroll lock
  const isScrollingRef = useRef(false);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (!isMuted) {
      setBgMusic("/assets/Sound/6/majestic-sky.mp3");
    }
  }, [setBgMusic, isMuted]);

  //? Scroll lock effect สำหรับ s6_1
  useEffect(() => {
    if (!lenis || !s6_1Ref.current) return;

    const handleScroll = (e: { scroll: number; animatedScroll: number }) => {
      if (isS6_1Completed || !s6_1Ref.current || isScrollingRef.current) return;

      const scrollStart = s6_1Ref.current.offsetTop;
      const sectionHeight = s6_1Ref.current.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = sectionHeight - viewportHeight;

      //? Lock ที่ poslock % ของ s6_1 section
      const lockThreshold = scrollStart + scrollableDistance * 0.985;
      //! Tolerance เพื่อป้องกันการวนลูป (5px)
      const tolerance = 5;

      if (e.animatedScroll > lockThreshold + tolerance) {
        isScrollingRef.current = true;
        lenis.scrollTo(lockThreshold, {
          immediate: true,
          onComplete: () => {
            //? Reset flag หลังจาก scroll เสร็จ
            setTimeout(() => {
              isScrollingRef.current = false;
            }, 0);
          },
        });
      }
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis, isS6_1Completed]);

  //? Handler: Auto-scroll to s6_4 เมื่อ s6_1 completed
  const handleS6_1Completed = () => {
    setIsS6_1Completed(true);

    if (s6_4Ref.current && lenis) {
      const scrollStart = s6_4Ref.current.offsetTop;
      const scrollableDistance =
        s6_4Ref.current.scrollHeight - window.innerHeight;
      const scrollTarget = scrollStart + scrollableDistance * 0.05;
      lenis.scrollTo(scrollTarget, { duration: 1.5 });
    }
  };

  useMotionValueEvent(s6_1Progress, "change", (latest) => {
    const isScene6 = latest > 0;

    if (isScene6) {
      setShowStars(false);
    }
  });

  return (
    <div className="w-full relative bg-black">
      {/* Cover Section - 200vh */}
      <div ref={coverRef} className="h-[200vh] w-full">
        <Cover
          scrollYProgress={coverProgress}
          items={COVER_SESSION1_ITEMS}
          titleImage={COVER_SESSION1_CONFIG.titleImage}
          iconImage={COVER_SESSION1_CONFIG.iconImage}
          sessionText={COVER_SESSION1_CONFIG.sessionText}
        />
      </div>

      {/* S6_1 Section - 600vh */}
      <div ref={s6_1Ref} className="h-[600vh] w-full">
        <S6_1
          scrollYProgress={s6_1Progress}
          onCompleted={handleS6_1Completed}
        />
      </div>

      {/* S6_4 Section - 700vh */}
      <div ref={s6_4Ref} className="h-[700vh] w-full">
        <S6_4 scrollYProgress={s6_4Progress} />
      </div>
    </div>
  );
}
