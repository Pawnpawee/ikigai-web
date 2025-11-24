"use client";

import React from 'react'; 
import { useAudio } from '@/app/contexts/AudioContext';
import { useAssetLoader } from '@/app/contexts/AssetLoaderContext';
import LazyLottie from './LazyLottie';

const StarryBackground: React.FC = () => {
  const { animationsStarted } = useAudio();
  const { isLoading } = useAssetLoader();

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-1" 
    >
      {animationsStarted && !isLoading && (
        <LazyLottie
              src="/assets/Scene/starry-bg.lottie"
               loop
            autoplay
            style={{ width: '100%', height: 'auto' }}
            />
      )}
    </div>
  );
};

export default StarryBackground;