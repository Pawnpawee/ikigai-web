import { motion, MotionValue } from "framer-motion";

import { JOB_CARDS_LIST } from "./PaidSessionContainer";
import WordByWordAnimation from "@/app/components/ui/WordByWordAnimation";
import JobCard from "./JobCard";

interface Props {
  opacity: MotionValue<number>;
  zIndex: MotionValue<number>;
  textProgress: MotionValue<number>;
  selectedJobCards: string[];
  setSelectedJobCards: React.Dispatch<React.SetStateAction<string[]>>;
  errorMessage?: string;
}

export default function Scene2JobCards({
  opacity,
  zIndex,
  textProgress,
  selectedJobCards,
  setSelectedJobCards,
  errorMessage,
}: Props) {
  const handleToggle = (card: string) => {
    setSelectedJobCards((prev) =>
      prev.includes(card) ? prev.filter((c) => c !== card) : [...prev, card],
    );
  };
  const text =
    "แมว : เจ้าจะเลือกงานใด… สิ่งใดที่เจ้าอยากลองทำและคิดว่าสามารถสร้างรายได้? บางงานอาจเป็นสิ่งที่เจ้าทำแล้วสนุก… แต่บางงานก็อาจทำให้เจ้าเรียนรู้ทักษะใหม่ ๆ";

  return (
    <motion.div
      style={{ opacity, zIndex }}
      className="fixed top-0 h-screen w-full flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-6 p-4 max-w-6xl text-center">
        <WordByWordAnimation
          text={text}
          scrollYProgress={textProgress}
          as="p"
          className="typo-h5 text-white"
        />
        {errorMessage && (
          <motion.p
            className="-mt-2 text-red-500"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {errorMessage}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 max-h-[60vh] overflow-y-auto p-3 sm:p-4"
        >
          {JOB_CARDS_LIST.map((card) => (
            <JobCard
              key={card}
              label={card}
              isSelected={selectedJobCards.includes(card)}
              onClick={() => handleToggle(card)}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
