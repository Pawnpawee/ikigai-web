"use client";
import React, { useMemo } from "react";
import { useTransform, MotionValue, motion } from "framer-motion";
import SceneLayer, { AnimationMap } from "@/app/components/scene/SceneLayer";
import { SCENE_1_ITEMS } from "@/app/data/scene1.data";
import LazyLottie from "@/app/components/ui/LazyLottie";

interface JobApplication1Props {
  scrollYProgress: MotionValue<number>;
}

export default function JobApplication1({ scrollYProgress }: JobApplication1Props) {
  // --- Container fades ---
  const globalOpacity = useTransform(scrollYProgress, [0, 0.611, 0.611, 1], [1, 1, 0, 0]);
  const visibility = useTransform(globalOpacity, (v) => (v > 0 ? "visible" : "hidden"));

  // Light
  const lightOp = useTransform(scrollYProgress, [0.35, 0.367, 1], [0, 1, 1]);

  // Poster groups / transforms
  const poster11Y = useTransform(scrollYProgress, [0, 0.033, 1], [100, 0, 0]);
  const poster11Opacity = useTransform(scrollYProgress, [0, 0.033, 1], [0, 1, 1]);

  const poster9_10Y = useTransform(scrollYProgress, [0.033, 0.066, 1], [100, 0, 0]);
  const poster9_10Opacity = useTransform(scrollYProgress, [0.033, 0.066, 1], [0, 1, 1]);

  const poster12Y = useTransform(scrollYProgress, [0.066, 0.099, 1], [100, 0, 0]);
  const poster12Opacity = useTransform(scrollYProgress, [0.066, 0.099, 1], [0, 1, 1]);

  const poster13_15Y = useTransform(scrollYProgress, [0.099, 0.132, 1], [100, 0, 0]);
  const poster13_15Opacity = useTransform(scrollYProgress, [0.099, 0.132, 1], [0, 1, 1]);

  const poster14Y = useTransform(scrollYProgress, [0.132, 0.167, 1], [100, 0, 0]);
  const poster14Opacity = useTransform(scrollYProgress, [0.132, 0.167, 1], [0, 1, 1]);

  const poster6_1Y = useTransform(scrollYProgress, [0.167, 0.194, 1], [100, 0, 0]);
  const poster6_1Opacity = useTransform(scrollYProgress, [0.167, 0.194, 1], [0, 1, 1]);

  const poster2_3_4Y = useTransform(scrollYProgress, [0.194, 0.222, 1], [100, 0, 0]);
  const poster2_3_4Opacity = useTransform(scrollYProgress, [0.194, 0.222, 1], [0, 1, 1]);

  const poster7Y = useTransform(scrollYProgress, [0.222, 0.25, 1], [100, 0, 0]);
  const poster7Opacity = useTransform(scrollYProgress, [0.222, 0.25, 1], [0, 1, 1]);

  const poster5_8Y = useTransform(scrollYProgress, [0.25, 0.278, 1], [100, 0, 0]);
  const poster5_8Opacity = useTransform(scrollYProgress, [0.25, 0.278, 1], [0, 1, 1]);

  const tableY = useTransform(scrollYProgress, [0.278, 0.305, 1], [100, 0, 0]);
  const tableOpacity = useTransform(scrollYProgress, [0.278, 0.305, 1], [0, 1, 1]);

  const computerY = useTransform(scrollYProgress, [0.305, 0.333, 1], [100, 0, 0]);
  const computerOpacity = useTransform(scrollYProgress, [0.305, 0.333, 1], [0, 1, 1]);

  const paper4Y = useTransform(scrollYProgress, [0.333, 0.35, 1], [100, 0, 0]);
  const paper4Opacity = useTransform(scrollYProgress, [0.333, 0.35, 1], [0, 1, 1]);

  const lampY = useTransform(scrollYProgress, [0.35, 0.367, 1], [100, 0, 0]);
  const lampOpacity = useTransform(scrollYProgress, [0.35, 0.367, 1], [0, 1, 1]);

  const book2Y = useTransform(scrollYProgress, [0.367, 0.389, 1], [100, 0, 0]);
  const book2Opacity = useTransform(scrollYProgress, [0.367, 0.389, 1], [0, 1, 1]);

  const humanY = useTransform(scrollYProgress, [0.389, 0.417, 0.43, 0.444], [100, 0, -5, 0]);
  const humanOp = useTransform(scrollYProgress, [0.389, 0.444, 1], [0, 1, 1]);
  const humanScale = useTransform(scrollYProgress, [0.389, 0.417, 0.43, 0.444], [0.95, 1, 1.02, 1]);

  const postitY = useTransform(scrollYProgress, [0.444, 0.461, 1], [100, 0, 0]);
  const postitOpacity = useTransform(scrollYProgress, [0.444, 0.461, 1], [0, 1, 1]);

  const paper3Y = useTransform(scrollYProgress, [0.461, 0.478, 1], [100, 0, 0]);
  const paper3Opacity = useTransform(scrollYProgress, [0.461, 0.478, 1], [0, 1, 1]);

  const paper2Y = useTransform(scrollYProgress, [0.478, 0.5, 1], [100, 0, 0]);
  const paper2Opacity = useTransform(scrollYProgress, [0.478, 0.5, 1], [0, 1, 1]);

  const penY = useTransform(scrollYProgress, [0.5, 0.517, 1], [100, 0, 0]);
  const penOpacity = useTransform(scrollYProgress, [0.5, 0.517, 1], [0, 1, 1]);

  const pencilBoxY = useTransform(scrollYProgress, [0.517, 0.537, 1], [100, 0, 0]);
  const pencilBoxOpacity = useTransform(scrollYProgress, [0.517, 0.537, 1], [0, 1, 1]);

  const book1Y = useTransform(scrollYProgress, [0.537, 0.556, 1], [100, 0, 0]);
  const book1Opacity = useTransform(scrollYProgress, [0.537, 0.556, 1], [0, 1, 1]);

  const baseStyle = useMemo(() => ({ willChange: "transform, opacity" as const }), []);

  // --- 2. Create Animation Map ---
  const animations: AnimationMap = {
    1: { y: poster11Y, opacity: poster11Opacity },
    2: { y: poster9_10Y, opacity: poster9_10Opacity },
    3: { y: poster12Y, opacity: poster12Opacity },
    4: { y: poster13_15Y, opacity: poster13_15Opacity },
    5: { y: poster14Y, opacity: poster14Opacity },
    6: { y: poster6_1Y, opacity: poster6_1Opacity },
    7: { y: poster2_3_4Y, opacity: poster2_3_4Opacity },
    8: { y: poster7Y, opacity: poster7Opacity },
    9: { y: poster5_8Y, opacity: poster5_8Opacity },
    10: { y: tableY, opacity: tableOpacity },
    11: { y: computerY, opacity: computerOpacity },
    12: { y: paper4Y, opacity: paper4Opacity },
    13: { y: lampY, opacity: lampOpacity },
    14: { y: book2Y, opacity: book2Opacity },
    16: { y: postitY, opacity: postitOpacity },
    17: { y: paper3Y, opacity: paper3Opacity },
    18: { y: paper2Y, opacity: paper2Opacity },
    19: { y: penY, opacity: penOpacity },
    20: { y: pencilBoxY, opacity: pencilBoxOpacity },
    21: { y: book1Y, opacity: book1Opacity },
    99: { y: 0, opacity: lightOp },
  };

  return (
    <motion.div
      className="flex justify-center items-center w-full h-full"
      style={{ opacity: globalOpacity, visibility }}
    >
      <SceneLayer items={SCENE_1_ITEMS} animations={animations} baseStyle={baseStyle} containerAspectRatio="1920 / 2160">
        <motion.div
          className="absolute"
          style={{
            left: "30.3%",
            top: "65.32%",
            width: "43.41%",
            height: "67.03%",
            y: humanY,
            opacity: humanOp,
            scale: humanScale,
            ...baseStyle,
          }}
        >
          <LazyLottie src="/assets/Scene/Scene1/human.lottie" className="w-full h-full" loop autoplay />
        </motion.div>
      </SceneLayer>
    </motion.div>
  );
}
