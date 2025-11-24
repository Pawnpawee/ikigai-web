"use client";
import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import Lottie from "lottie-react";
import ChoiceButton from "@/app/components/ui/ChoiceButton";
import MysteriousText from "./MysteriousText";
import { useIsPortrait } from "@/app/hooks/useOrientation";
import catAnimationData from "../../../../public/assets/Scene/Scene5/scene5-02/s-5-2-cat.json";
import tailAnimationData from "../../../../public/assets/Scene/Scene5/scene5-02/s5-2-tail.json";
import starLine1AnimationData from "../../../../public/assets/Scene/Scene5/scene5-02/starline3.json";
import starLine2AnimationData from "../../../../public/assets/Scene/Scene5/scene5-02/starline1.json";

const REASONS = [
  { id: 1, text: "เครียดเรื่องเรียน" },
  { id: 2, text: "กลัวว่าตนเองจะไม่เก่งพอ" },
  { id: 3, text: "กลัวจะไม่มีที่ทำงาน" },
  { id: 4, text: "กลัวว่าทักษะตัวเองจะดีไม่พอ สำหรับการทำงาน" },
  { id: 5, text: "กลัวไม่มีรายได้ต่อเนื่อง" },
  { id: 6, text: "กลัวจะเข้ากับคนอื่นไม่ได้" },
];

interface ChoicesProps {
  scrollYProgress: MotionValue<number>;
  playerName: string;
  selectedReasons: number[];
  handleReasonToggle: (id: number) => void;
  reasonsError: string;
}

