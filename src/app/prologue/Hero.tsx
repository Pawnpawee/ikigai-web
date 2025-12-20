import {
  m,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import LazyLottie from "@/app/components/reusable/LazyLottie";
import { useAudio } from "@/app/contexts/AudioContext";

import { SCENE_HERO_ITEMS } from "@/app/data/scene_hero.data";
import IkigaiCircle from "../components/reusable/IkigaiCircle";
import SceneLayer from "../components/reusable/SceneLayer";
import { useUI } from "../contexts/UIStarContext";

interface HeroProps {
  shouldAnimate: boolean;
}

export default function Hero({ shouldAnimate }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { playSfx } = useAudio();

  const [isLottieComplete, setIsLottieComplete] = useState(false);
  const [shouldPlayLottie, setShouldPlayLottie] = useState(false);

  const [isInteractionLocked, setIsInteractionLocked] = useState(true);

  const { setShowStars } = useUI();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const springConfig = { damping: 50, stiffness: 400 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // ภูเขาหลังสุด (ขยับน้อยมาก)
  const xBack = useTransform(smoothMouseX, [0, 1], [15, -15]);
  const yBack = useTransform(smoothMouseY, [0, 1], [10, -10]);

  // ภูเขากลาง (ขยับปานกลาง)
  const xMid = useTransform(smoothMouseX, [0, 1], [30, -30]);
  const yMid = useTransform(smoothMouseY, [0, 1], [15, -15]);

  // ภูเขาหน้าสุด (ขยับเยอะสุด ดูใกล้ตา)
  const xFront = useTransform(smoothMouseX, [0, 1], [45, -45]);
  const yFront = useTransform(smoothMouseY, [0, 1], [20, -20]);

  useEffect(() => {
    if (shouldAnimate) {
      setShowStars(true);
      const timer = setTimeout(() => {
        setShouldPlayLottie(true);
        playSfx("/assets/Sound/12/magical-sparkling.mp3");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [shouldAnimate, setShowStars, playSfx]);

  useEffect(() => {
    if (shouldAnimate) {
      const timer = setTimeout(() => {
        setIsInteractionLocked(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [shouldAnimate]);

  useEffect(() => {
    if (isInteractionLocked) {
      document.documentElement.style.setProperty(
        "overflow",
        "hidden",
        "important",
      );
      document.documentElement.style.setProperty(
        "height",
        "100vh",
        "important",
      );
      document.body.style.setProperty("overflow", "hidden", "important");
      document.body.style.setProperty("height", "100vh", "important");
    } else {
      // ล้าง CSS ออก
      document.documentElement.style.removeProperty("overflow");
      document.documentElement.style.removeProperty("height");
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("height");
    }

    // Cleanup function (สำคัญมาก เผื่อเปลี่ยนหน้า)
    return () => {
      document.documentElement.style.removeProperty("overflow");
      document.documentElement.style.removeProperty("height");
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("height");
    };
  }, [isInteractionLocked]);

  const handleLottieComplete = () => {
    setIsLottieComplete(true);
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

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
    [],
  );
  const charVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, x: -5 },
      visible: {
        opacity: 1,
        x: 0,
      },
    }),
    [],
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
    [],
  );

  // Memoize mountain transitions
  const mountainTransitions = useMemo(
    () => ({
      mountain1: { duration: 1.5, delay: 1.5 },
      mountain2: { duration: 1.5, delay: 2.5 },
      mountain3: { duration: 1.5, delay: 0.5 },
      mountain4: { duration: 1.5 },
    }),
    [],
  );

  // Memoize text split
  const textChars = useMemo(() => textContent.split(""), []);

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
      },
      circleImgTransition: {
        type: "tween" as const,
        duration: 2,
        ease: "easeInOut" as const,
      },
    }),
    [shouldAnimate],
  );

  return (
    <m.div
      ref={ref}
      className={`w-full h-screen overflow-hidden flex flex-col items-center justify-center relative black-linear ${
        isInteractionLocked ? "pointer-events-none" : "pointer-events-auto"
      }`}
      style={{ opacity }}
    >
      {/* Mountain - rendered via SceneLayer so order/data-driven */}
      <m.div
        className="absolute bottom-0 w-screen pointer-events-none"
        style={{ y: backgroundY, z: 0 }}
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
              style: { x: xMid, y: yMid },
            },
            "hill-c-f": {
              initial: { opacity: 0 },
              animate: shouldAnimate ? { opacity: 1 } : { opacity: 0 },
              transition: mountainTransitions.mountain2,
              style: { x: xFront, y: yFront },
            },
            "hill-r-f": {
              initial: { opacity: 0 },
              animate: shouldAnimate ? { opacity: 1 } : { opacity: 0 },
              transition: mountainTransitions.mountain3,
              style: { x: xFront, y: yFront },
            },
            "hill-l-f": {
              initial: { opacity: 0 },
              animate: shouldAnimate ? { opacity: 1 } : { opacity: 0 },
              transition: mountainTransitions.mountain4,
              style: { x: xBack, y: yBack },
            },
          }}
        />
      </m.div>

      {/* Circle-World */}
      <IkigaiCircle
        className="scale-50 md:scale-100"
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
        className="scale-50 md:scale-100"
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
        className="scale-50 md:scale-100"
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
        className="scale-50 md:scale-100"
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
      <m.div
        className="relative flex flex-col items-center justify-center scale-50 md:scale-100"
        variants={containerVariants}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        style={{ x: xBack, y: yBack }}
      >
        <m.div
          initial={{ opacity: 0 }}
          animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 2, delay: 1.5 }}
        >
          <m.div
            variants={lottieGlowVariants}
            animate={isLottieComplete ? "glowing" : "initial"}
          >
            <LazyLottie
              src="/assets/Scene/Hero/logo_ikigai_animate.json"
              className="h-[100px]"
              loop={false}
              play={shouldPlayLottie}
              onComplete={handleLottieComplete}
            />
          </m.div>
        </m.div>
        <h2 className="typo-h3-serif text-white whitespace-nowrap">
          {textChars.map((char, index) => (
            <m.span
              key={`char-${index}-${char}`}
              variants={charVariants}
              style={{ display: "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </m.span>
          ))}
        </h2>
      </m.div>
    </m.div>
  );
}
