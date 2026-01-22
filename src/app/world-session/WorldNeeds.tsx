"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import SceneLayer from "../components/reusable/SceneLayer";
import {
  WORLD_GIFTS_OPTIONS,
  WORLD_SCENE_ITEMS,
} from "../data/scene_world.data";
import { useMouseParallax } from "../hooks/useMouseParallax";

export interface WorldData {
  calledUponAnswer: string;
  selectedGifts: string[];
  noManualChoice: string;
  mismatchChoice: string;
  futureValueAnswer: string;
}

interface WorldNeedsProps {
  onSubmit: (data: WorldData) => void;
}

const CALLED_UPON_CHOICES = [
  { id: "yes", text: "เคย" },
  { id: "no", text: "ไม่เคย" },
];

const NO_MANUAL_CHOICES = [
  { id: "do_it_myself", text: "ลงมือหาวิธีด้วยตัวเอง" },
  { id: "ask_first", text: "ขอคำสั่งหรือ feedback ก่อนแล้วจึงทำตาม" },
];

const MISMATCH_CHOICES = [
  { id: "adapt_self", text: "ปรับตัวเอง (พัฒนาทัศนคติ)" },
  { id: "adapt_role", text: "ปรับบทบาท (ใช้ความถนัดประยุกต์กับงาน)" },
  { id: "both", text: "ทั้งคู่" },
];

const FUTURE_VALUE_CHOICES = [
  { id: "yes", text: "ใช่" },
  { id: "no", text: "ไม่" },
];

