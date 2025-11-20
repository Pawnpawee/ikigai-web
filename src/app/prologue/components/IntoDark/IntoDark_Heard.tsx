"use client";
import React, { useState } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import Lottie from "lottie-react";
import GradientButton from "@/app/components/ui/GradientButton";
import MysteriousText from "./MysteriousText";
import catAnimationData from "../../../../../public/assets/Scene/Scene5/scene5-03/s5-3-cat.json";
import tailAnimationData from "../../../../../public/assets/Scene/Scene5/scene5-01/s5-1-tail.json";
import starLine1AnimationData from "../../../../../public/assets/Scene/Scene5/scene5-01/starline1.json";
import { useIsPortrait } from "@/app/hooks/useOrientation";

interface HeardProps {
  scrollYProgress: MotionValue<number>;
  hasHeard: boolean | null;
  setHasHeard: (value: boolean) => void;
}

export default function IntoDarkHeard({
  scrollYProgress,
  hasHeard,
  setHasHeard,
}: HeardProps) {
  const isPortrait = useIsPortrait();

  // Position configurations for landscape (1920x1080) and portrait (1080x1920)
  const positions = {
    // Background gradient
    bgGradient: isPortrait
      ? { left: "-77.78%", top: "0%", width: "177.78%", height: "44.18%" } // Portrait: -840/1080, 0/1920, 1920/1080, 848.35/1920
      : { left: "0%", top: "-6.84%", width: "100%", height: "78.55%" }, // Landscape

    // Cloud
    cloud: isPortrait
      ? { left: "-14.81%", top: "80.47%", width: "77.63%", height: "7.43%" } // Portrait: -160/1080, 1545.08/1920, 838.4/1080, 142.62/1920
      : { bottom: "4.96%", right: "25.69%", width: "43.3%", height: "13.21%" }, // Landscape

    // Little Star 2
    littleStar2: isPortrait
      ? { left: "8.89%", top: "79.64%", width: "158.22%", height: "16.56%" } // Portrait: 96/1080, 1529.01/1920, 1708.8/1080, 317.95/1920
      : { left: "5.48%", top: "48.85%", width: "88.52%", height: "29.45%" }, // Landscape

    // Star line 1
    starLine1: isPortrait
      ? { left: "27.29%", top: "72.92%", width: "17.57%", height: "2.34%" } // Portrait: 294.72/1080, 1400/1920, 189.84/1080, 45/1920
      : { left: "8.32%", top: "84.02%", width: "12.23%", height: "7.74%" }, // Landscape

    // Light Cat
    lightCat: isPortrait
      ? { left: "68.73%", top: "65.99%", width: "33.4%", height: "17.5%" } // Portrait: 742.26/1080, 1266.98/1920, 360.72/1080, 336/1920
      : { left: "72.33%", top: "52.96%", width: "18.8%", height: "30.96%" }, // Landscape

    // Cat
    cat: isPortrait
      ? { left: "51.67%", top: "67.81%", width: "55.33%", height: "17.81%" } // Portrait: 558/1080, 1302/1920, 597.6/1080, 342/1920
      : { left: "62.74%", top: "56.2%", width: "31.11%", height: "31.65%" }, // Landscape

    // Tail
    tail: isPortrait
      ? { left: "89.2%", top: "51.46%", width: "29.63%", height: "15.63%" } // Portrait: 963.46/1080, 988/1920, 320/1080, 300/1920
      : { left: "83.85%", top: "27.14%", width: "16.67%", height: "27.78%" }, // Landscape

    // Little Star 1
    littleStar1: isPortrait
      ? { left: "-62.78%", top: "52.81%", width: "163.89%", height: "47.76%" } // Portrait: -678/1080, 1014/1920, 1770/1080, 917/1920
      : { left: "6.48%", top: "15.28%", width: "92.08%", height: "84.91%" }, // Landscape

    // Little Star 3
    littleStar3: isPortrait
      ? { left: "54.26%", top: "60%", width: "40.13%", height: "30.63%" } // Portrait: 586/1080, 1152/1920, 433.4/1080, 588/1920
      : { left: "2.9%", top: "35.51%", width: "22.57%", height: "54.28%" }, // Landscape

    // Text Container
    textContainer: isPortrait
      ? { left: "0%", top: "0%", width: "100%", height: "auto" } // Portrait: 0/1080, 0/1920, 1080/1080, auto
      : { left: "0%", top: "13%", width: "100%", height: "auto" }, // Landscape
  };

  // Main container opacity and z-index - ช่วง 0.500-0.667 (300vh)
  const opacity = useTransform(
    scrollYProgress,
    [0.5, 0.51, 0.657, 0.667],
    [0, 1, 1, 0],
  );
  const zIndex = useTransform(
    scrollYProgress,
    [0.497, 0.5, 0.665, 0.667],
    [-1, 10, 10, -1],
  );

  // Background gradient - แสดงตลอดเวลา
  const bgGradientOpacity = useTransform(scrollYProgress, [0.5, 0.51], [0, 1]);

  // ชุด 1 (0-70vh): 0.500-0.539 - มนุษย์บางพวก
  const set1Opacity = useTransform(
    scrollYProgress,
    [0.5, 0.51, 0.539],
    [0, 1, 1],
  );
  const set1Y = useTransform(scrollYProgress, [0.5, 0.51], [30, 0]);

  // ชุด 2 (70-100vh): 0.539-0.556 - ปุ่ม เคยไม่เคย + Little Star 2
  const set2Opacity = useTransform(
    scrollYProgress,
    [0.539, 0.548, 0.556],
    [0, 1, 1],
  );
  const set2Y = useTransform(scrollYProgress, [0.539, 0.548], [20, 0]);

  // ชุด 3 (100-200vh): 0.556-0.611 - สายหนึ่ง... + Little Star 1
  const set3Opacity = useTransform(
    scrollYProgress,
    [0.556, 0.564, 0.611],
    [0, 1, 1],
  );
  const set3Y = useTransform(scrollYProgress, [0.556, 0.564], [30, 0]);

  // ชุด 4 (200-225vh): 0.611-0.625 - Star line 1 + Little Star 3 + Cloud
  const set4Opacity = useTransform(
    scrollYProgress,
    [0.611, 0.618, 0.625],
    [0, 1, 1],
  );
  const set4Y = useTransform(scrollYProgress, [0.611, 0.618], [20, 0]);

  // ชุด 5 (225-250vh): 0.625-0.639 - cat + lightcat + tail
  const set5Opacity = useTransform(
    scrollYProgress,
    [0.625, 0.631, 0.639],
    [0, 1, 1],
  );
  const set5Y = useTransform(scrollYProgress, [0.625, 0.631], [50, 0]);

  return (
    <motion.div className="sticky top-0 h-screen w-screen flex  justify-center items-center ">
      {/* Background Gradient */}
      <motion.div className="absolute -top-1 left-0 w-screen h-screen">
        <Image
          src="/assets/Scene/Scene5/scene5-03/bggradient.svg"
          alt="Background gradient"
          fill
          className="object-cover"
          priority
        />
      </motion.div>
      <motion.div
        className="relative flex aspect-video portrait:aspect-9/16 px-16 portrait:px-15 justify-center items-center w-screen h-[99%] mx-auto mix-blend-screen"
        style={{ opacity, zIndex }}
      >
        {/* Cloud - Set 4 */}
        <motion.div
          className="absolute mix-blend-screen"
          style={{
            ...(isPortrait
              ? { left: positions.cloud.left, top: positions.cloud.top }
              : {
                  bottom: positions.cloud.bottom,
                  right: positions.cloud.right,
                }),
            width: positions.cloud.width,
            height: positions.cloud.height,
            y: set4Y,
            opacity: set4Opacity,
          }}
        >
          <Image
            src="/assets/Scene/Scene5/scene5-03/Cloud.svg"
            alt="Cloud"
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Little Star 3 - Set 4 */}
        <motion.div
          className="absolute mix-blend-screen"
          style={{
            left: positions.littleStar3.left,
            top: positions.littleStar3.top,
            width: positions.littleStar3.width,
            height: positions.littleStar3.height,
            y: set4Y,
            opacity: set4Opacity,
          }}
        >
          <Image
            src="/assets/Scene/Scene5/scene5-03/Little Star3.svg"
            alt="Little Star 3"
            fill
            className="object-contain animate-pulse"
            style={{ animationDuration: "3s" }}
          />
        </motion.div>

        {/* Little Star 2 - Set 2 */}
        <motion.div
          className="absolute mix-blend-screen"
          style={{
            left: positions.littleStar2.left,
            top: positions.littleStar2.top,
            width: positions.littleStar2.width,
            height: positions.littleStar2.height,
            y: set2Y,
            opacity: set2Opacity,
          }}
        >
          <Image
            src="/assets/Scene/Scene5/scene5-03/Little Star2.svg"
            alt="Little Star 2"
            fill
            className="object-contain animate-pulse"
            style={{ animationDuration: "4s" }}
          />
        </motion.div>

        {/* Little Star 1 - Set 3 */}
        <motion.div
          className="absolute mix-blend-screen"
          style={{
            left: positions.littleStar1.left,
            top: positions.littleStar1.top,
            width: positions.littleStar1.width,
            height: positions.littleStar1.height,
            y: set3Y,
            opacity: set3Opacity,
          }}
        >
          <Image
            src="/assets/Scene/Scene5/scene5-03/Little Star1.svg"
            alt="Little Star 1"
            fill
            className="object-contain animate-pulse"
            style={{ animationDuration: "2.5s" }}
          />
        </motion.div>

        {/* Star Line 1 - Set 4 */}
        <motion.div
          className="absolute mix-blend-screen"
          style={{
            left: positions.starLine1.left,
            top: positions.starLine1.top,
            width: positions.starLine1.width,
            height: positions.starLine1.height,
            y: set4Y,
            opacity: set4Opacity,
          }}
        >
          <Lottie
            animationData={starLine1AnimationData}
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          />
        </motion.div>

        {/* Light Cat - Set 5 */}
        <motion.div
          className="absolute mix-blend-screen"
          style={{
            left: positions.lightCat.left,
            top: positions.lightCat.top,
            width: positions.lightCat.width,
            height: positions.lightCat.height,
            y: set5Y,
            opacity: set5Opacity,
          }}
        >
          <Image
            src="/assets/Scene/Scene5/scene5-03/Light Cat.svg"
            alt="Light Cat"
            fill
            className="object-contain animate-pulse"
            style={{ animationDuration: "2s" }}
          />
        </motion.div>

        {/* Main Cat - Set 5 */}
        <motion.div
          className="absolute"
          style={{
            left: positions.cat.left,
            top: positions.cat.top,
            width: positions.cat.width,
            height: positions.cat.height,
            y: set5Y,
            opacity: set5Opacity,
          }}
        >
          <Lottie
            animationData={catAnimationData}
            loop={true}
            style={{ width: "100%", height: "100%" }}
          />
        </motion.div>

        {/* Tail - Set 5 */}
        <motion.div
          className="absolute scale-x-[-1]"
          style={{
            left: positions.tail.left,
            top: positions.tail.top,
            width: positions.tail.width,
            height: positions.tail.height,
            y: set5Y,
            opacity: set5Opacity,
          }}
        >
          <Lottie
            animationData={tailAnimationData}
            loop={true}
            style={{ width: "100%", height: "100%" }}
          />
        </motion.div>

        {/* Text Container */}
        <motion.div
          className={`flex flex-col items-center h-full w-full ${
            isPortrait ? "gap-0 py-20" : "gap-10 py-15"
          }`}
        >
          {/* Set 1: Main Text + Buttons */}
          <motion.div
            className={`flex flex-col items-center w-full ${
              isPortrait ? "gap-10 px-0 py-30" : "gap-10 py-8"
            }`}
            style={{
              y: set1Y,
              opacity: set1Opacity,
            }}
          >
            <div
              className={`text-white text-center ${
                isPortrait ? "typo-text-h3 w-[65%] px-0" : "typo-text-h3 w-full"
              }`}
            >
              <MysteriousText
                text="มนุษย์บางพวก เรียกมันว่า อิคิไก… เคยได้ยินมาก่อนไหมล่ะ"
                scrollYProgress={scrollYProgress}
                startProgress={0.5}
                endProgress={0.539}
              />
            </div>

            {/* Set 2: Choice Buttons */}
            <motion.div
              className={`flex pointer-events-auto ${
                isPortrait ? "gap-[130px]" : "gap-[130px]"
              }`}
              style={{
                opacity: set2Opacity,
              }}
            >
              <GradientButton
                text="เคย"
                isSelected={hasHeard === true}
                onClick={() => setHasHeard(true)}
                className="min-w-[200px]"
              />
              <GradientButton
                text="ไม่เคย"
                isSelected={hasHeard === false}
                onClick={() => setHasHeard(false)}
                className="min-w-[200px]"
              />
            </motion.div>
          </motion.div>

          {/* Set 3: Four Paths Explanation */}
          <motion.div
            className={`text-left w-full ${isPortrait ? "px-5" : "px-0"}`}
            style={{
              ...(isPortrait ? {} : { paddingLeft: "8.46%" }),
              y: set3Y,
              opacity: set3Opacity,
            }}
          >
            <div
              className={`text-white leading-relaxed ${
                isPortrait ? "typo-text-h4" : "typo-text-h4"
              }`}
            >
              <div className="mb-2">
                <MysteriousText
                  text="— สายหนึ่งคือสิ่งที่ทำให้หัวใจเจ้ารู้สึกมีไฟ (What you love)"
                  scrollYProgress={scrollYProgress}
                  startProgress={0.556}
                  endProgress={0.573}
                />
              </div>

              <div className="mb-2">
                <MysteriousText
                  text="— สายหนึ่งคือสิ่งที่เจ้าทำได้ดี (What you are good at)"
                  scrollYProgress={scrollYProgress}
                  startProgress={0.564}
                  endProgress={0.581}
                />
              </div>

              <div className="mb-2">
                <MysteriousText
                  text="— สายหนึ่งคือสิ่งที่โลกภายนอก กำลังรอคอยจากเจ้า"
                  scrollYProgress={scrollYProgress}
                  startProgress={0.57}
                  endProgress={0.587}
                />
              </div>
              <div className="mb-2">
                <MysteriousText
                  text="(What the world needs )"
                  scrollYProgress={scrollYProgress}
                  startProgress={0.575}
                  endProgress={0.592}
                />
              </div>
              <div className="mb-2">
                <MysteriousText
                  text="— และอีกสิ่งคือสิ่งที่โลกยอมจ่ายให้"
                  scrollYProgress={scrollYProgress}
                  startProgress={0.581}
                  endProgress={0.598}
                />
              </div>
              <div>
                <MysteriousText
                  text="(What you can be paid for)"
                  scrollYProgress={scrollYProgress}
                  startProgress={0.587}
                  endProgress={0.611}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
