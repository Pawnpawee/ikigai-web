"use client";

import { m } from "framer-motion";
import Image from "next/image";

interface ResultSaveFeedbackModalProps {
  isOpen: boolean;
  feedbackFormUrl: string;
  onClose: () => void;
}

export default function ResultSaveFeedbackModal({
  isOpen,
  feedbackFormUrl,
  onClose,
}: ResultSaveFeedbackModalProps) {
  return (
    <>
      {isOpen && (
        <>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 z-99"
          />

          <m.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex w-screen h-screen items-center justify-center z-100 fixed"
          >
            <div
              className="bg-[#262b2e] rounded-2xl md:rounded-4xl p-5 md:px-15 py-7 md:py-14 flex flex-col
            gap-5 md:gap-10 items-center"
            >
              <m.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative h-12 w-12 md:h-24 md:w-24 bg-[#515c64] rounded-full flex items-center justify-center overflow-hidden"
              >
                <Image
                  src="/assets/icons/cat_icon.webp"
                  alt="cat icon"
                  fill
                  sizes="(max-width: 768px) 48px, 96px"
                  priority
                  loading="eager"
                  fetchPriority="high"
                  className="object-contain"
                />
              </m.div>

              {/* Title */}
              <m.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-3xl text-white text-center whitespace-pre-line"
              >
                {"ดีใจที่คุณชอบผลงานของพวกเรานะ !\n"}
              </m.h2>

              <m.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-base md:text-xl text-white text-center whitespace-pre-line"
              >
                {
                  "รบกวนช่วยทำแบบประเมินสั้น ๆ \n เพื่อเป็นกำลังใจให้พวกเราพัฒนาต่อ "
                }
                <a
                  href={feedbackFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8ec3ff] underline underline-offset-4 hover:text-[#a8d3ff]"
                >
                  ที่นี่ (link form)
                </a>
              </m.p>

              <m.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-base md:text-xl text-white text-center whitespace-pre-line"
              >
                {"แชร์ความประทับใจผ่าน IG Story \n แล้ว Tag มาคุยกับเราที่ "}
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8ec3ff] underline underline-offset-4 hover:text-[#a8d3ff]"
                >
                  @IG ของเรา
                </a>
              </m.p>

              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-[180px] md:w-60 max-w-full"
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full bg-[#363e43] hover:bg-[#404a50] rounded-2xl py-4 px-4 transition-colors caret-transparent"
                >
                  <p className="text-base md:text-xl text-white text-center">
                    ปิด
                  </p>
                </button>
              </m.div>
            </div>
          </m.div>
        </>
      )}
    </>
  );
}
