"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image"; // ⭐ 1. Import Next Image
import WordByWordAnimation from "../components/ui/WordByWordAnimation";

const INTRO_TEXT = `คำถามอิคิไกทั้งสี่ข้อ — "สิ่งที่รัก, สิ่งที่ถนัด, สิ่งที่โลกต้องการ และ สิ่งที่สร้างรายได้” 
เป็นเพียงเครื่องมือการสำรวจเพื่อช่วยให้คุณสะท้อนตัวเอง ซึ่งเป็นภาพ ณ ตอนนี้เท่านั้น 
และ ไม่ใช่แบบทดสอบทางจิตวิทยา ผลลัพธ์เป็นแนวทางเชิงสำรวจ 
คุณสามารถเปลี่ยนความคิดและกลับมาสำรวจอีกครั้งได้เสมอ
การเดินทางของชีวิต… ได้เริ่มต้นแล้ว`;

export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const textAnimationProgress = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  const scrollToOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.9, 1],
    [0, 1, 1, 0],
  );

  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [-1, 10, 10, -1],
  );

  const starOpacity = useTransform(scrollYProgress, [0.04, 0.08], [1, 0]);
  const starScale = useTransform(scrollYProgress, [0.04, 0.1], [1.5, 8]);
  const starRotate = useTransform(scrollYProgress, [0.04, 0.1], [0, 180]);
  const starBlur = useTransform(
    scrollYProgress,
    [0.05, 0.1],
    ["blur(0px)", "blur(12px)"],
  );

  const introOpacity = useTransform(scrollYProgress, [0.07, 0.12], [0, 1]);
  const introScale = useTransform(scrollYProgress, [0.07, 0.12], [0.1, 1]);
  const introBlur = useTransform(
    scrollYProgress,
    [0.07, 0.1],
    ["blur(12px)", "blur(0px)"],
  );

  const introGlow = useTransform(
    scrollYProgress,
    [0.07, 0.12],
    ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 10px rgba(255,255,255,0.6)"],
  );

  return (
    <motion.div ref={ref} className="h-[250vh] w-full relative">
      <motion.div
        className="fixed top-0 h-full w-full flex items-center justify-center text-center"
        style={{ zIndex }}
      >
        <motion.div
          style={{ opacity: scrollToOpacity }}
          className="w-full px-4 flex flex-col items-center"
        >
          <div className="relative h-20 w-full flex items-center justify-center mb-8">
            {" "}
            <motion.div
              style={{
                opacity: starOpacity,
                scale: starScale,
                rotate: starRotate,
                filter: starBlur,
                willChange: "transform, opacity, filter",
              }}
              className="absolute flex items-center justify-center"
            >
              {/* ⭐ 6. ใช้ Next/Image แทน img */}
              <div className="relative w-10 h-10">
                <Image
                  src="/assets/Icon/star.svg"
                  alt="star"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
            <motion.h2
              style={{
                opacity: introOpacity,
                scale: introScale,
                filter: introBlur,
                textShadow: introGlow,
                willChange: "transform, opacity, filter",
              }}
              className="typo-h2-serif text-white absolute"
            >
              Intro
            </motion.h2>
          </div>

          <WordByWordAnimation
            text={INTRO_TEXT}
            scrollYProgress={textAnimationProgress}
            as="div"
            className="typo-p-lg text-white text-center w-70 sm:w-full mx-auto"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
