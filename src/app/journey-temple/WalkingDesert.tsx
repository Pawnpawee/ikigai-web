"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import LazyLottie from "@/app/components/reusable/LazyLottie";
import SceneLayer, {
  type AnimationMap,
} from "@/app/components/reusable/SceneLayer";
import { useDevice } from "@/app/contexts/DeviceContext";
import { SCENE_WALK_DESERT_ITEMS } from "@/app/data/scene_walk_desert.data";
import { getJsonUrl } from "@/utils/cloudinaryUtils";

//? Scene 10.1: Walking through the desert
//? ฉากเดินทางข้ามทะเลทราย - เหมือน Dreaming.tsx
//? Scroll: 200vh | Animation: mountain/hill pop up + human_camel slides + sun moves

export default function WalkingDesert() {
  const ref = useRef<HTMLDivElement>(null);
  const { isMobile } = useDevice();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  //? Overall section opacity (fade in → stay → fade out)
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.95, 1],
    [0, 1, 1, 0],
  );

  //? Set 1: mountain + sky pop up (background layer)
  const set1Opacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const set1Y = useTransform(scrollYProgress, [0.1, 0.25], [100, 0]);

  //? Set 2: hill pop up (foreground layer)
  const set2Opacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  const set2Y = useTransform(scrollYProgress, [0.35, 0.5], [100, 0]);

  //? human_camel: เลื่อนจากขวาไปซ้าย (เหมือน animal ใน Dreaming)
  const humanCamelRight = useTransform(
    scrollYProgress,
    [0.3, 1],
    ["-50%", isMobile ? "40%" : "8%"],
  );

  //? Sun: เคลื่อนที่แนวทแยง ตลอดการ scroll
  const sunBottom = useTransform(
    scrollYProgress,
    [0, 1],
    ["70%", isMobile ? "25%" : "30%"],
  );
  const sunLeft = useTransform(scrollYProgress, [0, 1], ["0%", "85%"]);
  const sunScale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  const animations: AnimationMap = useMemo(
    () => ({
      1: { y: set1Y, opacity: set1Opacity },
      2: { y: set2Y, opacity: set2Opacity },
    }),
    [set1Y, set2Y, set1Opacity, set2Opacity],
  );

  return (
    <m.div
      ref={ref}
      className="relative w-screen h-[200vh]"
      style={{ opacity }}
    >
      {/* Sticky Container */}
      <div
        className="sticky top-0 w-screen h-screen overflow-hidden flex items-center justify-center bg-[linear-gradient(180deg,#e79f66_7%,#e69a64_20%,#e38d5f_30%,#de7756_43%,#d7594a_55%,#d65147_58%)]"
        style={{ willChange: "transform, opacity" }}
      >
        {/* Sky (Lottie - เมฆเคลื่อนไหว) */}
        <m.div
          className="absolute top-0 left-1/30 w-full portrait:w-[250%] portrait:-left-1/6 portrait:top-1/10"
          style={{ opacity: set1Opacity }}
        >
          <LazyLottie
            src={getJsonUrl("Scene/Scene3/sky.json")}
            loop={true}
            playTrigger={set1Opacity}
            className="w-full object-cover"
          />
        </m.div>

        {/* Sun (Lottie - ดวงอาทิตย์เคลื่อนที่) */}
        <m.div
          className="absolute bottom-0 left-0 w-[20%] portrait:w-[30%]"
          style={{
            opacity: 1,
            bottom: sunBottom,
            left: sunLeft,
            scale: sunScale,
            willChange: "transform, opacity",
          }}
        >
          <LazyLottie
            src={getJsonUrl("Scene/Scene3/sun.json")}
            loop={true}
            playTrigger={scrollYProgress}
            className="w-full h-full"
          />
        </m.div>

        {/* Desert layers + human_camel */}
        <m.div className="absolute aspect-video w-full  portrait:h-full portrait:w-[200%]">
          <SceneLayer
            items={SCENE_WALK_DESERT_ITEMS}
            animations={animations}
            containerAspectRatio="16 / 9"
          />

          {/* human_camel (Lottie - คนขี่อูฐเดินทาง) */}
          {/* Figma Desktop: w=924.08/1920=48.1%, h=638.51/1080=59.1% */}
          <m.div
            className="absolute w-[48.1%] h-[59.1%] bottom-[-5.3%]"
            style={{
              right: humanCamelRight,
            }}
          >
            <LazyLottie
              src={getJsonUrl("Scene/Scene10/human-camel.json")}
              loop={true}
              playTrigger={set2Opacity}
              className="w-full h-full"
            />
          </m.div>
        </m.div>

        {/* Light overlay */}
        <div
          className="absolute w-screen inset-0 pointer-events-none"
          style={{ backgroundColor: "var(--color-black)", opacity: 0.1 }}
        />
      </div>
    </m.div>
  );
}
