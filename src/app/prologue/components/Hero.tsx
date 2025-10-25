"use client";
import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  Variants,
  useInView,
} from "framer-motion";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import logoAnimationData from "../../../../public/assets/Icon/logo_ikigai_animate.json";
import { useAudio } from "@/app/contexts/AudioContext";
import { useSoundEffect } from "@/app/hooks/useSoundEffect";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const { animationsStarted } = useAudio();

  // ใช้ custom hook สำหรับ sound effect
  const { playSoundEffect, stopSoundEffect } = useSoundEffect({
    soundPath: "/assets/Sound/12/magical-sparkling.mp3",
    fadeDurationMs: 500,
    soundDurationMs: 2500,
  });

  const playTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const glowTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

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
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 1.5,
      },
    },
  };
  const charVariants: Variants = {
    hidden: { opacity: 0, x: -5 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

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

  const tooltipVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      pointerEvents: "none",
      transition: { duration: 0.15 },
    },
    visible: {
      opacity: 1,
      scale: 1,
      pointerEvents: "auto",
      transition: { delay: 0.1, duration: 0.2 },
    },
  };

  const [isCircle1Hovered, setIsCircle1Hovered] = useState(false);
  const [isCircle2Hovered, setIsCircle2Hovered] = useState(false);
  const [isCircle3Hovered, setIsCircle3Hovered] = useState(false);
  const [isCircle4Hovered, setIsCircle4Hovered] = useState(false);

  const [isLottieComplete, setIsLottieComplete] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  const lottieGlowVariants: Variants = {
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
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 2,
      },
    },
  };

  useEffect(() => {
    if (isInView && animationsStarted && !hasPlayedOnce) {
      playTimerRef.current = setTimeout(() => {
        // Lottie
        lottieRef.current?.play();
        
        // เล่นเสียง effect
        playSoundEffect();

        // Lottie Glow
        const animationDurationInSeconds =
          lottieRef.current?.getDuration() || 0;
        const glowStartTimeInMs = Math.max(
          0,
          animationDurationInSeconds * 1000 - 1200
        );

        glowTimerRef.current = setTimeout(() => {
          setIsLottieComplete(true);
        }, glowStartTimeInMs);
        
        setHasPlayedOnce(true);
      }, 2000);
    }
  }, [isInView, animationsStarted, hasPlayedOnce, playSoundEffect]);

  // Cleanup เมื่อ component unmount หรือออกจาก view
  useEffect(() => {
    if (!isInView) {
      lottieRef.current?.stop();
      stopSoundEffect();
      setIsLottieComplete(false);
      setHasPlayedOnce(false);
      clearTimeout(playTimerRef.current);
      clearTimeout(glowTimerRef.current);
    }
  }, [isInView, stopSoundEffect]);

  return (
    <div
      ref={ref}
      className="w-screen h-screen overflow-hidden flex flex-col items-center justify-center relative  black-linear"
    >
      {/* Logo */}
      <motion.div
        className="relative z-7 flex flex-col items-center justify-center scale-40 sm:scale-50 md:scale-80 lg:scale-100"
        variants={containerVariants}
        initial="hidden"
        animate={isInView && animationsStarted ? "visible" : "hidden"}
        onAnimationComplete={() => {
          if (!isInitialAnimationComplete) {
            setIsInitialAnimationComplete(true);
          }
        }}
        style={isInitialAnimationComplete && isInView ? { opacity } : undefined}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={
            isInView && animationsStarted ? { opacity: 1 } : { opacity: 0 }
          }
          transition={{ duration: 2, delay: 1.5 }}
        >
          <motion.div
            variants={lottieGlowVariants}
            animate={isLottieComplete ? "glowing" : "initial"}
          >
            <Lottie
              lottieRef={lottieRef}
              animationData={logoAnimationData}
              loop={false}
              autoplay={false}
              className="h-[120px] w-auto"
            />
          </motion.div>
        </motion.div>
        <h2 className="typo-h2-serif text-white whitespace-nowrap">
          {textContent.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={charVariants}
              style={{ display: "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}{" "}
            </motion.span>
          ))}
        </h2>
      </motion.div>

      {/* Circle-Love */}
      <motion.div
        className="absolute z-6 scale-40 sm:scale-50 md:scale-80 lg:scale-100"
        initial={{ opacity: 0, rotate: 0, y: -320 }}
        animate={
          animationsStarted
            ? { opacity: 1, rotate: -180 }
            : { opacity: 0, rotate: 0 }
        }
        transition={{
          type: "tween",
          duration: 2,
          ease: "easeInOut",
        }}
        style={
          isInitialAnimationComplete
            ? {
                // ถ้า animation จบแล้ว: ให้ scroll ควบคุม
                rotate: circle1_rotate,
                opacity,
                willChange: "transform, opacity",
              }
            : { willChange: "transform, opacity" }
        }
      >
        <motion.div
          className="relative w-[380px] h-auto"
          style={{ y: -200 }}
          onHoverStart={() => setIsCircle1Hovered(true)}
          onHoverEnd={() => setIsCircle1Hovered(false)}
        >
          <motion.img
            src="/assets/Scene/Hero/love-circle.svg"
            className="w-full h-auto cursor-pointer"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              animationsStarted
                ? {
                    opacity: 1,
                    scale: isCircle1Hovered ? 1.1 : 1,
                  }
                : { opacity: 0, scale: 0.5 }
            }
            transition={{
              opacity: {
                type: "tween",
                duration: 2,
                ease: "easeInOut",
              },
              scale: {
                type: "spring",
                stiffness: 50,
                damping: 25,
              },
            }}
          />

          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2
                 flex flex-col items-center gap-3 rotate-180"
            initial="hidden"
            animate={isCircle1Hovered ? "visible" : "hidden"}
            variants={tooltipVariants}
          >
            <img src="/assets/Icon/love.svg" className="h-15" />
            <p className="typo-h6 text-white">สิ่งที่รัก</p>
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Circle-Skill */}
      <motion.div
        className="absolute z-5 scale-40 sm:scale-50 md:scale-80 lg:scale-100"
        initial={{ opacity: 0, rotate: 0, x: -350 }}
        animate={
          animationsStarted
            ? { opacity: 1, rotate: 90 }
            : { opacity: 0, rotate: 0 }
        }
        transition={{
          type: "tween",
          duration: 2,
          ease: "easeInOut",
        }}
        style={
          isInitialAnimationComplete
            ? {
                // ถ้า animation จบแล้ว: ให้ scroll ควบคุม
                rotate: circle2_rotate,
                opacity,
                willChange: "transform, opacity",
              }
            : { willChange: "transform, opacity" }
        }
      >
        <motion.div
          className="relative w-[380px] h-auto cursor-pointer"
          style={{ y: -180 }}
          onHoverStart={() => setIsCircle2Hovered(true)}
          onHoverEnd={() => setIsCircle2Hovered(false)}
        >
          <motion.img
            src="/assets/Scene/Hero/skill-circle.svg"
            className="w-full h-auto cursor-pointer"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              animationsStarted
                ? {
                    opacity: 1,
                    scale: isCircle2Hovered ? 1.1 : 1,
                  }
                : { opacity: 0, scale: 0.5 }
            }
            transition={{
              opacity: {
                type: "tween",
                duration: 2,
                ease: "easeInOut",
              },
              scale: {
                type: "spring",
                stiffness: 50,
                damping: 25,
              },
            }}
          />
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2
                 flex flex-col items-center gap-3 -rotate-90"
            initial="hidden"
            animate={isCircle2Hovered ? "visible" : "hidden"}
            variants={tooltipVariants}
          >
            <img src="/assets/Icon/skill.svg" className="h-15" />
            <p className="typo-h6 text-white">สิ่งที่ถนัด</p>
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Circle-Paid */}
      <motion.div
        className="absolute z-4 scale-40 sm:scale-50 md:scale-80 lg:scale-100"
        initial={{ opacity: 0, rotate: 90, y: 320 }}
        animate={
          animationsStarted
            ? { opacity: 1, rotate: 0 }
            : { opacity: 0, rotate: 90 }
        }
        transition={{
          type: "tween",
          duration: 2,
          ease: "easeInOut",
        }}
        style={
          isInitialAnimationComplete
            ? {
                // ถ้า animation จบแล้ว: ให้ scroll ควบคุม
                rotate: circle3_rotate,
                opacity,
                willChange: "transform, opacity",
              }
            : { willChange: "transform, opacity" }
        }
      >
        <motion.div
          className="relative w-[380px] h-auto cursor-pointer"
          style={{ y: -180 }}
          onHoverStart={() => setIsCircle3Hovered(true)}
          onHoverEnd={() => setIsCircle3Hovered(false)}
        >
          <motion.img
            src="/assets/Scene/Hero/paid-circle.svg"
            className="w-full h-auto cursor-pointer"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              animationsStarted
                ? {
                    opacity: 1,
                    scale: isCircle3Hovered ? 1.1 : 1,
                  }
                : { opacity: 0, scale: 0.5 }
            }
            transition={{
              opacity: {
                type: "tween",
                duration: 2,
                ease: "easeInOut",
              },
              scale: {
                type: "spring",
                stiffness: 50,
                damping: 25,
              },
            }}
          />
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2
                 flex flex-col items-center gap-3"
            initial="hidden"
            animate={isCircle3Hovered ? "visible" : "hidden"}
            variants={tooltipVariants}
          >
            <img src="/assets/Icon/paid.svg" className="h-15" />
            <p className="typo-h6 text-white">สิ่งที่สร้างรายได้</p>
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Circle-World */}
      <motion.div
        className="absolute z-3 scale-40 sm:scale-50 md:scale-80 lg:scale-100"
        initial={{ opacity: 0, rotate: 0, x: 350 }}
        animate={
          animationsStarted
            ? { opacity: 1, rotate: -90 }
            : { opacity: 0, rotate: 0 }
        }
        transition={{
          type: "tween",
          duration: 2,
          ease: "easeInOut",
        }}
        style={
          isInitialAnimationComplete
            ? {
                // ถ้า animation จบแล้ว: ให้ scroll ควบคุม
                rotate: circle4_rotate,
                opacity,
                willChange: "transform, opacity",
              }
            : { willChange: "transform, opacity" }
        }
      >
        <motion.div
          className="relative w-[380px] h-auto cursor-pointer"
          style={{ y: -180 }}
          onHoverStart={() => setIsCircle4Hovered(true)}
          onHoverEnd={() => setIsCircle4Hovered(false)}
        >
          <motion.img
            src="/assets/Scene/Hero/world-circle.svg"
            className="w-full h-auto cursor-pointer"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              animationsStarted
                ? {
                    opacity: 1,
                    scale: isCircle4Hovered ? 1.1 : 1,
                  }
                : { opacity: 0, scale: 0.5 }
            }
            transition={{
              opacity: {
                type: "tween",
                duration: 2,
                ease: "easeInOut",
              },
              scale: {
                type: "spring",
                stiffness: 50,
                damping: 25,
              },
            }}
          />
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2
                 flex flex-col items-center gap-3 rotate-90"
            initial="hidden"
            animate={isCircle4Hovered ? "visible" : "hidden"}
            variants={tooltipVariants}
          >
            <img src="/assets/Icon/world.svg" className="h-15" />
            <p className="typo-h6 text-white">สิ่งที่โลกต้องการ</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Mountain */}
      <motion.img
        initial={{ opacity: 0 }}
        animate={animationsStarted ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
        src="/assets/Scene/Hero/hill-l-f.svg"
        alt="hill-l-f"
        className="absolute bottom-0 w-full z-2 object-bottom object-cover"
        style={{ y: backgroundY }}
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={animationsStarted ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        src="/assets/Scene/Hero/hill-r-f.svg"
        alt="hill-r-f"
        className="absolute bottom-0 w-full z-2 object-bottom object-cover"
        style={{ y: backgroundY }}
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={animationsStarted ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 2.5 }}
        src="/assets/Scene/Hero/hill-c-f.svg"
        alt="hill-c-f"
        className="absolute bottom-0 z-1 w-full object-bottom object-cover"
        style={{ y: backgroundY }}
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={animationsStarted ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 1.5 }}
        src="/assets/Scene/Hero/hill-c-b.svg"
        alt="hill-c-b"
        className="absolute bottom-0 z-0 w-full object-bottom object-cover"
        style={{ y: backgroundY }}
      />
    </div>
  );
}
