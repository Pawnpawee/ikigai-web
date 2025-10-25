"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import WordByWordAnimation from "../../components/ui/WordByWordAnimation";

export default function Dreaming() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const opacity_bg = useTransform(scrollYProgress, [0, 0.5], [0, 0.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

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
  const animal_x = useTransform(scrollYProgress, [0.65, 1], ["100vw", "65vw"]);

  // Sun: เคลื่อนที่ตลอดการ scroll
  const sun_opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const sun_y = useTransform(scrollYProgress, [0, 1], ["0vh", "180vh"]);
  const sun_x = useTransform(scrollYProgress, [0, 1], ["0vw", "90vw"]);

  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.1, 0.99, 1],
    [-1, 10, 10, -1]
  );

  return (
    <motion.div
      ref={ref}
      className="h-[250vh] w-screen relative"
      style={{
        backgroundImage: "url('/assets/Scene/Intro/bg.svg')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        zIndex,
        opacity,
      }}
    >
      <div className="fixed top-0 h-screen w-full flex items-center justify-center z-6 text-center">
        <motion.div style={{ opacity: opacity_first_quarter }}>
          <WordByWordAnimation
            text={`ตำนานอียิปต์เชื่อว่า เมื่อตายไปแล้วจะต้องเดินทางไปยังดินแดนแห่งการพิพากษา
ภายในห้องโถงแห่งสัจจะ หัวใจจะถูกนำไปชั่งเทียบกับขนนก
หากหัวใจเบากว่าขนนกก็จะเข้าถึงชีวิตหลังความตายเดินทางสู่ทุ่งแห่งความสุข
แต่ถ้าหากจิตใจหนักแน่นมักถูกกลืนกินด้วยบางสิ่ง…`}
            scrollYProgress={scrollYProgress}
            as="p"
            className="typo-h5 text-white"
          />
        </motion.div>
      </div>

      <motion.div
        className="h-full w-full z-5 absolute"
        style={{
          backgroundColor: "black",
          opacity: opacity_bg,
        }}
      ></motion.div>

      <motion.img
        src="/assets/Scene/Intro/sky.svg"
        className="w-full object-cover fixed top-0 left-20"
        style={{ opacity: opacity_first_quarter }}
      />

      <motion.img
        src="/assets/Scene/Intro/animal.svg"
        className="h-[300px] fixed bottom-0 z-4"
        style={{ x: animal_x }}
      />
      <motion.img
        src="/assets/Scene/Intro/desert3.svg"
        className="w-full fixed bottom-0 left-0 z-3"
        style={{ opacity: opacity_first_quarter, y: y_first_quarter }}
      />
      <motion.img
        src="/assets/Scene/Intro/desert2.svg"
        className="h-[400px] fixed bottom-[28%] left-[-11%] z-2"
        style={{ opacity: opacity_second_quarter, y: y_second_quarter }}
      />
      <motion.img
        src="/assets/Scene/Intro/desert1.svg"
        className="w-full fixed bottom-0 left-0 z-1"
        style={{ opacity: opacity_third_quarter, y: y_third_quarter }}
      />
      <motion.img
        src="/assets/Scene/Intro/sun.svg"
        className="w-[370px] absolute z-0"
        style={{
          opacity: sun_opacity,
          y: sun_y,
          x: sun_x,
        }}
      />
    </motion.div>
  );
}
