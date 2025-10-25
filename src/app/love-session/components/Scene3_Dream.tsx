import { motion, MotionValue } from "framer-motion";


import { DreamAnswer } from "./LoveSessionContainer";
import WordByWordAnimation from "@/app/components/ui/WordByWordAnimation";

interface Props {
  opacity: MotionValue<number>;
  zIndex: MotionValue<number>;
  textProgress: MotionValue<number>;
  dreamAnswer: DreamAnswer;
  setDreamAnswer: React.Dispatch<React.SetStateAction<DreamAnswer>>;
  errorMessage?: string;
  handleSubmit?: () => void;
  isLoading?: boolean;
}

const DREAM_OPTIONS: { value: DreamAnswer; label: string }[] = [
  { value: "yes", label: "ได้" },
  { value: "no", label: "ไม่ได้" },
  { value: "not_sure", label: "ไม่แน่ใจ" },
];

export default function Scene3Dream({
  opacity,
    zIndex,
  textProgress,
  dreamAnswer,
  setDreamAnswer,
  errorMessage,
  handleSubmit,
  isLoading,
}: Props) {
  return (
    <motion.div
      style={{ opacity , zIndex}}
      className="fixed top-0 h-screen w-full flex items-center justify-center"
    >
  <div className="flex flex-col items-center gap-6 sm:gap-8 p-3 sm:p-4 max-w-xl sm:max-w-2xl text-center">
        <WordByWordAnimation
          text="แมว : ดูเหมือนจะเป็นงานอดิเรกที่ดีเลยนะ แล้วสิ่งที่เจ้ารักนี้ช่วยให้เจ้าเดินตามความฝันได้รึเปล่า?"
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
          className="flex flex-col md:flex-row gap-3 md:gap-4"
        >
          {DREAM_OPTIONS.map((opt) => (
            <motion.button
              key={opt.value}
              onClick={() => setDreamAnswer(opt.value)}
              className={`
                w-48 p-3 border-2 rounded-lg text-xl transition-all
                ${
                  dreamAnswer === opt.value
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent border-gray-500 hover:border-white text-white'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {opt.label}
            </motion.button>
          ))}
        </motion.div>

        {handleSubmit && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={handleSubmit}
            disabled={isLoading}
            className="mt-2 md:mt-4 px-8 py-3 bg-white text-black text-xl rounded-lg font-semibold transition-all hover:bg-opacity-90 disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? 'กำลังบันทึก...' : 'บันทึกและเดินทางต่อ'}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}