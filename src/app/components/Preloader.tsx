"use client";
import { AnimatePresence, m } from "framer-motion";
import { useLenis } from "lenis/react";
import { useEffect } from "react";
import { useAssetLoader } from "@/app/contexts/AssetLoaderContext";

export default function Preloader() {
  const { isLoading, progress } = useAssetLoader();
  const lenis = useLenis();

  // ล็อก Scroll ระหว่างโหลด
  useEffect(() => {
    if (lenis) {
      if (isLoading) lenis.stop();
      else lenis.start();
    }
  }, [lenis, isLoading]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <m.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-999 flex flex-col items-center justify-center bg-[#0b1e23] text-white"
        >
          {/* Logo หรือ Text */}
          <m.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mb-8 flex flex-col items-center"
          >
            <h1 className="typo-h2-serif text-4xl md:text-6xl mb-2">IKIGAI</h1>
            <p className="typo-p-sm text-slate-400">Life of Journey</p>
          </m.div>

          {/* Loading Bar Container */}
          <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden relative">
            {/* Progress Line */}
            <m.div
              className="absolute top-0 left-0 h-full bg-linear-to-r from-blue-500 to-purple-500"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          {/* Percentage Text */}
          <p className="mt-4 typo-p-sm text-slate-500 font-mono">
            Loading Resources... {progress}%
          </p>
        </m.div>
      )}
    </AnimatePresence>
  );
}
