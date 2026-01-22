"use client";
import { m } from "framer-motion";
import Image from "next/image";
import { getImgPath } from "@/utils/cloudinaryUtils";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export default function ErrorModal({
  isOpen,
  onClose,
  title = "ขออภัย",
  message = "เกิดข้อผิดพลาด กรุณาลองอีกครั้ง",
}: ErrorModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/80 z-99"
        onClick={onClose}
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
            gap-5 md:gap-10 items-center max-w-[90%] md:max-w-[600px]"
        >
          {/* Error Icon */}
          <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="bg-[#515c64] rounded-full px-2.5 md:px-5 py-3 md:py-6 flex items-center justify-center"
          >
            <Image
              src={getImgPath("Icon/close.webp")}
              alt="Error icon"
              width={40}
              height={40}
              className="h-6 md:h-10 w-auto"
            />
          </m.div>

          {/* Title */}
          <m.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-4xl text-white text-center whitespace-pre-line"
          >
            {title}
          </m.h2>

          {/* Message */}
          <m.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-base md:text-xl text-white text-center whitespace-pre-line"
          >
            {message}
          </m.p>

          {/* Close Button */}
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-[200px] md:w-[300px]"
          >
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-linear-to-r from-[#4a5568] to-[#2d3748] hover:from-[#5a6678] hover:to-[#3d4758] 
                rounded-2xl py-4 md:py-5 px-4 transition-all caret-transparent"
            >
              <p className="text-xl md:text-3xl text-white text-center">
                ลองอีกครั้ง
              </p>
            </button>
          </m.div>
        </div>
      </m.div>
    </>
  );
}
