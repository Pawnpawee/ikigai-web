"use client";
import { m, useAnimate } from "framer-motion";
import type { Howl } from "howler";
import type { AnimationItem } from "lottie-web";
import { useCallback, useEffect, useRef, useState } from "react";
import { getAudioUrl, getJsonUrl } from "@/utils/cloudinaryUtils";
import LazyLottie from "../components/reusable/LazyLottie";
import { useAudio } from "../contexts/AudioContext";
import {
  ANALYSIS_STEPS_CONFIG,
  TEMPLE_DIALOGUE,
} from "../data/scene_temple.data";

//? Scene 10.2 (ต่อ): Heart Weighing Process
//? แสดงเมื่อกดปุ่ม "เริ่มพิธีชั่งหัวใจ"
//? Lottie BG: เล่น 0-225 (intro) → แสดง dialogue → loop 226-304 ระหว่างรอ process

interface HeartWeighingProcessProps {
  isProcessing: boolean;
}

export default function HeartWeighingProcess({
  isProcessing,
}: HeartWeighingProcessProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showDialogue, setShowDialogue] = useState(false);
  const [scope, animate] = useAnimate();
  const { playSfx } = useAudio();

  //? Lottie BG ref
  const bgLottieRef = useRef<AnimationItem | null>(null);

  //? Lottie BG: เล่น intro 0-225 → แสดง dialogue → loop 226-304
  const handleBgRef = useCallback((instance: AnimationItem | null) => {
    bgLottieRef.current = instance;
    if (instance) {
      instance.goToAndStop(0, true);
      instance.addEventListener("complete", () => {
        //? Intro จบ → แสดง dialogue + เริ่ม loop segment
        setShowDialogue(true);
        instance.playSegments([226, 304], true);
      });
      //? เริ่มเล่น intro
      instance.playSegments([0, 225], true);
    }
  }, []);

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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Lottie Background — intro 0-225, loop 226-304 */}
      <div className="absolute inset-0">
        <LazyLottie
          src={getJsonUrl("Scene/Result/s11.json")}
          className="w-full h-full"
          loop={false}
          play={isProcessing}
          getRef={handleBgRef}
          ignoreAspectRatio
        />
      </div>

      {/* Deity dialogue — แสดงหลัง intro (frame 225) จบ */}
      {showDialogue && (
        <m.div
          className="absolute top-[10%] w-[90%] md:w-[70%] text-center px-4 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-white text-base md:text-xl leading-relaxed whitespace-pre-line drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
            {TEMPLE_DIALOGUE.weighing}
          </p>
        </m.div>
      )}

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
    </m.div>
  );
}
