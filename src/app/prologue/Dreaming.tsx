"use client";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useMemo, useCallback, useEffect } from "react";
import LazyLottie from "../components/ui/LazyLottie";
import WordByWordAnimation from "../components/ui/WordByWordAnimation";
import { useIsPortrait } from "@/app/hooks/useOrientation";
import { useBgMusicTransition } from "@/app/hooks/useBgMusicTransition";
import { useAudio } from "@/app/contexts/AudioContext";
import { useAnimationReady } from "@/app/hooks/useAnimationReady";
// Use string paths with LazyLottie to avoid bundling JSON into the client bundle
// Prefer .lottie files when available for better packaging (dotLottie)
const SKY_SRC = "/assets/Scene/Intro/sky.lottie";
const CAMEL_SRC = "/assets/Scene/Intro/camel.lottie";
const SUN_SRC = "/assets/Scene/Intro/sun.lottie";

export default function Dreaming() {
  const ref = useRef<HTMLDivElement>(null);
  const isPortrait = useIsPortrait();
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  // ให้ส่วนนี้รอการ interact ครั้งแรกจากผู้ใช้เพื่อเปิดเสียง (ถ้ายังไม่ได้ consent)
  const { startAudio, userConsented } = useAudio();

  // ถ้า section เข้ามาใน viewport แต่ผู้ใช้ยังไม่ได้ให้ consent, ให้รอฟัง gesture ครั้งแรก
  // แล้วเรียก startAudio เพื่อเปิดระบบเสียง (และทำให้ useBgMusicTransition ทำงาน)
  useEffect(() => {
    if (!isInView || userConsented) return;

    const onUserGesture = () => {
      try {
        startAudio();
      } catch (e) {
        console.error("startAudio after gesture failed", e);
      }
      window.removeEventListener("pointerdown", onUserGesture);
      window.removeEventListener("touchstart", onUserGesture);
    };

    window.addEventListener("pointerdown", onUserGesture, { once: true, passive: true } as any);
    window.addEventListener("touchstart", onUserGesture, { once: true, passive: true } as any);

    return () => {
      window.removeEventListener("pointerdown", onUserGesture);
      window.removeEventListener("touchstart", onUserGesture);
    };
  }, [isInView, userConsented, startAudio]);

  // จัดการ bg music transition แบบ fade in/out
  useBgMusicTransition({
    targetMusic: "/assets/Sound/3-4/egypt-jelly-dance.mp3",
    defaultMusic: "/assets/Sound/bg-music.mp3",
    fadeDuration: 1000,
    isInView,
    continueOnExit: true, // ให้เพลงเล่นต่อไปยัง Weighing
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Fade in ตอนเริ่ม section เพื่อเชื่อมจาก Sleeping.tsx
  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.95, 1],
    [0, 1, 1, 0]
  );

  // 1/4: desert3 + sky โผล่ขึ้นมา
  const opacity_first_quarter = useTransform(
    scrollYProgress,
    [0.1, 0.25],
    [0, 1]
  );
  const y_first_quarter = useTransform(scrollYProgress, [0.1, 0.25], [100, 0]);

  // 2/4: desert2 โผล่ขึ้นมา
  const opacity_second_quarter = useTransform(
    scrollYProgress,
    [0.35, 0.5],
    [0, 1]
  );
  const y_second_quarter = useTransform(scrollYProgress, [0.35, 0.5], [100, 0]);

  // 3/4: desert1 โผล่ขึ้นมา
  const opacity_third_quarter = useTransform(
    scrollYProgress,
    [0.6, 0.75],
    [0, 1]
  );
  const y_third_quarter = useTransform(scrollYProgress, [0.6, 0.75], [100, 0]);

  // 4/4: animal เลื่อนจากขวาไปซ้าย
  const animal_right = useTransform(
    scrollYProgress,
    [0.3, 1],
    ["-50%", isPortrait ? "30%" : "8%"]
  );

  // Sun: เคลื่อนที่ตลอดการ scroll
  const sun_bottom = useTransform(
    scrollYProgress,
    [0, 1],
    ["70%", isPortrait ? "25%" : "30%"]
  );
  const sun_left = useTransform(scrollYProgress, [0, 1], ["0%", "85%"]);
  const sun_scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const textAnimationProgress = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  // Memoize the displayed text so it isn't recreated each render
  const text = useMemo(
    () =>
      `ตำนานอียิปต์เชื่อว่า เมื่อตายไปแล้วจะต้องเดินทางไปยัง 'ดินแดนแห่งการพิพากษา'
                ภายในห้องโถงแห่งสัจจะ หัวใจจะถูกนำไปชั่งเทียบกับขนนก
หากหัวใจเบากว่าขนนกก็จะเข้าถึงชีวิตหลังความตายเดินทางสู่ทุ่งแห่งความสุข
แต่ถ้าหากจิตใจหนักแน่นมักถูกกลืนกินด้วยบางสิ่ง…`,
    []
  );

  // Scene items list (order matters — first item is bottom-most)
  const SCENE_ITEMS = useMemo(
    () => [
      {
        id: "desert1",
        src: "/assets/Scene/Intro/desert1.webp",
        alt: "desert1",
        style: { bottom: "0%", left: "0%", width: "100%" },
        animGroup: 3,
        
      },
      {
        id: "desert2",
        src: "/assets/Scene/Intro/desert2.webp",
        alt: "desert2",
        style: { bottom: "23.15%", left: "-13.02%", width: "67.19%" },
        animGroup: 2,
      },
      {
        id: "desert3",
        src: "/assets/Scene/Intro/desert3.webp",
        alt: "desert3",
        style: { bottom: "0%", left: "0%", width: "100%" },
        animGroup: 1,
      },
    ],
    []
  );

  // Map motion values into an animations map for SceneLayer-like usage
  const animations = useMemo(
    () => ({
      1: { y: y_first_quarter, opacity: opacity_first_quarter },
      2: { y: y_second_quarter, opacity: opacity_second_quarter },
      3: { y: y_third_quarter, opacity: opacity_third_quarter },
    }),
    [
      y_first_quarter,
      y_second_quarter,
      y_third_quarter,
      opacity_first_quarter,
      opacity_second_quarter,
      opacity_third_quarter,
    ]
  );

  const getItemStyle = useCallback(
    (item: any) => ({
      ...item.style,
      willChange: "transform, opacity",
    }),
    []
  );

  return (
    <motion.div
      ref={ref}
      className="relative w-screen h-[600vh]"
      style={{ opacity: bgOpacity }}
    >
      {/* Sticky Container */}
      <div
        className="sticky top-0 w-screen h-screen overflow-hidden flex items-center justify-center"
        style={{ willChange: "transform, opacity" }}
      >
        {/* Background */}
        <img
          src="/assets/Scene/Intro/bg.webp"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* ส่วนบน: เมฆ (top-0) */}
        <motion.div
          className="absolute top-0 left-1/30 w-full portrait:w-[250%] portrait:-left-1/6 portrait:top-1/10"
          style={{ opacity: opacity_first_quarter }}
        >
          <LazyLottie
            src={SKY_SRC}
            loop={true}
            scrollYProgress={opacity_first_quarter}
            className="w-full object-cover aspect-1930/308"
          />
        </motion.div>

        {/* Sun: เคลื่อนที่ตาม animation */}
        <motion.div
          className="absolute bottom-0 left-0 w-[20%] portrait:w-[30%]"
          style={{
            opacity: 1,
            bottom: sun_bottom,
            left: sun_left,
            scale: sun_scale,
            willChange: "transform, opacity",
          }}
        >
          <LazyLottie
            src={SUN_SRC}
            loop={true}
            scrollYProgress={scrollYProgress}
            className="h-[370px]"
          />
        </motion.div>

        {/* ส่วนล่าง: desert และ animal (bottom-0) */}
        <motion.div className="absolute bottom-0 aspect-video w-full portrait:w-[200%]">
          {SCENE_ITEMS.map((item) => {
            const anim =
              animations[item.animGroup as keyof typeof animations] || {};
            return (
              <motion.img
                key={item.id}
                src={item.src}
                alt={item.alt}
                className="absolute"
                style={{
                  ...(getItemStyle(item) as any),
                  opacity: anim.opacity ?? 1,
                  y: anim.y,
                }}
              />
            );
          })}

          {/* animal */}
          <motion.div
            className="absolute w-[29.17%] bottom-1/15 portrait:bottom-1/30"
            style={{ right: animal_right, willChange: "transform" }}
          >
            <LazyLottie
              src={CAMEL_SRC}
              loop={true}
              scrollYProgress={opacity_third_quarter}
              className="w-full h-full"
            />
          </motion.div>
        </motion.div>

        {/* Light overlay */}
        <div
          className="absolute w-screen inset-0 pointer-events-none"
          style={{ backgroundColor: "var(--color-black)", opacity: 0.1 }}
        />

        {/* Text กลางจอ */}
        <div className="absolute inset-0 flex items-center justify-center  text-center px-4">
          <motion.div style={{ opacity: opacity_first_quarter }}>
            <WordByWordAnimation
              text={text}
              scrollYProgress={textAnimationProgress}
              as="p"
              className="typo-text-h4 text-white w-80 md:w-140 xl:w-full"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
