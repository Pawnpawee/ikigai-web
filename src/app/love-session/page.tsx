"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useLayoutEffect, useRef } from "react";
import Cover from "@/app/components/reusable/Cover";
import { COVER_SESSION1_ITEMS } from "@/app/data/cover_session1.data";
import { useAudio } from "../contexts/AudioContext";
import S6_1 from "./s6_1";
import { useUI } from "../contexts/UIStarContext";

export default function SessionLovePage() {
  //? Cover Section (0-200vh)
  const coverRef = useRef<HTMLDivElement>(null);
  const { setShowStars } = useUI();
  const { scrollYProgress: coverProgress } = useScroll({
    target: coverRef,
    offset: ["start start", "end end"],
  });

  //? S6_1 Section (300-900vh)
  const s6Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: s6Progress } = useScroll({
    target: s6Ref,
    offset: ["start start", "end end"],
  });

  const { setBgMusic, isMuted } = useAudio();

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

  useMotionValueEvent(s6Progress, "change", (latest) => {
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
          sessionText="session 1"
        />
      </div>

      {/* S6_1 Section - 600vh */}
      <div ref={s6Ref} className="h-[600vh] w-full">
        <S6_1 scrollYProgress={s6Progress} />
      </div>
    </div>
  );
}
