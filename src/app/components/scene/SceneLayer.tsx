"use client";
import React from "react";
import { motion, MotionValue } from "framer-motion";
import Image from "next/image";

// ⭐ 1. Create MotionImage Factory (Best Performance)
const MotionImage = motion.create(Image);

// ⭐ 2. Define Types
export interface SceneItemData {
  id: string;
  src: string;
  alt: string;
  // Position & Size (Percent string e.g. "10%")
  style: {
    top?: string;
    left?: string;
    width?: string;
    height?: string;
    bottom?: string;
    right?: string;
    zIndex?: number;
  };
  animGroup?: number; // Key to map with animations
  priority?: boolean;
  sizes?: string; // Default: "20vw"
  quality?: number; // Next/Image quality (1-100)
  className?: string; // e.g. "mix-blend-screen"
}

export type AnimationMap = Record<
  number,
  {
    y?: MotionValue<number> | number;
    opacity?: MotionValue<number> | number;
    rotate?: MotionValue<number> | number;
    zIndex?: MotionValue<number> | number;
  }
>;

// Allow per-item animation overrides (initial/animate/transition)
export type ItemAnimationOverride = Record<
  string,
  {
    initial?: any;
    animate?: any;
    transition?: any;
  }
>;

interface SceneLayerProps {
  items: SceneItemData[]; // Array ข้อมูลรูปภาพ
  animations: AnimationMap; // Object รวม Animation hooks
  baseStyle?: React.CSSProperties; // Style กลาง (เช่น will-change)
  containerAspectRatio?: string; // e.g. "1920 / 2160"
  children?: React.ReactNode; // Slot สำหรับของแปลกๆ เช่น Lottie
  itemOverrides?: ItemAnimationOverride;
}

export default function SceneLayer({
  items,
  animations,
  baseStyle,
  containerAspectRatio,
  children,
  itemOverrides,
}: SceneLayerProps) {
  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: containerAspectRatio }}
    >
      <div className="absolute inset-0">
        {items.map((item) => {
          const anim =
            item.animGroup !== undefined && animations[item.animGroup]
              ? animations[item.animGroup]
              : { y: 0, opacity: 1 };

          const override = itemOverrides?.[item.id];

          // ⭐ Performance: สร้าง style object แยกเพื่อลดการคำนวณใน render
          // การใส่ willChange: "auto" เป็นค่าเริ่มต้น และใส่เฉพาะตัวที่ขยับเยอะจริงๆ ช่วยประหยัด RAM
          const mergedStyle = {
            top: item.style.top,
            left: item.style.left,
            width: item.style.width,
            height: item.style.height,
            bottom: item.style.bottom,
            right: item.style.right,
            y: anim?.y,
            opacity: anim?.opacity,
            rotate: anim?.rotate,
            zIndex: item.style.zIndex,
            // ⭐ แก้ไข: ใช้ transform: translateZ(0) เพื่อเปิด Hardware Acceleration (GPU) แบบ manual
            // แทน will-change ในบางกรณีที่ไม่ได้ขยับตลอดเวลา ช่วยลด memory overhead
            transform: "translateZ(0)",
            ...baseStyle,
          };

          return (
            <motion.div
              key={item.id}
              className={`absolute ${item.className || ""}`}
              initial={override?.initial}
              animate={override?.animate}
              transition={override?.transition}
              style={mergedStyle}
            >
              <MotionImage
                src={item.src}
                alt={item.alt}
                fill
                loading={item.priority ? "eager" : "lazy"}
                priority={item.priority}
                // ⭐ แก้ไข: ปรับ sizes ให้ Dynamic ตาม props ที่ส่งมา หรือใช้ค่าที่ครอบคลุม Responsive
                // (max-width: 768px) 100vw คือมือถือโหลดเต็มจอ, 50vw คือจอใหญ่โหลดครึ่งจอ
                sizes={item.sizes || "(max-width: 768px) 100vw, 50vw"}
                className="object-contain w-full h-full"
                quality={item.quality || 85} // ⭐ ลด Quality ลงนิดหน่อย (90 -> 85) ตาเปล่าแยกยากแต่ไฟล์เล็กลงมาก
              />
            </motion.div>
          );
        })}
        {children}
      </div>
    </div>
  );
}
