"use client";
import { m, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import LazyLottie from "@/app/components/reusable/LazyLottie";
import SceneLayer, {
  type AnimationMap,
} from "@/app/components/reusable/SceneLayer";
import WordByWordAnimation from "@/app/components/text/WordByWordAnimation";
import { useDevice } from "@/app/contexts/DeviceContext";
import { useUI } from "@/app/contexts/UIStarContext";
import { SCENE_DREAMING_ITEMS } from "@/app/data/scene_dreaming.data";
import { getJsonUrl } from "@/utils/cloudinaryUtils";

export default function Dreaming() {
  const ref = useRef<HTMLDivElement>(null);

  // ตรวจสอบ orientation โดยใช้ custom hook
  const { isMobile } = useDevice();
  const { setShowStars } = useUI();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Fade in ตอนเริ่ม section เพื่อเชื่อมจาก Sleeping.tsx
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.95, 1],
    [0, 1, 1, 0]
  );

  // 1/4: desert3 + sky โผล่ขึ้นมา
  const set1Opacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const set1Y = useTransform(scrollYProgress, [0.1, 0.25], [100, 0]);

  // 2/4: desert2 โผล่ขึ้นมา
  const set2Opacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  const set2Y = useTransform(scrollYProgress, [0.35, 0.5], [100, 0]);

  // 3/4: desert1 โผล่ขึ้นมา
  const set3Opacity = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);
  const set3Y = useTransform(scrollYProgress, [0.6, 0.75], [100, 0]);

  // 4/4: animal เลื่อนจากขวาไปซ้าย
  const animal_right = useTransform(
    scrollYProgress,
    [0.3, 1],
    ["-50%", isMobile ? "30%" : "8%"]
  );

  // Sun: เคลื่อนที่ตลอดการ scroll
  const sun_bottom = useTransform(
    scrollYProgress,
    [0, 1],
    ["70%", isMobile ? "25%" : "30%"]
  );
  const sun_left = useTransform(scrollYProgress, [0, 1], ["0%", "85%"]);
  const sun_scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const textAnimationProgress = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  const text = useMemo(
    () =>
      `ตำนานอียิปต์เชื่อว่า เมื่อตายไปแล้วจะต้องเดินทางไปยัง 'ดินแดนแห่งการพิพากษา'
                ภายในห้องโถงแห่งสัจจะ หัวใจจะถูกนำไปชั่งเทียบกับขนนก
หากหัวใจเบากว่าขนนกก็จะเข้าถึงชีวิตหลังความตายเดินทางสู่ทุ่งแห่งความสุข
แต่ถ้าหากจิตใจหนักแน่นมักถูกกลืนกินด้วยบางสิ่ง…`,
    []
  );

  const animations: AnimationMap = useMemo(
    () => ({
      1: { y: set1Y, opacity: set1Opacity },
      2: { y: set2Y, opacity: set2Opacity },
      3: { y: set3Y, opacity: set3Opacity },
    }),
    [set1Y, set2Y, set3Y, set1Opacity, set2Opacity, set3Opacity]
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const isDreaming = latest < 1;

    if (isDreaming) {
      setShowStars(false);
    }
  });

  return (
    <m.div
      ref={ref}
      className="relative w-screen h-[600vh]"
      style={{ opacity }}
    >
      {/* Sticky Container */}
      <div
        className="sticky top-0 w-screen h-screen overflow-hidden flex items-center justify-center bg-s3"
        style={{ willChange: "transform, opacity" }}
      >
        {/* ส่วนบน: เมฆ (top-0) */}
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

        {/* Sun: เคลื่อนที่ตาม animation */}
        <m.div
          className="absolute bottom-0 left-0 w-[20%] portrait:w-[30%]"
          style={{
            opacity: 1,
            bottom: sun_bottom,
            left: sun_left,
            scale: sun_scale,
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

        {/* ส่วนล่าง: desert และ animal (bottom-0) */}
        <m.div className="absolute aspect-video w-full portrait:h-full portrait:w-[200%] ">
          <SceneLayer
            items={SCENE_DREAMING_ITEMS}
            animations={animations}
            containerAspectRatio="16 / 9"
          />

          {/* animal */}
          <m.div
            className="absolute w-[29.17%] h-[29%] bottom-1/15 portrait:bottom-1/30"
            style={{ right: animal_right }}
          >
            <LazyLottie
              src={getJsonUrl("Scene/Scene3/camel.json")}
              loop={true}
              playTrigger={set3Opacity}
              className="w-full h-full"
            />
          </m.div>
        </m.div>

        {/* Light overlay */}
        <div
          className="absolute w-screen inset-0 pointer-events-none"
          style={{ backgroundColor: "var(--color-black)", opacity: 0.1 }}
        />

        {/* Text กลางจอ */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <m.div style={{ opacity: set1Opacity }}>
            <WordByWordAnimation
              text={text}
              scrollYProgress={textAnimationProgress}
              as="p"
              className="text-lg md:text-2xl text-white w-80 md:w-140 xl:w-full"
            />
          </m.div>
        </div>
      </div>
    </m.div>
  );
}
