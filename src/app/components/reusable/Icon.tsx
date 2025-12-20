import React from "react";
import { motion } from "framer-motion";

interface IconProps {
  src: string;
  alt?: string;
  label?: string;
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  withHoverEffect?: boolean;
}

export default function Icon({
  src,
  alt = "",
  label,
  size = "",
  color,
  className,
  style,
  onClick,
  withHoverEffect = false,
}: IconProps) {
  const Component = withHoverEffect ? motion.img : "img";

  const hoverProps = withHoverEffect
    ? {
        initial: {
          filter: "drop-shadow(0 0 0px rgba(0, 0, 0, 0))",
          opacity: 0.8,
          y: 3,
        },
        whileHover: {
          filter: `drop-shadow(0 0 1px var(--color-blue-200))`,
          opacity: 1,
          y: 0,
        },
        transition: { type: "spring" as const, stiffness: 300, damping: 15 },
      }
    : {};

  return (
    <Component
      src={src}
      alt={alt || label || ""}
      className={`${className} ${onClick ? "cursor-pointer" : ""}`}
      sizes={typeof size === "number" ? `${size}px` : size}
      style={{ width: size, height: size, color, ...style }}
      draggable={false}
      onClick={onClick}
      aria-label={label || alt}
      {...hoverProps}
    />
  );
}
