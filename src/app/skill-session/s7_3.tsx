"use client";

import {
  type MotionValue,
  m,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import type { AnimationItem } from "lottie-web";
import { useCallback, useMemo, useRef, useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import GradientButton from "@/app/components/button/GradientButton";
import MysteriousText from "@/app/components/reusable/MysteriousText";
import SceneLayer, {
  type AnimationMap,
} from "@/app/components/reusable/SceneLayer";
import {
  S7_3_QUESTION_1,
  S7_3_QUESTION_1_MOBILE,
  S7_3_QUESTION_2,
  SCENE_S7_3_ITEMS,
  SKILLS_MATCH_CHOICES,
  USE_SKILLS_CHOICES,
} from "@/app/data/scene_s7_3.data";
import { getJsonUrl } from "@/utils/cloudinaryUtils";
import LazyLottie from "../components/reusable/LazyLottie";
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
  const sectionRef = useRef<HTMLDivElement>(null);

  //? State: user selections
  const [skillsMatchJob, setSkillsMatchJob] = useState<string | null>(null);
  const [useSkillsInNewRole, setUseSkillsInNewRole] = useState<string | null>(
    null,
  );
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [showQ1Validation, setShowQ1Validation] = useState(false);

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
    [0.35, 0.9, 1],
    ["calc(0vh - 0%)", "calc(50vh - 50%)", "calc(100vh - 100%)"],
  );

  // ─── Background Item Animations ───

  //? Q1 bg (animGroup 1)
  const q1BgOpacity = useTransform(scrollYProgress, [0, 1], [1, 1]);
  //? Star decoration (animGroup 2)
  const starOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  //? Q1 cat sitting (animGroup 3)
  const q1CatOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  //? Q1 paper (Lottie — loop frames 30-50)
  const q1PaperOpacity = useTransform(scrollYProgress, [0.08, 0.18], [0, 1]);
  //? Q2 cat sleeping (animGroup 5)
  const q2CatOpacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);

  //? Lottie ref for paper — used to set playSegments
  const paperLottieRef = useRef<AnimationItem | null>(null);

  //? เล่น 0-120 (intro) ตอนที่ opacity > 0 ครั้งแรก แล้ว loop 120-200 ไปเรื่อยๆ
  //? ใช้ loop=false + complete event เพื่อหลีกเลี่ยงการกระตุก
  const hasPlayedIntroRef = useRef(false);

  const handlePaperRef = useCallback((instance: AnimationItem | null) => {
    paperLottieRef.current = instance;
    if (instance) {
      //? หยุดไว้ที่ frame 0 ก่อน รอ opacity > 0 ค่อยเล่น
      instance.goToAndStop(0, true);
      instance.addEventListener("complete", () => {
        //? ไม่ว่าจะ intro หรือ loop segment → เล่น 120-200 ซ้ำ
        hasPlayedIntroRef.current = true;
        instance.playSegments([120, 200], true);
      });
    }
  }, []);

  //? สั่ง play/pause ตาม opacity — เริ่ม intro เมื่อปรากฏครั้งแรก
  useMotionValueEvent(q1PaperOpacity, "change", (latest) => {
    const anim = paperLottieRef.current;
    if (!anim) return;
    if (latest > 0) {
      if (anim.isPaused) {
        //? เริ่ม intro (0→120) ทุกครั้งที่กลับมาเห็น
        hasPlayedIntroRef.current = false;
        anim.playSegments([0, 120], true);
      }
    } else {
      //? opacity = 0 → หยุดแล้ว reset กลับ frame 0
      if (!anim.isPaused) anim.pause();
      anim.goToAndStop(0, true);
      hasPlayedIntroRef.current = false;
    }
  });

  //? Combined Animation Map for single SceneLayer
  const animations: AnimationMap = useMemo(
    () => ({
      1: { opacity: q1BgOpacity },
    }),
    [q1BgOpacity],
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
    setShowQ1Validation(false);
  };

  //? Q2: Select use-skills-in-new-role answer → show continue button
  const handleQ2Select = (choiceId: string) => {
    setUseSkillsInNewRole(choiceId);
    //? Show continue button immediately when selected
    setShowContinueButton(true);
  };

  //? Handle continue button click → submit S7_3 data
  const handleContinue = () => {
    if (!skillsMatchJob) {
      setShowQ1Validation(true);

      //? Scroll back to the start of S7_3 so Q1 is visible immediately
      const q1Top = sectionRef.current?.offsetTop ?? 0;
      window.scrollTo({ top: Math.max(0, q1Top), behavior: "smooth" });
      return;
    }

    if (skillsMatchJob && useSkillsInNewRole) {
      onCompleted?.({
        skillsMatchJob,
        useSkillsInNewRole,
      });
    }
  };

  return (
    <m.div
      ref={sectionRef}
      className="sticky top-0 w-full overflow-hidden"
      style={{ top }}
    >
      <m.div
        className="flex items-center justify-center min-h-screen "
        style={{ opacity: 1, zIndex: containerZIndex }}
      >
        <SceneLayer
          items={SCENE_S7_3_ITEMS}
          animations={animations}
          containerAspectRatio={isMobile ? "1080 / 3840" : "1920 / 2160"}
        >
          {/* Star decoration (Lottie) */}
          {isMobile ? (
            <m.div
              className="absolute"
              style={{
                width: "104.38%",
                height: "99.99%",
                left: "-2.66%",
                top: "1.82%",
                opacity: starOpacity,
              }}
            >
              <LazyLottie
                src={getJsonUrl("Scene/Scene7/04/star-mb.json")}
                className="w-full h-full"
                loop
                playTrigger={starOpacity}
              />
            </m.div>
          ) : (
            <m.div
              className="absolute"
              style={{
                width: "104.38%",
                height: "99.99%",
                left: "-2.66%",
                top: "1.82%",
                opacity: starOpacity,
              }}
            >
              <LazyLottie
                src={getJsonUrl("Scene/Scene7/04/star.json")}
                className="w-full h-full"
                loop
                playTrigger={starOpacity}
              />
            </m.div>
          )}

          {/* Q1: Flying papers (Lottie — loop frames 30-50) */}
          <m.div
            className="absolute"
            style={{
              width: isMobile ? "178.88%" : "101.35%",
              height: isMobile ? "22.06%" : "39.50%",
              left: isMobile ? "-43.8%" : "-2.93%",
              top: isMobile ? "25.52%" : "18.80%",
              opacity: q1PaperOpacity,
            }}
          >
            <LazyLottie
              src={getJsonUrl("Scene/Scene7/03/s7-paper.json")}
              className="w-full h-full"
              loop={false}
              getRef={handlePaperRef}
              ignoreAspectRatio
            />
          </m.div>

          {/* Q1: Cat sitting on mat (Lottie) */}
          <m.div
            className="absolute"
            style={{
              width: isMobile ? "50.11%" : "28.19%",
              height: isMobile ? "13.18%" : "23.43%",
              left: isMobile ? "27.22%" : "37.25%",
              top: isMobile ? "28.98%" : "25.09%",
              opacity: q1CatOpacity,
            }}
          >
            <LazyLottie
              src={getJsonUrl("Scene/Scene7/04/cat_frame.json")}
              className="w-full h-full"
              loop
              playTrigger={q1CatOpacity}
            />
          </m.div>

          {/* Q2: Sleeping cat with crystal ball (Lottie) */}
          <m.div
            className="absolute"
            style={{
              width: isMobile ? "64.54%" : "36.30%",
              height: isMobile ? "20.01%" : "35.57%",
              left: isMobile ? "24.94%" : "10.45%",
              top: isMobile ? "74.24%" : "66.09%",
              opacity: q2CatOpacity,
            }}
          >
            <LazyLottie
              src={getJsonUrl("Scene/Scene7/04/cat_pics.json")}
              className="w-full h-full"
              loop
              playTrigger={q2CatOpacity}
            />
          </m.div>

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
                text={isMobile ? S7_3_QUESTION_1_MOBILE : S7_3_QUESTION_1}
                scrollYProgress={scrollYProgress}
                startProgress={0.1}
                endProgress={0.25}
                className="text-white text-lg md:text-2xl 2xl:text-3xl leading-normal tracking-[0.6px]"
              />
            </div>

            {/*? Q1 Buttons — desktop: w=493/998=49.40%, mt=75/998=7.52%, justify-between */}
            <div
              className={`
                flex items-center shrink-0
                ${
                  isMobile
                    ? "justify-center gap-8 mt-8"
                    : "justify-between gap-8 mt-[7.52%]"
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
                  className="px-8 py-2 md:px-16 md:py-4 text-sm md:text-2xl 2xl:text-3xl shrink-0"
                />
              ))}
            </div>

            <m.p
              className="mt-4 text-center text-sm md:text-lg text-red-300"
              initial={{ opacity: 0, y: 6 }}
              animate={{
                opacity: showQ1Validation ? 1 : 0,
                y: showQ1Validation ? 0 : 6,
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              กรุณาเลือกคำตอบข้อแรกก่อน
            </m.p>
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
                className="text-white text-lg md:text-2xl 2xl:text-3xl leading-normal tracking-[0.6px]"
              />
            </div>

            {/*? Q2 Buttons — desktop: w=444/629=70.59%, mt=80/629=12.72%, justify-between */}
            <div
              className={`
                flex items-center shrink-0
                ${
                  isMobile
                    ? "justify-center gap-8 mt-8"
                    : "justify-between gap-8 mt-[12.72%]"
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
                  className="px-8 py-2 md:px-16 md:py-4 text-sm md:text-2xl 2xl:text-3xl shrink-0"
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
                className="text-sm md:text-2xl 2xl:text-3xl"
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
