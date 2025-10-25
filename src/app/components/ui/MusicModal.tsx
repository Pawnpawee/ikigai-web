"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/app/contexts/AudioContext";

interface MusicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MusicModal({ isOpen, onClose }: MusicModalProps) {
  const { isMuted, volume, sfxVolume, isPlaying, setVolume, setSfxVolume, togglePlay, setIsMuted } = useAudio();

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    
    // ถ้า slider > 0 และกำลัง mute อยู่ → Unmute และเล่นเสียง
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
      if (!isPlaying) {
        togglePlay();
      }
    }
    
    // ถ้าทั้ง volume และ sfxVolume เป็น 0 → Mute
    if (newVolume === 0 && sfxVolume === 0) {
      setIsMuted(true);
      if (isPlaying) {
        togglePlay();
      }
    }
    
    console.log("Volume changed:", newVolume);
  };

  const handleSfxVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setSfxVolume(newVolume);
    
    // ถ้า slider > 0 และกำลัง mute อยู่ → Unmute และเล่นเสียง
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
      if (!isPlaying) {
        togglePlay();
      }
    }
    
    // ถ้าทั้ง volume และ sfxVolume เป็น 0 → Mute
    if (volume === 0 && newVolume === 0) {
      setIsMuted(true);
      if (isPlaying) {
        togglePlay();
      }
    }
    
    console.log("SFX Volume changed:", newVolume);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      // กด Pause → Mute เสียง
      setIsMuted(true);
    } else {
      // กด Play → Unmute เสียง
      setIsMuted(false);
    }
    togglePlay();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl z-101 p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="typo-h4 text-white">เสียงประกอบ</h2>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-slate-300 transition-colors"
                aria-label="ปิด"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Play/Pause Button */}
            <div className="flex items-center justify-center mb-6">
              <button
                onClick={handleTogglePlay}
                className="w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors flex items-center justify-center shadow-lg"
                aria-label={isPlaying ? "หยุดชั่วคราว" : "เล่น"}
              >
                {isPlaying ? (
                  // Pause icon
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  // Play icon
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </button>
            </div>


            {/* Volume Control */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="typo-p-lg text-white">ระดับเสียง</span>
                <span className="typo-p-lg text-blue-400 font-semibold">
                  {volume}%
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Volume Icon Low */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-400 shrink-0"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                </svg>

                {/* Slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-blue-500
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:hover:bg-blue-400
                    [&::-moz-range-thumb]:w-4
                    [&::-moz-range-thumb]:h-4
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-blue-500
                    [&::-moz-range-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:border-0
                    [&::-moz-range-thumb]:hover:bg-blue-400"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume}%, #334155 ${volume}%, #334155 100%)`,
                  }}
                />

                {/* Volume Icon High */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-400 shrink-0"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              </div>
            </div>

            {/* Sound Effect Volume Control */}
            <div className="space-y-4 mt-6 pt-6 border-t border-slate-700">
              <div className="flex items-center justify-between">
                <span className="typo-p-lg text-white">เสียง Effect</span>
                <span className="typo-p-lg text-orange-400 font-semibold">
                  {sfxVolume}%
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* SFX Icon */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-400 shrink-0"
                >
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>

                {/* SFX Slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sfxVolume}
                  onChange={handleSfxVolumeChange}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-orange-500
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:hover:bg-orange-400
                    [&::-moz-range-thumb]:w-4
                    [&::-moz-range-thumb]:h-4
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-orange-500
                    [&::-moz-range-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:border-0
                    [&::-moz-range-thumb]:hover:bg-orange-400"
                  style={{
                    background: `linear-gradient(to right, #f97316 0%, #f97316 ${sfxVolume}%, #334155 ${sfxVolume}%, #334155 100%)`,
                  }}
                />

                {/* Sparkle Icon */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-400 shrink-0"
                >
                  <path d="M12 2v4" />
                  <path d="M12 18v4" />
                  <path d="M4.93 4.93l2.83 2.83" />
                  <path d="M16.24 16.24l2.83 2.83" />
                  <path d="M2 12h4" />
                  <path d="M18 12h4" />
                  <path d="M4.93 19.07l2.83-2.83" />
                  <path d="M16.24 7.76l2.83-2.83" />
                </svg>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
