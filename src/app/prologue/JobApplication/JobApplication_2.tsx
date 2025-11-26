"use client";
import React, { useMemo } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import SceneLayer, { AnimationMap } from "@/app/components/scene/SceneLayer";
import { SCENE_2_ITEMS } from "@/app/data/scene2.data";
import LazyLottie from "@/app/components/ui/LazyLottie";
import { useIsPortrait } from "@/app/hooks/useOrientation";

interface JobApplication2Props {
  scrollYProgress: MotionValue<number>;
}

export default function JobApplication2({
  scrollYProgress,
}: JobApplication2Props) {
  const isPortrait = useIsPortrait();

  const x = useTransform(
    scrollYProgress,
    [0, 0.611, 0.75],
    ["0%", "0%", `${isPortrait ? "-65%" : "-49.5%"}`],
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.611, 0.611, 0.97, 1],
    [0, 0, 1, 1, 0],
  );

  const windowY = useTransform(scrollYProgress, [0.722, 0.755, 1], [100, 0, 0]);
  const windowOpacity = useTransform(
    scrollYProgress,
    [0.722, 0.755, 1],
    [0, 1, 1],
  );

  const lightWindowOpacity = useTransform(
    scrollYProgress,
    [0.755, 0.789, 1],
    [0, 1, 1],
  );

  const curtainY = useTransform(
    scrollYProgress,
    [0.789, 0.833, 1],
    [100, 0, 0],
  );
  const curtainOpacity = useTransform(
    scrollYProgress,
    [0.789, 0.833, 1],
    [0, 1, 1],
  );

  const building2Y = useTransform(
    scrollYProgress,
    [0.833, 0.867, 1],
    [100, 0, 0],
  );
  const building2Opacity = useTransform(
    scrollYProgress,
    [0.833, 0.867, 1],
    [0, 1, 1],
  );

  const building1Y = useTransform(
    scrollYProgress,
    [0.867, 0.9, 1],
    [100, 0, 0],
  );
  const building1Opacity = useTransform(
    scrollYProgress,
    [0.867, 0.9, 1],
    [0, 1, 1],
  );

  const moonY = useTransform(scrollYProgress, [0.9, 0.944, 1], [100, 0, 0]);
  const moonOpacity = useTransform(scrollYProgress, [0.9, 0.944, 1], [0, 1, 1]);

  const baseStyle = useMemo(
    () => ({ willChange: "transform, opacity" as const }),
    [],
  );

  const animations: AnimationMap = {
    1: { y: windowY, opacity: windowOpacity },
    2: { opacity: lightWindowOpacity },
    3: { y: curtainY, opacity: curtainOpacity },
    4: { y: building2Y, opacity: building2Opacity },
    5: { y: building1Y, opacity: building1Opacity },
    6: { y: moonY, opacity: moonOpacity },
  };

  return (
    <motion.div className="absolute bottom-0 left-0 w-full h-1/2">
      <motion.div className="w-[200%]" style={{ opacity, x }}>
        <SceneLayer
          items={SCENE_2_ITEMS}
          animations={animations}
          baseStyle={baseStyle}
          containerAspectRatio="3840 / 1080"
        >
          {/* Human Lottie (special) */}
          <motion.div
            className="absolute"
            style={{
              left: "15.15%",
              top: "30.65%",
              width: "21.71%",
              height: "134.07%",
              ...baseStyle,
            }}
          >
            <LazyLottie
              src="/assets/Scene/Scene1/human.lottie"
              className="w-full h-full"
              loop
              autoplay
            />
          </motion.div>

          {/* Moon Lottie */}
          <motion.div
            className="absolute"
            style={{
              left: "68.64%",
              top: "22.06%",
              width: "4.34%",
              height: "15.42%",
              y: moonY,
              opacity: moonOpacity,
              ...baseStyle,
            }}
          >
            <LazyLottie
              src="/assets/Scene/Scene1/moon.lottie"
              className="w-full h-full"
              loop
              autoplay
            />
          </motion.div>
        </SceneLayer>
      </motion.div>
    </motion.div>
  );
}
