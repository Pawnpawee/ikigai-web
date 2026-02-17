"use client";
import { m, useAnimate } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getImgPath } from "@/utils/cloudinaryUtils";

interface HeartWeighingProcessProps {
  isProcessing: boolean;
}

const ANALYSIS_STEPS = [
  { id: 1, text: "กำลังวิเคราะห์ What you love", duration: 5000 },
  { id: 2, text: "กำลังวิเคราะห์ What you good at", duration: 5000 },
  { id: 3, text: "กำลังวิเคราะห์ What the world need", duration: 5000 },
  { id: 4, text: "กำลังวิเคราะห์ What you can be paid for", duration: 5000 },
  { id: 5, text: "กำลังวิเคราะห์ อาชีพที่ใช่สำหรับคุณ", duration: 10000 },
  { id: 6, text: "กำลังวิเคราะห์ ikigai ของคุณ", duration: 10000 },
  { id: 7, text: "ใกล้เสร็จแล้ว...", duration: 5000 },
];

const DEITY_DIALOGUE = `ตอนนี้… หัวใจเจ้ากำลังถูกชั่ง… 
ขนนกจะบอกความจริงเกี่ยวกับอิคิไกของเจ้า 
โดยผลลัพธ์นี้เป็นเพียงภาพหนึ่งของความเป็นเจ้า ณ ตอนนี้เท่านั้น`;

export default function HeartWeighingProcess({
  isProcessing,
}: HeartWeighingProcessProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [scope, animate] = useAnimate();

  //? Progress through analysis steps
  useEffect(() => {
    if (!isProcessing) return;

    let timeoutId: NodeJS.Timeout;
    let currentStepIndex = 0;

    const progressThroughSteps = () => {
      if (currentStepIndex < ANALYSIS_STEPS.length) {
        setCurrentStep(currentStepIndex);
        const step = ANALYSIS_STEPS[currentStepIndex];

        timeoutId = setTimeout(() => {
          currentStepIndex++;
          progressThroughSteps();
        }, step.duration);
      }
    };

    progressThroughSteps();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isProcessing]);

  //? Animate heart glow
  useEffect(() => {
    if (!isProcessing) return;

    const heartAnimation = async () => {
      await animate(
        ".heart-glow",
        {
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.1, 1],
        },
        {
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        },
      );
    };

    heartAnimation();
  }, [isProcessing, animate]);

  if (!isProcessing) return null;

  return (
    <m.div
      ref={scope}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-linear-to-b from-purple-950 via-indigo-900 to-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Deity dialogue */}
      <m.div
        className="absolute top-[10%] w-[90%] md:w-[70%] text-center px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <p className="text-white text-base md:text-xl leading-relaxed whitespace-pre-line drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
          {DEITY_DIALOGUE}
        </p>
      </m.div>

      {/* Heart and Scale */}
      <m.div
        className="relative w-[80%] md:w-[50%] h-[40vh] flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 1, type: "spring" }}
      >

        {/* Heart with glow */}
        <m.div
          className="heart-glow absolute top-[10%] w-[30%] h-[30%] md:w-[25%] md:h-[25%]"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          
        </m.div>

        {/* Feather */}
        <m.div
          className="absolute top-[10%] right-[15%] w-[20%] h-[20%] md:w-[15%] md:h-[15%]"
          initial={{ y: -100, opacity: 0, rotate: -45 }}
          animate={{
            y: [0, -10, 0],
            opacity: 1,
            rotate: [-45, -40, -45],
          }}
          transition={{
            delay: 2,
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          
        </m.div>

        {/* Floating symbols around heart */}
        {[0, 1, 2, 3].map((index) => (
          <m.div
            key={`symbol-${index}`}
            className="absolute w-12 h-12 md:w-16 md:h-16"
            style={{
              left: `${25 + index * 15}%`,
              top: `${40 + (index % 2) * 20}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              y: [0, -30, -60],
            }}
            transition={{
              delay: 2.5 + index * 0.3,
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
            }}
          >
            <div className="w-full h-full rounded-full bg-linear-to-br from-yellow-300 to-amber-500 opacity-60 blur-sm" />
          </m.div>
        ))}
      </m.div>

      {/* Analysis progress text */}
      <m.div
        className="absolute bottom-[15%] w-[90%] md:w-[60%] text-center"
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-white text-xl md:text-3xl font-light tracking-wide">
          {ANALYSIS_STEPS[currentStep]?.text}
        </p>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-6">
          {ANALYSIS_STEPS.map((step) => (
            <m.div
              key={`dot-${step.id}`}
              className="w-2 h-2 md:w-3 md:h-3 rounded-full"
              animate={{
                backgroundColor:
                  step.id - 1 === currentStep
                    ? "#ffffff"
                    : step.id - 1 < currentStep
                      ? "#fbbf24"
                      : "#4b5563",
                scale: step.id - 1 === currentStep ? 1.5 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </m.div>

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <m.div
            key={`particle-${i}-${Math.random()}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </m.div>
  );
}
