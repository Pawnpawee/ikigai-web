"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

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
  isInitialized: boolean;
}

interface StoredAudioSettings {
  hasVisited: boolean;
  isMuted: boolean;
  volume: number;
  sfxVolume: number;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(30);
  const [sfxVolume, setSfxVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [userConsented, setUserConsented] = useState(false);
  const [animationsStarted, setAnimationsStarted] = useState(false);
  const [currentBgMusic, setCurrentBgMusic] = useState(
    "/assets/Sound/bg-music.mp3",
  );
  const isTransitioningRef = useRef(false);

  // Helper save settings
  const saveSettingsToStorage = (settings: Partial<StoredAudioSettings>) => {
    try {
      const currentSettings = localStorage.getItem("audioSettings");
      const parsedOld = currentSettings ? JSON.parse(currentSettings) : {};

      // ⭐ ตรวจสอบว่ามีค่า hasVisited เดิมไหม ถ้าไม่มีให้ใช้ค่าปัจจุบันจาก State
      // (ป้องกันกรณีบันทึกแค่ volume แล้ว hasVisited หาย)
      const mergedSettings = {
        ...parsedOld, // เอาค่าเก่ามาก่อน
        ...settings, // เอาค่าใหม่มาทับ
      };

      // เช็คกันเหนียว: ถ้าใน settings ใหม่ไม่มี hasVisited ให้ดูว่าของเก่ามีไหม
      // ถ้าไม่มีทั้งคู่ ให้ถือว่ายังไม่ Visit (false) หรือถ้า userConsented เป็น true แล้วก็ให้เป็น true
      if (mergedSettings.hasVisited === undefined) {
        mergedSettings.hasVisited = userConsented;
      }

      localStorage.setItem("audioSettings", JSON.stringify(mergedSettings));
    } catch (error) {
      console.error("Failed to save audio settings", error);
    }
  };

  // สร้าง audio element ครั้งเดียว
  useEffect(() => {
    // 1. Setup Audio Element
    const audio = new Audio("/assets/Sound/bg-music.mp3");
    audio.loop = true;
    audioRef.current = audio;

    // 2. Load from Storage
    const savedData = localStorage.getItem("audioSettings");

    if (savedData) {
      try {
        const settings: StoredAudioSettings = JSON.parse(savedData);

        // 1. Apply Values
        const loadedMuted = settings.isMuted ?? false;
        const loadedVolume = settings.volume ?? 30;
        const loadedSfx = settings.sfxVolume ?? 50;

        // Apply to State
        setIsMuted(loadedMuted);
        setVolume(loadedVolume);
        setSfxVolume(loadedSfx);

        if (settings.hasVisited) {
          setUserConsented(true);
          setAnimationsStarted(true);

          setIsMuted(true);
          audio.muted = true;
          setIsPlaying(false);
        } else {
          // กรณีมาครั้งแรกสุดจริงๆ
          setIsMuted(settings.isMuted ?? true);
          audio.muted = settings.isMuted ?? true;
        }

        audio.volume = loadedVolume / 100;
      } catch (e) {
        console.error("Error parsing audio settings", e);
      }
    } else {
      // กรณีไม่มี Storage เลย (ครั้งแรกสุด)
      setIsMuted(true);
      audio.muted = true;
    }

    setIsInitialized(true); // Mark as ready

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

      // Pause audio ถ้ากำลังเล่นอยู่
      if (wasPlaying) {
        audio.pause();
        // รอให้ pause จบจริงๆ
        await new Promise<void>((resolve) => {
          if (audio.paused) {
            resolve();
          } else {
            audio.addEventListener("pause", () => resolve(), { once: true });
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
            audio.addEventListener("canplay", () => resolve(), { once: true });
          }
        });

        await audio.play();
      }
    }
  };

  // ฟังก์ชันเปลี่ยน bg music แบบ fade in/out
  const transitionBgMusic = async (src: string, fadeDuration = 1000) => {
    // ถ้ากำลัง transition อยู่ หรือเป็นเพลงเดียวกัน ไม่ต้องทำอะไร
    if (
      isTransitioningRef.current ||
      currentBgMusic === src ||
      !audioRef.current
    ) {
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
          await new Promise((resolve) => setTimeout(resolve, stepDuration));
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
            audio.addEventListener("canplay", () => resolve(), { once: true });
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
          await new Promise((resolve) => setTimeout(resolve, stepDuration));
        }

        audio.volume = targetVolume;
      }
    } catch (error) {
    } finally {
      isTransitioningRef.current = false;
    }
  };

  // อัพเดท mute
  useEffect(() => {
    if (!isInitialized) return; // ⭐ ห้ามทำถ้ายังโหลดไม่เสร็จ

    if (audioRef.current) {
      const audio = audioRef.current;
      audio.muted = isMuted;

      // ถ้า unmute และยัง consent แล้ว → เล่นเสียง
      if (!isMuted && userConsented) {
        if (audio.paused) {
          audio.play().catch((err) => console.error("Play failed:", err));
          setIsPlaying(true);
        }
      }

      // ถ้า mute → หยุดเล่น
      if (isMuted && !audio.paused) {
        audio.pause();
        setIsPlaying(false);
      }
    }
    saveSettingsToStorage({ isMuted });
  }, [isMuted, isInitialized, userConsented]);

  // อัพเดท volume
  useEffect(() => {
    if (!isInitialized) return;

    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
    saveSettingsToStorage({ volume });
  }, [volume, isInitialized]);

  // Update SFX Volume
  useEffect(() => {
    if (!isInitialized) return;
    saveSettingsToStorage({ sfxVolume });
  }, [sfxVolume, isInitialized]);

  const startAudio = async () => {
    if (audioRef.current) {
      const audio = audioRef.current;

      // 1. Update State UI
      setIsMuted(false); // เปิดเสียง
      setUserConsented(true);
      setAnimationsStarted(true);

      // 2. Save Immediately
      saveSettingsToStorage({
        hasVisited: true,
        isMuted: false,
        volume: volume,
      });

      // 3. Play
      try {
        if (audio.readyState < 2) {
          await new Promise<void>((resolve) => {
            audio.addEventListener("canplay", () => resolve(), { once: true });
          });
        }
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Start audio failed", err);
        setIsPlaying(false);
      }
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsMuted(true);
      setUserConsented(true);
      setAnimationsStarted(true);

      saveSettingsToStorage({
        hasVisited: true,
        isMuted: true,
      });
    }
  };

  const togglePlay = async () => {
    if (audioRef.current) {
      const audio = audioRef.current;
      try {
        if (isPlaying) {
          audio.pause();
          setIsPlaying(false);
          // ถ้าต้องการให้กด Pause แล้วถือว่า Mute ด้วย ให้เปิดบรรทัดล่างนี้
          // setIsMuted(true);
        } else {
          await audio.play();
          setIsPlaying(true);
          setIsMuted(false); // กด Play ต้องหาย Mute
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
        audio.volume = Math.max(0, originalVolume - volumeStep * currentStep);

        if (currentStep >= fadeSteps) {
          clearInterval(fadeOutInterval);
          audio.pause();
          audio.volume = originalVolume; // คืนค่า volume เดิม
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

      audio.volume = 0;

      // รอให้ audio พร้อมก่อน play
      if (audio.readyState < 2) {
        await new Promise<void>((resolve) => {
          audio.addEventListener("canplay", () => resolve(), { once: true });
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
        }
      }, stepDuration);
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
        isInitialized,
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
