"use client";

import {
  AnimatePresence,
  type MotionValue,
  m,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { useMemo, useRef } from "react";
import { HiCheck } from "react-icons/hi";

import InputButton from "@/app/components/button/InputButton";
import LazyLottie from "@/app/components/reusable/LazyLottie";
import MysteriousText from "@/app/components/reusable/MysteriousText";
import SceneLayer, {
  type AnimationMap,
} from "@/app/components/reusable/SceneLayer";
import { useAudio } from "@/app/contexts/AudioContext";
import { SCENE_INTODARK_1_ITEMS } from "@/app/data/scene_intoDark_1";
import { useDeviceCheck } from "@/app/hooks/useDeviceCheck";

interface NameInputProps {
  scrollYProgress: MotionValue<number>;
  playerName: string;
  setPlayerName: (name: string) => void;
  nameError: string;
  onConfirm: () => void;
  isConfirmed: boolean;
}

export default function IntoDarkNameInput({
  scrollYProgress,
  playerName,
  setPlayerName,
  nameError,
  onConfirm,
  isConfirmed,
}: NameInputProps) {
  const { isMobile } = useDeviceCheck();
  const { playSfx } = useAudio();
  const hasPlayedCatSound = useRef(false);

  // Total height: 300vh (0-0.167 ของ 1800vh รวม)
  // ชุด 1: 0-25vh (0-0.014) - bg gradient + little star 2
  // ชุด 2: 25-50vh (0.014-0.028) - star line 2 + little star 3
  // ชุด 3: 50-75vh (0.028-0.042) - star line 1
  // ชุด 4: 75-175vh (0.042-0.097) - star line 3 + little star 1 + cat
  // ชุด 5: 175-225vh (0.097-0.125) - ข้อความ + water - 50vh
  // ชุด 6: 225-275vh (0.125-0.153) - input box - 50vh
  // Fade out: 275-300vh (0.153-0.167) - 25vh

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.006, 0.153, 0.167],
    [0, 1, 1, 0],
  );
  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.006, 0.166, 0.167],
    [10, 10, 10, -1],
  );

  // ชุด 1: Background Gradient + Little star 2 (0-25vh = 0-0.014)
  const bgOpacity = useTransform(scrollYProgress, [0, 0.006, 0.014], [0, 1, 1]);

  // ชุด 2: Star line 2 + Little star 3 (25-50vh = 0.014-0.028) - รอชุด 1 opacity = 1
  const set2Opacity = useTransform(
    scrollYProgress,
    [0.014, 0.021, 0.028],
    [0, 1, 1],
  );

  // ชุด 3: Star line 1 (50-75vh = 0.028-0.042) - รอชุด 2 opacity = 1
  const set3Opacity = useTransform(
    scrollYProgress,
    [0.028, 0.035, 0.042],
    [0, 1, 1],
  );

  // ชุด 4: Star line 3 + Little star 1 + Cat (75-175vh = 0.042-0.097) - รอชุด 3 opacity = 1
  const set4Opacity = useTransform(
    scrollYProgress,
    [0.042, 0.049, 0.097],
    [0, 1, 1],
  );

  // Cat floating down animation
  const catY = useTransform(
    scrollYProgress,
    [0.042, 0.103, 0.125],
    [-100, 10, 0],
  );

  // ชุด 5: ข้อความ + Water (175-225vh = 0.097-0.125) - 50vh - รอชุด 4 opacity = 1
  const textOpacity = useTransform(
    scrollYProgress,
    [0.097, 0.111, 0.125],
    [0, 1, 1],
  );

  // Water bounce animation (scale) - ย้ายมาชุด 5
  const waterScale = useTransform(
    scrollYProgress,
    [0.097, 0.103, 0.111, 0.118, 0.125],
    [0, 1.3, 0.9, 1.1, 1],
  );

  // ชุด 6: Input box (225-275vh = 0.125-0.153) - 50vh - รอชุด 5 opacity = 1
  const inputOpacity = useTransform(
    scrollYProgress,
    [0.125, 0.139, 0.153],
    [0, 1, 1],
  );

  //? Animation Map - matches animGroup in scene_intoDark_1.data.ts
  const animations: AnimationMap = useMemo(
    () => ({
      1: { opacity: bgOpacity },
      2: { opacity: set2Opacity },
      3: { opacity: set3Opacity },
      4: { opacity: set4Opacity, y: catY },
      5: { opacity: textOpacity },
    }),
    [bgOpacity, set2Opacity, set3Opacity, set4Opacity, catY, textOpacity],
  );

  //? เล่นเสียงแมวเมื่อแมวโผล่มา (set4Opacity > 0.5)
  useMotionValueEvent(set4Opacity, "change", (latest) => {
    if (latest >= 0.5 && !hasPlayedCatSound.current) {
      playSfx("/assets/Sound/3-4/cat-meow.mp3");
      hasPlayedCatSound.current = true;
    }
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && playerName.trim() && !isConfirmed) {
      onConfirm();
    }
  };

  return (
    <m.div
      className="fixed flex justify-center top-0 h-screen w-screen bg-black"
      style={{ opacity, zIndex }}
    >
      <m.div
        className={`flex items-center h-screen w-screen portrait:w-auto ${
          isMobile ? "justify-center" : "justify-end"
        }`}
      >
        <SceneLayer
          items={SCENE_INTODARK_1_ITEMS}
          animations={animations}
          containerAspectRatio={isMobile ? "1080 / 1920" : "1920 / 1080"}
        >
          {/* Lottie elements with special animations */}

          {/* Water with scale animation */}
          <m.div
            className="absolute mix-blend-screen"
            style={{
              left: isMobile ? undefined : "3.815%",
              right: isMobile ? "-22.414%" : undefined,
              top: isMobile ? undefined : undefined,
              bottom: isMobile ? "6.156%" : "2.535%",
              width: isMobile ? "117.775%" : "65.974%",
              height: isMobile ? "14.695%" : "26.022%",
              opacity: textOpacity,
              scale: waterScale,
            }}
          >
            <LazyLottie
              src="/assets/Scene/Scene5/01/s5-1-water.json"
              className="w-full h-full"
              loop
              playTrigger={textOpacity}
            />
          </m.div>

          {/* Main Cat */}
          <m.div
            className="absolute"
            style={{
              width: isMobile ? "70.28%" : "39.51%",
              height: isMobile ? "40.10%" : "71.25%",
              left: isMobile ? "14.54%" : "9.24%",
              bottom: isMobile ? "12.50%" : "13.52%",
              opacity: set4Opacity,
              y: catY,
            }}
          >
            <LazyLottie
              src="/assets/Scene/Scene5/01/s5-1-cat-starline.json"
              className="w-full h-full"
              loop
              playTrigger={set4Opacity}
            />
          </m.div>
          <div className="flex items-center justify-end portrait:justify-center h-full w-full">
            {/* Text and Input */}
            <div
              className={`flex flex-col items-center ${
                isMobile
                  ? "py-24 md:py-52 self-stretch gap-10 md:gap-20"
                  : "gap-20 pt-10 px-56"
              }`}
            >
              {/* ชุด 5: Main heading text - ขึ้นทีละตัวอักษรแบบลึกลับ */}
              <m.div className="text-center" style={{ opacity: textOpacity }}>
                <div className="text-white select-none leading-normal text-xl md:text-3xl">
                  <MysteriousText
                    text={`${
                      isMobile
                        ? "สวัสดี... ข้าคือ\nผู้นำทางแห่งความมืด"
                        : "สวัสดี... ข้าคือผู้นำทางแห่งความมืด"
                    }`}
                    scrollYProgress={scrollYProgress}
                    startProgress={0.097}
                    endProgress={0.111}
                  />
                  <br />
                  <MysteriousText
                    text="เจ้าชื่ออะไร"
                    scrollYProgress={scrollYProgress}
                    startProgress={0.111}
                    endProgress={0.125}
                  />
                </div>
              </m.div>

              <m.div
                className={`flex gap-5 ${
                  isMobile ? "items-center" : "items-start"
                }`}
                style={{ opacity: inputOpacity, zIndex }}
              >
                <div className="flex flex-col items-center">
                  <m.div onKeyDown={handleKeyDown}>
                    <InputButton
                      value={playerName}
                      onChange={setPlayerName}
                      placeholder="พิมพ์ข้อความ..."
                    />
                  </m.div>
                  {/* Error message */}
                  {nameError && (
                    <m.p
                      className="typo-p-md text-red-500 mt-4"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {nameError}
                    </m.p>
                  )}
                </div>
                <AnimatePresence>
                  {!isConfirmed && (
                    <m.button
                      initial={{ opacity: 0, y: 10, scale: 0 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeIn",
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onConfirm}
                      className="h-full p-4 border border-white/30 bg-white/10 rounded-full text-white hover:bg-white/20 backdrop-blur-sm transition-all flex items-center cursor-pointer text-3xl portrait:text-xl origin-center"
                    >
                      <HiCheck />
                    </m.button>
                  )}
                </AnimatePresence>
              </m.div>
            </div>
          </div>
        </SceneLayer>
      </m.div>
    </m.div>
  );
}
