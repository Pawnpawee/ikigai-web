import { useMemo } from "react";
import { useAudio } from "@/app/contexts/AudioContext";
import { useAssetLoader } from "@/app/contexts/AssetLoaderContext";

/**
 * Custom hook to check if animations should start
 * Returns true when both audio animations have started and assets are loaded
 */
export function useAnimationReady() {
  const { animationsStarted } = useAudio();
  const { isLoading: isAssetsLoading } = useAssetLoader();

  const shouldAnimate = useMemo(
    () => animationsStarted && !isAssetsLoading,
    [animationsStarted, isAssetsLoading]
  );

  return shouldAnimate;
}
