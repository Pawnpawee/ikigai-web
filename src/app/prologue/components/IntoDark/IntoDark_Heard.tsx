"use client";
import React, { useState } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import GradientButton from "@/app/components/ui/GradientButton";

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
  // Main container opacity and z-index - ช่วง 0.636-0.727 (100vh out of 1100vh)
  const opacity = useTransform(
    scrollYProgress,
    [0.636, 0.65, 0.71, 0.727],
    [0, 1, 1, 0]
  );
  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.65, 0.72, 0.727],
    [-1, 10, 10, -1]
  );

  // Background gradient - Layer 1
  const bgGradientY = useTransform(scrollYProgress, [0.636, 0.66], [50, 0]);
  const bgGradientOpacity = useTransform(scrollYProgress, [0.636, 0.66], [0, 1]);

  // Cloud - Layer 2
  const cloudY = useTransform(scrollYProgress, [0.64, 0.665], [30, 0]);
  const cloudOpacity = useTransform(scrollYProgress, [0.64, 0.665], [0, 1]);

  // Stars - Layer 3
  const starsY = useTransform(scrollYProgress, [0.645, 0.67], [40, 0]);
  const starsOpacity = useTransform(scrollYProgress, [0.645, 0.67], [0, 1]);

  // Cat and Light Cat - Layer 4
  const catY = useTransform(scrollYProgress, [0.65, 0.68], [80, 0]);
  const catOpacity = useTransform(scrollYProgress, [0.65, 0.68], [0, 1]);

  // Text content - Layer 5
  const textOpacity = useTransform(scrollYProgress, [0.655, 0.685], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.655, 0.685], [30, 0]);

  // Choice buttons - Layer 6
  const choicesOpacity = useTransform(scrollYProgress, [0.665, 0.695], [0, 1]);
  const choicesY = useTransform(scrollYProgress, [0.665, 0.695], [20, 0]);

  // Additional text - Layer 7
  const additionalTextOpacity = useTransform(scrollYProgress, [0.675, 0.705], [0, 1]);
  const additionalTextY = useTransform(scrollYProgress, [0.675, 0.705], [20, 0]);

  return (
    <div className="sticky top-0 w-full pointer-events-none">
      <motion.div
        className="flex items-start justify-center bg-black pointer-events-none"
        style={{  zIndex }}
      >
        <div
          className="relative w-screen pointer-events-auto overflow-hidden"
          style={{
            aspectRatio: "1920 / 1080",
          }}
        >
          {/* Background Gradient */}
          <motion.div
            className="absolute top-0 left-0"
            style={{
                width: "100%",
              height: "78.55%",
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-03/bggradient.svg"
              alt="Background gradient"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Cloud - Bottom Right */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              bottom: "4.96%",
              right: "25.69%",
              width: "43.3%",
              height: "13.21%",
              y: cloudY,
              opacity: cloudOpacity,
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-03/Cloud.svg"
              alt="Cloud"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Little Star 3 - Top Left Stars */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              left: "2.9%",
              top: "35.52%",
              width: "4.95%",
              height: "54.27%",
              y: starsY,
              opacity: starsOpacity,
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

          {/* Little Star 2 - Center */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              left: "5.48%",
              top: "48.85%",
              width: "88.52%",
              height: "29.45%",
              y: starsY,
              opacity: starsOpacity,
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

          {/* Little Star 1 - Large Star Field */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              left: "6.48%",
              top: "15.28%",
              width: "92.08%",
              height: "84.91%",
              y: starsY,
              opacity: starsOpacity,
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

          {/* Star Line 1 - Bottom Right */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              left: "79.45%",
              top: "84.03%",
              width: "12.23%",
              height: "7.73%",
              y: starsY,
              opacity: starsOpacity,
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-03/Star line1.svg"
              alt="Star line 1"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Light Cat - Glow Effect */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              left: "72.33%",
              top: "52.96%",
              width: "18.8%",
              height: "30.96%",
              y: catY,
              opacity: catOpacity,
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-03/Light Cat.svg"
              alt="Light Cat"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Main Cat */}
          <motion.div
            className="absolute"
            style={{
              left: "62.74%",
              top: "27.14%",
              width: "31.11%",
              height: "60.71%",
              y: catY,
              opacity: catOpacity,
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-03/cat.svg"
              alt="Cat"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Cat Face */}
          <motion.div
            className="absolute"
            style={{
              left: "63.21%",
              top: "65.51%",
              width: "13.91%",
              height: "12.88%",
              y: catY,
              opacity: catOpacity,
            }}
          >
            <Image
              src="/assets/Scene/Scene5/scene5-03/cat face.svg"
              alt="Cat face"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Main Text - Top */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 text-center"
            style={{
              top: "6.3%",
              y: textY,
              opacity: textOpacity,
            }}
          >
            <p className="typo-text-h3 text-white ">
              มนุษย์บางพวก เรียกมันว่า อิคิไก… เคยได้ยินมาก่อนไหมล่ะ
            </p>
          </motion.div>

          {/* Choice Buttons */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 flex gap-[130px] pointer-events-auto"
            style={{
              top: "15%",
              y: choicesY,
              opacity: choicesOpacity,
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

          {/* Additional Text - Four Paths Explanation */}
          <motion.div
            className="absolute text-left"
            style={{
              left: "11.56%",
              top: "35.65%",
              width: "51.67%",
              y: additionalTextY,
              opacity: additionalTextOpacity,
            }}
          >
            <div className="typo-text-h3 text-white leading-relaxed">
              <p className="mb-2">— สายหนึ่งคือสิ่งที่ทำให้หัวใจเจ้ารู้สึกมีไฟ (What you love)</p>
              <p className="mb-2">— สายหนึ่งคือสิ่งที่เจ้าทำได้ดี (What you are good at)</p>
              <p className="mb-2">— สายหนึ่งคือสิ่งที่โลกภายนอกกำลังรอคอยจากเจ้า</p>
              <p className="mb-2 ml-6">(What the world needs)</p>
              <p className="mb-2">— และอีกสิ่งคือสิ่งที่โลกยอมจ่ายให้</p>
              <p className="ml-6">(What you can be paid for)</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
