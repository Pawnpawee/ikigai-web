import { useEffect, useRef, useState, useCallback } from "react";
import { useAudio } from "@/app/contexts/AudioContext";

interface UseSoundEffectOptions {
  soundPath: string;
  fadeDurationMs?: number;
  soundDurationMs?: number;
  loop?: boolean;
}

export function useSoundEffect({
  soundPath,
  fadeDurationMs = 500,
  soundDurationMs = 2500,
  loop = false,
}: UseSoundEffectOptions) {
  const { sfxVolume, isMuted } = useAudio();
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const soundTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isLoopingRef = useRef<boolean>(false);

  // สร้าง audio instance
  useEffect(() => {
    const audioInstance = new Audio(soundPath);
    if (loop) {
      audioInstance.loop = true;
    }
    setAudio(audioInstance);

    return () => {
      audioInstance.pause();
      audioInstance.src = "";
    };
  }, [soundPath, loop]);

  // อัพเดท volume เมื่อ sfxVolume เปลี่ยน
  useEffect(() => {
    if (audio && !fadeIntervalRef.current) {
      audio.volume = sfxVolume / 100;
    }
  }, [audio, sfxVolume]);

  // ฟังก์ชัน fade audio
  const fadeAudio = useCallback(
    (
      audioEl: HTMLAudioElement,
      direction: "in" | "out",
      onComplete?: () => void
    ) => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }

      const stepTime = 50;
      const steps = fadeDurationMs / stepTime;
      const targetVolume = sfxVolume / 100;
      const stepVolume = targetVolume / steps;

      if (direction === "in") {
        audioEl.volume = 0;
        audioEl.currentTime = 0;
        audioEl.play();

        fadeIntervalRef.current = setInterval(() => {
          let newVolume = audioEl.volume + stepVolume;
          if (newVolume >= targetVolume) {
            newVolume = targetVolume;
            if (fadeIntervalRef.current) {
              clearInterval(fadeIntervalRef.current);
              fadeIntervalRef.current = null;
            }
            onComplete?.();
          }
          audioEl.volume = newVolume;
        }, stepTime);
      } else if (direction === "out") {
        fadeIntervalRef.current = setInterval(() => {
          let newVolume = audioEl.volume - stepVolume;
          if (newVolume <= 0.0) {
            newVolume = 0.0;
            audioEl.pause();
            audioEl.currentTime = 0;
            if (fadeIntervalRef.current) {
              clearInterval(fadeIntervalRef.current);
              fadeIntervalRef.current = null;
            }
            onComplete?.();
          }
          audioEl.volume = newVolume;
        }, stepTime);
      }
    },
    [fadeDurationMs, sfxVolume]
  );

  // ฟังก์ชันเล่นเสียงพร้อม fade in/out
  const playSoundEffect = useCallback(
    (onComplete?: () => void) => {
      if (!audio || isMuted) {
        onComplete?.();
        return;
      }

      isLoopingRef.current = loop;

      if (loop) {
        // สำหรับ loop: fade in แล้วเล่นต่อเนื่อง
        fadeAudio(audio, "in", () => {
          // เมื่อ fade in เสร็จ เสียงจะเล่นต่อเนื่องเพราะ audio.loop = true
          onComplete?.();
        });
      } else {
        // สำหรับเล่นครั้งเดียว: fade in แล้ว fade out ตาม duration
        const soundStopTimerDelay = Math.max(
          0,
          soundDurationMs - fadeDurationMs
        );

        fadeAudio(audio, "in");

        soundTimerRef.current = setTimeout(() => {
          fadeAudio(audio, "out", onComplete);
        }, soundStopTimerDelay);
      }
    },
    [audio, isMuted, soundDurationMs, fadeDurationMs, fadeAudio, loop]
  );

  // ฟังก์ชันหยุดเสียงทันที (สำหรับ loop)
  const stopSoundEffect = useCallback(() => {
    if (soundTimerRef.current) {
      clearTimeout(soundTimerRef.current);
      soundTimerRef.current = null;
    }

    if (audio && isLoopingRef.current) {
      // สำหรับ loop: fade out ก่อนหยุด
      fadeAudio(audio, "out", () => {
        isLoopingRef.current = false;
      });
    } else {
      // หยุดทันที
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }

      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    }
  }, [audio, fadeAudio]);

  return {
    audio,
    playSoundEffect,
    stopSoundEffect,
    fadeAudio,
  };
}
