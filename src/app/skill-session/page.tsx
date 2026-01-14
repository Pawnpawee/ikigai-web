"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Cover from "@/app/components/reusable/Cover";
import {
  COVER_SESSION2_CONFIG,
  COVER_SESSION2_ITEMS,
} from "@/app/data/cover_session2.data";
import { useAudio } from "../contexts/AudioContext";
import { useScroll } from "framer-motion";

export default function SessionLovePage() {
  //? Cover Section (0-200vh)
  const coverRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: coverProgress } = useScroll({
    target: coverRef,
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
      setBgMusic("/assets/Sound/7/living-art.mp3");
    }
  }, [setBgMusic, isMuted]);

  return (
    <div className="w-full relative bg-black">
      {/* Cover Section - 200vh */}
      <div ref={coverRef} className="h-[200vh] w-full">
        <Cover
          scrollYProgress={coverProgress}
          items={COVER_SESSION2_ITEMS}
          titleImage={COVER_SESSION2_CONFIG.titleImage}
          iconImage={COVER_SESSION2_CONFIG.iconImage}
          sessionText={COVER_SESSION2_CONFIG.sessionText}
        />
      </div>
    </div>
  );
}
