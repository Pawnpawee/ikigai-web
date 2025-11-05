"use client";
import {
  motion,
  useScroll,
  useTransform,
  useTime,
  useInView,
} from "framer-motion";
import { useRef, useEffect } from "react";
import { useIsPortrait } from "@/app/hooks/useOrientation";
import { useBgMusicTransition } from "@/app/hooks/useBgMusicTransition";
import SubtitleScroll from "@/app/components/ui/SubtitleScroll";
import Lottie from "lottie-react";
import buildingAnimationData from "../../../../public/assets/Scene/Scene4/s4-building.json";
import treeLeftAnimationData from "../../../../public/assets/Scene/Scene4/s4-tree.json";
import treeRightAnimationData from "../../../../public/assets/Scene/Scene4/s4-tree.json";
import skyAnimationData from "../../../../public/assets/Scene/Scene4/s4-sky.json";
import poleLeftAnimationData from "../../../../public/assets/Scene/Scene4/s4-pole.json";
import catLeftAnimationData from "../../../../public/assets/Scene/Scene4/s4-cat.json";
import catRightAnimationData from "../../../../public/assets/Scene/Scene4/s4-cat.json";
import { useSoundEffect } from "@/app/hooks/useSoundEffect";
import { useAudio } from "@/app/contexts/AudioContext";

