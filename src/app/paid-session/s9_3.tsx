"use client";

import { type MotionValue, m, useTransform } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";
import GradientButton from "@/app/components/button/GradientButton";
import MysteriousText from "@/app/components/reusable/MysteriousText";
import SceneLayer, {
  type AnimationMap,
} from "@/app/components/reusable/SceneLayer";
import {
  S9_3_INPUT_PLACEHOLDER,
  S9_3_MAX_LENGTH,
  S9_3_QUESTION_TEXT,
  S9_3_QUESTION_TEXT_MOBILE,
  SCENE_S9_3_ITEMS,
  validateMeaningfulText,
} from "@/app/data/scene_s9_3.data";
import { useDevice } from "../contexts/DeviceContext";

// ────────────────────────────────────────────────────
//  Types
// ────────────────────────────────────────────────────

export interface S9_3Data {
  monetizableExperience: string;
}

interface S9_3Props {
  scrollYProgress: MotionValue<number>;
  onCompleted?: (data: S9_3Data) => void;
}

// ────────────────────────────────────────────────────
//  Main Component: S9_3 (Monetizable Experience)
// ────────────────────────────────────────────────────

export default function S9_3({ scrollYProgress, onCompleted }: S9_3Props) {
  const { isMobile } = useDevice();
  const [experience, setExperience] = useState("");
  const [error, setError] = useState("");

  // ─── Container opacity / zIndex ───
  const opacity = useTransform(scrollYProgress, [0, 0.1, 1], [0, 1, 1]);
  const zIndex = useTransform(scrollYProgress, [0, 0.1, 1], [-1, 10, 10]);

  // ─── SceneLayer Animations ───

  //? animGroup 1: money_bg — fade in
  const moneyBgOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);

  //? animGroup 2: starlight — fade in
  const starlightOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);

  //? animGroup 3: cat — y + opacity
  const catOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const catY = useTransform(scrollYProgress, [0.1, 0.25], [40, 0]);

  //? Question text
  const questionOpacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);

  //? Input area
  const inputOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  const inputY = useTransform(scrollYProgress, [0.35, 0.5], [30, 0]);

  //? Submit button
  const submitOpacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);

  // ─── Animation Map for SceneLayer ───
  const animations: AnimationMap = useMemo(
    () => ({
      1: { opacity: moneyBgOpacity },
      2: { opacity: starlightOpacity },
      3: { opacity: catOpacity, y: catY },
    }),
    [moneyBgOpacity, starlightOpacity, catOpacity, catY],
  );

  // ─── Handlers ───

  const onCompletedRef = useRef(onCompleted);
  onCompletedRef.current = onCompleted;

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setError("");
      setExperience(e.target.value);
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    const trimmed = experience.trim();
    if (trimmed.length === 0) return;

    //? ตรวจสอบข้อความมั่วๆ / พิมเล่นๆ
    const validationError = validateMeaningfulText(trimmed);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    queueMicrotask(() => {
      onCompletedRef.current?.({ monetizableExperience: trimmed });
    });
  }, [experience]);

  // ─── Render ───

  return (
    <m.div
      className="fixed flex justify-center top-0 h-screen w-screen overflow-hidden bg-s9-2"
      style={{ opacity, zIndex }}
    >
      <m.div className="flex items-center h-screen w-screen portrait:w-auto ">
        <SceneLayer
          items={SCENE_S9_3_ITEMS}
          animations={animations}
          containerAspectRatio={isMobile ? "1080 / 1920" : "1920 / 1080"}
        >
          {/* Content Layer — question + input */}
          <div className="absolute inset-0 flex flex-col items-start pointer-events-none">
            {/*? Question Text
                Desktop: (275, 218) on 1920x1080 → left 14.32%, top 20.19%, w 71.41%
                Mobile:  (41, 172) on 1080x1920  → left 3.80%, top 8.96%, w 92.50% */}
            <m.div
              className="absolute flex flex-col items-center left-[14.32%] top-[20.19%] w-[71.41%]
                portrait:left-[3.80%] portrait:top-[8.96%] portrait:w-[92.50%]"
              style={{ opacity: questionOpacity }}
            >
              <MysteriousText
                text={isMobile ? S9_3_QUESTION_TEXT_MOBILE : S9_3_QUESTION_TEXT}
                scrollYProgress={scrollYProgress}
                startProgress={0.2}
                endProgress={0.4}
                className="text-white text-base md:text-2xl lg:text-3xl leading-normal tracking-[0.6px] text-center"
              />
            </m.div>

            {/*? Input Area
                Desktop: (266, 483) on 1920x1080 → left 13.85%, top 44.72%, w 40.10%
                Mobile:  (266, 483) on 1080x1920 → left 24.63%, top 25.16%, w 71.30% */}
            <m.div
              className="absolute pointer-events-auto
                left-[13.85%] top-[35%] w-[40.10%]
                portrait:left-[10%] portrait:top-[25.16%] portrait:w-[80%]"
              style={{ opacity: inputOpacity, y: inputY }}
            >
              {/*? Textarea — styled ตาม Figma input frame (770x470 Desktop) */}
              <div className="w-full aspect-770/470 relative">
                <textarea
                  value={experience}
                  onChange={handleTextChange}
                  maxLength={S9_3_MAX_LENGTH}
                  placeholder={S9_3_INPUT_PLACEHOLDER}
                  className="w-full h-full p-[6.38%] resize-none
                    bg-black/20
                     rounded-2xl
                    text-white text-base md:text-lg lg:text-xl
                    placeholder:text-white/40
                    focus:outline-none focus:border-white/60
                    transition-colors duration-300"
                />

                {/*? Character counter */}
                <p className="absolute bottom-5 right-5 text-white/40 text-xs md:text-sm select-none">
                  {experience.length} / {S9_3_MAX_LENGTH}
                </p>
              </div>

              {/*? Error message */}
              {error && (
                <p className="text-red-400 text-xs md:text-sm mt-2 text-center">
                  {error}
                </p>
              )}

              {/*? Submit button */}
              <m.div
                className="flex justify-center w-full mt-4 md:mt-6"
                style={{ opacity: submitOpacity }}
              >
                <GradientButton
                  text="ส่งคำตอบ"
                  isSelected={experience.trim().length > 0}
                  onClick={handleSubmit}
                  disabled={experience.trim().length === 0}
                  className="px-8 py-2 md:px-16 md:py-4 text-base md:text-lg lg:text-xl"
                />
              </m.div>
            </m.div>
          </div>
        </SceneLayer>
      </m.div>
    </m.div>
  );
}
