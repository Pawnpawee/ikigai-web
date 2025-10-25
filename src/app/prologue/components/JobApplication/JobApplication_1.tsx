"use client";
import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

interface JobApplication1Props {
  scrollYProgress: MotionValue<number>;
}

export default function JobApplication1({
  scrollYProgress,
}: JobApplication1Props) {
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.51, 0.55, 1],
    [1, 1, 0, 0]
  );

  const opacity_light = useTransform(
    scrollYProgress,
    [0, 0.51, 0.51, 1],
    [1, 1, 0, 0]
  );
  return (
    <div className="flex justify-center items-center">
      <motion.div
        className="relative  w-full"
        style={{
          aspectRatio: "1920 / 2160",
          opacity,
        }}
      >
        <motion.div className="absolute inset-0">
          {/* Table */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/table.svg"
            alt="table"
            className="absolute"
            style={{
              left: "2.29%", // 44.02 / 1920
              top: "86.55%", // 1869.53 / 2160
              width: "95.42%", // 1831.96 / 1920
              height: "17.14%", // 370.16 / 2160
            }}
          />

          {/* Poster 15 */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/poster15.svg"
            alt=""
            className="absolute"
            style={{
              left: "11.31%", // 217.14 / 1920
              top: "29.98%", // 647.66 / 2160
              width: "17.14%", // 329.03 / 1920
              height: "14.52%", // 313.62 / 2160
            }}
          />

          {/* Poster 14 */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/poster14.svg"
            alt=""
            className="absolute"
            style={{
              left: "48.03%", // 922.22 / 1920
              top: "38.40%", // 829.49 / 2160
              width: "23.27%", // 446.75 / 1920
              height: "14.52%", // 313.61 / 2160
            }}
          />

          {/* Poster 13 */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/poster13.svg"
            alt=""
            className="absolute"
            style={{
              left: "26.49%", // 508.67 / 1920
              top: "18.43%", // 398.11 / 2160
              width: "14.51%", // 278.51 / 1920
              height: "12.61%", // 272.44 / 2160
            }}
          />

          {/* Poster 12 */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/poster12.svg"
            alt=""
            className="absolute"
            style={{
              left: "50.62%", // 971.95 / 1920
              top: "10.23%", // 221.05 / 2160
              width: "14.51%", // 278.51 / 1920
              height: "12.62%", // 272.44 / 2160
            }}
          />

          {/* Poster 11 */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/poster11.svg"
            alt=""
            className="absolute"
            style={{
              left: "78.34%", // 1504.1 / 1920
              top: "-4.17%", // -89.97 / 2160
              width: "12.2%", // 234.34 / 1920
              height: "8.33%", // 179.93 / 2160
            }}
          />

          {/* Poster 10 */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/poster10.svg"
            alt=""
            className="absolute"
            style={{
              left: "7.03%", // 135.06 / 1920
              top: "-1.27%", // -27.43 / 2160
              width: "14.51%", // 278.51 / 1920
              height: "12.61%", // 272.44 / 2160
            }}
          />

          {/* Poster 9 */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/poster9.svg"
            alt=""
            className="absolute"
            style={{
              left: "77.56%", // 1489.22 / 1920
              top: "18.57%", // 401.19 / 2160
              width: "16.98%", // 325.9 / 1920
              height: "14.52%", // 313.61 / 2160
            }}
          />

          {/* Poster 8 */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-02/poster8.svg"
            alt="poster8"
            className="absolute"
            style={{
              left: "105.35%",
              top: "59.03%", // 1275.12 / 2160
              width: "12.81%", // 245.99 / 1920
              height: "8.82%", // 190.41 / 2160
            }}
          />

          {/* Poster 7 */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/poster7.svg"
            alt=""
            className="absolute"
            style={{
              left: "92.36%", // 1773.25 / 1920
              top: "72.21%", // 1559.73 / 2160
              width: "10.96%", // 210.42 / 1920
              height: "10.07%", // 217.58 / 2160
            }}
          />

          {/* Poster 6 */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/poster6.svg"
            alt=""
            className="absolute"
            style={{
              left: "4.14%", // 79.42 / 1920
              top: "53.79%", // 1161.79 / 2160
              width: "20.9%", // 401.42 / 1920
              height: "13.53%", // 292.31 / 2160
            }}
          />

          {/* Poster 5 */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/poster5.svg"
            alt="poster5"
            className="absolute"
            style={{
              left: "-1.51%", // -29.01 / 1920
              top: "64.28%", // 1388.41 / 2160
              width: "12.1%", // 209.7 / 1920
              height: "10.46%", // 225.99 / 2160
            }}
          />

          {/* Poster 4 */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/poster4.svg"
            alt=""
            className="absolute"
            style={{
              left: "78.33%", // 1504.01 / 1920
              top: "54.28%", // 1172.38 / 2160
              width: "15.6%", // 299.42 / 1920
              height: "14.81%", // 320.06 / 2160
            }}
          />

          {/* Poster 3 */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/poster3.svg"
            alt=""
            className="absolute"
            style={{
              left: "91.36%", // 1754.16 / 1920
              top: "60.52%", // 1307.23 / 2160
              width: "6.8%", // 130.42 / 1920
              height: "7.69%", // 166.06 / 2160
            }}
          />

          {/* Poster 2 */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/poster2.svg"
            alt=""
            className="absolute"
            style={{
              left: "13.16%", // 252.75 / 1920
              top: "70.4%", // 1520.62 / 2160
              width: "9.86%", // 189.15 / 1920
              height: "6.22%", // 134.42 / 2160
            }}
          />

          {/* Poster 1 */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/poster1.svg"
            alt=""
            className="absolute"
            style={{
              left: "79.31%", // 1522.76 / 1920
              top: "74.25%", // 1603.74 / 2160
              width: "8.38%", // 160.88 / 1920
              height: "4.13%", // 89.34 / 2160
            }}
          />

          {/* Computer */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/Computer.svg"
            alt="computer"
            className="absolute"
            style={{
              left: "25.06%", // 481.2 / 1920
              top: "57.14%", // 1234.19 / 2160
              width: "49.88%", // 957.6 / 1920
              height: "35.14%", // 758.98 / 2160
            }}
          />

          {/* Paper 3 */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/paper3.svg"
            alt="paper3"
            className="absolute"
            style={{
              left: "84.79%", // 1627.93 / 1920
              top: "88.62%", // 1914.27 / 2160
              width: "13.8%", // 264.98 / 1920
              height: "4.75%", // 102.65 / 2160
            }}
          />

          {/* Paper 2 */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/paper2.svg"
            alt="paper2"
            className="absolute"
            style={{
              left: "3.21%", // 61.66 / 1920
              top: "88.91%", // 1920.39 / 2160
              width: "11.4%", // 218.83 / 1920
              height: "4.39%", // 94.89 / 2160
            }}
          />

          {/* Paper 1 */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/paper1.svg"
            alt="paper1"
            className="absolute"
            style={{
              left: "3.04%", // 58.45 / 1920
              top: "91.14%", // 1968.6 / 2160
              width: "14.29%", // 274.32 / 1920
              height: "4.75%", // 102.65 / 2160
            }}
          />

          {/* Lamp */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/lamp.svg"
            alt="lamp"
            className="absolute"
            style={{
              left: "5.91%", // 113.54 / 1920
              top: "56.03%", // 1210.18 / 2160
              width: "24.92%", // 478.48 / 1920
              height: "33.92%", // 732.76 / 2160
            }}
          />

          {/* Book 1 */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/book1.svg"
            alt="book1"
            className="absolute"
            style={{
              left: "17.99%", // 345.38 / 1920
              top: "88.97%", // 1921.65 / 2160
              width: "10.74%", // 206.33 / 1920
              height: "5.75%", // 124.14 / 2160
            }}
          />

          {/* Book 2 */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/book2.svg"
            alt="book2"
            className="absolute"
            style={{
              left: "74.6%", // 1432.25 / 1920
              top: "84.99%", // 1835.76 / 2160
              width: "12.34%", // 236.87 / 1920
              height: "6.7%", // 144.83 / 2160
            }}
          />

          {/* Pen */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/pen.svg"
            alt="pen"
            className="absolute"
            style={{
              left: "77.7%", // 1491.88 / 1920
              top: "93.13%", // 2011.58 / 2160
              width: "6.4%", // 122.95 / 1920
              height: "1.01%", // 21.81 / 2160
            }}
          />

          {/* Light (mix-blend-screen) */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/light.svg"
            alt="light"
            className="absolute mix-blend-screen"
            style={{
              left: "23.84%", // 457.68 / 1920
              top: "61.59%", // 1330.32 / 2160
              width: "51%", // 979.2 / 1920
              height: "29.94%", // 646.8 / 2160
              opacity: opacity_light
            }}
          />

          {/* Pencil Box */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/pencil box.svg"
            alt="pencil box"
            className="absolute"
            style={{
              left: "86.76%", // 1665.59 / 1920
              top: "83.84%", // 1810.87 / 2160
              width: "5.37%", // 103.18 / 1920
              height: "7.69%", // 165.95 / 2160
            }}
          />

          {/* Post-it */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/postit.svg"
            alt="postit"
            className="absolute"
            style={{
              left: "87.69%", // 1683.63 / 1920
              top: "92.53%", // 1998.69 / 2160
              width: "5.22%", // 100.19 / 1920
              height: "2.12%", // 45.75 / 2160
            }}
          />

          {/* Human */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/human.svg"
            alt="human"
            className="absolute"
            style={{
              left: "30.3%", // 581.75 / 1920
              top: "65.34%", // 1411.33 / 2160
              width: "43.42%", // 833.69 / 1920
              height: "38.35%", // 828.35 / 2160
            }}
          />

          {/* Chair */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/chair.svg"
            alt="chair"
            className="absolute"
            style={{
              left: "37.19%", // 714.02 / 1920
              top: "91.19%", // 1969.59 / 2160
              width: "25.72%", // 493.85 / 1920
              height: "12.54%", // 270.89 / 2160
            }}
          />

          {/* Paper 4 */}
          <motion.img
            src="/assets/Scene/Scene1/scene1-01/papar4.svg"
            alt="papar4"
            className="absolute"
            style={{
              left: "21.29%", // 408.86 / 1920
              top: "84.21%", // 1818.9 / 2160
              width: "4.56%", // 87.59 / 1920
              height: "4.02%", // 86.77 / 2160
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
