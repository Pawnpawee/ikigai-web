"use client";
import { m, useAnimate } from "framer-motion";
import type { Howl } from "howler";
import { useEffect, useRef, useState } from "react";
import { getAudioUrl } from "@/utils/cloudinaryUtils";
import { useAudio } from "../contexts/AudioContext";
import {
  ANALYSIS_STEPS_CONFIG,
  TEMPLE_DIALOGUE,
} from "../data/scene_temple.data";

//? Scene 10.2 (ต่อ): Heart Weighing Process
//? แสดงเมื่อกดปุ่ม "เริ่มพิธีชั่งหัวใจ"
//? ส่วน heart Lottie จะเพิ่มภายหลัง

interface HeartWeighingProcessProps {
  isProcessing: boolean;
}

export default function HeartWeighingProcess({
  isProcessing,
}: HeartWeighingProcessProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [scope, animate] = useAnimate();
  const { playSfx } = useAudio();

  //? SFX refs สำหรับเสียงประมวลผล (loop)
  const sparklingSoundRef = useRef<Howl | null>(null);
  const shimmeringSoundRef = useRef<Howl | null>(null);

  //? เล่น SFX ขณะกำลังประมวลผล และหยุดเมื่อเสร็จ
  useEffect(() => {
    if (isProcessing) {
      const sparkle = playSfx(getAudioUrl("Sound/10/magical_sparkling.mp3"), {
        loop: true,
      });
      const shimmer = playSfx(getAudioUrl("Sound/10/shimmering_object.mp3"), {
        loop: true,
      });
      if (sparkle) sparklingSoundRef.current = sparkle;
      if (shimmer) shimmeringSoundRef.current = shimmer;
    }

    return () => {
      if (sparklingSoundRef.current) {
        sparklingSoundRef.current.stop();
        sparklingSoundRef.current.unload();
        sparklingSoundRef.current = null;
      }
      if (shimmeringSoundRef.current) {
        shimmeringSoundRef.current.stop();
        shimmeringSoundRef.current.unload();
        shimmeringSoundRef.current = null;
      }
    };
  }, [isProcessing, playSfx]);

  //? Progress through analysis steps - ไล่ step ตามลำดับ
  useEffect(() => {
    if (!isProcessing) return;

    let timeoutId: NodeJS.Timeout;
    let currentStepIndex = 0;

    const progressThroughSteps = () => {
      if (currentStepIndex < ANALYSIS_STEPS_CONFIG.length) {
        setCurrentStep(currentStepIndex);
        const step = ANALYSIS_STEPS_CONFIG[currentStepIndex];

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

  //? Animate heart glow - เรืองแสงรอบหัวใจ
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
      {/* Deity dialogue - คำพูดของเทพ */}
      <m.div
        className="absolute top-[10%] w-[90%] md:w-[70%] text-center px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <p className="text-white text-base md:text-xl leading-relaxed whitespace-pre-line drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
          {TEMPLE_DIALOGUE.weighing}
        </p>
      </m.div>

      {/* Heart and Scale - ตาชั่งหัวใจ */}
      <m.div
        className="relative w-[80%] md:w-[50%] h-[40vh] flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 1, type: "spring" }}
      >
        {/* Heart with glow - placeholder สำหรับ Lottie */}
        {/*todo: เพิ่ม heart Lottie animation ตรงนี้ */}
        <m.div
          className="heart-glow absolute top-[10%] w-[30%] h-[30%] md:w-[25%] md:h-[25%]"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        />

        {/* Feather - ขนนก */}
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
        />

        {/* Floating symbols around heart - อนุภาคลอยรอบหัวใจ */}
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

      {/* Analysis progress text - ข้อความสถานะการวิเคราะห์ */}
      <m.div
        className="absolute bottom-[15%] w-[90%] md:w-[60%] text-center"
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-2xl md:text-4xl">
            {ANALYSIS_STEPS_CONFIG[currentStep]?.icon}
          </span>
        </div>
        <p className="text-white text-xl md:text-3xl font-light tracking-wide">
          {ANALYSIS_STEPS_CONFIG[currentStep]?.text}
        </p>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-6">
          {ANALYSIS_STEPS_CONFIG.map((step) => (
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
