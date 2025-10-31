"use client";
import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import Lottie from "lottie-react";
import humanAnimationData from "../../../../../public/assets/Scene/Scene1/human.json";
import moonAnimationData from "../../../../../public/assets/Scene/Scene1/moon.json";
import { useIsPortrait } from "@/app/hooks/useOrientation";

interface JobApplication2Props {
  scrollYProgress: MotionValue<number>;
}

export default function JobApplication2({
  scrollYProgress,
}: JobApplication2Props) {
  const isPortrait = useIsPortrait();
  // Transform horizontal movement based on vertical scroll
  // Scene แสดงแบบ horizontal panorama (3840×1080)
  // เมื่อ scroll ภาพจะเลื่อนจากซ้ายไปขวา
  const x = useTransform(
    scrollYProgress,
    [0, 0.611, 0.75],
    ["0%", "0%", `${isPortrait ? "-65%" : "-49.5%"}`]
  );

  // Overall opacity - hard cut at 0.611, นิ่ง 100vh, นิ่ง 50vh, fade out last 50vh (0.947-1.0)
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.611, 0.611, 0.97, 1],
    [0, 0, 1, 1, 0]
  );

  // นิ่ง 100vh (0.611-0.722) ไม่มีอนิเมชั่น

  // ชุด 1-3: Window elements (100vh = 0.722-0.833)
  // ชุด 1: window (0.722-0.755 = 30vh)
  const windowY = useTransform(scrollYProgress, [0.722, 0.755, 1], [100, 0, 0]);
  const windowOpacity = useTransform(
    scrollYProgress,
    [0.722, 0.755, 1],
    [0, 1, 1]
  );

  // ชุด 2: light window (0.755-0.789)
  const lightWindowOpacity = useTransform(
    scrollYProgress,
    [0.755, 0.789, 1],
    [0, 1, 1]
  );

  // ชุด 3: curtain1, curtain2 (0.789-0.833)
  const curtainY = useTransform(
    scrollYProgress,
    [0.789, 0.833, 1],
    [100, 0, 0]
  );
  const curtainOpacity = useTransform(
    scrollYProgress,
    [0.789, 0.833, 1],
    [0, 1, 1]
  );

  // ชุด 4-6: Outdoor elements (100vh = 0.833-0.944)
  // ชุด 4: building2, star (0.833-0.867)
  const building2Y = useTransform(
    scrollYProgress,
    [0.833, 0.867, 1],
    [100, 0, 0]
  );
  const building2Opacity = useTransform(
    scrollYProgress,
    [0.833, 0.867, 1],
    [0, 1, 1]
  );

  // ชุด 5: building1, circle (0.867-0.9)
  const building1Y = useTransform(
    scrollYProgress,
    [0.867, 0.9, 1],
    [100, 0, 0]
  );
  const building1Opacity = useTransform(
    scrollYProgress,
    [0.867, 0.9, 1],
    [0, 1, 1]
  );

  // ชุด 6: moon (0.9-0.944)
  const moonY = useTransform(scrollYProgress, [0.9, 0.944, 1], [100, 0, 0]);
  const moonOpacity = useTransform(scrollYProgress, [0.9, 0.944, 1], [0, 1, 1]);
  return (
    <motion.div
      className="
        absolute  
        bottom-0  
        left-0  
        w-full   
        h-1/2  
        "
    >
      <motion.div className="w-[200%]" style={{ opacity, x }}>
        <motion.div
          className="relative w-full "
          style={{
            aspectRatio: "3840 / 1080",
          }}
        >
          <motion.div className="absolute inset-0 overflow-visible">
            {/* Layer 1: Table (ล่างสุด) */}
            <motion.img
              src="/assets/Scene/Scene1/table.svg"
              alt="table"
              className="absolute"
              style={{
                left: "1.15%", // 44 / 3840
                top: "73.07%", // 789.2 / 1080
                width: "47.71%", // 1831.96 / 3840
                height: "78.54%", // 848.25 / 1080
              }}
            />

            {/* ชุด 1: Poster 11 */}
            <motion.img
              src="/assets/Scene/Scene1/poster11.svg"
              alt="poster11"
              className="absolute"
              style={{
                left: "39.17%", // 1504.04 / 3840
                top: "-108.33%", // -1170 / 1080
                width: "6.1%", // 234.34 / 3840
                height: "16.66%", // 179.93 / 1080
              }}
            />

            {/* ชุด 2: Poster 9, 10 */}
            <motion.img
              src="/assets/Scene/Scene1/poster9.svg"
              alt="poster9"
              className="absolute"
              style={{
                left: "38.78%", // 1489.16 / 3840
                top: "-62.86%", // -678.84 / 1080
                width: "8.49%", // 325.9 / 3840
                height: "29.04%", // 313.61 / 1080
              }}
            />

            <motion.img
              src="/assets/Scene/Scene1/poster10.svg"
              alt="poster10"
              className="absolute"
              style={{
                left: "3.52%", // 135 / 3840
                top: "-102.54%", // -1107.46 / 1080
                width: "7.25%", // 278.51 / 3840
                height: "25.23%", // 272.44 / 1080
              }}
            />

            {/* ชุด 3: Poster 12 */}
            <motion.img
              src="/assets/Scene/Scene1/poster12.svg"
              alt="poster12"
              className="absolute"
              style={{
                left: "25.31%", // 971.89 / 3840
                top: "-79.54%", // -858.98 / 1080
                width: "7.25%", // 278.51 / 3840
                height: "25.23%", // 272.44 / 1080
              }}
            />

            {/* ชุด 4: Poster 13, 15 */}
            <motion.img
              src="/assets/Scene/Scene1/poster13.svg"
              alt="poster13"
              className="absolute"
              style={{
                left: "13.24%", // 508.61 / 3840
                top: "-63.14%", // -681.92 / 1080
                width: "7.25%", // 278.51 / 3840
                height: "25.23%", // 272.44 / 1080
              }}
            />

            <motion.img
              src="/assets/Scene/Scene1/poster15.svg"
              alt="poster15"
              className="absolute"
              style={{
                left: "5.65%", // 217.08 / 3840
                top: "-40.03%", // -432.37 / 1080
                width: "8.57%", // 329.03 / 3840
                height: "29.04%", // 313.62 / 1080
              }}
            />

            {/* Layer 2: Posters - Background elements */}
            {/* Poster 14 */}
            <motion.img
              src="/assets/Scene/Scene1/poster14.svg"
              alt="poster14"
              className="absolute"
              style={{
                left: "24.01%", // 922.16 / 3840
                top: "-23.2%", // -250.54 / 1080
                width: "11.64%", // 446.75 / 3840
                height: "29.04%", // 313.61 / 1080
              }}
            />

            {/* Poster 8 */}
            <motion.img
              src="/assets/Scene/Scene1/poster8.svg"
              alt="poster8"
              className="absolute"
              style={{
                left: "52.71%", // 2023.27 / 3840
                top: "18.07%", // 195.12 / 1080
                width: "6.41%", // 245.99 / 3840
                height: "17.63%", // 190.41 / 1080
              }}
            />

            {/* Poster 7 */}
            <motion.img
              src="/assets/Scene/Scene1/poster7.svg"
              alt="poster7"
              className="absolute"
              style={{
                left: "46.18%", // 1773.25 / 3840
                top: "44.42%", // 479.73 / 1080
                width: "5.48%", // 210.42 / 3840
                height: "20.15%", // 217.58 / 1080
              }}
            />

            {/* Poster 6 */}
            <motion.img
              src="/assets/Scene/Scene1/poster6.svg"
              alt="poster6"
              className="absolute"
              style={{
                left: "2.07%", // 79.42 / 3840
                top: "7.57%", // 81.79 / 1080
                width: "10.45%", // 401.42 / 3840
                height: "27.07%", // 292.31 / 1080
              }}
            />

            {/* Poster 5 */}
            <motion.img
              src="/assets/Scene/Scene1/poster5.svg"
              alt="poster5"
              className="absolute"
              style={{
                left: "-0.76%", // -29.01 / 3840
                top: "28.56%", // 308.41 / 1080
                width: "5.46%", // 209.7 / 3840
                height: "20.92%", // 225.99 / 1080
              }}
            />

            {/* Poster 4 */}
            <motion.img
              src="/assets/Scene/Scene1/poster4.svg"
              alt="poster4"
              className="absolute"
              style={{
                left: "39.17%", // 1504.01 / 3840
                top: "8.55%", // 92.38 / 1080
                width: "7.8%", // 299.42 / 3840
                height: "29.64%", // 320.06 / 1080
              }}
            />

            {/* Poster 3 */}
            <motion.img
              src="/assets/Scene/Scene1/poster3.svg"
              alt="poster3"
              className="absolute"
              style={{
                left: "45.68%", // 1754.16 / 3840
                top: "21.04%", // 227.23 / 1080
                width: "3.4%", // 130.42 / 3840
                height: "15.37%", // 166.06 / 1080
              }}
            />

            {/* Poster 2 */}
            <motion.img
              src="/assets/Scene/Scene1/poster2.svg"
              alt="poster2"
              className="absolute"
              style={{
                left: "6.58%", // 252.75 / 3840
                top: "40.8%", // 440.62 / 1080
                width: "4.93%", // 189.15 / 3840
                height: "12.45%", // 134.42 / 1080
              }}
            />

            {/* Poster 1 */}
            <motion.img
              src="/assets/Scene/Scene1/poster1.svg"
              alt="poster1"
              className="absolute"
              style={{
                left: "39.66%", // 1522.76 / 3840
                top: "48.5%", // 523.74 / 1080
                width: "4.19%", // 160.88 / 3840
                height: "8.27%", // 89.34 / 1080
              }}
            />

            {/* Layer 3: Computer */}
            <motion.img
              src="/assets/Scene/Scene1/Computer.svg"
              alt="computer"
              className="absolute"
              style={{
                left: "12.53%", // 481.2 / 3840
                top: "14.28%", // 154.19 / 1080
                width: "24.94%", // 957.6 / 3840
                height: "70.28%", // 758.98 / 1080
              }}
            />

            {/* Layer 4: Papers */}
            {/* Paper 3 */}
            <motion.img
              src="/assets/Scene/Scene1/paper3.svg"
              alt="paper3"
              className="absolute"
              style={{
                left: "42.4%", // 1627.93 / 3840
                top: "77.25%", // 834.27 / 1080
                width: "6.9%", // 264.98 / 3840
                height: "9.51%", // 102.65 / 1080
              }}
            />

            {/* Paper 2 */}
            <motion.img
              src="/assets/Scene/Scene1/paper2.svg"
              alt="paper2"
              className="absolute"
              style={{
                left: "1.61%", // 61.66 / 3840
                top: "77.81%", // 840.39 / 1080
                width: "5.7%", // 218.83 / 3840
                height: "8.79%", // 94.89 / 1080
              }}
            />

            {/* Paper 1 */}
            <motion.img
              src="/assets/Scene/Scene1/paper1.svg"
              alt="paper1"
              className="absolute"
              style={{
                left: "1.52%", // 58.45 / 3840
                top: "82.28%", // 888.6 / 1080
                width: "7.14%", // 274.32 / 3840
                height: "9.51%", // 102.65 / 1080
              }}
            />

            {/* Layer 5: Lamp */}
            <motion.img
              src="/assets/Scene/Scene1/lamp.svg"
              alt="lamp"
              className="absolute"
              style={{
                left: "2.96%", // 113.54 / 3840
                top: "12.05%", // 130.18 / 1080
                width: "12.46%", // 478.48 / 3840
                height: "67.85%", // 732.76 / 1080
              }}
            />

            {/* Layer 6: Books */}
            {/* Book 1 */}
            <motion.img
              src="/assets/Scene/Scene1/book1.svg"
              alt="book1"
              className="absolute"
              style={{
                left: "8.99%", // 345.38 / 3840
                top: "77.93%", // 841.65 / 1080
                width: "5.37%", // 206.33 / 3840
                height: "11.49%", // 124.14 / 1080
              }}
            />

            {/* Book 2 */}
            <motion.img
              src="/assets/Scene/Scene1/book2.svg"
              alt="book2"
              className="absolute"
              style={{
                left: "37.3%", // 1432.25 / 3840
                top: "69.98%", // 755.76 / 1080
                width: "6.17%", // 236.87 / 3840
                height: "13.41%", // 144.83 / 1080
              }}
            />

            {/* Layer 7: Pen */}
            <motion.img
              src="/assets/Scene/Scene1/pen.svg"
              alt="pen"
              className="absolute"
              style={{
                left: "38.85%", // 1491.88 / 3840
                top: "86.26%", // 931.58 / 1080
                width: "3.2%", // 122.95 / 3840
                height: "2.02%", // 21.81 / 1080
              }}
            />

            {/* Layer 8: Light (mix-blend-screen) */}
            <motion.img
              src="/assets/Scene/Scene1/light.svg"
              alt="light"
              className="absolute mix-blend-screen"
              style={{
                left: "11.92%", // 457.68 / 3840
                top: "23.18%", // 250.32 / 1080
                width: "25.5%", // 979.2 / 3840
                height: "59.89%", // 646.8 / 1080
              }}
            />

            {/* Layer 9: Pencil Box */}
            <motion.img
              src="/assets/Scene/Scene1/pencil box.svg"
              alt="pencil box"
              className="absolute"
              style={{
                left: "43.37%", // 1665.59 / 3840
                top: "67.67%", // 730.87 / 1080
                width: "2.69%", // 103.18 / 3840
                height: "15.37%", // 165.95 / 1080
              }}
            />

            {/* Layer 10: Post-it */}
            <motion.img
              src="/assets/Scene/Scene1/postit.svg"
              alt="postit"
              className="absolute"
              style={{
                left: "43.84%", // 1683.63 / 3840
                top: "85.06%", // 918.69 / 1080
                width: "2.61%", // 100.19 / 3840
                height: "4.24%", // 45.75 / 1080
              }}
            />

            {/* Layer 11: Paper 4 */}
            <motion.img
              src="/assets/Scene/Scene1/paper4.svg"
              alt="paper4"
              className="absolute"
              style={{
                left: "10.65%", // 408.86 / 3840
                top: "68.42%", // 738.9 / 1080
                width: "2.28%", // 87.59 / 3840
                height: "8.03%", // 86.77 / 1080
              }}
            />

            {/* Layer 12: Human (Lottie Animation) */}
            <motion.div
              className="absolute"
              style={{
                left: "15.15%", // 581.73 / 3840
                top: "30.65%", // 331 / 1080
                width: "21.71%", // 833.69 / 3840
                height: "134.07%", // 1447.89 / 1080
              }}
            >
              <Lottie
                animationData={humanAnimationData}
                loop={true}
                autoplay={true}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </motion.div>

            {/* ชุด 2: Light Window */}
            <motion.img
              src="/assets/Scene/Scene1/light window.svg"
              alt="light window"
              className="absolute"
              style={{
                left: "67.31%", // 2584.62 / 3840
                top: "19.3%", // 208.43 / 1080
                width: "14.89%", // 571.79 / 3840
                height: "62.68%", // 676.97 / 1080
                opacity: lightWindowOpacity,
              }}
            />

            {/* ชุด 6: Moon */}
            <motion.div
              className="absolute"
              style={{
                left: "68.64%", // 2635.71 / 3840
                top: "22.06%", // 238.29 / 1080
                width: "4.34%", // 166.54 / 3840
                height: "15.42%", // 166.54 / 1080
                y: moonY,
                opacity: moonOpacity,
              }}
            >
              <Lottie
                animationData={moonAnimationData}
                loop={true}
                autoplay={true}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </motion.div>

            {/* ชุด 4: Stars */}
            <motion.img
              src="/assets/Scene/Scene1/star.svg"
              alt="stars"
              className="absolute"
              style={{
                left: "73.03%", // 2804.21 / 3840
                top: "33.93%", // 366.44 / 1080
                width: "8.32%", // 319.39 / 3840
                height: "7.37%", // 79.55 / 1080
                y: building2Y,
                opacity: building2Opacity,
              }}
            />

            {/* ชุด 5: Circle decorations */}
            <motion.img
              src="/assets/Scene/Scene1/circle.svg"
              alt="circles"
              className="absolute"
              style={{
                left: "67.12%", // 2577.73 / 3840
                top: "21.62%", // 233.52 / 1080
                width: "14.34%", // 550.65 / 3840
                height: "24.88%", // 268.66 / 1080
                y: building1Y,
                opacity: building1Opacity,
              }}
            />

            {/* ชุด 4: Building 2 */}
            <motion.img
              src="/assets/Scene/Scene1/building2.svg"
              alt="building2"
              className="absolute"
              style={{
                left: "67.31%", // 2584.62 / 3840
                top: "37.61%", // 406.23 / 1080
                width: "14.89%", // 571.79 / 3840
                height: "44.37%", // 479.17 / 1080
                y: building2Y,
                opacity: building2Opacity,
              }}
            />

            {/* ชุด 5: Building 1 */}
            <motion.img
              src="/assets/Scene/Scene1/building1.svg"
              alt="building1"
              className="absolute"
              style={{
                left: "67.31%", // 2584.62 / 3840
                top: "48.01%", // 518.51 / 1080
                width: "14.89%", // 571.79 / 3840
                height: "33.97%", // 366.89 / 1080
                y: building1Y,
                opacity: building1Opacity,
              }}
            />

            {/* ชุด 1: Window Frame */}
            <motion.img
              src="/assets/Scene/Scene1/window.svg"
              alt="window"
              className="absolute"
              style={{
                left: "60.95%", // 2340.64 / 3840
                top: "6.22%", // 67.15 / 1080
                width: "28.1%", // 1078.72 / 3840
                height: "79.63%", // 860.04 / 1080
                y: windowY,
                opacity: windowOpacity,
              }}
            />

            {/* ชุด 3: Curtain 2 (Right) */}
            <motion.img
              src="/assets/Scene/Scene1/curtain2.svg"
              alt="curtain2"
              className="absolute"
              style={{
                left: "81.49%", // 3129.62 / 3840
                top: "8%", // 86.39 / 1080
                width: "4.87%", // 187.08 / 3840
                height: "86.95%", // 939.04 / 1080
                y: curtainY,
                opacity: curtainOpacity,
              }}
            />

            {/* ชุด 3: Curtain 1 (Left - บนสุด) */}
            <motion.img
              src="/assets/Scene/Scene1/curtain1.svg"
              alt="curtain1"
              className="absolute"
              style={{
                left: "63.3%", // 2430.84 / 3840
                top: "7.96%", // 86.01 / 1080
                width: "4.87%", // 187.14 / 3840
                height: "86.95%", // 939.03 / 1080
                y: curtainY,
                opacity: curtainOpacity,
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
