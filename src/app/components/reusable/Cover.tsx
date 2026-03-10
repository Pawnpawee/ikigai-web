"use client";

import { type MotionValue, m, useTransform } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";
import type { SceneItemData } from "@/app/components/reusable/SceneLayer";
import SceneLayer, {
  type AnimationMap,
} from "@/app/components/reusable/SceneLayer";
import { useDevice } from "@/app/contexts/DeviceContext";
import { useStarsVisibility } from "@/app/hooks/useStarsVisibility";
import { getImgPath } from "@/utils/cloudinaryUtils";

const MotionImage = m.create(Image);

//? Light blur layer - ค่าคงที่สำหรับทุก session
const LIGHT_BLUR_ITEM: SceneItemData = {
  id: "light-blur",
  src: getImgPath("Scene/Scene6/01/light_blur.webp"),
  alt: "Light blur effect",
  style: {
    width: "97.81%",
    height: "55.56%",
    left: "1.09%",
    top: "0",
  },
  mobileStyle: {
    left: "-36.94%",
    width: "173.89%",
    height: "31.25%",
    top: "0%",
  },
  animGroup: 2,
};

interface CoverProps {
  scrollYProgress: MotionValue<number>;
  items: SceneItemData[];
  titleImage: string; //? Path สำหรับรูปภาพหัวข้อ (เช่น "what you love")
  iconImage: string; //? Path สำหรับไอคอน (เช่น "love icon")
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
  titleImage,
  iconImage,
  sessionText = "session 1",
}: CoverProps) {
  const { isMobile } = useDevice();

  //? รวม light-blur layer กับ items ที่ส่งเข้ามา
  const allItems = useMemo(() => [LIGHT_BLUR_ITEM, ...items], [items]);

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
    [lightBlurOpacity, titleOpacity, iconOpacity],
  );

  //? Show stars when Cover is visible (scrollYProgress > 0)
  useStarsVisibility(scrollYProgress, {
    shouldShow: (p) => p > 0,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0]);

  return (
    <m.div
      className="fixed flex w-full h-full items-center justify-center bg-cover"
      style={{ opacity }}
    >
      <div className="fixed flex justify-center items-center top-0 h-screen w-screen portrait:w-auto scene-fit">
        {/* Scene Items */}
        <SceneLayer
          items={allItems}
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
                  src={titleImage}
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

              {/* Icon */}
              <MotionImage
                src={iconImage}
                alt="love"
                width={250}
                height={250}
                className="w-32 md:w-[200px] xl:w-[250px] h-auto"
                style={{
                  opacity: titleOpacity,
                }}
                priority
              />
            </m.div>
          </div>
        </SceneLayer>
      </div>
    </m.div>
  );
}
