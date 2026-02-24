"use client";

import { type MotionValue, m, useTransform } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";
import GradientButton from "@/app/components/button/GradientButton";
import MysteriousText from "@/app/components/reusable/MysteriousText";
import SceneLayer, {
  type AnimationMap,
} from "@/app/components/reusable/SceneLayer";
import {
  PAID_ANSWER_CHOICES,
  S9_1_QUESTION_TEXT,
  SCENE_S9_1_ITEMS,
} from "@/app/data/scene_s9_1.data";
import { useDevice } from "../contexts/DeviceContext";

// ────────────────────────────────────────────────────
//  Types
// ────────────────────────────────────────────────────

export interface S9_1Data {
  everPaidAnswer: string;
}

interface S9_1Props {
  scrollYProgress: MotionValue<number>;
  onCompleted?: (data: S9_1Data) => void;
}

// ────────────────────────────────────────────────────
//  Main Component: S9_1 (Ever Paid — Market Scene)
// ────────────────────────────────────────────────────

export default function S9_1({ scrollYProgress, onCompleted }: S9_1Props) {
  const { isMobile } = useDevice();
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  // ─── Container opacity / zIndex ───
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.9, 1],
    [0, 1, 1, 0],
  );
  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.05, 0.9, 1],
    [-1, 10, 10, -1],
  );

  // ─── Phase 1: Market Build-up (0 → 0.5) ──────────

  //? animGroup 1: wall — y ขึ้น + opacity
  const wallOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const wallY = useTransform(scrollYProgress, [0, 0.12], [60, 0]);

  //? animGroup 2: shop4 — y ขึ้น + opacity
  const shop4Opacity = useTransform(scrollYProgress, [0.04, 0.16], [0, 1]);
  const shop4Y = useTransform(scrollYProgress, [0.04, 0.16], [80, 0]);

  //? animGroup 3: shop3 — y ขึ้น + opacity
  const shop3Opacity = useTransform(scrollYProgress, [0.08, 0.2], [0, 1]);
  const shop3Y = useTransform(scrollYProgress, [0.08, 0.2], [80, 0]);

  //? animGroup 4: shop2 — y ขึ้น + opacity
  const shop2Opacity = useTransform(scrollYProgress, [0.12, 0.24], [0, 1]);
  const shop2Y = useTransform(scrollYProgress, [0.12, 0.24], [80, 0]);

  //? animGroup 5: shop1 — y ขึ้น + opacity
  const shop1Opacity = useTransform(scrollYProgress, [0.16, 0.28], [0, 1]);
  const shop1Y = useTransform(scrollYProgress, [0.16, 0.28], [80, 0]);

  //? animGroup 6: humanmiddle — x ขวา + opacity
  const humanMiddleOpacity = useTransform(scrollYProgress, [0.2, 0.34], [0, 1]);
  const humanMiddleX = useTransform(scrollYProgress, [0.2, 0.34], [-80, 0]);

  //? animGroup 7: humanback — y ขึ้น + opacity
  const humanBackOpacity = useTransform(scrollYProgress, [0.24, 0.38], [0, 1]);
  const humanBackY = useTransform(scrollYProgress, [0.24, 0.38], [60, 0]);

  //? animGroup 8: humanfront — y ขึ้น + opacity
  const humanFrontOpacity = useTransform(scrollYProgress, [0.28, 0.42], [0, 1]);
  const humanFrontY = useTransform(scrollYProgress, [0.28, 0.42], [60, 0]);

  // ─── Phase 2: Dark Overlay + Question (0.5 → 1.0) ─

  //? Phase 2 dark overlay — CSS bg-black แทนรูปภาพ
  const darkOverlayOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.62],
    [0, 0.85],
  );

  //? animGroup 9: cat — y ขึ้น + opacity
  const catOpacity = useTransform(scrollYProgress, [0.55, 0.68], [0, 1]);
  const catY = useTransform(scrollYProgress, [0.55, 0.68], [50, 0]);

  //? Question + Buttons opacity
  const questionOpacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
  const buttonsOpacity = useTransform(scrollYProgress, [0.8, 0.88], [0, 1]);

  // ─── Animation Map for SceneLayer ────────────────

  const animations: AnimationMap = useMemo(
    () => ({
      1: { opacity: wallOpacity, y: wallY },
      2: { opacity: shop4Opacity, y: shop4Y },
      3: { opacity: shop3Opacity, y: shop3Y },
      4: { opacity: shop2Opacity, y: shop2Y },
      5: { opacity: shop1Opacity, y: shop1Y },
      6: { opacity: humanMiddleOpacity, x: humanMiddleX },
      7: { opacity: humanBackOpacity, y: humanBackY },
      8: { opacity: humanFrontOpacity, y: humanFrontY },
      9: { opacity: catOpacity, y: catY },
    }),
    [
      wallOpacity,
      wallY,
      shop4Opacity,
      shop4Y,
      shop3Opacity,
      shop3Y,
      shop2Opacity,
      shop2Y,
      shop1Opacity,
      shop1Y,
      humanMiddleOpacity,
      humanMiddleX,
      humanBackOpacity,
      humanBackY,
      humanFrontOpacity,
      humanFrontY,
      catOpacity,
      catY,
    ],
  );

  // ─── Handlers ────────────────────────────────────

  const onCompletedRef = useRef(onCompleted);
  onCompletedRef.current = onCompleted;

  const handleAnswer = useCallback((answerId: string) => {
    setSelectedAnswer(answerId);

    //? เรียก onCompleted หลัง setState เสร็จ
    queueMicrotask(() => {
      onCompletedRef.current?.({ everPaidAnswer: answerId });
    });
  }, []);

  // ─── Render ──────────────────────────────────────

  return (
    <m.div
      className="fixed flex justify-center top-0 h-screen w-screen overflow-hidden bg-[#C9E1FD]"
      style={{ opacity, zIndex }}
    >
      <m.div className="flex items-center h-screen w-screen portrait:w-auto ">
        <SceneLayer
          items={SCENE_S9_1_ITEMS}
          animations={animations}
          containerAspectRatio={isMobile ? "1080 / 1920" : "1920 / 1080"}
        >
          {/* ═══ Phase 2: CSS Dark Overlay (replaces bgblack image) ═══ */}
          <m.div
            className="fixed inset-0 bg-black"
            style={{ opacity: darkOverlayOpacity }}
          />

          {/*? Question Overlay — flex-col container ตาม Figma frame (869:929 / 889:5143) */}
          <m.div
            className="absolute flex flex-col items-center pointer-events-none
              left-[46.88%] top-[34.72%] w-[46.09%]
              portrait:left-0 portrait:top-[24.84%] portrait:w-full
              gap-4 md:gap-8 lg:gap-[60px]"
            style={{ opacity: questionOpacity }}
          >
            {/*? Question Text — h3 (40px) Figma */}

            <MysteriousText
              text={S9_1_QUESTION_TEXT}
              scrollYProgress={scrollYProgress}
              startProgress={0.65}
              endProgress={0.85}
              className="text-white text-base md:text-2xl lg:text-3xl leading-normal tracking-[0.6px] text-center"
            />

            {/*? Choice Buttons — ได้ / ไม่ได้ (gap 130px Figma) */}
            <m.div
              className="flex gap-8 md:gap-16 lg:gap-[130px] pointer-events-auto"
              style={{ opacity: buttonsOpacity }}
            >
              {PAID_ANSWER_CHOICES.map((choice) => (
                <GradientButton
                  key={choice.id}
                  text={choice.text}
                  isSelected={selectedAnswer === choice.id}
                  onClick={() => handleAnswer(choice.id)}
                  variant={
                    selectedAnswer === choice.id ? "default" : "transparent"
                  }
                  className="px-8 py-2 md:px-16 md:py-4 text-sm md:text-2xl lg:text-3xl shrink-0"
                />
              ))}
            </m.div>
          </m.div>
        </SceneLayer>
      </m.div>
    </m.div>
  );
}
