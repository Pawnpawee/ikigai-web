"use client";

import { AnimatePresence, m } from "framer-motion";

interface LoadingScreenProps {
  className?: string;
  text?: string;
  isLoading: boolean; // รับค่ามาว่ากำลังโหลดอยู่ไหม
}

export default function LoadingScreen({
  className = "bg-black",
  text = "Loading...",
  isLoading,
}: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <m.div
          // key จำเป็นสำหรับ AnimatePresence
          key="loading-screen"
          // fixed inset-0 เพื่อให้คลุมทั้งจอทับ content อื่น
          className={`fixed inset-0 z-101 flex justify-center items-center overflow-hidden ${className}`}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          <div className="flex flex-col items-center gap-4">
            <m.div
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{
                repeat: Infinity,
                duration: 1,
                repeatType: "reverse",
              }}
            >
              <p className="text-white font-bentham text-xl md:text-2xl tracking-widest">
                {text}
              </p>
            </m.div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
