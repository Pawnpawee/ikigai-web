"use client";
import {
  m,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { Howl } from "howler";
import { useEffect, useRef } from "react";
import { useAudio } from "@/app/contexts/AudioContext";
import { useUI } from "@/app/contexts/UIStarContext";
import JobApplication1 from "./JobApplication_1";
import JobApplication2 from "./JobApplication_2";

export default function JobApplication() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const { setShowStars } = useUI();
  const { playSfx, stopAllSfx, sfxVolume, isMuted } = useAudio();

  //? Ref for looping clock sound
  const clockSoundRef = useRef<Howl | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  //? Initialize clock sound (looping)
  useEffect(() => {
    clockSoundRef.current = new Howl({
      src: ["/assets/Sound/1-2/clock-ticking.mp3"],
      loop: true,
      volume: sfxVolume / 100,
    });

    return () => {
      clockSoundRef.current?.unload();
    };
  }, [sfxVolume]);

  //? Play/stop clock sound based on view and mute state
  useEffect(() => {
    const clockSound = clockSoundRef.current;
    if (!clockSound) return;

    //! ถ้าไม่อยู่ใน view หรือถูก mute ให้หยุดเสียงทันที
    if (!isInView || isMuted) {
      if (clockSound.playing()) {
        clockSound.fade(clockSound.volume(), 0, 500);
        setTimeout(() => clockSound.stop(), 500);
      }
    }
    //? ถ้าอยู่ใน view และไม่ถูก mute ให้เล่นเสียง
    else {
      if (!clockSound.playing()) {
        clockSound.fade(0, sfxVolume / 100, 500);
        clockSound.play();
      }
    }
  }, [isInView, isMuted, sfxVolume]);

  //? Alternating page-flip and typing sounds (play 1 time, pause 5 sec, alternate)
  useEffect(() => {
    //! หยุดเสียง SFX ทั้งหมดถ้าไม่อยู่ใน view หรือถูก mute
    if (!isInView || isMuted) {
      stopAllSfx();
      return;
    }

    let isPageFlip = true;
    let timeoutId: NodeJS.Timeout;

    const playAlternatingSound = () => {
      if (isPageFlip) {
        playSfx("/assets/Sound/1-2/page-flip.mp3");
      } else {
        playSfx("/assets/Sound/1-2/typing-on-laptop.mp3");
      }
      isPageFlip = !isPageFlip;

      timeoutId = setTimeout(playAlternatingSound, 5000);
    };

    // Start the alternating pattern
    playAlternatingSound();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      stopAllSfx(); //? หยุดเสียงที่เหลือตอน cleanup
    };
  }, [isInView, isMuted, playSfx, stopAllSfx]);

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.947, 1],
    [0, 1, 1, 0],
  );

  const opacity_bg = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.97, 1],
    [0, 0, 1, 1, 0],
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const isJobApplicationVisible = latest > 0.1;

    if (isJobApplicationVisible) {
      setShowStars(false);
    }
  });

  return (
    <m.div
      ref={ref}
      className="w-screen relative h-[950vh]"
      style={{ opacity }}
    >
      {/* bg */}
      <m.div
        className="absolute w-screen inset-0 bg-s1"
        style={{
          opacity: opacity_bg,
        }}
      />
      <m.div
        className="
          sticky 
          w-[200%]                      
          top-[calc(100vh-112.5vw)]      
          
          md:w-[85vw]                    
          md:mx-auto                   
          md:top-[calc(100vh-95.625vw)]  

          portrait:fixed
          portrait:w-[150%]
          portrait:md:top-[-45%]
          portrait:top-[-8%]
          portrait:left-1/5
          
        "
      >
        <JobApplication1 scrollYProgress={scrollYProgress} />
        <JobApplication2 scrollYProgress={scrollYProgress} />
      </m.div>

      {/* Light overlay */}
      <m.div
        className="absolute w-screen inset-0 mix-blend-soft-light pointer-events-none opacity-80"
        style={{
          backgroundColor: "var(--color-overlay)",
          opacity: opacity_bg,
        }}
      />
    </m.div>
  );
}
