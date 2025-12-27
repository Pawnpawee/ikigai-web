"use client";
import { type MotionValue, m, useTransform } from "framer-motion";
import { useMemo } from "react";

import LazyLottie from "../components/reusable/LazyLottie";
import SceneLayer, {
  type AnimationMap,
} from "../components/reusable/SceneLayer";
import { SCENE_1_ITEMS } from "../data/scene_job_1.data";


interface JobApplication1Props {
  scrollYProgress: MotionValue<number>;
}

export default function JobApplication1({
  scrollYProgress,
}: JobApplication1Props) {
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.611, 0.611, 1],
    [1, 1, 0, 0],
  );

  // Light
  const lightOp = useTransform(scrollYProgress, [0.35, 0.367, 1], [0, 1, 1]);

  // Poster groups / transforms
  const poster1Y = useTransform(scrollYProgress, [0, 0.033, 1], [100, 0, 0]);
  const poster1Opacity = useTransform(
    scrollYProgress,
    [0, 0.033, 1],
    [0, 1, 1],
  );

  const poster2Y = useTransform(
    scrollYProgress,
    [0.033, 0.066, 1],
    [100, 0, 0],
  );
  const poster2Opacity = useTransform(
    scrollYProgress,
    [0.033, 0.066, 1],
    [0, 1, 1],
  );

  const poster3Y = useTransform(
    scrollYProgress,
    [0.066, 0.099, 1],
    [100, 0, 0],
  );
  const poster3Opacity = useTransform(
    scrollYProgress,
    [0.066, 0.099, 1],
    [0, 1, 1],
  );

  const poster4Y = useTransform(
    scrollYProgress,
    [0.099, 0.132, 1],
    [100, 0, 0],
  );
  const poster4Opacity = useTransform(
    scrollYProgress,
    [0.099, 0.132, 1],
    [0, 1, 1],
  );

  const poster5Y = useTransform(
    scrollYProgress,
    [0.132, 0.167, 1],
    [100, 0, 0],
  );
  const poster5Opacity = useTransform(
    scrollYProgress,
    [0.132, 0.167, 1],
    [0, 1, 1],
  );

  const tableY = useTransform(scrollYProgress, [0.278, 0.305, 1], [100, 0, 0]);
  const tableOpacity = useTransform(
    scrollYProgress,
    [0.278, 0.305, 1],
    [0, 1, 1],
  );

  const computerY = useTransform(
    scrollYProgress,
    [0.305, 0.333, 1],
    [100, 0, 0],
  );
  const computerOpacity = useTransform(
    scrollYProgress,
    [0.305, 0.333, 1],
    [0, 1, 1],
  );

  const set1Y = useTransform(scrollYProgress, [0.35, 0.367, 1], [100, 0, 0]);
  const set1Opacity = useTransform(
    scrollYProgress,
    [0.35, 0.367, 1],
    [0, 1, 1],
  );

  const set2Y = useTransform(scrollYProgress, [0.367, 0.389, 1], [100, 0, 0]);
  const set2Opacity = useTransform(
    scrollYProgress,
    [0.367, 0.389, 1],
    [0, 1, 1],
  );

  const humanY = useTransform(
    scrollYProgress,
    [0.389, 0.417, 0.43, 0.444],
    [100, 0, -5, 0],
  );
  const humanOp = useTransform(
    scrollYProgress,
    [0.389, 0.444, 0.99, 1],
    [0, 1, 1, 0],
  );
  const humanScale = useTransform(
    scrollYProgress,
    [0.389, 0.417, 0.43, 0.444],
    [0.95, 1, 1.02, 1],
  );

  //? Animation Map - matches animGroup in scene_job_1.data.ts
  const animations: AnimationMap = useMemo(
    () => ({
      1: { y: poster1Y, opacity: poster1Opacity },
      2: { y: poster2Y, opacity: poster2Opacity },
      3: { y: poster3Y, opacity: poster3Opacity },
      4: { y: poster4Y, opacity: poster4Opacity },
      5: { y: poster5Y, opacity: poster5Opacity },
      10: { y: tableY, opacity: tableOpacity },
      11: { y: computerY, opacity: computerOpacity },
      13: { y: set1Y, opacity: set1Opacity },
      14: { y: set2Y, opacity: set2Opacity },
      99: { y: 0, opacity: lightOp },
    }),
    [
      poster1Y,
      poster1Opacity,
      poster2Y,
      poster2Opacity,
      poster3Y,
      poster3Opacity,
      poster4Y,
      poster4Opacity,
      poster5Y,
      poster5Opacity,
      tableY,
      tableOpacity,
      computerY,
      computerOpacity,
      set1Y,
      set1Opacity,
      set2Y,
      set2Opacity,
      lightOp,
    ],
  );

  return (
    <m.div
      className="flex justify-center items-center w-full h-full"
      style={{ opacity }}
    >
      <SceneLayer
        items={SCENE_1_ITEMS}
        animations={animations}
        containerAspectRatio="1920 / 2160"
      >
        {/* Human Lottie */}
        <m.div
          className="absolute"
          style={{
            left: "30.3%",
            top: "65.32%",
            width: "43.41%",
            height: "67.03%",
            y: humanY,
            opacity: humanOp,
            scale: humanScale,
          }}
        >
          <LazyLottie
            src="/assets/Scene/Scene1/human.json"
            className="w-full h-full"
            loop
            playTrigger={humanOp}
          />
        </m.div>
      </SceneLayer>
    </m.div>
  );
}
