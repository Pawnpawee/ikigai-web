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
  CALLED_UPON_CHOICES,
  S8_1_CAT_DIALOGUE,
  S8_1_CAT_DIALOGUE_POSITION,
  S8_1_QUESTION,
  S8_1_TEXT_BUBBLES,
  SCENE_S8_1_ITEMS,
} from "@/app/data/scene_s8_1.data";
import { getAudioUrl, getJsonUrl } from "@/utils/cloudinaryUtils";
import LazyLottie from "../components/reusable/LazyLottie";
import { useAudio } from "../contexts/AudioContext";
import { useDevice } from "../contexts/DeviceContext";

// ────────────────────────────────────────────────────
//  Types
// ────────────────────────────────────────────────────

export interface S8_1Data {
  calledUponAnswer: string;
}

interface S8_1Props {
  scrollYProgress: MotionValue<number>;
  onCompleted?: (data: S8_1Data) => void;
}

// ────────────────────────────────────────────────────
//  Main Component: S8_1 (Called Upon - 700vh)
//  Phase 1 (0-0.3): Lake scene fade in (staggered + slide up)
//  Phase 2 (0.5-0.65): Bloom lotuses + text bubbles
//  Phase 3 (0.65-1.0): Dark scene + cat + question
// ────────────────────────────────────────────────────

