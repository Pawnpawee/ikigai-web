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
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
          if (audioRef.current) {
            audioRef.current.muted = true;
          }
          setIsPlaying(false);
        } else {
          // กรณีมาครั้งแรกสุดจริงๆ
          setIsMuted(settings.isMuted ?? true);
          if (audioRef.current) {
            audioRef.current.muted = settings.isMuted ?? true;
          }
        }
        if (audioRef.current) {
          audioRef.current.volume = loadedVolume / 100;
        }
      } catch (e) {
        console.error("Error parsing audio settings", e);
      }
    } else {
      // กรณีไม่มี Storage เลย (ครั้งแรกสุด)
      setIsMuted(true);
      if (audioRef.current) {
        audioRef.current.muted = true;
      }
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
      // If there's a separate bgMusic audio element playing, stop it
      const existingBg = bgMusicRef.current as HTMLAudioElement | null;
      if (existingBg && !existingBg.paused) {
        try {
          existingBg.pause();
        } catch (e) {
          console.warn("Failed to pause bgMusicRef in setBgMusic", e);
        }
      }
      bgMusicRef.current = null;
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
      const wasPlaying = !audioRef.current.paused;

      // Pause audio ถ้ากำลังเล่นอยู่
      if (wasPlaying) {
        audioRef.current.pause();
        // รอให้ pause จบจริงๆ
        await new Promise<void>((resolve) => {
          if (audioRef.current?.paused) {
            resolve();
          } else {
            audioRef.current?.addEventListener("pause", () => resolve(), {
              once: true,
            });
          }
        });
      }

      // เปลี่ยน src และ load
      audioRef.current.src = src;
      audioRef.current.load();
      setCurrentBgMusic(src);

      // รอให้ audio พร้อมก่อน play
      if (wasPlaying) {
        await new Promise<void>((resolve) => {
          if (audioRef.current && audioRef.current.readyState >= 2) {
            resolve();
          } else {
            audioRef.current?.addEventListener("canplay", () => resolve(), {
              once: true,
            });
          }
        });

        try {
          await audioRef.current.play();
          // Make sure bgMusicRef is not playing
          const existingAfter = bgMusicRef.current as HTMLAudioElement | null;
          if (existingAfter && !existingAfter.paused) {
            try {
              existingAfter.pause();
            } catch (e) {
              console.warn("Failed to pause bgMusicRef after play", e);
            }
          }
        } catch (err) {
          // ถ้า browser บล็อก autoplay จะโยน DOMException (NotAllowedError)
          // ให้รอการ interact ครั้งแรกของผู้ใช้ แล้วลองเล่นใหม่จาก handler นั้น
          console.warn(
            "Autoplay blocked for setBgMusic, waiting for user gesture to resume.",
            err,
          );

          const onUserGesture = async () => {
            try {
              if (audioRef.current) {
                await audioRef.current.play();
                setIsPlaying(true);
                setUserConsented(true);
                setAnimationsStarted(true);
                saveSettingsToStorage({
                  hasVisited: true,
                  isMuted: false,
                  volume,
                });
              }
            } catch (e) {
              console.error("Play after user gesture failed", e);
            }
            window.removeEventListener("pointerdown", onUserGesture);
            window.removeEventListener("touchstart", onUserGesture);
          };

          window.addEventListener("pointerdown", onUserGesture, {
            once: true,
            passive: true,
          } as any);
          window.addEventListener("touchstart", onUserGesture, {
            once: true,
            passive: true,
          } as any);
        }
      }
    }
  };

  // ฟังก์ชันเปลี่ยน bg music แบบ fade in/out
  const transitionBgMusic = async (src: string, fadeDuration = 1000) => {
    if (currentBgMusic === src) return; // ถ้าเพลงเดิมไม่ต้องทำอะไร

    // Ensure the main audioRef is not also playing — bg music must be exclusive
    if (audioRef.current && !audioRef.current.paused) {
      try {
        audioRef.current.pause();
        setIsPlaying(false);
      } catch (e) {
        console.warn("Failed to pause primary audioRef before transition", e);
      }
    }

    // 1. Fade Out เพลงเก่า (ถ้ามี)
    if (bgMusicRef.current) {
      const oldAudio = bgMusicRef.current; // เก็บ ref ตัวเก่าไว้จัดการ
      const steps = 20;
      const stepTime = fadeDuration / steps;
      const volStep = oldAudio.volume / steps;

      // Clear interval เก่าถ้ามี
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

      const fadeOut = setInterval(() => {
        if (oldAudio.volume > volStep) {
          oldAudio.volume -= volStep;
        } else {
          oldAudio.volume = 0;
          oldAudio.pause();
          clearInterval(fadeOut);
        }
      }, stepTime);
    }

    // 2. Setup เพลงใหม่
    setCurrentBgMusic(src);
    const newAudio = new Audio(src);
    newAudio.loop = true;
    newAudio.volume = 0; // เริ่มจาก 0
    bgMusicRef.current = newAudio; // ⭐ update ref เป็นตัวใหม่ทันที

    try {
      await newAudio.play();
      setIsPlaying(true);
      setUserConsented(true);
      setAnimationsStarted(true);
      // 3. Fade In
      const steps = 20;
      // volume state is 0-100; audio.volume expects 0-1
      const targetVol = isMuted ? 0 : volume / 100; // เช็ค Mute ด้วย
      const stepTime = fadeDuration / steps;
      const volStep = targetVol / steps;

      // ⭐ เก็บ interval ใหม่ลง ref
      fadeIntervalRef.current = setInterval(() => {
        // ต้องเช็คว่า audio นี้ยังเป็น current อยู่ไหม (เผื่อเปลี่ยนเพลงเร็วมาก)
        if (newAudio !== bgMusicRef.current) return;

        if (newAudio.volume < targetVol - volStep) {
          newAudio.volume += volStep;
        } else {
          newAudio.volume = targetVol;
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        }
      }, stepTime);
    } catch (err) {
      // Autoplay may be blocked — retry on first user gesture
      console.warn(
        "Audio play failed (autoplay blocked). Will retry on user interaction.",
        err,
      );

      const onUserGesture = async () => {
        try {
          // ยืนยันว่า newAudio ยังเป็นตัวปัจจุบัน
          if (newAudio === bgMusicRef.current) {
            await newAudio.play();
            setIsPlaying(true);
            setUserConsented(true);
            setAnimationsStarted(true);
            saveSettingsToStorage({ hasVisited: true, isMuted: false, volume });
          }
        } catch (e) {
          console.error("Play after user gesture failed", e);
        }
        window.removeEventListener("pointerdown", onUserGesture);
        window.removeEventListener("touchstart", onUserGesture);
      };

      window.addEventListener("pointerdown", onUserGesture, {
        once: true,
        passive: true,
      } as any);
      window.addEventListener("touchstart", onUserGesture, {
        once: true,
        passive: true,
      } as any);
    }
  };

  // อัพเดท mute — pause/resume ทั้ง primary และ bg audio ให้เป็นหนึ่งเดียว
  useEffect(() => {
    if (!isInitialized) return; // ห้ามทำถ้ายังโหลดไม่เสร็จ

    const primary = audioRef.current;
    const bg = bgMusicRef.current as HTMLAudioElement | null;

    if (primary) {
      primary.muted = isMuted;
    }

    if (isMuted) {
      // Mute: pause both audios and clear any fades
      if (primary && !primary.paused) {
        try {
          primary.pause();
        } catch (e) {
          console.warn("Failed to pause primary on mute", e);
        }
        setIsPlaying(false);
      }

      if (bg && !bg.paused) {
        try {
          bg.pause();
        } catch (e) {
          console.warn("Failed to pause bg on mute", e);
        }
      }

      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
    } else {
      // Unmute: if consented, resume appropriate audio asynchronously
      if (userConsented) {
        (async () => {
          const targetVol = Math.min(1, Math.max(0, volume / 100));

          if (bg) {
            // If bg exists, prefer it and pause primary
            if (primary && !primary.paused) {
              try {
                primary.pause();
                setIsPlaying(false);
              } catch (e) {
                console.warn("Failed to pause primary before resuming bg", e);
              }
            }

            try {
              bg.volume = targetVol;
              await bg.play();
              setIsPlaying(true);
            } catch (err) {
              console.error("Failed to resume bg on unmute", err);
            }
          } else if (primary) {
            try {
              await primary.play();
              setIsPlaying(true);
            } catch (err) {
              console.error("Failed to resume primary on unmute", err);
            }
          }
        })();
      }
    }

    saveSettingsToStorage({ isMuted });
  }, [isMuted, isInitialized, userConsented, volume]);

  // อัพเดท volume
  useEffect(() => {
    if (!isInitialized) return;

    if (audioRef.current) {
      const targetVolume = volume / 100;

      // Safari fix: ต้อง set volume หลายครั้งเพื่อให้มันใช้งานได้
      audioRef.current.volume = targetVolume;

      // Force update volume หลังจาก 10ms (Safari workaround)
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.volume = targetVolume;
        }
      }, 10);
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
        // Ensure any bgMusicRef is paused before starting primary audio
        const existingBg = bgMusicRef.current as HTMLAudioElement | null;
        if (existingBg && !existingBg.paused) {
          try {
            existingBg.pause();
          } catch (e) {
            console.warn("Failed to pause bgMusicRef in startAudio", e);
          }
        }
        if (audioRef.current.readyState < 2) {
          await new Promise<void>((resolve) => {
            audioRef.current?.addEventListener("canplay", () => resolve(), {
              once: true,
            });
          });
        }
        await audioRef.current.play();
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
      // Also pause any bgMusicRef
      const existingBg = bgMusicRef.current as HTMLAudioElement | null;
      if (existingBg && !existingBg.paused) {
        try {
          existingBg.pause();
        } catch (e) {
          console.warn("Failed to pause bgMusicRef in pauseAudio", e);
        }
      }
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
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
          // ถ้าต้องการให้กด Pause แล้วถือว่า Mute ด้วย ให้เปิดบรรทัดล่างนี้
          // setIsMuted(true);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
          setIsMuted(false); // กด Play ต้องหาย Mute
        }
      } catch (error) {
        console.error("Toggle play failed:", error);
      }
    }
  };

  const pauseBgMusic = () => {
    // Fade out both audio elements (audioRef and bgMusicRef)
    const fadeDuration = 1000;
    const fadeSteps = 20;
    const stepDuration = fadeDuration / fadeSteps;

    // Fade out audioRef
    if (audioRef.current && !audioRef.current.paused) {
      const originalVolume1 = audioRef.current.volume;
      const volumeStep1 = originalVolume1 / fadeSteps;
      let currentStep1 = 0;
      
      const fadeOutInterval1 = setInterval(() => {
        currentStep1++;
        if (audioRef.current) {
          audioRef.current.volume = Math.max(
            0,
            originalVolume1 - volumeStep1 * currentStep1,
          );

          if (currentStep1 >= fadeSteps) {
            clearInterval(fadeOutInterval1);
            audioRef.current.pause();
            audioRef.current.volume = originalVolume1;
          }
        }
      }, stepDuration);
    }

    // Fade out bgMusicRef (for scene-specific music like egypt)
    if (bgMusicRef.current && !bgMusicRef.current.paused) {
      const originalVolume2 = bgMusicRef.current.volume;
      const volumeStep2 = originalVolume2 / fadeSteps;
      let currentStep2 = 0;
      
      const fadeOutInterval2 = setInterval(() => {
        currentStep2++;
        if (bgMusicRef.current) {
          bgMusicRef.current.volume = Math.max(
            0,
            originalVolume2 - volumeStep2 * currentStep2,
          );

          if (currentStep2 >= fadeSteps) {
            clearInterval(fadeOutInterval2);
            bgMusicRef.current.pause();
            bgMusicRef.current.volume = originalVolume2;
          }
        }
      }, stepDuration);
    }
    
    setIsPlaying(false);
  };

  const resumeBgMusic = async () => {
    if (audioRef.current && isInitialized && !isMuted) {
      const targetVolume = volume / 100;
      const fadeDuration = 1000; // 500ms fade in
      const fadeSteps = 20;
      const volumeStep = targetVolume / fadeSteps;
      const stepDuration = fadeDuration / fadeSteps;

      audioRef.current.volume = 0;

      // รอให้ audio พร้อมก่อน play
      if (audioRef.current.readyState < 2) {
        await new Promise<void>((resolve) => {
          audioRef.current?.addEventListener("canplay", () => resolve(), {
            once: true,
          });
        });
      }

      await audioRef.current.play();

      let currentStep = 0;
      const fadeInInterval = setInterval(() => {
        currentStep++;
        if (audioRef.current) {
          audioRef.current.volume = Math.min(
            targetVolume,
            volumeStep * currentStep,
          );

          if (currentStep >= fadeSteps) {
            clearInterval(fadeInInterval);
            audioRef.current.volume = targetVolume;
          }
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
