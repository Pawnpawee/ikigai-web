"use client";
import { Howl, Howler } from "howler";
import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface AudioContextType {
  // State
  isMuted: boolean;
  volume: number;
  sfxVolume: number;
  currentBgMusic: string | null;

  // Actions
  start: () => void;
  stop: () => void;
  setBgMusic: (src: string | null) => void;
  setVolume: (vol: number) => void;
  setSfxVolume: (vol: number) => void;
  playSfx: (src: string, options?: { volumeMultiplier?: number }) => void;
  stopAllSfx: () => void; //? หยุดเสียง SFX ทั้งหมด
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  // --- Refs & State ---
  const soundRef = useRef<Howl | null>(null);
  const isMutedRef = useRef(true);
  //? เก็บ SFX Howl instances ที่เล่นอยู่เพื่อให้สามารถ stop ได้
  const sfxSoundsRef = useRef<Set<Howl>>(new Set());

  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(30);
  const [sfxVolume, setSfxVolumeState] = useState(50);
  const [currentBgMusic, setCurrentBgMusic] = useState<string | null>(null);

  // --- Helper: Save to LocalStorage ---
  const saveSettings = useCallback(
    (settings: { isMuted?: boolean; volume?: number; sfxVolume?: number }) => {
      try {
        const old = JSON.parse(localStorage.getItem("audioSettings") || "{}");
        const merged = { ...old, ...settings };
        localStorage.setItem("audioSettings", JSON.stringify(merged));
      } catch (e) {
        console.error("Save settings failed", e);
      }
    },
    [],
  );

  // --- Initialization ---
  useEffect(() => {
    const saved = localStorage.getItem("audioSettings");
    if (saved) {
      const {
        isMuted: savedMuted,
        volume: savedVol,
        sfxVolume: savedSfxVol,
      } = JSON.parse(saved);

      // ตั้งค่า Volume เริ่มต้น
      if (savedVol !== undefined) {
        setVolume(savedVol);
        Howler.volume(savedVol / 100);
      }

      // ตั้งค่า SFX Volume
      if (savedSfxVol !== undefined) {
        setSfxVolumeState(savedSfxVol);
      }

      // ตั้งค่า Mute
      if (savedMuted === true) {
        setIsMuted(true);
        isMutedRef.current = true;
        Howler.mute(true);
      }
    } else {
      // Default state
      setIsMuted(false);
      isMutedRef.current = false;
      Howler.mute(false);
    }

    const timer = setTimeout(() => {
      const defaultBgMusic = "/assets/Sound/bg-music.mp3";

      const bgSound = new Howl({
        src: [defaultBgMusic],
        loop: true,
      });

      soundRef.current = bgSound;
      setCurrentBgMusic(defaultBgMusic);
    }, 100);

    return () => {
      clearTimeout(timer);
      Howler.unload();
    };
  }, []);

  // --- Actions ---

  // 1. Start: เปิดเสียง (Unmute)
  const start = () => {
    setIsMuted(false);
    isMutedRef.current = false;
    Howler.mute(false);
    saveSettings({ isMuted: false });

    // Resume ถ้ามีเพลงค้างอยู่
    if (soundRef.current && !soundRef.current.playing()) {
      soundRef.current.play();
      soundRef.current.fade(0, volume / 100, 100);
    }
  };

  // 2. Stop: ปิดเสียง (Mute)
  const stop = () => {
    setIsMuted(true);
    isMutedRef.current = true;
    Howler.mute(true);
    saveSettings({ isMuted: true });
  };

  // 3. Set Volume
  const updateVolume = (vol: number) => {
    setVolume(vol);
    Howler.volume(vol / 100);
    saveSettings({ volume: vol });
  };

  // 3.5. Set SFX Volume
  const setSfxVolume = (vol: number) => {
    setSfxVolumeState(vol);
    saveSettings({ sfxVolume: vol });
  };

  // 4. Set Background Music
  const setBgMusic = (src: string | null) => {
    if (currentBgMusic === src) return;

    const prevSound = soundRef.current;

    // Step A: หยุดตัวเก่า
    if (prevSound) {
      prevSound.stop();
      prevSound.unload();
    }

    // Step B: เล่นตัวใหม่
    if (src) {
      setCurrentBgMusic(src);

      const newSound = new Howl({
        src: [src],
        loop: true,
        volume: 0,
        autoplay: false,
        onplayerror: (_id, err) => {
          console.warn("Play Error:", err);
          soundRef.current?.once("unlock", () => {
            soundRef.current?.play();
          });
        },
      });

      soundRef.current = newSound;
      newSound.play();

      if (!isMuted) {
        newSound.fade(0, volume / 100, 1500);
      }
    } else {
      setCurrentBgMusic(null);
      soundRef.current = null;
    }
  };

  const playSfx = useCallback(
    (src: string, options?: { volumeMultiplier?: number }) => {
      if (isMutedRef.current) return;

      try {
        const sound = new Howl({
          src: [src],
          loop: false,
          volume: (sfxVolume / 100) * (options?.volumeMultiplier ?? 1.0),
          autoplay: true,
          onend: () => {
            //? เมื่อเล่นจบให้ลบออกจาก Set และ unload
            sfxSoundsRef.current.delete(sound);
            sound.unload();
          },
        });
        //? เก็บ reference ไว้เพื่อให้สามารถ stop ได้ภายหลัง
        sfxSoundsRef.current.add(sound);
      } catch (error) {
        console.error("Failed to play SFX:", error);
      }
    },
    [sfxVolume],
  );

  //? หยุดเสียง SFX ทั้งหมดที่กำลังเล่นอยู่
  const stopAllSfx = useCallback(() => {
    sfxSoundsRef.current.forEach((sound) => {
      sound.stop();
      sound.unload();
    });
    sfxSoundsRef.current.clear();
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isMuted,
        volume,
        sfxVolume,
        currentBgMusic,
        start,
        stop,
        setBgMusic,
        setVolume: updateVolume,
        setSfxVolume,
        playSfx,
        stopAllSfx,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used within AudioProvider");
  return context;
};
