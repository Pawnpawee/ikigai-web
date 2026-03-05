"use client";

import {
  type MotionValue,
  m,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { useMemo, useRef, useState } from "react";
import GradientButton from "@/app/components/button/GradientButton";
import MysteriousText from "@/app/components/reusable/MysteriousText";
import SceneLayer, {
  type AnimationMap,
} from "@/app/components/reusable/SceneLayer";
import {
  MISMATCH_CHOICES,
  NO_MANUAL_CHOICES,
  S8_4_CHOICE1_POSITION,
  S8_4_CHOICE2_POSITION,
  S8_4_Q1_POSITION,
  S8_4_Q2_POSITION,
  S8_4_QUESTION_1,
  S8_4_QUESTION_1_MOBILE,
  S8_4_QUESTION_2,
  SCENE_S8_4_ITEMS,
} from "@/app/data/scene_s8_4.data";
import { getAudioUrl, getJsonUrl } from "@/utils/cloudinaryUtils";
import LazyLottie from "../components/reusable/LazyLottie";
import { useAudio } from "../contexts/AudioContext";
import { useDevice } from "../contexts/DeviceContext";

// ────────────────────────────────────────────────────
//  Types
// ────────────────────────────────────────────────────

export interface S8_4Data {
  noManualChoice: string;
  mismatchChoice: string;
}

interface S8_4Props {
  scrollYProgress: MotionValue<number>;
  onQ1Completed?: () => void;
  onCompleted?: (data: S8_4Data) => void;
}

// ────────────────────────────────────────────────────
//  Main Component: S8_4 (No Manual + Mismatch — 300vh)
//  Phase 1 (0-0.667): lotus, icon_1, question 1, choice 1
//  Phase 2 (0.667-1.0): icon_2, question 2, choice 2
//  Background: bg-s8-4 gradient
// ────────────────────────────────────────────────────

export default function S8_4({
  scrollYProgress,
  onQ1Completed,
  onCompleted,
}: S8_4Props) {
  const { isMobile } = useDevice();
  const { playSfx } = useAudio();
  const [noManualAnswer, setNoManualAnswer] = useState<string | null>(null);
  const [mismatchAnswer, setMismatchAnswer] = useState<string | null>(null);

  //? SFX tracking refs
  const hasPlayedIcon1 = useRef(false);
  const hasPlayedIcon2 = useRef(false);

  // ─── Container Fade ───

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1.0],
    [0, 1, 1, 0],
  );
  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1.0],
    [-1, 10, 10, -1],
  );

  // ─── Phase 1: Images (fade in → stay → fade out at boundary) ───

  //? animGroup 1: lotus (bottom decoration, phase 1 only)
  const lotusOpacity = useTransform(scrollYProgress, [0, 0.1, 0.1], [0, 1, 1]);

  //? animGroup 2: icon_1 — now Lottie (ไม่ loop)
  const icon1Opacity = useTransform(
    scrollYProgress,
    [0.05, 0.15, 0.667, 0.73],
    [0, 1, 1, 0],
  );
  const icon1ZIndex = useTransform(
    scrollYProgress,
    [0.05, 0.15, 0.667, 0.73],
    [-10, 5, 5, -10],
  );

  // ─── Phase 2: Images (fade in after boundary) ───

  //? animGroup 3: icon_2 — now Lottie (ไม่ loop)
  const icon2Opacity = useTransform(scrollYProgress, [0.667, 0.77], [0, 1]);
  const icon2ZIndex = useTransform(scrollYProgress, [0.667, 0.77], [-10, 5]);

  // ─── Phase 1: Q1 Text + Buttons (fade in → stay → fade out) ───

  const q1TextOpacity = useTransform(
    scrollYProgress,
    [0.12, 0.22, 0.667, 0.73],
    [0, 1, 1, 0],
  );
  const q1TextY = useTransform(scrollYProgress, [0.12, 0.22], [30, 0]);

  const choice1Opacity = useTransform(
    scrollYProgress,
    [0.2, 0.3, 0.667, 0.73],
    [0, 1, 1, 0],
  );
  const choice1Y = useTransform(scrollYProgress, [0.2, 0.3], [20, 0]);

  // ─── Phase 2: Q2 Text + Buttons (fade in) ───

  const q2TextOpacity = useTransform(scrollYProgress, [0.7, 0.8], [0, 1]);
  const q2TextY = useTransform(scrollYProgress, [0.7, 0.8], [30, 0]);

  const choice2Opacity = useTransform(scrollYProgress, [0.78, 0.88], [0, 1]);
  const choice2Y = useTransform(scrollYProgress, [0.78, 0.88], [20, 0]);

  // ─── Animation Map (images only — text/buttons handled separately) ───

  const animations: AnimationMap = useMemo(
    () => ({
      1: { opacity: lotusOpacity },
    }),
    [lotusOpacity],
  );

  // ─── SFX Events ───

  //? เล่นเสียง icon_popup เมื่อ icon_1 โผล่มา (scrollYProgress 0.15) และ icon_2 (0.77)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.15 && !hasPlayedIcon1.current) {
      playSfx(getAudioUrl("Sound/8/icon_popup.mp3"));
      hasPlayedIcon1.current = true;
    } else if (latest < 0.1 && hasPlayedIcon1.current) {
      hasPlayedIcon1.current = false;
    }
    if (latest >= 0.77 && !hasPlayedIcon2.current) {
      playSfx(getAudioUrl("Sound/8/icon_popup.mp3"));
      hasPlayedIcon2.current = true;
    } else if (latest < 0.667 && hasPlayedIcon2.current) {
      hasPlayedIcon2.current = false;
    }
  });

  // ─── Handlers ───

  const handleQ1Select = (choiceId: string) => {
    setNoManualAnswer(choiceId);
    onQ1Completed?.();
  };

  const handleQ2Select = (choiceId: string) => {
    setMismatchAnswer(choiceId);
    if (noManualAnswer) {
      onCompleted?.({
        noManualChoice: noManualAnswer,
        mismatchChoice: choiceId,
      });
    }
  };

  //? Figma-based positioning helper: picks desktop or mobile position
  const getPos = (
    desktop: { left: string; top: string; width: string },
    mobile: { left: string; top: string; width: string },
  ) => (isMobile ? mobile : desktop);

  return (
    <m.div
      className="fixed flex justify-center top-0 h-screen w-screen bg-s8-4 overflow-hidden"
      style={{ opacity, zIndex }}
    >
      <m.div className="flex items-center h-screen w-screen portrait:w-auto">
        <SceneLayer
          items={SCENE_S8_4_ITEMS}
          animations={animations}
          containerAspectRatio={isMobile ? "1080 / 1920" : "1920 / 1080"}
        >
          {/* ═══ Icon 1: Work Illustration Phase 1 (LazyLottie, ไม่ loop) ═══ */}
          <m.div
            className="absolute filter-[drop-shadow(0_0_40px_rgba(255,255,255,0.75))]"
            style={{
              //? Desktop: 1011.13×591.49 at (454.43, 268.50) in 1920×1080
              //? Mobile: 989.85×579.02 at (45.08, 458.52) in 1080×1920
              width: isMobile ? "91.65%" : "52.66%",
              height: isMobile ? "30.16%" : "54.77%",
              left: isMobile ? "4.17%" : "23.67%",
              top: isMobile ? "23.88%" : "24.86%",
              opacity: icon1Opacity,
              zIndex: icon1ZIndex,
            }}
          >
            <LazyLottie
              src={getJsonUrl("Scene/Scene8/04/s8-icon-1.json")}
              className="w-full h-full"
              loop={false}
              playTrigger={icon1Opacity}
            />
          </m.div>

          {/* ═══ Icon 2: Work Illustration Phase 2 (LazyLottie, ไม่ loop) ═══ */}
          <m.div
            className="absolute filter-[drop-shadow(0_0_40px_rgba(255,255,255,0.75))]"
            style={{
              //? Desktop: 1019.85×596.58 at (450.06, 267.65) in 1920×1080
              //? Mobile: 994.06×581.50 at (42.98, 455.65) in 1080×1920
              width: isMobile ? "92.04%" : "53.12%",
              height: isMobile ? "30.29%" : "55.24%",
              left: isMobile ? "3.98%" : "23.44%",
              top: isMobile ? "23.73%" : "24.78%",
              opacity: icon2Opacity,
              zIndex: icon2ZIndex,
            }}
          >
            <LazyLottie
              src={getJsonUrl("Scene/Scene8/04/s8-icon-2.json")}
              className="w-full h-full"
              loop={false}
              playTrigger={icon2Opacity}
            />
          </m.div>

          {/* ═══ Phase 1: Question 1 — No Manual Work ═══ */}

          {/*? Q1 Text (Figma: "question 1") */}
          <m.div
            className="absolute text-center"
            style={{
              ...getPos(S8_4_Q1_POSITION.style, S8_4_Q1_POSITION.mobileStyle),
              opacity: q1TextOpacity,
              y: q1TextY,
              zIndex: icon1ZIndex,
            }}
          >
            <MysteriousText
              text={isMobile ? S8_4_QUESTION_1_MOBILE : S8_4_QUESTION_1}
              scrollYProgress={scrollYProgress}
              startProgress={0.12}
              endProgress={0.22}
              className="text-white text-xs md:text-xl lg:text-2xl leading-relaxed tracking-wide"
            />
          </m.div>

          {/*? Choice 1 Buttons — horizontal spread (Figma: "choice 1") */}
          <m.div
            className="absolute flex justify-between items-center md:gap-5"
            style={{
              ...getPos(
                S8_4_CHOICE1_POSITION.style,
                S8_4_CHOICE1_POSITION.mobileStyle,
              ),
              opacity: choice1Opacity,
              y: choice1Y,
              zIndex: icon1ZIndex,
            }}
          >
            {NO_MANUAL_CHOICES.map((choice) => (
              <GradientButton
                key={choice.id}
                text={choice.text}
                isSelected={noManualAnswer === choice.id}
                onClick={() => handleQ1Select(choice.id)}
                variant={
                  noManualAnswer === choice.id ? "default" : "transparent"
                }
                className="px-6 py-2 md:px-12 md:py-4 text-xs md:text-lg lg:text-xl shrink-0 whitespace-pre-line"
              />
            ))}
          </m.div>

          {/* ═══ Phase 2: Question 2 — Mismatch Choice ═══ */}

          {/*? Q2 Text (Figma: "question 2") */}
          <m.div
            className="absolute text-center"
            style={{
              ...getPos(S8_4_Q2_POSITION.style, S8_4_Q2_POSITION.mobileStyle),
              opacity: q2TextOpacity,
              y: q2TextY,
              zIndex: icon2ZIndex,
            }}
          >
            <MysteriousText
              text={S8_4_QUESTION_2}
              scrollYProgress={scrollYProgress}
              startProgress={0.7}
              endProgress={0.8}
              className="text-white text-xs md:text-xl lg:text-2xl leading-relaxed tracking-wide"
            />
          </m.div>

          {/*? Choice 2 Buttons — 3 options (Figma: "choice 2") */}
          <m.div
            className="absolute"
            style={{
              ...getPos(
                S8_4_CHOICE2_POSITION.style,
                S8_4_CHOICE2_POSITION.mobileStyle,
              ),
              opacity: choice2Opacity,
              y: choice2Y,
              zIndex: icon2ZIndex,
            }}
          >
            {isMobile ? (
              //? Mobile: 2 buttons top row + "ทั้งคู่" below center
              <div className="flex flex-col items-center gap-5 md:gap-8">
                <div className="flex justify-center gap-[3%] w-full">
                  {MISMATCH_CHOICES.slice(0, 2).map((choice) => (
                    <GradientButton
                      key={choice.id}
                      text={choice.text}
                      isSelected={mismatchAnswer === choice.id}
                      onClick={() => handleQ2Select(choice.id)}
                      variant={
                        mismatchAnswer === choice.id ? "default" : "transparent"
                      }
                      className="px-6 py-2 md:px-12 md:py-4 text-xs md:text-lg lg:text-xl shrink-0 whitespace-pre-line"
                    />
                  ))}
                </div>
                <GradientButton
                  text={MISMATCH_CHOICES[2].text}
                  isSelected={mismatchAnswer === MISMATCH_CHOICES[2].id}
                  onClick={() => handleQ2Select(MISMATCH_CHOICES[2].id)}
                  variant={
                    mismatchAnswer === MISMATCH_CHOICES[2].id
                      ? "default"
                      : "transparent"
                  }
                  className="px-6 py-2 md:px-12 md:py-4 text-xs md:text-lg lg:text-xl shrink-0 whitespace-pre-line"
                />
              </div>
            ) : (
              //? Desktop: 2 stacked left column + 1 right
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-col gap-15">
                  {MISMATCH_CHOICES.slice(0, 2).map((choice) => (
                    <GradientButton
                      key={choice.id}
                      text={choice.text}
                      isSelected={mismatchAnswer === choice.id}
                      onClick={() => handleQ2Select(choice.id)}
                      variant={
                        mismatchAnswer === choice.id ? "default" : "transparent"
                      }
                      className="px-8 py-3 md:px-12 md:py-4 text-sm md:text-lg lg:text-xl shrink-0 whitespace-pre-line"
                    />
                  ))}
                </div>
                <GradientButton
                  text={MISMATCH_CHOICES[2].text}
                  isSelected={mismatchAnswer === MISMATCH_CHOICES[2].id}
                  onClick={() => handleQ2Select(MISMATCH_CHOICES[2].id)}
                  variant={
                    mismatchAnswer === MISMATCH_CHOICES[2].id
                      ? "default"
                      : "transparent"
                  }
                  className="px-8 py-3 md:px-12 md:py-4 text-sm md:text-lg lg:text-xl shrink-0"
                />
              </div>
            )}
          </m.div>
        </SceneLayer>
      </m.div>
    </m.div>
  );
}
