"use client";

import { type MotionValue, m, useTransform } from "framer-motion";
import { useMemo, useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import GradientButton from "@/app/components/button/GradientButton";
import MysteriousText from "@/app/components/reusable/MysteriousText";
import SceneLayer, {
  type AnimationMap,
} from "@/app/components/reusable/SceneLayer";
import {
  S7_3_QUESTION_1,
  S7_3_QUESTION_2,
  SCENE_S7_3_ITEMS,
  SKILLS_MATCH_CHOICES,
  USE_SKILLS_CHOICES,
} from "@/app/data/scene_s7_3.data";
import { useDevice } from "../contexts/DeviceContext";

// ────────────────────────────────────────────────────
//  Types
// ────────────────────────────────────────────────────

export interface S7_3Data {
  skillsMatchJob: string;
  useSkillsInNewRole: string;
}

interface S7_3Props {
  scrollYProgress: MotionValue<number>;
  onCompleted?: (data: S7_3Data) => void;
}

// ────────────────────────────────────────────────────
//  Main Component: S7_3 (Skills Match Job - Decision)
// ────────────────────────────────────────────────────

//? Animation Timeline (0-1 within 400vh scroll):
//? Q1 Phase (0-0.5 — top half of scene):
//?   0-0.08: Container + Q1 bg fade in
//?   0.05-0.15: Q1 cat fade in
//?   0.08-0.18: Q1 paper fade in
//?   0.12-0.22: Q1 text + buttons fade in
//?   0.35-0.55: Scene translates to Q2 (desktop only)
//? Q2 Phase (0.5-1.0 — bottom half of scene):
//?   0.50-0.60: Q2 cat fade in
//?   0.58-0.68: Q2 text + buttons fade in

export default function S7_3({ scrollYProgress, onCompleted }: S7_3Props) {
  const { isMobile } = useDevice();

  //? State: user selections
  const [skillsMatchJob, setSkillsMatchJob] = useState<string | null>(null);
  const [useSkillsInNewRole, setUseSkillsInNewRole] = useState<string | null>(
    null,
  );
  const [showContinueButton, setShowContinueButton] = useState(false);

  // ─── Container Animations ───

  //? Container opacity: fade in at start, fade out at end
  // const containerOpacity = useTransform(
  //   scrollYProgress,
  //   [0, 0.08, 1],
  //   [0, 1, 1],
  // );

  //? Container zIndex: bring to front when visible
  const containerZIndex = useTransform(
    scrollYProgress,
    [0, 0.049, 0.05, 0.94, 0.95],
    [-1, -1, 10, 10, -1],
  );

  // ─── Sticky top offset (scrolls scene from Q1→Q2) ───
  //? Same pattern as IntoDark_Submit: sticky + top transform
  //? 0vh = shows Q1 (top half), -100vh = shows Q2 (bottom half)
  const top = useTransform(
    scrollYProgress,
    [0, 0.35, 0.9, 1],
    ["0vh", "0vh", "-100vh", "-100vh"],
  );

  // ─── Background Item Animations ───

  //? Q1 bg (animGroup 1)
  const q1BgOpacity = useTransform(scrollYProgress, [0, 1], [1, 1]);
  //? Star decoration (animGroup 2)
  const starOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  //? Q1 cat sitting (animGroup 3)
  const q1CatOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  //? Q1 paper (animGroup 4)
  const q1PaperOpacity = useTransform(scrollYProgress, [0.08, 0.18], [0, 1]);
  //? Q2 cat sleeping (animGroup 5)
  const q2CatOpacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);

  //? Combined Animation Map for single SceneLayer
  const animations: AnimationMap = useMemo(
    () => ({
      1: { opacity: q1BgOpacity },
      2: { opacity: starOpacity },
      3: { opacity: q1CatOpacity },
      4: { opacity: q1PaperOpacity },
      5: { opacity: q2CatOpacity },
    }),
    [q1BgOpacity, starOpacity, q1CatOpacity, q1PaperOpacity, q2CatOpacity],
  );

  // ─── Content Animations ───

  //? Q1 text + buttons
  const q1TextOpacity = useTransform(scrollYProgress, [0.12, 0.22], [0, 1]);
  const q1TextY = useTransform(scrollYProgress, [0.12, 0.22], [30, 0]);

  //? Q2 text + buttons
  const q2TextOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
  const q2TextY = useTransform(scrollYProgress, [0.58, 0.68], [30, 0]);

  //? Continue button opacity (appears after Q2 choice selected)
  const continueButtonOpacity = useTransform(() => {
    if (showContinueButton) {
      return 1;
    }
    return 0;
  });

  // ─── Handlers ───

  //? Q1: Select skills match answer
  const handleQ1Select = (choiceId: string) => {
    setSkillsMatchJob(choiceId);
  };

  //? Q2: Select use-skills-in-new-role answer → show continue button
  const handleQ2Select = (choiceId: string) => {
    setUseSkillsInNewRole(choiceId);
    //? Show continue button immediately when selected
    setShowContinueButton(true);
  };

  //? Handle continue button click → submit S7_3 data
  const handleContinue = () => {
    if (skillsMatchJob && useSkillsInNewRole) {
      onCompleted?.({
        skillsMatchJob,
        useSkillsInNewRole,
      });
    }
  };

  return (
    <m.div className="sticky top-0 w-full overflow-hidden" style={{ top }}>
      <m.div
        className="flex items-center justify-center min-h-screen"
        style={{ opacity: 1, zIndex: containerZIndex }}
      >
        <SceneLayer
          items={SCENE_S7_3_ITEMS}
          animations={animations}
          containerAspectRatio={isMobile ? "1080 / 3840" : "1920 / 2160"}
        >
          {/* ═══ Q1 Content ═══ */}
          {/*? Desktop: centered at x=960, y=254, w=998 in 1920×2160 */}
          {/*? Mobile: centered, top ~7.5% of 1080×3840 container */}
          <m.div
            className={`
              absolute z-10 flex flex-col items-center left-1/2 -translate-x-1/2
              ${isMobile ? "w-[85.19%] top-[15%]" : "w-[51.98%] top-[11.76%]"}
            `}
            style={{ opacity: q1TextOpacity, y: q1TextY }}
          >
            {/*? Question 1 Text — h3: 40px desktop */}
            <div className="text-center w-full shrink-0">
              <MysteriousText
                text={S7_3_QUESTION_1}
                scrollYProgress={scrollYProgress}
                startProgress={0.1}
                endProgress={0.25}
                className="text-white text-lg md:text-2xl lg:text-3xl leading-normal tracking-[0.6px]"
              />
            </div>

            {/*? Q1 Buttons — desktop: w=493/998=49.40%, mt=75/998=7.52%, justify-between */}
            <div
              className={`
                flex items-center shrink-0
                ${
                  isMobile
                    ? "justify-center gap-8 mt-8"
                    : "justify-between w-[49.40%] mt-[7.52%]"
                }
              `}
            >
              {SKILLS_MATCH_CHOICES.map((choice) => (
                <GradientButton
                  key={choice.id}
                  text={choice.text}
                  isSelected={skillsMatchJob === choice.id}
                  onClick={() => handleQ1Select(choice.id)}
                  variant={
                    skillsMatchJob === choice.id ? "default" : "transparent"
                  }
                  className="px-8 py-2 md:px-16 md:py-4 text-sm md:text-2xl lg:text-3xl shrink-0"
                />
              ))}
            </div>
          </m.div>

          {/* ═══ Q2 Content ═══ */}
          {/*? Desktop: x=1049, y=1478, w=629 in 1920×2160 → left=54.64%, top=68.43% */}
          {/*? Mobile: centered, top ~55% of 1080×3840 container */}
          <m.div
            className={`
              absolute z-10 flex flex-col items-center
              ${
                isMobile
                  ? "left-1/2 -translate-x-1/2 w-[85.19%] top-[60%]"
                  : "left-[54.64%] w-[32.76%] top-[68.43%]"
              }
            `}
            style={{ opacity: q2TextOpacity, y: q2TextY }}
          >
            {/*? Question 2 Text — h3: 40px desktop, text-center */}
            <div className="text-center w-full shrink-0">
              <MysteriousText
                text={S7_3_QUESTION_2}
                scrollYProgress={scrollYProgress}
                startProgress={0.7}
                endProgress={0.9}
                className="text-white text-lg md:text-2xl lg:text-3xl leading-normal tracking-[0.6px]"
              />
            </div>

            {/*? Q2 Buttons — desktop: w=444/629=70.59%, mt=80/629=12.72%, justify-between */}
            <div
              className={`
                flex items-center shrink-0
                ${
                  isMobile
                    ? "justify-center gap-8 mt-8"
                    : "justify-between w-[70.59%] mt-[12.72%]"
                }
              `}
            >
              {USE_SKILLS_CHOICES.map((choice) => (
                <GradientButton
                  key={choice.id}
                  text={choice.text}
                  isSelected={useSkillsInNewRole === choice.id}
                  onClick={() => handleQ2Select(choice.id)}
                  variant={
                    useSkillsInNewRole === choice.id ? "default" : "transparent"
                  }
                  className="px-8 py-2 md:px-16 md:py-4 text-sm md:text-2xl lg:text-3xl shrink-0"
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