export default function Weighing() {
  const ref = useRef<HTMLDivElement>(null);
  const isPortrait = useIsPortrait();
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const hasPlayedScalesRef = useRef(false);
  const hasPlayedMetalRef = useRef(false);
  const { animationsStarted } = useAudio();

  // จัดการ bg music transition - ใช้เพลงเดียวกับ Dreaming
  useBgMusicTransition({
    targetMusic: "/assets/Sound/3-4/egypt-jelly-dance.mp3",
    defaultMusic: "/assets/Sound/bg-music.mp3",
    fadeDuration: 1000,
    isInView,
    continueOnExit: true, 
  });

  const { playSoundEffect: playScales } = useSoundEffect({
    soundPath: "/assets/Sound/3-4/weighing.mp3",
    fadeDurationMs: 500,
    loop: false,
  });

  const { playSoundEffect: playMetal } = useSoundEffect({
    soundPath: "/assets/Sound/3-4/metal-slide.mp3",
    fadeDurationMs: 500,
    loop: false,
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // เล่นเสียง metal ตอนที่ scale เริ่ม rotate (slow movement: 0.6667-0.7733)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      // เล่นเสียง metal เมื่อเริ่มช่วง slow movement (scrollYProgress >= 0.6667)
      if (value >= 0.6667 && !hasPlayedMetalRef.current && animationsStarted && isInView) {
        playMetal();
        hasPlayedMetalRef.current = true;
      }
      // Reset flag เมื่อ scroll กลับ
      if (value < 0.66) {
        hasPlayedMetalRef.current = false;
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, playMetal, animationsStarted, isInView]);

  // เล่นเสียง scales เมื่อ heartPlateY_fast ถึงค่าสูงสุด (scrollYProgress >= 0.8)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      // เล่นเสียงเมื่อถึง 0.8 (80%) ซึ่งเป็นจุดสิ้นสุดของ heartPlateY_fast animation
      if (value >= 0.8 && !hasPlayedScalesRef.current && animationsStarted && isInView) {
        playScales();
        hasPlayedScalesRef.current = true;
      }
      // Reset flag เมื่อ scroll กลับ
      if (value < 0.77) {
        hasPlayedScalesRef.current = false;
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, playScales, animationsStarted, isInView]);

  // Main opacity for entire section
  const mainOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 0]
  );

  const ry = useTransform(
    scrollYProgress,
    [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.28],
    [0, 0, 40, 0, 50, 0, 200]
  );

  const blink_opacity = useTransform(
    scrollYProgress,
    [0, 0.2333, 0.3733],
    [1, 1, 0]
  );

  // POV falling effect - extended to use additional 50vh (600-750vh = 0.8-1.0)
  const pov_y = useTransform(scrollYProgress, [0, 0.8, 1], [0, 0, -500]);

  // Shake effect - rapid oscillation during fall (0.8-1.0)
  const pov_shake_x = useTransform(
    scrollYProgress,
    [0.8, 0.82, 0.84, 0.86, 0.88, 0.9, 0.92, 0.94, 0.96, 0.98, 1],
    [0, 5, -5, 4, -4, 3, -3, 2, -2, 1, 0]
  );

  // Blur effect - increases during fall (0.8-1.0)
  const pov_blur = useTransform(scrollYProgress, [0, 0.8, 1], [0, 0, 8]);

  // Set 1: tree right, tree left (0-50vh = 0-0.0667)
  const opacity_set1 = useTransform(scrollYProgress, [0, 0.0667], [0, 1]);
  const y_set1 = useTransform(scrollYProgress, [0, 0.0667], [100, 0]);

  // Set 2: sky, wall (50-100vh = 0.0667-0.1333)
  const opacity_set2 = useTransform(scrollYProgress, [0.0667, 0.1333], [0, 1]);
  const y_set2 = useTransform(scrollYProgress, [0.0667, 0.1333], [100, 0]);

  // Set 3: pole right, pole left (100-150vh = 0.1333-0.2)
  const opacity_set3 = useTransform(scrollYProgress, [0.1333, 0.2], [0, 1]);
  const y_set3 = useTransform(scrollYProgress, [0.1333, 0.2], [100, 0]);

  // Set 4: stairs (150-200vh = 0.2-0.2667)
  const opacity_set4 = useTransform(scrollYProgress, [0.2, 0.2667], [0, 1]);
  const y_set4 = useTransform(scrollYProgress, [0.2, 0.2667], [100, 0]);

  // Set 5: cat right, cat left (200-250vh = 0.2667-0.3333)
  const opacity_set5 = useTransform(scrollYProgress, [0.2667, 0.3333], [0, 1]);
  const y_set5 = useTransform(scrollYProgress, [0.2667, 0.3333], [100, 0]);

  // Set 6: heart plate, heart scale, feather plate, feather scale, light, scale (250-300vh = 0.3333-0.4)
  const opacity_set6 = useTransform(scrollYProgress, [0.3333, 0.4], [0, 1]);
  const y_set6 = useTransform(scrollYProgress, [0.3333, 0.4], [100, 0]);

  // Light flickering effect - only after opacity_set6 is full
  const time = useTime();
  const lightFlicker = useTransform(time, (t) => {
    // Create irregular flicker pattern using multiple sine waves
    const flicker1 = Math.sin(t / 200) * 0.15;
    const flicker2 = Math.sin(t / 150) * 0.1;
    const flicker3 = Math.sin(t / 300) * 0.2;
    return 0.85 + flicker1 + flicker2 + flicker3; // Range: ~0.4 to 1.3
  });
  const lightOpacity = useTransform(
    [opacity_set6, lightFlicker],
    ([baseOpacity, flicker]) => (baseOpacity as number) * (flicker as number)
  );

  // Set 7: heart (300-350vh = 0.4-0.4667)
  const opacity_set7 = useTransform(scrollYProgress, [0.4, 0.4667], [0, 1]);
  const y_set7 = useTransform(scrollYProgress, [0.4, 0.4667], [50, 0]);

  // Set 8: feather (350-400vh = 0.4667-0.5333)
  const opacity_set8 = useTransform(scrollYProgress, [0.4667, 0.5333], [0, 1]);
  const y_set8 = useTransform(scrollYProgress, [0.4667, 0.5333], [50, 0]);

  // ============ ZOOM (400-500vh = 0.5333-0.6667) ============
  const containerScale = useTransform(
    scrollYProgress,
    [0.5333, 0.6667],
    isPortrait ? [2.3, 4.5] : [1, 2.35]
  );
  const containerTop = useTransform(
    scrollYProgress,
    [0.5333, 0.6667],
    isPortrait ? ["-10%", "-5%"] : ["0%", "-17%"]
  );

  // ============ SLOW MOVEMENT (500-580vh = 0.6667-0.7733) ============
  // Heart side: slowly rotate down
  const heartRotate_slow = useTransform(
    scrollYProgress,
    [0.6667, 0.7733],
    [0, -5]
  );
  // Heart plate: slowly down (Y movement)
  const heartPlateY_slow = useTransform(
    scrollYProgress,
    [0.6667, 0.7733],
    isPortrait ? [0, 5] : [0, 15]
  );
  // Feather side: slowly rotate up
  const featherRotate_slow = useTransform(
    scrollYProgress,
    [0.6667, 0.7733],
    [0, -5]
  );
  // Feather plate: slowly up (Y movement)
  const featherPlateY_slow = useTransform(
    scrollYProgress,
    [0.6667, 0.7733],
    isPortrait ? [0, -5] : [0, -15]
  );

  // ============ FAST DROP (580-600vh = 0.7733-0.8) ============
  // Heart: fast rotate down with easeIn
  const heartRotate_fast = useTransform(
    scrollYProgress,
    [0.7733, 0.8],
    [0, -15]
  );
  // Heart plate: fast drop (Y movement)
  const heartPlateY_fast = useTransform(
    scrollYProgress,
    [0.7733, 0.8],
    isPortrait ? [0, 8] : [0, 30]
  );
  // Feather plate: slight rise (Y movement)
  const featherPlateY_fast = useTransform(
    scrollYProgress,
    [0.7733, 0.8],
    isPortrait ? [0, -3] : [0, -10]
  );

  // Combined positions
  const scaleRotate = useTransform(
    () => heartRotate_slow.get() + heartRotate_fast.get()
  );
  const heartPlateY = useTransform(
    () => heartPlateY_slow.get() + heartPlateY_fast.get()
  );
  const featherPlateY = useTransform(
    () => featherPlateY_slow.get() + featherPlateY_fast.get()
  );

  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.9, 1],
    [0, 1, 1, 0]
  );

  const textAnimationProgress = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    [0, 0, 1]
  );

  return (
    <motion.div
      ref={ref}
      className="relative h-[750vh] z-2"
      style={{ opacity: mainOpacity }}
    >
      {/* Background */}
      <div className="absolute w-screen inset-0 -z-1" />

      {/* fixed Container with aspect-video layout */}
      <motion.div
        className="
          fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-s4"
        style={{
          scale: containerScale,
          top: containerTop,
          y: pov_y,
          x: pov_shake_x,
          filter: useTransform(pov_blur, (value) => `blur(${value}px)`),
        }}
      >
        <div className="relative aspect-video w-full ">
          {/* Set 2: Sky (Lottie) */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ opacity: opacity_set2, y: y_set2 }}
          >
            <Lottie
              animationData={skyAnimationData}
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>

          {/* Set 1: Trees (Lottie) */}
          <motion.div
            className="absolute bottom-0 right-[8%] w-[20%] h-auto"
            style={{ opacity: opacity_set1, y: y_set1 }}
          >
            <Lottie
              animationData={treeRightAnimationData}
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-[7.5%] w-[20%] h-auto"
            style={{ opacity: opacity_set1, y: y_set1 }}
          >
            <Lottie
              animationData={treeLeftAnimationData}
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>

          {/* Set 2: Wall, Ground, Pool */}
          <motion.img
            src="/assets/Scene/Scene4/wall.svg"
            alt="Wall"
            className="absolute bottom-0 left-[19%] w-[62.5%] h-auto "
            style={{ opacity: opacity_set2, y: y_set2 }}
          />
          <motion.img
            src="/assets/Scene/Scene4/ground.svg"
            alt="Ground"
            className="absolute bottom-[-94.73%] right-[-0.55%] w-[179.12%] h-auto"
            style={{ opacity: opacity_set2, y: y_set2 }}
          />
          <motion.img
            src="/assets/Scene/Scene4/pool.svg"
            alt="Pool"
            className="absolute bottom-[-131.66%] right-[-3.59%] w-[179.12%] h-auto "
            style={{ opacity: opacity_set2, y: y_set2 }}
          />

          {/* Set 3: Poles (Lottie) */}
          <motion.div
            className="absolute bottom-[-6%] right-[-13.5%] w-[38%] h-auto scale-x-[-1]"
            style={{ opacity: opacity_set3, y: y_set3 }}
          >
            <Lottie
              animationData={poleLeftAnimationData}
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>
          <motion.div
            className="absolute bottom-[-6.5%] left-[-13.5%] w-[38%] h-auto "
            style={{ opacity: opacity_set3, y: y_set3 }}
          >
            <Lottie
              animationData={poleLeftAnimationData}
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>

          {/* Set 4: Building (Lottie) */}
          <motion.div
            className="absolute top-[11.3%] left-[27.9%] w-[44.3%] h-auto"
            style={{ opacity: opacity_set4, y: y_set4 }}
          >
            <Lottie
              animationData={buildingAnimationData}
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>
          {/* Stairs left as image, unless you have a Lottie for it */}
          <motion.img
            src="/assets/Scene/Scene4/stairs.svg"
            alt="Stairs"
            className="absolute bottom-[-2.1%] left-[23.5%] w-[52.9%] h-auto"
            style={{ opacity: opacity_set4, y: y_set4 }}
          />

          {/* Set 5: Cats (Lottie) */}
          <motion.div
            className="absolute bottom-[-4.2%] right-[28.1%] w-[7.17%] h-auto"
            style={{ opacity: opacity_set5, y: y_set5 }}
          >
            <Lottie
              animationData={catRightAnimationData}
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>
          <motion.div
            className="absolute bottom-[-4.3%] left-[28%] w-[7.17%] h-auto"
            style={{ opacity: opacity_set5, y: y_set5 }}
          >
            <Lottie
              animationData={catLeftAnimationData}
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>

          {/* Set 6: Scale system */}
          <motion.img
            src="/assets/Scene/Scene4/light.svg"
            alt="Light"
            className="absolute top-[23.4%] left-[32.4%] w-[35.1%] h-auto mix-blend-screen"
            style={{ opacity: lightOpacity, y: y_set6 }}
          />

          {/* Set 6: Heart Scale (left side) - will rotate */}
          <motion.div
            className="absolute bottom-[43.8%] right-[43.55%] w-[12.86%]"
            style={{
              opacity: opacity_set6,
              y: y_set6,
              rotate: scaleRotate,
            }}
          >
            <img
              src="/assets/Scene/Scene4/scale-2.svg"
              className="w-full h-auto"
            />
          </motion.div>

          <motion.div
            className="absolute top-[62.7%] left-[41.95%] w-[3.4%]"
            style={{
              opacity: opacity_set6,
              y: useTransform(() => y_set6.get() + heartPlateY.get()),
            }}
          >
            <img
              src="/assets/Scene/Scene4/heart-plate.svg"
              alt="Heart Plate"
              className="w-full h-auto"
            />
          </motion.div>

          {/* Set 6: Feather Plate*/}
          <motion.div
            className="absolute top-[63%] left-[53.6%] w-[3.4%]"
            style={{
              opacity: opacity_set6,
              y: useTransform(() => y_set6.get() + featherPlateY.get()),
            }}
          >
            <img
              src="/assets/Scene/Scene4/feather-plate.svg"
              alt="Feather Plate"
              className="w-full h-auto"
            />
          </motion.div>

          <motion.img
            src="/assets/Scene/Scene4/scale.svg"
            alt="Scale"
            className="absolute top-[45.8%] left-[41.95%] w-[16.1%] h-auto"
            style={{ opacity: opacity_set6, y: y_set6 }}
          />

          {/* Set 7: Heart - moves with heart plate */}
          <motion.div
            className="absolute top-[58.5%] left-[42.2%] w-[3.5%]"
            style={{
              opacity: opacity_set7,
              y: useTransform(() => y_set7.get() + heartPlateY.get()),
            }}
          >
            <img
              src="/assets/Scene/Scene4/heart.svg"
              alt="Heart"
              className="w-full h-auto"
            />
          </motion.div>

          {/* Set 8: Feather - moves with feather plate */}
          <motion.div
            className="absolute top-[58.8%] left-[54.6%] w-[3.4%]"
            style={{
              opacity: opacity_set8,
              y: useTransform(() => y_set8.get() + featherPlateY.get()),
            }}
          >
            <img
              src="/assets/Scene/Scene4/feather.svg"
              alt="Feather"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Light overlay */}
      <div
        className="absolute w-screen inset-0 mix-blend-soft-light pointer-events-none"
        style={{ backgroundColor: "var(--color-overlay)", opacity: 0.7 }}
      />

      {/* ชุด 10: Subtitles */}
      <motion.div
        className="fixed bottom-[15%] left-0 right-0"
        style={{ opacity: textOpacity }}
      >
        <SubtitleScroll
          subtitles={[
            "เจ้าหนักหนาด้วยความกังวล หัวใจเจ้ายังต้องการการปลดปล่อยก่อนจะไปยังทุ่งแห่งความสุข",
            "ข้าไม่ได้มาพิพากษาด้วยความโหดร้าย หากแต่ขอเชิญให้เจ้าล่องลอยไปยังห้วงเงานั้น",
            "เพื่อค้นหาเหตุแห่งทุกข์",
            "เมื่อเจ้าพบทาง ประตูแห่งแสงจะเปิดให้เจ้าเอง",
            "ดะ เดี๋ยวก่อน! ไม่นะ..",
          ]}
          scrollYProgress={textAnimationProgress}
          className="w-full h-full"
        />
      </motion.div>

      {/* Eye opening animation POV - black background with ellipse mask */}
      <motion.div
        className="fixed inset-0 bg-black pointer-events-none z-50 w-screen h-screen"
        style={{
          maskImage: useTransform(
            ry,
            (value) =>
              `radial-gradient(ellipse 50% ${value}% at 50% 50%, transparent 0%, black 100%)`
          ),
          WebkitMaskImage: useTransform(
            ry,
            (value) =>
              `radial-gradient(ellipse 50% ${value}% at 50% 50%, transparent 0%, black 100%)`
          ),
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          opacity: blink_opacity,
        }}
      />
    </motion.div>
  );
}
