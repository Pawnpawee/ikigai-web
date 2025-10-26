"use client";
import React, { useLayoutEffect, useState } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import InputButton from "@/app/components/ui/InputButton";

interface NameInputProps {
  scrollYProgress: MotionValue<number>;
  playerName: string;
  setPlayerName: (name: string) => void;
  nameError: string;
}

export default function IntoDarkNameInput({
  scrollYProgress,
  playerName,
  setPlayerName,
  nameError,
}: NameInputProps) {
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.02, 0.08, 0.1],
    [0, 1, 1, 0]
  );
  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.02, 0.09, 0.1],
    [-1, 10, 10, -1]
  );

  return (
    <motion.div
      className="fixed top-0 h-screen w-full"
      style={{ opacity, zIndex }}
    >
      <motion.div
        aria-hidden
        className="absolute inset-0  flex items-center justify-center bg-black"
      >
        <motion.div
          className="relative w-full lg:w-[85%]"
          style={{
            aspectRatio: "1920 / 1080",
          }}
        >
          {/* 
            left: -206.396px -> (-206.396 / 1920) * 100 = -10.75%
            bottom: -915.988px -> (-915.988 / 1080) * 100 = -84.81%
            width: 1550.5px -> (1550.5 / 1920) * 100 = 80.75%
            height: 2069.88px -> (2069.88 / 1080) * 100 = 191.65%
          */}
          {/* Background Gradient */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              left: "-10.75%", // -206.396/1920
              bottom: "-84.81%", // -915.988/1080
              width: "80.76%", // 1550.5/1920
              height: "191.65%", // 2069.88/1080
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

          {/* Water Elements with floating animation */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              left: "4.38%", // 84/1920
              top: "70.56%", // 762/1080
              width: "65.99%", // 1267/1920
              height: "26.02%", // 281/1080
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-01/water.svg"
              alt="Water"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Star Elements with staggered animations */}
          <motion.div
            className="absolute"
            style={{
              left: "3.13%", // 60/1920
              top: "3.52%", // 38/1080
              width: "59.32%", // 1139/1920
              height: "92.78%", // 1002/1080
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-01/Little star1.svg"
              alt="Little star 1"
              fill
              className="object-contain animate-pulse"
              style={{ animationDuration: "3s" }}
            />
          </motion.div>

          <motion.div
            className="absolute"
            style={{
              left: "8.59%", // 165/1920
              top: "13.43%", // 145/1080
              width: "40.37%", // 775/1920
              height: "58.15%", // 628/1080
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

          <motion.div
            className="absolute"
            style={{
              left: "11.30%", // 217/1920
              top: "8.89%", // 96/1080
              width: "35.94%", // 690/1920
              height: "73.61%", // 795/1080
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

          {/* Star lines with entrance animations */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              left: "43.44%", // 834/1920
              top: "47.59%", // 514/1080
              width: "5.89%", // 113/1920
              height: "8.52%", // 92/1080
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-01/star line1.svg"
              alt="Star line 1"
              fill
              className="object-contain"
            />
          </motion.div>

          <motion.div
            className="absolute mix-blend-screen"
            style={{
              left: "9.84%", // 189/1920
              top: "37.78%", // 408/1080
              width: "6.51%", // 125/1920
              height: "18.80%", // 203/1080
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-01/star line2.svg"
              alt="Star line 2"
              fill
              className="object-contain"
            />
          </motion.div>

          <motion.div
            className="absolute mix-blend-screen"
            style={{
              left: "25.31%", // 486/1920
              top: "16.76%", // 181/1080
              width: "10.57%", // 203/1920
              height: "19.35%", // 209/1080
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-01/star line3.svg"
              alt="Star line 3"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Light Cat with glow effect */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              left: "16.39%", // 314.54/1920
              top: "36.52%", // 394.38/1080
              width: "27.60%", // 529.74/1920
              height: "49.05%", // 529.74/1080
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-01/Light cat.svg"
              alt="Light cat"
              fill
              className="object-contain animate-pulse"
            />
          </motion.div>

          {/* Main Cat with entrance animation */}
          <motion.div
            className="absolute"
            style={{
              left: "14.26%", // 273.72/1920
              top: "14.19%", // 153.29/1080
              width: "26.44%", // 507.49/1920
              height: "66.38%", // 716.88/1080
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-01/cat.svg"
              alt="Main cat"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Cat Face */}
          <motion.div
            className="absolute"
            style={{
              left: "31.54%", // 605.14/1920
              top: "55.08%", // 594.84/1080
              width: "9.90%", // 189.99/1920
              height: "4.01%", // 43.25/1080
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-01/cat face.svg"
              alt="Cat face"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Cat Noise (optional overlay) */}
          <motion.div
            className="absolute opacity-0 mix-blend-overlay hover:opacity-30 transition-opacity duration-1000"
            style={{
              left: "14.27%", // 274/1920
              top: "14.17%", // 153/1080
              width: "26.46%", // 508/1920
              height: "66.39%", // 717/1080
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-01/cat-noise.svg"
              alt="Cat noise"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Text and Input */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              left: "57.81%", // 1110/1920
              top: "36%", // 428/1080
            }}
          >
            <div className="flex flex-col items-center w-full h-full">
              {/* Main heading text */}
              <motion.div
                className="text-center mb-10 lg:mb-20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <motion.h3 className="typo-text-h3 text-white">
                  สวัสดี... ข้าคือผู้นำทางแห่งความมืด
                  <br />
                  เจ้าชื่ออะไร
                </motion.h3>
              </motion.div>

              {/* Input field positioned as in Figma */}

              <InputButton
                value={playerName}
                onChange={setPlayerName}
                placeholder="พิมพ์ข้อความ..."
              />

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
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
