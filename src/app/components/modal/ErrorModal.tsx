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
  message = "ส่งข้อมูลไม่สำเร็จ กรุณาลองอีกครั้ง",
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
        <div className="bg-[#262b2e] flex flex-col items-center rounded-2xl md:rounded-4xl px-10 md:px-20 py-8 md:py-16 gap-5 md:gap-10">
          {/* Header Section: Icon + Title */}
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-8 items-center shrink-0"
          >
            {/* Error Icon */}
            <m.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="bg-[#515c64] rounded-full p-3 md:p-6 flex items-center justify-center"
            >
              <Image
                src={getImgPath("Icon/cross_icon.webp")}
                alt="Error icon"
                width={48}
                height={48}
                className="w-full h-full block max-w-none"
              />
            </m.div>

            {/* Title */}
            <m.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-2xl md:text-4xl text-white text-center"
            >
              {title}
            </m.p>
          </m.div>

          {/* Content Section: Message + Button */}
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-5 md:gap-10 items-start shrink-0 w-full"
          >
            {/* Message */}
            <p className="text-base md:text-xl text-white text-center">
              {message}
            </p>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-[#3473c3] hover:bg-[#2961ad] rounded-2xl py-5 px-4 flex items-center justify-center shrink-0 transition-all caret-transparent"
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
