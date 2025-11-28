import { motion, MotionValue } from "framer-motion";

import { EverPaidAnswer } from "./PaidSessionContainer";
import WordByWordAnimation from "@/app/components/ui/WordByWordAnimation";

interface Props {
  opacity: MotionValue<number>;
  zIndex: MotionValue<number>;
  textProgress: MotionValue<number>;
  everPaidAnswer: EverPaidAnswer;
  setEverPaidAnswer: React.Dispatch<React.SetStateAction<EverPaidAnswer>>;
  errorMessage?: string;
}

const OPTIONS: { value: EverPaidAnswer; label: string }[] = [
  { value: "yes", label: "ใช่" },
  { value: "no", label: "ไม่" },
];

export default function Scene1EverPaid({
  opacity,
  zIndex,
  textProgress,
  everPaidAnswer,
  setEverPaidAnswer,
  errorMessage,
}: Props) {
  const text =
    "แมว : เจ้ามาถึงตลาดแห่งรายได้แล้ว… สถานที่ที่ทุกทักษะ ทุกความสามารถ มีค่าและสามารถเปลี่ยนเป็นรายได้ได้ เจ้าล่ะ เคยได้รับค่าจ้างจากสิ่งใดบ้างหรือไม่?";

  return (
    <motion.div
      style={{ opacity, zIndex }}
      className="fixed top-0 h-screen w-full flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-6 sm:gap-8 p-3 sm:p-4 max-w-3xl text-center">
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
          className="flex gap-4"
        >
          {OPTIONS.map((opt) => (
            <motion.button
              key={opt.value}
              onClick={() => setEverPaidAnswer(opt.value)}
              className={`w-48 p-3 border-2 rounded-lg text-xl transition-all ${everPaidAnswer === opt.value ? "bg-white text-black border-white" : "bg-transparent border-gray-500 hover:border-white text-white"}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {opt.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
