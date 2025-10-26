import { motion, MotionValue } from "framer-motion";

import WordByWordAnimation from "@/app/components/ui/WordByWordAnimation";
import {
  CustomSkill,
  HARD_SKILLS_LIST,
  SOFT_SKILLS_LIST,
} from "./SkillSessionContainer";
import ChoiceButton from "@/app/components/ui/ChoiceButton";


// --- Props Interface ---
interface Props {
  opacity: MotionValue<number>;
  zIndex: MotionValue<number>;
  textProgress: MotionValue<number>;
  selectedHardSkills: string[];
  setSelectedHardSkills: React.Dispatch<React.SetStateAction<string[]>>;
  customHardSkills: CustomSkill[];
  setCustomHardSkills: React.Dispatch<React.SetStateAction<CustomSkill[]>>;
  selectedSoftSkills: string[];
  setSelectedSoftSkills: React.Dispatch<React.SetStateAction<string[]>>;
  customSoftSkills: CustomSkill[];
  setCustomSoftSkills: React.Dispatch<React.SetStateAction<CustomSkill[]>>;
  errorHardMessage?: string;
  errorSoftMessage?: string;
}

export default function Scene1Skills({
  opacity,
  zIndex,
  textProgress,
  selectedHardSkills,
  setSelectedHardSkills,
  customHardSkills,
  setCustomHardSkills,
  selectedSoftSkills,
  setSelectedSoftSkills,
  customSoftSkills,
  setCustomSoftSkills,
  errorHardMessage,
  errorSoftMessage,
}: Props) {
    
  // --- Handler Functions ---
  const handleHardSkillToggle = (skill: string) => {
    setSelectedHardSkills((prev) => {
      if (prev.includes(skill)) return prev.filter((s) => s !== skill);
      if (prev.length < 2) return [...prev, skill];
      return prev;
    });
  };

  const handleSoftSkillToggle = (skill: string) => {
    setSelectedSoftSkills((prev) => {
      if (prev.includes(skill)) return prev.filter((s) => s !== skill);
      if (prev.length < 3) return [...prev, skill];
      return prev;
    });
  };

  // Generic handlers for custom skills to reduce repetition
  const addCustomSkill = (setter: React.Dispatch<React.SetStateAction<CustomSkill[]>>) => {
    setter((prev) => [...prev, { id: crypto.randomUUID(), text: "" }]);
  };

  const updateCustomSkill = (id: string, text: string, setter: React.Dispatch<React.SetStateAction<CustomSkill[]>>) => {
    if (text.length > 50) return;
    setter((prev) => prev.map((s) => (s.id === id ? { ...s, text } : s)));
  };

  const removeCustomSkill = (id: string, setter: React.Dispatch<React.SetStateAction<CustomSkill[]>>) => {
    setter((prev) => prev.filter((s) => s.id !== id));
  };


  return (
    <motion.div
      style={{ opacity, zIndex }}
      className="fixed top-0 h-screen w-full flex items-center justify-center"
    >
  <div className="flex flex-col xl:flex-row items-start justify-center gap-6 sm:gap-8 p-3 sm:p-4 w-full max-w-7xl text-center">
        
        {/* Hard Skills Section */}
  <div className="flex-1 flex flex-col items-center gap-3 sm:gap-4 w-full">
          <WordByWordAnimation
            text="แมว: จงเลือกสิ่งที่เจ้าถนัดมากที่สุด 2 อย่าง ถ้าไม่แน่ใจ ให้เลือกสิ่งที่คิดว่าทำได้ดี ณ ตอนนี้? (Hard Skills)"
            scrollYProgress={textProgress} as="p"
className="typo-h5 text-white"
          />
           {errorHardMessage && (
            <motion.p
              className="-mt-2 text-red-500"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {errorHardMessage}
            </motion.p>
          )}
           <p className="text-gray-300">เลือกแล้ว {selectedHardSkills.length} / 2</p>
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 max-h-[50vh] overflow-y-auto p-3 sm:p-4"
          >
            {HARD_SKILLS_LIST.map((skill) => (
              <ChoiceButton className="typo-p-md" key={skill} text={skill} isSelected={selectedHardSkills.includes(skill)} onClick={() => handleHardSkillToggle(skill)} />
            ))}
            {customHardSkills.map((skill) => (
              <CustomSkillInput key={skill.id} skill={skill} onUpdate={(text) => updateCustomSkill(skill.id, text, setCustomHardSkills)} onRemove={() => removeCustomSkill(skill.id, setCustomHardSkills)} />
            ))}
            <AddSkillButton onClick={() => addCustomSkill(setCustomHardSkills)} />
          </motion.div>
        </div>

        {/* Soft Skills Section */}
  <div className="flex-1 flex flex-col items-center gap-3 sm:gap-4 w-full">
           <WordByWordAnimation
            text="แมว: เลือกสิ่งที่เจ้าคิดว่าเจ้ามี 3 อย่าง ถ้าไม่แน่ใจ ให้เลือกสิ่งที่คิดว่าทำได้ดี ณ ตอนนี้? (Soft Skills)"
            scrollYProgress={textProgress} as="p"
className="typo-h5 text-white"
          />
           {errorSoftMessage && (
            <motion.p
              className="-mt-2 text-red-500"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {errorSoftMessage}
            </motion.p>
          )}
           <p className="text-gray-300">เลือกแล้ว {selectedSoftSkills.length} / 3</p>
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 max-h-[50vh] overflow-y-auto p-3 sm:p-4"
          >
            {SOFT_SKILLS_LIST.map((skill) => (
              <ChoiceButton className="typo-p-md" key={skill} text={skill} isSelected={selectedSoftSkills.includes(skill)} onClick={() => handleSoftSkillToggle(skill)} />
            ))}
            {customSoftSkills.map((skill) => (
              <CustomSkillInput key={skill.id} skill={skill} onUpdate={(text) => updateCustomSkill(skill.id, text, setCustomSoftSkills)} onRemove={() => removeCustomSkill(skill.id, setCustomSoftSkills)} />
            ))}
            <AddSkillButton onClick={() => addCustomSkill(setCustomSoftSkills)} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}


// --- Sub-components for cleaner code ---

const CustomSkillInput = ({ skill, onUpdate, onRemove }: { skill: CustomSkill, onUpdate: (text: string) => void, onRemove: () => void }) => (
  <div className="relative">
    <input
      type="text" value={skill.text} onChange={(e) => onUpdate(e.target.value)}
      placeholder="พิมพ์ทักษะ..."
      className="w-48 bg-transparent border-2 border-gray-500 rounded-full text-center text-sm px-4 py-2 focus:outline-none focus:border-white transition-colors"
      maxLength={50}
    />
    <button onClick={onRemove} className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
    
    </button>
  </div>
);

const AddSkillButton = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="flex items-center justify-center gap-1 w-48 border-2 border-dashed border-gray-500 text-gray-400 rounded-full px-4 py-2 text-sm hover:border-white hover:transition-all">
   
    เพิ่มช่อง
  </button>
);