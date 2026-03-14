import { m } from "framer-motion";
import Image from "next/image";
import type { CSSProperties } from "react";

interface IconProps {
  src: string;
  alt?: string;
  label?: string;
  size?: number | string;
  color?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  withHoverEffect?: boolean;
}

const MotionImage = m.create(Image);

const getNumericSize = (size: number | string): number => {
  if (typeof size === "number") return size;

  const parsed = Number.parseInt(size, 10);
  if (Number.isFinite(parsed) && parsed > 0) return parsed;

  return 40;
};

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
  const numericSize = getNumericSize(size);
  const Component = withHoverEffect ? MotionImage : Image;

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
      width={numericSize}
      height={numericSize}
      sizes={
        typeof size === "number" ? `${size}px` : size || `${numericSize}px`
      }
      quality={80}
      style={{ width: size, height: size, color, ...style }}
      draggable={false}
      onClick={onClick}
      aria-label={label || alt}
      {...hoverProps}
    />
  );
}
