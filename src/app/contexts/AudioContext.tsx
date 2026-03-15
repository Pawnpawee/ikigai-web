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
  const targetBgMusicRef = useRef<string | null>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(30);
  const [sfxVolume, setSfxVolumeState] = useState(50);
  const [currentBgMusic, setCurrentBgMusic] = useState<string | null>(null);

  //? Create bg music Howl with loop fallback for browsers/codecs where loop can be flaky
  const createBgHowl = useCallback((src: string) => {
    const bgSound = new Howl({
      src: [src],
      loop: true,
      volume: 0,
      autoplay: false,
      onplayerror: (_id, err) => {
        console.warn("Play Error:", err);
        bgSound.once("unlock", () => {
          bgSound.play();
        });
      },
      onend: () => {
        //! warning Fallback replay if native loop fails on some devices/browsers
        if (bgSound.loop() && !bgSound.playing()) {
          bgSound.play();
        }
      },
    });

    return bgSound;
  }, []);

  // --- Initialization ---
  useEffect(() => {
    // Default state
    setIsMuted(true);
    isMutedRef.current = true;
    Howler.mute(true);

    const timer = setTimeout(() => {
      const defaultBgMusic = getAudioUrl("Sound/bg-music.mp3");

      const bgSound = createBgHowl(defaultBgMusic);

      soundRef.current = bgSound;
      setCurrentBgMusic(defaultBgMusic);
      targetBgMusicRef.current = defaultBgMusic;
    }, 100);

    return () => {
      clearTimeout(timer);
      Howler.unload();
    };
  }, [createBgHowl]);

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
  };

  // 3. Set Volume (เฉพาะ Background Music เท่านั้น ไม่กระทบ SFX)
  const updateVolume = (vol: number) => {
    setVolume(vol);
    //? ตั้งค่า volume เฉพาะ bg music instance แทน Howler.volume() ที่เป็น global
    if (soundRef.current) {
      soundRef.current.volume(vol / 100);
    }
  };

  // 4. Set SFX Volume
  const updateSfxVolume = (vol: number) => {
    setSfxVolumeState(vol);
  };

  // 4. Set Background Music (with Fade In/Out)
  const setBgMusic = (
    src: string | null,
    options?: { immediate?: boolean },
  ) => {
    const immediate = options?.immediate ?? false;
    //? Use ref to track target to prevent race condition when routing rapidly
    if (targetBgMusicRef.current === src) return;

    targetBgMusicRef.current = src;
    setCurrentBgMusic(src);

    //? Clear pending timeout to prevent overlapping song starts
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }

    const prevSound = soundRef.current;

    // Step B: เล่นตัวใหม่ (หลัง fade out ของเก่าจบ)
    const playNewSound = () => {
      if (src) {
        const newSound = createBgHowl(src);
        soundRef.current = newSound;

        if (!isMutedRef.current) {
          if (Howler.ctx && Howler.ctx.state === "suspended") {
            Howler.ctx.resume();
          }

          newSound.play();
          newSound.fade(0, Math.max(0.001, volume / 100), 1000);
        }
      } else {
        soundRef.current = null;
      }
    };

    // Step A: Fade out เพลงเก่าก่อน
    if (prevSound) {
      if (immediate) {
        prevSound.stop();
        prevSound.unload();
        playNewSound();
      } else {
        if (prevSound.playing()) {
          prevSound.fade(prevSound.volume(), 0, 500);
        }

        //? รอให้ fade out เสร็จก่อน stop และ unload แล้วเล่นอันใหม่
        transitionTimeoutRef.current = setTimeout(() => {
          prevSound.stop();
          prevSound.unload();
          playNewSound();
        }, 500);
      }
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
        setSfxVolume: updateSfxVolume,
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
