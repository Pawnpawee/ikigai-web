"use client";
import { type MotionValue, m, useTransform } from "framer-motion";
import { useMemo } from "react";
import LazyLottie from "../components/reusable/LazyLottie";
import SceneLayer, {
  type AnimationMap,
} from "../components/reusable/SceneLayer";
import { useDevice } from "../contexts/DeviceContext";
import { SCENE_2_ITEMS } from "../data/scene_job_2.data";

interface JobApplication2Props {
  scrollYProgress: MotionValue<number>;
}

export default function JobApplication2({
  scrollYProgress,
}: JobApplication2Props) {
  const { isMobile } = useDevice();

  const x = useTransform(
    scrollYProgress,
    [0, 0.611, 0.75],
    ["0%", "0%", `${isMobile ? "-65%" : "-49.5%"}`],
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
  const moonOpacity = useTransform(
    scrollYProgress,
    [0.9, 0.944, 0.99, 1],
    [0, 1, 1, 0],
  );

  //? AnimationMap must match animGroup values in scene_job_2.data.ts (16 items)
  const animations: AnimationMap = useMemo(
    () => ({
      1: { y: windowY, opacity: windowOpacity },
      2: { opacity: lightWindowOpacity },
      4: { y: building2Y, opacity: building2Opacity },
      5: { y: building1Y, opacity: building1Opacity },
    }),
    [
      windowY,
      windowOpacity,
      lightWindowOpacity,
      building2Y,
      building2Opacity,
      building1Y,
      building1Opacity,
    ],
  );

  return (
    <m.div className="absolute bottom-0 left-0 w-full h-1/2">
      <m.div className="w-[200%]" style={{ opacity, x }}>
        <SceneLayer
          items={SCENE_2_ITEMS}
          animations={animations}
          containerAspectRatio="3840 / 1080"
        >
          {/* Human Lottie */}
          <m.div
            className="absolute"
            style={{
              left: "15.15%",
              top: "30.65%",
              width: "21.71%",
              height: "134.07%",
            }}
          >
            <LazyLottie
              src="/assets/Scene/Scene1/human.json"
              className="w-full h-full"
              loop
              playTrigger={opacity}
            />
          </m.div>

          {/* Moon Lottie */}
          <m.div
            className="absolute"
            style={{
              left: "68.64%",
              top: "22.06%",
              width: "4.34%",
              height: "15.42%",
              y: moonY,
              opacity: moonOpacity,
            }}
          >
            <LazyLottie
              src="/assets/Scene/Scene1/moon.json"
              className="w-full h-full"
              loop
              playTrigger={moonOpacity}
            />
          </m.div>
        </SceneLayer>
      </m.div>
    </m.div>
  );
}
