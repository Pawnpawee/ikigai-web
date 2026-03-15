"use client";
import { m, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useAudio } from "@/app/contexts/AudioContext";
import { useStarsVisibility } from "@/app/hooks/useStarsVisibility";
import { getAudioUrl } from "@/utils/cloudinaryUtils";
import JobApplication1 from "./JobApplication_1";
import JobApplication2 from "./JobApplication_2";

export default function JobApplication() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const { playSfx, isMuted } = useAudio();

  //? Ref for looping clock sound
  const clockSoundRef = useRef<ReturnType<typeof playSfx> | null>(null);
  const alternatingSoundRef = useRef<ReturnType<typeof playSfx> | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  //? ใช้ Hook สำหรับจัดการ Stars visibility - Hide stars ตลอดเวลา
  useStarsVisibility(scrollYProgress, {
    shouldShow: () => false,
  });

  //? Play/stop clock sound based on view and mute state
  useEffect(() => {
    const clockSound = clockSoundRef.current;

    //! ถ้าไม่อยู่ใน view หรือถูก mute ให้หยุดเสียงทันที
    if (!isInView || isMuted) {
      if (clockSound?.playing()) {
        clockSound.fade(clockSound.volume(), 0, 500);
        setTimeout(() => {
          clockSound.stop();
          clockSound.unload();
        }, 500);
      }
      clockSoundRef.current = null;
    }
    //? ถ้าอยู่ใน view และไม่ถูก mute ให้เล่นเสียง
    else {
      if (!clockSound?.playing()) {
        const newClockSound = playSfx(
          getAudioUrl("Sound/1-2/clock-ticking.mp3"),
          {
            loop: true,
          },
        );
        if (newClockSound) {
          const targetVolume = newClockSound.volume();
          newClockSound.volume(0);
          newClockSound.fade(0, targetVolume, 500);
          clockSoundRef.current = newClockSound;
        }
      }
    }
  }, [isInView, isMuted, playSfx]);

  //? Alternating page-flip and typing sounds (play 1 time, pause 5 sec, alternate)
  useEffect(() => {
    //! หยุดเสียง SFX ทั้งหมดถ้าไม่อยู่ใน view หรือถูก mute
    if (!isInView || isMuted) {
      alternatingSoundRef.current?.stop();
      alternatingSoundRef.current?.unload();
      alternatingSoundRef.current = null;
      return;
    }

    let isPageFlip = true;
    let timeoutId: NodeJS.Timeout;

    const playAlternatingSound = () => {
      alternatingSoundRef.current?.stop();
      alternatingSoundRef.current?.unload();

      if (isPageFlip) {
        alternatingSoundRef.current = playSfx(
          getAudioUrl("Sound/1-2/page-flip.mp3"),
        );
      } else {
        alternatingSoundRef.current = playSfx(
          getAudioUrl("Sound/1-2/typing-on-laptop.mp3"),
        );
      }
      isPageFlip = !isPageFlip;

      timeoutId = setTimeout(playAlternatingSound, 5000);
    };

    // Start the alternating pattern
    playAlternatingSound();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      alternatingSoundRef.current?.stop();
      alternatingSoundRef.current?.unload();
      alternatingSoundRef.current = null;
    };
  }, [isInView, isMuted, playSfx]);

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

  return (
    <m.div
      ref={ref}
      className="w-screen relative h-[950vh]"
      style={{ opacity }}
    >
      {/* bg */}
      <m.div
        className="absolute w-screen inset-0 bg-[linear-gradient(180deg,#000_0%,#0a121b_8%,#132232_17%,#192e43_26%,#1d344d_37%,#1f3751_50%,#1d344d_66%,#132232_79%,#0a121b_91%,#000_100%)]"
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
