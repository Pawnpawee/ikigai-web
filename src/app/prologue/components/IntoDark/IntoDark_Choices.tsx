"use client";
import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import ChoiceButton from "@/app/components/ui/ChoiceButton";

const REASONS = [
  { id: 1, text: "เครียดเรื่องเรียน" },
  { id: 2, text: "กลัวว่าตนเองจะไม่เก่งพอ" },
  { id: 3, text: "กลัวจะไม่มีที่ทำงาน" },
  { id: 4, text: "กลัวว่าทักษะตัวเองจะไม่เก่งพอสำหรับการทำงาน" },
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
  // Main container opacity and z-index - ปรับให้ตรงกับ 600vh (0.1-0.7)
  const opacity = useTransform(
    scrollYProgress,
    [0.1, 0.12, 0.5, 0.69, 0.7],
    [0, 1, 1, 1, 0]
  );
  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.12, 0.68, 0.7],
    [-1, 10, 10, -1]
  );

  // Background gradients - Layer 1 (earliest)
  const bgGradient1Y = useTransform(scrollYProgress, [0.12, 0.18], [50, 0]);
  const bgGradient1Opacity = useTransform(
    scrollYProgress,
    [0.12, 0.18],
    [0, 1]
  );

  // Stars - Layer 2
  const starsY = useTransform(scrollYProgress, [0.15, 0.22], [50, 0]);
  const starsOpacity = useTransform(scrollYProgress, [0.15, 0.22], [0, 1]);

  // Background gradient 2 - Layer 3
  const bgGradient2Y = useTransform(scrollYProgress, [0.18, 0.25], [50, 0]);
  const bgGradient2Opacity = useTransform(
    scrollYProgress,
    [0.18, 0.25],
    [0, 1]
  );

  // Cat (main character) - Layer 4
  const catY = useTransform(scrollYProgress, [0.2, 0.3], [100, 0]);
  const catOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const catScale = useTransform(scrollYProgress, [0.2, 0.25, 0.3], [0.9, 1, 1]);

  // Star lines - Layer 5
  const starLinesY = useTransform(scrollYProgress, [0.25, 0.35], [50, 0]);
  const starLinesOpacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);

  // Text content - Layer 6
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.38], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.3, 0.38], [30, 0]);

  // Choice buttons - Layer 7 (latest)
  const choicesOpacity = useTransform(scrollYProgress, [0.35, 0.42], [0, 1]);
  const choicesY = useTransform(scrollYProgress, [0.35, 0.42], [30, 0]);

  // Additional text sections
  const text2Opacity = useTransform(scrollYProgress, [0.45, 0.5], [0, 1]);
  const text3Opacity = useTransform(scrollYProgress, [0.5, 0.55], [0, 1]);
  const text4Opacity = useTransform(scrollYProgress, [0.55, 0.6], [0, 1]);
  const text5Opacity = useTransform(scrollYProgress, [0.6, 0.65], [0, 1]);

  return (
    <div className="sticky top-0 w-full overflow-y-auto pointer-events-none">
      <motion.div
        className="flex items-center justify-center bg-black min-h-screen  pointer-events-none"
        style={{ opacity, zIndex }}
      >
        <div
          className="relative w-full pointer-events-auto overflow-hidden"
          style={{
            aspectRatio: "1920 / 2160",
          }}
        >
          {/* Background Gradient 1 - Bottom */}
          <motion.div
            className="absolute "
            style={{
              left: "0%",
              bottom: "-84.81%",
              width: "100%",
              height: "191.65%",
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
              left: "35.95%",
              top: "21.66%",
              width: "28.1%",
              height: "23.13%",
              y: catY,
              opacity: catOpacity,
              scale: catScale,
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-02/Light Cat.svg"
              alt="Light Cat"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Background Gradient 2 - Top Right */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              left: "33.08%",
              top: "2.17%",
              width: "67.43%",
              height: "59.93%",
              y: bgGradient2Y,
              opacity: bgGradient2Opacity,
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-02/bggradient2.svg"
              alt="Background gradient 2"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Main Cat */}
          <motion.div
            className="absolute"
            style={{
              left: "36.34%",
              top: "22.37%",
              width: "27.28%",
              height: "63.81%",
              y: catY,
              opacity: catOpacity,
              scale: catScale,
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-02/cat.svg"
              alt="Cat"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Cat Face */}
          <motion.div
            className="absolute"
            style={{
              left: "38.33%",
              top: "31.93%",
              width: "23.06%",
              height: "4.29%",
              y: catY,
              opacity: catOpacity,
              scale: catScale,
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-02/cat face.svg"
              alt="Cat face"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Star Line 2 - Right */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              left: "21.45%",
              top: "46.6%",
              width: "9.61%",
              height: "6.28%",
              y: starLinesY,
              opacity: starLinesOpacity,
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-02/Star line2.svg"
              alt="Star line 2"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Star Line 1 - Left */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              left: "69.61%",
              top: "51.96%",
              width: "16.47%",
              height: "20.25%",
              y: starLinesY,
              opacity: starLinesOpacity,
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-02/Star line1.svg"
              alt="Star line 1"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Little Star 3 - Top Left */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              left: "5.49%",
              top: "35.13%",
              width: "81.77%",
              height: "51.75%",
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

          {/* Little Star 2 - Top Center */}
          <motion.div
            className="absolute"
            style={{
              left: "21.45%",
              top: "24.55%",
              width: "52.14%",
              height: "65.49%",
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

          {/* Little Star 1 - Very Top */}
          <motion.div
            className="absolute"
            style={{
              left: "8.5%",
              top: "13.34%",
              width: "81.75%",
              height: "80.85%",
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
              left: "-11.34%",
              top: "-53.42%",
              width: "111.92%",
              height: "111.01%",
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

          {/* Text Content */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 text-center"
            style={{
              top: "6.2%",
              y: textY,
              opacity: textOpacity,
            }}
          >
            <div className="flex flex-col items-center gap-4">
              <p className="typo-text-h3 text-white">
                {`ยินดีที่ได้รู้จัก ${
                  playerName || "(ชื่อผู้เล่น)"
                } มีหลายชีวิตเหลือเกินที่หลงเข้ามาในที่นี้
เจ้าตกลงมาที่นี่เพราะเหตุใดละ`}
              </p>
              <p className="typo-text-h5 text-white">(ตอบอย่างน้อย 3 ข้อ)</p>
            </div>
          </motion.div>

          {/* Choice Buttons */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 pointer-events-auto"
            style={{
              top: "19.81%",
              width: "89.48%",
              y: choicesY,
              opacity: choicesOpacity,
            }}
          >
            <div className="flex justify-between items-start pointer-events-auto">
              {/* Left Column */}
              <div className="flex flex-col gap-[100px] items-center">
                <ChoiceButton
                  text={REASONS[0].text}
                  isSelected={selectedReasons.includes(REASONS[0].id)}
                  onClick={() => handleReasonToggle(REASONS[0].id)}
                  className="max-w-[540px]"
                />
                <ChoiceButton
                  text={REASONS[2].text}
                  isSelected={selectedReasons.includes(REASONS[2].id)}
                  onClick={() => handleReasonToggle(REASONS[2].id)}
                  className="max-w-[540px]"
                />
                <ChoiceButton
                  text={REASONS[5].text}
                  isSelected={selectedReasons.includes(REASONS[5].id)}
                  onClick={() => handleReasonToggle(REASONS[5].id)}
                  className="max-w-[540px]"
                />
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-[100px] items-center">
                <ChoiceButton
                  text={REASONS[1].text}
                  isSelected={selectedReasons.includes(REASONS[1].id)}
                  onClick={() => handleReasonToggle(REASONS[1].id)}
                  className="max-w-[540px]"
                />
                <ChoiceButton
                  text={REASONS[4].text}
                  isSelected={selectedReasons.includes(REASONS[4].id)}
                  onClick={() => handleReasonToggle(REASONS[4].id)}
                  className="max-w-[540px]"
                />
                <ChoiceButton
                  text={REASONS[3].text}
                  isSelected={selectedReasons.includes(REASONS[3].id)}
                  onClick={() => handleReasonToggle(REASONS[3].id)}
                  className="max-w-[540px]"
                />
              </div>
            </div>
          </motion.div>

          {/* Additional Text Sections - Appearing Later */}
          <motion.div
            className="absolute left-1/10 text-center"
            style={{
              top: "64.4%",
              opacity: text2Opacity,
            }}
          >
            <p className="typo-text-h3 text-white whitespace-pre-line">
              {`โอ้… ถูกครอบงำจาก
ความกังวลสินะ`}
            </p>
          </motion.div>

          <motion.div
            className="absolute left-1/20 text-center"
            style={{
              top: "78.19%",
              opacity: text3Opacity,
            }}
          >
            <p className="typo-text-h3 text-white whitespace-pre-line">
              {`ข้าเห็นหลายคนที่ตกลงมาที่นี่ก็
เพราะเช่นนี้แหละ`}
            </p>
          </motion.div>

          <motion.div
            className="absolute right-1/12 text-center"
            style={{
              top: "78.06%",
              opacity: text4Opacity,
            }}
          >
            <p className="typo-text-h3 text-white whitespace-pre-line">
              {`ในโลกนี้มีเส้นทางทั้งสี่
ที่ร้อยเรียงชีวิตไว้ด้วยกัน`}
            </p>
          </motion.div>

          <motion.div
            className="absolute left-1/2 -translate-x-1/2 text-center"
            style={{
              top: "92.5%",
              opacity: text5Opacity,
            }}
          >
            <p className="typo-text-h3 text-white">…เส้นทางทั้งสี่?</p>
          </motion.div>

          {/* Error Message */}
          {reasonsError && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 text-center"
              style={{
                top: "50%",
              }}
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
