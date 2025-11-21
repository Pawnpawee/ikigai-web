"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/app/contexts/AudioContext";

interface MusicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MusicModal({ isOpen, onClose }: MusicModalProps) {
  const { isMuted, setIsMuted } = useAudio();

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    onClose(); // ปิด modal หลังจากเปลี่ยนสถานะ
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

            {/* Mute/Unmute Confirmation */}
            <div className="text-center py-8">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={isMuted ? "text-red-400" : "text-blue-400"}
                  >
                    {isMuted ? (
                      // Muted icon
                      <>
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                      </>
                    ) : (
                      // Unmuted icon
                      <>
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      </>
                    )}
                  </svg>
                </div>
              </div>
              
              <p className="typo-p-lg text-white mb-2">
                เสียงประกอบกำลัง{isMuted ? "ปิด" : "เปิด"}อยู่
              </p>
              <p className="typo-p-sm text-slate-400 mb-8">
                คุณต้องการ{isMuted ? "เปิด" : "ปิด"}เสียงหรือไม่?
              </p>

              <button
                onClick={handleToggleMute}
                className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                  isMuted
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                {isMuted ? "เปิดเสียง" : "ปิดเสียง"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
