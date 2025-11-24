import React, { useState, useCallback, useMemo } from "react";
import { motion, MotionValue, Variants } from "framer-motion";

interface IkigaiCircleProps {
  className?: string;
  imageSrc: string;
  iconSrc: string;
  text: string;
  rotateValue: MotionValue<number>;
  initialAnimation: {
    initial: { opacity: number; rotate: number; x?: number; y?: number };
    animate: { opacity: number; rotate: number; x?: number; y?: number };
  };
  shouldAnimate: boolean;
  opacity: MotionValue<number>;
  tooltipRotate: number;
  circleImgTransition?: {
    type: "tween";
    duration: number;
    ease: "easeInOut";
  };
  transition?: {
    type: "tween";
    duration: number;
    ease: "easeInOut";
  };
  yOffset?: number;
  getCircleStyle: (rotateTransform: any) =>
    | {
        rotate: MotionValue<number>;
        opacity: MotionValue<number>;
        willChange: "transform, opacity";
      }
    | { willChange: "transform, opacity" };
}

const IkigaiCircle: React.FC<IkigaiCircleProps> = ({
  className = "",
  imageSrc,
  iconSrc,
  text,
  rotateValue,
  initialAnimation,
  shouldAnimate,
  tooltipRotate,
  circleImgTransition = {
    type: "tween" as const,
    duration: 2,
    ease: "easeInOut" as const,
  },
  transition = {
    type: "tween" as const,
    duration: 2,
    ease: "easeInOut" as const,
  },
  yOffset = -180,
  getCircleStyle,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverStart = useCallback(() => setIsHovered(true), []);
  const handleHoverEnd = useCallback(() => setIsHovered(false), []);

  const tooltipVariants: Variants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        transition: { duration: 0.2 },
      },
      visible: {
        opacity: 0.8,
        transition: { duration: 0.3 },
      },
    }),
    [],
  );

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={initialAnimation.initial}
      animate={initialAnimation.animate}
      transition={transition}
      style={getCircleStyle(rotateValue)}
    >
      <motion.div
        className="relative w-[380px] h-auto cursor-pointer"
        style={{ y: yOffset, pointerEvents: "auto" }}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
      >
        <motion.img
          src={imageSrc}
          className="w-full h-auto"
          initial={{ opacity: 0 }}
          animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
          transition={circleImgTransition}
          alt=""
        />
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          style={{ rotate: tooltipRotate }}
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
          variants={tooltipVariants}
        >
          <img src={iconSrc} className="h-15" loading="lazy" alt="" />
          <p className="typo-h6 text-white">{text}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default IkigaiCircle;
