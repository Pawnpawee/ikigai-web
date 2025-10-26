import { motion, MotionValue } from "framer-motion";


import ChoiceButton from "../../components/ui/ChoiceButton";
import WordByWordAnimation from "@/app/components/ui/WordByWordAnimation";

interface Props {
  opacity: MotionValue<number>;
  zIndex: MotionValue<number>;
  textProgress: MotionValue<number>;
  allHobbies: string[];
  topThree: string[];
  setTopThree: React.Dispatch<React.SetStateAction<string[]>>;
  errorMessage?: string;
}

export default function Scene2TopThree({
  opacity,
    zIndex,
  textProgress,
  allHobbies,
  topThree,
  setTopThree,
  errorMessage,
}: Props) {
  
  const handleTopThreeToggle = (hobby: string) => {
    setTopThree((prev) => {
      if (prev.includes(hobby)) {
        // Deselect
        return prev.filter((h) => h !== hobby);
      } else if (prev.length < 3) {
        // Select (if not full)
        return [...prev, hobby];
      }
      // If full (3 items) and trying to select a new one, do nothing
      return prev;
    });
  };

  return (
    <motion.div
      style={{ opacity , zIndex}}
      className="fixed top-0 h-screen w-full flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-6 p-4 max-w-4xl text-center">
        <WordByWordAnimation
          text="แมว: เลือก 3 สิ่งที่เจ้าจะทำมันอยู่ดี แม้ว่าเจ้าจะไม่ได้อะไรตอบแทนเลยก็ตาม?"
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
          className="flex flex-wrap justify-center gap-3 max-h-[50vh] overflow-y-auto p-4"
        >
          {allHobbies.length === 0 ? (
            <p className="text-gray-400">กรุณากลับไปเลือกสิ่งที่เจ้าชอบในฉากก่อนหน้า...</p>
          ) : (
            allHobbies.map((hobby) => (
              <ChoiceButton
                key={hobby}
                text={hobby}
                className="typo-p-md"
                isSelected={topThree.includes(hobby)}
                onClick={() => handleTopThreeToggle(hobby)}
              />
            ))
          )}
        </motion.div>
        
        <p className="text-gray-300 text-lg">
          เลือกแล้ว {topThree.length} / 3
        </p>
      </div>
    </motion.div>
  );
}