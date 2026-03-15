import {
  type MotionValue,
  m,
  useMotionValue,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useDevice } from "@/app/contexts/DeviceContext";

const MotionImage = m.create(Image);

interface IkigaiCircleProps {
  className?: string;
  imageSrc: string;
  iconSrc: string;
  text: string;
  rotateValue?: MotionValue<number>;
  initialAnimation: {
    initial: { opacity: number; rotate: number; x?: number; y?: number };
    animate: { opacity: number; rotate: number; x?: number; y?: number };
  };
  shouldAnimate: boolean;
  opacity?: MotionValue<number>;
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
    delay?: number;
  };
  yOffset?: number;
  alwaysShowTooltip?: boolean;
}

const IkigaiCircle = memo(
  ({
    className = "",
    imageSrc,
    iconSrc,
    text,
    rotateValue,
    initialAnimation,
    shouldAnimate,
    tooltipRotate,
    circleImgTransition,
    transition,
    yOffset = -180,
    opacity,
    alwaysShowTooltip = false,
  }: IkigaiCircleProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);

    const handleHoverStart = useCallback(() => setIsHovered(true), []);
    const handleHoverEnd = useCallback(() => setIsHovered(false), []);

    const { isMobile } = useDevice();

    const tooltipVariants: Variants = useMemo(
      () => ({
        hidden: { opacity: 0, transition: { duration: 0.2 } },
        visible: { opacity: 0.8, transition: { duration: 0.3 } },
      }),
      [],
    );

    // Local m value fallbacks when parent doesn't provide them
    const localRotate = useMotionValue(0);
    const localOpacity = useMotionValue(1);

    const appliedRotate =
      animationComplete && rotateValue ? rotateValue : localRotate;
    const appliedOpacity = opacity ?? localOpacity;

    // Track animation completion
    useEffect(() => {
      if (shouldAnimate && transition) {
        const delay = transition.delay || 0;
        const timer = setTimeout(
          () => {
            setAnimationComplete(true);
          },
          (transition.duration + delay) * 1000,
        );
        return () => clearTimeout(timer);
      }
    }, [shouldAnimate, transition]);

    return (
      <m.div
        className={`absolute pointer-events-none ${className}`}
        initial={initialAnimation.initial}
        animate={initialAnimation.animate}
        transition={transition}
        // Framer Motion ฉลาดพอที่จะจัดการค่าระหว่าง Animation vs MotionValue
        style={{
          rotate: appliedRotate,
          opacity: appliedOpacity,
          willChange: "transform, opacity",
        }}
      >
        <m.div
          className="relative w-[320px] md:w-[380px] h-auto"
          style={{
            y: yOffset,
            pointerEvents: "auto",
          }}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
        >
          <MotionImage
            src={imageSrc}
            alt={text}
            width={0}
            height={0}
            sizes="(max-width: 768px) 320px, 380px"
            className="w-full h-auto"
            initial={{ opacity: 0 }}
            animate={{
              opacity: shouldAnimate ? 1 : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={circleImgTransition}
            draggable={false}
          />

          {/* ... Tooltip code ... */}
          <m.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ rotate: tooltipRotate }}
            initial={{ opacity: 0 }}
            animate={
              (shouldAnimate && alwaysShowTooltip) ||
              (shouldAnimate && isHovered && !isMobile) ||
              (shouldAnimate && isMobile)
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            transition={{ ...circleImgTransition }}
            variants={tooltipVariants}
          >
            <Image
              src={iconSrc}
              alt=""
              width={56}
              height={56}
              quality={85}
              sizes="(max-width: 768px) 40px, 56px"
              style={{ height: "auto" }}
            />
            <p className="text-sm md:text-xl font-semibold text-white whitespace-nowrap shadow-black/50 drop-shadow-md">
              {text}
            </p>
          </m.div>
        </m.div>
      </m.div>
    );
  },
);

IkigaiCircle.displayName = "IkigaiCircle";

export default IkigaiCircle;
