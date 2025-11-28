"use client";

import React from "react";
import { useAudio } from "@/app/contexts/AudioContext";
import { useAssetLoader } from "@/app/contexts/AssetLoaderContext";
import LazyLottie from "./LazyLottie";

const StarryBackground: React.FC = () => {
  const { animationsStarted } = useAudio();
  const { isLoading } = useAssetLoader();

  // ⭐ รวม Logic ไว้ที่นี่: เล่นเมื่อโหลดเสร็จ และ Audio context สั่งเริ่ม
  const shouldPlay = animationsStarted && !isLoading;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none  flex justify-center items-center">
      {/* ⭐ ตัดเงื่อนไข && ออก เพื่อให้ Element ถูก Mount รอไว้ก่อน (ลดอาการ Pop-in) 
         แต่เราจะคุมการเล่นด้วย props 'play' แทน 
      */}
      <div className="relative w-full h-full">
        <LazyLottie
          src="/assets/Scene/starry-bg.lottie"
          loop
          // ⭐ ใช้ prop 'play' แทน autoplay
          play={shouldPlay}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default StarryBackground;
