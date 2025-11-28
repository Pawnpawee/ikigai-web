"use client";

import React, { memo, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { DotLottieReactProps } from "@lottiefiles/dotlottie-react";
// ⭐ เพิ่ม useMotionValue เข้ามาด้วย เพื่อสร้างค่า Default
import {
  MotionValue,
  useMotionValueEvent,
  useMotionValue,
} from "framer-motion";

const DotLottiePlayer = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  {
    ssr: false,
    loading: () => <div className="w-full h-full bg-transparent" />,
  },
);

interface LazyLottieProps extends Omit<DotLottieReactProps, "src" | "play"> {
  src: string;
  className?: string;
  getRef?: (ref: any) => void;
  play?: boolean;
  scrollYProgress?: MotionValue<number>;
  triggerRange?: [number, number];
}

const LazyLottie: React.FC<LazyLottieProps> = memo(
  ({
    src,
    className,
    getRef,
    play,
    scrollYProgress,
    triggerRange = [0.01, 1],
    ...props
  }) => {
    const [dotLottie, setDotLottie] = useState<any>(null);
    const [isScrollPlaying, setIsScrollPlaying] = useState(false);

    // ⭐ แก้ไขตรงนี้: สร้าง MotionValue จำลอง (Dummy) ไว้กันตาย
    const fallbackMotionValue = useMotionValue(0);

    // ⭐ ถ้า scrollYProgress ไม่มี ให้ใช้ fallbackMotionValue แทน (เพื่อไม่ให้ Hook พัง)
    const targetMotionValue = scrollYProgress || fallbackMotionValue;

    // ตอนนี้ targetMotionValue จะเป็น MotionValue เสมอ ไม่ใช่ undefined แล้ว
    useMotionValueEvent(targetMotionValue, "change", (latest) => {
      // เช็คอีกรอบเพื่อความชัวร์ทาง Logic ว่าถ้าไม่มี Props ส่งมาจริงๆ ไม่ต้องทำอะไร
      if (!triggerRange || !scrollYProgress) return;

      const [start, end] = triggerRange;
      const shouldPlay = latest >= start && latest <= end;

      if (isScrollPlaying !== shouldPlay) {
        setIsScrollPlaying(shouldPlay);
      }
    });

    const finalPlayState =
      triggerRange && scrollYProgress ? isScrollPlaying : (play ?? false);

    useEffect(() => {
      if (!dotLottie) return;
      if (finalPlayState) {
        dotLottie.play();
      } else {
        dotLottie.pause();
      }
    }, [finalPlayState, dotLottie]);

    return (
      <div className={className}>
        <DotLottiePlayer
          {...props}
          src={src}
          autoplay={false}
          dotLottieRefCallback={(dotLottieInstance) => {
            setDotLottie(dotLottieInstance);
            if (getRef) getRef(dotLottieInstance);
          }}
          renderConfig={{
            autoResize: true,
            devicePixelRatio: 1,
            freezeOnOffscreen: true,
            ...props.renderConfig,
          }}
        />
      </div>
    );
  },
);

LazyLottie.displayName = "LazyLottie";

export default LazyLottie;
