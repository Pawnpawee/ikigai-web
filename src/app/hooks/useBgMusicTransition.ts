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

/**
 * Custom hook สำหรับจัดการการเปลี่ยน background music แบบ fade in/out
 *
 * @example
 * ```tsx
 * const isInView = useInView(ref, { once: false, amount: 0.1 });
 *
 * useBgMusicTransition({
 *   targetMusic: "/assets/Sound/3-4/egypt-jelly-dance.mp3",
 *   defaultMusic: "/assets/Sound/bg-music.mp3",
 *   fadeDuration: 1000,
 *   isInView,
 *   continueOnExit: true, // ให้เพลงเล่นต่อไปยัง section ถัดไป
 * });
 * ```
 */
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

    if (isInView && currentBgMusic !== targetMusic) {
      // เข้า viewport -> เปลี่ยนเป็นเพลงที่ต้องการ
      transitionBgMusic(targetMusic, fadeDuration);
      hasChangedMusicRef.current = true;
    } else if (
      !isInView &&
      hasChangedMusicRef.current &&
      !continueOnExit &&
      currentBgMusic === targetMusic
    ) {
      // ออกจาก viewport -> กลับไปใช้เพลงเดิม (เฉพาะถ้า continueOnExit = false)
      transitionBgMusic(defaultMusic, fadeDuration);
      hasChangedMusicRef.current = false;
    }
  }, [
    isInView,
    animationsStarted,
    targetMusic,
    defaultMusic,
    fadeDuration,
    transitionBgMusic,
    currentBgMusic,
    continueOnExit,
  ]);
}
