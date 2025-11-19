"use client";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import Lottie from "lottie-react";
import WordByWordAnimation from "../../components/ui/WordByWordAnimation";
import { useIsPortrait } from "@/app/hooks/useOrientation";
import { useBgMusicTransition } from "@/app/hooks/useBgMusicTransition";
import skyAnimationData from "../../../../public/assets/Scene/Intro/sky.json";
import camelAnimationData from "../../../../public/assets/Scene/Intro/camel.json";
import sunAnimationData from "../../../../public/assets/Scene/Intro/sun.json";

export default function Dreaming() {
  const ref = useRef<HTMLDivElement>(null);
  const isPortrait = useIsPortrait();
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  // จัดการ bg music transition แบบ fade in/out
  useBgMusicTransition({
    targetMusic: "/assets/Sound/3-4/egypt-jelly-dance.mp3",
    defaultMusic: "/assets/Sound/bg-music.mp3",
    fadeDuration: 1000,
    isInView,
    continueOnExit: true, // ให้เพลงเล่นต่อไปยัง Weighing
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Fade in ตอนเริ่ม section เพื่อเชื่อมจาก Sleeping.tsx
  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.95, 1],
    [0, 1, 1, 0]
  );

  // 1/4: desert3 + sky โผล่ขึ้นมา
  const opacity_first_quarter = useTransform(
    scrollYProgress,
    [0.1, 0.25],
    [0, 1]
  );
  const y_first_quarter = useTransform(scrollYProgress, [0.1, 0.25], [100, 0]);

  // 2/4: desert2 โผล่ขึ้นมา
  const opacity_second_quarter = useTransform(
    scrollYProgress,
    [0.35, 0.5],
    [0, 1]
  );
  const y_second_quarter = useTransform(scrollYProgress, [0.35, 0.5], [100, 0]);

  // 3/4: desert1 โผล่ขึ้นมา
  const opacity_third_quarter = useTransform(
    scrollYProgress,
    [0.6, 0.75],
    [0, 1]
  );
  const y_third_quarter = useTransform(scrollYProgress, [0.6, 0.75], [100, 0]);

  // 4/4: animal เลื่อนจากขวาไปซ้าย
  const animal_right = useTransform(
    scrollYProgress,
    [0.3, 1],
    ["-50%", isPortrait ? "30%" : "8%"]
  );

  // Sun: เคลื่อนที่ตลอดการ scroll
  const sun_bottom = useTransform(
    scrollYProgress,
    [0, 1],
    ["70%", isPortrait ? "25%" : "30%"]
  );
  const sun_left = useTransform(scrollYProgress, [0, 1], ["0%", "85%"]);
  const sun_scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const textAnimationProgress = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <motion.div
      ref={ref}
      className="relative w-screen h-[600vh]"
      style={{ opacity: bgOpacity }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 w-screen h-screen overflow-hidden flex items-center justify-center">
        {/* Background */}
        <img
          src="/assets/Scene/Intro/bg.svg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* ส่วนบน: เมฆ (top-0) */}
        <motion.div
          className="absolute top-0 left-1/30 w-full portrait:w-[250%] portrait:-left-1/6 portrait:top-1/10"
          style={{ opacity: opacity_first_quarter }}
        >
          <Lottie
            animationData={skyAnimationData}
            loop={true}
            autoplay={true}
            className="w-full object-cover"
          />
        </motion.div>

        {/* Sun: เคลื่อนที่ตาม animation */}
        <motion.div
          className="absolute bottom-0 left-0 w-[20%] portrait:w-[30%]"
          style={{
            opacity: 1,
            bottom: sun_bottom,
            left: sun_left,
            scale: sun_scale,
          }}
        >
          <Lottie
            animationData={sunAnimationData}
            loop={true}
            autoplay={true}
            className="w-full h-full"
          />
        </motion.div>

        {/* ส่วนล่าง: desert และ animal (bottom-0) */}
        <motion.div className="absolute bottom-0 aspect-video w-full portrait:w-[200%]">
          {/* desert1 */}
          <motion.img
            src="/assets/Scene/Intro/desert1.svg"
            className="absolute w-full bottom-0 left-0 portrait:left-[10%]"
            style={{ opacity: opacity_third_quarter, y: y_third_quarter }}
          />

          {/* desert2 */}
          <motion.img
            src="/assets/Scene/Intro/desert2.svg"
            className="absolute w-[67.19%] left-[-13.02%] bottom-[23.15%] portrait:left-[-3%]"
            style={{ opacity: opacity_second_quarter, y: y_second_quarter }}
          />

          {/* desert3 */}
          <motion.img
            src="/assets/Scene/Intro/desert3.svg"
            className="absolute w-full bottom-0 left-0"
            style={{ opacity: opacity_first_quarter, y: y_first_quarter }}
          />

          {/* animal */}
          <motion.div
            className="absolute w-[29.17%] bottom-1/15 portrait:bottom-1/30"
            style={{ right: animal_right }}
          >
            <Lottie
              animationData={camelAnimationData}
              loop={true}
              autoplay={true}
              className="w-full h-full"
            />
          </motion.div>
        </motion.div>

        {/* Light overlay */}
        <div
          className="absolute w-screen inset-0 pointer-events-none"
          style={{ backgroundColor: "var(--color-black)", opacity: 0.1 }}
        />

        {/* Text กลางจอ */}
        <div className="absolute inset-0 flex items-center justify-center  text-center px-4">
          <motion.div style={{ opacity: opacity_first_quarter }}>
            <WordByWordAnimation
              text={`ตำนานอียิปต์เชื่อว่า เมื่อตายไปแล้วจะต้องเดินทางไปยัง 'ดินแดนแห่งการพิพากษา'
                ภายในห้องโถงแห่งสัจจะ หัวใจจะถูกนำไปชั่งเทียบกับขนนก
หากหัวใจเบากว่าขนนกก็จะเข้าถึงชีวิตหลังความตายเดินทางสู่ทุ่งแห่งความสุข
แต่ถ้าหากจิตใจหนักแน่นมักถูกกลืนกินด้วยบางสิ่ง…`}
              scrollYProgress={textAnimationProgress}
              as="p"
              className="typo-text-h4 text-white w-80 md:w-140 xl:w-full"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
