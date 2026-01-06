"use client";

import {
  type MotionValue,
  useInView,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import type { AnimationConfig, AnimationItem } from "lottie-web";
import type React from "react";
import { memo, useEffect, useRef, useState } from "react";

//? Type Definition สำหรับ Animation Data (JSON)
export interface LottieAnimationData {
  w: number;
  h: number;
  ip: number; // In Point
  op: number; // Out Point
  fr: number; // Frame Rate
  [key: string]: unknown;
}

interface LazyLottieProps {
  src: string | LottieAnimationData;
  className?: string;
  //? เปลี่ยนจาก LottieRefCurrentProps เป็น AnimationItem (Core Type ของ lottie-web)
  getRef?: (instance: AnimationItem | null) => void;
  play?: boolean;
  playTrigger?: MotionValue<number>;
  scrollYProgress?: MotionValue<number>;
  loop?: boolean; //? Default true
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
    //? Container Ref สำหรับ Mount Lottie
    const containerRef = useRef<HTMLDivElement>(null);
    //? เก็บ Instance จริงของ Lottie ไว้จัดการ (แทน LottieRefCurrentProps)
    const animationInstanceRef = useRef<AnimationItem | null>(null);

    const [animationData, setAnimationData] =
      useState<LottieAnimationData | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    //? ใช้ Fallback กรณีไม่มี trigger ส่งมา
    const fallbackMotionValue = useMotionValue(0);

    //? ตรวจสอบ Viewport: โหลดเฉพาะเมื่อ User มองเห็น (Performance Optimization)
    const isInView = useInView(containerRef, {
      once: true,
      amount: 0.1, // เห็นแค่ 10% ก็เริ่มโหลด
    });

    // 1. Data Fetching Logic
    useEffect(() => {
      if (!isInView) return;

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
    }, [src, isInView]);

    // 2. Lottie Initialization Logic (Core Replacement)
    useEffect(() => {
      //? ถ้ายังไม่มี Data หรือ Container ยังไม่พร้อม ให้ข้ามไป
      if (!animationData || !containerRef.current) return;

      //? Cleanup Instance เก่าก่อนสร้างใหม่ (ป้องกัน Memory Leak)
      if (animationInstanceRef.current) {
        animationInstanceRef.current.destroy();
      }

      let lottieInstance: AnimationItem | null = null;

      const initLottie = async () => {
        try {
          //? Dynamic Import: โหลด "lottie_light" โดยตรง (Key success factor!)
          //? ตัด HTML/Canvas renderer ทิ้ง 100%
          const lottieWeb = (
            await import("lottie-web/build/player/lottie_light")
          ).default;

          if (!containerRef.current) return;

          lottieInstance = lottieWeb.loadAnimation({
            container: containerRef.current,
            renderer: "svg", //? Light version รองรับแค่ SVG
            loop: loop,
            autoplay: play && !playTrigger && !scrollYProgress, //? Auto play ถ้าไม่มี Trigger อื่น
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
              className: "w-full h-full", //? ใส่ Class ให้ SVG เต็มพื้นที่
              ...rendererSettings,
            },
          });

          animationInstanceRef.current = lottieInstance;
          setIsLoaded(true);

          //? Expose Ref ออกไปข้างนอก
          if (getRef) getRef(lottieInstance);

          //? Bind Event Listeners
          if (onComplete) {
            lottieInstance.addEventListener("complete", onComplete);
          }
        } catch (error) {
          console.error("Failed to initialize Lottie Light:", error);
        }
      };

      initLottie();

      //? Cleanup Function
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

    // 3. Logic: Play Trigger (Reactive Control)
    useMotionValueEvent(
      playTrigger || fallbackMotionValue,
      "change",
      (latest) => {
        const anim = animationInstanceRef.current;
        if (!anim || !isLoaded) return;

        //? ถ้ามี Trigger ให้ควบคุมการเล่น/หยุด ตามค่า
        if (latest > 0) {
          if (anim.isPaused) anim.play();
        } else {
          if (!anim.isPaused) anim.pause();
        }
      },
    );

    // 4. Logic: Manual Play Prop Update
    useEffect(() => {
      const anim = animationInstanceRef.current;
      if (!anim || !isLoaded || playTrigger || scrollYProgress) return;

      if (play) anim.play();
      else anim.pause();
    }, [play, isLoaded, playTrigger, scrollYProgress]);

    // 5. Logic: Scroll Seek (Scrubbing)
    useMotionValueEvent(
      scrollYProgress || fallbackMotionValue,
      "change",
      (latest) => {
        const anim = animationInstanceRef.current;
        if (!anim || !isLoaded) return;

        //? คำนวณ Frame ตาม % การ scroll
        //? goToAndStop(value, isFrame) -> ถ้า isFrame=true ต้องคำนวณเฟรม
        const totalFrames = anim.totalFrames;
        const targetFrame = latest * totalFrames;

        //? ใช้ true เพื่อบอกว่าเป็น Frame ไม่ใช่ Time
        anim.goToAndStop(targetFrame, true);
      },
    );

    //? Placeholder ขณะรอโหลด (Skeleton)
    if (!animationData) {
      return (
        <div
          ref={containerRef}
          className={`pointer-events-none opacity-0 ${className}`}
        />
      );
    }

    //? Intrinsic Size เพื่อกัน Layout Shift (CLS)
    const intrinsicStyle: React.CSSProperties = ignoreAspectRatio
      ? {}
      : {
          aspectRatio: `${animationData.w} / ${animationData.h}`,
        };

    return (
      <div
        ref={containerRef}
        className={className}
        style={intrinsicStyle}
        //? Accessibility: ซ่อนจาก Screen Reader เพราะมักเป็นแค่ตกแต่ง
        aria-hidden="true"
      />
    );
  },
);

LazyLottie.displayName = "LazyLottie";

export default LazyLottie;
