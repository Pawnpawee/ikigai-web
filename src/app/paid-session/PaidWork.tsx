"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { JOB_CARDS_OPTIONS } from "../data/scene_paid.data";

export interface PaidData {
  everPaidAnswer: string;
  selectedJobCards: string[];
  monetizableExperience: string;
}

interface PaidWorkProps {
  onSubmit: (data: PaidData) => void;
}

const PAID_ANSWER_CHOICES = [
  { id: "yes", text: "ได้" },
  { id: "no", text: "ไม่ได้" },
];

// ---------------------------------------------------------------------------
//? Gibberish / Random Text Detection
//? ตรวจจับข้อความที่พิมมั่วๆ หรือไม่มีความหมาย
// ---------------------------------------------------------------------------
function validateMeaningfulText(text: string): string | null {
  const trimmed = text.trim();

  //? 1. ความยาวขั้นต่ำ — ต้องมีอย่างน้อย 5 ตัวอักษร
  if (trimmed.length < 5) {
    return "กรุณาพิมพ์คำตอบอย่างน้อย 5 ตัวอักษร";
  }

  //? 2. ตัวอักษรซ้ำติดกัน เช่น "aaaaaaa", "กกกกก", "5555555"
  if (/(.)\1{3,}/u.test(trimmed)) {
    return "ดูเหมือนข้อความจะมีตัวอักษรซ้ำมากเกินไปนะ ลองพิมพ์ใหม่อีกครั้ง";
  }

  //? 3. Keyboard smash patterns (English + Thai)
  const keyboardPatterns =
    /asdf|qwer|zxcv|hjkl|uiop|bnm|fghj|tyui|sdfg|xcvb|wasd|ฟหกด|แโใไ|ๆไำพ|กดเ้|ทมใฝ|บปลห|อิืท|เ้าส|พะัี|ฟหกด|ดเ้า|หกดส|กดสว|ผปแอ|ฤๅษศ|ฯญฐ/i;
  if (keyboardPatterns.test(trimmed)) {
    return "ดูเหมือนจะพิมพ์มั่วๆ อยู่นะ ลองตอบอีกครั้งได้ไหม?";
  }

  //? 4. ตัวอักษรที่ไม่ซ้ำน้อยเกินไป (unique ratio ต่ำ = พิมพ์ซ้ำๆ)
  const uniqueChars = new Set(trimmed.replace(/\s/g, "")).size;
  const nonSpaceLen = trimmed.replace(/\s/g, "").length;
  if (nonSpaceLen >= 5 && uniqueChars / nonSpaceLen < 0.25) {
    return "ข้อความนี้ดูซ้ำๆ กันมาก ลองเล่าให้หลากหลายขึ้นอีกนิดนะ";
  }

  //? 5. มีแต่ตัวเลข / สัญลักษณ์พิเศษ ไม่มีตัวอักษรจริงเลย
  const hasThaiOrEnglish = /[ก-๙a-zA-Z]/u.test(trimmed);
  if (!hasThaiOrEnglish) {
    return "กรุณาพิมพ์เป็นข้อความภาษาไทยหรืออังกฤษ";
  }

  //? 6. สัญลักษณ์มากเกินครึ่ง
  const symbolCount = (trimmed.match(/[^ก-๙a-zA-Z\s]/gu) || []).length;
  if (symbolCount / nonSpaceLen > 0.5) {
    return "ข้อความมีสัญลักษณ์มากเกินไป ลองพิมพ์เป็นคำตอบที่อ่านได้นะ";
  }

  return null; //* ผ่านการตรวจสอบ
}

