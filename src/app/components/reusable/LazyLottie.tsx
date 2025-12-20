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

interface LazyLottieProps
  extends Omit<LottieComponentProps, "animationData" | "src"> {
  src: string | LottieAnimationData;
  className?: string;
  getRef?: (ref: LottieRefCurrentProps | null) => void;
  play?: boolean;
  scrollYProgress?: MotionValue<number>;
  triggerRange?: [number, number];
  delay?: number;
  onComplete?: () => void;
  ignoreAspectRatio?: boolean;
}

const LazyLottie: React.FC<LazyLottieProps> = memo(
  ({
    src,
    className,
    getRef,
    play = false,
    scrollYProgress,
    triggerRange = [0, 1],
    loop = true,
    delay = 0,
    onComplete,
    ignoreAspectRatio = false,
    ...props
  }) => {
    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const [animationData, setAnimationData] =
      useState<LottieAnimationData | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    //? 1. Data Logic
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

    //? 2. Ref Logic
    useEffect(() => {
      if (getRef && lottieRef.current) {
        getRef(lottieRef.current);
      }
    }, [getRef]);

    //? 3. Playback Logic
    useEffect(() => {
      if (!lottieRef.current || !isLoaded) return;
      let timeoutId: NodeJS.Timeout | undefined;

      if (play) {
        if (delay > 0) {
          timeoutId = setTimeout(() => {
            lottieRef.current?.play();
          }, delay);
        } else {
          lottieRef.current.play();
        }
      } else {
        clearTimeout(timeoutId);
        lottieRef.current.pause();
      }

      return () => {
        clearTimeout(timeoutId);
      };
    }, [play, delay, isLoaded]);

    //? 4. Scroll Logic
    const fallbackMotionValue = useMotionValue(0);

    useMotionValueEvent(
      scrollYProgress || fallbackMotionValue,
      "change",
      () => {
        if (!lottieRef.current || !scrollYProgress || !isLoaded) return;
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
          autoplay={play}
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
