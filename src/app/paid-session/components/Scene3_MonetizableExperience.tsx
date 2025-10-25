import { motion, MotionValue } from "framer-motion";

import WordByWordAnimation from "@/app/components/ui/WordByWordAnimation";

interface Props {
  opacity: MotionValue<number>;
  zIndex: MotionValue<number>;
  textProgress: MotionValue<number>;
  monetizableExperience: string;
  setMonetizableExperience: React.Dispatch<React.SetStateAction<string>>;
  errorMessage?: string;
  handleSubmit?: () => void;
  isLoading?: boolean;
}

export default function Scene3MonetizableExperience({ opacity, zIndex, textProgress, monetizableExperience, setMonetizableExperience, errorMessage, handleSubmit, isLoading }: Props) {
  const text = "แมว : เจ้าคิดว่าเคยช่วยใครแล้วพูดกับตัวเองว่า… ‘ว้าว ฉันคิดเงินได้จากสิ่งนี้นะ’ ไหม? บางครั้งสิ่งที่เจอในอดีต อาจบอกเส้นทางให้เจ้ารู้ว่าเจ้าเก่งอะไร และสิ่งนั้นมีค่าในตลาด";
  
  return (
    <motion.div style={{ opacity, zIndex }} className="fixed top-0 h-screen w-full flex items-center justify-center">
  <div className="flex flex-col items-center gap-6 sm:gap-8 p-3 sm:p-4 max-w-3xl text-center">
        <WordByWordAnimation text={text} scrollYProgress={textProgress} as="p"
className="typo-h5 text-white" />
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="w-full relative">
          <textarea
            value={monetizableExperience}
            onChange={(e) => setMonetizableExperience(e.target.value)}
            maxLength={100}
            placeholder="เล่าประสบการณ์ของเจ้า..."
            className="w-full h-32 bg-transparent border-2 border-gray-500 rounded-xl text-center text-lg p-4 focus:outline-none focus:border-white transition-colors resize-none text-white"
          />
          <span className="absolute bottom-2 right-3 text-xs text-gray-400">
            {monetizableExperience.length} / 100
          </span>
          {errorMessage && (
            <motion.p
              className="mt-2 text-red-500"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {errorMessage}
            </motion.p>
          )}
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
            {isLoading ? 'กำลังส่งข้อมูล...' : 'ส่งข้อมูลเพื่อประเมิน'}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}