export default function IntoDarkChoices({
  scrollYProgress,
  playerName,
  selectedReasons,
  handleReasonToggle,
  reasonsError,
}: ChoicesProps) {
  const isPortrait = useIsPortrait();

  // Position configurations for landscape (1920x2160) and portrait (360x1920)
  // Portrait based on Figma node 497:3275
  const positions = {
    // Background Gradient 1 - Bottom gradient (node-id: 497:3276)
    bgGradient1: isPortrait
      ? {
          bottom: 0,
          width: "177.77%",
          height: "19.63%",
        }
      : { bottom: 0, left: "0", right: "0", height: "39.28%" },

    // Background Gradient 2 - Top right gradient with screen blend (node-id: 497:3277)
    // Portrait: inset: 49.81% -98.83% 35.21% 78.96%
    bgGradient2: isPortrait
      ? { inset: "49.81% -98.83% 35.21% 78.96%" }
      : { inset: "2.17% -0.51% 37.9% 33.08%" },

    // Light Cat - Glow effect with screen blend (node-id: 497:3278)
    // Portrait: inset: 49.81% 17.87% 35.21% 17.5%
    lightCat: isPortrait
      ? { inset: "49.81% 17.87% 35.21% 17.5%" }
      : { inset: "42.72% 35.95% 34.14% 35.95%" },

    // Tail (node-id: 497:3279)
    tail: isPortrait
      ? {
          left: "18.52%",
          bottom: "21.65%",
          width: "57.5%",
          height: "14.375%",
        }
      : { left: "36.41%", top: "65.28%", width: "25%", height: "22.22%" },

    // Cat (main character) (node-id: 497:3289)
    // Portrait: inset: 36.63% 18.87% 36.21% 18.35%
    cat: isPortrait
      ? { inset: "36.63% 18.87% 36.21% 18.35%" }
      : { inset: "22.37% 36.38% 35.68% 36.34%" },

    // Star Line 2 - Left star decorations (node-id: 497:3333)
    // Portrait: inset: 52.32% 93.81% 43.62% -15.92%
    starLine2: isPortrait
      ? { inset: "52.32% 93.81% 43.62% -15.92%" }
      : { inset: "46.6% 68.94% 47.12% 21.45%" },

    // Star Line 1 - Right star decorations (node-id: 497:3337)
    // Portrait: inset: 55.79% -32.83% 31.1% 94.93%
    starLine1: isPortrait
      ? { inset: "55.79% -32.83% 31.1% 94.93%" }
      : { inset: "51.96% 13.92% 27.79% 69.61%" },

    // Little Star 3 - Background stars (node-id: 497:3345)
    // Portrait: inset: 44.89% -52.24% 21.61% -35.98%
    littleStar3: isPortrait
      ? { inset: "44.89% -52.24% 21.61% -35.98%" }
      : { inset: "35.13% 5.49% 13.12% 12.74%" },

    // Little Star 2 - Background stars (node-id: 497:3356)
    // Portrait: inset: 38.05% -4.1% 19.56% -15.92%
    littleStar2: isPortrait
      ? { inset: "38.05% -4.1% 19.56% -15.92%" }
      : { inset: "24.55% 26.41% 9.96% 21.45%" },

    // Little Star 1 - Background stars (node-id: 497:3360)
    // Portrait: inset: 30.79% -42.44% 16.88% -45.74%
    littleStar1: isPortrait
      ? { inset: "30.79% -42.44% 16.88% -45.74%" }
      : { inset: "13.34% 9.75% 5.81% 8.5%" },

    // Background Gradient 3 - Top left gradient group (node-id: 497:3455)
    // Portrait: inset: -26.53% -24.4% 78.61% -19.17%
    bgGradient3: isPortrait
      ? { inset: "-26.53% -24.4% 78.61% -19.17%" }
      : { inset: "-53.42% 30.58% 57.59% -11.34%" },

    // Background Gradient Extra - Inside gradient3 (node-id: 497:3456)
    // Portrait: inset: -8.58% -0.77% 78.61% -19.11%
    bgGradientExtra: isPortrait
      ? { inset: "-8.58% -0.77% 78.61% -19.11%" }
      : { inset: "-17.53% 43.87% 57.59% -11.3%" },
  };

  // Main container opacity and z-index - ปรับให้ตรงกับ 600vh (0.167-0.500)
  const opacity = useTransform(
    scrollYProgress,
    [0.167, 0.179, 0.389, 0.7, 0.8],
    [0, 1, 1, 1, 0],
  );
  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.168, 0.179, 0.493, 0.5],
    [-1, -1, 10, 10, -1],
  );

  // Background gradients - Layer 1 (earliest)
  const bgGradient1Y = useTransform(scrollYProgress, [0.179, 0.213], [50, 0]);
  const bgGradient1Opacity = useTransform(
    scrollYProgress,
    [0.179, 0.213],
    [0, 1],
  );

  // Stars - Layer 2
  const starsY = useTransform(scrollYProgress, [0.196, 0.237], [50, 0]);
  const starsOpacity = useTransform(scrollYProgress, [0.196, 0.237], [0, 1]);

  // Cat (main character) - Layer 4
  const catY = useTransform(scrollYProgress, [0.226, 0.282], [100, 0]);
  const catOpacity = useTransform(scrollYProgress, [0.226, 0.282], [0, 1]);
  const catScale = useTransform(
    scrollYProgress,
    [0.226, 0.254, 0.282],
    [0.9, 1, 1],
  );

  // Star lines - Layer 5
  const starLinesY = useTransform(scrollYProgress, [0.254, 0.31], [50, 0]);
  const starLinesOpacity = useTransform(scrollYProgress, [0.254, 0.31], [0, 1]);

  // Text content - Layer 6
  const textOpacity = useTransform(scrollYProgress, [0.282, 0.327], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.282, 0.327], [30, 0]);

  // Choice buttons - Layer 7 (latest)
  const choicesOpacity = useTransform(scrollYProgress, [0.31, 0.35], [0, 1]);
  const choicesY = useTransform(scrollYProgress, [0.31, 0.35], [30, 0]);

  // Additional text sections
  const text2Opacity = useTransform(scrollYProgress, [0.42, 0.44], [0, 1]);
  const text3Opacity = useTransform(scrollYProgress, [0.44, 0.46], [0, 1]);
  const text4Opacity = useTransform(scrollYProgress, [0.46, 0.48], [0, 1]);
  const text5Opacity = useTransform(scrollYProgress, [0.48, 0.5], [0, 1]);

  return (
    <div className="sticky top-0 w-full overflow-y-auto pointer-events-none">
      <motion.div
        className="flex items-center justify-center bg-black min-h-screen  pointer-events-none"
        style={{ opacity, zIndex }}
      >
        <div
          className={`relative w-full pointer-events-auto overflow-hidden ${
            isPortrait ? "aspect-1080/4320" : "aspect-1920/2160"
          }`}
        >
          {/* Background Gradient 1 - Bottom */}
          <motion.div
            className="absolute"
            style={{
              ...positions.bgGradient1,
              y: bgGradient1Y,
              opacity: bgGradient1Opacity,
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-02/bggradient1.svg"
              alt="Background gradient 1"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Light Cat - Glow Effect */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              ...positions.lightCat,
              y: catY,
              opacity: catOpacity,
              scale: catScale,
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-02/Light Cat.svg"
              alt="Light Cat"
              fill
              className="object-contain animate-pulse"
              style={{ animationDuration: "2s" }}
            />
          </motion.div>

          {/* Cat Tail (Lottie) */}
          <motion.div
            className="absolute"
            style={{
              ...positions.tail,
              y: catY,
              opacity: catOpacity,
              scale: catScale,
            }}
          >
            <Lottie
              animationData={tailAnimationData}
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>

          {/* Main Cat (Lottie) */}
          <motion.div
            className="absolute"
            style={{
              ...positions.cat,
              y: catY,
              opacity: catOpacity,
              scale: catScale,
            }}
          >
            <Lottie
              animationData={catAnimationData}
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>

          {/* Star Line 2 (Lottie) */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              ...positions.starLine2,
              y: starLinesY,
              opacity: starLinesOpacity,
            }}
          >
            <Lottie
              animationData={starLine2AnimationData}
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>

          {/* Star Line 1 (Lottie) */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              ...positions.starLine1,
              y: starLinesY,
              opacity: starLinesOpacity,
            }}
          >
            <Lottie
              animationData={starLine1AnimationData}
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>

          {/* Little Star 3 */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              ...positions.littleStar3,
              y: starsY,
              opacity: starsOpacity,
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-02/Little Star3.svg"
              alt="Little Star 3"
              fill
              className="object-contain animate-pulse"
              style={{ animationDuration: "3s" }}
            />
          </motion.div>

          {/* Little Star 2 */}
          <motion.div
            className="absolute"
            style={{
              ...positions.littleStar2,
              y: starsY,
              opacity: starsOpacity,
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-02/Little Star2.svg"
              alt="Little Star 2"
              fill
              className="object-contain animate-pulse"
              style={{ animationDuration: "4s" }}
            />
          </motion.div>

          {/* Little Star 1 */}
          <motion.div
            className="absolute"
            style={{
              ...positions.littleStar1,
              y: starsY,
              opacity: starsOpacity,
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-02/Little Star1.svg"
              alt="Little Star 1"
              fill
              className="object-contain animate-pulse"
              style={{ animationDuration: "2.5s" }}
            />
          </motion.div>

          {/* Background Gradient 3 - Top Left */}
          <motion.div
            className="absolute mix-blend-screen blur-[3px]"
            style={{
              ...positions.bgGradient3,
              y: bgGradient1Y,
              opacity: bgGradient1Opacity,
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-02/bggradient3.svg"
              alt="Background gradient 3"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Background Gradient Extra */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              ...positions.bgGradientExtra,
              y: bgGradient1Y,
              opacity: bgGradient1Opacity,
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-02/bggradient2.svg"
              alt="Background gradient"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Top Content - Welcome Section (node-id: 497:3458) */}
          <motion.div
            className="absolute flex flex-col items-start w-screen"
            style={{
              y: textY,
              opacity: textOpacity,
            }}
          >
            {/* Welcome box with padding (node-id: 497:3459) */}
            <div
              className={`flex flex-col items-center justify-center text-center text-white w-full gap-4 px-0 ${
                isPortrait
                  ? "pt-[100px] pb-[30px] lg:pt-[120px] lg:pb-[50px]"
                  : "py-[150px]"
              }`}
            >
              {/* Main welcome text (node-id: 497:3460) */}
              <div className="typo-text-h3 w-full">
                <div className="mb-0">
                  <MysteriousText
                    text="ยินดีที่ได้รู้จัก"
                    scrollYProgress={scrollYProgress}
                    startProgress={0.282}
                    endProgress={0.293}
                  />
                  {playerName ? <b> {playerName}</b> : " (ชื่อผู้เล่น)"}{" "}
                  <MysteriousText
                    text="มีหลายชีวิตเหลือเกินที่หลงเข้ามาในที่นี้"
                    scrollYProgress={scrollYProgress}
                    startProgress={0.293}
                    endProgress={0.305}
                  />
                </div>
                <div>
                  <MysteriousText
                    text="เจ้าตกลงมาที่นี่เพราะเหตุใดละ"
                    scrollYProgress={scrollYProgress}
                    startProgress={0.305}
                    endProgress={0.316}
                  />
                </div>
              </div>
              {/* Subtitle text (node-id: 497:3461) */}
              <div className="typo-text-h5 w-full">
                <p>(ตอบอย่างน้อย 3 ข้อ)</p>
              </div>
            </div>

            {/* Choice Buttons Section (node-id: 497:3462) */}
            <motion.div
              className={`flex px-[5%] w-screen ${
                isPortrait
                  ? "flex-col justify-center items-center gap-[15px] lg:gap-[50px] "
                  : "items-start justify-between"
              }`}
              style={{
                y: choicesY,
                opacity: choicesOpacity,
              }}
            >
              <div className="flex flex-col gap-[100px] portrait:gap-[15px] portrait:lg:gap-[50px]">
                {/* Choice button 1 (node-id: 478:910) */}
                <ChoiceButton
                  text={REASONS[0].text}
                  isSelected={selectedReasons.includes(REASONS[0].id)}
                  onClick={() => handleReasonToggle(REASONS[0].id)}
                />
                {/* Choice button 3 (node-id: 478:911) */}
                <ChoiceButton
                  text={REASONS[2].text}
                  isSelected={selectedReasons.includes(REASONS[2].id)}
                  onClick={() => handleReasonToggle(REASONS[2].id)}
                />
                {/* Choice button 6 (node-id: 478:912) */}
                <ChoiceButton
                  text={REASONS[5].text}
                  isSelected={selectedReasons.includes(REASONS[5].id)}
                  onClick={() => handleReasonToggle(REASONS[5].id)}
                />
              </div>
              <div className="flex flex-col gap-[100px] portrait:gap-[15px] portrait:lg:gap-[50px] items-center">
                {/* Choice button 2 (node-id: 478:907) */}
                <ChoiceButton
                  text={REASONS[1].text}
                  isSelected={selectedReasons.includes(REASONS[1].id)}
                  onClick={() => handleReasonToggle(REASONS[1].id)}
                />
                {/* Choice button 5 (node-id: 478:908) */}
                <ChoiceButton
                  text={REASONS[4].text}
                  isSelected={selectedReasons.includes(REASONS[4].id)}
                  onClick={() => handleReasonToggle(REASONS[4].id)}
                />
                {/* Choice button 4 (node-id: 478:909) */}
                <ChoiceButton
                  text={REASONS[3].text}
                  isSelected={selectedReasons.includes(REASONS[3].id)}
                  onClick={() => handleReasonToggle(REASONS[3].id)}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* End Content Container (node-id: 497:3447) */}
          <motion.div
            className={`absolute bottom-0 flex w-screen flex-col items-center justify-center ${
              isPortrait ? "gap-[100px] py-[20%]" : "gap-[150px] py-[8%]"
            }`}
          >
            {/* Text 2 - First message (node-id: 497:3448, 497:3449) */}
            <motion.div
              className="flex items-center justify-start portrait:justify-center self-stretch px-[11.98%]"
              style={{ opacity: text2Opacity }}
            >
              <div className="text-white text-center whitespace-pre-line typo-text-h4">
                <MysteriousText
                  text={`โอ้… ถูกครอบงำจาก\nความกังวลสินะ`}
                  scrollYProgress={scrollYProgress}
                  startProgress={0.372}
                  endProgress={0.387}
                />
              </div>
            </motion.div>

            {/* Text 3 & 4 Container (node-id: 497:3450) */}
            <div
              className={`flex text-white text-center typo-text-h4 ${
                isPortrait
                  ? "flex-col gap-[2.31%] w-screen"
                  : "justify-between items-center w-[84.74%]"
              }`}
            >
              {/* Text 3 (node-id: 497:3451) */}
              <motion.div style={{ opacity: text3Opacity }}>
                <div className="mb-0 whitespace-pre-line">
                  <MysteriousText
                    text={`ข้าเห็นหลายคนที่ตกลงมาที่นี่ก็\nเพราะเช่นนี้แหละ`}
                    scrollYProgress={scrollYProgress}
                    startProgress={0.387}
                    endProgress={0.402}
                  />
                </div>
              </motion.div>
              {/* Text 4 (node-id: 497:3452) */}
              <motion.div style={{ opacity: text4Opacity }}>
                <div className="mb-0 whitespace-pre-line">
                  <MysteriousText
                    text={`ในโลกนี้มีเส้นทางทั้งสี่\nที่ร้อยเรียงชีวิตไว้ด้วยกัน`}
                    scrollYProgress={scrollYProgress}
                    startProgress={0.402}
                    endProgress={0.417}
                  />
                </div>
              </motion.div>
            </div>

            {/* Text 5 - Final question (node-id: 497:3453, 497:3454) */}
            {/* Portrait: text-h3: 48px */}
            <motion.div
              className="flex items-center justify-center w-full"
              style={{ opacity: text5Opacity }}
            >
              <div className="typo-text-h4 text-white">
                <MysteriousText
                  text="…เส้นทางทั้งสี่?"
                  scrollYProgress={scrollYProgress}
                  startProgress={0.417}
                  endProgress={0.432}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Error Message */}
          {reasonsError && (
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-red-500 text-2xl font-bold bg-black/50 px-6 py-3 rounded-lg">
                {reasonsError}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
