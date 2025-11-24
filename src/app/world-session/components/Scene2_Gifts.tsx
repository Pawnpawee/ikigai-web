import { motion, MotionValue } from "framer-motion";

import { GIFTS_LIST } from "./WorldSessionContainer";
import WordByWordAnimation from "@/app/components/ui/WordByWordAnimation";
import ChoiceButton from "@/app/components/ui/ChoiceButton";

interface Props {
  opacity: MotionValue<number>;
  zIndex: MotionValue<number>;
  textProgress: MotionValue<number>;
  selectedGifts: string[];
  setSelectedGifts: React.Dispatch<React.SetStateAction<string[]>>;
  errorMessage?: string;
}

export default function Scene2Gifts({
  opacity,
  zIndex,
  textProgress,
  selectedGifts,
  setSelectedGifts,
  errorMessage,
}: Props) {
  const handleToggle = (gift: string) => {
    setSelectedGifts((prev) =>
      prev.includes(gift) ? prev.filter((g) => g !== gift) : [...prev, gift],
    );
  };

  return (
    <motion.div
      style={{ opacity, zIndex }}
      className="fixed top-0 h-screen w-full flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-5 sm:gap-6 p-3 sm:p-4 max-w-5xl text-center">
        <WordByWordAnimation
          text="แมว: เมื่อเสียงเรียกร้องมาถึงเจ้า… เจ้าจะเลือกมอบสิ่งใดให้โลก? จงเลือกสิ่งที่สะท้อนในใจของเจ้า"
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
          className="flex flex-wrap justify-center gap-3 max-h-[60vh] overflow-y-auto p-4"
        >
          {GIFTS_LIST.map((gift) => (
            <ChoiceButton
              className="typo-p-md"
              key={gift}
              text={gift}
              isSelected={selectedGifts.includes(gift)}
              onClick={() => handleToggle(gift)}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
