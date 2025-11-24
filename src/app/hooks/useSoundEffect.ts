import { useEffect, useRef, useCallback } from "react";
import { useAudio } from "@/app/contexts/AudioContext";

interface UseSoundEffectOptions {
  soundPath: string;
  fadeDurationMs?: number;
  soundDurationMs?: number;
  loop?: boolean;
  volume?: number; // 0-1, จะคูณกับ sfxVolume
}

export function useSoundEffect({
  soundPath,
  fadeDurationMs = 500,
  soundDurationMs = 2500,
  loop = false,
  volume = 1, // default 100%
}: UseSoundEffectOptions) {
  const { sfxVolume, isMuted } = useAudio();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const soundTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isLoopingRef = useRef<boolean>(false);

  const getAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio(soundPath);
      if (loop) audio.loop = true;
      audioRef.current = audio;
    }
    return audioRef.current;
  };

  // ฟังก์ชัน fade audio
  const fadeAudio = useCallback((direction: "in" | "out", onComplete?: () => void) => {
    const audio = getAudio();
    if (!audio) return;

    const targetVol = Math.min(sfxVolume * volume, 1); // ป้องกัน target เกิน 1
    const stepTime = 50;
    const steps = Math.max(1, fadeDurationMs / stepTime);
    const volStep = targetVol / steps;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    if (direction === "in") {
      audio.volume = 0;
      audio.play().catch(() => { });
    }

    fadeIntervalRef.current = setInterval(() => {
      let newVol = direction === "in" 
        ? Math.min(audio.volume + volStep, targetVol)
        : Math.max(audio.volume - volStep, 0);

      // ป้องกัน volume เกินขอบเขต [0, 1]
      audio.volume = Math.max(0, Math.min(newVol, 1));

      if ((direction === "in" && audio.volume >= targetVol) || (direction === "out" && audio.volume <= 0)) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        if (direction === "out") {
          audio.pause();
          audio.currentTime = 0;
          onComplete?.();
        }
      }
    }, stepTime);
  }, [sfxVolume, volume, fadeDurationMs]);

  const playSoundEffect = useCallback((onComplete?: () => void) => {
    if (isMuted) {
      onComplete?.();
      return;
    }

    const audio = getAudio(); // ⭐ Initialize ครั้งแรกที่นี่
    audio.currentTime = 0; // Reset เวลาเสมอเมื่อเริ่มเล่นใหม่

    if (loop) {
      fadeAudio("in", onComplete);
    } else {
      fadeAudio("in");
      // Clear timer เก่าก่อนตั้งใหม่
      if (soundTimerRef.current) clearTimeout(soundTimerRef.current);

      soundTimerRef.current = setTimeout(() => {
        fadeAudio("out", onComplete);
      }, Math.max(0, soundDurationMs - fadeDurationMs));
    }
  }, [isMuted, loop, soundDurationMs, fadeDurationMs, fadeAudio]);

  const stopSoundEffect = useCallback(() => {
    if (soundTimerRef.current) clearTimeout(soundTimerRef.current);
    fadeAudio("out");
  }, [fadeAudio]);

  // Cleanup เมื่อ Component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      if (soundTimerRef.current) clearTimeout(soundTimerRef.current);
    };
  }, []);

  return { playSoundEffect, stopSoundEffect };
}



