import { useEffect, useRef, useState, MutableRefObject } from "react";

interface UseLottieWithSoundOptions {
  isInView: boolean;
  animationsStarted: boolean;
  isAssetsLoading: boolean;
  playSoundEffect: () => void;
  stopSoundEffect: () => void;
  animationDurationInSeconds?: number;
  initialDelayMs?: number;
  glowOffsetMs?: number;
}

interface UseLottieWithSoundReturn {
  lottieRef: MutableRefObject<any>;
  isLottieComplete: boolean;
  hasPlayedOnce: boolean;
}

export function useLottieWithSound({
  isInView,
  animationsStarted,
  isAssetsLoading,
  playSoundEffect,
  stopSoundEffect,
  animationDurationInSeconds = 3,
  initialDelayMs = 2000,
  glowOffsetMs = 1200,
}: UseLottieWithSoundOptions): UseLottieWithSoundReturn {
  const lottieRef = useRef<any>(null);
  const playTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const glowTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const [isLottieComplete, setIsLottieComplete] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  useEffect(() => {
    // รอให้ assets โหลดเสร็จก่อนเริ่ม animation
    if (isInView && animationsStarted && !hasPlayedOnce && !isAssetsLoading) {
      playTimerRef.current = setTimeout(() => {
        // Lottie
        lottieRef.current?.play();

        // เล่นเสียง effect
        playSoundEffect();

        // Lottie Glow - ใช้ค่าโดยประมาณสำหรับ DotLottie
        const glowStartTimeInMs = Math.max(
          0,
          animationDurationInSeconds * 1000 - glowOffsetMs,
        );

        glowTimerRef.current = setTimeout(() => {
          setIsLottieComplete(true);
        }, glowStartTimeInMs);

        setHasPlayedOnce(true);
      }, initialDelayMs);
    }
  }, [
    isInView,
    animationsStarted,
    hasPlayedOnce,
    playSoundEffect,
    isAssetsLoading,
    animationDurationInSeconds,
    initialDelayMs,
    glowOffsetMs,
  ]);

  // Cleanup เมื่อ component unmount หรือออกจาก view
  useEffect(() => {
    if (!isInView) {
      lottieRef.current?.stop();
      stopSoundEffect();
      setIsLottieComplete(false);
      setHasPlayedOnce(false);
      clearTimeout(playTimerRef.current);
      clearTimeout(glowTimerRef.current);
    }
  }, [isInView, stopSoundEffect]);

  return {
    lottieRef,
    isLottieComplete,
    hasPlayedOnce,
  };
}
