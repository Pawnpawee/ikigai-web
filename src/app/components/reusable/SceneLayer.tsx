"use client";

import { useDevice } from "@/app/contexts/DeviceContext";
import {
  type MotionValue,
  m,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import type React from "react";
import { useMemo } from "react";

const MotionImage = m.create(Image);

// --- 1. Interface ใหม่: ย้าย Config ทุกอย่างมารวมที่ Data ---
export interface SceneItemData {
  id: string;
  src: string;
  alt: string;

  // Style หลัก (Desktop Default)
  style: {
    top?: string;
    left?: string;
    width?: string;
    height?: string;
    bottom?: string;
    right?: string;
    zIndex?: number;
    transform?: string; // Static transform
  };

  // Style สำหรับ Mobile
  mobileStyle?: {
    top?: string;
    left?: string;
    width?: string;
    height?: string;
    bottom?: string;
    right?: string;
  };

  // Config สำหรับ Animation และ Parallax
  motionConfig?: {
    parallaxDepth?: number; // ความลึก 
    delay?: number; // Delay ตอนปรากฏตัว
    duration?: number; // ความเร็วตอนปรากฏตัว
  };

  animGroup?: number; // สำหรับ Scroll Animation (JobApplication)
  priority?: boolean;
  sizes?: string;
  quality?: number;
  className?: string;
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

interface SceneLayerProps {
  items: SceneItemData[];

  // Optional: Scroll Animations
  animations?: AnimationMap;

  // Optional: Mouse Parallax 
  parallaxMouse?: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };

  // Optional: Trigger ให้เริ่มแสดงผล (Fade-in)
  shouldAnimate?: boolean;

  containerAspectRatio?: string;
  children?: React.ReactNode;
}

// --- 2. Sub-Component: แยก Logic รายตัวเพื่อใช้ Hooks ---
const SceneItem = ({
  item,
  animations,
  parallaxMouse,
  shouldAnimate,
}: {
  item: SceneItemData;
  animations?: AnimationMap;
  parallaxMouse?: { x: MotionValue<number>; y: MotionValue<number> };
  shouldAnimate?: boolean;
}) => {
  // ตรวจสอบ Device
  const { isMobile } = useDevice();

  // ดึง Scroll Animation (ถ้ามี)
  const groupAnim =
    item.animGroup !== undefined && animations?.[item.animGroup]
      ? animations[item.animGroup]
      : undefined;

  // คำนวณ Parallax (คำนวณรอไว้เสมอตามกฎ React Hooks)
  // ใช้ default value 0.5 กัน Error กรณีไม่ได้ส่ง mouse มา
  const fallbackMouse = useMotionValue(0.5);
  const mouseX = parallaxMouse?.x || fallbackMouse;
  const mouseY = parallaxMouse?.y || fallbackMouse;
  const depth = item.motionConfig?.parallaxDepth || 0;

  const parallaxX = useTransform(mouseX, [0, 1], [depth, -depth]);
  // แกน Y ขยับน้อยกว่า X (หาร 3) เพื่อความสมจริง
  const parallaxY = useTransform(mouseY, [0, 1], [depth / 3, -depth / 3]);

  // Logic การตัดสินใจ (Decision Logic)
  // Mobile Check: ถ้าเป็น Mobile ให้ค่าเป็น undefined (ไม่ขยับ)
  const activeParallaxX = !isMobile && depth ? parallaxX : undefined;

  // Conflict Check: ถ้า Scroll คุม Y อยู่แล้ว (groupAnim.y) ให้ปิด Parallax Y
  const activeParallaxY =
    !isMobile && !groupAnim?.y && depth ? parallaxY : undefined;

  // Responsive Style: เลือกใช้ Mobile Style หรือ Desktop Style
  const responsiveStyle = useMemo(() => {
    if (isMobile && item.mobileStyle) {
      return { ...item.style, ...item.mobileStyle };
    }
    return item.style;
  }, [isMobile, item.style, item.mobileStyle]);

  const animateAnim = useMemo(() => {
    // ถ้าไม่มี shouldAnimate ส่งมา ให้ถือว่าแสดงเลย
    const shouldShow = shouldAnimate ?? true;
    return shouldShow ? { opacity: 1 } : { opacity: 0 };
  }, [shouldAnimate]);

  const transitionAnim = useMemo(
    () => ({
      duration: item.motionConfig?.duration || 1.5,
      delay: item.motionConfig?.delay || 0,
      ease: "easeInOut" as const,
    }),
    [item.motionConfig],
  );

  // 2.5 Merge ทุกอย่างเข้าด้วยกัน
  const mergedStyle = {
    // Static Styles (Responsive)
    ...responsiveStyle,
    transform: "translateZ(0)", // บังคับ GPU Layer พื้นฐาน

    // Dynamic Styles (Animation)
    y: groupAnim?.y || activeParallaxY, // Scroll ชนะ Parallax
    x: activeParallaxX, // Parallax X
    opacity: groupAnim?.opacity, // Scroll Opacity (ถ้ามี)
    rotate: groupAnim?.rotate, // Scroll Rotate (ถ้ามี)
    zIndex: groupAnim?.zIndex || item.style.zIndex,

    // Performance Optimization
    // Mobile: ปิด will-change
    // Desktop: เปิดเฉพาะที่มีการขยับ (Parallax หรือ Scroll)
    willChange: isMobile
      ? "auto"
      : depth || groupAnim
        ? "transform, opacity"
        : "auto",
  };

  return (
    <m.div
      className={`absolute ${item.className || ""}`}
      initial={{ opacity: 0 }}
      animate={animateAnim}
      transition={transitionAnim}
      style={mergedStyle}
    >
      <MotionImage
        src={item.src}
        alt={item.alt}
        fill
        loading={item.priority ? "eager" : "lazy"}
        priority={item.priority}
        fetchPriority={item.priority ? "high" : "auto"}
        sizes={item.sizes || "(max-width: 768px) 100vw, 50vw"}
        className="object-contain w-full h-full"
        quality={item.quality || 85}
      />
    </m.div>
  );
};

// --- 3. Main Component ---
export default function SceneLayer({
  items,
  animations, // Optional
  parallaxMouse, // Optional
  shouldAnimate, // Optional
  containerAspectRatio,
  children,
}: SceneLayerProps) {
  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: containerAspectRatio }}
    >
      <div className="absolute inset-0">
        {items.map((item) => (
          <SceneItem
            key={item.id}
            item={item}
            animations={animations}
            parallaxMouse={parallaxMouse}
            shouldAnimate={shouldAnimate}
          />
        ))}
        {children}
      </div>
    </div>
  );
}
