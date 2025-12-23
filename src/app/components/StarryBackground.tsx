// app/components/layout/GlobalBackground.tsx
"use client";

import { m } from "framer-motion";
import { useEffect, useState } from "react";
import { useUI } from "@/app/contexts/UIStarContext";
import LazyLottie from "./reusable/LazyLottie";

const StarryBackground = () => {
  const { showStars } = useUI();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {showStars && (
        <m.div
          key="global-starry-bg"
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
        </m.div>
      )}
    </>
  );
};

export default StarryBackground;
