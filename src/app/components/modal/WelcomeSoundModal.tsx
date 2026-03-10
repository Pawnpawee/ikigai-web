"use client";
import { m } from "framer-motion";
import Image from "next/image";
import { getImgPath } from "@/utils/cloudinaryUtils";

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
            className="flex w-screen h-screen items-center justify-center z-100 fixed"
          >
            <div
              className="bg-[#262b2e] rounded-2xl md:rounded-4xl p-4 md:px-8 py-7 md:py-14 flex flex-col
            gap-5 md:gap-10 items-center"
            >
              {/* Icon */}
              <m.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="bg-[#515c64] rounded-full px-2.5 md:px-5 py-3 md:py-6 flex items-center justify-center"
              >
                <Image
                  src={getImgPath("Icon/unmute_icon.webp")}
                  alt="Sound icon"
                  width={52}
                  height={43}
                  crossOrigin="anonymous"
                  className="h-5 md:h-10 w-auto"
                />
              </m.div>

              {/* Title */}
              <m.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-4xl text-white text-center whitespace-pre-line"
              >
                {"ประสบการณ์เสียง\nประกอบ"}
              </m.h2>

              {/* Description */}
              <m.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-base md:text-xl text-white text-center whitespace-pre-line"
              >
                {
                  "เว็บไซต์นี้มีเสียงประกอบและเอฟเฟกต์เสียง\nคุณต้องการเปิดเสียงหรือไม่?"
                }
              </m.p>

              {/* Buttons */}
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-5 md:gap-10 w-[200px] md:w-[500px] max-w-full"
              >
                {/* ปุ่มไม่เปิด */}
                <button
                  type="button"
                  onClick={onDecline}
                  className="flex-1 bg-[#363e43] hover:bg-[#404a50] rounded-2xl py-5 px-4 transition-colors caret-transparent"
                >
                  <p className="text-xl md:text-3xl text-white text-center">
                    ไม่เปิด
                  </p>
                </button>

                {/* ปุ่มเปิด */}
                <button
                  type="button"
                  onClick={onAccept}
                  className="flex-1 bg-[#3473c3] hover:bg-[#3d81d4] rounded-2xl py-5 px-4 transition-colors caret-transparent"
                >
                  <p className="text-xl md:text-3xl text-white text-center">
                    เปิด
                  </p>
                </button>
              </m.div>

              {/* Note */}
              <m.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm md:text-base text-white text-center font-normal"
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
