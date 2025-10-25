"use client";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface AudioContextType {
  isMuted: boolean;
  volume: number;
  sfxVolume: number;
  isPlaying: boolean;
  userConsented: boolean;
  animationsStarted: boolean;
  setIsMuted: (muted: boolean) => void;
  setVolume: (volume: number) => void;
  setSfxVolume: (volume: number) => void;
  togglePlay: () => void;
  startAudio: () => void;
  pauseAudio: () => void;
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
        console.log("Starting audio...");
        setIsMuted(false); // ตั้งค่า mute เป็น false เมื่อผู้ใช้เลือกเปิดเสียง
        await audioRef.current.play();
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

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.log("Play failed:", error);
        });
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
        setIsMuted,
        setVolume,
        setSfxVolume,
        togglePlay,
        startAudio,
        pauseAudio,
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
