"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useAssetLoader } from "@/app/contexts/AssetLoaderContext";
import { useEffect } from "react";
import { useLenis } from "lenis/react";

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
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-999 flex flex-col items-center justify-center bg-[#0b1e23] text-white"
        >
          {/* Logo หรือ Text */}
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mb-8 flex flex-col items-center"
          >
            <h1 className="typo-h2-serif text-4xl md:text-6xl mb-2">IKIGAI</h1>
            <p className="typo-p-sm text-slate-400">Life of Journey</p>
          </motion.div>

          {/* Loading Bar Container */}
          <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden relative">
            {/* Progress Line */}
            <motion.div
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
