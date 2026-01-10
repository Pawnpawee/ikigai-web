"use client";
import { m } from "framer-motion";

interface WelcomeSoundModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export default function WelcomeSoundModal({
  isOpen,
  onAccept,
  onDecline,
}: WelcomeSoundModalProps) {
  return (
    <>
      {isOpen && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 z-99"
          />

          {/* Modal */}
          <m.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-99"
          >
            <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl p-8 border border-slate-700">
              {/* Icon */}
              <m.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex justify-center mb-6"
              >
                <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-400"
                    aria-label="Sound icon"
                  >
                    <title>Sound icon</title>
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                </div>
              </m.div>

              {/* Content */}
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center mb-8"
              >
                <h2 className="text-xl font-bold text-white mb-4">
                  ประสบการณ์เสียงประกอบ
                </h2>
                <p className="text-xl md:text-2xl text-slate-300">
                  เว็บไซต์นี้มีเสียงประกอบและเอฟเฟกต์เสียง
                  <br />
                  คุณต้องการเปิดเสียงหรือไม่?
                </p>
              </m.div>

              {/* Buttons */}
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-4"
              >
                {/* ปุ่มไม่ */}
                <button
                  type="button"
                  onClick={onDecline}
                  className="flex-1 px-6 py-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xl md:text-2xl font-semibold transition-colors border border-slate-600"
                >
                  ไม่เปิด
                </button>

                {/* ปุ่มใช่ */}
                <button
                  type="button"
                  onClick={onAccept}
                  className="flex-1 px-6 py-4 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xl md:text-2xl font-semibold transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                >
                  เปิดเสียง
                </button>
              </m.div>

              {/* Note */}
              <m.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center text-slate-400 text-xs mt-4"
              >
                คุณสามารถเปลี่ยนการตั้งค่าได้ทุกเมื่อจากเมนู
              </m.p>
            </div>
          </m.div>
        </>
      )}
    </>
  );
}
