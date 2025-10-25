"use client";
import { motion, useTransform, MotionValue } from "framer-motion";

import WordByWordAnimation from "../../../components/ui/WordByWordAnimation";

const REASONS = [
  { id: 1, text: "เพราะเครียดเรื่องเรียน" },
  { id: 2, text: "เพราะกลัวจะไม่มีที่ทำงาน" },
  { id: 3, text: "เพราะกลัวจะเข้ากับคนอื่นไม่ได้" },
  { id: 4, text: "เพราะกลัวว่าตนเองจะไม่เก่งพอ" },
  { id: 5, text: "เพราะกลัวไม่มีรายได้ต่อเนื่อง" },
  { id: 6, text: "เพราะกลัวว่าทักษะตัวเอง\nจะดีไม่มากพอสำหรับการทำงาน" },
];

interface ChoicesProps {
  scrollYProgress: MotionValue<number>;
  playerName: string;
  selectedReasons: number[];
  handleReasonToggle: (id: number) => void;
  reasonsError: string;
}

export default function IntoDarkChoices({
  scrollYProgress,
  playerName,
  selectedReasons,
  handleReasonToggle,
  reasonsError,
}: ChoicesProps) {
  const opacity = useTransform(
    scrollYProgress,
    [0.3, 0.33, 0.63, 0.66],
    [0, 1, 1, 0]
  );
  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.34, 0.65, 0.66],
    [-1, 10, 10, -1]
  );

  const textAnimationProgress = useTransform(
    scrollYProgress,
    [0.33, 0.58],
    [0, 1]
  );
  const choicesOpacity = useTransform(textAnimationProgress, [0.9, 1], [0, 1]);
  const choicesY = useTransform(textAnimationProgress, [0.9, 1], [10, 0]);

  return (
    <motion.div
      style={{ opacity, zIndex }}
      className="fixed top-0 h-screen w-full flex items-center justify-center text-center p-4"
    >
      <div className="text-center flex flex-col items-center gap-6 p-4">
        <WordByWordAnimation
          text={`แมว : ยินดีที่ได้รู้จัก, ${
            playerName || "ผู้มาเยือน"
          }. มีหลายชีวิตที่หลงเข้ามาในที่นี้ เจ้าตกลงมาที่นี่เพราะเหตุใดล่ะ`}
          scrollYProgress={textAnimationProgress}
          as="p"
          className="typo-h5 text-white"
        />
        {reasonsError && (
          <motion.p
            className="mb-2 text-red-500"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {reasonsError}
          </motion.p>
        )}
        <motion.div
          style={{ opacity: choicesOpacity, y: choicesY }}
          className="flex flex-col gap-3 items-center"
        >
          {REASONS.map((reason) => {
            const isSelected = selectedReasons.includes(reason.id);
            return (
              <motion.button
                key={reason.id}
                onClick={() => handleReasonToggle(reason.id)}
                className={`w-72 md:w-96 p-3 border-2 rounded-lg text-lg transition-all cursor-pointer whitespace-pre-line ${
                  isSelected
                    ? "bg-white text-black border-white"
                    : "bg-transparent border-gray-500 hover:border-white text-white "
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {reason.text}
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}
