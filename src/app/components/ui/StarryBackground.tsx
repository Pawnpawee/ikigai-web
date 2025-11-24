"use client";

import React from "react";
import { useAudio } from "@/app/contexts/AudioContext";
import dynamic from "next/dynamic";

const DotLottiePlayer = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  {
    ssr: false, // Lottie ไม่จำเป็นต้อง Render ฝั่ง Server
    loading: () => <div className="fixed inset-0 bg-transparent" />,
  },
);

const StarryBackground: React.FC = () => {
  const { animationsStarted } = useAudio();

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-1">
      {animationsStarted && (
        <DotLottiePlayer
          src="/assets/Scene/starry-bg.lottie"
          loop
          autoplay
          style={{ width: "100%", height: "auto" }}
        />
      )}
    </div>
  );
};

export default StarryBackground;
