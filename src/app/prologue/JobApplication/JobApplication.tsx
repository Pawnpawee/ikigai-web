"use client";
import { useScroll, MotionValue, motion, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import JobApplication1 from "./JobApplication_1";
import JobApplication2 from "./JobApplication_2";
import { useAudio } from "@/app/contexts/AudioContext";
import { useSoundEffect } from "@/app/hooks/useSoundEffect";

export default function JobApplication() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const { animationsStarted } = useAudio();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const { playSoundEffect: playClock, stopSoundEffect: stopClock } = useSoundEffect({
    soundPath: "/assets/Sound/1-2/clock-ticking.mp3",
    fadeDurationMs: 500,
    loop: true,
    volume: 1,
  });

  // Sound effects - alternating sounds
  const { playSoundEffect: playPageFlip } = useSoundEffect({
    soundPath: "/assets/Sound/1-2/page-flip.mp3",
    fadeDurationMs: 200,
    loop: false,
  });

  const { playSoundEffect: playTyping } = useSoundEffect({
    soundPath: "/assets/Sound/1-2/typing-on-laptop.mp3",
    fadeDurationMs: 200,
    loop: false,
    volume: 0.4, // ปรับเสียง 40%
  });

  // Play loop sounds when in view
  useEffect(() => {
    if (isInView && animationsStarted) {
      playClock();
    } else {
      stopClock();
    }

    return () => {
      stopClock();
    };
  }, [isInView, animationsStarted,  playClock, stopClock]);

  // Alternating page-flip and typing sounds (play 1 time, pause 3 sec, alternate)
  useEffect(() => {
    if (!isInView || !animationsStarted) return;

    let isPageFlip = true;
    let timeoutId: NodeJS.Timeout;

    const playAlternatingSound = () => {
      if (isPageFlip) {
        playPageFlip();
      } else {
        playTyping();
      }
      isPageFlip = !isPageFlip;
      
      timeoutId = setTimeout(playAlternatingSound, 5000);
    };

    // Start the alternating pattern
    playAlternatingSound();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isInView, animationsStarted, playPageFlip, playTyping]);

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.947, 1],
    [0, 1, 1, 0]
  );

  const opacity_light = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.97, 1],
    [0, 0, 0.5, 0.5, 0]
  );

  return (
    <motion.div
      ref={ref}
      className="relative h-[950vh] z-2"
      style={{ opacity }}
    >
      {/* bg */}
      <motion.div
        className="absolute w-screen inset-0 bg-s1"
        style={{
          opacity: opacity_light,
        }}
      />
      <motion.div
        className="
          sticky 
          w-[200%]                      
          top-[calc(100vh-112.5vw)]      
          
          lg:w-[85vw]                    
          lg:mx-auto                   
          lg:top-[calc(100vh-95.625vw)]  

          portrait:fixed
          portrait:w-[150%]
          portrait:md:top-[-45%]
          portrait:top-[-8%]
          portrait:left-1/5
          
        "
      >
        <JobApplication1 scrollYProgress={scrollYProgress} />
        <JobApplication2 scrollYProgress={scrollYProgress} />
      </motion.div>
      {/* Light overlay */}
      <motion.div
        className="absolute w-screen inset-0 mix-blend-soft-light pointer-events-none"
        style={{
          backgroundColor: "var(--color-overlay)",
          opacity: opacity_light,
        }}
      />
    </motion.div>
  );
}
