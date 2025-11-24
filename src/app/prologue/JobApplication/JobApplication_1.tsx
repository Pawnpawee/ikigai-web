"use client";
import React, { useMemo, useState } from "react";
import { motion, useTransform, MotionValue, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import LazyLottie from "@/app/components/ui/LazyLottie";
import { useAnimationReady } from "@/app/hooks/useAnimationReady";

// 1. ลด DOM Nesting - สร้าง MotionImage แทน motion.div + Image
const MotionImage = motion.create(Image);

interface JobApplication1Props {
  scrollYProgress: MotionValue<number>;
}

export default function JobApplication1({
  scrollYProgress,
}: JobApplication1Props) {
  const shouldAnimate = useAnimationReady();

  // Overall opacity - hard cut at 0.611 (no fade)
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.611, 0.611, 1],
    [1, 1, 0, 0]
  );

  // 3. ซ่อน Container เมื่อ opacity = 0 เพื่อลดภาระ GPU
  const containerVisibility = useTransform(
    opacity,
    (v) => (v > 0 ? "visible" : "hidden")
  );

  const opacity_light = useTransform(
    scrollYProgress,
    [0.35, 0.367, 1],
    [0, 1, 1]
  );

  // ชุด 1-5: Posters (150vh = 0-0.167)
  // ชุด 1: poster11 (0-0.033 = 30vh to appear)
  const poster11Y = useTransform(scrollYProgress, [0, 0.033, 1], [100, 0, 0]);
  const poster11Opacity = useTransform(
    scrollYProgress,
    [0, 0.033, 1],
    [0, 1, 1]
  );

  // ชุด 2: poster9,10 (starts when poster11 opacity=1, 0.033-0.066)
  const poster9_10Y = useTransform(
    scrollYProgress,
    [0.033, 0.066, 1],
    [100, 0, 0]
  );
  const poster9_10Opacity = useTransform(
    scrollYProgress,
    [0.033, 0.066, 1],
    [0, 1, 1]
  );

  // ชุด 3: poster12 (0.066-0.099)
  const poster12Y = useTransform(
    scrollYProgress,
    [0.066, 0.099, 1],
    [100, 0, 0]
  );
  const poster12Opacity = useTransform(
    scrollYProgress,
    [0.066, 0.099, 1],
    [0, 1, 1]
  );

  // ชุด 4: poster13,15 (0.099-0.132)
  const poster13_15Y = useTransform(
    scrollYProgress,
    [0.099, 0.132, 1],
    [100, 0, 0]
  );
  const poster13_15Opacity = useTransform(
    scrollYProgress,
    [0.099, 0.132, 1],
    [0, 1, 1]
  );

  // ชุด 5: poster14 (0.132-0.167)
  const poster14Y = useTransform(
    scrollYProgress,
    [0.132, 0.167, 1],
    [100, 0, 0]
  );
  const poster14Opacity = useTransform(
    scrollYProgress,
    [0.132, 0.167, 1],
    [0, 1, 1]
  );

  // ชุด 6-9: (100vh = 0.167-0.278)
  // ชุด 6: poster6,1 (0.167-0.194 = 25vh)
  const poster6_1Y = useTransform(
    scrollYProgress,
    [0.167, 0.194, 1],
    [100, 0, 0]
  );
  const poster6_1Opacity = useTransform(
    scrollYProgress,
    [0.167, 0.194, 1],
    [0, 1, 1]
  );

  // ชุด 7: poster2,3,4 (0.194-0.222)
  const poster2_3_4Y = useTransform(
    scrollYProgress,
    [0.194, 0.222, 1],
    [100, 0, 0]
  );
  const poster2_3_4Opacity = useTransform(
    scrollYProgress,
    [0.194, 0.222, 1],
    [0, 1, 1]
  );

  // ชุด 8: poster7 (0.222-0.25)
  const poster7Y = useTransform(scrollYProgress, [0.222, 0.25, 1], [100, 0, 0]);
  const poster7Opacity = useTransform(
    scrollYProgress,
    [0.222, 0.25, 1],
    [0, 1, 1]
  );

  // ชุด 9: poster5,8 (0.25-0.278)
  const poster5_8Y = useTransform(
    scrollYProgress,
    [0.25, 0.278, 1],
    [100, 0, 0]
  );
  const poster5_8Opacity = useTransform(
    scrollYProgress,
    [0.25, 0.278, 1],
    [0, 1, 1]
  );

  // ชุด 10: table+computer (50vh = 0.278-0.333)
  const tableY = useTransform(scrollYProgress, [0.278, 0.305, 1], [100, 0, 0]);
  const tableOpacity = useTransform(
    scrollYProgress,
    [0.278, 0.305, 1],
    [0, 1, 1]
  );

  const computerY = useTransform(
    scrollYProgress,
    [0.305, 0.333, 1],
    [100, 0, 0]
  );
  const computerOpacity = useTransform(
    scrollYProgress,
    [0.305, 0.333, 1],
    [0, 1, 1]
  );

  // ชุด 11: paper4,lamp,book2 (50vh = 0.333-0.389)
  const paper4Y = useTransform(scrollYProgress, [0.333, 0.35, 1], [100, 0, 0]);
  const paper4Opacity = useTransform(
    scrollYProgress,
    [0.333, 0.35, 1],
    [0, 1, 1]
  );

  const lampY = useTransform(scrollYProgress, [0.35, 0.367, 1], [100, 0, 0]);
  const lampOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.367, 1],
    [0, 1, 1]
  );

  const book2Y = useTransform(scrollYProgress, [0.367, 0.389, 1], [100, 0, 0]);
  const book2Opacity = useTransform(
    scrollYProgress,
    [0.367, 0.389, 1],
    [0, 1, 1]
  );

  // ชุด 12: human (50vh = 0.389-0.444)
  const humanY = useTransform(
    scrollYProgress,
    [0.389, 0.417, 0.43, 0.444],
    [100, 0, -5, 0]
  );
  const humanOpacity = useTransform(
    scrollYProgress,
    [0.389, 0.444, 1],
    [0, 1, 1]
  );
  const humanScale = useTransform(
    scrollYProgress,
    [0.389, 0.417, 0.43, 0.444],
    [0.95, 1, 1.02, 1]
  );

  // ชุด 13: postit,paper3,paper2 (50vh = 0.444-0.5)
  const postitY = useTransform(scrollYProgress, [0.444, 0.461, 1], [100, 0, 0]);
  const postitOpacity = useTransform(
    scrollYProgress,
    [0.444, 0.461, 1],
    [0, 1, 1]
  );

  const paper3Y = useTransform(scrollYProgress, [0.461, 0.478, 1], [100, 0, 0]);
  const paper3Opacity = useTransform(
    scrollYProgress,
    [0.461, 0.478, 1],
    [0, 1, 1]
  );

  const paper2Y = useTransform(scrollYProgress, [0.478, 0.5, 1], [100, 0, 0]);
  const paper2Opacity = useTransform(
    scrollYProgress,
    [0.478, 0.5, 1],
    [0, 1, 1]
  );

  // ชุด 14: pen,pencilbox,book1 (50vh = 0.5-0.556)
  const penY = useTransform(scrollYProgress, [0.5, 0.517, 1], [100, 0, 0]);
  const penOpacity = useTransform(scrollYProgress, [0.5, 0.517, 1], [0, 1, 1]);

  const pencilBoxY = useTransform(
    scrollYProgress,
    [0.517, 0.537, 1],
    [100, 0, 0]
  );
  const pencilBoxOpacity = useTransform(
    scrollYProgress,
    [0.517, 0.537, 1],
    [0, 1, 1]
  );

  const book1Y = useTransform(scrollYProgress, [0.537, 0.556, 1], [100, 0, 0]);
  const book1Opacity = useTransform(
    scrollYProgress,
    [0.537, 0.556, 1],
    [0, 1, 1]
  );

  // 2. Lottie Optimization: เล่นเฉพาะตอนที่มองเห็น
  const [playHuman, setPlayHuman] = useState(false);
  useMotionValueEvent(humanOpacity, "change", (latest) => {
    if (latest > 0 && !playHuman) setPlayHuman(true);
    else if (latest === 0 && playHuman) setPlayHuman(false);
  });

  // Memoize style objects
  const baseStyle = useMemo(
    () => ({
      willChange: "transform, opacity" as const,
    }),
    []
  );

  return (
    <div className="flex justify-center items-center ">
      <motion.div
        className="relative w-full"
        style={{
          aspectRatio: "1920 / 2160",
          opacity,
          visibility: containerVisibility,
        }}
      >
        <motion.div className="absolute inset-0">
          {/* Layer 1: Table (ล่างสุด) */}
          <MotionImage
            src="/assets/Scene/Scene1/table.webp"
            alt="Desk table"
            width={1832}
            height={848}
            loading="lazy"
            
            sizes="100vw"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "2.29%", // 44 / 1920
              top: "86.53%", // 1869.2 / 2160
              width: "95.42%", // 1831.96 / 1920
              height: "39.27%", // 848.25 / 2160
              y: tableY,
              opacity: tableOpacity,
              ...baseStyle,
            }}
          />

          {/* ชุด 1: Poster 11 */}
          <MotionImage
            src="/assets/Scene/Scene1/poster11.webp"
            alt="Wall poster"
            width={234}
            height={180}
            loading="lazy"
            
            sizes="15vw"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "78.34%", // 1504.1 / 1920
              top: "-4.17%", // -89.97 / 2160
              width: "12.2%", // 234.34 / 1920
              height: "8.33%", // 179.93 / 2160
              y: poster11Y,
              opacity: poster11Opacity,
              ...baseStyle,
            }}
          />

          {/* ชุด 2: Poster 9, 10 */}
          <MotionImage
            src="/assets/Scene/Scene1/poster9.webp"
            alt="Wall poster"
            width={326}
            height={314}
            loading="lazy"
            
            sizes="20vw"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "77.56%", // 1489.22 / 1920
              top: "18.57%", // 401.19 / 2160
              width: "16.98%", // 325.9 / 1920
              height: "14.52%", // 313.61 / 2160
              y: poster9_10Y,
              opacity: poster9_10Opacity,
              ...baseStyle,
            }}
          />

          <MotionImage
            src="/assets/Scene/Scene1/poster10.webp"
            alt="Wall poster"
            width={279}
            height={272}
            loading="lazy"
            
            sizes="20vw"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "7.03%", // 135.06 / 1920
              top: "-1.27%", // -27.43 / 2160
              width: "14.51%", // 278.51 / 1920
              height: "12.61%", // 272.44 / 2160
              y: poster9_10Y,
              opacity: poster9_10Opacity,
              ...baseStyle,
            }}
          />

          {/* ชุด 3: Poster 12 */}
          <MotionImage
            src="/assets/Scene/Scene1/poster12.webp"
            alt="Wall poster"
            width={279}
            height={272}
            loading="lazy"
            sizes="20vw"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "50.62%", // 971.95 / 1920
              top: "10.23%", // 221.05 / 2160
              width: "14.51%", // 278.51 / 1920
              height: "12.62%", // 272.44 / 2160
              y: poster12Y,
              opacity: poster12Opacity,
              ...baseStyle,
            }}
          />

          {/* ชุด 4: Poster 13, 15 */}
          <MotionImage
            src="/assets/Scene/Scene1/poster13.webp"
            alt="Wall poster"
            width={279}
            height={272}
            loading="lazy"
            sizes="20vw"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "26.49%", // 508.67 / 1920
              top: "18.43%", // 398.11 / 2160
              width: "14.51%", // 278.51 / 1920
              height: "12.61%", // 272.44 / 2160
              y: poster13_15Y,
              opacity: poster13_15Opacity,
              ...baseStyle,
            }}
          />

          <MotionImage
            src="/assets/Scene/Scene1/poster15.webp"
            alt="Wall poster"
            width={329}
            height={314}
            loading="lazy"
            sizes="20vw"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "11.31%", // 217.14 / 1920
              top: "29.98%", // 647.66 / 2160
              width: "17.14%", // 329.03 / 1920
              height: "14.52%", // 313.62 / 2160
              y: poster13_15Y,
              opacity: poster13_15Opacity,
              ...baseStyle,
            }}
          />

          {/* ชุด 5: Poster 14 */}
          <MotionImage
            src="/assets/Scene/Scene1/poster14.webp"
            alt="Wall poster"
            width={447}
            height={314}
            loading="lazy"
            sizes="25vw"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "48.03%", // 922.22 / 1920
              top: "38.40%", // 829.49 / 2160
              width: "23.27%", // 446.75 / 1920
              height: "14.52%", // 313.61 / 2160
              y: poster14Y,
              opacity: poster14Opacity,
              ...baseStyle,
            }}
          />

          {/* ชุด 6: Poster 6, 1 */}
          <MotionImage
            src="/assets/Scene/Scene1/poster6.webp"
            alt="Wall poster"
            width={401}
            height={292}
            loading="lazy"
            sizes="25vw"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "4.14%", // 79.42 / 1920
              top: "53.79%", // 1161.79 / 2160
              width: "20.9%", // 401.42 / 1920
              height: "13.53%", // 292.31 / 2160
              y: poster6_1Y,
              opacity: poster6_1Opacity,
              ...baseStyle,
            }}
          />

          <MotionImage
            src="/assets/Scene/Scene1/poster1.webp"
            alt="Wall poster"
            width={161}
            height={89}
            loading="lazy"
            sizes="10vw"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "79.31%", // 1522.76 / 1920
              top: "74.25%", // 1603.74 / 2160
              width: "8.38%", // 160.88 / 1920
              height: "4.13%", // 89.34 / 2160
              y: poster6_1Y,
              opacity: poster6_1Opacity,
              ...baseStyle,
            }}
          />

          {/* ชุด 7: Poster 2, 3, 4 */}

          <MotionImage
            src="/assets/Scene/Scene1/poster2.webp"
            alt="Wall poster"
            width={189}
            height={134}
            loading="lazy"
            sizes="10vw"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "13.16%", // 252.75 / 1920
              top: "70.4%", // 1520.62 / 2160
              width: "9.85%", // 189.15 / 1920
              height: "6.22%", // 134.42 / 2160
              y: poster2_3_4Y,
              opacity: poster2_3_4Opacity,
              ...baseStyle,
            }}
          />

          <MotionImage
            src="/assets/Scene/Scene1/poster4.webp"
            alt="Wall poster"
            width={299}
            height={320}
            loading="lazy"
            sizes="20vw"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "78.33%", // 1504.01 / 1920
              top: "54.28%", // 1172.38 / 2160
              width: "15.59%", // 299.42 / 1920
              height: "14.81%", // 320.06 / 2160
              y: poster2_3_4Y,
              opacity: poster2_3_4Opacity,
              ...baseStyle,
            }}
          />

          <MotionImage
            src="/assets/Scene/Scene1/poster3.webp"
            alt="Wall poster"
            width={130}
            height={166}
            loading="lazy"
            sizes="10vw"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "91.36%", // 1754.16 / 1920
              top: "60.52%", // 1307.23 / 2160
              width: "6.79%", // 130.42 / 1920
              height: "7.69%", // 166.06 / 2160
              y: poster2_3_4Y,
              opacity: poster2_3_4Opacity,
              ...baseStyle,
            }}
          />

          {/* ชุด 8: Poster 7 */}
          <MotionImage
            src="/assets/Scene/Scene1/poster7.webp"
            alt="Wall poster"
            width={210}
            height={218}
            loading="lazy"
            sizes="15vw"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "92.36%", // 1773.25 / 1920
              top: "72.21%", // 1559.73 / 2160
              width: "10.96%", // 210.42 / 1920
              height: "10.07%", // 217.58 / 2160
              y: poster7Y,
              opacity: poster7Opacity,
              ...baseStyle,
            }}
          />

          {/* ชุด 9: Poster 5, 8 */}
          <motion.div
            className="absolute"
            style={{
              left: "-1.51%", // -29.01 / 1920
              top: "64.28%", // 1388.41 / 2160
              width: "10.92%", // 209.7 / 1920
              height: "10.46%", // 225.99 / 2160
              y: poster5_8Y,
              opacity: poster5_8Opacity,
              ...baseStyle,
            }}
          >
            <Image
              src="/assets/Scene/Scene1/poster5.webp"
              alt="Wall poster"
              fill
              loading="lazy"
              sizes="15vw"
              style={{ objectFit: "contain" }}
            />
          </motion.div>

          <MotionImage
            src="/assets/Scene/Scene1/poster8.webp"
            alt="Wall poster"
            width={246}
            height={190}
            loading="lazy"
            sizes="15vw"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "105.35%",
              top: "59.03%", // 1275.12 / 2160
              width: "12.81%", // 245.99 / 1920
              height: "8.82%", // 190.41 / 2160
              y: poster5_8Y,
              opacity: poster5_8Opacity,
              ...baseStyle,
            }}
          />

          {/* ชุด 10: Computer */}
          <MotionImage
            src="/assets/Scene/Scene1/Computer.webp"
            alt="Computer workstation"
            width={958}
            height={759}
            priority
            sizes="50vw"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "25.06%", // 481.2 / 1920
              top: "57.14%", // 1234.19 / 2160
              width: "49.88%", // 957.6 / 1920
              height: "35.14%", // 758.98 / 2160
              y: computerY,
              opacity: computerOpacity,
              ...baseStyle,
            }}
          />

          {/* ชุด 13: Paper 3 */}
          <MotionImage
            src="/assets/Scene/Scene1/paper3.webp"
            alt="Paper document"
            width={265}
            height={103}
            loading="lazy"
            sizes="15vw"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "84.79%", // 1627.93 / 1920
              top: "88.62%", // 1914.27 / 2160
              width: "13.8%", // 264.98 / 1920
              height: "4.75%", // 102.65 / 2160
              y: paper3Y,
              opacity: paper3Opacity,
              ...baseStyle,
            }}
          />

          {/* ชุด 13: Paper 2 */}
          <MotionImage
            src="/assets/Scene/Scene1/paper2.webp"
            alt="Paper document"
            width={219}
            height={95}
            loading="lazy"
            sizes="15vw"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "3.21%", // 61.66 / 1920
              top: "88.91%", // 1920.39 / 2160
              width: "11.39%", // 218.83 / 1920
              height: "4.39%", // 94.89 / 2160
              y: paper2Y,
              opacity: paper2Opacity,
              ...baseStyle,
            }}
          />

          {/* Paper 1 - static, not animated */}
          <MotionImage
            src="/assets/Scene/Scene1/paper1.webp"
            alt="Paper document"
            width={274}
            height={103}
            loading="lazy"
            sizes="15vw"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "3.04%", // 58.45 / 1920
              top: "91.14%", // 1968.6 / 2160
              width: "14.29%", // 274.32 / 1920
              height: "4.75%", // 102.65 / 2160
              y: paper2Y,
              opacity: paper2Opacity,
              ...baseStyle,
            }}
          />

          {/* ชุด 11: Lamp */}
          <MotionImage
            src="/assets/Scene/Scene1/lamp.webp"
            alt="Desk lamp"
            width={478}
            height={733}
            loading="lazy"
            sizes="30vw"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "5.91%", // 113.54 / 1920
              top: "56.03%", // 1210.18 / 2160
              width: "24.92%", // 478.48 / 1920
              height: "33.92%", // 732.76 / 2160
              y: lampY,
              opacity: lampOpacity,
              ...baseStyle,
            }}
          />

          {/* ชุด 14: Book 1 */}
          <MotionImage
            src="/assets/Scene/Scene1/book1.webp"
            alt="Book"
            width={206}
            height={124}
            loading="lazy"
            sizes="15vw"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "17.99%", // 345.38 / 1920
              top: "88.97%", // 1921.65 / 2160
              width: "10.74%", // 206.33 / 1920
              height: "5.75%", // 124.14 / 2160
              y: book1Y,
              opacity: book1Opacity,
              ...baseStyle,
            }}
          />

          {/* ชุด 11: Book 2 */}
          <MotionImage
            src="/assets/Scene/Scene1/book2.webp"
            alt="Book"
            width={237}
            height={145}
            loading="lazy"
            sizes="15vw"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "74.6%", // 1432.25 / 1920
              top: "84.99%", // 1835.76 / 2160
              width: "12.34%", // 236.87 / 1920
              height: "6.7%", // 144.83 / 2160
              y: book2Y,
              opacity: book2Opacity,
              ...baseStyle,
            }}
          />

          {/* ชุด 14: Pen */}
          <MotionImage
            src="/assets/Scene/Scene1/pen.webp"
            alt="Pen"
            width={123}
            height={22}
            loading="lazy"
            sizes="10vw"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "77.7%", // 1491.88 / 1920
              top: "93.13%", // 2011.58 / 2160
              width: "6.4%", // 122.95 / 1920
              height: "1.01%", // 21.81 / 2160
              y: penY,
              opacity: penOpacity,
              ...baseStyle,
            }}
          />

          {/* Layer 8: Light (mix-blend-screen) */}
          <MotionImage
            src="/assets/Scene/Scene1/light.webp"
            alt=""
            width={979}
            height={647}
            loading="lazy"
            sizes="60vw"
            className="absolute mix-blend-screen"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "23.84%", // 457.68 / 1920
              top: "61.59%", // 1330.32 / 2160
              width: "51%", // 979.2 / 1920
              height: "29.94%", // 646.8 / 2160
              opacity: opacity_light,
              ...baseStyle,
            }}
          />

          {/* ชุด 14: Pencil Box */}
          <MotionImage
            src="/assets/Scene/Scene1/pencil box.webp"
            alt="Pencil box"
            width={103}
            height={166}
            loading="lazy"
            sizes="10vw"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "86.76%", // 1665.59 / 1920
              top: "83.84%", // 1810.87 / 2160
              width: "5.37%", // 103.18 / 1920
              height: "7.68%", // 165.95 / 2160
              y: pencilBoxY,
              opacity: pencilBoxOpacity,
              ...baseStyle,
            }}
          />

          {/* ชุด 13: Post-it */}
          <MotionImage
            src="/assets/Scene/Scene1/postit.webp"
            alt="Post-it note"
            width={100}
            height={46}
            loading="lazy"
            sizes="10vw"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "87.69%", // 1683.63 / 1920
              top: "92.53%", // 1998.69 / 2160
              width: "5.22%", // 100.19 / 1920
              height: "2.12%", // 45.75 / 2160
              y: postitY,
              opacity: postitOpacity,
              ...baseStyle,
            }}
          />

          {/* ชุด 11: Paper 4 */}
          <MotionImage
            src="/assets/Scene/Scene1/paper4.webp"
            alt="Paper document"
            width={88}
            height={87}
            loading="lazy"
            sizes="10vw"
            style={{
              position: "absolute",
              objectFit: "contain",
              left: "21.29%", // 408.86 / 1920
              top: "84.21%", // 1818.9 / 2160
              width: "4.56%", // 87.59 / 1920
              height: "4.02%", // 86.77 / 2160
              y: paper4Y,
              opacity: paper4Opacity,
              ...baseStyle,
            }}
          />

          {/* Layer 12: Human (Lottie Animation - บนสุด) */}
          <motion.div
            className="absolute"
            style={{
              left: "30.3%", // 581.73 / 1920
              top: "65.32%", // 1411 / 2160
              width: "43.41%", // 833.55 / 1920
              height: "67.03%", // 1447.89 / 2160
              y: humanY,
              opacity: humanOpacity,
              scale: humanScale,
              ...baseStyle,
            }}
          >
            <LazyLottie
              src="/assets/Scene/Scene1/human.lottie"
              className="w-full h-full"
              loop={true}
              autoplay={playHuman}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
