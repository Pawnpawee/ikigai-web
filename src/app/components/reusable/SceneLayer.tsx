"use client";
import React from "react";
import { motion, MotionStyle, MotionValue, TargetAndTransition, VariantLabels } from "framer-motion";
import Image from "next/image";

const MotionImage = motion.create(Image);

export interface SceneItemData {
  id: string;
  src: string;
  alt: string;
  style: {
    top?: string;
    left?: string;
    width?: string;
    height?: string;
    bottom?: string;
    right?: string;
    zIndex?: number;
  };
  animGroup?: number; 
  priority?: boolean;
  sizes?: string; 
  quality?: number; 
  className?: string; 
}

type AnimationMap = Record<
  number,
  {
    y?: MotionValue<number> | number;
    opacity?: MotionValue<number> | number;
    rotate?: MotionValue<number> | number;
    zIndex?: MotionValue<number> | number;
  }
>;

type ItemAnimationOverride = Record<
  string,
  {
    initial?: boolean | TargetAndTransition | VariantLabels;
    animate?: boolean | TargetAndTransition | VariantLabels;
    transition?: any;
    style?: MotionStyle;
  }
>;

interface SceneLayerProps {
  items: SceneItemData[];
  animations: AnimationMap; 
  baseStyle?: React.CSSProperties; 
  containerAspectRatio?: string; 
  children?: React.ReactNode; 
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
            transform: "translateZ(0)",
            ...baseStyle,
            ...override?.style,
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
                sizes={item.sizes || "(max-width: 768px) 100vw, 50vw"}
                className="object-contain w-full h-full"
                quality={item.quality || 85}
              />
            </motion.div>
          );
        })}
        {children}
      </div>
    </div>
  );
}
