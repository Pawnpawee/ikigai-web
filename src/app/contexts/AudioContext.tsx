"use client";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface AudioContextType {
  isMuted: boolean;
  volume: number;
  sfxVolume: number;
  isPlaying: boolean;
  userConsented: boolean;
  animationsStarted: boolean;
  currentBgMusic: string;
  setIsMuted: (muted: boolean) => void;
  setVolume: (volume: number) => void;
  setSfxVolume: (volume: number) => void;
  togglePlay: () => void;
  startAudio: () => void;
  pauseAudio: () => void;
  pauseBgMusic: () => void;
  resumeBgMusic: () => void;
  setBgMusic: (src: string) => void;
  transitionBgMusic: (src: string, fadeDuration?: number) => Promise<void>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(30);
  const [sfxVolume, setSfxVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [userConsented, setUserConsented] = useState(false);
  const [animationsStarted, setAnimationsStarted] = useState(false);
  const [currentBgMusic, setCurrentBgMusic] = useState("/assets/Sound/bg-music.mp3");
  const isTransitioningRef = useRef(false);

  // สร้าง audio element ครั้งเดียว
  useEffect(() => {
    const audio = new Audio("/assets/Sound/bg-music.mp3");
    audio.loop = true;
    audio.volume = volume / 100;
    audio.muted = isMuted;
    audioRef.current = audio;

    console.log("Audio initialized:", audio.src);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  // ฟังก์ชันเปลี่ยน bg music
  const setBgMusic = async (src: string) => {
    if (audioRef.current) {
      const audio = audioRef.current;
      const wasPlaying = !audio.paused;
      
      try {
        // Pause audio ถ้ากำลังเล่นอยู่
        if (wasPlaying) {
          audio.pause();
          // รอให้ pause จบจริงๆ
          await new Promise<void>((resolve) => {
            if (audio.paused) {
              resolve();
            } else {
              audio.addEventListener('pause', () => resolve(), { once: true });
            }
          });
        }
        
        // เปลี่ยน src และ load
        audio.src = src;
        audio.load();
        setCurrentBgMusic(src);
        
        // รอให้ audio พร้อมก่อน play
        if (wasPlaying) {
          await new Promise<void>((resolve) => {
            if (audio.readyState >= 2) {
              resolve();
            } else {
              audio.addEventListener('canplay', () => resolve(), { once: true });
            }
          });
          
          await audio.play();
        }
        
        console.log("BG music changed to:", src);
      } catch (error) {
        console.error("setBgMusic failed:", error);
      }
    }
  };

  // ฟังก์ชันเปลี่ยน bg music แบบ fade in/out
  const transitionBgMusic = async (src: string, fadeDuration = 1000) => {
    // ถ้ากำลัง transition อยู่ หรือเป็นเพลงเดียวกัน ไม่ต้องทำอะไร
    if (isTransitioningRef.current || currentBgMusic === src || !audioRef.current) {
      return;
    }

    isTransitioningRef.current = true;
    const audio = audioRef.current;
    const wasPlaying = !audio.paused;
    const targetVolume = volume / 100;

    try {
      // Fade out เพลงเดิม
      if (wasPlaying) {
        const fadeSteps = 20;
        const stepDuration = fadeDuration / (fadeSteps * 2); // แบ่ง 2 เพราะมีทั้ง fade out และ fade in
        const volumeStep = targetVolume / fadeSteps;

        for (let i = fadeSteps; i >= 0; i--) {
          audio.volume = Math.max(0, (i / fadeSteps) * targetVolume);
          await new Promise(resolve => setTimeout(resolve, stepDuration));
        }
        
        audio.pause();
      }

      // เปลี่ยนเพลง
      audio.src = src;
      audio.load();
      setCurrentBgMusic(src);

      // รอให้ audio พร้อม
      if (wasPlaying && isInitialized && !isMuted) {
        await new Promise<void>((resolve) => {
          if (audio.readyState >= 2) {
            resolve();
          } else {
            audio.addEventListener('canplay', () => resolve(), { once: true });
          }
        });

        // Fade in เพลงใหม่
        audio.volume = 0;
        await audio.play();

        const fadeSteps = 20;
        const stepDuration = fadeDuration / (fadeSteps * 2);
        const volumeStep = targetVolume / fadeSteps;

        for (let i = 0; i <= fadeSteps; i++) {
          audio.volume = Math.min(targetVolume, (i / fadeSteps) * targetVolume);
          await new Promise(resolve => setTimeout(resolve, stepDuration));
        }
        
        audio.volume = targetVolume;
      }

      console.log("BG music transitioned to:", src);
    } catch (error) {
      console.error("transitionBgMusic failed:", error);
    } finally {
      isTransitioningRef.current = false;
    }
  };

  // อัพเดท mute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      console.log("Muted:", isMuted);
    }
  }, [isMuted]);

  // อัพเดท volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      console.log("Volume:", volume);
    }
  }, [volume]);

  // อัพเดท SFX volume
  useEffect(() => {
    console.log("SFX Volume:", sfxVolume);
  }, [sfxVolume]);

  const startAudio = async () => {
    if (audioRef.current && !isInitialized) {
      try {
        const audio = audioRef.current;
        console.log("Starting audio...");
        setIsMuted(false); // ตั้งค่า mute เป็น false เมื่อผู้ใช้เลือกเปิดเสียง
        
        // รอให้ audio พร้อมก่อน play
        if (audio.readyState < 2) {
          await new Promise<void>((resolve) => {
            audio.addEventListener('canplay', () => resolve(), { once: true });
          });
        }
        
        // Play audio โดยตรง ไม่ต้อง pause ก่อน เพราะยังไม่เคย play
        await audio.play();
        setIsPlaying(true);
        setIsInitialized(true);
        setUserConsented(true);
        setAnimationsStarted(true);
        console.log("Audio started successfully!");
      } catch (error) {
        console.error("Audio start failed:", error);
      }
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsMuted(true); // ตั้งค่า mute เป็น true เมื่อผู้ใช้เลือกไม่เปิดเสียง
      setUserConsented(true);
      setAnimationsStarted(true);
      console.log("Audio muted by user choice");
    }
  };

  const togglePlay = async () => {
    if (audioRef.current) {
      const audio = audioRef.current;
      
      try {
        if (isPlaying) {
          audio.pause();
          // รอให้ pause จบ
          await new Promise<void>((resolve) => {
            if (audio.paused) {
              resolve();
            } else {
              audio.addEventListener('pause', () => resolve(), { once: true });
            }
          });
          setIsPlaying(false);
        } else {
          // รอให้ audio พร้อมก่อน play
          if (audio.readyState < 2) {
            await new Promise<void>((resolve) => {
              audio.addEventListener('canplay', () => resolve(), { once: true });
            });
          }
          
          await audio.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error("Toggle play failed:", error);
      }
    }
  };

  const pauseBgMusic = () => {
    if (audioRef.current && isPlaying) {
      const audio = audioRef.current;
      const originalVolume = audio.volume;
      const fadeDuration = 1000; // 500ms fade out
      const fadeSteps = 20;
      const volumeStep = originalVolume / fadeSteps;
      const stepDuration = fadeDuration / fadeSteps;

      let currentStep = 0;
      const fadeOutInterval = setInterval(() => {
        currentStep++;
        audio.volume = Math.max(0, originalVolume - (volumeStep * currentStep));
        
        if (currentStep >= fadeSteps) {
          clearInterval(fadeOutInterval);
          audio.pause();
          audio.volume = originalVolume; // คืนค่า volume เดิม
          console.log("Background music paused with fade out");
        }
      }, stepDuration);
    }
  };

  const resumeBgMusic = async () => {
    if (audioRef.current && isInitialized && !isMuted) {
      const audio = audioRef.current;
      const targetVolume = volume / 100;
      const fadeDuration = 1000; // 500ms fade in
      const fadeSteps = 20;
      const volumeStep = targetVolume / fadeSteps;
      const stepDuration = fadeDuration / fadeSteps;

      try {
        audio.volume = 0;
        
        // รอให้ audio พร้อมก่อน play
        if (audio.readyState < 2) {
          await new Promise<void>((resolve) => {
            audio.addEventListener('canplay', () => resolve(), { once: true });
          });
        }
        
        await audio.play();
        
        let currentStep = 0;
        const fadeInInterval = setInterval(() => {
          currentStep++;
          audio.volume = Math.min(targetVolume, volumeStep * currentStep);
          
          if (currentStep >= fadeSteps) {
            clearInterval(fadeInInterval);
            audio.volume = targetVolume;
            console.log("Background music resumed with fade in");
          }
        }, stepDuration);
      } catch (error) {
        console.error("Resume failed:", error);
      }
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isMuted,
        volume,
        sfxVolume,
        isPlaying,
        userConsented,
        animationsStarted,
        currentBgMusic,
        setIsMuted,
        setVolume,
        setSfxVolume,
        togglePlay,
        startAudio,
        pauseAudio,
        pauseBgMusic,
        resumeBgMusic,
        setBgMusic,
        transitionBgMusic,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
