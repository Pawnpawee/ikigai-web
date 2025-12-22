"use client";
import type { Howler as HowlerType, Howl as HowlType } from "howler";
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
  start: () => Promise<void>; //? เปลี่ยนเป็น Promise เพราะต้องรอ load library
  stop: () => Promise<void>;
  setBgMusic: (src: string | null) => void;
  setVolume: (vol: number) => void;
  setSfxVolume: (vol: number) => void;
  playSfx: (src: string, options?: { volumeMultiplier?: number }) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  // --- Refs & State ---
  //? ใช้ Ref เก็บ Class และ Object ที่โหลดมาแบบ Dynamic
  const HowlRef = useRef<typeof HowlType | null>(null);
  const HowlerRef = useRef<typeof HowlerType | null>(null);

  const soundRef = useRef<HowlType | null>(null);
  const isMutedRef = useRef(true);

  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(30);
  const [sfxVolume, setSfxVolumeState] = useState(30);
  const [currentBgMusic, setCurrentBgMusic] = useState<string | null>(null);

  const loadHowler = useCallback(async () => {
    if (HowlRef.current && HowlerRef.current) {
      return { Howl: HowlRef.current, Howler: HowlerRef.current };
    }

    try {
      //? จุดสำคัญ: import('howler') จะสร้าง Network Request แยกออกมา
      const mod = await import("howler");
      HowlRef.current = mod.Howl;
      HowlerRef.current = mod.Howler;
      return { Howl: mod.Howl, Howler: mod.Howler };
    } catch (error) {
      console.error("Failed to load audio library:", error);
      return null;
    }
  }, []);

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
    //? Logic นี้ทำงานทันทีเพื่อ UI State แต่จะไม่แตะ Howler จนกว่าจะโหลดเสร็จ
    const saved = localStorage.getItem("audioSettings");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.volume !== undefined) setVolume(parsed.volume);
      if (parsed.sfxVolume !== undefined) setSfxVolumeState(parsed.sfxVolume);
      if (parsed.isMuted === true) {
        setIsMuted(true);
        isMutedRef.current = true;
      } else {
        setIsMuted(false);
        isMutedRef.current = false;
      }
    } else {
      setIsMuted(false);
      isMutedRef.current = false;
    }

    //? ย้ายการ Init Audio ไปทำแบบ Async
    const initAudio = async () => {
      const lib = await loadHowler();
      if (!lib) return;

      const { Howler, Howl } = lib;

      // Apply saved settings to Howler global
      const savedVol = saved ? JSON.parse(saved).volume : 30;
      Howler.volume(savedVol / 100);
      Howler.mute(isMutedRef.current);

      // Start Default BG Music
      const defaultBgMusic = "/assets/Sound/bg-music.mp3";

      const bgSound = new Howl({
        src: [defaultBgMusic],
        loop: true,
      });

      soundRef.current = bgSound;
      setCurrentBgMusic(defaultBgMusic);
    };

    //? Delay การโหลดออกไปเล็กน้อยเพื่อให้หน้าเว็บ Render เสร็จก่อน (User Experience ดีขึ้น)
    const timer = setTimeout(() => {
      initAudio();
    }, 1000); // รอ 1 วินาที หรือรอจนกว่า user จะ interact ก็ได้

    return () => {
      clearTimeout(timer);
      if (HowlerRef.current) HowlerRef.current.unload();
    };
  }, [loadHowler]);

  // --- Actions ---

  // 1. Start: เปิดเสียง (Unmute)
  const start = async () => {
    const lib = await loadHowler();
    if (!lib) return;

    setIsMuted(false);
    isMutedRef.current = false;
    lib.Howler.mute(false);
    saveSettings({ isMuted: false });

    if (soundRef.current && !soundRef.current.playing()) {
      soundRef.current.play();
      soundRef.current.fade(0, volume / 100, 100);
    }
  };

  // 2. Stop: ปิดเสียง (Mute)
  const stop = async () => {
    const lib = await loadHowler();
    if (!lib) return;

    setIsMuted(true);
    isMutedRef.current = true;
    lib.Howler.mute(true);
    saveSettings({ isMuted: true });
  };

  // 3. Set Volume
  const updateVolume = (vol: number) => {
    setVolume(vol);
    saveSettings({ volume: vol });

    //? เช็คก่อนว่าโหลด Library หรือยัง ถ้ายังไม่โหลดก็แค่เซฟ state ไว้
    if (HowlerRef.current) {
      HowlerRef.current.volume(vol / 100);
    }
  };

  // 3.5. Set SFX Volume
  const setSfxVolume = (vol: number) => {
    setSfxVolumeState(vol);
    saveSettings({ sfxVolume: vol });
  };

  // 4. Set Background Music
  const setBgMusic = async (src: string | null) => {
    if (currentBgMusic === src) return;

    //? โหลด Library ก่อน
    const lib = await loadHowler();
    if (!lib) return;
    const { Howl } = lib;

    const prevSound = soundRef.current;
    if (prevSound) {
      prevSound.fade(prevSound.volume(), 0, 1000);
      prevSound.once("fade", () => {
        prevSound.stop();
        prevSound.unload();
      });
    }

    if (src) {
      setCurrentBgMusic(src);
      const newSound = new Howl({
        src: [src],
        loop: true,
        volume: 0,
        autoplay: false,
        onloaderror: (_id, err) => console.error("Load Error:", err),
        onplayerror: (_id, err) => {
          // Error handling logic
          console.warn("Play error", err);
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
    async (src: string, options?: { volumeMultiplier?: number }) => {
      if (isMutedRef.current) return;

      //? Load on demand: ถ้า User ยังไม่เคยเปิดเสียง Sfx จะโหลด library ตอนนี้
      const lib = await loadHowler();
      if (!lib) return;
      const { Howl } = lib;

      try {
        new Howl({
          src: [src],
          loop: false,
          volume: (sfxVolume / 100) * (options?.volumeMultiplier ?? 1.0),
          autoplay: true,
        });
      } catch (error) {
        console.error("Failed to play SFX:", error);
      }
    },
    [sfxVolume, loadHowler],
  );

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
