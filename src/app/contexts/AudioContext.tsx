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
import { getAudioUrl } from "@/utils/cloudinaryUtils";

interface AudioContextType {
  // State
  isMuted: boolean;
  volume: number;
  sfxVolume: number;
  currentBgMusic: string | null;

  // Actions
  start: () => void;
  stop: () => void;
  setBgMusic: (src: string | null, options?: { immediate?: boolean }) => void;
  setVolume: (vol: number) => void;
  setSfxVolume: (vol: number) => void;
  playSfx: (
    src: string,
    options?: { volumeMultiplier?: number; loop?: boolean },
  ) => Howl | undefined;
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
      } else {
        //? savedMuted === false: restore unmuted state for returning users
        //! Without this, isMuted stays true (useState default) → all SFX blocked
        setIsMuted(false);
        isMutedRef.current = false;
        Howler.mute(false);
        //? iOS Safari: AudioContext starts suspended on every page load.
        //? Resume it here so scroll-triggered sounds work without requiring a gesture.
        if (Howler.ctx && Howler.ctx.state === "suspended") {
          Howler.ctx.resume();
        }
      }
    } else {
      // Default state
      setIsMuted(false);
      isMutedRef.current = false;
      Howler.mute(false);
    }

    const timer = setTimeout(() => {
      const defaultBgMusic = getAudioUrl("Sound/bg-music.mp3");

      const bgSound = new Howl({
        src: [defaultBgMusic],
        loop: true,
        volume: 0, //? จะ fade in ตอน start()
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
    //? iOS Safari: resume suspended AudioContext when user explicitly enables audio
    if (Howler.ctx && Howler.ctx.state === "suspended") {
      Howler.ctx.resume();
    }
    saveSettings({ isMuted: false });

    //? Resume หรือ fade in เพลงที่เล่นอยู่ (อาจเล่นอยู่แล้วที่ volume 0)
    if (soundRef.current) {
      if (!soundRef.current.playing()) {
        soundRef.current.play();
      }
      soundRef.current.fade(0, volume / 100, 500);
    }
  };

  // 2. Stop: ปิดเสียง (Mute)
  const stop = () => {
    setIsMuted(true);
    isMutedRef.current = true;
    Howler.mute(true);
    saveSettings({ isMuted: true });
  };

  // 3. Set Volume (เฉพาะ Background Music เท่านั้น ไม่กระทบ SFX)
  const updateVolume = (vol: number) => {
    setVolume(vol);
    //? ตั้งค่า volume เฉพาะ bg music instance แทน Howler.volume() ที่เป็น global
    if (soundRef.current) {
      soundRef.current.volume(vol / 100);
    }
    saveSettings({ volume: vol });
  };

  // 3.5. Set SFX Volume
  const setSfxVolume = (vol: number) => {
    setSfxVolumeState(vol);
    saveSettings({ sfxVolume: vol });
  };

  // 4. Set Background Music (with Fade In/Out)
  const setBgMusic = (
    src: string | null,
    options?: { immediate?: boolean },
  ) => {
    const immediate = options?.immediate ?? false;
    if (currentBgMusic === src) return;

    const prevSound = soundRef.current;

    // Step A: Fade out เพลงเก่าก่อน
    if (prevSound?.playing()) {
      if (immediate) {
        prevSound.stop();
        prevSound.unload();
      } else {
        prevSound.fade(prevSound.volume(), 0, 500);

        //? รอให้ fade out เสร็จก่อน stop และ unload
        setTimeout(() => {
          prevSound.stop();
          prevSound.unload();
        }, 500);
      }
    } else if (prevSound) {
      //? ถ้าไม่ได้เล่นอยู่ก็ unload ทันที
      prevSound.unload();
    }

    // Step B: เล่นตัวใหม่ (หลัง fade out ของเก่าจบ)
    const playNewSound = () => {
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

        //? Mobile Safari: ให้ resume AudioContext ก่อน play เพื่อกันเสียงไม่ออก
        if (!isMuted && Howler.ctx && Howler.ctx.state === "suspended") {
          Howler.ctx.resume();
        }

        newSound.play();

        //? Fade in เพลงใหม่
        if (!isMuted) {
          newSound.fade(0, volume / 100, 1000);
        }
      } else {
        setCurrentBgMusic(null);
        soundRef.current = null;
      }
    };

    //? เริ่มเล่นเพลงใหม่หลังจากเพลงเก่า fade out เสร็จ (หรือทันทีถ้าไม่มีเพลงเก่า)
    if (prevSound?.playing() && !immediate) {
      setTimeout(playNewSound, 500);
    } else {
      playNewSound();
    }
  };

  const playSfx = useCallback(
    (
      src: string,
      options?: { volumeMultiplier?: number; loop?: boolean },
    ): Howl | undefined => {
      if (isMutedRef.current) return undefined;

      try {
        const isLoop = options?.loop ?? false;
        const sound = new Howl({
          src: [src],
          loop: isLoop,
          volume: (sfxVolume / 100) * (options?.volumeMultiplier ?? 1.0),
          autoplay: true,
          onend: isLoop
            ? undefined
            : () => {
                //? เมื่อเล่นจบให้ลบออกจาก Set และ unload (เฉพาะ non-loop)
                sfxSoundsRef.current.delete(sound);
                sound.unload();
              },
        });
        //? เก็บ reference ไว้เพื่อให้สามารถ stop ได้ภายหลัง
        sfxSoundsRef.current.add(sound);
        return sound;
      } catch (error) {
        console.error("Failed to play SFX:", error);
        return undefined;
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
