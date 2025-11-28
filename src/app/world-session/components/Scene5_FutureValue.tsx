import { motion, MotionValue } from "framer-motion";

import { FutureValueAnswer } from "./WorldSessionContainer";
import WordByWordAnimation from "@/app/components/ui/WordByWordAnimation";

interface Props {
  opacity: MotionValue<number>;
  zIndex: MotionValue<number>;
  textProgress: MotionValue<number>;
  futureValueAnswer: FutureValueAnswer;
  setFutureValueAnswer: React.Dispatch<React.SetStateAction<FutureValueAnswer>>;
  errorMessage?: string;
  handleSubmit: () => void | Promise<void>;
  isLoading: boolean;
}

const OPTIONS: { value: FutureValueAnswer; label: string }[] = [
  { value: "yes", label: "ใช่" },
  { value: "no", label: "ไม่" },
];

export default function Scene5FutureValue({
  opacity,
  zIndex,
  textProgress,
  futureValueAnswer,
  setFutureValueAnswer,
  errorMessage,
  handleSubmit,
  isLoading,
}: Props) {
  const text = "แมว : เจ้าคิดหรือไม่…ว่างานที่เจ้าเลือก \n จะยังคงมีคุณค่าในอีกสิบปีข้างหน้า?";

  return (
    <motion.div
      style={{ opacity, zIndex }}
      className="fixed top-0 h-screen w-full flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-8 p-4 max-w-2xl text-center">
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
              onClick={() => setFutureValueAnswer(opt.value)}
              className={`w-48 p-3 border-2 rounded-lg text-xl transition-all ${futureValueAnswer === opt.value ? "bg-white text-black border-white" : "bg-transparent border-gray-500 hover:border-white text-white"}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {opt.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          onClick={handleSubmit}
          disabled={isLoading}
          className="mt-4 px-8 py:3 sm:py-3 bg-white text-black text-xl rounded-lg font-semibold transition-all hover:bg-opacity-90 disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? "กำลังบันทึก..." : "บันทึกและเดินทางต่อ"}
        </motion.button>
      </div>
    </motion.div>
  );
}
