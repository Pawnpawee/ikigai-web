"use client";
import React from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import Bubble from "@/app/components/ui/Bubble";
import WordByWordAnimation from "@/app/components/ui/WordByWordAnimation";

export default function Sleeping() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Background opacity (always visible)
  const bgOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  // Layer animations - ให้ขึ้นครบภายใน 300vh (0-0.6 ของ 500vh)
  // Layer 1: Background elements (tables, books, lamp, clock, note)
  const table1Y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);
  const table1Opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const table2Y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);
  const table2Opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Layer 2: Items on tables
  const book1Y = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);
  const book1Opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  const book2Y = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);
  const book2Opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  const lampY = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);
  const lampOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  const clockY = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);
  const clockOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  const noteY = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);
  const noteOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  // Layer 3: Bed
  const bedY = useTransform(scrollYProgress, [0.2, 0.4], [100, 0]);
  const bedOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  // Layer 4: Character (head and body)
  const headY = useTransform(scrollYProgress, [0.3, 0.5], [100, 0]);
  const headOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  const bodyY = useTransform(scrollYProgress, [0.3, 0.5], [100, 0]);
  const bodyOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  // Layer 5: Blanket and phone
  const blanketY = useTransform(scrollYProgress, [0.4, 0.6], [100, 0]);
  const blanketOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  const phoneY = useTransform(scrollYProgress, [0.4, 0.6], [100, 0]);
  const phoneOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  // Layer 6: Slipper
  const slipperY = useTransform(scrollYProgress, [0.5, 0.6], [100, 0]);
  const slipperOpacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);

  // Zoom effect - ซูมตอน 300vh (0.6-0.8 ของ 500vh) จาก 1 → 2 เท่า
  const scale = useTransform(scrollYProgress, [0.6, 0.8], [1, 2]);

  // Bubble opacity - หายไปก่อนซูม (0.55-0.65)
  const bubbleOpacity = useTransform(scrollYProgress, [0.55, 0.65], [1, 0]);

  // Text animation - แสดงข้อความตอน 70% (0.7 ของ 500vh)
  const textOpacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);

  return (
    <motion.div
      ref={ref}
      className="relative  w-screen h-[500vh] z-2 "
      style={{ opacity: bgOpacity }}
    >
      {/* Sticky Container */}
      <div className=" sticky top-0 w-screen overflow-hidden">
        <motion.div
          className="relative w-full aspect-video overflow-hidden"
          style={{ scale }}
        >
          <img
            src="/assets/Scene/Scene2/bg.svg"
            alt="Background"
            className="w-full h-full object-cover"
          />
          {/* Table 2 (Right) */}
          <motion.div
            className="absolute"
            style={{
              inset: "15.23% 8.62% 64.38% 72.95%",
              y: table2Y,
              opacity: table2Opacity,
            }}
          >
            <img
              src="/assets/Scene/Scene2/table2.svg"
              alt="table2"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Table 1 (Left) */}
          <motion.div
            className="absolute"
            style={{
              inset: "14.78% 72.89% 64.83% 8.68%",
              y: table1Y,
              opacity: table1Opacity,
            }}
          >
            <img
              src="/assets/Scene/Scene2/table1.svg"
              alt="table1"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Book 2 (Left table) */}
          <motion.div
            className="absolute"
            style={{
              inset: "20.48% 83.61% 69.38% 11.4%",
              y: book2Y,
              opacity: book2Opacity,
            }}
          >
            <img
              src="/assets/Scene/Scene2/book2.svg"
              alt="book2"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Lamp (Left table) */}
          <motion.div
            className="absolute"
            style={{
              inset: "17.13% 76.58% 73.09% 17.91%",
              y: lampY,
              opacity: lampOpacity,
            }}
          >
            <img
              src="/assets/Scene/Scene2/lamp.svg"
              alt="lamp"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Note (Right table) */}
          <motion.div
            className="absolute"
            style={{
              inset: "22.39% 13.62% 69.53% 82.81%",
              y: noteY,
              opacity: noteOpacity,
            }}
          >
            <img
              src="/assets/Scene/Scene2/note.svg"
              alt="note"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Clock (Right table) */}
          <motion.div
            className="absolute"
            style={{
              inset: "21.17% 18.87% 73.1% 74.66%",
              y: clockY,
              opacity: clockOpacity,
            }}
          >
            <img
              src="/assets/Scene/Scene2/clock.svg"
              alt="clock"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Book 1 (Right table) */}
          <motion.div
            className="absolute"
            style={{
              inset: "16.34% 9.99% 73.51% 85.03%",
              y: book1Y,
              opacity: book1Opacity,
            }}
          >
            <img
              src="/assets/Scene/Scene2/book1.svg"
              alt="book1"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Bed */}
          <motion.div
            className="absolute"
            style={{
              bottom: 0,
              left: "24.83%",
              right: "24.77%",
              top: "7.79%",
              y: bedY,
              opacity: bedOpacity,
            }}
          >
            <img
              src="/assets/Scene/Scene2/bed.svg"
              alt="bed"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Head */}
          <motion.div
            className="absolute"
            style={{
              inset: "19.11% 41.68% 55.39% 42.31%",
              y: headY,
              opacity: headOpacity,
            }}
          >
            <img
              src="/assets/Scene/Scene2/head.svg"
              alt="head"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Body */}
          <motion.div
            className="absolute"
            style={{
              inset: "42.14% 41.44% 21.57% 41.98%",
              y: bodyY,
              opacity: bodyOpacity,
            }}
          >
            <img
              src="/assets/Scene/Scene2/body.svg"
              alt="body"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Blanket */}
          <motion.div
            className="absolute"
            style={{
              inset: "47.7% 31.87% 2.8% 31.96%",
              y: blanketY,
              opacity: blanketOpacity,
            }}
          >
            <img
              src="/assets/Scene/Scene2/blanket.svg"
              alt="blanket"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Phone */}
          <motion.div
            className="absolute"
            style={{
              inset: "41.65% 34.28% 49.3% 62.2%",
              y: phoneY,
              opacity: phoneOpacity,
            }}
          >
            <img
              src="/assets/Scene/Scene2/phone.svg"
              alt="phone"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Slipper */}
          <motion.div
            className="absolute"
            style={{
              inset: "46.99% 72.37% 30.53% 17.98%",
              y: slipperY,
              opacity: slipperOpacity,
            }}
          >
            <img
              src="/assets/Scene/Scene2/slipper.svg"
              alt="slipper"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Bubbles - with Y animation and fade out */}
          <motion.div
            className="absolute mix-blend-screen"
            style={{
              left: "18.94%", // 363.64 / 1920
              top: "30.87%", // 333.39 / 1080
              y: useTransform(scrollYProgress, [0, 0.3, 0.6], [50, -20, -30]),
              opacity: bubbleOpacity,
            }}
          >
            <Bubble text="จะมีงานทำหรือเปล่า" className="typo-text-h5" />
          </motion.div>

          <motion.div
            className="absolute mix-blend-screen"
            style={{
              left: "62.76%", // 1205 / 1920
              top: "17.22%", // 186 / 1080
              y: useTransform(scrollYProgress, [0, 0.3, 0.6], [50, -20, -30]),
              opacity: bubbleOpacity,
            }}
          >
            <Bubble text="จะทำได้ไหม" className="typo-text-h5"/>
          </motion.div>

          <motion.div
            className="absolute mix-blend-screen"
            style={{
              left: "59.61%", // 1144.51 / 1920
              top: "52.16%", // 563.3 / 1080
              y: useTransform(scrollYProgress, [0, 0.3, 0.6], [50, -20, -30]),
              opacity: bubbleOpacity,
            }}
          >
            <Bubble text="จะเก่งพอหรือเปล่า" className="typo-text-h5"/>
          </motion.div>

          <motion.div
            className="absolute mix-blend-screen"
            style={{
              left: "26.29%", // 504.7 / 1920
              top: "67.08%", // 724.44 / 080
              y: useTransform(scrollYProgress, [0, 0.3, 0.6], [50, -20, -30]),
              opacity: bubbleOpacity,
            }}
          >
            <Bubble text="จะเข้ากับคนอื่นได้ไหม" className="typo-text-h5" />
          </motion.div>

          
        </motion.div>
        {/* Text at bottom - Word by word animation at 70% scroll */}
          <motion.div
            className="absolute bottom-[30%] left-0 right-0 flex justify-center"
            style={{ opacity: textOpacity }}
          >
            <WordByWordAnimation
              text="เห้อ นอนดีกว่า"
              scrollYProgress={scrollYProgress}
              as="p"
              className="typo-text-h5 text-white"
            />
          </motion.div>
      </div>
      {/* Light overlay */}
      <div
        className="absolute w-screen inset-0 mix-blend-soft-light pointer-events-none"
        style={{ backgroundColor: "#15237B", opacity: 0.5 }}
      />
    </motion.div>
  );
}
