"use client";
import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

interface JobApplication2Props {
  scrollYProgress: MotionValue<number>;
}

export default function JobApplication2({
  scrollYProgress,
}: JobApplication2Props) {
  // Transform horizontal movement based on vertical scroll
  // Scene แสดงแบบ horizontal panorama (3840×1080)
  // เมื่อ scroll ภาพจะเลื่อนจากซ้ายไปขวา
  const x = useTransform(
    scrollYProgress,
    [0, 0.55, 0.9, 1],
    ["0%", "0%", "-49.5%", "-49.5%"]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.51, 0.51, 1],
    [0, 0, 1, 1]
  );

  // Animation สำหรับ elements หลัง Window - ค่อยๆ ขึ้นมา
  // Layer 1: Light Window
  const lightWindowY = useTransform(scrollYProgress, [0.55, 0.65, 1], [100, 0, 0]);
  const lightWindowOpacity = useTransform(scrollYProgress, [0.55, 0.65, 1], [0, 1, 1]);

  // Layer 2: Moon and Stars
  const skyElementsY = useTransform(scrollYProgress, [0.6, 0.7, 1], [100, 0, 0]);
  const skyElementsOpacity = useTransform(scrollYProgress, [0.6, 0.7, 1], [0, 1, 1]);

  // Layer 3: Buildings
  const buildingsY = useTransform(scrollYProgress, [0.65, 0.75, 1], [100, 0, 0]);
  const buildingsOpacity = useTransform(scrollYProgress, [0.65, 0.75, 1], [0, 1, 1]);

  // Layer 4: Window Frame and Curtains
  const windowFrameY = useTransform(scrollYProgress, [0.7, 0.8, 1], [100, 0, 0]);
  const windowFrameOpacity = useTransform(scrollYProgress, [0.7, 0.8, 1], [0, 1, 1]);
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
            {/* Table */}
            <motion.img
              src="/assets/Scene/Scene1/scene1-01/table.svg"
              alt="table"
              className="absolute"
              style={{
                left: "1.15%", // 44.02 / 3840
                bottom: "-7.38%", // -79.69 / 1080
                width: "47.71%", // 1831.96 / 3840
                height: "34.27%", // 370.16 / 1080
              }}
            />

            {/* Poster 14 */}
            <motion.img
              src="/assets/Scene/Scene1/scene1-01/poster14.svg"
              alt="poster14"
              className="absolute"
              style={{
                left: "24.01%", // 922.22 / 3840
                top: "-23.2%", // -250.51 / 1080 (ติดขอบบน)
                width: "11.64%", // 446.75 / 3840
                height: "29.04%", // 313.61 / 1080
              }}
            />

            {/* Poster 8 */}
            <motion.img
              src="/assets/Scene/Scene1/scene1-02/poster8.svg"
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
              src="/assets/Scene/Scene1/scene1-01/poster7.svg"
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
              src="/assets/Scene/Scene1/scene1-01/poster6.svg"
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
              src="/assets/Scene/Scene1/scene1-01/poster5.svg"
              alt="poster5"
              className="absolute"
              style={{
                left: "-0.45%",
                top: "28.56%", // 308.41 / 1080
                width: "5.46%", // 209.7 / 3840
                height: "20.92%", // 225.99 / 1080
              }}
            />

            {/* Poster 4 */}
            <motion.img
              src="/assets/Scene/Scene1/scene1-01/poster4.svg"
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
              src="/assets/Scene/Scene1/scene1-01/poster3.svg"
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
              src="/assets/Scene/Scene1/scene1-01/poster2.svg"
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
              src="/assets/Scene/Scene1/scene1-01/poster1.svg"
              alt="poster1"
              className="absolute"
              style={{
                left: "39.66%", // 1522.76 / 3840
                top: "48.5%", // 523.74 / 1080
                width: "4.19%", // 160.88 / 3840
                height: "8.27%", // 89.34 / 1080
              }}
            />

            {/* Computer */}
            <motion.img
              src="/assets/Scene/Scene1/scene1-01/Computer.svg"
              alt="computer"
              className="absolute"
              style={{
                left: "12.53%", // 481.2 / 3840
                top: "14.28%", // 154.19 / 1080
                width: "24.94%", // 957.6 / 3840
                height: "70.28%", // 758.98 / 1080
              }}
            />

            {/* Paper 3 */}
            <motion.img
              src="/assets/Scene/Scene1/scene1-01/paper3.svg"
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
              src="/assets/Scene/Scene1/scene1-01/paper2.svg"
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
              src="/assets/Scene/Scene1/scene1-01/paper1.svg"
              alt="paper1"
              className="absolute"
              style={{
                left: "1.52%", // 58.45 / 3840
                top: "82.28%", // 888.6 / 1080
                width: "7.14%", // 274.32 / 3840
                height: "9.51%", // 102.65 / 1080
              }}
            />

            {/* Lamp */}
            <motion.img
              src="/assets/Scene/Scene1/scene1-01/lamp.svg"
              alt="lamp"
              className="absolute"
              style={{
                left: "2.96%", // 113.54 / 3840
                top: "12.05%", // 130.18 / 1080
                width: "12.46%", // 478.48 / 3840
                height: "67.85%", // 732.76 / 1080
              }}
            />

            {/* Book 1 */}
            <motion.img
              src="/assets/Scene/Scene1/scene1-01/book1.svg"
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
              src="/assets/Scene/Scene1/scene1-01/book2.svg"
              alt="book2"
              className="absolute"
              style={{
                left: "37.3%", // 1432.25 / 3840
                top: "69.98%", // 755.76 / 1080
                width: "6.17%", // 236.87 / 3840
                height: "13.41%", // 144.83 / 1080
              }}
            />

            {/* Pen */}
            <motion.img
              src="/assets/Scene/Scene1/scene1-01/pen.svg"
              alt="pen"
              className="absolute"
              style={{
                left: "38.85%", // 1491.88 / 3840
                top: "86.26%", // 931.58 / 1080
                width: "3.2%", // 122.95 / 3840
                height: "2.02%", // 21.81 / 1080
              }}
            />

            {/* Light (mix-blend-screen) */}
            <motion.img
              src="/assets/Scene/Scene1/scene1-01/light.svg"
              alt="light"
              className="absolute mix-blend-screen"
              style={{
                left: "11.92%", // 457.68 / 3840
                top: "23.18%", // 250.32 / 1080
                width: "25.5%", // 979.2 / 3840
                height: "59.89%", // 646.8 / 1080
              }}
            />

            {/* Pencil Box */}
            <motion.img
              src="/assets/Scene/Scene1/scene1-01/pencil box.svg"
              alt="pencil box"
              className="absolute"
              style={{
                left: "43.37%", // 1665.59 / 3840
                top: "67.67%", // 730.87 / 1080
                width: "2.69%", // 103.18 / 3840
                height: "15.37%", // 165.95 / 1080
              }}
            />

            {/* Post-it */}
            <motion.img
              src="/assets/Scene/Scene1/scene1-01/postit.svg"
              alt="postit"
              className="absolute"
              style={{
                left: "43.84%", // 1683.63 / 3840
                top: "85.06%", // 918.69 / 1080
                width: "2.61%", // 100.19 / 3840
                height: "4.24%", // 45.75 / 1080
              }}
            />

            {/* Human */}
            <motion.img
              src="/assets/Scene/Scene1/scene1-01/human.svg"
              alt="human"
              className="absolute"
              style={{
                left: "15.15%", // 581.75 / 3840
                top: "30.68%", // 331.33 / 1080
                width: "21.71%", // 833.69 / 3840
                height: "76.7%", // 828.35 / 1080
              }}
            />

            {/* Chair */}
            <motion.img
              src="/assets/Scene/Scene1/scene1-01/chair.svg"
              alt="chair"
              className="absolute"
              style={{
                left: "18.59%", // 714.02 / 3840
                top: "82.37%", // 889.59 / 1080
                width: "12.86%", // 493.85 / 3840
                height: "25.08%", // 270.89 / 1080
              }}
            />

            {/* Paper 4 */}
            <motion.img
              src="/assets/Scene/Scene1/scene1-01/papar4.svg"
              alt="papar4"
              className="absolute"
              style={{
                left: "10.65%", // 408.86 / 3840
                top: "68.42%", // 738.9 / 1080
                width: "2.28%", // 87.59 / 3840
                height: "8.03%", // 86.77 / 1080
              }}
            />

            {/* Light Window */}
            <motion.img
              src="/assets/Scene/Scene1/scene1-02/light window.svg"
              alt="light window"
              className="absolute"
              style={{
                right: "17.8%", // 683.59 / 3840
                bottom: "18.02%", // 194.6 / 1080*100
                width: "14.89%", // 571.79 / 3840*100
                height: "62.68%", // 676.97 / 1080*100
                y: lightWindowY,
                opacity: lightWindowOpacity,
              }}
            />

            {/* Moon */}
            <motion.img
              src="/assets/Scene/Scene1/scene1-02/moon.svg"
              alt="moon"
              className="absolute"
              style={{
                left: "68.64%", // 2635.71 / 3840
                top: "22.06%", // 238.29 / 1080
                width: "4.34%", // 166.54 / 3840
                height: "15.42%", // 166.54 / 1080
                y: skyElementsY,
                opacity: skyElementsOpacity,
              }}
            />

            {/* Stars */}
            <motion.img
              src="/assets/Scene/Scene1/scene1-02/star.svg"
              alt="stars"
              className="absolute"
              style={{
                left: "73.03%", // 2804.21 / 3840
                top: "33.93%", // 366.44 / 1080
                width: "8.32%", // 319.39 / 3840
                height: "7.37%", // 79.55 / 1080
                y: skyElementsY,
                opacity: skyElementsOpacity,
              }}
            />

            {/* Circle decorations */}
            <motion.img
              src="/assets/Scene/Scene1/scene1-02/circle.svg"
              alt="circles"
              className="absolute"
              style={{
                left: "67.12%", // 2577.73 / 3840
                top: "21.62%", // 233.52 / 1080
                width: "14.34%", // 550.65 / 3840
                height: "24.88%", // 268.66 / 1080
                y: skyElementsY,
                opacity: skyElementsOpacity,
              }}
            />

            {/* Building 2 */}
            <motion.img
              src="/assets/Scene/Scene1/scene1-02/building2.svg"
              alt="building2"
              className="absolute"
              style={{
                left: "67.31%", // 2584.62 / 3840
                top: "37.61%", // 406.23 / 1080
                width: "14.89%", // 571.79 / 3840
                height: "44.37%", // 479.17 / 1080
                y: buildingsY,
                opacity: buildingsOpacity,
              }}
            />

            {/* Building 1 */}
            <motion.img
              src="/assets/Scene/Scene1/scene1-02/building1.svg"
              alt="building1"
              className="absolute"
              style={{
                left: "67.31%", // 2584.62 / 3840
                top: "48.01%", // 518.51 / 1080
                width: "14.89%", // 571.79 / 3840
                height: "33.97%", // 366.89 / 1080
                y: buildingsY,
                opacity: buildingsOpacity,
              }}
            />

            {/* Window Frame */}
            <motion.img
              src="/assets/Scene/Scene1/scene1-02/window.svg"
              alt="window"
              className="absolute"
              style={{
                left: "60.95%", // 2340.64 / 3840
                top: "6.22%", // 67.15 / 1080
                width: "28.1%", // 1078.72 / 3840
                height: "79.63%", // 860.04 / 1080
                y: windowFrameY,
                opacity: windowFrameOpacity,
              }}
            />

            {/* Curtain 2 (Right) */}
            <motion.img
              src="/assets/Scene/Scene1/scene1-02/curtain2.svg"
              alt="curtain2"
              className="absolute"
              style={{
                left: "81.49%", // 3129.62 / 3840
                top: "8%", // 86.39 / 1080
                width: "4.87%", // 187.08 / 3840
                height: "86.95%", // 939.04 / 1080
                y: windowFrameY,
                opacity: windowFrameOpacity,
              }}
            />
            {/* Curtain 1 (Left) */}
            <motion.img
              src="/assets/Scene/Scene1/scene1-02/curtain1.svg"
              alt="curtain1"
              className="absolute"
              style={{
                left: "63.3%", // 2430.84 / 3840
                top: "7.96%", // 86.01 / 1080
                width: "4.87%", // 187.14 / 3840
                height: "86.95%", // 939.03 / 1080
                y: windowFrameY,
                opacity: windowFrameOpacity,
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
