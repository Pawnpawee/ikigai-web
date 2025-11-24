"use client";
import React, { useLayoutEffect, useState } from "react";
import {
  motion,
  useTransform,
  MotionValue,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import InputButton from "@/app/components/ui/InputButton";
import MysteriousText from "./MysteriousText";
import Lottie from "lottie-react";
import catAnimationData from "../../../../public/assets/Scene/Scene5/scene5-01/s5-1-cat.json";
import tailAnimationData from "../../../../public/assets/Scene/Scene5/scene5-01/s5-1-tail.json";
import starLine1AnimationData from "../../../../public/assets/Scene/Scene5/scene5-01/starline1.json";
import starLine2AnimationData from "../../../../public/assets/Scene/Scene5/scene5-01/starline2.json";
import starLine3AnimationData from "../../../../public/assets/Scene/Scene5/scene5-01/starline3.json";
import waterAnimationData from "../../../../public/assets/Scene/Scene5/scene5-01/s-5-1-water.json";
import { useIsPortrait } from "@/app/hooks/useOrientation";
import { HiCheck } from "react-icons/hi";

interface NameInputProps {
  scrollYProgress: MotionValue<number>;
  playerName: string;
  setPlayerName: (name: string) => void;
  nameError: string;
  onConfirm: () => void;
  isConfirmed: boolean;
}

export default function IntoDarkNameInput({
  scrollYProgress,
  playerName,
  setPlayerName,
  nameError,
  onConfirm,
  isConfirmed,
}: NameInputProps) {
  const isPortrait = useIsPortrait();

  // Position configurations for landscape (1920x1080) and portrait (1080x1920)
  const positions = {
    // Background gradient
    bgGradient: isPortrait
      ? { left: "-22.13%", top: "39.38%", width: "143.56%", height: "107.76%" } // Portrait: -239/1080, 756/1920, 1550.5/1080, 2069.88/1920
      : { left: "-10.75%", top: "-6.84%", width: "80.76%", height: "191.66%" }, // Landscape: -206.396/1920, -73.892/1080, 1550.5/1920, 2069.88/1080

    // Star line 3
    starLine3: isPortrait
      ? { left: "42.02%", top: "52.63%", width: "18.79%", height: "10.88%" } // Portrait: 453.81/1080, 1010.48/1920, 202.99/1080, 209/1920
      : { left: "25.33%", top: "16.72%", width: "10.57%", height: "19.35%" }, // Landscape: 486.414/1920, 180.587/1080, 202.99/1920, 209/1080

    // Star line 2
    starLine2: isPortrait
      ? { left: "14.45%", top: "64.48%", width: "11.57%", height: "10.55%" } // Portrait: 156.04/1080, 1238.08/1920, 124.91/1080, 202.62/1920
      : { left: "9.83%", top: "37.79%", width: "6.51%", height: "18.76%" }, // Landscape: 188.644/1920, 408.188/1080, 124.91/1920, 202.62/1080

    // Star line 1
    starLine1: isPortrait
      ? { left: "74.22%", top: "70.00%", width: "10.46%", height: "4.77%" } // Portrait: 801.56/1080, 1344.10/1920, 112.97/1080, 91.68/1920
      : { left: "43.45%", top: "47.61%", width: "5.88%", height: "8.49%" }, // Landscape: 834.163/1920, 514.208/1080, 112.97/1920, 91.68/1080

    // Little star 3
    littleStar3: isPortrait
      ? { left: "17.03%", top: "48.21%", width: "63.88%", height: "41.39%" } // Portrait: 183.95/1080, 925.56/1920, 689.95/1080, 794.79/1920
      : { left: "11.28%", top: "8.86%", width: "35.94%", height: "73.59%" }, // Landscape: 216.554/1920, 95.668/1080, 689.95/1920, 794.79/1080

    // Little star 2
    littleStar2: isPortrait
      ? { left: "12.26%", top: "50.75%", width: "71.80%", height: "32.73%" } // Portrait: 132.45/1080, 974.40/1920, 775.35/1080, 628.47/1920
      : { left: "8.59%", top: "13.38%", width: "40.38%", height: "58.19%" }, // Landscape: 165.054/1920, 144.508/1080, 775.35/1920, 628.47/1080

    // Little star 1
    littleStar1: isPortrait
      ? { left: "2.52%", top: "45.21%", width: "105.46%", height: "52.16%" } // Portrait: 27.16/1080, 868.05/1920, 1138.8/1080, 1001.56/1920
      : { left: "3.11%", top: "3.53%", width: "59.31%", height: "92.74%" }, // Landscape: 59.764/1920, 38.158/1080, 1138.8/1920, 1001.56/1080

    // Water
    water: isPortrait
      ? { left: "4.80%", top: "82.90%", width: "117.29%", height: "14.64%" } // Portrait: 51.88/1080, 1591.60/1920, 1266.72/1080, 281.04/1920
      : { left: "4.40%", top: "70.53%", width: "65.98%", height: "26.02%" }, // Landscape: 84.484/1920, 761.708/1080, 1266.72/1920, 281.04/1080

    // Light cat (glow)
    lightCat: isPortrait
      ? { left: "26.07%", top: "63.77%", width: "49.05%", height: "27.59%" } // Portrait: 281.54/1080, 1224.38/1920, 529.74/1080, 529.74/1920
      : { left: "16.38%", top: "36.52%", width: "27.59%", height: "49.05%" }, // Landscape: 314.544/1920, 394.378/1080, 529.74/1920, 529.74/1080

    // Cat
    cat: isPortrait
      ? { left: "23.06%", top: "55.47%", width: "52.04%", height: "35.89%" } // Portrait: 249.04/1080, 1065.02/1920, 562.24/1080, 689.10/1920
      : { left: "16.04%", top: "33.50%", width: "27.60%", height: "49.07%" }, // Landscape: 308/1920, 388/1080, 530/1920, 530/1080

    // Tail
    tail: isPortrait
      ? { left: "22.31%", top: "51.20%", width: "27.78%", height: "15.63%" } // Portrait: 241/1080, 983/1920, 300/1080, 300/1920
      : { left: "14.27%", top: "14.17%", width: "16.67%", height: "27.78%" }, // Landscape: 274/1920, 153/1080, 320/1920, 300/1080

    // Text Container
    textContainer: isPortrait
      ? { left: "5.93%", top: "0%", width: "88.15%", height: "47.08%" } // Portrait: 64/1080, 0/1920, 952/1080, 904/1920
      : { left: "60.42%", top: "35.93%", width: "36.25%", height: "28.15%" }, // Landscape: 1160/1920, 388/1080, 696/1920, 304/1080
  };

  // Total height: 300vh (0-0.167 ของ 1800vh รวม)
  // ชุด 1: 0-25vh (0-0.014) - bg gradient + little star 2
  // ชุด 2: 25-50vh (0.014-0.028) - star line 2 + little star 3
  // ชุด 3: 50-75vh (0.028-0.042) - star line 1
  // ชุด 4: 75-175vh (0.042-0.097) - star line 3 + little star 1 + cat
  // ชุด 5: 175-225vh (0.097-0.125) - ข้อความ + water - 50vh
  // ชุด 6: 225-275vh (0.125-0.153) - input box - 50vh
  // Fade out: 275-300vh (0.153-0.167) - 25vh

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.006, 0.153, 0.167],
    [0, 1, 1, 0],
  );
  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.006, 0.166, 0.167],
    [10, 10, 10, -1],
  );

  // ชุด 1: Background Gradient + Little star 2 (0-25vh = 0-0.014)
  const bgOpacity = useTransform(scrollYProgress, [0, 0.006, 0.014], [0, 1, 1]);

  // ชุด 2: Star line 2 + Little star 3 (25-50vh = 0.014-0.028) - รอชุด 1 opacity = 1
  const set2Opacity = useTransform(
    scrollYProgress,
    [0.014, 0.021, 0.028],
    [0, 1, 1],
  );

  // ชุด 3: Star line 1 (50-75vh = 0.028-0.042) - รอชุด 2 opacity = 1
  const set3Opacity = useTransform(
    scrollYProgress,
    [0.028, 0.035, 0.042],
    [0, 1, 1],
  );

  // ชุด 4: Star line 3 + Little star 1 + Cat (75-175vh = 0.042-0.097) - รอชุด 3 opacity = 1
  const set4Opacity = useTransform(
    scrollYProgress,
    [0.042, 0.049, 0.097],
    [0, 1, 1],
  );

  // Cat floating down animation
  const catY = useTransform(
    scrollYProgress,
    [0.042, 0.103, 0.125],
    [-100, 10, 0],
  );

  // ชุด 5: ข้อความ + Water (175-225vh = 0.097-0.125) - 50vh - รอชุด 4 opacity = 1
  const textOpacity = useTransform(
    scrollYProgress,
    [0.097, 0.111, 0.125],
    [0, 1, 1],
  );

  // Water bounce animation (scale) - ย้ายมาชุด 5
  const waterScale = useTransform(
    scrollYProgress,
    [0.097, 0.103, 0.111, 0.118, 0.125],
    [0, 1.3, 0.9, 1.1, 1],
  );

  // ชุด 6: Input box (225-275vh = 0.125-0.153) - 50vh - รอชุด 5 opacity = 1
  const inputOpacity = useTransform(
    scrollYProgress,
    [0.125, 0.139, 0.153],
    [0, 1, 1],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && playerName.trim() && !isConfirmed) {
      onConfirm();
    }
  };

  return (
    <motion.div
      className="fixed top-0 h-screen w-screen bg-black"
      style={{ opacity, zIndex }}
    >
      <motion.div className="relative flex aspect-video portrait:aspect-9/16 px-16 portrait:px-15 justify-end items-center w-[85%] h-screen mx-auto">
        {/* Background Elements Container */}
        <div className="absolute inset-0 w-full h-full">
          {/* 1. ชุด 1: Background Gradient (bggradient) */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              ...positions.bgGradient,
              opacity: bgOpacity,
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-01/bggradient.svg"
              alt="Background gradient"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* 2. ชุด 4: Star line 3 (Lottie) */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              ...positions.starLine3,
              opacity: set4Opacity,
            }}
          >
            <Lottie
              animationData={starLine3AnimationData}
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>

          {/* 3. ชุด 2: Star line 2 (Lottie) */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              ...positions.starLine2,
              opacity: set2Opacity,
            }}
          >
            <Lottie
              animationData={starLine2AnimationData}
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>

          {/* 4. ชุด 3: Star line 1 (Lottie) */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              ...positions.starLine1,
              opacity: set3Opacity,
            }}
          >
            <Lottie
              animationData={starLine1AnimationData}
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>

          {/* 5. ชุด 2: Little Star 3 */}
          <motion.div
            className="absolute"
            style={{
              ...positions.littleStar3,
              opacity: set2Opacity,
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-01/Little star3.svg"
              alt="Little star 3"
              fill
              className="object-contain animate-pulse"
              style={{ animationDuration: "2.5s" }}
            />
          </motion.div>

          {/* 6. ชุด 1: Little Star 2 */}
          <motion.div
            className="absolute"
            style={{
              ...positions.littleStar2,
              opacity: bgOpacity,
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-01/Little star2.svg"
              alt="Little star 2"
              fill
              className="object-contain animate-pulse"
              style={{ animationDuration: "4s" }}
            />
          </motion.div>

          {/* 7. ชุด 4: Little Star 1 */}
          <motion.div
            className="absolute"
            style={{
              ...positions.littleStar1,
              opacity: set4Opacity,
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-01/Little star1.svg"
              alt="Little star 1"
              fill
              className="object-contain animate-pulse"
              style={{ animationDuration: "3s" }}
              priority
            />
          </motion.div>

          {/* 8. ชุด 5: Water */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              ...positions.water,
              opacity: textOpacity,
              scale: waterScale,
            }}
          >
            <Lottie
              animationData={waterAnimationData}
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>

          {/* 9. Light Cat (glow effect) */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              ...positions.lightCat,
              opacity: set4Opacity,
              y: catY,
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-01/Light cat.svg"
              alt="Light cat"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* 11. ชุด 4: Cat Tail (Lottie) */}
          <motion.div
            className="absolute"
            style={{
              ...positions.tail,
              opacity: set4Opacity,
              y: catY,
            }}
          >
            <Lottie
              animationData={tailAnimationData}
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>

          {/* 10. ชุด 4: Main Cat (Lottie) */}
          <motion.div
            className="absolute"
            style={{
              ...positions.cat,
              opacity: set4Opacity,
              y: catY,
            }}
          >
            <Lottie
              animationData={catAnimationData}
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>
        </div>

        {/* Text and Input */}
        <div
          style={
            isPortrait
              ? {
                  paddingTop: "50%",
                  paddingBottom: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "3rem",
                  alignSelf: "stretch",
                  width: "100%",
                }
              : {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "5rem", // 80px
                }
          }
        >
          {/* ชุด 5: Main heading text - ขึ้นทีละตัวอักษรแบบลึกลับ */}
          <motion.div className="text-center" style={{ opacity: textOpacity }}>
            <div
              className={`text-white select-none leading-normal tracking-[0.72px] typo-text-h3`}
            >
              <MysteriousText
                text="สวัสดี... ข้าคือผู้นำทางแห่งความมืด"
                scrollYProgress={scrollYProgress}
                startProgress={0.097}
                endProgress={0.111}
              />
              <br />
              <MysteriousText
                text="เจ้าชื่ออะไร"
                scrollYProgress={scrollYProgress}
                startProgress={0.111}
                endProgress={0.125}
              />
            </div>
          </motion.div>

          <motion.div
            className="flex items-start gap-5"
            style={{ opacity: inputOpacity, zIndex }}
          >
            <div className="flex flex-col items-center">
              {/* ⭐ Wrap InputButton เพื่อดักจับ onKeyDown */}
              <motion.div onKeyDown={handleKeyDown}>
                <InputButton
                  value={playerName}
                  onChange={setPlayerName}
                  placeholder="พิมพ์ข้อความ..."
                />
              </motion.div>
              {/* Error message */}
              {nameError && (
                <motion.p
                  className="typo-p-md text-red-500 mt-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {nameError}
                </motion.p>
              )}
            </div>
            <AnimatePresence>
              {!isConfirmed && (
                <motion.button
                  initial={{ opacity: 0, y: 10, scale: 0 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeIn",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onConfirm}
                  className="h-full p-4 border border-white/30 bg-white/10 rounded-full text-white hover:bg-white/20 backdrop-blur-sm transition-all flex items-center cursor-pointer typo-h3 origin-center"
                >
                  <HiCheck />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
