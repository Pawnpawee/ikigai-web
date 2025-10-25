import { motion, MotionValue } from "framer-motion";

import { MatchAnswer } from "./SkillSessionContainer";
import WordByWordAnimation from "@/app/components/ui/WordByWordAnimation";

interface Props {
  opacity: MotionValue<number>;
  zIndex: MotionValue<number>;
  textProgress: MotionValue<number>;
  skillsMatchJob: MatchAnswer;
  setSkillsMatchJob: React.Dispatch<React.SetStateAction<MatchAnswer>>;
  errorMessage?: string;
}

const MATCH_OPTIONS: { value: MatchAnswer; label: string }[] = [
  { value: "match", label: "ตรง" },
  { value: "no_match", label: "ไม่ตรง" },
];

export default function Scene2Match({
  opacity,
  zIndex,
  textProgress,
  skillsMatchJob,
  setSkillsMatchJob,
  errorMessage,
}: Props) {
  return (
    <motion.div
      style={{ opacity, zIndex }}
      className="fixed top-0 h-screen w-full flex items-center justify-center"
    >
  <div className="flex flex-col items-center gap-6 sm:gap-8 p-3 sm:p-4 max-w-xl sm:max-w-2xl text-center">
        <WordByWordAnimation
          text="แมว: จากความถนัดของเจ้า มีตรงกับความต้องการของงานหรือไม่?"
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
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          {MATCH_OPTIONS.map((opt) => (
            <motion.button
              key={opt.value}
              onClick={() => setSkillsMatchJob(opt.value)}
              className={`w-48 p-3 border-2 rounded-lg text-xl transition-all ${
                skillsMatchJob === opt.value
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent border-gray-500 hover:border-white text-white'
              }`}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >
              {opt.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}