export default function WorldNeeds({ onSubmit }: WorldNeedsProps) {
  const { smoothMouseX, smoothMouseY } = useMouseParallax();

  const [scene, setScene] = useState<
    | "intro"
    | "called"
    | "gifts"
    | "noManual"
    | "mismatch"
    | "future"
    | "transition"
  >("intro");
  const [shouldAnimate, setShouldAnimate] = useState(true);

  const [worldData, setWorldData] = useState<WorldData>({
    calledUponAnswer: "",
    selectedGifts: [],
    noManualChoice: "",
    mismatchChoice: "",
    futureValueAnswer: "",
  });

  //? Toggle gift selection
  const toggleGift = (gift: string) => {
    setWorldData((prev) => ({
      ...prev,
      selectedGifts: prev.selectedGifts.includes(gift)
        ? prev.selectedGifts.filter((g) => g !== gift)
        : [...prev.selectedGifts, gift],
    }));
  };

  //? Scene navigation
  const handleIntroNext = () => {
    setShouldAnimate(false);
    setTimeout(() => {
      setScene("called");
      setShouldAnimate(true);
    }, 500);
  };

  const handleCalledAnswer = (answer: string) => {
    setWorldData((prev) => ({ ...prev, calledUponAnswer: answer }));
    setShouldAnimate(false);
    setTimeout(() => {
      setScene("gifts");
      setShouldAnimate(true);
    }, 500);
  };

  const handleGiftsNext = () => {
    if (worldData.selectedGifts.length < 1) return;
    setShouldAnimate(false);
    setTimeout(() => {
      setScene("noManual");
      setShouldAnimate(true);
    }, 500);
  };

  const handleNoManualAnswer = (answer: string) => {
    setWorldData((prev) => ({ ...prev, noManualChoice: answer }));
    setShouldAnimate(false);
    setTimeout(() => {
      setScene("mismatch");
      setShouldAnimate(true);
    }, 500);
  };

  const handleMismatchAnswer = (answer: string) => {
    setWorldData((prev) => ({ ...prev, mismatchChoice: answer }));
    setShouldAnimate(false);
    setTimeout(() => {
      setScene("future");
      setShouldAnimate(true);
    }, 500);
  };

  const handleFutureAnswer = (answer: string) => {
    const finalData = { ...worldData, futureValueAnswer: answer };
    setWorldData(finalData);
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
        items={WORLD_SCENE_ITEMS}
        parallaxMouse={{ x: smoothMouseX, y: smoothMouseY }}
        shouldAnimate={shouldAnimate}
        containerAspectRatio="1920 / 1080"
      />

      {/* Scene 8.1 - Intro */}
      {scene === "intro" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="bg-black/70 p-8 rounded-lg max-w-2xl text-center">
            <p className="text-white text-xl mb-6">
              🐱 เจ้ามองเห็นหรือไม่… โลกใบนี้เต็มไปด้วยเสียงเรียกร้อง
            </p>
            <button
              type="button"
              onClick={handleIntroNext}
              className="px-6 py-3 bg-linear-to-r from-blue-500 to-green-500 text-white rounded-lg hover:scale-105 transition-transform"
            >
              ดำเนินการต่อ
            </button>
          </div>
        </motion.div>
      )}

      {/* Scene 8.2 - Called Upon */}
      {scene === "called" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="bg-black/80 p-8 rounded-lg max-w-2xl text-center">
            <p className="text-white text-xl mb-6">
              🐱 เจ้าล่ะ… เคยมีใครขอให้เจ้าช่วยเหลือสิ่งใดบ้างไหม
              หรือคนส่วนใหญ่มักพูดขอบคุณเจ้า?
            </p>
            <div className="flex gap-4 justify-center">
              {CALLED_UPON_CHOICES.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => handleCalledAnswer(choice.text)}
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

      {/* Scene 8.3 - Select Gifts */}
      {scene === "gifts" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute inset-0 z-10 overflow-y-auto py-20"
        >
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-black/80 p-8 rounded-lg">
              <h2 className="text-white text-2xl mb-4 text-center">
                🐱 เมื่อเสียงเรียกร้องมาถึงเจ้า… เจ้าจะเลือกมอบสิ่งใดให้โลก?
              </h2>
              <p className="text-gray-300 text-center mb-6">
                เลือกแล้ว: {worldData.selectedGifts.length} (อย่างน้อย 1)
              </p>

              {/* Lotus Cards - Gifts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {WORLD_GIFTS_OPTIONS.map((gift) => {
                  const isSelected = worldData.selectedGifts.includes(gift);
                  return (
                    <button
                      key={gift}
                      type="button"
                      onClick={() => toggleGift(gift)}
                      className={`p-4 rounded-lg text-left transition-all ${
                        isSelected
                          ? "bg-linear-to-r from-blue-600 to-green-600 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      🌸 {gift}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleGiftsNext}
                  disabled={worldData.selectedGifts.length < 1}
                  className={`px-8 py-3 rounded-lg text-white transition-all ${
                    worldData.selectedGifts.length >= 1
                      ? "bg-linear-to-r from-blue-500 to-green-500 hover:scale-105"
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

      {/* Scene 8.4 - No Manual Work */}
      {scene === "noManual" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="bg-black/80 p-8 rounded-lg max-w-2xl text-center">
            <p className="text-white text-xl mb-4">
              🐱 มีงานถูกวางตรงหน้าเจ้า… แต่ไม่มีคู่มือหรือคำสั่งใด ๆ
            </p>
            <p className="text-white text-lg mb-6">เจ้าจะเลือกทำอย่างไร?</p>
            <div className="flex flex-col gap-3 max-w-md mx-auto">
              {NO_MANUAL_CHOICES.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => handleNoManualAnswer(choice.text)}
                  className={`px-6 py-3 rounded-lg text-white hover:scale-105 transition-transform ${
                    choice.id === "do_it_myself"
                      ? "bg-purple-600"
                      : "bg-orange-600"
                  }`}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Scene 8.5 - Mismatch Choice */}
      {scene === "mismatch" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="bg-black/80 p-8 rounded-lg max-w-2xl text-center">
            <p className="text-white text-xl mb-4">
              🐱 ถ้างานที่ได้รับไม่ตรงกับสิ่งที่เจ้าอยากทำ
            </p>
            <p className="text-white text-lg mb-6">
              เช่น งานด้านตัวเลขในขณะที่เจ้าใฝ่หาความคิดสร้างสรรค์…
              เจ้าจะเลือกอย่างไร?
            </p>
            <div className="flex flex-col gap-3 max-w-md mx-auto">
              {MISMATCH_CHOICES.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => handleMismatchAnswer(choice.text)}
                  className={`px-6 py-3 rounded-lg text-white hover:scale-105 transition-transform ${
                    choice.id === "adapt_self"
                      ? "bg-blue-600"
                      : choice.id === "adapt_role"
                        ? "bg-green-600"
                        : "bg-purple-600"
                  }`}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Scene 8.6 - Future Value */}
      {scene === "future" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="bg-black/80 p-8 rounded-lg max-w-2xl text-center">
            <p className="text-white text-xl mb-6">
              🐱 เจ้าคิดหรือไม่…ว่างานที่เจ้าเลือกจะยังคงมีคุณค่า
              ในอีกสิบปีข้างหน้า?
            </p>
            <div className="flex gap-4 justify-center">
              {FUTURE_VALUE_CHOICES.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => handleFutureAnswer(choice.text)}
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
