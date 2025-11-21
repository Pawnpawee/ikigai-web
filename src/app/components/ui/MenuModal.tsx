"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAudio } from "@/app/contexts/AudioContext";

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuModal({ isOpen, onClose }: MenuModalProps) {
  const { volume, sfxVolume, setVolume, setSfxVolume } = useAudio();

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
  };

  const handleSfxVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setSfxVolume(newVolume);
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
              <h2 className="typo-h4 text-white">เมนู</h2>
              <button
                onClick={onClose}
                className="text-white hover:text-slate-300 transition-colors"
                aria-label="ปิดเมนู"
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

            {/* Volume Controls Section */}
            <div className="mb-6 space-y-6 pb-6 border-b border-slate-700">
              {/* Background Music Volume */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="typo-p-lg text-white">ระดับเสียงประกอบ</span>
                  <span className="typo-p-lg text-blue-400 font-semibold">
                    {volume}%
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Volume Icon Low */}
                  <svg
                    width="20"
                    height="20"
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
                    width="20"
                    height="20"
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

              {/* Sound Effect Volume */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="typo-p-lg text-white">เสียง Effect</span>
                  <span className="typo-p-lg text-orange-400 font-semibold">
                    {sfxVolume}%
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* SFX Icon */}
                  <svg
                    width="20"
                    height="20"
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
                    width="20"
                    height="20"
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
            </div>

            {/* Menu Items */}
            <nav className="flex flex-col gap-4">
              {/* Privacy Policy Button */}
              <Link
                href="/privacy-policy"
                onClick={onClose}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  {/* Icon */}
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full shrink-0">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-400"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="typo-h6 text-white group-hover:text-blue-400 transition-colors">
                      นโยบายความเป็นส่วนตัว
                    </h3>
                    <p className="typo-p-sm text-slate-400">
                      ข้อมูลและความปลอดภัย
                    </p>
                  </div>
                  {/* Arrow */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-400 group-hover:text-blue-400 transition-colors"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </motion.div>
              </Link>

              {/* About Button */}
              <Link
                href="/about"
                onClick={onClose}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  {/* Icon */}
                  <div className="flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full shrink-0">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-purple-400"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                  </div>
                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="typo-h6 text-white group-hover:text-purple-400 transition-colors">
                      เกี่ยวกับเรา
                    </h3>
                    <p className="typo-p-sm text-slate-400">
                      ข้อมูลและติดต่อ
                    </p>
                  </div>
                  {/* Arrow */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-400 group-hover:text-purple-400 transition-colors"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </motion.div>
              </Link>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