export default function PaidWork({ onSubmit }: PaidWorkProps) {
  const [scene, setScene] = useState<
    "intro" | "paid" | "jobs" | "experience" | "transition"
  >("intro");

  const [experienceError, setExperienceError] = useState("");

  const [paidData, setPaidData] = useState<PaidData>({
    everPaidAnswer: "",
    selectedJobCards: [],
    monetizableExperience: "",
  });

  //? Toggle job card selection
  const toggleJobCard = (category: string) => {
    setPaidData((prev) => ({
      ...prev,
      selectedJobCards: prev.selectedJobCards.includes(category)
        ? prev.selectedJobCards.filter((c) => c !== category)
        : [...prev.selectedJobCards, category],
    }));
  };

  //? Scene navigation
  const handleIntroNext = () => {
    setTimeout(() => {
      setScene("paid");
    }, 500);
  };

  const handlePaidAnswer = (answer: string) => {
    setPaidData((prev) => ({ ...prev, everPaidAnswer: answer }));
    setTimeout(() => {
      setScene("jobs");
    }, 500);
  };

  const handleJobsNext = () => {
    if (paidData.selectedJobCards.length < 1) return;
    setTimeout(() => {
      setScene("experience");
    }, 500);
  };

  const handleExperienceSubmit = () => {
    const text = paidData.monetizableExperience.trim();
    if (text.length === 0) return;

    //? ตรวจสอบข้อความมั่วๆ / พิมเล่นๆ
    const error = validateMeaningfulText(text);
    if (error) {
      setExperienceError(error);
      return;
    }

    setExperienceError("");
    setTimeout(() => {
      setScene("transition");
      onSubmit(paidData);
    }, 500);
  };

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Scene 9.1 - Intro */}
      {scene === "intro" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="bg-black/70 p-8 rounded-lg max-w-2xl text-center">
            <p className="text-white text-xl mb-6">
              🐱 เจ้ามาถึงตลาดแห่งรายได้แล้ว…
              สถานที่ที่ทุกทักษะและความสามารถมีค่า
            </p>
            <button
              type="button"
              onClick={handleIntroNext}
              className="px-6 py-3 bg-linear-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:scale-105 transition-transform"
            >
              เริ่มสำรวจตลาด
            </button>
          </div>
        </motion.div>
      )}

      {/* Scene 9.2 - Ever Paid */}
      {scene === "paid" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="bg-black/80 p-8 rounded-lg max-w-2xl text-center">
            <p className="text-white text-xl mb-6">
              🐱 เจ้าล่ะ เคยได้รับค่าจ้างจากสิ่งใดบ้างหรือไม่?
            </p>
            <div className="flex gap-4 justify-center">
              {PAID_ANSWER_CHOICES.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => handlePaidAnswer(choice.id)}
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

      {/* Scene 9.3 - Job Cards Selection */}
      {scene === "jobs" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex justify-center items-center"
        >
          <div className=" flex items-center justify-center py-20">
            <div className="max-w-5xl mx-auto px-4 w-full">
              <div className="bg-black/80 p-8 rounded-lg">
                <h2 className="text-white text-2xl mb-4 text-center">
                  🐱 เจ้าจะเลือกงานใด…
                  สิ่งใดที่เจ้าอยากลองทำและคิดว่าสามารถสร้างรายได้?
                </h2>
                <p className="text-gray-300 text-center mb-6">
                  เลือกแล้ว: {paidData.selectedJobCards.length} สาขา (อย่างน้อย
                  1)
                </p>

                {/* Job Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {JOB_CARDS_OPTIONS.map((jobCard) => {
                    const isSelected = paidData.selectedJobCards.includes(
                      jobCard.category,
                    );
                    return (
                      <button
                        key={jobCard.category}
                        type="button"
                        onClick={() => toggleJobCard(jobCard.category)}
                        className={`p-4 rounded-lg text-left transition-all ${
                          isSelected
                            ? "bg-linear-to-br from-yellow-600 to-orange-600 text-white"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        <h3 className="font-bold mb-2 text-sm">
                          {jobCard.category}
                        </h3>
                        <ul className="text-xs opacity-80 space-y-1">
                          {jobCard.jobs.slice(0, 3).map((job, idx) => (
                            <li key={`${jobCard.category}-${idx}`}>• {job}</li>
                          ))}
                          {jobCard.jobs.length > 3 && (
                            <li className="italic">
                              ... และอีก {jobCard.jobs.length - 3} อาชีพ
                            </li>
                          )}
                        </ul>
                      </button>
                    );
                  })}
                </div>

                {/* Next Button */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleJobsNext}
                    disabled={paidData.selectedJobCards.length < 1}
                    className={`px-8 py-3 rounded-lg text-white transition-all ${
                      paidData.selectedJobCards.length >= 1
                        ? "bg-linear-to-r from-yellow-500 to-orange-500 hover:scale-105"
                        : "bg-gray-600 cursor-not-allowed opacity-50"
                    }`}
                  >
                    ถัดไป
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Scene 9.4 - Monetizable Experience */}
      {scene === "experience" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="bg-black/80 p-8 rounded-lg max-w-2xl w-full mx-4">
            <h2 className="text-white text-2xl mb-4 text-center">
              🐱 เจ้าคิดว่าเคยช่วยใครแล้วพูดกับตัวเองว่า…
            </h2>
            <p className="text-white text-lg mb-6 text-center">
              'ว้าว ฉันคิดเงินได้จากสิ่งนี้นะ' ไหม?
            </p>

            <textarea
              value={paidData.monetizableExperience}
              onChange={(e) => {
                setExperienceError("");
                setPaidData((prev) => ({
                  ...prev,
                  monetizableExperience: e.target.value,
                }));
              }}
              maxLength={100}
              placeholder="เล่าประสบการณ์ของคุณ... (ไม่เกิน 100 ตัวอักษร)"
              className="w-full h-32 px-4 py-3 bg-gray-800 text-white rounded-lg resize-none mb-2"
            />
            {experienceError && (
              <p className="text-red-400 text-sm mb-2 text-center">
                {experienceError}
              </p>
            )}
            <p className="text-gray-400 text-sm mb-6 text-right">
              {paidData.monetizableExperience.length} / 100
            </p>

            <div className="text-center">
              <button
                type="button"
                onClick={handleExperienceSubmit}
                disabled={paidData.monetizableExperience.trim().length === 0}
                className={`px-8 py-3 rounded-lg text-white transition-all ${
                  paidData.monetizableExperience.trim().length > 0
                    ? "bg-linear-to-r from-yellow-500 to-orange-500 hover:scale-105"
                    : "bg-gray-600 cursor-not-allowed opacity-50"
                }`}
              >
                ส่งคำตอบ
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
