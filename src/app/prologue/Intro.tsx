"use client";
import { m, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { getImgPath } from "@/utils/cloudinaryUtils";
import WordByWordAnimation from "../components/text/WordByWordAnimation";
import { useStarsVisibility } from "../hooks/useStarsVisibility";

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
  const starScale = useTransform(
    scrollYProgress,
    [0.04, 0.1, 0.11],
    [1.5, 8, 1.5],
  );
  const starRotate = useTransform(scrollYProgress, [0.04, 0.1], [0, 180]);

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

  //? ใช้ Hook สำหรับจัดการ Stars visibility
  useStarsVisibility(scrollYProgress, {
    shouldShow: (p) => p < 1,
  });

  return (
    <m.div ref={ref} className="h-[250vh] w-full relative">
      <m.div
        className="fixed top-0 h-full  flex items-center justify-center text-center w-screen overflow-hidden"
        style={{ zIndex }}
      >
        <m.div
          style={{ opacity: scrollToOpacity }}
          className="w-full px-4 flex flex-col items-center"
        >
          <div className="relative h-20 w-full flex items-center justify-center mb-8">
            {" "}
            <m.div
              style={{
                opacity: starOpacity,
                scale: starScale,
                rotate: starRotate,
                willChange: "transform, opacity",
              }}
              className="absolute flex items-center justify-center"
            >
              <div className="relative w-10 h-10">
                <Image
                  src={getImgPath("Icon/star.svg")}
                  alt="star"
                  fill
                  crossOrigin="anonymous"
                  className="object-contain"
                />
              </div>
            </m.div>
            <m.h2
              style={{
                opacity: introOpacity,
                scale: introScale,
                filter: introBlur,
                textShadow: introGlow,
                willChange: "transform, opacity, filter",
              }}
              className="font-bentham font-medium text-3xl md:text-5xl text-white absolute"
            >
              Intro
            </m.h2>
          </div>

          <WordByWordAnimation
            text={INTRO_TEXT}
            scrollYProgress={textAnimationProgress}
            as="div"
            className="text-lg md:text-2xl text-white text-center w-70 md:w-150 xl:w-full mx-auto"
          />
        </m.div>
      </m.div>
    </m.div>
  );
}
