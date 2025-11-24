import React, { useState, useCallback, useMemo, memo } from "react"; // ⭐ เพิ่ม memo
import { motion, MotionValue, Variants } from "framer-motion";
export interface IkigaiCircleProps {
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
}

const IkigaiCircle = memo(
  ({
    // ⭐ ครอบด้วย memo(...)
    className = "",
    imageSrc,
    iconSrc,
    text,
    rotateValue,
    initialAnimation,
    shouldAnimate,
    tooltipRotate,
    circleImgTransition, // ... default values
    transition,
    yOffset = -180,
    opacity, // ⭐ รับ opacity มาใช้ตรงๆ
  }: IkigaiCircleProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleHoverStart = useCallback(() => setIsHovered(true), []);
    const handleHoverEnd = useCallback(() => setIsHovered(false), []);

    const tooltipVariants: Variants = useMemo(
      () => ({
        hidden: { opacity: 0, transition: { duration: 0.2 } },
        visible: { opacity: 0.8, transition: { duration: 0.3 } },
      }),
      [],
    );

    return (
      <motion.div
        className={`absolute pointer-events-none ${className}`}
        initial={initialAnimation.initial}
        animate={initialAnimation.animate}
        transition={transition}
        // ⭐ ใส่ Style ตรงนี้เลย ไม่ต้องผ่าน Function
        // Framer Motion ฉลาดพอที่จะจัดการค่าระหว่าง Animation vs MotionValue
        style={{
          rotate: rotateValue,
          opacity: opacity,
          willChange: "transform, opacity",
        }}
      >
        <motion.div
          // ⭐ แก้ w-[380px] เป็น Responsive (มือถือเล็กหน่อย -> จอใหญ่ค่อยใหญ่)
          className="relative w-[320px] md:w-[380px] h-auto cursor-pointer"
          style={{ y: yOffset, pointerEvents: "auto" }}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
        >
          {/* ... เนื้อหาข้างในเหมือนเดิม ... */}
          <motion.img
            src={imageSrc}
            className="w-full h-auto"
            initial={{ opacity: 0 }}
            animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
            transition={circleImgTransition}
            alt=""
            draggable={false} // ⭐ กัน User ลากรูปเล่น
          />

          {/* ... Tooltip code ... */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" // ⭐ ปรับ gap/bottom ให้สวยขึ้น
            style={{ rotate: tooltipRotate }}
            initial="hidden"
            animate={isHovered ? "visible" : "hidden"}
            variants={tooltipVariants}
          >
            <img
              src={iconSrc}
              className="h-10 md:h-14 w-auto"
              loading="lazy"
              alt=""
            />{" "}
            {/* ⭐ ปรับ icon size responsive */}
            <p className="typo-h6 text-white whitespace-nowrap shadow-black/50 drop-shadow-md">
              {text}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  },
);

IkigaiCircle.displayName = "IkigaiCircle"; // ⭐ Best practice เมื่อใช้ memo

export default IkigaiCircle;