export default function S8_1({ scrollYProgress, onCompleted }: S8_1Props) {
  const { isMobile } = useDevice();
  const { playSfx } = useAudio();
  const [calledUponAnswer, setCalledUponAnswer] = useState<string | null>(null);

  //? SFX tracking refs
  const hasPlayedBloom = useRef(false);

  // ─── Container Animations ───

  //? Main container opacity: fade in, then fade out at end
  const opacity = useTransform(scrollYProgress, [0, 0.1, 1], [0, 1, 1]);

  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [-1, 10, 10, -1],
  );

  // ─── Phase 1: Lake Scene (staggered fade-in + slide up, progress 0-0.3) ───

  //? animGroup 1: mountain_lake — stays visible, slides up
  const mountainLakeOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const mountainLakeY = useTransform(scrollYProgress, [0, 0.12], [60, 0]);
  //? animGroup 2: stone_lake — stays visible, slides up
  const stoneLakeOpacity = useTransform(scrollYProgress, [0.03, 0.15], [0, 1]);
  const stoneLakeY = useTransform(scrollYProgress, [0.03, 0.15], [80, 0]);
  //? animGroup 3: lotus_5 — stays visible, slides up
  const lotus5Opacity = useTransform(scrollYProgress, [0.06, 0.18], [0, 1]);
  const lotus5Y = useTransform(scrollYProgress, [0.06, 0.18], [50, 0]);
  //? animGroup 4: lotus_4 — stays visible, slides up
  const lotus4Opacity = useTransform(scrollYProgress, [0.09, 0.21], [0, 1]);
  const lotus4Y = useTransform(scrollYProgress, [0.09, 0.21], [50, 0]);
  //? animGroup 5: lotus_2 (fades out early for bloom transition), slides up
  const lotus2Opacity = useTransform(
    scrollYProgress,
    [0.12, 0.24, 0.48, 0.52],
    [0, 1, 1, 0],
  );
  const lotus2Y = useTransform(scrollYProgress, [0.12, 0.24], [40, 0]);
  //? animGroup 6: lotus_1 (fades out early for bloom transition), slides up
  const lotus1Opacity = useTransform(
    scrollYProgress,
    [0.12, 0.24, 0.48, 0.52],
    [0, 1, 1, 0],
  );
  const lotus1Y = useTransform(scrollYProgress, [0.12, 0.24], [40, 0]);
  //? animGroup 7: lotus_3 (fades out early for bloom transition), slides up
  const lotus3Opacity = useTransform(
    scrollYProgress,
    [0.15, 0.27, 0.48, 0.52],
    [0, 1, 1, 0],
  );
  const lotus3Y = useTransform(scrollYProgress, [0.15, 0.27], [30, 0]);
  //? animGroup 8: head — slides up on enter, then sinks down after bloom
  const headOpacity = useTransform(
    scrollYProgress,
    [0.18, 0.3, 0.62, 0.7],
    [0, 1, 1, 0],
  );

  // ─── Phase 2: Bloom Lotuses + Text (progress 0.5-0.65) ───

  //? animGroup 9: lotus_2_bloom — replaces lotus_2, stays visible
  const bloom2Opacity = useTransform(scrollYProgress, [0.5, 0.56], [0, 1]);
  //? animGroup 10: lotus_1_bloom — replaces lotus_1, stays visible
  const bloom1Opacity = useTransform(scrollYProgress, [0.5, 0.56], [0, 1]);
  //? animGroup 11: lotus_3_bloom — replaces lotus_3, stays visible
  const bloom3Opacity = useTransform(scrollYProgress, [0.5, 0.56], [0, 1]);

  // ─── Phase 2: Text Bubbles (real text overlays) ───

  //? text_1 opacity — stays visible through cat scene
  const text1Opacity = useTransform(scrollYProgress, [0.52, 0.58], [0, 1]);
  //? text_2 opacity — stays visible
  const text2Opacity = useTransform(scrollYProgress, [0.54, 0.6], [0, 1]);
  //? text_3 opacity — stays visible
  const text3Opacity = useTransform(scrollYProgress, [0.56, 0.62], [0, 1]);

  const textBubbleOpacities = [text1Opacity, text2Opacity, text3Opacity];

  // ─── Phase 3: Dark Overlay + Cat (progress 0.65-1.0) ───

  //? CSS dark overlay (replaces bgblack image)
  const darkOverlayOpacity = useTransform(
    scrollYProgress,
    [0.65, 0.72],
    [0, 0.9],
  );
  //? animGroup 12: cat
  const catOpacity = useTransform(scrollYProgress, [0.72, 0.8], [0, 1]);

  // ─── Phase 3: Text Overlays (real text) ───

  // ─── Content Layer: Question + Buttons ───

  const questionOpacity = useTransform(scrollYProgress, [0.84, 0.92], [0, 1]);
  const questionY = useTransform(scrollYProgress, [0.84, 0.92], [30, 0]);

  // ─── Animation Map (images only) ───

  const animations: AnimationMap = useMemo(
    () => ({
      1: { opacity: mountainLakeOpacity, y: mountainLakeY },
      2: { opacity: stoneLakeOpacity, y: stoneLakeY },
      3: { opacity: lotus5Opacity, y: lotus5Y },
      4: { opacity: lotus4Opacity, y: lotus4Y },
      5: { opacity: lotus2Opacity, y: lotus2Y },
      6: { opacity: lotus1Opacity, y: lotus1Y },
      7: { opacity: lotus3Opacity, y: lotus3Y },
      8: { opacity: headOpacity },
      9: { opacity: bloom2Opacity },
      10: { opacity: bloom1Opacity },
      11: { opacity: bloom3Opacity },
    }),
    [
      mountainLakeOpacity,
      mountainLakeY,
      stoneLakeOpacity,
      stoneLakeY,
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
      bloom2Opacity,
      bloom1Opacity,
      bloom3Opacity,
    ],
  );

  // ─── SFX Events ───

  //? เล่นเสียง flower_bloom เมื่อดอกบัวบาน (bloom เริ่มที่ scrollYProgress 0.5)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.5 && !hasPlayedBloom.current) {
      playSfx(getAudioUrl("Sound/8/flower_bloom.mp3"));
      hasPlayedBloom.current = true;
    } else if (latest < 0.45 && hasPlayedBloom.current) {
      hasPlayedBloom.current = false;
    }
  });

  // ─── Handlers ───

  const handleSelect = (choiceId: string) => {
    setCalledUponAnswer(choiceId);
    onCompleted?.({ calledUponAnswer: choiceId });
  };

  return (
    <m.div
      className="fixed flex justify-center top-0 h-screen w-screen bg-s8-1 overflow-hidden"
      style={{ opacity, zIndex }}
    >
      <m.div className="flex items-center h-screen w-screen portrait:w-auto ">
        <SceneLayer
          items={SCENE_S8_1_ITEMS}
          animations={animations}
          containerAspectRatio={isMobile ? "1080 / 1920" : "1920 / 1080"}
        >
          {/* ═══ Phase 2: Text Bubbles (real text overlays on lotus scene) ═══ */}
          {S8_1_TEXT_BUBBLES.map((bubble, index) => {
            const pos = isMobile ? bubble.mobileStyle : bubble.style;
            return (
              <m.div
                key={bubble.id}
                className="absolute flex shrink-0 items-center justify-center bg-black/20 px-[1%] py-[0.5%]"
                style={{
                  left: pos.left,
                  top: pos.top,
                  width: pos.width,
                  opacity: textBubbleOpacities[index],
                }}
              >
                <p className="whitespace-pre-line text-center text-[0.55rem] leading-normal tracking-[0.6px] text-white md:text-base lg:text-xl">
                  {bubble.text}
                </p>
              </m.div>
            );
          })}

          {/* ═══ Phase 3: CSS Dark Overlay (replaces bgblack image) ═══ */}
          <m.div
            className="fixed inset-0 bg-black"
            style={{ opacity: darkOverlayOpacity }}
          />

          {/* ═══ Phase 3: Cat (LazyLottie) ═══ */}
          <m.div
            className="absolute z-1"
            style={{
              width: isMobile ? "64.11%" : "32.68%",
              height: isMobile ? "42.62%" : "68.67%",
              left: isMobile ? "21.02%" : "9.07%",
              top: isMobile ? "46.18%" : "19.21%",
              opacity: catOpacity,
            }}
          >
            <LazyLottie
              src={getJsonUrl("Scene/Scene8/01/cat1.json")}
              className="w-full h-full"
              loop
              playTrigger={catOpacity}
            />
          </m.div>

          {/* ═══ Phase 3: Cat Dialogue (MysteriousText overlay on dark scene) ═══ */}
          <div
            className="absolute flex flex-col items-center"
            style={{
              left: isMobile
                ? S8_1_CAT_DIALOGUE_POSITION.mobileStyle.left
                : S8_1_CAT_DIALOGUE_POSITION.style.left,
              top: isMobile
                ? S8_1_CAT_DIALOGUE_POSITION.mobileStyle.top
                : S8_1_CAT_DIALOGUE_POSITION.style.top,
              width: isMobile
                ? S8_1_CAT_DIALOGUE_POSITION.mobileStyle.width
                : S8_1_CAT_DIALOGUE_POSITION.style.width,
            }}
          >
            <MysteriousText
              text={S8_1_CAT_DIALOGUE}
              scrollYProgress={scrollYProgress}
              startProgress={0.78}
              endProgress={0.85}
              className="text-center leading-relaxed tracking-wide text-white text-base md:text-2xl lg:text-3xl"
            />
          </div>

          {/* ═══ Phase 3: Question + Buttons (overlaid on dark scene) ═══ */}
          {/*? Desktop: question frame at x=885, y=478, w=822 in 1920×1080 */}
          {/*? → left=46.09%, top=44.26%, w=42.81% */}
          {/*? Mobile: question frame at x=129, y=502, w=822 in 1080×1920 */}
          {/*? → left=11.94%, top=26.15%, w=76.11% */}
          <m.div
            className={`
              absolute flex flex-col items-center
              ${
                isMobile
                  ? "top-[26.15%] w-full"
                  : "left-[46.09%] top-[44.26%] w-[42.81%]"
              }
            `}
            style={{ opacity: questionOpacity, y: questionY }}
          >
            {/*? Question Text */}
            <div className="text-center w-full shrink-0">
              <MysteriousText
                text={S8_1_QUESTION}
                scrollYProgress={scrollYProgress}
                startProgress={0.78}
                endProgress={0.88}
                className="text-white text-base md:text-2xl lg:text-3xl leading-normal tracking-[0.6px]"
              />
            </div>

            {/*? Choice Buttons */}
            <div
              className={`
                flex items-center shrink-0
                ${
                  isMobile
                    ? "justify-center gap-8 mt-8"
                    : "justify-between w-[54.01%] mt-[9.38%]"
                }
              `}
            >
              {CALLED_UPON_CHOICES.map((choice) => (
                <GradientButton
                  key={choice.id}
                  text={choice.text}
                  isSelected={calledUponAnswer === choice.id}
                  onClick={() => handleSelect(choice.id)}
                  variant={
                    calledUponAnswer === choice.id ? "default" : "transparent"
                  }
                  className="px-8 py-2 md:px-16 md:py-4 text-sm md:text-2xl lg:text-3xl shrink-0"
                />
              ))}
            </div>
          </m.div>
        </SceneLayer>
      </m.div>
    </m.div>
  );
}
