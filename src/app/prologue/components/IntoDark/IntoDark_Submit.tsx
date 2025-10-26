"use client";
import { motion, useTransform, MotionValue } from "framer-motion";
import WordByWordAnimation from "../../../components/ui/WordByWordAnimation";

interface SubmitProps {
  scrollYProgress: MotionValue<number>;
  isLoading: boolean;
  handleSubmit: () => void;
}

export default function IntoDarkSubmit({
  scrollYProgress,
  isLoading,
  handleSubmit,
}: SubmitProps) {
  const opacity = useTransform(scrollYProgress, [0.71, 0.727, 1.0], [0, 1, 1]);
  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.727, 0.728, 1.0],
    [-1, -1, 10, 10]
  );

  const textAnimationProgress = useTransform(
    scrollYProgress,
    [0.727, 0.95],
    [0, 1]
  );
  const buttonOpacity = useTransform(textAnimationProgress, [0.9, 1], [0, 1]);
  const buttonY = useTransform(textAnimationProgress, [0.9, 1], [10, 0]);

  return (
    <motion.div
      style={{ opacity, zIndex }}
      className="fixed top-0 h-screen w-full flex items-center justify-center text-center p-4"
    >
      <div className="text-center flex flex-col items-center gap-6 p-4 max-w-2xl">
        <WordByWordAnimation
          text={`แมว : แต่เจ้าไม่ต้องกังวลไป การที่เจ้ายังไม่ค้นพบตัวเองตอนนี้ไม่ใช่เรื่องที่แปลกประหลาด เจ้าสามารถค้นหาตัวเองได้ตลอดชีวิต อิคิไกเป็นเพียงแนวทางเท่านั้น เจ้าอยากจะลองไปตามหาอิคิไก ของเจ้าดูบ้างไหมล่ะ`}
          scrollYProgress={textAnimationProgress}
          as="p"
          className="typo-h5 text-white"
        />
        <motion.button
          style={{ opacity: buttonOpacity, y: buttonY }}
          onClick={handleSubmit}
          disabled={isLoading}
          className=" mt-4 px-8 py-3 bg-white text-black text-xl rounded-lg font-semibold transition-all hover:bg-opacity-90 disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          พยักหน้า
        </motion.button>
      </div>
    </motion.div>
  );
}
