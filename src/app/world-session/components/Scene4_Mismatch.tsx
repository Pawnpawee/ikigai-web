import { motion, MotionValue } from "framer-motion";

import { MismatchChoice } from "./WorldSessionContainer";
import WordByWordAnimation from "@/app/components/ui/WordByWordAnimation";

interface Props {
  opacity: MotionValue<number>;
  zIndex: MotionValue<number>;
  textProgress: MotionValue<number>;
  mismatchChoice: MismatchChoice;
  setMismatchChoice: React.Dispatch<React.SetStateAction<MismatchChoice>>;
  errorMessage?: string;
}

const OPTIONS: { value: MismatchChoice; label: string }[] = [
    { value: "adapt_self", label: "ปรับตัวเอง (พัฒนา ทัศนคติ)" },
    { value: "adapt_role", label: "ปรับบทบาท (ใช้ความถนัดของตนประยุกต์กับงาน)" },
    { value: "both", label: "ทั้งคู่" },
];

export default function Scene4Mismatch({ opacity, zIndex, textProgress, mismatchChoice, setMismatchChoice, errorMessage }: Props) {
  const text = "ถ้างานที่ได้รับไม่ตรงกับสิ่งที่เจ้าอยากทำ เช่น งานด้านตัวเลขในขณะที่เจ้าใฝ่หาความคิดสร้างสรรค์… เจ้าจะเลือกอย่างไร";
  
  return (
    <motion.div style={{ opacity, zIndex }} className="fixed top-0 h-screen w-full flex items-center justify-center">
  <div className="flex flex-col items-center gap-6 sm:gap-8 p-3 sm:p-4 max-w-3xl text-center">
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
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col md:flex-row gap-3 md:gap-4">
          {OPTIONS.map((opt) => (
            <motion.button key={opt.value} onClick={() => setMismatchChoice(opt.value)}
              className={`p-4 border-2 rounded-lg text-lg transition-all text-center ${mismatchChoice === opt.value ? 'bg-white text-black border-white' : 'bg-transparent border-gray-500 hover:border-white text-white'}`}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {opt.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}