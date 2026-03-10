// app/components/layout/GlobalBackground.tsx
"use client";

import { useEffect, useState } from "react";
import { useUI } from "@/app/contexts/UIStarContext";
import { getJsonUrl } from "@/utils/cloudinaryUtils";
import LazyLottie from "./reusable/LazyLottie";

const StarryBackground = () => {
  const { showStars } = useUI();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  //? Unmount ทั้ง component เลยเมื่อไม่ต้องการ เพื่อหยุด Lottie animation loop
  if (!isMounted || !showStars) return null;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none flex justify-center items-center z-1">
      <LazyLottie
        src={getJsonUrl("Scene/Hero/starry-bg.json")}
        loop
        play={true}
        ignoreAspectRatio={true}
        className="w-full h-full"
      />
    </div>
  );
};

export default StarryBackground;
