"use client";
import React, { useMemo, useState } from "react";
import { motion, useTransform, MotionValue, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import LazyLottie from "@/app/components/ui/LazyLottie";
import { useIsPortrait } from "@/app/hooks/useOrientation";
import { useAnimationReady } from "@/app/hooks/useAnimationReady";

// Create MotionImage to reduce DOM nesting (motion.div + Image -> MotionImage)
const MotionImage = motion.create(Image);

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

  const shouldAnimate = useAnimationReady();

  // Memoize style objects
  const baseStyle = useMemo(
    () => ({
      willChange: "transform, opacity" as const,
    }),
    []
  );

  // Control play state for Scene 2 Lotties (moon & human)
  const [playScene2, setPlayScene2] = useState(false);
  useMotionValueEvent(opacity, "change", (latest) => {
    if (latest > 0.1 && !playScene2) setPlayScene2(true);
    else if (latest <= 0.1 && playScene2) setPlayScene2(false);
  });

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
            <MotionImage
              src="/assets/Scene/Scene1/table.webp"
              alt="Desk table"
              width={1832}
              height={848}
              loading="lazy"
              sizes="50vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "1.15%",
                top: "73.07%",
                width: "47.71%",
                height: "78.54%",
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
              sizes="10vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "39.17%",
                top: "-108.33%",
                width: "6.1%",
                height: "16.66%",
                ...baseStyle,
              }}
            />

            {/* ชุด 2: Poster 9 */}
            <MotionImage
              src="/assets/Scene/Scene1/poster9.webp"
              alt="Wall poster"
              width={326}
              height={314}
              loading="lazy"
              sizes="10vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "38.78%",
                top: "-62.86%",
                width: "8.49%",
                height: "29.04%",
                ...baseStyle,
              }}
            />

            <MotionImage
              src="/assets/Scene/Scene1/poster10.webp"
              alt="Wall poster"
              width={279}
              height={272}
              loading="lazy"
              sizes="10vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "3.52%",
                top: "-102.54%",
                width: "7.25%",
                height: "25.23%",
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
              sizes="10vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "25.31%",
                top: "-79.54%",
                width: "7.25%",
                height: "25.23%",
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
              sizes="10vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "13.24%",
                top: "-63.14%",
                width: "7.25%",
                height: "25.23%",
                ...baseStyle,
              }}
            />

            <MotionImage
              src="/assets/Scene/Scene1/poster15.webp"
              alt="Wall poster"
              width={329}
              height={314}
              loading="lazy"
              sizes="10vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "5.65%",
                top: "-40.03%",
                width: "8.57%",
                height: "29.04%",
                ...baseStyle,
              }}
            />

            {/* Layer 2: Posters - Background elements */}
            {/* Poster 14 */}
            <MotionImage
              src="/assets/Scene/Scene1/poster14.webp"
              alt="Wall poster"
              width={447}
              height={314}
              loading="lazy"
              sizes="15vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "24.01%",
                top: "-23.2%",
                width: "11.64%",
                height: "29.04%",
                ...baseStyle,
              }}
            />

            {/* Poster 8 */}
            <MotionImage
              src="/assets/Scene/Scene1/poster8.webp"
              alt="Wall poster"
              width={246}
              height={190}
              loading="lazy"
              sizes="10vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "52.71%",
                top: "18.07%",
                width: "6.41%",
                height: "17.63%",
                ...baseStyle,
              }}
            />

            {/* Poster 7 */}
            <MotionImage
              src="/assets/Scene/Scene1/poster7.webp"
              alt="Wall poster"
              width={210}
              height={218}
              loading="lazy"
              sizes="10vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "46.18%",
                top: "44.42%",
                width: "5.48%",
                height: "20.15%",
                ...baseStyle,
              }}
            />

            {/* Poster 6 */}
            <MotionImage
              src="/assets/Scene/Scene1/poster6.webp"
              alt="Wall poster"
              width={401}
              height={292}
              loading="lazy"
              sizes="15vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "2.07%",
                top: "7.57%",
                width: "10.45%",
                height: "27.07%",
                ...baseStyle,
              }}
            />

            {/* Poster 5 */}
            <MotionImage
              src="/assets/Scene/Scene1/poster5.webp"
              alt="Wall poster"
              width={210}
              height={226}
              loading="lazy"
              sizes="10vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "-0.76%",
                top: "28.56%",
                width: "5.46%",
                height: "20.92%",
                ...baseStyle,
              }}
            />

            {/* Poster 4 */}
            <MotionImage
              src="/assets/Scene/Scene1/poster4.webp"
              alt="Wall poster"
              width={299}
              height={320}
              loading="lazy"
              sizes="10vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "39.17%",
                top: "8.55%",
                width: "7.8%",
                height: "29.64%",
                ...baseStyle,
              }}
            />

            {/* Poster 3 */}
            <MotionImage
              src="/assets/Scene/Scene1/poster3.webp"
              alt="Wall poster"
              width={130}
              height={166}
              loading="lazy"
              sizes="5vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "45.68%",
                top: "21.04%",
                width: "3.4%",
                height: "15.37%",
                ...baseStyle,
              }}
            />

            {/* Poster 2 */}
            <MotionImage
              src="/assets/Scene/Scene1/poster2.webp"
              alt="Wall poster"
              width={189}
              height={134}
              loading="lazy"
              sizes="5vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "6.58%",
                top: "40.8%",
                width: "4.93%",
                height: "12.45%",
                ...baseStyle,
              }}
            />

            {/* Poster 1 */}
            <MotionImage
              src="/assets/Scene/Scene1/poster1.webp"
              alt="Wall poster"
              width={161}
              height={89}
              loading="lazy"
              sizes="5vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "39.66%",
                top: "48.5%",
                width: "4.19%",
                height: "8.27%",
                ...baseStyle,
              }}
            />

            {/* Layer 3: Computer */}
            <MotionImage
              src="/assets/Scene/Scene1/Computer.webp"
              alt="Computer workstation"
              width={958}
              height={759}
              priority
              loading="eager"
              sizes="30vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "12.53%",
                top: "14.28%",
                width: "24.94%",
                height: "70.28%",
                ...baseStyle,
              }}
            />

            {/* Layer 4: Papers */}
            {/* Paper 3 */}
            <MotionImage
              src="/assets/Scene/Scene1/paper3.webp"
              alt="Paper document"
              width={265}
              height={103}
              loading="lazy"
              sizes="10vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "42.4%",
                top: "77.25%",
                width: "6.9%",
                height: "9.51%",
                ...baseStyle,
              }}
            />

            {/* Paper 2 */}
            <MotionImage
              src="/assets/Scene/Scene1/paper2.webp"
              alt="Paper document"
              width={219}
              height={95}
              loading="lazy"
              sizes="10vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "1.61%",
                top: "77.81%",
                width: "5.7%",
                height: "8.79%",
                ...baseStyle,
              }}
            />

            {/* Paper 1 */}
            <MotionImage
              src="/assets/Scene/Scene1/paper1.webp"
              alt="Paper document"
              width={274}
              height={103}
              loading="lazy"
              sizes="10vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "1.52%",
                top: "82.28%",
                width: "7.14%",
                height: "9.51%",
                ...baseStyle,
              }}
            />

            {/* Layer 5: Lamp */}
            <MotionImage
              src="/assets/Scene/Scene1/lamp.webp"
              alt="Desk lamp"
              width={478}
              height={733}
              loading="lazy"
              sizes="15vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "2.96%",
                top: "12.05%",
                width: "12.46%",
                height: "67.85%",
                ...baseStyle,
              }}
            />

            {/* Layer 6: Books */}
            {/* Book 1 */}
            <MotionImage
              src="/assets/Scene/Scene1/book1.webp"
              alt="Book"
              width={206}
              height={124}
              loading="lazy"
              sizes="10vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "8.99%",
                top: "77.93%",
                width: "5.37%",
                height: "11.49%",
                ...baseStyle,
              }}
            />

            {/* Book 2 */}
            <MotionImage
              src="/assets/Scene/Scene1/book2.webp"
              alt="Book"
              width={237}
              height={145}
              loading="lazy"
              sizes="10vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "37.3%",
                top: "69.98%",
                width: "6.17%",
                height: "13.41%",
                ...baseStyle,
              }}
            />

            {/* Layer 7: Pen */}
            <MotionImage
              src="/assets/Scene/Scene1/pen.webp"
              alt="Pen"
              width={123}
              height={22}
              loading="lazy"
              sizes="5vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "38.85%",
                top: "86.26%",
                width: "3.2%",
                height: "2.02%",
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
              sizes="30vw"
              className="absolute mix-blend-screen"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "11.92%",
                top: "23.18%",
                width: "25.5%",
                height: "59.89%",
                ...baseStyle,
              }}
            />

            {/* Layer 9: Pencil Box */}
            <MotionImage
              src="/assets/Scene/Scene1/pencil box.webp"
              alt="Pencil box"
              width={103}
              height={166}
              loading="lazy"
              sizes="5vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "43.37%",
                top: "67.67%",
                width: "2.69%",
                height: "15.37%",
                ...baseStyle,
              }}
            />

            {/* Layer 10: Post-it */}
            <MotionImage
              src="/assets/Scene/Scene1/postit.webp"
              alt="Post-it note"
              width={100}
              height={46}
              loading="lazy"
              sizes="5vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "43.84%",
                top: "85.06%",
                width: "2.61%",
                height: "4.24%",
                ...baseStyle,
              }}
            />

            {/* Layer 11: Paper 4 */}
            <MotionImage
              src="/assets/Scene/Scene1/paper4.webp"
              alt="Paper document"
              width={88}
              height={87}
              loading="lazy"
              sizes="5vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "10.65%",
                top: "68.42%",
                width: "2.28%",
                height: "8.03%",
                ...baseStyle,
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
                ...baseStyle,
              }}
            >
              <LazyLottie
                src="/assets/Scene/Scene1/human.lottie"
                className="w-full h-full"
                loop={true}
                autoplay={playScene2}
              />
            </motion.div>

            {/* ชุด 2: Light Window */}
            <MotionImage
              src="/assets/Scene/Scene1/light window.webp"
              alt="Window light glow"
              width={571}
              height={677}
              loading="lazy"
              sizes="20vw"
              style={{
                position: "absolute",
                objectFit: "contain",
                left: "67.31%",
                top: "19.3%",
                width: "14.89%",
                height: "62.68%",
                opacity: lightWindowOpacity,
                ...baseStyle,
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
                ...baseStyle,
              }}
            >
              <LazyLottie
                src="/assets/Scene/Scene1/moon.lottie"
                className="w-full h-full"
                loop={true}
                autoplay={playScene2}
              />
            </motion.div>

            {/* ชุด 4: Stars */}
            <motion.div
              className="absolute"
              style={{
                left: "73.03%", // 2804.21 / 3840
                top: "33.93%", // 366.44 / 1080
                width: "8.32%", // 319.39 / 3840
                height: "7.37%", // 79.55 / 1080
                y: building2Y,
                opacity: building2Opacity,
                ...baseStyle,
              }}
            >
              <Image
                src="/assets/Scene/Scene1/star.webp"
                alt="Stars decoration"
                fill
                loading="lazy"
                
                sizes="10vw"
                style={{ objectFit: "contain" }}
              />
            </motion.div>

            {/* ชุด 5: Circle decorations */}
            <motion.div
              className="absolute"
              style={{
                left: "67.12%", // 2577.73 / 3840
                top: "21.62%", // 233.52 / 1080
                width: "14.34%", // 550.65 / 3840
                height: "24.88%", // 268.66 / 1080
                y: building1Y,
                opacity: building1Opacity,
                ...baseStyle,
              }}
            >
              <Image
                src="/assets/Scene/Scene1/circle.webp"
                alt="Decorative circles"
                fill
                loading="lazy"
                
                sizes="20vw"
                style={{ objectFit: "contain" }}
              />
            </motion.div>

            {/* ชุด 4: Building 2 */}
            <motion.div
              className="absolute"
              style={{
                left: "67.31%", // 2584.62 / 3840
                top: "37.61%", // 406.23 / 1080
                width: "14.89%", // 571.79 / 3840
                height: "44.37%", // 479.17 / 1080
                y: building2Y,
                opacity: building2Opacity,
                ...baseStyle,
              }}
            >
              <Image
                src="/assets/Scene/Scene1/building2.webp"
                alt="Building exterior"
                fill
                loading="lazy"
                
                sizes="20vw"
                style={{ objectFit: "contain" }}
              />
            </motion.div>

            {/* ชุด 5: Building 1 */}
            <motion.div
              className="absolute"
              style={{
                left: "67.31%", // 2584.62 / 3840
                top: "48.01%", // 518.51 / 1080
                width: "14.89%", // 571.79 / 3840
                height: "33.97%", // 366.89 / 1080
                y: building1Y,
                opacity: building1Opacity,
                ...baseStyle,
              }}
            >
              <Image
                src="/assets/Scene/Scene1/building1.webp"
                alt="Building exterior"
                fill
                loading="lazy"
                
                sizes="20vw"
                style={{ objectFit: "contain" }}
              />
            </motion.div>

            {/* ชุด 1: Window Frame */}
            <motion.div
              className="absolute"
              style={{
                left: "60.95%", // 2340.64 / 3840
                top: "6.22%", // 67.15 / 1080
                width: "28.1%", // 1078.72 / 3840
                height: "79.63%", // 860.04 / 1080
                y: windowY,
                opacity: windowOpacity,
                ...baseStyle,
              }}
            >
              <Image
                src="/assets/Scene/Scene1/window.webp"
                alt="Window frame"
                fill
                loading="lazy"
                
                sizes="30vw"
                style={{ objectFit: "contain" }}
              />
            </motion.div>

            {/* ชุด 3: Curtain 2 (Right) */}
            <motion.div
              className="absolute"
              style={{
                left: "81.49%", // 3129.62 / 3840
                top: "8%", // 86.39 / 1080
                width: "4.87%", // 187.08 / 3840
                height: "86.95%", // 939.04 / 1080
                y: curtainY,
                opacity: curtainOpacity,
                ...baseStyle,
              }}
            >
              <Image
                src="/assets/Scene/Scene1/curtain2.webp"
                alt="Window curtain"
                fill
                loading="lazy"
                
                sizes="10vw"
                style={{ objectFit: "contain" }}
              />
            </motion.div>

            {/* ชุด 3: Curtain 1 (Left - บนสุด) */}
            <motion.div
              className="absolute"
              style={{
                left: "63.3%", // 2430.84 / 3840
                top: "7.96%", // 86.01 / 1080
                width: "4.87%", // 187.14 / 3840
                height: "86.95%", // 939.03 / 1080
                y: curtainY,
                opacity: curtainOpacity,
                ...baseStyle,
              }}
            >
              <Image
                src="/assets/Scene/Scene1/curtain1.webp"
                alt="Window curtain"
                fill
                loading="lazy"
                
                sizes="10vw"
                style={{ objectFit: "contain" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
