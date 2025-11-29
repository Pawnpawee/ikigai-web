"use client";
import {
  motion,
  useScroll,
  useTransform,
  useTime,
  useInView,
} from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { useIsPortrait } from "@/app/hooks/useOrientation";
import SubtitleScroll from "@/app/components/ui/SubtitleScroll";
import { VideoAnimation } from "@/app/components/ui/VideoAnimation";
import LazyLottie from "@/app/components/ui/LazyLottie";
import { useSoundEffect } from "@/app/hooks/useSoundEffect";
import { useAudio } from "@/app/contexts/AudioContext";
import SceneLayer from "@/app/components/scene/SceneLayer";
import { SCENE_WEIGHING_ITEMS } from "@/app/data/scene_weighing.data";
import StarryBackground from "../components/ui/StarryBackground";

export default function Weighing() {
  const ref = useRef<HTMLDivElement>(null);
  const isPortrait = useIsPortrait();
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const hasPlayedScalesRef = useRef(false);
  const hasPlayedMetalRef = useRef(false);
  const hasPlayedBlackHoleRef = useRef(false);
  const hasPlayedFallingRef = useRef(false);
  const hasPausedBgMusicRef = useRef(false);
  const { animationsStarted, pauseBgMusic, resumeBgMusic } = useAudio();

  const { playSoundEffect: playScales } = useSoundEffect({
    soundPath: "/assets/Sound/3-4/weighing.mp3",
    fadeDurationMs: 500,
    soundDurationMs: 1500, // weighing sound duration
    loop: false,
  });

  const { playSoundEffect: playMetal, stopSoundEffect: stopMetal } =
    useSoundEffect({
      soundPath: "/assets/Sound/3-4/metal-slide.mp3",
      fadeDurationMs: 300, // smooth fade out
      loop: true, // loop while rotation is active
    });

  const { playSoundEffect: playBlackHole, stopSoundEffect: stopBlackHole } =
    useSoundEffect({
      soundPath: "/assets/Sound/black-hole.mp3",
      fadeDurationMs: 1000,
      loop: true,
    });

  const { playSoundEffect: playFalling } = useSoundEffect({
    soundPath: "/assets/Sound/falling.mp3",
    fadeDurationMs: 500,
    soundDurationMs: 3000,
    loop: false,
    volume: 100, // เพิ่มความดังเสียง
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // เช็คว่า Animation พร้อมและอยู่ใน View หรือไม่
      if (!animationsStarted || !isInView) return;

      // -----------------------------------------------------
      // 🔊 1. Play Metal (เสียงเหล็กขูด)
      // เงื่อนไข: เล่นขณะที่ scaleRotate กำลังเปลี่ยนค่า
      // อิงจาก range Animation: heartRotate_slow (0.55) -> heartRotate_fast (0.72)
      // -----------------------------------------------------
      if (latest > 0.55 && latest < 0.72) {
        if (!hasPlayedMetalRef.current) {
          playMetal();
          hasPlayedMetalRef.current = true;
        }
      } else {
        // หยุดเสียงเมื่อหลุดช่วง Animation (จบแล้ว หรือ ถอยกลับ)
        if (hasPlayedMetalRef.current) {
          stopMetal();
          hasPlayedMetalRef.current = false;
        }
      }

      // -----------------------------------------------------
      // 🔊 2. Play Scales (เสียงกระแทกตุ้บ!)
      // เงื่อนไข: เล่นครั้งเดียวเมื่อ heartPlateY ลงมาสุด (ที่ 0.72)
      // -----------------------------------------------------
      if (latest >= 0.72) {
        if (!hasPlayedScalesRef.current) {
          playScales();
          hasPlayedScalesRef.current = true;
        }
      }

      // Reset Logic: ถ้า user สกรอลล์ย้อนกลับขึ้นไป (เผื่อระยะ buffer นิดหน่อย เช่น < 0.70)
      if (latest < 0.7) {
        hasPlayedScalesRef.current = false;
      }

      // -----------------------------------------------------
      // 🔊 3. Video Section Audio Management
      // -----------------------------------------------------
      // 0.72-0.75: Fade out egypt music (once)
      if (latest >= 0.72 && latest < 0.75) {
        if (!hasPausedBgMusicRef.current) {
          pauseBgMusic(); // Fade out bg music
          hasPausedBgMusicRef.current = true;
        }
      }

      // 0.75-0.98: Play black-hole sound effect
      if (latest >= 0.75 && latest < 0.98) {
        if (!hasPlayedBlackHoleRef.current) {
          playBlackHole();
          hasPlayedBlackHoleRef.current = true;
        }
      } else if (latest < 0.75) {
        // Stop black-hole when scrolling back before 0.75
        if (hasPlayedBlackHoleRef.current) {
          stopBlackHole();
          hasPlayedBlackHoleRef.current = false;
        }
      }

      // 0.98-1.0: Stop black-hole and play falling sound (once at 0.98)
      if (latest >= 0.98) {
        // Stop black-hole at 0.98
        if (hasPlayedBlackHoleRef.current) {
          stopBlackHole();
          hasPlayedBlackHoleRef.current = false;
        }
        // Play falling once
        if (!hasPlayedFallingRef.current) {
          playFalling();
          hasPlayedFallingRef.current = true;
        }
      }

      // Reset logic for video section when scrolling back
      if (latest < 0.72) {
        // Resume Egypt music when scrolling back
        if (hasPausedBgMusicRef.current) {
          resumeBgMusic();
          hasPausedBgMusicRef.current = false;
        }
        hasPlayedBlackHoleRef.current = false;
        hasPlayedFallingRef.current = false;
      }

      // Reset falling when scrolling back from end
      if (latest < 0.98) {
        hasPlayedFallingRef.current = false;
      }
    });

    return () => {
      unsubscribe();
      stopMetal(); // Cleanup เสียงเมื่อ Unmount
      stopBlackHole();
    };
  }, [
    scrollYProgress,
    playMetal,
    stopMetal,
    playScales,
    playBlackHole,
    stopBlackHole,
    playFalling,
    animationsStarted,
    isInView,
    pauseBgMusic,
    resumeBgMusic,
  ]);

  // Main opacity for entire section
  const mainOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.98, 1],
    [0, 1, 1, 0]
  );

  const insideOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.75, 0.8],
    [0, 1, 1, 0]
  );

  const ry = useTransform(
    scrollYProgress,
    [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.28],
    [0, 0, 40, 0, 50, 0, 200]
  );

  const blink_opacity = useTransform(
    scrollYProgress,
    [0, 0.2333, 0.3733],
    [1, 1, 0]
  );

  // POV falling effect - extended to use additional 50vh (600-750vh = 0.6-0.75)
  const pov_y = useTransform(scrollYProgress, [0, 0.72, 0.75], [0, 0, -300]);

  // Set 2: sky, wall (50-100vh = 0.0667-0.1333)
  const opacity_set2 = useTransform(scrollYProgress, [0.0667, 0.1333], [0, 1]);
  const y_set2 = useTransform(scrollYProgress, [0.0667, 0.1333], [100, 0]);
  // Helper function: ถ้าค่า opacity > 0.01 ให้แสดง (block) ถ้าไม่ ให้ซ่อน (none)
  const getDisplay = (v: number) => (v > 0.01 ? "block" : "none");
  const display_set2 = useTransform(opacity_set2, getDisplay);

  // Set 4: stairs (150-200vh = 0.2-0.2667)
  const opacity_set4 = useTransform(scrollYProgress, [0.2, 0.2667], [0, 1]);
  const y_set4 = useTransform(scrollYProgress, [0.2, 0.2667], [100, 0]);
  const display_set4 = useTransform(opacity_set4, getDisplay);

  // Set 5: cat right, cat left (200-250vh = 0.2667-0.3333)
  const opacity_set5 = useTransform(scrollYProgress, [0.2667, 0.3333], [0, 1]);
  const y_set5 = useTransform(scrollYProgress, [0.2667, 0.3333], [100, 0]);
  const display_set5 = useTransform(opacity_set5, getDisplay);

  // Set 6: heart plate, heart scale, feather plate, feather scale, light, scale (250-300vh = 0.3333-0.4)
  const opacity_set6 = useTransform(scrollYProgress, [0.3333, 0.4], [0, 1]);
  const y_set6 = useTransform(scrollYProgress, [0.3333, 0.4], [100, 0]);

  // Light flickering effect - only after opacity_set6 is full
  const time = useTime();
  const lightFlicker = useTransform(time, (t) => {
    // Create irregular flicker pattern using multiple sine waves
    const flicker1 = Math.sin(t / 200) * 0.15;
    const flicker2 = Math.sin(t / 150) * 0.1;
    const flicker3 = Math.sin(t / 300) * 0.2;
    return 0.85 + flicker1 + flicker2 + flicker3; // Range: ~0.4 to 1.3
  });
  const lightOpacity = useTransform(
    [opacity_set6, lightFlicker],
    ([baseOpacity, flicker]) => (baseOpacity as number) * (flicker as number)
  );

  // Set 7: heart (300-350vh = 0.4-0.4667)
  const opacity_set7 = useTransform(scrollYProgress, [0.4, 0.4667], [0, 1]);
  const y_set7 = useTransform(scrollYProgress, [0.4, 0.4667], [50, 0]);

  // Set 8: feather (350-400vh = 0.4667-0.5333)
  const opacity_set8 = useTransform(scrollYProgress, [0.4667, 0.5333], [0, 1]);
  const y_set8 = useTransform(scrollYProgress, [0.4667, 0.5333], [50, 0]);

  // ============ ZOOM (400-500vh = 0.5333-0.6667) ============
  const containerScale = useTransform(
    scrollYProgress,
    [0.5, 0.7],
    isPortrait ? [2.3, 4] : [1, 2]
  );
  const containerTop = useTransform(
    scrollYProgress,
    [0.5, 0.7],
    isPortrait ? ["-1%", "-3%"] : ["0%", "-7%"]
  );

  // Derive z_move from the existing containerScale so the visual zoom
  // matches the previous `scale` mapping exactly.
  const z_move = useTransform(containerScale, (s) => {
    const scale = Number(s) || 1;
    // avoid division by zero and clamp small scales
    if (scale === 0) return 0;
    return 1000 * (1 - 1 / scale);
  });

  // ============ SLOW MOVEMENT (500-580vh = 0.6667-0.7733) ============
  // Heart side: slowly rotate down
  const heartRotate_slow = useTransform(scrollYProgress, [0.55, 0.62], [0, -5]);
  // Heart plate: slowly down (Y movement)
  const heartPlateY_slow = useTransform(
    scrollYProgress,
    [0.55, 0.62],
    isPortrait ? [0, 5] : [0, 15]
  );

  // Feather plate: slowly up (Y movement)
  const featherPlateY_slow = useTransform(
    scrollYProgress,
    [0.55, 0.62],
    isPortrait ? [0, -5] : [0, -15]
  );

  // ============ FAST DROP (580-600vh = 0.7733-0.8) ============
  // Heart: fast rotate down with easeIn
  const heartRotate_fast = useTransform(
    scrollYProgress,
    [0.62, 0.72],
    [0, -15]
  );
  // Heart plate: fast drop (Y movement)
  const heartPlateY_fast = useTransform(
    scrollYProgress,
    [0.62, 0.72],
    isPortrait ? [0, 8] : [0, 30]
  );
  // Feather plate: slight rise (Y movement)
  const featherPlateY_fast = useTransform(
    scrollYProgress,
    [0.62, 0.72],
    isPortrait ? [0, -3] : [0, -10]
  );

  // Combined positions
  const scaleRotate = useTransform(
    () => heartRotate_slow.get() + heartRotate_fast.get()
  );
  const heartPlateY = useTransform(
    () => heartPlateY_slow.get() + heartPlateY_fast.get()
  );
  const featherPlateY = useTransform(
    () => featherPlateY_slow.get() + featherPlateY_fast.get()
  );

  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.75, 0.8],
    [0, 1, 1, 0]
  );

  const textAnimationProgress = useTransform(
    scrollYProgress,
    [0, 0.3, 0.8],
    [0, 0, 1]
  );

  // ============ VIDEO SECTION (750-1000vh = 0.75-1.0) ============
  const videoOpacity = useTransform(
    scrollYProgress,
    [0.72, 0.75, 0.98, 1],
    [0, 1, 1, 0]
  );
  const videoDisplay = useTransform(videoOpacity, (v) =>
    v > 0.01 ? "flex" : "none"
  );

  return (
    <motion.div
      ref={ref}
      className="relative h-[1000vh]"
      style={{ opacity: mainOpacity }}
    >
      {/* Background */}
      <div className="absolute w-screen inset-0" />
      <div
        className="fixed inset-0 w-screen h-screen pointer-events-none "
        style={{
          perspective: "1000px", // กำหนดความลึกที่ตัวพ่อ
          // ถ้าอยากให้จุด Center อยู่กลางจอเป๊ะๆ
          perspectiveOrigin: "50% 50%",
          zIndex: 0,
        }}
      >
        {/* fixed Container with aspect-video layout */}
        <motion.div
          className="fixed
          w-full h-full flex items-center justify-center bg-s4"
          // suppress hydration warnings for this animated container because
          // inline styles are driven by MotionValues that differ between
          // server render and client hydration.
          suppressHydrationWarning
          style={{
            // replace scale with 3D perspective + translateZ (z)
            top: containerTop,
            y: pov_y,
            z: z_move,
            // rendering hints
            willChange: "transform",
            backfaceVisibility: "hidden",
            opacity: insideOpacity,
          }}
        >
          <div className="relative aspect-video w-full ">
            <motion.div className="absolute inset-0 w-full h-full">
              <SceneLayer
                items={SCENE_WEIGHING_ITEMS}
                animations={{
                  2: { y: y_set2, opacity: opacity_set2 },
                  4: { y: y_set2, opacity: opacity_set2 },
                  // Scale with rotate
                  69: { y: y_set6, opacity: opacity_set6, rotate: scaleRotate },
                  // Group 6: main plates/scale intro
                  6: { y: y_set6, opacity: opacity_set6 },
                  // Heart and feather appear in their own groups
                  7: {
                    y: useTransform(() => y_set7.get() + heartPlateY.get()),
                    opacity: opacity_set7,
                  },
                  8: {
                    y: useTransform(() => y_set8.get() + featherPlateY.get()),
                    opacity: opacity_set8,
                  },
                  // Per-item combined transforms for plates
                  66: {
                    y: useTransform(() => y_set6.get() + heartPlateY.get()),
                    opacity: opacity_set6,
                  },
                  67: {
                    y: useTransform(() => y_set6.get() + featherPlateY.get()),
                    opacity: opacity_set6,
                  },
                  // Light needs flicker opacity
                  68: { y: y_set6, opacity: lightOpacity },
                }}
                baseStyle={{ willChange: "transform, opacity" }}
                containerAspectRatio="16 / 9"
              >
                {/* Sky (Lottie) - full background */}
                <motion.div
                  className="absolute inset-0 w-full h-full -z-1"
                  style={{
                    opacity: opacity_set2,
                    y: y_set2,
                    display: display_set2,
                  }}
                >
                  <LazyLottie
                    src="/assets/Scene/Scene4/s4-sky.lottie"
                    // loop
                    // scrollYProgress={opacity_set2}
                    className="w-full h-full"
                  />
                </motion.div>

                {/* Tree */}
                <motion.div
                  className="absolute bottom-0 right-[8%] w-[20%] h-[54.87%] scale-x-[-1] -z-1"
                  style={{
                    opacity: opacity_set4,
                    y: y_set4,
                    display: display_set4,
                  }}
                >
                  <LazyLottie
                    src="/assets/Scene/Scene4/s4-tree.lottie"
                    scrollYProgress={opacity_set4}
                    loop
                    className="w-full h-full"
                  />
                </motion.div>
                <motion.div
                  className="absolute bottom-0 left-[7.5%] w-[20%] h-[54.87%] -z-1"
                  style={{
                    opacity: opacity_set4,
                    y: y_set4,
                    display: display_set4,
                  }}
                >
                  <LazyLottie
                    src="/assets/Scene/Scene4/s4-tree.lottie"
                    scrollYProgress={opacity_set4}
                    loop
                    className="w-full h-full"
                  />
                </motion.div>

                {/* Set 4: Building (Lottie) */}
                <motion.div
                  className="absolute top-[11.3%] left-[27.9%] w-[44.3%] h-[66.48%] -z-1"
                  style={{
                    opacity: opacity_set4,
                    y: y_set4,
                  }}
                >
                  <LazyLottie
                    src="/assets/Scene/Scene4/s4-building.lottie"
                    loop
                    scrollYProgress={opacity_set4}
                    className="w-full h-full"
                  />
                </motion.div>

                {/* Cat */}
                <motion.div
                  className="absolute bottom-[-4.2%] right-[28.1%] w-[7.17%] h-[22.77%] scale-x-[-1]"
                  style={{
                    opacity: opacity_set5,
                    y: y_set5,
                    display: display_set5,
                  }}
                >
                  <LazyLottie
                    src="/assets/Scene/Scene4/s4-cat.lottie"
                    scrollYProgress={opacity_set5}
                    loop
                    className="w-full h-full"
                  />
                </motion.div>
                <motion.div
                  className="absolute bottom-[-4.3%] left-[28%] w-[7.17%] h-[22.77%] "
                  style={{
                    opacity: opacity_set5,
                    y: y_set5,
                    display: display_set5,
                  }}
                >
                  <LazyLottie
                    src="/assets/Scene/Scene4/s4-cat.lottie"
                    scrollYProgress={opacity_set5}
                    loop
                    className="w-full h-full"
                  />
                </motion.div>
              </SceneLayer>
            </motion.div>
          </div>
        </motion.div>

        {/* Video Section (750-1000vh) */}
        <motion.div
          className="fixed inset-0 w-screen h-screen flex items-center justify-center pointer-events-none"
          style={{
            opacity: videoOpacity,
            display: videoDisplay,
            background:
              "linear-gradient(180deg, #101518 1.07%, #0C1B1F 77.07%, #0B1E23 99.78%)",
            willChange: "opacity",
            z: isPortrait ? 500 : 0,
          }}
        >
          <VideoAnimation
            webmSrc="/assets/Scene/Scene4/falling.webm"
            movSrc="/assets/Scene/Scene4/falling.mov"
            className="mix-blend-screen"
          />
          <StarryBackground />
        </motion.div>
      </div>

      {/* ชุด 10: Subtitles */}
      <motion.div
        className="fixed bottom-[15%] left-0 right-0"
        style={{ opacity: textOpacity }}
      >
        <SubtitleScroll
          subtitles={[
            "เจ้าหนักหนาด้วยความกังวล หัวใจเจ้ายังต้องการการปลดปล่อยก่อนจะไปยังทุ่งแห่งความสุข",
            "ข้าไม่ได้มาพิพากษาด้วยความโหดร้าย หากแต่ขอเชิญให้เจ้าล่องลอยไปยังห้วงเงานั้น",
            "เพื่อค้นหาเหตุแห่งทุกข์",
            "เมื่อเจ้าพบทาง ประตูแห่งแสงจะเปิดให้เจ้าเอง",
            "ดะ เดี๋ยวก่อน! ไม่นะ..",
          ]}
          scrollYProgress={textAnimationProgress}
          className="w-full h-full"
        />
      </motion.div>

      {/* Eye opening animation POV - black background with ellipse mask */}
      {/* <motion.div
        className="fixed inset-0 bg-black pointer-events-none z-10 w-screen h-screen"
        style={{
          maskImage: useTransform(
            ry,
            (value) =>
              `radial-gradient(ellipse 50% ${value}% at 50% 50%, transparent 0%, black 100%)`
          ),
          WebkitMaskImage: useTransform(
            ry,
            (value) =>
              `radial-gradient(ellipse 50% ${value}% at 50% 50%, transparent 0%, black 100%)`
          ),
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          opacity: blink_opacity,
        }}
      /> */}

      {/* Light overlay */}
      <div
        className="absolute w-screen inset-0 mix-blend-soft-light pointer-events-none"
        style={{ backgroundColor: "var(--color-overlay)", opacity: 0.5 }}
      />
    </motion.div>
  );
}
