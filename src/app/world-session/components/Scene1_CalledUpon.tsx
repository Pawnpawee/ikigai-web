import { motion, MotionValue } from "framer-motion";

import { CalledUponAnswer } from "./WorldSessionContainer";
import WordByWordAnimation from "@/app/components/ui/WordByWordAnimation";

interface Props {
  opacity: MotionValue<number>;
  zIndex: MotionValue<number>;
  textProgress: MotionValue<number>;
  calledUponAnswer: CalledUponAnswer;
  setCalledUponAnswer: React.Dispatch<React.SetStateAction<CalledUponAnswer>>;
  errorMessage?: string;
}

const OPTIONS: { value: CalledUponAnswer; label: string }[] = [
  { value: "yes", label: "เคย" },
  { value: "no", label: "ไม่เคย" },
];

export default function Scene1CalledUpon({ opacity, zIndex, textProgress, calledUponAnswer, setCalledUponAnswer, errorMessage }: Props) {
  const text = "แมว : เจ้ามองเห็นหรือไม่… โลกใบนี้เต็มไปด้วยเสียงเรียกร้อง ทุกแห่งต่างตามหาผู้คนที่จะมอบบางสิ่งให้แก่พวกเขา เจ้าล่ะ… เคยมีใครเรียกร้องให้เจ้าช่วยเหลือสิ่งใดบ้างไหม หรือลองคิดถึงครั้งล่าสุดที่มีคนชมผลงานของเจ้า ?";

  return (
    <motion.div style={{ opacity, zIndex }} className="fixed top-0 h-screen w-full flex items-center justify-center">
  <div className="flex flex-col items-center gap-6 sm:gap-8 p-3 sm:p-4 max-w-4xl text-center">
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
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex gap-4">
          {OPTIONS.map((opt) => (
            <motion.button key={opt.value} onClick={() => setCalledUponAnswer(opt.value)}
              className={`w-48 p-3 border-2 rounded-lg text-xl transition-all ${calledUponAnswer === opt.value ? 'bg-white text-black border-white' : 'bg-transparent border-gray-500 hover:border-white text-white'}`}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {opt.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}