"use client";

import React from "react";
import { useAudio } from "@/app/contexts/AudioContext";
import { useAssetLoader } from "@/app/contexts/AssetLoaderContext";
import LazyLottie from "./LazyLottie";

const StarryBackground: React.FC = () => {
  const { animationsStarted } = useAudio();
  const { isLoading } = useAssetLoader();

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden flex justify-center items-center">
      {animationsStarted && !isLoading && (
        <div className="h-full w-auto max-w-none aspect-video">
          {" "}
          {/* aspect-video คือ 16:9 */}
          <LazyLottie
            src="/assets/Scene/starry-bg.lottie"
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default StarryBackground;
