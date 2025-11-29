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
  getScene504Items,
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

  // Get scene items based on orientation
  const sceneItems = getScene504Items(isPortrait);

  // Main container opacity and z-index
  const opacity = useTransform(
    scrollYProgress,
    [0.67, 0.7, 0.944, 1.0],
    [0, 1, 1, 1]
  );
  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.667, 0.668, 1.0],
    [-1, -1, 10, 10]
  );

  // Circle rotations (like Hero component)
  const circle1_rotate = useTransform(
    scrollYProgress,
    [0.676, 0.73],
    [0, -180]
  ); // Love - Top
  const circle2_rotate = useTransform(scrollYProgress, [0.676, 0.73], [0, 90]); // Skill - Left
  const circle3_rotate = useTransform(scrollYProgress, [0.676, 0.73], [90, 0]); // Paid - Bottom
  const circle4_rotate = useTransform(scrollYProgress, [0.676, 0.73], [0, -90]); // World - Right

  const subText_opacity = useTransform(scrollYProgress, [0.7, 0.75], [0, 1]); // World - Right
  const subText_y = useTransform(scrollYProgress, [0.7, 0.75], [30, 0]);

  // Text opacity animations - appear sequentially
  const text1_opacity = useTransform(scrollYProgress, [0.67, 0.69], [0, 1]); // "ถ้าเจ้าหาจุด..."
  const text2_opacity = useTransform(scrollYProgress, [0.73, 0.75], [0, 1]); // Description set 1
  const text3_opacity = useTransform(scrollYProgress, [0.76, 0.78], [0, 1]); // Description set 2
  const text4_opacity = useTransform(scrollYProgress, [0.79, 0.81], [0, 1]); // Description set 3
  const text5_opacity = useTransform(scrollYProgress, [0.82, 0.84], [0, 1]); // Description set 4
  const text6_opacity = useTransform(scrollYProgress, [0.85, 0.87], [0, 1]); // "แต่เจ้าไม่ต้องกังวล..."
  const text7_opacity = useTransform(scrollYProgress, [0.88, 0.9], [0, 1]); // "ไม่ใช่เรื่องแปลก"
  const text8_opacity = useTransform(scrollYProgress, [0.91, 0.93], [0, 1]); // "เจ้าอยากจะลองไปตามหา..."

  // Container top position control:
  // 0.667-0.8: sticky top-0 with y offset
  // 0.8+: release to relative (shows bottom)
  const top = useTransform(
    scrollYProgress,
    [0.667, 0.75, 0.8, 0.85, 1],
    isPortrait
      ? ["-10vh", "-10vh", "-40vh", "-50vh", "-100vh"]
      : ["-10vh", "-10vh", "-80vh", "-90vh", "-100vh"]
  );

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
          opacity: [0.35, 1, 0.35, 1, 0.35],
        },
        transition: {
          duration: 4.2,
          times: [0, 0.28, 0.4, 0.6, 1],
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      };
      return acc;
    },
    {} as ItemAnimationOverride
  );

  return (
    <motion.div className="sticky pointer-events-none" style={{ top: top }}>
      <motion.div
        className="flex items-center justify-center pointer-events-none"
        style={{
          opacity,
          zIndex,
        }}
      >
        <div
          className={`relative pointer-events-auto flex flex-col w-screen items-center justify-between  bg-black  ${
            isPortrait
              ? "aspect-1080/4320 px-[20px] md:py-[200px] pt-[200px]"
              : "aspect-1920/2160 px-[80px] py-[100px] gap-[100px] 2xl:gap-5"
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
              items={sceneItems}
              animations={sceneAnimations as AnimationMap}
              baseStyle={{}}
              containerAspectRatio="1920 / 2160"
              itemOverrides={itemOverrides}
            />
          </div>

          {/* SECTION 1: Description with Circle Ikigai */}
          <div
            className={` flex flex-col items-center ${
              isPortrait
                ? " justify-center gap-[] md:gap-[100px]"
                : " gap-[30px] self-stretch"
            }`}
          >
            <motion.div
              className="typo-text-h4 text-center text-slate-100"
              style={{ opacity: text1_opacity }}
            >
              <MysteriousText
                text={
                  isPortrait
                    ? `ถ้าเจ้าหาจุดที่ทั้งสี่สายมาบรรจบกันได้… \n จะเกิดเป็น`
                    : `ถ้าเจ้าหาจุดที่ทั้งสี่สายมาบรรจบกันได้… จะเกิดเป็น`
                }
                scrollYProgress={scrollYProgress}
                startProgress={0.667}
                endProgress={0.7}
              />
            </motion.div>

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
                      startProgress={0.7}
                      endProgress={0.73}
                    />
                  </div>
                  <div className="text-white relative">
                    <MysteriousText
                      text={`หน้าที่\n(Mission)`}
                      scrollYProgress={scrollYProgress}
                      startProgress={0.7}
                      endProgress={0.73}
                    />
                  </div>
                </div>
                <div className="typo-text-h5 text-center flex justify-between w-full">
                  <div className="text-white relative">
                    <MysteriousText
                      text={`ทักษะวิชาชีพ\n(Vocation)`}
                      scrollYProgress={scrollYProgress}
                      startProgress={0.7}
                      endProgress={0.73}
                    />
                  </div>
                  <div className="text-white relative">
                    <MysteriousText
                      text={`อาชีพ\n(Profession)`}
                      scrollYProgress={scrollYProgress}
                      startProgress={0.7}
                      endProgress={0.73}
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Long description text */}
            <div className="typo-text-h4 text-center text-slate-100 w-full">
              <motion.div className="mb-0" style={{ opacity: text2_opacity }}>
                <MysteriousText
                  text={
                    isPortrait
                      ? `พื้นที่ของ "ความหมาย" ในชีวิต \n และงานของแต่ละบุคคล`
                      : `พื้นที่ของ "ความหมาย" ในชีวิตและงานของแต่ละบุคคล`
                  }
                  scrollYProgress={scrollYProgress}
                  startProgress={0.7}
                  endProgress={0.8}
                />
              </motion.div>
              <motion.div className="mb-0" style={{ opacity: text3_opacity }}>
                <MysteriousText
                  text={
                    isPortrait
                      ? `ใช้เพื่อเตรียมความพร้อมและส่งเสริม\nการปรับตัวเข้าสู่สังคมการทำงาน`
                      : `ใช้เพื่อเตรียมความพร้อมและส่งเสริมการปรับตัวเข้าสู่สังคมการทำงาน`
                  }
                  scrollYProgress={scrollYProgress}
                  startProgress={0.7}
                  endProgress={0.8}
                />
              </motion.div>
              <motion.div className="mb-0" style={{ opacity: text4_opacity }}>
                <MysteriousText
                  text={`หากได้ศึกษาหรือเข้าใจอิคิไก\nก่อนที่จะเลือกเรียน/เลือกประกอบอาชีพ`}
                  scrollYProgress={scrollYProgress}
                  startProgress={0.7}
                  endProgress={0.8}
                />
              </motion.div>
              <motion.div style={{ opacity: text5_opacity }}>
                <MysteriousText
                  text={
                    isPortrait
                      ? `ก็จะมีประโยชน์มากยิ่งขึ้น\nและอาจพาเจ้า ออกจาก\nความมัวมืดในคืนนี้ได้`
                      : `ก็จะมีประโยชน์มากยิ่งขึ้น\nและอาจพาเจ้าออกจากความมัวมืดในคืนนี้ได้`
                  }
                  scrollYProgress={scrollYProgress}
                  startProgress={0.7}
                  endProgress={0.8}
                />
              </motion.div>
            </div>
          </div>

          {/* SECTION 2: Submit Cat with Text */}
          <div
            className={`flex items-center w-full h-full ${
              isPortrait
                ? "flex-col-reverse justify-start gap-[0px] md:gap-[200px] "
                : " justify-between  flex-1"
            }`}
          >
            {/* Cat Frame */}
            <div
              className={`relative flex items-center align-stretch ${
                isPortrait
                  ? "h-[80%] md:h-[18.17%] w-[77.03%]"
                  : "flex-1 w-full h-full"
              }`}
            >
              {/* Tail Animation */}
              <div
                className="absolute"
                style={{
                  width: "38.19%",
                  height: "38.22%",
                  right: "10%",
                  top: "17.42%",
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
                className="absolute"
                style={{
                  width: isPortrait ? "57.23%" : "58.73%",
                  height: "66.04%",
                  left: isPortrait ? "10.81%" : "11.10%",
                  top: "16.69%",
                }}
              >
                <Lottie
                  animationData={catAnimationData}
                  loop={true}
                  className="w-full h-full"
                />
              </div>

              {/* Cloud 2 - Bottom */}

              <div
                className="absolute"
                style={{
                  width: "99.33%",
                  height: "24.86%",
                  right: "-10.43%",
                  bottom: "10.98%",
                }}
              >
                <Image
                  src="/assets/Scene/Scene5/scene5-04/Cloud2.svg"
                  alt="cloud"
                  fill
                  className=" object-contain"
                />
              </div>
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
                <motion.div className="mb-0" style={{ opacity: text6_opacity }}>
                  <MysteriousText
                    text={
                      isPortrait
                        ? `แต่เจ้าไม่ต้องกังวลไป\nการที่เจ้ายังไม่ค้นพบตัวเองตอนนี้`
                        : `แต่เจ้าไม่ต้องกังวลไปการที่เจ้ายัง \nไม่ค้นพบตัวเองตอนนี้`
                    }
                    scrollYProgress={scrollYProgress}
                    startProgress={0.667}
                    endProgress={1}
                  />
                </motion.div>
                <motion.div style={{ opacity: text7_opacity }}>
                  <MysteriousText
                    text={`ไม่ใช่เรื่องที่แปลกประหลาด`}
                    scrollYProgress={scrollYProgress}
                    startProgress={0.667}
                    endProgress={1}
                  />
                </motion.div>
              </div>{" "}
              {/* CTA Section */}
              <div className="flex flex-col items-center justify-between w-full gap-[60px]">
                <motion.div
                  className="typo-text-h4 text-center text-slate-100 w-full"
                  style={{ opacity: text8_opacity }}
                >
                  <div className="mb-0">
                    <MysteriousText
                      text={`เจ้าอยากจะลองไปตามหาอิคิไก`}
                      scrollYProgress={scrollYProgress}
                      startProgress={0.667}
                      endProgress={1}
                    />
                  </div>
                  <div>
                    <MysteriousText
                      text={`ของเจ้าดูบ้างไหมล่ะ`}
                      scrollYProgress={scrollYProgress}
                      startProgress={0.667}
                      endProgress={1}
                    />
                  </div>
                </motion.div>

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
    </motion.div>
  );
}
