"use client";

import {
  type MotionValue,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import type { AnimationConfig, AnimationItem } from "lottie-web";
import type React from "react";
import { memo, useEffect, useRef, useState } from "react";

//? Type Definition
interface LottieAnimationData {
  w: number;
  h: number;
  ip: number;
  op: number;
  fr: number;
  [key: string]: unknown;
}

interface LazyLottieProps {
  src: string | LottieAnimationData;
  className?: string;
  getRef?: (instance: AnimationItem | null) => void;
  play?: boolean;
  playTrigger?: MotionValue<number>;
  scrollYProgress?: MotionValue<number>;
  loop?: boolean;
  onComplete?: () => void;
  ignoreAspectRatio?: boolean;
  rendererSettings?: AnimationConfig["rendererSettings"];
}

const LazyLottie: React.FC<LazyLottieProps> = memo(
  ({
    src,
    className,
    getRef,
    play = false,
    playTrigger,
    scrollYProgress,
    loop = true,
    onComplete,
    ignoreAspectRatio = false,
    rendererSettings,
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationInstanceRef = useRef<AnimationItem | null>(null);

    const [animationData, setAnimationData] =
      useState<LottieAnimationData | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const fallbackMotionValue = useMotionValue(0);

    // -------------------------------------------------------
    // 1. Data Fetching (โหลดทันทีเมื่อ Component Mount)
    // -------------------------------------------------------
    useEffect(() => {
      let isMounted = true;
      const loadData = async () => {
        if (typeof src === "string") {
          try {
            const res = await fetch(src);
            if (!res.ok) throw new Error("Network response was not ok");
            const data = await res.json();
            if (isMounted) {
              setAnimationData(data);
            }
          } catch (error) {
            console.error("Failed to load Lottie JSON:", error);
          }
        } else {
          if (isMounted) {
            setAnimationData(src);
          }
        }
      };
      loadData();
      return () => {
        isMounted = false;
      };
    }, [src]); //? Dependency เหลือแค่ src

    // -------------------------------------------------------
    // 2. Lottie Initialization (Render ทันทีเมื่อ Data มา)
    // -------------------------------------------------------
    useEffect(() => {
      if (!animationData || !containerRef.current) return;

      if (animationInstanceRef.current) {
        animationInstanceRef.current.destroy();
      }

      let lottieInstance: AnimationItem | null = null;

      const initLottie = async () => {
        try {
          //? ยังคง Dynamic Import เพื่อไม่ให้หนัก Main Bundle ตอนเข้าเว็บครั้งแรก
          //? แต่จะเริ่มโหลดทันทีที่ Component นี้ถูกเรียกใช้
          const lottieWeb = (
            await import("lottie-web/build/player/lottie_light")
          ).default;

          if (!containerRef.current) return;

          lottieInstance = lottieWeb.loadAnimation({
            container: containerRef.current,
            renderer: "svg",
            loop: loop,
            autoplay: play && !playTrigger && !scrollYProgress,
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
              className: "w-full h-full",
              ...rendererSettings,
            },
          });

          animationInstanceRef.current = lottieInstance;

          //? แจ้งว่าพร้อมโชว์
          requestAnimationFrame(() => {
            setIsLoaded(true);
          });

          if (getRef) getRef(lottieInstance);
          if (onComplete)
            lottieInstance.addEventListener("complete", onComplete);
        } catch (error) {
          console.error("Failed to initialize Lottie Light:", error);
        }
      };

      initLottie();

      return () => {
        if (animationInstanceRef.current) {
          animationInstanceRef.current.destroy();
          animationInstanceRef.current = null;
        }
      };
    }, [
      animationData,
      loop,
      rendererSettings,
      getRef,
      onComplete,
      play,
      playTrigger,
      scrollYProgress,
    ]);

    useMotionValueEvent(
      playTrigger || fallbackMotionValue,
      "change",
      (latest) => {
        const anim = animationInstanceRef.current;
        if (!anim || !isLoaded) return;
        if (latest > 0) {
          if (anim.isPaused) anim.play();
        } else {
          if (!anim.isPaused) anim.pause();
        }
      }
    );

    useEffect(() => {
      const anim = animationInstanceRef.current;
      if (!anim || !isLoaded || playTrigger || scrollYProgress) return;
      if (play) anim.play();
      else anim.pause();
    }, [play, isLoaded, playTrigger, scrollYProgress]);

    useMotionValueEvent(
      scrollYProgress || fallbackMotionValue,
      "change",
      (latest) => {
        const anim = animationInstanceRef.current;
        if (!anim || !isLoaded) return;
        anim.goToAndStop(latest * anim.totalFrames, true);
      }
    );

    //? Intrinsic Style: ยังคงใส่ไว้เผื่อช่วยเรื่อง Ratio ได้บ้าง
    const intrinsicStyle: React.CSSProperties =
      !ignoreAspectRatio && animationData
        ? { aspectRatio: `${animationData.w} / ${animationData.h}` }
        : {};

    return (
      <div className={`relative ${className}`} style={intrinsicStyle}>
        {/* Container: แค่ Fade-in เบาๆ ไม่มีการขยับ Layout */}
        <div
          ref={containerRef}
          className={`w-full h-full transition-opacity duration-500 ease-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
      </div>
    );
  }
);

LazyLottie.displayName = "LazyLottie";

export default LazyLottie;
