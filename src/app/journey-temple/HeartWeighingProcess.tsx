"use client";
import { m } from "framer-motion";
import type { Howl } from "howler";
import type { AnimationItem } from "lottie-web";
import Image from "next/image";
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
  const [progress, setProgress] = useState(0);
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

  //? Progress through analysis steps - ไล่ step ตามลำดับ + อัพเดท progress bar
  useEffect(() => {
    if (!isProcessing) return;

    const totalDuration = ANALYSIS_STEPS_CONFIG.reduce(
      (sum, s) => sum + s.duration,
      0,
    );
    let timeoutId: NodeJS.Timeout;
    let intervalId: ReturnType<typeof setInterval>;
    let currentStepIndex = 0;
    let elapsed = 0;

    //? อัพเดท progress bar ทุก 100ms
    intervalId = setInterval(() => {
      elapsed += 100;
      const pct = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(pct);
    }, 100);

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
      clearInterval(intervalId);
    };
  }, [isProcessing]);

  if (!isProcessing) return null;

  return (
    <m.div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
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
          <p className="text-white text-xl md:text-2xl leading-relaxed whitespace-pre-line  drop-shadow-[0_0_10px_#ffffff]">
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
        {ANALYSIS_STEPS_CONFIG[currentStep]?.icon && (
          <div className="flex items-center justify-center gap-3 mb-2">
            <Image
              src={ANALYSIS_STEPS_CONFIG[currentStep].icon}
              alt=""
              width={48}
              height={48}
              crossOrigin="anonymous"
              className="w-8 h-8 md:w-12 md:h-12"
            />
          </div>
        )}
        <p className="text-white text-xl md:text-3xl font-light tracking-wide">
          {ANALYSIS_STEPS_CONFIG[currentStep]?.text}
        </p>

        {/* Progress Bar */}
        <div className="w-full h-2 md:h-3 bg-white/20 rounded-full mt-6 overflow-hidden">
          <m.div
            className="h-full rounded-full bg-linear-to-r from-amber-400 to-yellow-200"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
        <p className="text-white/60 text-sm md:text-base mt-2">
          {Math.round(progress)}%
        </p>
      </m.div>
    </m.div>
  );
}
