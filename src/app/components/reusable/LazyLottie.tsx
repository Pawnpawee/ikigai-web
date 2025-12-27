"use client";

import {
  type MotionValue,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import type { LottieComponentProps, LottieRefCurrentProps } from "lottie-react";
import dynamic from "next/dynamic";
import type React from "react";
import { memo, useEffect, useRef, useState } from "react";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />,
});

interface LottieAnimationData {
  w: number;
  h: number;
  [key: string]: unknown;
}

interface LazyLottieProps extends Omit<
  LottieComponentProps,
  "animationData" | "src"
> {
  src: string | LottieAnimationData;
  className?: string;
  getRef?: (ref: LottieRefCurrentProps | null) => void;
  play?: boolean;
  playTrigger?: MotionValue<number>;
  scrollYProgress?: MotionValue<number>;
  onComplete?: () => void;
  ignoreAspectRatio?: boolean;
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
    ...props
  }) => {
    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const [animationData, setAnimationData] =
      useState<LottieAnimationData | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const isPlayingRef = useRef(false);

    // สร้าง Fallback MotionValue ไว้เสมอ
    const fallbackMotionValue = useMotionValue(0);

    // Load Data Logic
    useEffect(() => {
      let isMounted = true;
      const loadData = async () => {
        if (typeof src === "string") {
          try {
            const res = await fetch(src);
            const data = await res.json();
            if (isMounted) {
              setAnimationData(data);
              setIsLoaded(true);
            }
          } catch (error) {
            console.error("Failed to load Lottie", error);
          }
        } else {
          if (isMounted) {
            setAnimationData(src);
            setIsLoaded(true);
          }
        }
      };
      loadData();
      return () => {
        isMounted = false;
      };
    }, [src]);

    // Ref Expose Logic
    useEffect(() => {
      if (getRef && lottieRef.current) {
        getRef(lottieRef.current);
      }
    }, [getRef]);

    // Logic: Play Trigger (แก้ตรงนี้)
    useMotionValueEvent(
      playTrigger || fallbackMotionValue,
      "change",
      (latest) => {
        if (!playTrigger || !lottieRef.current || !isLoaded) return;

        // ถ้าค่า > 0 และ "ยังไม่ได้เล่น" -> สั่งเล่น
        if (latest > 0) {
          if (!isPlayingRef.current) {
            lottieRef.current.play();
            isPlayingRef.current = true; // จำว่าเล่นแล้ว
          }
        }
        // ถ้าค่า = 0 และ "กำลังเล่นอยู่" -> สั่งหยุด
        else {
          if (isPlayingRef.current) {
            lottieRef.current.pause();
            isPlayingRef.current = false; // จำว่าหยุดแล้ว
          }
        }
      },
    );

    // Logic: Manual Play (ต้องอัปเดต isPlayingRef ด้วย)
    useEffect(() => {
      if (!lottieRef.current || !isLoaded || playTrigger) return;

      if (play) {
        lottieRef.current.play();
        isPlayingRef.current = true;
      } else {
        lottieRef.current.pause();
        isPlayingRef.current = false;
      }
    }, [play, isLoaded, playTrigger]);

    // 5. Logic: Scroll Seek
    useMotionValueEvent(
      scrollYProgress || fallbackMotionValue,
      "change",
      (latest) => {
        if (!lottieRef.current || !scrollYProgress || !isLoaded) return;
        const totalFrames = lottieRef.current.getDuration(true);
        if (totalFrames === undefined) return;
        lottieRef.current.goToAndStop(latest * totalFrames, true);
      },
    );

    if (!isLoaded || !animationData) {
      return <div className={`pointer-events-none opacity-0 ${className}`} />;
    }

    const intrinsicStyle: React.CSSProperties = ignoreAspectRatio
      ? {}
      : {
          aspectRatio: `${animationData.w} / ${animationData.h}`,
        };

    return (
      <div className={className} style={intrinsicStyle}>
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          autoplay={play && !playTrigger}
          loop={loop}
          onComplete={onComplete}
          rendererSettings={{
            preserveAspectRatio: "xMidYMid slice",
            className: "w-full h-full",
          }}
          {...props}
          className="w-full h-full"
        />
      </div>
    );
  },
);

LazyLottie.displayName = "LazyLottie";

export default LazyLottie;
