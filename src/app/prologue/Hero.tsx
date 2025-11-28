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
  useSpring,
  useWillChange,
} from "framer-motion";
import LazyLottie from "@/app/components/ui/LazyLottie";
import { useAudio } from "@/app/contexts/AudioContext";
import { useSoundEffect } from "@/app/hooks/useSoundEffect";
import { useAssetLoader } from "@/app/contexts/AssetLoaderContext";
import { useAnimationReady } from "@/app/hooks/useAnimationReady";
import { useLottieWithSound } from "@/app/hooks/useLottieWithSound";
import IkigaiCircle from "./IkigaiCircle";
import SceneLayer from "@/app/components/scene/SceneLayer";
import { SCENE_HERO_ITEMS } from "@/app/data/scene_hero.data";
import StarryBackground from "../components/ui/StarryBackground";

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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // ⭐ แก้ไข 1: ใช้ useSpring เพื่อลดอาการสั่น (Smooth ค่า input)
  // mass/stiffness/damping นี้คือสูตรนุ่มนวลที่นิยมใช้กับ Parallax
  const smoothScroll = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  // ⭐ แก้ไข 2: ใช้ willChange บอก Browser ให้เตรียม GPU รอไว้
  const willChange = useWillChange();

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [1, 0], [0, 1]);

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

  const circle1_rotate = useTransform(scrollYProgress, [0, 1], [-180, 0]);
  const circle2_rotate = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const circle3_rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const circle4_rotate = useTransform(scrollYProgress, [0, 1], [-90, 0]);

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

  // Memoize mountain transitions
  const mountainTransitions = useMemo(
    () => ({
      mountain1: { duration: 1.5, delay: 1.5 },
      mountain2: { duration: 1.5, delay: 2.5 },
      mountain3: { duration: 1.5, delay: 0.5 },
      mountain4: { duration: 1.5 },
    }),
    []
  );

  // Memoize text split
  const textChars = useMemo(() => textContent.split(""), [textContent]);

  // Use reusable animation ready hook
  const shouldAnimate = useAnimationReady();

  // Memoize circle animation configs
  const circleAnimations = useMemo(
    () => ({
      circle1: {
        initial: { opacity: 0, rotate: 0, y: -320 },
        animate: shouldAnimate
          ? { opacity: 1, rotate: -180 }
          : { opacity: 0, rotate: 0 },
      },
      circle2: {
        initial: { opacity: 0, rotate: 0, x: -350 },
        animate: shouldAnimate
          ? { opacity: 1, rotate: 90 }
          : { opacity: 0, rotate: 0 },
      },
      circle3: {
        initial: { opacity: 0, rotate: 90, y: 320 },
        animate: shouldAnimate
          ? { opacity: 1, rotate: 0 }
          : { opacity: 0, rotate: 90 },
      },
      circle4: {
        initial: { opacity: 0, rotate: 0, x: 350 },
        animate: shouldAnimate
          ? { opacity: 1, rotate: -90 }
          : { opacity: 0, rotate: 0 },
      },
      transition: {
        type: "tween" as const,
        duration: 2,
        ease: "easeInOut" as const,
        delay: 2.0,
      },
      circleImgTransition: {
        type: "tween" as const,
        duration: 2,
        ease: "easeInOut" as const,
        delay: 2.0,
      },
    }),
    [shouldAnimate]
  );

  return (
    <motion.div
      ref={ref}
      className="w-full h-screen overflow-hidden flex flex-col items-center justify-center relative black-linear "
      style={{ opacity }}
    >
      {/* Mountain - rendered via SceneLayer so order/data-driven */}
      <motion.div
        className="absolute bottom-0 w-screen pointer-events-none"
        style={{ y: backgroundY, willChange, z: 0 }}
      >
        <SceneLayer
          items={SCENE_HERO_ITEMS}
          animations={{}}
          containerAspectRatio="1920 / 1080"
          itemOverrides={{
            "hill-c-b": {
              initial: { opacity: 0 },
              animate: shouldAnimate ? { opacity: 1 } : { opacity: 0 },
              transition: mountainTransitions.mountain1,
            },
            "hill-c-f": {
              initial: { opacity: 0 },
              animate: shouldAnimate ? { opacity: 1 } : { opacity: 0 },
              transition: mountainTransitions.mountain2,
            },
            "hill-r-f": {
              initial: { opacity: 0 },
              animate: shouldAnimate ? { opacity: 1 } : { opacity: 0 },
              transition: mountainTransitions.mountain3,
            },
            "hill-l-f": {
              initial: { opacity: 0 },
              animate: shouldAnimate ? { opacity: 1 } : { opacity: 0 },
              transition: mountainTransitions.mountain4,
            },
          }}
        />
      </motion.div>

      {/* Circle-World */}
      <IkigaiCircle
        className="scale-40 sm:scale-50 md:scale-80 lg:scale-100"
        imageSrc="/assets/Scene/Hero/world-circle.webp"
        iconSrc="/assets/Icon/world.svg"
        text="สิ่งที่โลกต้องการ"
        rotateValue={circle4_rotate}
        initialAnimation={circleAnimations.circle4}
        shouldAnimate={shouldAnimate}
        opacity={opacity}
        tooltipRotate={90}
        circleImgTransition={circleAnimations.circleImgTransition}
        transition={circleAnimations.transition}
      />

      {/* Circle-Paid */}
      <IkigaiCircle
        className="scale-40 sm:scale-50 md:scale-80 lg:scale-100"
        imageSrc="/assets/Scene/Hero/paid-circle.webp"
        iconSrc="/assets/Icon/paid.svg"
        text="สิ่งที่สร้างรายได้"
        rotateValue={circle3_rotate}
        initialAnimation={circleAnimations.circle3}
        shouldAnimate={shouldAnimate}
        opacity={opacity}
        tooltipRotate={0}
        circleImgTransition={circleAnimations.circleImgTransition}
        transition={circleAnimations.transition}
      />

      {/* Circle-Skill */}
      <IkigaiCircle
        className="scale-40 sm:scale-50 md:scale-80 lg:scale-100"
        imageSrc="/assets/Scene/Hero/skill-circle.webp"
        iconSrc="/assets/Icon/skill.svg"
        text="สิ่งที่ถนัด"
        rotateValue={circle2_rotate}
        initialAnimation={circleAnimations.circle2}
        shouldAnimate={shouldAnimate}
        opacity={opacity}
        tooltipRotate={-90}
        circleImgTransition={circleAnimations.circleImgTransition}
        transition={circleAnimations.transition}
      />

      {/* Circle-Love */}
      <IkigaiCircle
        className="scale-40 sm:scale-50 md:scale-80 lg:scale-100"
        imageSrc="/assets/Scene/Hero/love-circle.webp"
        iconSrc="/assets/Icon/love.svg"
        text="สิ่งที่รัก"
        rotateValue={circle1_rotate}
        initialAnimation={circleAnimations.circle1}
        shouldAnimate={shouldAnimate}
        opacity={opacity}
        tooltipRotate={180}
        circleImgTransition={circleAnimations.circleImgTransition}
        transition={circleAnimations.transition}
        yOffset={-200}
      />

      {/* Logo */}
      <motion.div
        className="relative flex flex-col items-center justify-center scale-40 sm:scale-50 md:scale-80 lg:scale-100"
        variants={containerVariants}
        initial="hidden"
        animate={isInView && animationsStarted ? "visible" : "hidden"}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView && shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 2, delay: 1.5 }}
        >
          <motion.div
            variants={lottieGlowVariants}
            animate={isLottieComplete ? "glowing" : "initial"}
          >
            <LazyLottie
              src="/assets/Icon/logo_ikigai_animate.lottie"
              className="h-[100px] aspect-770/200 mx-auto"
              loop={false}
              getRef={(ref) => {
                lottieRef.current = ref;
              }}
            />
          </motion.div>
        </motion.div>
        <h2 className="typo-h3-serif text-white whitespace-nowrap">
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
      <StarryBackground />
    </motion.div>
  );
}
