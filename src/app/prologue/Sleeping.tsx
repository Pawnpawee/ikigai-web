"use client";

import { m, useInView, useScroll, useTransform } from "framer-motion";
import { Howl } from "howler";
import { useEffect, useMemo, useRef } from "react";

import { useAudio } from "@/app/contexts/AudioContext";
import { useDevice } from "@/app/contexts/DeviceContext";
import { getAudioUrl } from "@/utils/cloudinaryUtils";
import Bubble from "../components/button/Bubble";
import EyelidOverlay from "../components/reusable/EyeLidOverlay";
import SceneLayer, {
  type AnimationMap,
} from "../components/reusable/SceneLayer";
import SubtitleScroll from "../components/text/SubtitleScroll";
import { SCENE_SLEEPING_ITEMS } from "../data/scene_sleeping.data";

export default function Sleeping() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  // ตรวจสอบ orientation โดยใช้ custom hook
  const { isMobile } = useDevice();
  const { sfxVolume, isMuted } = useAudio();

  //? Refs for looping sounds
  const clockSoundRef = useRef<Howl | null>(null);
  const heartBeatSoundRef = useRef<Howl | null>(null);

  //? Initialize looping sounds
  useEffect(() => {
    clockSoundRef.current = new Howl({
      src: [getAudioUrl("Sound/1-2/clock-ticking.mp3")],
      loop: true,
      volume: sfxVolume / 100,
    });

    heartBeatSoundRef.current = new Howl({
      src: [getAudioUrl("Sound/1-2/heart-beat.mp3")],
      loop: true,
      volume: sfxVolume / 100,
    });

    return () => {
      clockSoundRef.current?.unload();
      heartBeatSoundRef.current?.unload();
    };
  }, [sfxVolume]);

  //? Play/stop sounds based on view and mute state
  useEffect(() => {
    const clockSound = clockSoundRef.current;
    const heartBeatSound = heartBeatSoundRef.current;
    if (!clockSound || !heartBeatSound) return;

    //! ถ้าไม่อยู่ใน view หรือถูก mute ให้หยุดเสียงทันที
    if (!isInView || isMuted) {
      if (clockSound.playing()) {
        clockSound.fade(clockSound.volume(), 0, 500);
        setTimeout(() => clockSound.stop(), 500);
      }
      if (heartBeatSound.playing()) {
        heartBeatSound.fade(heartBeatSound.volume(), 0, 500);
        setTimeout(() => heartBeatSound.stop(), 500);
      }
    }
    //? ถ้าอยู่ใน view และไม่ถูก mute ให้เล่นเสียง
    else {
      if (!clockSound.playing()) {
        clockSound.fade(0, sfxVolume / 100, 500);
        clockSound.play();
      }
      if (!heartBeatSound.playing()) {
        heartBeatSound.fade(0, sfxVolume / 100, 500);
        heartBeatSound.play();
      }
    }
  }, [isInView, isMuted, sfxVolume]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 0],
  );

  const set1Y = useTransform(scrollYProgress, [0, 0.0625], [100, 0]);
  const set1Opacity = useTransform(scrollYProgress, [0, 0.0625], [0, 1]);

  const set2Y = useTransform(scrollYProgress, [0.0625, 0.125], [100, 0]);
  const set2Opacity = useTransform(scrollYProgress, [0.0625, 0.125], [0, 1]);

  const set3Y = useTransform(scrollYProgress, [0.125, 0.1875], [100, 0]);
  const set3Opacity = useTransform(scrollYProgress, [0.125, 0.1875], [0, 1]);

  const set4Y = useTransform(scrollYProgress, [0.25, 0.3125], [100, 0]);
  const set4Opacity = useTransform(scrollYProgress, [0.25, 0.3125], [0, 1]);

  // ชุด Bubbles (250-450vh = 31.25-56.25%)
  const bubble1Y = useTransform(scrollYProgress, [0.3125, 0.375], [100, 0]);
  const bubble1Opacity = useTransform(
    scrollYProgress,
    [0.3125, 0.375, 0.5625, 0.6125],
    [0, 1, 1, 0],
  ); // ค้างจนถึง 50%, fade out 50-55%

  const bubble2Y = useTransform(scrollYProgress, [0.375, 0.4375], [100, 0]);
  const bubble2Opacity = useTransform(
    scrollYProgress,
    [0.375, 0.4375, 0.5625, 0.6125],
    [0, 1, 1, 0],
  );

  const bubble3Y = useTransform(scrollYProgress, [0.4375, 0.5], [100, 0]);
  const bubble3Opacity = useTransform(
    scrollYProgress,
    [0.4375, 0.5, 0.5625, 0.6125],
    [0, 1, 1, 0],
  );

  const bubble4Y = useTransform(scrollYProgress, [0.5, 0.5625], [100, 0]);
  const bubble4Opacity = useTransform(
    scrollYProgress,
    [0.5, 0.5625, 0.5625, 0.6125],
    [0, 1, 1, 0],
  );

  const scale = useTransform(scrollYProgress, [0.5625, 0.75], [1, 1.7]);

  const z_move = useTransform(scale, (s) => {
    const scale = Number(s) || 1;
    if (scale === 0) return 0;
    return 1000 * (1 - 1 / scale);
  });
  const textOpacity = useTransform(
    scrollYProgress,
    [0.5625, 0.65, 0.7, 0.8],
    [0, 1, 1, 0],
  );

  const textSectionProgress = useTransform(
    scrollYProgress,
    [0.5625, 0.8],
    [0, 1], // ส่งค่า 0-1 แบบ Linear
  );

  const ry = useTransform(
    scrollYProgress,
    [0, 0.75, 0.8, 0.85, 0.9, 0.95, 1],
    [200, 200, 0, 60, 0, 40, 0],
  );

  const animations: AnimationMap = useMemo(
    () => ({
      1: { y: set1Y, opacity: set1Opacity },
      2: { y: set2Y, opacity: set2Opacity },
      3: { y: set3Y, opacity: set3Opacity },
      4: { y: set4Y, opacity: set4Opacity },
    }),
    [
      set1Y,
      set1Opacity,
      set2Y,
      set2Opacity,
      set3Y,
      set3Opacity,
      set4Y,
      set4Opacity,
    ],
  );

  return (
    <m.div
      ref={ref}
      className="relative w-screen h-[800vh]"
      style={{ opacity }}
    >
      {/* Sticky Container */}
      <div
        className="sticky top-0 w-screen h-screen overflow-hidden flex items-center justify-center bg-black"
        suppressHydrationWarning
        style={{
          perspective: "1000px", // กำหนดความลึกที่ตัวพ่อ
          // ถ้าอยากให้จุด Center อยู่กลางจอเป๊ะๆ
          perspectiveOrigin: "50% 50%",
        }}
      >
        <m.div
          className="absolute aspect-video w-full portrait:w-[250%]"
          style={{
            top: isMobile ? "15%" : "8%",
            z: z_move,
          }}
        >
          <SceneLayer
            items={SCENE_SLEEPING_ITEMS}
            animations={animations}
            containerAspectRatio="16 / 9"
          />
        </m.div>

        {/* ชุด 6: Bubble "จะทำได้ไหม" */}
        <m.div
          className="absolute mix-blend-screen pointer-events-none
             top-[19.13%] right-[2.5%] w-[180px] aspect-180/110
             landscape:top-[17.22%] landscape:left-[62.76%] landscape:w-[295px] landscape:aspect-[295/176.08]
             md:left-[65%] md:w-[300px] md:aspect-300/180"
          style={{
            y: bubble1Y,
            opacity: bubble1Opacity,
          }}
        >
          <Bubble text="จะทำได้ไหม" className="text-base md:text-2xl" />
        </m.div>

        {/* ชุด 7: Bubble "จะมีงานทำหรือเปล่า" */}
        <m.div
          className="absolute mix-blend-screen pointer-events-none
             top-[7.38%] left-[7.5%] w-[180px] aspect-180/110
             landscape:top-[30.87%] landscape:left-[18.94%] landscape:w-[295px] landscape:aspect-[295/176.08]
             md:left-[7%] md:w-[300px] md:aspect-300/180"
          style={{
            y: bubble2Y,
            opacity: bubble2Opacity,
          }}
        >
          <Bubble text="จะมีงานทำหรือเปล่า" className="text-base md:text-2xl" />
        </m.div>

        {/* ชุด 8: Bubble "จะเก่งพอหรือเปล่า" */}
        <m.div
          className="absolute mix-blend-screen pointer-events-none
             top-[61.25%] right-[3.5%] w-[180px] aspect-180/110
             landscape:top-[52.16%] landscape:left-[59.61%] landscape:w-[295px] landscape:aspect-[295/176.08]
             md:left-[60%] md:w-[300px] md:aspect-300/180"
          style={{
            y: bubble3Y,
            opacity: bubble3Opacity,
          }}
        >
          <Bubble text="จะเก่งพอหรือเปล่า" className="text-base md:text-2xl" />
        </m.div>

        {/* ชุด 9: Bubble "จะเข้ากับคนอื่นได้ไหม" */}
        <m.div
          className="absolute mix-blend-screen pointer-events-none
             top-[75.38%] left-[8.61%] w-[180px] aspect-180/110
             landscape:top-[67.08%] landscape:left-[26.29%] landscape:w-[295px] landscape:aspect-[295/176.08]
             md:left-[10%] md:w-[300px] md:aspect-300/180"
          style={{
            y: bubble4Y,
            opacity: bubble4Opacity,
          }}
        >
          <Bubble
            text="จะเข้ากับคนอื่นได้ไหม"
            className="text-base md:text-2xl"
          />
        </m.div>

        {/* ชุด 10: Text "เห้อนอนดีกว่า" */}
        <m.div
          className="absolute bottom-[15%] left-0 right-0 pointer-events-none"
          style={{ opacity: textOpacity }}
        >
          <SubtitleScroll
            subtitles={["เห้อ นอนดีกว่า"]}
            progress={textSectionProgress}
            className="w-full h-full"
          />
        </m.div>
      </div>

      {/* Light overlay */}
      <div
        className="absolute w-screen inset-0 mix-blend-soft-light pointer-events-none"
        style={{ backgroundColor: "var(--color-overlay)", opacity: 0.7 }}
      />

      {/* อนิเมชันกระพริบตา POV - พื้นหลังดำกับรูปวงรีตรงกลาง */}
      <EyelidOverlay externalRy={ry} />
    </m.div>
  );
}
