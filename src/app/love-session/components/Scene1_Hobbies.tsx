import { motion, MotionValue } from "framer-motion";


import { CustomHobby, HOBBIES_LIST } from "./LoveSessionContainer";
import ChoiceButton from "../../components/ui/ChoiceButton";
import WordByWordAnimation from "@/app/components/ui/WordByWordAnimation";
import { HiOutlinePlusSm } from "react-icons/hi";


interface Props {
  opacity: MotionValue<number>;
  zIndex: MotionValue<number>;
  textProgress: MotionValue<number>;
  selectedHobbies: string[];
  setSelectedHobbies: React.Dispatch<React.SetStateAction<string[]>>;
  customHobbies: CustomHobby[];
  setCustomHobbies: React.Dispatch<React.SetStateAction<CustomHobby[]>>;
  errorMessage?: string;
}

export default function Scene1Hobbies({
  opacity,
  zIndex,
  textProgress,
  selectedHobbies,
  setSelectedHobbies,
  customHobbies,
  setCustomHobbies,
  errorMessage,
}: Props) {
  
  const handleHobbyToggle = (hobby: string) => {
    setSelectedHobbies((prev) =>
      prev.includes(hobby)
        ? prev.filter((h) => h !== hobby)
        : [...prev, hobby]
    );
  };

  const addCustomHobby = () => {
    setCustomHobbies((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: "" },
    ]);
  };

  const updateCustomHobby = (id: string, text: string) => {
    if (text.length > 50) return; 
    setCustomHobbies((prev) =>
      prev.map((h) => (h.id === id ? { ...h, text } : h))
    );
  };

  const removeCustomHobby = (id: string) => {
    setCustomHobbies((prev) => prev.filter((h) => h.id !== id));
  };

  // Count selected (รวม custom ที่พิมพ์แล้ว)
  const nonEmptyCustomCount = customHobbies.filter((h) => h.text.trim()).length;
  const selectedCount = selectedHobbies.length + nonEmptyCustomCount;

  return (
    <motion.div
      style={{ opacity, zIndex }}
      className="fixed top-0 h-screen w-full flex items-center justify-center"
    >
  <div className="flex flex-col items-center gap-5 sm:gap-6 p-3 sm:p-4 max-w-4xl text-center">
        <WordByWordAnimation
          text="แมว : ก่อนจะเดินทางด้วยกัน ข้าอยากรู้ว่าเจ้าเป็นมาอย่างไรนอกจากชื่อเจ้าแล้ว… เลือกสิ่งที่เจ้าทำแล้วรู้สึกไม่เคยเบื่อ หรือทำให้เจ้าใจเต้นเสมอ (ตอบได้หลายข้อ)"
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

        {/* Hobby Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }} // หน่วงเวลาให้ text ขึ้นก่อน
          className="flex flex-wrap justify-center gap-2 sm:gap-3 max-h-[50vh] overflow-y-auto p-3 sm:p-4"
        >
          {HOBBIES_LIST.map((hobby) => (
            <ChoiceButton
              key={hobby}
              text={hobby}
              className="typo-p-md"
              isSelected={selectedHobbies.includes(hobby)}
              onClick={() => handleHobbyToggle(hobby)}
            />
          ))}

          {/* Custom Hobbies */}
          {customHobbies.map((hobby) => (
            <div key={hobby.id} className="relative">
              <input
                type="text"
                value={hobby.text}
                onChange={(e) => updateCustomHobby(hobby.id, e.target.value)}
                placeholder="พิมพ์สิ่งที่ชอบ..."
                className="w-48 bg-transparent border-2 border-gray-500 rounded-full text-center text-sm px-4 py-2 focus:outline-none focus:border-white transition-colors"
                maxLength={50}
              />
              <button 
                onClick={() => removeCustomHobby(hobby.id)}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
            
              </button>
            </div>
          ))}

          {/* Add Button */}
          <button
            onClick={addCustomHobby}
            className="flex items-center justify-center gap-1 w-48 border-2 border-dashed border-gray-500 text-gray-400 rounded-full px-4 py-2 text-sm hover:border-white hover:transition-all"
          >
            <HiOutlinePlusSm />
            เพิ่มช่อง
          </button>
        </motion.div>

        <p className="text-gray-300 text-lg">เลือกแล้ว {selectedCount} / 3</p>
      </div>
    </motion.div>
  );
}