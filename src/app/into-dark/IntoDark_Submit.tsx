"use client";
import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import Lottie from "lottie-react";
import IkigaiCircle from "@/app/prologue/IkigaiCircle";
import MysteriousText from "./MysteriousText";
import GradientButton from "@/app/components/ui/GradientButton";
import { useIsPortrait } from "@/app/hooks/useOrientation";
import catAnimationData from "../../../public/assets/Scene/Scene5/scene5-04/s5-4-cat.json";
import tailAnimationData from "../../../public/assets/Scene/Scene5/scene5-02/s5-2-tail.json";
import starLine1AnimationData from "../../../public/assets/Scene/Scene5/scene5-02/starline1.json";
import SceneLayer, {
  AnimationMap,
  ItemAnimationOverride,
} from "@/app/components/scene/SceneLayer";
import {
  SCENE_5_04_ITEMS,
  SCENE_5_04_ANIMATIONS,
} from "@/app/data/scene5-04.data";

interface SubmitProps {
  scrollYProgress: MotionValue<number>;
  isLoading: boolean;
  handleSubmit: () => void;
}

export default function IntoDarkSubmit({
  scrollYProgress,
  isLoading,
  handleSubmit,
}: SubmitProps) {
  const isPortrait = useIsPortrait();

  // Main container opacity and z-index
  const opacity = useTransform(
    scrollYProgress,
    [0.67, 0.7, 0.944, 1.0],
    [0, 1, 1, 1],
  );
  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.667, 0.668, 1.0],
    [-1, -1, 10, 10],
  );

  // Circle rotations (like Hero component)
  const circle1_rotate = useTransform(
    scrollYProgress,
    [0.676, 0.73],
    [0, -180],
  ); // Love - Top
  const circle2_rotate = useTransform(scrollYProgress, [0.676, 0.73], [0, 90]); // Skill - Left
  const circle3_rotate = useTransform(scrollYProgress, [0.676, 0.73], [90, 0]); // Paid - Bottom
  const circle4_rotate = useTransform(scrollYProgress, [0.676, 0.73], [0, -90]); // World - Right

  const subText_opacity = useTransform(scrollYProgress, [0.7, 0.75], [0, 1]); // World - Right
  const subText_y = useTransform(scrollYProgress, [0.7, 0.75], [30, 0]);

  // Local animation config for IkigaiCircle reuse
  const circleTransition = {
    type: "tween" as const,
    duration: 2,
    ease: "easeInOut" as const,
    delay: 0,
  };
  const circleImgTransition = {
    type: "tween" as const,
    duration: 2,
    ease: "easeInOut" as const,
    delay: 0,
  };

  // Stars animation (applies to little-star items via SceneLayer.animations)
  const starsY = useTransform(scrollYProgress, [0.667, 0.676], [50, 0]);
  const starsOpacity = useTransform(scrollYProgress, [0.667, 0.676], [0, 1]);
  const sceneAnimations = {
    1: { y: starsY, opacity: starsOpacity },
  } as const;

  // Per-item overrides: make little stars rise and continuously blink/bob.
  const starIds = [
    "little-star3",
    "little-star4",
    "little-star5",
    "little-star6",
    "little-star7",
    "little-star8",
  ];

  const itemOverrides: ItemAnimationOverride = starIds.reduce(
    (acc, id, idx) => {
      const delay = idx * 0.12; // stagger each star
      acc[id] = {
        initial: { opacity: 0 },
        animate: {
          opacity: [0.35, 1, 0.35, 1],
        },
        transition: {
          duration: 4.2,
          times: [0, 0.28, 0.6, 1],
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      };
      return acc;
    },
    {} as ItemAnimationOverride,
  );

  // Text reveal sequencing (layers): higher layers should appear first.
  // Base progress window for this section is around 0.667-0.676; we'll stagger from there.
  const textBase = 0.67;
  const textStep = 0.08;
  const tHeaderStart = textBase + textStep * 0;
  const tHeaderEnd = tHeaderStart + textStep;
  const tIntersectStart = textBase + textStep * 1;
  const tIntersectEnd = tIntersectStart + textStep;
  const tLongStart = tIntersectEnd + 0.02;
  const tCTALineStart = textBase + textStep * 3.7;
  const tTextSectionStart = textBase + textStep * 3.6;

  return (
    <div className="sticky -top-20 w-full pointer-events-none">
      <motion.div
        className="flex items-center justify-center min-h-screen pointer-events-none"
        style={{
          opacity,
          zIndex,
        }}
      >
        <div
          className={`relative w-full pointer-events-auto flex flex-col items-center justify-between overflow-hidden bg-black ${
            isPortrait
              ? "aspect-1080/4320 px-[5.2%] pt-[200px]"
              : "aspect-1920/2160 px-[5.2%] py-[6.48%]"
          }`}
        >
          {/* Line Star 1 */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              inset: isPortrait
                ? "91.57% -6.47% 4.34% 78.06%"
                : "90.39% 47.38% 1.44% 36.63%",
            }}
          >
            <Lottie
              animationData={starLine1AnimationData}
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>

          <div className="absolute inset-0 ">
            {/* Little Stars 3 - 8 as SceneLayer items (positions from Figma - percent values for 1920x2160) */}
            <SceneLayer
              items={SCENE_5_04_ITEMS}
              animations={sceneAnimations as AnimationMap}
              baseStyle={{}}
              containerAspectRatio="1920 / 2160"
              itemOverrides={itemOverrides}
            />
          </div>

          {/* SECTION 1: Description with Circle Ikigai */}
          <div className="flex flex-col items-center justify-between relative z-10 w-full portrait:h-screen h-fit shrink-0">
            <div className="typo-text-h4 text-center text-slate-100">
              <MysteriousText
                text={
                  isPortrait
                    ? `ถ้าเจ้าหาจุดที่ทั้งสี่สายมาบรรจบกันได้… \n จะเกิดเป็น`
                    : `ถ้าเจ้าหาจุดที่ทั้งสี่สายมาบรรจบกันได้… จะเกิดเป็น`
                }
                scrollYProgress={scrollYProgress}
                startProgress={tHeaderStart}
                endProgress={tHeaderEnd}
              />
            </div>

            {/* Circle Ikigai with 4 colored circles (reused IkigaiCircle component) */}
            <div className="w-[400px] md:w-[735px] h-[400px] md:h-[735px]  flex flex-col items-center justify-center relative over">
              {/* World Circle - Top Right */}
              <IkigaiCircle
                className="scale-50 md:scale-80 lg:scale-100"
                imageSrc="/assets/Scene/Hero/world-circle.webp"
                iconSrc="/assets/Icon/world.svg"
                text={"สิ่งที่\nโลกต้องการ"}
                rotateValue={circle4_rotate}
                initialAnimation={{
                  initial: { opacity: 0, rotate: 0, x: 350 },
                  animate: { opacity: 1, rotate: -90 },
                }}
                shouldAnimate={true}
                opacity={opacity}
                tooltipRotate={90}
                circleImgTransition={circleImgTransition}
                transition={circleTransition}
              />

              {/* Paid Circle - Bottom */}
              <IkigaiCircle
                className="scale-50 md:scale-80 lg:scale-100"
                imageSrc="/assets/Scene/Hero/paid-circle.webp"
                iconSrc="/assets/Icon/paid.svg"
                text="สิ่งที่ทำให้เกิดรายได้"
                rotateValue={circle3_rotate}
                initialAnimation={{
                  initial: { opacity: 0, rotate: 90, y: 320 },
                  animate: { opacity: 1, rotate: 0 },
                }}
                shouldAnimate={true}
                opacity={opacity}
                tooltipRotate={0}
                circleImgTransition={circleImgTransition}
                transition={circleTransition}
              />

              {/* Skill Circle - Left */}
              <IkigaiCircle
                className="scale-50 md:scale-80 lg:scale-100"
                imageSrc="/assets/Scene/Hero/skill-circle.webp"
                iconSrc="/assets/Icon/skill.svg"
                text={"สิ่งที่\nเราถนัด"}
                rotateValue={circle2_rotate}
                initialAnimation={{
                  initial: { opacity: 0, rotate: 0, x: -350 },
                  animate: { opacity: 1, rotate: 90 },
                }}
                shouldAnimate={true}
                opacity={opacity}
                tooltipRotate={-90}
                circleImgTransition={circleImgTransition}
                transition={circleTransition}
              />

              {/* Love Circle - Top */}

              <IkigaiCircle
                className="scale-50 md:scale-80 lg:scale-100"
                imageSrc="/assets/Scene/Hero/love-circle.webp"
                iconSrc="/assets/Icon/love.svg"
                text="สิ่งที่เรารัก"
                rotateValue={circle1_rotate}
                initialAnimation={{
                  initial: { opacity: 0, rotate: 0, y: -320 },
                  animate: { opacity: 1, rotate: -180 },
                }}
                shouldAnimate={true}
                opacity={opacity}
                tooltipRotate={180}
                circleImgTransition={circleImgTransition}
                transition={circleTransition}
              />

              {/* Intersect Text - Center labels */}
              <motion.div
                className="typo-text-h5 text-center flex flex-col justify-between items-center w-[45%] h-[35%]"
                style={{ opacity: subText_opacity, y: subText_y }}
              >
                <div className="typo-text-h5 text-center flex justify-between w-full">
                  <div className="text-white relative">
                    <MysteriousText
                      text={`แรงผลักดัน\n(Passion)`}
                      scrollYProgress={scrollYProgress}
                      startProgress={tIntersectStart}
                      endProgress={tIntersectEnd}
                    />
                  </div>
                  <div className="text-white relative">
                    <MysteriousText
                      text={`หน้าที่\n(Mission)`}
                      scrollYProgress={scrollYProgress}
                      startProgress={tIntersectStart}
                      endProgress={tIntersectEnd}
                    />
                  </div>
                </div>
                <div className="typo-text-h5 text-center flex justify-between w-full">
                  <div className="text-white relative">
                    <MysteriousText
                      text={`ทักษะวิชาชีพ\n(Vocation)`}
                      scrollYProgress={scrollYProgress}
                      startProgress={tIntersectStart}
                      endProgress={tIntersectEnd}
                    />
                  </div>
                  <div className="text-white relative">
                    <MysteriousText
                      text={`อาชีพ\n(Profession)`}
                      scrollYProgress={scrollYProgress}
                      startProgress={tIntersectStart}
                      endProgress={tIntersectEnd}
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Long description text */}
            <div className="typo-text-h4 text-center text-slate-100 w-full">
              <div className="mb-0">
                <MysteriousText
                  text={`พื้นที่ของ "ความหมาย" ในชีวิตและงานของแต่ละบุคคล`}
                  scrollYProgress={scrollYProgress}
                  startProgress={tLongStart}
                  endProgress={tLongStart + 0.05}
                />
              </div>
              <div className="mb-0">
                <MysteriousText
                  text={
                    isPortrait
                      ? `ใช้เพื่อเตรียมความพร้อมและส่งเสริม\nการปรับตัวเข้าสู่สังคมการทำงาน`
                      : `ใช้เพื่อเตรียมความพร้อมและส่งเสริมการปรับตัวเข้าสู่สังคมการทำงาน`
                  }
                  scrollYProgress={scrollYProgress}
                  startProgress={tLongStart + 0.02}
                  endProgress={tLongStart + 0.07}
                />
              </div>
              <div className="mb-0">
                <MysteriousText
                  text={`หากได้ศึกษาหรือเข้าใจอิคิไก\nก่อนที่จะเลือกเรียนหรือเลือกประกอบอาชีพ`}
                  scrollYProgress={scrollYProgress}
                  startProgress={tLongStart + 0.04}
                  endProgress={tLongStart + 0.09}
                />
              </div>
              <div>
                <MysteriousText
                  text={`ก็จะมีประโยชน์มากยิ่งขึ้น\nและอาจพาเจ้าออกจากความมัวมืดในคืนนี้ได้`}
                  scrollYProgress={scrollYProgress}
                  startProgress={tLongStart + 0.06}
                  endProgress={tLongStart + 0.11}
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Submit Cat with Text */}
          <div
            className={`flex items-center relative z-10 w-full h-screen shrink-0  ${
              isPortrait ? "flex-col gap-[100px] pt-[150px]" : "justify-between"
            }`}
          >
            {/* Cat Frame */}
            <div
              className={`relative inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start shrink-0 ${
                isPortrait ? "" : ""
              }`}
            >
              {/* Light Cat moved into SceneLayer (see SCENE_5_04_ITEMS) */}

              {/* Tail Animation */}
              <div
                className="[grid-area:1/1] relative"
                style={{
                  width: isPortrait ? "230.4px" : "320px",
                  height: isPortrait ? "216px" : "300px",
                  marginLeft: isPortrait ? "340.95px" : "473.54px",
                  marginTop: "0px",
                }}
              >
                <Lottie
                  animationData={tailAnimationData}
                  loop={true}
                  className="w-full h-full scale-x-[-1] rotate-210"
                />
              </div>

              {/* Cat Animation */}
              <div
                className="[grid-area:1/1] relative"
                style={{
                  width: isPortrait ? "360.46px" : "500.64px",
                  height: isPortrait ? "381.05px" : "528.96px",
                  marginLeft: isPortrait ? "16.31px" : "22.65px",
                  marginTop: isPortrait ? "22.38px" : "31.06px",
                }}
              >
                <Lottie
                  animationData={catAnimationData}
                  loop={true}
                  className="w-full h-full"
                />
              </div>

              {/* Cloud 2 - Bottom */}
              <Image
                src="/assets/Scene/Scene5/scene5-04/Cloud2.svg"
                alt="cloud"
                width={isPortrait ? 599 : 832}
                height={isPortrait ? 140 : 195}
                className="[grid-area:1/1] mix-blend-screen relative"
                style={{
                  marginLeft: "0px",
                  marginTop: isPortrait ? "279.76px" : "388.69px",
                }}
              />
            </div>

            {/* Text Section */}
            <div
              className={`flex flex-col items-start relative shrink-0 ${
                isPortrait
                  ? "justify-between gap-[60px]"
                  : "gap-[60px] flex-1 min-w-0"
              }`}
            >
              <div className="typo-text-h4 text-center text-slate-100 w-full">
                <div className="mb-0">
                  <MysteriousText
                    text={`แต่เจ้าไม่ต้องกังวลไปการที่เจ้ายังไม่ค้นพบตัวเองตอนนี้`}
                    scrollYProgress={scrollYProgress}
                    startProgress={tTextSectionStart}
                    endProgress={1}
                  />
                </div>
                <div>
                  <MysteriousText
                    text={`ไม่ใช่เรื่องที่แปลกประหลาด`}
                    scrollYProgress={scrollYProgress}
                    startProgress={tTextSectionStart + 0.005}
                    endProgress={1}
                  />
                </div>
              </div>

              {/* CTA Section */}
              <div className="flex flex-col items-center justify-between w-full gap-[60px]">
                <div className="typo-text-h4 text-center text-slate-100 w-full">
                  <div className="mb-0">
                    <MysteriousText
                      text={`เจ้าอยากจะลองไปตามหาอิคิไก`}
                      scrollYProgress={scrollYProgress}
                      startProgress={tCTALineStart}
                      endProgress={1}
                    />
                  </div>
                  <div>
                    <MysteriousText
                      text={`ของเจ้าดูบ้างไหมล่ะ`}
                      scrollYProgress={scrollYProgress}
                      startProgress={tCTALineStart + 0.005}
                      endProgress={1}
                    />
                  </div>
                </div>

                <GradientButton
                  text={isLoading ? "กำลังโหลด..." : "พยักหน้า"}
                  isSelected={!isLoading}
                  onClick={handleSubmit}
                  variant="white"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
