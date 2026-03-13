"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { getJsonUrl } from "@/utils/cloudinaryUtils";
import GradientButton from "../components/button/GradientButton";
import LazyLottie from "../components/reusable/LazyLottie";
import SceneLayer, {
  type AnimationMap,
} from "../components/reusable/SceneLayer";
import WordByWordAnimation from "../components/text/WordByWordAnimation";
import { useDevice } from "../contexts/DeviceContext";
import {
  TEMPLE_ARRIVAL_ITEMS,
  TEMPLE_DIALOGUE,
} from "../data/scene_temple.data";

//? Scene 10.2: Temple Weighing - ฉากวิหารชั่งหัวใจ
//? Scroll: 400vh (300vh temple + 100vh button area)
//? เหมือน Weighing.tsx แต่ไม่มี human falling, เพิ่ม cat + ปุ่มชั่งหัวใจ

interface TempleArrivalProps {
  onStartCeremony: () => void;
}

export default function TempleArrival({ onStartCeremony }: TempleArrivalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { isMobile } = useDevice();
  const [fadeOut, setFadeOut] = useState(false);

  const handleStartCeremony = () => {
    setFadeOut(true);
    onStartCeremony();
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // ============ OPACITY ============
  //? Main opacity - fade in ตอนเริ่ม
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 1],
  );

  //? Inside scene opacity
  const insideOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  // ============ SET 4: BUILDING + GROUND (0.05-0.15) ============
  const set4Opacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const set4Y = useTransform(scrollYProgress, [0.05, 0.15], [100, 0]);

  // ============ SET 6: SCALE + PLATES (0.2-0.3) ============
  const set6Opacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const set6Y = useTransform(scrollYProgress, [0.2, 0.3], [100, 0]);

  // ============ ZOOM (0.3-0.5) ============
  const containerScale = useTransform(
    scrollYProgress,
    [0.3, 0.5],
    isMobile ? [2.3, 4] : [1, 2],
  );
  const containerTop = useTransform(
    scrollYProgress,
    [0.3, 0.5],
    isMobile ? ["-1%", "-3%"] : ["0%", "-7%"],
  );

  //? Derive z_move จาก containerScale เพื่อใช้กับ perspective 3D
  const z_move = useTransform(containerScale, (s) => {
    const scale = Number(s) || 1;
    if (scale === 0) return 0;
    return 1000 * (1 - 1 / scale);
  });

  // ============ CAT APPEARANCE (0.5-0.6) ============
  const catOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const catY = useTransform(scrollYProgress, [0.5, 0.6], [20, 0]);

  // ============ TEXT + BUTTON (0.55-0.75) ============
  const textOpacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
  const textProgress = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);

  //? Button: ปรากฏตอนสุดท้าย
  const buttonOpacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0.65, 0.75], [50, 0]);

  // ============ ANIMATION MAP ============
  const animations: AnimationMap = useMemo(
    () => ({
      //? Building + Ground
      4: { y: set4Y, opacity: set4Opacity },
      //? Scale bar
      69: { y: set6Y, opacity: set6Opacity },
      //? Scale center
      6: { y: set6Y, opacity: set6Opacity },
      //? Heart plate
      66: { opacity: set6Opacity },
      //? Feather plate
      67: { opacity: set6Opacity },
      //? Light overlay
      68: { y: set6Y, opacity: set6Opacity },
    }),
    [set4Y, set4Opacity, set6Y, set6Opacity],
  );

  return (
    <m.div
      ref={ref}
      className="relative h-[400vh]"
      style={{ opacity }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Background */}
      <div className="absolute w-screen inset-0" />

      {/* Perspective Container (fixed) */}
      <div
        className="fixed inset-0 w-screen h-screen pointer-events-none"
        style={{
          perspective: "1000px",
          perspectiveOrigin: "50% 50%",
          zIndex: 0,
        }}
      >
        <m.div
          className="fixed w-full h-full flex items-center justify-center bg-[linear-gradient(0deg,#3473c3_2%,#316cb7_7%,#25548a_27%,#1b4165_47%,#143148_69%,#0f2633_89%,#0c2027_109%,#0b1e23_128%)]"
          style={{
            top: containerTop,
            z: z_move,
            willChange: "transform",
            backfaceVisibility: "hidden",
            opacity: insideOpacity,
          }}
        >
          <div className="relative aspect-video w-full">
            <m.div className="absolute inset-0 w-full h-full">
              <SceneLayer
                items={TEMPLE_ARRIVAL_ITEMS}
                animations={animations}
                containerAspectRatio="16 / 9"
              >
                {/* Clothing Lottie (reuse Scene4) */}
                <m.div
                  className="absolute bottom-[-2.1333%] left-[23.5375%] w-[52.8875%] h-[90.8444%]"
                  style={{
                    opacity: set4Opacity,
                    y: set4Y,
                  }}
                  initial={{ opacity: 0, y: 100 }}
                >
                  <LazyLottie
                    src={getJsonUrl("Scene/Scene4/s4-clothing.json")}
                    loop
                    playTrigger={set4Opacity}
                    className="w-full h-full"
                  />
                </m.div>

                {/* Cat Lottie - ปรากฏตอนท้าย */}
                <m.div
                  className="absolute z-1 top-[62.5%] left-[44.5%] w-[8.195%] h-[15.07%]"
                  style={{
                    opacity: catOpacity,
                    y: catY,
                  }}
                  initial={{ opacity: 0 }}
                >
                  <LazyLottie
                    src={getJsonUrl("Scene/Scene10/cat.json")}
                    loop
                    playTrigger={catOpacity}
                    className="w-full h-full"
                  />
                </m.div>
              </SceneLayer>
            </m.div>
          </div>
        </m.div>
      </div>

      {/* Text overlay - คำสนทนาของเทพ */}
      <m.div
        className="fixed top-[15%] left-0 right-0 text-center px-4 pointer-events-none z-10"
        style={{ opacity: textOpacity }}
      >
        <WordByWordAnimation
          text={TEMPLE_DIALOGUE.deity}
          scrollYProgress={textProgress}
          as="p"
          className="text-lg md:text-2xl text-white leading-relaxed
          drop-shadow-[0_0_5px_#ffffff]"
        />
      </m.div>

      {/* Ceremony button - ปุ่มเริ่มพิธีชั่งหัวใจ */}
      <m.div
        className="fixed bottom-[5%] left-0 right-0 flex justify-center z-20"
        style={{
          opacity: buttonOpacity,
          y: buttonY,
        }}
      >
        <GradientButton
          text="เริ่มพิธีชั่งหัวใจ"
          isSelected={false}
          onClick={handleStartCeremony}
          variant="white"
          className="text-xl md:text-3xl"
        />
      </m.div>

      {/* Night mode overlay */}
      <div
        className="fixed inset-0 w-screen h-screen mix-blend-soft-light pointer-events-none"
        style={{ backgroundColor: "var(--color-overlay)", opacity: 0.5 }}
      />
    </m.div>
  );
}
