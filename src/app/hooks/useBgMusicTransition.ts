import { useEffect, useRef } from "react";
import { useAudio } from "@/app/contexts/AudioContext";

interface UseBgMusicTransitionProps {
  /** Path ของเพลงที่ต้องการเล่นเมื่ออยู่ใน viewport */
  targetMusic: string;
  /** Path ของเพลงที่จะกลับไปใช้เมื่อออกจาก viewport */
  defaultMusic?: string;
  /** ระยะเวลา fade in/out (มิลลิวินาที) */
  fadeDuration?: number;
  /** สถานะว่าอยู่ใน viewport หรือไม่ */
  isInView: boolean;
  /** 
   * ถ้าเป็น true จะไม่ reset เพลงเมื่อออกจาก viewport 
   * ใช้สำหรับ section ที่ต้องการให้เพลงเล่นต่อไปยัง section ถัดไป
   */
  continueOnExit?: boolean;
}

export function useBgMusicTransition({
  targetMusic,
  defaultMusic = "/assets/Sound/bg-music.mp3",
  fadeDuration = 1000,
  isInView,
  continueOnExit = false,
}: UseBgMusicTransitionProps) {
  const { transitionBgMusic, animationsStarted, currentBgMusic } = useAudio();
  const hasChangedMusicRef = useRef(false);

  useEffect(() => {
    if (!animationsStarted) return;

    // ⭐ เพิ่มการเช็ค: ถ้าเพลงเป้าหมายคือเพลงปัจจุบันอยู่แล้ว ไม่ต้องทำอะไร (ลด overhead)
    if (isInView && currentBgMusic !== targetMusic) {
      transitionBgMusic(targetMusic, fadeDuration);
      hasChangedMusicRef.current = true;
    } else if (
      !isInView &&
      hasChangedMusicRef.current &&
      !continueOnExit &&
      currentBgMusic !== defaultMusic 
    ) {
      transitionBgMusic(defaultMusic, fadeDuration);
      hasChangedMusicRef.current = false;
    }
  }, [
    isInView,
    targetMusic,
    defaultMusic,
    fadeDuration,
    continueOnExit,
    animationsStarted,
    currentBgMusic, 
    transitionBgMusic, 
  ]);
}