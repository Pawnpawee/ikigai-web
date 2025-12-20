// app/components/layout/GlobalBackground.tsx
"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUI } from "@/app/contexts/UIStarContext";
import LazyLottie from "./reusable/LazyLottie";

const GlobalBackground = () => {
  const { showStars } = useUI();

  return (
    <AnimatePresence>
      {showStars && (
        <motion.div
          key="global-starry-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 w-full h-full pointer-events-none flex justify-center items-center z-1"
        >
          <LazyLottie
            src="/assets/Scene/Hero/starry-bg.json"
            loop
            play={true}
            ignoreAspectRatio={true}
            className="w-full h-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalBackground;
