"use client";
import React, { useEffect } from "react";
import { motion, useTransform, useScroll, useInView } from "framer-motion";
import { useRef } from "react";
import Bubble from "@/app/components/ui/Bubble";
import WordByWordAnimation from "@/app/components/ui/WordByWordAnimation";
import { useAudio } from "@/app/contexts/AudioContext";
import { useSoundEffect } from "@/app/hooks/useSoundEffect";
import { useIsPortrait } from "@/app/hooks/useOrientation";

export default function Sleeping() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const { animationsStarted } = useAudio();

  // ตรวจสอบ orientation โดยใช้ custom hook
  const isPortrait = useIsPortrait();

  // ใช้ custom hook สำหรับ sound effect - clock ticking loop
  const { playSoundEffect, stopSoundEffect } = useSoundEffect({
    soundPath: "/assets/Sound/1-2/clock-ticking.mp3",
    fadeDurationMs: 500,
    soundDurationMs: 8000,
    loop: true,
  });

  // เล่นเสียงเมื่อเข้า viewport และ loop ตลอด
  useEffect(() => {
    if (isInView && animationsStarted) {
      playSoundEffect();
    } else {
      stopSoundEffect();
    }

    return () => {
      stopSoundEffect();
    };
  }, [isInView, animationsStarted, playSoundEffect, stopSoundEffect]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  // 800vh Animation Timeline (เพิ่มจาก 750vh)
  // ชุด 1-5 (0-200vh = 0-25%): แต่ละชุด 40vh
  const set1Y = useTransform(scrollYProgress, [0, 0.05], [100, 0]);
  const set1Opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  const set2Y = useTransform(scrollYProgress, [0.05, 0.1], [100, 0]);
  const set2Opacity = useTransform(scrollYProgress, [0.05, 0.1], [0, 1]);

  const set3Y = useTransform(scrollYProgress, [0.1, 0.15], [100, 0]);
  const set3Opacity = useTransform(scrollYProgress, [0.1, 0.15], [0, 1]);

  const set4Y = useTransform(scrollYProgress, [0.15, 0.2], [100, 0]);
  const set4Opacity = useTransform(scrollYProgress, [0.15, 0.2], [0, 1]);

  const set5Y = useTransform(scrollYProgress, [0.2, 0.25], [100, 0]);
  const set5Opacity = useTransform(scrollYProgress, [0.2, 0.25], [0, 1]);

  // ชุด 6-9 (200-450vh = 25-56.25%): แต่ละ bubble 50vh
  // Bubble 1: 200-250vh (25-31.25%)
  const bubble1Y = useTransform(scrollYProgress, [0.25, 0.3125], [100, 0]);
  const bubble1Opacity = useTransform(
    scrollYProgress,
    [0.25, 0.3125, 0.5, 0.55],
    [0, 1, 1, 0]
  ); // ค้างจนถึง 50%, fade out 50-55%

  // Bubble 2: 250-300vh (31.25-37.5%)
  const bubble2Y = useTransform(scrollYProgress, [0.3125, 0.375], [100, 0]);
  const bubble2Opacity = useTransform(
    scrollYProgress,
    [0.3125, 0.375, 0.5, 0.55],
    [0, 1, 1, 0]
  );

  // Bubble 3: 300-350vh (37.5-43.75%)
  const bubble3Y = useTransform(scrollYProgress, [0.375, 0.4375], [100, 0]);
  const bubble3Opacity = useTransform(
    scrollYProgress,
    [0.375, 0.4375, 0.5, 0.55],
    [0, 1, 1, 0]
  );

  // Bubble 4: 350-400vh (43.75-50%)
  const bubble4Y = useTransform(scrollYProgress, [0.4375, 0.5], [100, 0]);
  const bubble4Opacity = useTransform(
    scrollYProgress,
    [0.4375, 0.5, 0.5, 0.55],
    [0, 1, 1, 0]
  );
  // ค้าง 400-450vh (50-56.25%): opacity = 1 สำหรับทุก bubble
  // Bubble fade out: 400-440vh (50-55%)

  // ชุด 10: scale + text (450-600vh = 56.25-75%)
  const scale = useTransform(scrollYProgress, [0.5625, 0.75], [1, 1.5]);
  const textOpacity = useTransform(
    scrollYProgress,
    [0.5625, 0.65, 0.8, 0.9],
    [0, 1, 1, 0]
  ); // ขึ้นที่ 56.25%, ค้างถึง 85%, fade out 85-90%

  const blinkOpacity = useTransform(
    scrollYProgress,
    [0.6, 0.65, 0.7, 0.8, 0.9, 1],
    [0, 0.3, 0, 0.5, 0, 1]
  ); // กระพริบ 3 ครั้ง แล้วค้างดำ

  // Scene fade out (96-100%)
  const sceneFadeOut = useTransform(scrollYProgress, [0.95, 1], [1, 0]);

  return (
    <motion.div
      ref={ref}
      className="relative w-screen h-[800vh] z-2"
      style={{ opacity: bgOpacity }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 w-screen h-screen overflow-hidden flex items-center justify-center bg-black">
        <motion.div
          className="absolute aspect-video w-full portrait:w-[250%]"
          style={{
            scale,
          }}
        >
          <img
            src="/assets/Scene/Scene2/bg.svg"
            alt="Background"
            className="w-full h-full object-cover"
          />
          {/* ชุด 1: Table 2, Table 1, Bed */}
          <motion.div
            className="absolute"
            style={{
              inset: "15.23% 8.62% 64.38% 72.95%",
              y: set1Y,
              opacity: set1Opacity,
            }}
          >
            <img
              src="/assets/Scene/Scene2/table2.svg"
              alt="table2"
              className="w-full h-full object-contain"
            />
          </motion.div>

          <motion.div
            className="absolute"
            style={{
              inset: "14.78% 72.89% 64.83% 8.68%",
              y: set1Y,
              opacity: set1Opacity,
            }}
          >
            <img
              src="/assets/Scene/Scene2/table1.svg"
              alt="table1"
              className="w-full h-full object-contain"
            />
          </motion.div>

          <motion.div
            className="absolute"
            style={{
              bottom: 0,
              left: "24.83%",
              right: "24.77%",
              top: "7.79%",
              y: set1Y,
              opacity: set1Opacity,
            }}
          >
            <img
              src="/assets/Scene/Scene2/bed.svg"
              alt="bed"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* ชุด 2: Slipper, Book 2, Note */}
          <motion.div
            className="absolute"
            style={{
              inset: "46.99% 72.37% 30.53% 17.98%",
              y: set2Y,
              opacity: set2Opacity,
            }}
          >
            <img
              src="/assets/Scene/Scene2/slipper.svg"
              alt="slipper"
              className="w-full h-full object-contain"
            />
          </motion.div>

          <motion.div
            className="absolute"
            style={{
              inset: "20.48% 83.61% 69.38% 11.4%",
              y: set2Y,
              opacity: set2Opacity,
            }}
          >
            <img
              src="/assets/Scene/Scene2/book2.svg"
              alt="book2"
              className="w-full h-full object-contain"
            />
          </motion.div>

          <motion.div
            className="absolute"
            style={{
              inset: "22.39% 13.62% 69.53% 82.81%",
              y: set2Y,
              opacity: set2Opacity,
            }}
          >
            <img
              src="/assets/Scene/Scene2/note.svg"
              alt="note"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* ชุด 3: Lamp, Clock */}
          <motion.div
            className="absolute"
            style={{
              inset: "17.13% 76.58% 73.09% 17.91%",
              y: set3Y,
              opacity: set3Opacity,
            }}
          >
            <img
              src="/assets/Scene/Scene2/lamp.svg"
              alt="lamp"
              className="w-full h-full object-contain"
            />
          </motion.div>

          <motion.div
            className="absolute"
            style={{
              inset: "21.17% 18.87% 73.1% 74.66%",
              y: set3Y,
              opacity: set3Opacity,
            }}
          >
            <img
              src="/assets/Scene/Scene2/clock.svg"
              alt="clock"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* ชุด 4: Book 1, (Head + Body + Blanket) */}
          <motion.div
            className="absolute"
            style={{
              inset: "16.34% 9.99% 73.51% 85.03%",
              y: set4Y,
              opacity: set4Opacity,
            }}
          >
            <img
              src="/assets/Scene/Scene2/book1.svg"
              alt="book1"
              className="w-full h-full object-contain"
            />
          </motion.div>

          <motion.div
            className="absolute"
            style={{
              inset: "19.11% 41.68% 55.39% 42.31%",
              y: set4Y,
              opacity: set4Opacity,
            }}
          >
            <img
              src="/assets/Scene/Scene2/head.svg"
              alt="head"
              className="w-full h-full object-contain"
            />
          </motion.div>

          <motion.div
            className="absolute"
            style={{
              inset: "42.14% 41.44% 21.57% 41.98%",
              y: set4Y,
              opacity: set4Opacity,
            }}
          >
            <img
              src="/assets/Scene/Scene2/body.svg"
              alt="body"
              className="w-full h-full object-contain"
            />
          </motion.div>

          <motion.div
            className="absolute"
            style={{
              inset: "47.7% 31.87% 2.8% 31.96%",
              y: set5Y,
              opacity: set5Opacity,
            }}
          >
            <img
              src="/assets/Scene/Scene2/blanket.svg"
              alt="blanket"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* ชุด 5: Phone */}
          <motion.div
            className="absolute"
            style={{
              inset: "41.65% 34.28% 49.3% 62.2%",
              y: set5Y,
              opacity: set5Opacity,
            }}
          >
            <img
              src="/assets/Scene/Scene2/phone.svg"
              alt="phone"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* ชุด 10: Text "เห้อนอนดีกว่า" */}
          <motion.div
            className="absolute bottom-[30%] left-0 right-0 flex justify-center"
            style={{ opacity: textOpacity }}
          >
            <WordByWordAnimation
              text="เห้อ นอนดีกว่า"
              scrollYProgress={textOpacity}
              as="p"
              className="typo-text-h5 text-white"
            />
          </motion.div>
        </motion.div>

        {/* ชุด 6: Bubble "จะทำได้ไหม" */}
        <motion.div
          className="absolute mix-blend-screen 
             top-[19.13%] right-[2.5%] w-[180px] aspect-[180/110]
             landscape:top-[17.22%] landscape:left-[62.76%] landscape:w-[295px] landscape:aspect-[295/176.08]
             lg:left-[65%] lg:w-[300px] lg:aspect-[300/180]"
          style={{
            y: bubble1Y,
            opacity: bubble1Opacity,
          }}
        >
          <Bubble text="จะทำได้ไหม" className="typo-text-h5" />
        </motion.div>

        {/* ชุด 7: Bubble "จะมีงานทำหรือเปล่า" */}
        <motion.div
          className="absolute mix-blend-screen 
             top-[7.38%] left-[7.5%] w-[180px] aspect-[180/110]
             landscape:top-[30.87%] landscape:left-[18.94%] landscape:w-[295px] landscape:aspect-[295/176.08]
             lg:left-[7%] lg:w-[300px] lg:aspect-[300/180]"
          style={{
            y: bubble2Y,
            opacity: bubble2Opacity,
          }}
        >
          <Bubble text="จะมีงานทำหรือเปล่า" className="typo-text-h5 " />
        </motion.div>

        {/* ชุด 8: Bubble "จะเก่งพอหรือเปล่า" */}
        <motion.div
          className="absolute mix-blend-screen 
             top-[61.25%] right-[3.5%] w-[180px] aspect-[180/110]
             landscape:top-[52.16%] landscape:left-[59.61%] landscape:w-[295px] landscape:aspect-[295/176.08]
             lg:left-[60%] lg:w-[300px] lg:aspect-[300/180]"
          style={{
            y: bubble3Y,
            opacity: bubble3Opacity,
          }}
        >
          <Bubble text="จะเก่งพอหรือเปล่า" className="typo-text-h5" />
        </motion.div>

        {/* ชุด 9: Bubble "จะเข้ากับคนอื่นได้ไหม" */}
        <motion.div
          className="absolute mix-blend-screen 
             top-[75.38%] left-[8.61%] w-[180px] aspect-[180/110]
             landscape:top-[67.08%] landscape:left-[26.29%] landscape:w-[295px] landscape:aspect-[295/176.08]
             lg:left-[10%] lg:w-[300px] lg:aspect-[300/180]"
          style={{
            y: bubble4Y,
            opacity: bubble4Opacity,
          }}
        >
          <Bubble text="จะเข้ากับคนอื่นได้ไหม" className="typo-text-h5" />
        </motion.div>

        {/* กระพริบตา: Black overlay fade in-out (60-100%) */}
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: blinkOpacity }}
        />

        {/* Scene fade out (96-100%) */}
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: useTransform(sceneFadeOut, (v) => 1 - v) }}
        />
      </div>
    </motion.div>
  );
}
