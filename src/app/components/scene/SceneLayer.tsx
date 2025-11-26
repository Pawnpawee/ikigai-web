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
  };
  animGroup?: number; // Key to map with animations
  priority?: boolean;
  sizes?: string; // Default: "20vw"
  className?: string; // e.g. "mix-blend-screen"
}

export type AnimationMap = Record<
  number,
  { y?: MotionValue<number> | number; opacity?: MotionValue<number> | number }
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
    <div className="relative w-full" style={{ aspectRatio: containerAspectRatio }}>
      <div className="absolute inset-0">
        {/* ⭐ Render Items Loop */}
        {items.map((item) => {
          // ดึง Animation จาก Map ถ้าไม่มีใช้ค่า Default (นิ่งๆ)
          const anim = item.animGroup !== undefined && animations[item.animGroup]
            ? animations[item.animGroup]
            : { y: 0, opacity: 1 };

          // Use a positioned wrapper so Next/Image fill works reliably
          const override = itemOverrides?.[item.id];

          return (
            <motion.div
              key={item.id}
              className={`absolute ${item.className || ""}`}
              initial={override?.initial}
              animate={override?.animate}
              transition={override?.transition}
              style={{
                top: item.style.top,
                left: item.style.left,
                width: item.style.width,
                height: item.style.height,
                bottom: item.style.bottom,
                right: item.style.right,
                y: anim?.y,
                opacity: anim?.opacity,
                ...baseStyle,
              }}
            >
              <MotionImage
                src={item.src}
                alt={item.alt}
                fill
                loading={item.priority ? "eager" : "lazy"}
                priority={item.priority}
                sizes={item.sizes || "20vw"}
                className="object-contain w-full h-full"
                style={{ objectFit: "contain" }}
              />
            </motion.div>
          );
        })}

        {/* ⭐ Render Special Elements (Lottie, etc.) */}
        {children}
      </div>
    </div>
  );
}
