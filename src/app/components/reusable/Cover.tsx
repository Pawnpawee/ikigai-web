"use client";

import {
  type MotionValue,
  m,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";
import type { SceneItemData } from "@/app/components/reusable/SceneLayer";
import SceneLayer, {
  type AnimationMap,
} from "@/app/components/reusable/SceneLayer";
import { useUI } from "@/app/contexts/UIStarContext";
import { useDeviceCheck } from "@/app/hooks/useDeviceCheck";

const MotionImage = m.create(Image);

interface CoverProps {
  scrollYProgress: MotionValue<number>;
  items: SceneItemData[];
  sessionText?: string; //? Text สำหรับ session (เช่น "session 1", "session 2")
  bgGradient?: string; //? Custom gradient สำหรับแต่ละ session
}

/**
 * Cover Component - Reusable scene cover สำหรับแต่ละ Ikigai session
 * @param scrollYProgress - Scroll progress (0-1) สำหรับควบคุม animation
 * @param items - SceneItemData[] สำหรับ layer ต่างๆ (light blur, text, icon)
 * @param sessionText - Text สำหรับแสดง session number (เช่น "session 1")
 */
export default function Cover({
  scrollYProgress,
  items,
  sessionText = "session 1",
}: CoverProps) {
  const { setShowStars } = useUI();
  const { isMobile } = useDeviceCheck();

  //? Animation Timeline (0-1 within 100vh)
  // 1. bg opacity (0 → 0.1)
  const bgOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // 2. light blur (0.1 → 0.2)
  const lightBlurOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

  // 3. session text (0.2 → 0.3)
  const sessionTextOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const sessionTextY = useTransform(scrollYProgress, [0.2, 0.3], [20, 0]);

  // 4. what you love text (0.3 → 0.4)
  const titleOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);

  // 5. icon + light (0.4 → 0.5)
  const iconOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);

  //? Animation Map - matches animGroup in data file
  const animations: AnimationMap = useMemo(
    () => ({
      2: { opacity: lightBlurOpacity },
      3: { opacity: titleOpacity },
      4: { opacity: iconOpacity },
    }),
    [lightBlurOpacity, titleOpacity, iconOpacity]
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const isCover = latest > 0.1;

    if (isCover) {
      setShowStars(true);
    }
  });

  return (
    <div className="fixed flex justify-center top-0 h-screen w-screen bg-black">
      {/* Background Gradient */}
      <m.div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            "linear-gradient(180deg, #0B1E23 0%, #091A1F 48%, #051115 89%, #040E11 100%)",
          opacity: bgOpacity,
        }}
      />

      {/* Scene Items */}
      <SceneLayer
        items={items}
        animations={animations}
        containerAspectRatio={isMobile ? "1080 / 1920" : "1920 / 1080"}
      >
        <div className="flex w-full h-full items-center justify-center">
          {/* Session Container */}
          <m.div
            className="flex flex-col gap-12 md:gap-16 xl:gap-24 items-center pt-12 xl:pt-24"
            style={{
              opacity: sessionTextOpacity,
              y: sessionTextY,
            }}
          >
            {/* Inner Container */}
            <div className="flex flex-col gap-5 md:gap-8 xl:gap-12 items-center">
              {/* Session Text */}
              <p className="text-white text-2xl md:text-3xl xl:text-5xl leading-normal">
                {sessionText}
              </p>

              {/* What You Love */}
              <MotionImage
                src="/assets/Scene/Scene6/what_you_love.webp"
                alt="What You Love"
                width={700}
                height={100}
                className="w-2xs md:w-[500px] xl:w-[700px] h-auto"
                style={{
                  opacity: titleOpacity,
                }}
                priority
              />
            </div>

            {/* What You Love */}
            <MotionImage
              src="/assets/Icon/love.webp"
              alt="love"
              width={250}
              height={250}
              className="w-32 md:w-[200px] xl:w-[250px] h-auto z-2"
              style={{
                opacity: titleOpacity,
              }}
              priority
            />
          </m.div>
        </div>
      </SceneLayer>
    </div>
  );
}
