"use client";

import {
  type MotionValue,
  m,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import type { Howl } from "howler";
import { useMemo, useRef, useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import GradientButton from "@/app/components/button/GradientButton";
import MysteriousText from "@/app/components/reusable/MysteriousText";
import SceneLayer, {
  type AnimationMap,
} from "@/app/components/reusable/SceneLayer";
import {
  FUTURE_VALUE_CHOICES,
  S8_5_QUESTION,
  S8_5_QUESTION_POSITION,
  SCENE_S8_5_ITEMS,
} from "@/app/data/scene_s8_5.data";
import { getAudioUrl, getJsonUrl } from "@/utils/cloudinaryUtils";
import LazyLottie from "../components/reusable/LazyLottie";
import { useAudio } from "../contexts/AudioContext";
import { useDevice } from "../contexts/DeviceContext";

// ────────────────────────────────────────────────────
//  Types
// ────────────────────────────────────────────────────

export interface S8_5Data {
  futureValueAnswer: string;
}

interface S8_5Props {
  scrollYProgress: MotionValue<number>;
  onCompleted?: (data: S8_5Data) => void;
}

// ────────────────────────────────────────────────────
//  Main Component: S8_5 (Future Value — 400vh)
//
//  Phase 1 (0-0.5 = 200vh): Lake scene with lotuses + head
//    Stagger fade-in: mountain_lake → stone_lake → lotuses → head
//    All fade out at boundary (0.42-0.52)
//
//  Phase 2 (0.5-1.0 = 200vh): Cat + Question
//    bgblack fade in, cat fade in + slide up
//    Question text (MysteriousText) + Yes/No buttons
//
//  Background: Phase 1 = bg-s8-5, Phase 2 = bg-black (via bgblack image)
// ────────────────────────────────────────────────────

export default function S8_5({ scrollYProgress, onCompleted }: S8_5Props) {
  const { isMobile } = useDevice();
  const { playSfx } = useAudio();
  const [futureAnswer, setFutureAnswer] = useState<string | null>(null);
  const [showContinueButton, setShowContinueButton] = useState(false);

  //? SFX tracking ref
  const hasPlayedHeartbeat = useRef(false);
  const heartbeatSoundRef = useRef<Howl | null>(null);

  // ─── Container Fade ───

  const opacity = useTransform(scrollYProgress, [0, 0.05, 1.0], [0, 1, 1]);
  const zIndex = useTransform(scrollYProgress, [0, 0.05, 1.0], [-1, 10, 10]);

  // ═══════════════════════════════════════════════════
  //  Phase 1: Lake Scene (0-0.5 = 200vh)
  // ═══════════════════════════════════════════════════

  //? animGroup 1: mountain_lake (fade in → fade out at boundary)
  const mountainOpacity = useTransform(scrollYProgress, [0, 0.52], [0, 1]);

  //? animGroup 2: stone_lake
  const stoneOpacity = useTransform(scrollYProgress, [0.03, 0.52], [0, 1]);
  const stoneY = useTransform(scrollYProgress, [0.03, 0.1], [30, 0]);

  //? animGroup 3: lotus_5
  const lotus5Opacity = useTransform(scrollYProgress, [0.06, 0.52], [0, 1]);
  const lotus5Y = useTransform(scrollYProgress, [0.06, 0.14], [40, 0]);

  //? animGroup 4: lotus_4
  const lotus4Opacity = useTransform(scrollYProgress, [0.08, 0.52], [0, 1]);
  const lotus4Y = useTransform(scrollYProgress, [0.08, 0.16], [50, 0]);

  //? animGroup 5: lotus_2
  const lotus2Opacity = useTransform(scrollYProgress, [0.1, 0.52], [0, 1]);
  const lotus2Y = useTransform(scrollYProgress, [0.1, 0.18], [40, 0]);

  //? animGroup 6: lotus_1
  const lotus1Opacity = useTransform(scrollYProgress, [0.12, 0.52], [0, 1]);
  const lotus1Y = useTransform(scrollYProgress, [0.12, 0.2], [45, 0]);

  //? animGroup 7: lotus_3
  const lotus3Opacity = useTransform(scrollYProgress, [0.14, 0.52], [0, 1]);
  const lotus3Y = useTransform(scrollYProgress, [0.14, 0.22], [35, 0]);

  //? animGroup 8: head (last to appear, first to fade)
  const headOpacity = useTransform(scrollYProgress, [0.16, 0.52], [0, 1]);
  const headY = useTransform(scrollYProgress, [0.16, 0.26], [60, 0]);

  // ═══════════════════════════════════════════════════
  //  Phase 2: Cat + Question (0.5-1.0 = 200vh)
  // ═══════════════════════════════════════════════════

  //? CSS dark overlay (replaces bgblack image — like S8_1)
  const darkOverlayOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.55],
    [0, 0.9],
  );

  //? animGroup 9: cat
  const catOpacity = useTransform(scrollYProgress, [0.52, 0.62], [0, 1]);
  const catY = useTransform(scrollYProgress, [0.52, 0.62], [50, 0]);

  //? Question frame (text + buttons appear together)
  const questionOpacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);
  const questionY = useTransform(scrollYProgress, [0.6, 0.7], [30, 0]);

  //? Continue button opacity (appears after choice selected)
  const continueButtonOpacity = useTransform(() => {
    if (showContinueButton) {
      return 1;
    }
    return 0;
  });

  // ─── Animation Map ───

  const animations: AnimationMap = useMemo(
    () => ({
      1: { opacity: mountainOpacity },
      2: { opacity: stoneOpacity, y: stoneY },
      3: { opacity: lotus5Opacity, y: lotus5Y },
      4: { opacity: lotus4Opacity, y: lotus4Y },
      5: { opacity: lotus2Opacity, y: lotus2Y },
      6: { opacity: lotus1Opacity, y: lotus1Y },
      7: { opacity: lotus3Opacity, y: lotus3Y },
      8: { opacity: headOpacity, y: headY },
    }),
    [
      mountainOpacity,
      stoneOpacity,
      stoneY,
      lotus5Opacity,
      lotus5Y,
      lotus4Opacity,
      lotus4Y,
      lotus2Opacity,
      lotus2Y,
      lotus1Opacity,
      lotus1Y,
      lotus3Opacity,
      lotus3Y,
      headOpacity,
      headY,
    ],
  );

  // ─── SFX Events ───

  //? เล่นเสียง heart-beat เมื่อเริ่มเห็น scene
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.05 && !hasPlayedHeartbeat.current) {
      const sound = playSfx(getAudioUrl("Sound/1-2/heart-beat.mp3"), {
        loop: true,
      });
      if (sound) heartbeatSoundRef.current = sound;
      hasPlayedHeartbeat.current = true;
    } else if (latest < 0.03 && hasPlayedHeartbeat.current) {
      //? หยุดเสียง heart-beat เมื่อเลื่อนกลับ
      if (heartbeatSoundRef.current) {
        heartbeatSoundRef.current.stop();
        heartbeatSoundRef.current.unload();
        heartbeatSoundRef.current = null;
      }
      hasPlayedHeartbeat.current = false;
    }
  });

  // ─── Handlers ───

  const handleAnswer = (choiceId: string) => {
    setFutureAnswer(choiceId);
    //? Show continue button immediately when selected
    setShowContinueButton(true);
  };

  //? Handle continue button click → submit S8_5 data
  const handleContinue = () => {
    if (futureAnswer) {
      onCompleted?.({ futureValueAnswer: futureAnswer });
    }
  };

  return (
    <m.div
      className="fixed flex justify-center top-0 h-screen w-screen bg-s8-5 overflow-hidden"
      style={{ opacity, zIndex }}
    >
      <m.div className="flex items-center h-screen w-screen portrait:w-auto">
        <SceneLayer
          items={SCENE_S8_5_ITEMS}
          animations={animations}
          containerAspectRatio={isMobile ? "1080 / 1920" : "1920 / 1080"}
        >
          {/* ═══ Phase 2: CSS Dark Overlay (replaces bgblack image) ═══ */}
          <m.div
            className="fixed inset-0 bg-black"
            style={{ opacity: darkOverlayOpacity }}
          />

          {/* ═══ Phase 2: Cat (LazyLottie) ═══ */}
          <m.div
            className="absolute z-1"
            style={{
              width: isMobile ? "67.28%" : "33.74%",
              height: isMobile ? "38.55%" : "61.11%",
              left: isMobile ? "16.37%" : "11.48%",
              top: isMobile ? "46.58%" : "21.73%",
              opacity: catOpacity,
              y: catY,
            }}
          >
            <LazyLottie
              src={getJsonUrl("Scene/Scene8/05/cat2.json")}
              className="w-full h-full"
              loop
              playTrigger={catOpacity}
            />
          </m.div>

          {/* ═══ Phase 2 Content: Question frame (text + buttons) ═══ */}
          {/*? Desktop: 867:8161 question frame — flex-col, items-center */}
          {/*? Text 40px, gap 60px, btn row w=444/582=76.29% justify-between */}
          <m.div
            className="absolute flex flex-col items-center"
            style={{
              ...(isMobile
                ? S8_5_QUESTION_POSITION.mobileStyle
                : S8_5_QUESTION_POSITION.style),
              opacity: questionOpacity,
              y: questionY,
            }}
          >
            {/*? Question Text */}
            <div className="text-center w-full shrink-0">
              <MysteriousText
                text={S8_5_QUESTION}
                scrollYProgress={scrollYProgress}
                startProgress={0.6}
                endProgress={0.7}
                className="text-white text-base md:text-2xl lg:text-3xl leading-normal tracking-[0.6px]"
              />
            </div>

            {/*? Choice Buttons — ใช่ / ไม่ใช่ */}
            {/*? Figma btn frame: x=69, y=180, w=444, h=80 inside 582×260 */}
            {/*? w=444/582=76.29%, gap between text and btn = 60px, mt=60/582=10.31% */}
            <div
              className={`
                flex items-center shrink-0
                ${
                  isMobile
                    ? "justify-center gap-8 mt-8"
                    : "justify-between w-[76.29%] mt-[10.31%]"
                }
              `}
            >
              {FUTURE_VALUE_CHOICES.map((choice) => (
                <GradientButton
                  key={choice.id}
                  text={choice.text}
                  isSelected={futureAnswer === choice.id}
                  onClick={() => handleAnswer(choice.id)}
                  variant={
                    futureAnswer === choice.id ? "default" : "transparent"
                  }
                  className="px-8 py-2 md:px-14 md:py-4 text-sm md:text-2xl lg:text-3xl shrink-0"
                />
              ))}
            </div>

            {/* Continue Button */}
            <m.div
              className="flex justify-center mt-8 md:mt-12"
              style={{ opacity: continueButtonOpacity }}
              initial={{ y: 20 }}
              animate={{ y: showContinueButton ? 0 : 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <GradientButton
                text="ไปต่อ"
                isSelected={true}
                onClick={handleContinue}
                variant="default"
                className="text-lg md:text-2xl lg:text-3xl"
              >
                <HiOutlineChevronDown className="ml-2" />
              </GradientButton>
            </m.div>
          </m.div>
        </SceneLayer>
      </m.div>
    </m.div>
  );
}
