"use client";

import React from "react";
import dynamic from "next/dynamic";
import { DotLottieReactProps } from "@lottiefiles/dotlottie-react";

// ⭐ ย้าย logic การโหลดแบบ Lazy มาไว้ที่นี่ที่เดียว
const DotLottiePlayer = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  {
    ssr: false, // ปิด SSR เหมือนเดิม
    // ใส่ Placeholder สีจางๆ หรือขนาดว่างๆ รอไว้ระหว่างโหลด Script
    loading: () => <div className="w-full h-full bg-transparent" />, 
  }
);

// สร้าง Type สำหรับ Props เพื่อให้ TS ช่วยเช็ค (Clean Architecture)
interface LazyLottieProps extends Omit<DotLottieReactProps, "src"> {
  src: string; // บังคับว่าต้องส่ง path เป็น string เท่านั้น (เพื่อ Performance)
  className?: string;
  getRef?: (ref: any) => void; // เผื่อต้องการส่ง ref กลับไปสั่ง play/stop
}

const LazyLottie: React.FC<LazyLottieProps> = ({ 
  src, 
  className, 
  getRef, 
  ...props 
}) => {
  return (
    <div className={className}>
      <DotLottiePlayer
        {...props}
        src={src}
        dotLottieRefCallback={getRef} // ส่ง ref กลับไปถ้ามีการขอ
        renderConfig={{
          autoResize: true,
          devicePixelRatio: 1, // ⭐ Optimize GPU
          ...props.renderConfig,
        }}
      />
    </div>
  );
};

export default LazyLottie;