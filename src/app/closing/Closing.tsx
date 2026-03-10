"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import GradientButton from "@/app/components/button/GradientButton";
import LazyLottie from "@/app/components/reusable/LazyLottie";
import SceneLayer, {
  type AnimationMap,
} from "@/app/components/reusable/SceneLayer";
import WordByWordAnimation from "@/app/components/text/WordByWordAnimation";
import { useDevice } from "@/app/contexts/DeviceContext";
import {
  CLOSING_DIALOGUE,
  SCENE_CLOSING_ITEMS,
} from "@/app/data/scene_closing.data";
import { useStarsVisibility } from "@/app/hooks/useStarsVisibility";
import { getAudioUrl, getJsonUrl } from "@/utils/cloudinaryUtils";
import { getSessionUser } from "@/utils/storage";
import { useAudio } from "../contexts/AudioContext";

export default function ClosingPage() {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isMobile } = useDevice();
  const [playerName, setPlayerName] = useState("ผู้เดินทาง");
  const { setBgMusic } = useAudio();

  //? ดึงชื่อผู้เล่นจาก session storage
  useEffect(() => {
    const user = getSessionUser();
    if (user?.name) {
      setPlayerName(user.name);
    }
  }, []);

  //? ตั้งเพลง bg ทุกครั้งที่เข้าหน้า ไม่ว่าจะ mute หรือไม่ เพื่อให้ soundRef ตรงกับหน้าปัจจุบัน
  useEffect(() => {
    setBgMusic(getAudioUrl("Sound/10/egypt_expedition.mp3"));
  }, [setBgMusic]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // --- Scene Opacity: เฟดเข้าตอนเริ่ม ---
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  // --- Scene Layer Animations ---
  //? animGroup 1: Pyramid (โผล่ทันทีเมื่อ scene เริ่ม)
  const set1Opacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const set1Y = useTransform(scrollYProgress, [0.05, 0.2], [50, 0]);

  //? animGroup 2: Water + Trees (ตามมาทีหลัง)
  const set2Opacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const set2Y = useTransform(scrollYProgress, [0.15, 0.3], [80, 0]);

  //? animGroup 3: Human silhouette (ปรากฏสุดท้าย)
  const set3Opacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  const set3Y = useTransform(scrollYProgress, [0.2, 0.35], [60, 0]);

  // --- Overlay + Text + Buttons ---
  //? Overlay เข้มขึ้นเพื่อให้อ่าน text ได้ชัด
  const overlayOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 0.55]);

  //? Text ปรากฏแบบ word-by-word
  const textProgress = useTransform(scrollYProgress, [0.3, 0.75], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.28, 0.35], [0, 1]);

  //? Buttons เฟดเข้าหลัง text เริ่มแสดง
  const btnOpacity = useTransform(scrollYProgress, [0.65, 0.8], [0, 1]);
  const btnY = useTransform(scrollYProgress, [0.65, 0.8], [30, 0]);

  // --- Sun Animation ---
  const sunScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  const animations: AnimationMap = useMemo(
    () => ({
      1: { y: set1Y, opacity: set1Opacity },
      2: { y: set2Y, opacity: set2Opacity },
      3: { y: set3Y, opacity: set3Opacity },
    }),
    [set1Y, set2Y, set3Y, set1Opacity, set2Opacity, set3Opacity],
  );

  //? แทนที่ (playerName) ด้วยชื่อจริงของผู้เล่น
  const closingText = useMemo(
    () => CLOSING_DIALOGUE.text.replace("(playerName)", `**"${playerName}"**`),
    [playerName],
  );

  //? ซ่อน stars ตลอดทั้ง section (เป็น scene สว่าง)
  useStarsVisibility(scrollYProgress, {
    shouldShow: () => false,
  });

  const handleGoHome = () => {
    //? กลับไปหน้าหลัก
    router.push("/");
  };

  return (
    <m.div
      ref={ref}
      className="relative w-screen h-[200vh]"
      style={{ opacity: sceneOpacity }}
    >
      {/* Sticky Container */}
      <div
        className="fixed top-0 w-screen h-screen overflow-hidden flex items-center justify-center bg-closing"
        style={{
          willChange: "transform, opacity",
        }}
      >
        {/* Sky: Animated clouds */}
        <m.div
          className="absolute top-0 left-0 w-full portrait:w-[110%] portrait:-left-[5%]"
          style={{ opacity: set1Opacity, zIndex: 0 }}
        >
          <LazyLottie
            src={getJsonUrl("Scene/Scene3/sky.json")}
            loop={true}
            playTrigger={set1Opacity}
            className="w-full object-cover"
          />
        </m.div>

        {/* Sun: Lottie with scale animation */}
        <m.div
          className="absolute w-[10.3%] portrait:w-[18.3%]"
          style={{
            left: isMobile ? "40.8%" : "44.8%",
            top: isMobile ? "28%" : "20.5%",
            scale: sunScale,
            opacity: set1Opacity,
            zIndex: 1,
          }}
        >
          <LazyLottie
            src={getJsonUrl("Scene/Closing/sun.json")}
            loop={true}
            playTrigger={set1Opacity}
            className="w-full h-full"
          />
        </m.div>

        {/* Scene Layer: pyramid, water, tree_land, human */}
        <m.div className="fixed flex justify-center items-center top-0 h-screen w-screen portrait:w-auto">
          <SceneLayer
            items={SCENE_CLOSING_ITEMS}
            animations={animations}
            containerAspectRatio={isMobile ? "9 / 16" : "16 / 9"}
          />
        </m.div>

        {/* Dark Overlay (เพื่อให้อ่าน text ได้ชัด) */}
        <m.div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: "rgba(0, 0, 0, 1)",
            opacity: overlayOpacity,
            zIndex: 6,
          }}
        />

        {/* Text + Buttons Container */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-16"
          style={{ zIndex: 7 }}
        >
          {/* Closing Text */}
          <m.div style={{ opacity: textOpacity }} className="max-w-3xl">
            <WordByWordAnimation
              text={closingText}
              scrollYProgress={textProgress}
              as="p"
              className="text-lg md:text-2xl text-white leading-relaxed md:leading-loose"
            />
          </m.div>

          {/* Action Buttons */}
          <m.div
            className="flex flex-row gap-4 md:gap-8 mt-8 md:mt-12"
            style={{ opacity: btnOpacity, y: btnY }}
          >
            <GradientButton
              text={CLOSING_DIALOGUE.buttons.home}
              isSelected={false}
              onClick={handleGoHome}
              variant="white"
            />
          </m.div>
        </div>
      </div>
    </m.div>
  );
}
