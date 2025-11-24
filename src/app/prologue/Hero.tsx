import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  Variants,
  useInView,
} from "framer-motion";
import LazyLottie from "@/app/components/ui/LazyLottie";
import { useAudio } from "@/app/contexts/AudioContext";
import { useSoundEffect } from "@/app/hooks/useSoundEffect";
import { useAssetLoader } from "@/app/contexts/AssetLoaderContext";
import { useAnimationReady } from "@/app/hooks/useAnimationReady";
import { useLottieWithSound } from "@/app/hooks/useLottieWithSound";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const { animationsStarted } = useAudio();
  const { isLoading: isAssetsLoading } = useAssetLoader();

  // ใช้ custom hook สำหรับ sound effect
  const { playSoundEffect, stopSoundEffect } = useSoundEffect({
    soundPath: "/assets/Sound/12/magical-sparkling.mp3",
    fadeDurationMs: 500,
    soundDurationMs: 2500,
  });

  // ใช้ custom hook สำหรับ Lottie animation + sound synchronization
  const { lottieRef, isLottieComplete, hasPlayedOnce } = useLottieWithSound({
    isInView,
    animationsStarted,
    isAssetsLoading,
    playSoundEffect,
    stopSoundEffect,
    animationDurationInSeconds: 3,
    initialDelayMs: 2000,
    glowOffsetMs: 1200,
  });

  const { scrollYProgress: elementScrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(
    elementScrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );
  const opacity = useTransform(elementScrollYProgress, [1, 0], [0, 1]);

  const textContent = "LIFE OF JOURNEY";
  const containerVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08,
          delayChildren: 1.5,
        },
      },
    }),
    []
  );
  const charVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, x: -5 },
      visible: {
        opacity: 1,
        x: 0,
      },
    }),
    []
  );

  const [isInitialAnimationComplete, setIsInitialAnimationComplete] =
    useState(false);
  const circle1_rotate = useTransform(
    elementScrollYProgress,
    [0, 1],
    [-180, 0]
  );
  const circle2_rotate = useTransform(elementScrollYProgress, [0, 1], [90, 0]);
  const circle3_rotate = useTransform(elementScrollYProgress, [0, 1], [0, 90]);
  const circle4_rotate = useTransform(elementScrollYProgress, [0, 1], [-90, 0]);

  const tooltipVariants = useMemo(
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
    []
  );

  const [isCircle1Hovered, setIsCircle1Hovered] = useState(false);
  const [isCircle2Hovered, setIsCircle2Hovered] = useState(false);
  const [isCircle3Hovered, setIsCircle3Hovered] = useState(false);
  const [isCircle4Hovered, setIsCircle4Hovered] = useState(false);

  const lottieGlowVariants: Variants = useMemo(
    () => ({
      initial: {
        filter: "drop-shadow(0px 0px 0px rgba(255,255,255,0))",
      },
      glowing: {
        filter: [
          "drop-shadow(0px 0px 0px rgba(255,255,255,0))",
          "drop-shadow(0px 0px 5px rgba(255,255,255,1))",
          "drop-shadow(0px 0px 0px rgba(255,255,255,0))",
        ],
        transition: {
          duration: 1.5,
        },
      },
    }),
    []
  );

  // Memoize hover handlers
  const handleCircle1HoverStart = useCallback(
    () => setIsCircle1Hovered(true),
    []
  );
  const handleCircle1HoverEnd = useCallback(
    () => setIsCircle1Hovered(false),
    []
  );
  const handleCircle2HoverStart = useCallback(
    () => setIsCircle2Hovered(true),
    []
  );
  const handleCircle2HoverEnd = useCallback(
    () => setIsCircle2Hovered(false),
    []
  );
  const handleCircle3HoverStart = useCallback(
    () => setIsCircle3Hovered(true),
    []
  );
  const handleCircle3HoverEnd = useCallback(
    () => setIsCircle3Hovered(false),
    []
  );
  const handleCircle4HoverStart = useCallback(
    () => setIsCircle4Hovered(true),
    []
  );
  const handleCircle4HoverEnd = useCallback(
    () => setIsCircle4Hovered(false),
    []
  );

  // Memoize animation complete callback
  const handleAnimationComplete = useCallback(() => {
    if (!isInitialAnimationComplete) {
      setIsInitialAnimationComplete(true);
    }
  }, [isInitialAnimationComplete]);

  // Memoize text split
  const textChars = useMemo(() => textContent.split(""), [textContent]);

  // Memoize circle style function
  const getCircleStyle = useCallback(
    (rotateTransform: any) => {
      if (isInitialAnimationComplete) {
        return {
          rotate: rotateTransform,
          opacity,
          willChange: "transform, opacity",
        };
      }
      return { willChange: "transform, opacity" };
    },
    [isInitialAnimationComplete, opacity]
  );

  // Use reusable animation ready hook
  const shouldAnimate = useAnimationReady();

  return (
    <div
      ref={ref}
      className="w-screen h-screen overflow-hidden flex flex-col items-center justify-center relative black-linear"
    >
      {/* Mountain */}
      <motion.div
        className="absolute bottom-0 w-screen h-screen"
        style={{ y: backgroundY }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="absolute bottom-0 w-full h-full"
        >
          <Image
            src="/assets/Scene/Hero/hill-c-b.svg"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-bottom object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 2.5 }}
          className="absolute bottom-0 w-full h-full"
        >
          <Image
            src="/assets/Scene/Hero/hill-c-f.svg"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-bottom object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-0 w-full h-full"
        >
          <Image
            src="/assets/Scene/Hero/hill-r-f.svg"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-bottom object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute bottom-0 w-full h-full"
        >
          <Image
            src="/assets/Scene/Hero/hill-l-f.svg"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-bottom object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Circle-World */}
      <motion.div
        className="absolute scale-40 sm:scale-50 md:scale-80 lg:scale-100"
        initial={{ opacity: 0, rotate: 0, x: 350 }}
        animate={
          shouldAnimate
            ? { opacity: 1, rotate: -90 }
            : { opacity: 0, rotate: 0 }
        }
        transition={{
          type: "tween",
          duration: 2,
          ease: "easeInOut",
        }}
        style={getCircleStyle(circle4_rotate)}
      >
        <motion.div
          className="relative w-[380px] h-auto cursor-pointer"
          style={{ y: -180, pointerEvents: "auto" }}
          onHoverStart={handleCircle4HoverStart}
          onHoverEnd={handleCircle4HoverEnd}
        >
          <motion.img
            src="/assets/Scene/Hero/world-circle.svg"
            className="w-full h-auto"
            initial={{ opacity: 0 }}
            animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              type: "tween",
              duration: 2,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2
                 flex flex-col items-center gap-3 rotate-90"
            initial="hidden"
            animate={isCircle4Hovered ? "visible" : "hidden"}
            variants={tooltipVariants}
          >
            <img src="/assets/Icon/world.svg" className="h-15" loading="lazy" alt="" />
            <p className="typo-h6 text-white">สิ่งที่โลกต้องการ</p>
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Circle-Paid */}
      <motion.div
        className="absolute scale-40 sm:scale-50 md:scale-80 lg:scale-100"
        initial={{ opacity: 0, rotate: 90, y: 320 }}
        animate={
          shouldAnimate
            ? { opacity: 1, rotate: 0 }
            : { opacity: 0, rotate: 90 }
        }
        transition={{
          type: "tween",
          duration: 2,
          ease: "easeInOut",
        }}
        style={getCircleStyle(circle3_rotate)}
      >
        <motion.div
          className="relative w-[380px] h-auto cursor-pointer"
          style={{ y: -180, pointerEvents: "auto" }}
          onHoverStart={handleCircle3HoverStart}
          onHoverEnd={handleCircle3HoverEnd}
        >
          <motion.img
            src="/assets/Scene/Hero/paid-circle.svg"
            className="w-full h-auto"
            initial={{ opacity: 0 }}
            animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              type: "tween",
              duration: 2,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2
                 flex flex-col items-center gap-3"
            initial="hidden"
            animate={isCircle3Hovered ? "visible" : "hidden"}
            variants={tooltipVariants}
          >
            <img src="/assets/Icon/paid.svg" className="h-15" loading="lazy" alt="" />
            <p className="typo-h6 text-white">สิ่งที่สร้างรายได้</p>
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Circle-Skill */}
      <motion.div
        className="absolute scale-40 sm:scale-50 md:scale-80 lg:scale-100"
        initial={{ opacity: 0, rotate: 0, x: -350 }}
        animate={
          shouldAnimate
            ? { opacity: 1, rotate: 90 }
            : { opacity: 0, rotate: 0 }
        }
        transition={{
          type: "tween",
          duration: 2,
          ease: "easeInOut",
        }}
        style={getCircleStyle(circle2_rotate)}
      >
        <motion.div
          className="relative w-[380px] h-auto cursor-pointer"
          style={{ y: -180, pointerEvents: "auto" }}
          onHoverStart={handleCircle2HoverStart}
          onHoverEnd={handleCircle2HoverEnd}
        >
          <motion.img
            src="/assets/Scene/Hero/skill-circle.svg"
            className="w-full h-auto"
            initial={{ opacity: 0 }}
            animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              type: "tween",
              duration: 2,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2
                 flex flex-col items-center gap-3 -rotate-90"
            initial="hidden"
            animate={isCircle2Hovered ? "visible" : "hidden"}
            variants={tooltipVariants}
          >
            <img src="/assets/Icon/skill.svg" className="h-15" loading="lazy" alt="" />
            <p className="typo-h6 text-white">สิ่งที่ถนัด</p>
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Circle-Love */}
      <motion.div
        className="absolute scale-40 sm:scale-50 md:scale-80 lg:scale-100"
        initial={{ opacity: 0, rotate: 0, y: -320 }}
        animate={
          shouldAnimate
            ? { opacity: 1, rotate: -180 }
            : { opacity: 0, rotate: 0 }
        }
        transition={{
          type: "tween",
          duration: 2,
          ease: "easeInOut",
        }}
        style={getCircleStyle(circle1_rotate)}
      >
        <motion.div
          className="relative w-[380px] h-auto cursor-pointer"
          style={{ y: -200, pointerEvents: "auto" }}
          onHoverStart={handleCircle1HoverStart}
          onHoverEnd={handleCircle1HoverEnd}
        >
          <motion.img
            src="/assets/Scene/Hero/love-circle.svg"
            className="w-full h-auto"
            initial={{ opacity: 0 }}
            animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              type: "tween",
              duration: 2,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2
                 flex flex-col items-center gap-3 rotate-180"
            initial="hidden"
            animate={isCircle1Hovered ? "visible" : "hidden"}
            variants={tooltipVariants}
          >
            <img src="/assets/Icon/love.svg" className="h-15" loading="lazy" alt="" />
            <p className="typo-h6 text-white">สิ่งที่รัก</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Logo */}
      <motion.div
        className="relative flex flex-col items-center justify-center scale-40 sm:scale-50 md:scale-80 lg:scale-100"
        variants={containerVariants}
        initial="hidden"
        animate={isInView && animationsStarted ? "visible" : "hidden"}
        onAnimationComplete={handleAnimationComplete}
        style={isInitialAnimationComplete && isInView ? { opacity } : undefined}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={
            isInView && shouldAnimate
              ? { opacity: 1 }
              : { opacity: 0 }
          }
          transition={{ duration: 2, delay: 1.5 }}
        >
          <motion.div
            variants={lottieGlowVariants}
            animate={isLottieComplete ? "glowing" : "initial"}
          >
            <LazyLottie
              src="/assets/Icon/logo_ikigai_animate.lottie"
              className="h-[120px] aspect-770/200 mx-auto"
              loop={false}
              autoplay={false}
              getRef={(ref) => {
                lottieRef.current = ref;
              }}
            />
          </motion.div>
        </motion.div>
        <h2 className="typo-h2-serif text-white whitespace-nowrap">
          {textChars.map((char, index) => (
            <motion.span
              key={index}
              variants={charVariants}
              style={{ display: "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h2>
      </motion.div>
    </div>
  );
}
