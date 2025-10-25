import { motion, MotionValue } from "framer-motion";

import { NoManualChoice } from "./WorldSessionContainer";
import WordByWordAnimation from "@/app/components/ui/WordByWordAnimation";

interface Props {
  opacity: MotionValue<number>;
  zIndex: MotionValue<number>;
  textProgress: MotionValue<number>;
  noManualChoice: NoManualChoice;
  setNoManualChoice: React.Dispatch<React.SetStateAction<NoManualChoice>>;
  errorMessage?: string;
}

const OPTIONS: { value: NoManualChoice; label: string }[] = [
    { value: "do_it_myself", label: "ลงมือหาวิธีด้วยตัวเอง" },
    { value: "ask_first", label: "ขอคำสั่งหรือ feedback ก่อนแล้วจึงทำตาม" },
];

export default function Scene3NoManual({ opacity, zIndex, textProgress, noManualChoice, setNoManualChoice, errorMessage }: Props) {
  const text = "แมว : มีงานถูกวางตรงหน้าเจ้า… แต่ไม่มีคู่มือหรือคำสั่งใด ๆ เจ้าจะเลือกทำอย่างไร?";

  return (
    <motion.div style={{ opacity, zIndex }} className="fixed top-0 h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-8 p-4 max-w-2xl text-center">
        <WordByWordAnimation text={text} scrollYProgress={textProgress} as="p"
className="typo-h5 text-white" />
        {errorMessage && (
          <motion.p
            className="-mt-2 text-red-500"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {errorMessage}
          </motion.p>
        )}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col md:flex-row gap-4">
          {OPTIONS.map((opt) => (
            <motion.button key={opt.value} onClick={() => setNoManualChoice(opt.value)}
              className={`p-4 border-2 rounded-lg text-lg transition-all text-center ${noManualChoice === opt.value ? 'bg-white text-black border-white' : 'bg-transparent border-gray-500 hover:border-white text-white'}`}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {opt.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}