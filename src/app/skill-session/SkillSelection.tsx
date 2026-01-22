"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import SceneLayer from "../components/reusable/SceneLayer";
import {
  HARD_SKILLS_OPTIONS,
  SKILL_SCENE_ITEMS,
  SOFT_SKILLS_OPTIONS,
} from "../data/scene_skill.data";
import { useMouseParallax } from "../hooks/useMouseParallax";

export interface SkillData {
  selectedHardSkills: string[];
  customHardSkills: string[];
  selectedSoftSkills: string[];
  customSoftSkills: string[];
  skillsMatchJob: string;
  useSkillsInNewRole: string;
}

interface SkillSelectionProps {
  onSubmit: (data: SkillData) => void;
}

const SKILLS_MATCH_CHOICES = [
  { id: "match", text: "ตรง" },
  { id: "no_match", text: "ไม่ตรง" },
];

const USE_SKILLS_CHOICES = [
  { id: "yes", text: "ใช่" },
  { id: "no", text: "ไม่ใช่" },
];

export default function SkillSelection({ onSubmit }: SkillSelectionProps) {
  const { smoothMouseX, smoothMouseY } = useMouseParallax();

  const [scene, setScene] = useState<
    "intro" | "hard" | "soft" | "match" | "use" | "transition"
  >("intro");
  const [shouldAnimate, setShouldAnimate] = useState(true);

  const [skillData, setSkillData] = useState<SkillData>({
    selectedHardSkills: [],
    customHardSkills: [],
    selectedSoftSkills: [],
    customSoftSkills: [],
    skillsMatchJob: "",
    useSkillsInNewRole: "",
  });

  //? Custom skill inputs
  const [hardCustomInput, setHardCustomInput] = useState("");
  const [softCustomInput, setSoftCustomInput] = useState("");
  const [showHardCustom, setShowHardCustom] = useState(false);
  const [showSoftCustom, setShowSoftCustom] = useState(false);

  //! Validation helpers
  const totalHardSkills =
    skillData.selectedHardSkills.length + skillData.customHardSkills.length;
  const totalSoftSkills =
    skillData.selectedSoftSkills.length + skillData.customSoftSkills.length;
  const canProceedFromHard = totalHardSkills >= 2;
  const canProceedFromSoft = totalSoftSkills >= 3;

  //? Toggle skill selection
  const toggleHardSkill = (skill: string) => {
    setSkillData((prev) => ({
      ...prev,
      selectedHardSkills: prev.selectedHardSkills.includes(skill)
        ? prev.selectedHardSkills.filter((s) => s !== skill)
        : [...prev.selectedHardSkills, skill],
    }));
  };

  const toggleSoftSkill = (skill: string) => {
    setSkillData((prev) => ({
      ...prev,
      selectedSoftSkills: prev.selectedSoftSkills.includes(skill)
        ? prev.selectedSoftSkills.filter((s) => s !== skill)
        : [...prev.selectedSoftSkills, skill],
    }));
  };

  //? Add custom skill
  const addHardCustom = () => {
    if (hardCustomInput.trim() && hardCustomInput.length <= 50) {
      setSkillData((prev) => ({
        ...prev,
        customHardSkills: [...prev.customHardSkills, hardCustomInput.trim()],
      }));
      setHardCustomInput("");
      setShowHardCustom(false);
    }
  };

  const addSoftCustom = () => {
    if (softCustomInput.trim() && softCustomInput.length <= 50) {
      setSkillData((prev) => ({
        ...prev,
        customSoftSkills: [...prev.customSoftSkills, softCustomInput.trim()],
      }));
      setSoftCustomInput("");
      setShowSoftCustom(false);
    }
  };

  //? Remove custom skill
  const removeHardCustom = (index: number) => {
    setSkillData((prev) => ({
      ...prev,
      customHardSkills: prev.customHardSkills.filter((_, i) => i !== index),
    }));
  };

  const removeSoftCustom = (index: number) => {
    setSkillData((prev) => ({
      ...prev,
      customSoftSkills: prev.customSoftSkills.filter((_, i) => i !== index),
    }));
  };

  //? Scene navigation
  const handleIntroNext = () => {
    setShouldAnimate(false);
    setTimeout(() => {
      setScene("hard");
      setShouldAnimate(true);
    }, 500);
  };

  const handleHardNext = () => {
    if (!canProceedFromHard) return;
    setShouldAnimate(false);
    setTimeout(() => {
      setScene("soft");
      setShouldAnimate(true);
    }, 500);
  };

  const handleSoftNext = () => {
    if (!canProceedFromSoft) return;
    setShouldAnimate(false);
    setTimeout(() => {
      setScene("match");
      setShouldAnimate(true);
    }, 500);
  };

  const handleMatchAnswer = (answer: string) => {
    setSkillData((prev) => ({ ...prev, skillsMatchJob: answer }));
    setShouldAnimate(false);
    setTimeout(() => {
      setScene("use");
      setShouldAnimate(true);
    }, 500);
  };

  const handleUseAnswer = (answer: string) => {
    const finalData = { ...skillData, useSkillsInNewRole: answer };
    setSkillData(finalData);
    setShouldAnimate(false);
    setTimeout(() => {
      setScene("transition");
      onSubmit(finalData);
    }, 500);
  };

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Scene Background */}
      <SceneLayer
        items={SKILL_SCENE_ITEMS}
        parallaxMouse={{ x: smoothMouseX, y: smoothMouseY }}
        shouldAnimate={shouldAnimate}
        containerAspectRatio="1920 / 1080"
      />

      {/* Scene 7.1 - Intro */}
      {scene === "intro" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="bg-black/70 p-8 rounded-lg max-w-2xl text-center">
            <p className="text-white text-xl mb-6">
              🐱 จงเลือกสิ่งที่เจ้าถนัดมากที่สุด
            </p>
            <button
              type="button"
              onClick={handleIntroNext}
              className="px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:scale-105 transition-transform"
            >
              เริ่มเลือก
            </button>
          </div>
        </motion.div>
      )}

      {/* Scene 7.2 - Hard Skills Selection */}
      {scene === "hard" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute inset-0 z-10 overflow-y-auto"
        >
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-black/80 p-8 rounded-lg">
              <h2 className="text-white text-2xl mb-4 text-center">
                🐱 เลือกสิ่งที่เจ้าถนัด (Hard Skills) อย่างน้อย 2 อย่าง
              </h2>
              <p className="text-gray-300 text-center mb-6">
                เลือกแล้ว: {totalHardSkills} / 2+
              </p>

              {/* Selected Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {HARD_SKILLS_OPTIONS.map((skill) => {
                  const isSelected =
                    skillData.selectedHardSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleHardSkill(skill)}
                      className={`p-4 rounded-lg text-left transition-all ${
                        isSelected
                          ? "bg-purple-600 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>

              {/* Custom Skills */}
              <div className="mb-6">
                <h3 className="text-white text-lg mb-3">ทักษะที่เพิ่มเอง:</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {skillData.customHardSkills.map((skill, idx) => (
                    <div
                      key={`hard-custom-${skill}`}
                      className="bg-pink-600 text-white px-4 py-2 rounded-full flex items-center gap-2"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => removeHardCustom(idx)}
                        className="text-white hover:text-red-300"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                {!showHardCustom && (
                  <button
                    type="button"
                    onClick={() => setShowHardCustom(true)}
                    className="text-white border border-white px-4 py-2 rounded-lg hover:bg-white/10"
                  >
                    + เพิ่มทักษะ (ไม่เกิน 50 ตัวอักษร)
                  </button>
                )}

                {showHardCustom && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={hardCustomInput}
                      onChange={(e) => setHardCustomInput(e.target.value)}
                      maxLength={50}
                      placeholder="พิมพ์ทักษะของคุณ..."
                      className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={addHardCustom}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      เพิ่ม
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowHardCustom(false);
                        setHardCustomInput("");
                      }}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                      ยกเลิก
                    </button>
                  </div>
                )}
              </div>

              {/* Next Button */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleHardNext}
                  disabled={!canProceedFromHard}
                  className={`px-8 py-3 rounded-lg text-white transition-all ${
                    canProceedFromHard
                      ? "bg-linear-to-r from-purple-500 to-pink-500 hover:scale-105"
                      : "bg-gray-600 cursor-not-allowed opacity-50"
                  }`}
                >
                  ถัดไป
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Scene 7.3 - Soft Skills Selection */}
      {scene === "soft" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute inset-0 z-10 overflow-y-auto py-20"
        >
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-black/80 p-8 rounded-lg">
              <h2 className="text-white text-2xl mb-4 text-center">
                🐱 เลือกสิ่งที่เจ้าคิดว่ามี (Soft Skills) อย่างน้อย 3 อย่าง
              </h2>
              <p className="text-gray-300 text-center mb-6">
                เลือกแล้ว: {totalSoftSkills} / 3+
              </p>

              {/* Selected Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {SOFT_SKILLS_OPTIONS.map((skill) => {
                  const isSelected =
                    skillData.selectedSoftSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSoftSkill(skill)}
                      className={`p-4 rounded-lg text-left transition-all ${
                        isSelected
                          ? "bg-purple-600 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>

              {/* Custom Skills */}
              <div className="mb-6">
                <h3 className="text-white text-lg mb-3">ทักษะที่เพิ่มเอง:</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {skillData.customSoftSkills.map((skill, idx) => (
                    <div
                      key={`soft-custom-${skill}`}
                      className="bg-pink-600 text-white px-4 py-2 rounded-full flex items-center gap-2"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => removeSoftCustom(idx)}
                        className="text-white hover:text-red-300"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                {!showSoftCustom && (
                  <button
                    type="button"
                    onClick={() => setShowSoftCustom(true)}
                    className="text-white border border-white px-4 py-2 rounded-lg hover:bg-white/10"
                  >
                    + เพิ่มทักษะ (ไม่เกิน 50 ตัวอักษร)
                  </button>
                )}

                {showSoftCustom && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={softCustomInput}
                      onChange={(e) => setSoftCustomInput(e.target.value)}
                      maxLength={50}
                      placeholder="พิมพ์ทักษะของคุณ..."
                      className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={addSoftCustom}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      เพิ่ม
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowSoftCustom(false);
                        setSoftCustomInput("");
                      }}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                      ยกเลิก
                    </button>
                  </div>
                )}
              </div>

              {/* Next Button */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleSoftNext}
                  disabled={!canProceedFromSoft}
                  className={`px-8 py-3 rounded-lg text-white transition-all ${
                    canProceedFromSoft
                      ? "bg-linear-to-r from-purple-500 to-pink-500 hover:scale-105"
                      : "bg-gray-600 cursor-not-allowed opacity-50"
                  }`}
                >
                  ถัดไป
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Scene 7.4 - Skills Match Job */}
      {scene === "match" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="bg-black/80 p-8 rounded-lg max-w-2xl text-center">
            <p className="text-white text-xl mb-6">
              🐱 จากความถนัดของเจ้า มีตรงกับความต้องการของงานหรือไม่?
            </p>
            <div className="flex gap-4 justify-center">
              {SKILLS_MATCH_CHOICES.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => handleMatchAnswer(choice.text)}
                  className={`px-8 py-3 rounded-lg text-white hover:scale-105 transition-transform ${
                    choice.id === "match" ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Scene 7.5 - Use Skills in New Role */}
      {scene === "use" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="bg-black/80 p-8 rounded-lg max-w-2xl text-center">
            <p className="text-white text-xl mb-4">
              🐱 สมมติบทบาทของ 'นักศึกษา' กำลังจะสิ้นสุดลง...
            </p>
            <p className="text-white text-lg mb-6">
              เจ้าต้องก้าวสู่บทบาทใหม่ใน 'โลกแห่งการทำงาน'
              เจ้าคิดว่าจะได้ใช้ความถนัดที่เจ้าเลือกมานี้ไหม?
            </p>
            <div className="flex gap-4 justify-center">
              {USE_SKILLS_CHOICES.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => handleUseAnswer(choice.text)}
                  className={`px-8 py-3 rounded-lg text-white hover:scale-105 transition-transform ${
                    choice.id === "yes" ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
