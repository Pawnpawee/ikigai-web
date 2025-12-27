"use client";
import {
  m,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { Howl } from "howler";
import { useEffect, useMemo, useRef } from "react";
import EyelidOverlay from "@/app/components/reusable/EyeLidOverlay";
import LazyLottie from "@/app/components/reusable/LazyLottie";
import SceneLayer, {
  type AnimationMap,
} from "@/app/components/reusable/SceneLayer";
import SubtitleScroll from "@/app/components/text/SubtitleScroll";
import { useAudio } from "@/app/contexts/AudioContext";
import { useDevice } from "@/app/contexts/DeviceContext";
import { useUI } from "@/app/contexts/UIStarContext";
import { SCENE_WEIGHING_ITEMS } from "@/app/data/scene_weighing.data";

export default function Weighing() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const { setShowStars } = useUI();

  // ตรวจสอบ orientation โดยใช้ custom hook
  const { isMobile } = useDevice();
  const { sfxVolume, isMuted } = useAudio();

  const hasPlayedScalesRef = useRef(false);
  const hasPlayedMetalRef = useRef(false);
  const hasPlayedBlackHoleRef = useRef(false);
  const hasPlayedFallingRef = useRef(false);

  //? Refs for sound effects
  const scalesSoundRef = useRef<Howl | null>(null);
  const metalSoundRef = useRef<Howl | null>(null);
  const blackHoleSoundRef = useRef<Howl | null>(null);
  const fallingSoundRef = useRef<Howl | null>(null);

  //? Initialize sound effects
  useEffect(() => {
    scalesSoundRef.current = new Howl({
      src: ["/assets/Sound/3-4/weighing.mp3"],
      loop: false,
      volume: sfxVolume / 100,
    });

    metalSoundRef.current = new Howl({
      src: ["/assets/Sound/3-4/metal-slide.mp3"],
      loop: false,
      volume: sfxVolume / 100,
    });

    blackHoleSoundRef.current = new Howl({
      src: ["/assets/Sound/3-4/black-hole.mp3"],
      loop: true,
      volume: (sfxVolume / 100) * 2,
    });

    fallingSoundRef.current = new Howl({
      src: ["/assets/Sound/3-4/falling.mp3"],
      loop: false,
      volume: sfxVolume / 100,
    });

    return () => {
      scalesSoundRef.current?.unload();
      metalSoundRef.current?.unload();
      blackHoleSoundRef.current?.unload();
      fallingSoundRef.current?.unload();
    };
  }, [sfxVolume]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  //? Play/stop sounds based on scroll position, view and mute state
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (!isInView || isMuted) return;

      const scalesSound = scalesSoundRef.current;
      const metalSound = metalSoundRef.current;
      const blackHoleSound = blackHoleSoundRef.current;
      const fallingSound = fallingSoundRef.current;

      if (!scalesSound || !metalSound || !blackHoleSound || !fallingSound)
        return;

      // -----------------------------------------------------
      // 🔊 1. Play Metal (เสียงเหล็กขูด)
      // เงื่อนไข: เล่นขณะที่ scaleRotate กำลังเปลี่ยนค่า
      // อิงจาก range Animation: heartRotate_slow (0.55) -> heartRotate_fast (0.72)
      // -----------------------------------------------------
      if (latest > 0.55 && latest < 0.72) {
        if (!hasPlayedMetalRef.current && !metalSound.playing()) {
          metalSound.fade(0, sfxVolume / 100, 300);
          metalSound.play();
          hasPlayedMetalRef.current = true;
        }
      } else {
        // หยุดเสียงเมื่อหลุดช่วง Animation (จบแล้ว หรือ ถอยกลับ)
        if (hasPlayedMetalRef.current && metalSound.playing()) {
          metalSound.fade(metalSound.volume(), 0, 300);
          setTimeout(() => metalSound.stop(), 300);
          hasPlayedMetalRef.current = false;
        }
      }

      // -----------------------------------------------------
      // 🔊 2. Play Scales (เสียงกระแทกตุ้บ!)
      // เงื่อนไข: เล่นครั้งเดียวเมื่อ heartPlateY ลงมาสุด (ที่ 0.72)
      // -----------------------------------------------------
      if (latest >= 0.72) {
        if (!hasPlayedScalesRef.current) {
          scalesSound.play();
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
      // 0.75-0.98: Play black-hole sound effect
      if (latest >= 0.75 && latest < 0.98) {
        if (!hasPlayedBlackHoleRef.current && !blackHoleSound.playing()) {
          blackHoleSound.fade(0, (sfxVolume / 100) * 2, 1000);
          blackHoleSound.play();
          hasPlayedBlackHoleRef.current = true;
        }
      } else if (latest < 0.75) {
        // Stop black-hole when scrolling back before 0.75
        if (hasPlayedBlackHoleRef.current && blackHoleSound.playing()) {
          blackHoleSound.fade(blackHoleSound.volume(), 0, 1000);
          setTimeout(() => blackHoleSound.stop(), 1000);
          hasPlayedBlackHoleRef.current = false;
        }
      }

      // 0.98-1.0: Stop black-hole and play falling sound (once at 0.98)
      if (latest >= 0.98) {
        // Stop black-hole at 0.98
        if (hasPlayedBlackHoleRef.current && blackHoleSound.playing()) {
          blackHoleSound.fade(blackHoleSound.volume(), 0, 500);
          setTimeout(() => blackHoleSound.stop(), 500);
          hasPlayedBlackHoleRef.current = false;
        }
        // Play falling once
        if (!hasPlayedFallingRef.current) {
          fallingSound.play();
          hasPlayedFallingRef.current = true;
        }
      }

      // Reset logic for video section when scrolling back
      if (latest < 0.72) {
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
      metalSoundRef.current?.stop();
      blackHoleSoundRef.current?.stop();
    };
  }, [scrollYProgress, isInView, isMuted, sfxVolume]);

  // Main opacity for entire section
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.98, 1],
    [0, 1, 1, 0],
  );

  const insideOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.75, 0.8],
    [0, 1, 1, 0],
  );

  const ry = useTransform(
    scrollYProgress,
    [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.28],
    [0, 0, 40, 0, 50, 0, 200],
  );

  // POV falling effect - extended to use additional 50vh (600-750vh = 0.6-0.75)
  const pov_y = useTransform(scrollYProgress, [0, 0.72, 0.75], [0, 0, -300]);

  // Set 2
  const set2Opacity = useTransform(
    scrollYProgress,
    [0.0667, 0.1333, 0.749, 0.75],
    [0, 1, 1, 0],
  );

  // Set 4
  const set4Opacity = useTransform(
    scrollYProgress,
    [0.2, 0.2667, 0.749, 0.75],
    [0, 1, 1, 0],
  );
  const set4Y = useTransform(scrollYProgress, [0.2, 0.2667], [100, 0]);

  // Set 5
  const set5Opacity = useTransform(
    scrollYProgress,
    [0.2667, 0.3333, 0.749, 0.75],
    [0, 1, 1, 0],
  );
  const set5Y = useTransform(scrollYProgress, [0.2667, 0.3333], [100, 0]);

  // Set 6
  const set6Opacity = useTransform(
    scrollYProgress,
    [0.3333, 0.4, 0.749, 0.75],
    [0, 1, 1, 0],
  );
  const set6Y = useTransform(scrollYProgress, [0.3333, 0.4], [100, 0]);

  // Set 7: heart (300-350vh = 0.4-0.4667)
  const set7Opacity = useTransform(
    scrollYProgress,
    [0.4, 0.4667, 0.749, 0.75],
    [0, 1, 1, 0],
  );
  const set7Y = useTransform(scrollYProgress, [0.4, 0.4667], [50, 0]);

  // Set 8: feather (350-400vh = 0.4667-0.5333)
  const set8Opacity = useTransform(
    scrollYProgress,
    [0.4667, 0.5333, 0.749, 0.75],
    [0, 1, 1, 0],
  );
  const set8Y = useTransform(scrollYProgress, [0.4667, 0.5333], [50, 0]);

  // ============ ZOOM (400-500vh = 0.5333-0.6667) ============
  const containerScale = useTransform(
    scrollYProgress,
    [0.5, 0.7],
    isMobile ? [2.3, 4] : [1, 2],
  );
  const containerTop = useTransform(
    scrollYProgress,
    [0.5, 0.7],
    isMobile ? ["-1%", "-3%"] : ["0%", "-7%"],
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
    isMobile ? [0, 5] : [0, 15],
  );

  // Feather plate: slowly up (Y movement)
  const featherPlateY_slow = useTransform(
    scrollYProgress,
    [0.55, 0.62],
    isMobile ? [0, -5] : [0, -15],
  );

  // ============ FAST DROP (580-600vh = 0.7733-0.8) ============
  // Heart: fast rotate down with easeIn
  const heartRotate_fast = useTransform(
    scrollYProgress,
    [0.62, 0.72],
    [0, -15],
  );
  // Heart plate: fast drop (Y movement)
  const heartPlateY_fast = useTransform(
    scrollYProgress,
    [0.62, 0.72],
    isMobile ? [0, 8] : [0, 30],
  );
  // Feather plate: slight rise (Y movement)
  const featherPlateY_fast = useTransform(
    scrollYProgress,
    [0.62, 0.72],
    isMobile ? [0, -3] : [0, -10],
  );

  // Combined positions
  const scaleRotate = useTransform(
    () => heartRotate_slow.get() + heartRotate_fast.get(),
  );
  const heartPlateY = useTransform(
    () => heartPlateY_slow.get() + heartPlateY_fast.get(),
  );
  const featherPlateY = useTransform(
    () => featherPlateY_slow.get() + featherPlateY_fast.get(),
  );

  // Combined transforms for animation groups
  const heartPlateY_set7 = useTransform(() => set7Y.get() + heartPlateY.get());
  const featherPlateY_set8 = useTransform(
    () => set8Y.get() + featherPlateY.get(),
  );
  const heartPlateY_set6 = useTransform(() => set6Y.get() + heartPlateY.get());
  const featherPlateY_set6 = useTransform(
    () => set6Y.get() + featherPlateY.get(),
  );

  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.75, 0.8],
    [0, 1, 1, 0],
  );

  const textAnimationProgress = useTransform(
    scrollYProgress,
    [0, 0.25, 0.8],
    [0, 0, 1],
  );

  // ============ VIDEO SECTION (750-1000vh = 0.75-1.0) ============
  const videoOpacity = useTransform(
    scrollYProgress,
    [0.72, 0.75, 0.98, 1],
    [0, 1, 1, 0],
  );

  const animations: AnimationMap = useMemo(
    () => ({
      4: { y: set4Y, opacity: set4Opacity },
      // Scale with rotate
      69: { y: set6Y, opacity: set6Opacity, rotate: scaleRotate },
      // Group 6: main plates/scale intro
      6: { y: set6Y, opacity: set6Opacity },
      // Heart and feather appear in their own groups
      7: {
        y: heartPlateY_set7,
        opacity: set7Opacity,
      },
      8: {
        y: featherPlateY_set8,
        opacity: set8Opacity,
      },
      // Per-item combined transforms for plates
      66: {
        y: heartPlateY_set6,
        opacity: set6Opacity,
      },
      67: {
        y: featherPlateY_set6,
        opacity: set6Opacity,
      },
      // Light needs flicker opacity
      68: { y: set6Y, opacity: set6Opacity },
    }),
    [
      set4Y,
      set4Opacity,
      set6Y,
      set6Opacity,
      scaleRotate,
      heartPlateY_set7,
      set7Opacity,
      featherPlateY_set8,
      set8Opacity,
      heartPlateY_set6,
      featherPlateY_set6,
    ],
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const isFalling = latest > 0.75;

    if (isFalling) {
      setShowStars(true);
    } else {
      setShowStars(false);
    }
  });

  return (
    <m.div ref={ref} className="relative h-[1000vh]" style={{ opacity }}>
      {/* Background */}
      <div className="absolute w-screen inset-0" />
      <div
        className="fixed inset-0 w-screen h-screen pointer-events-none"
        style={{
          perspective: "1000px", // กำหนดความลึกที่ตัวพ่อ
          // ถ้าอยากให้จุด Center อยู่กลางจอเป๊ะๆ
          perspectiveOrigin: "50% 50%",
          zIndex: 0,
        }}
      >
        {/* fixed Container with aspect-video layout */}
        <m.div
          className="fixed
          w-full h-full flex items-center justify-center bg-s4"
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
            <m.div className="absolute inset-0 w-full h-full">
              <SceneLayer
                items={SCENE_WEIGHING_ITEMS}
                animations={animations}
                containerAspectRatio="16 / 9"
              >
                {/* Set 1 full background */}
                <m.div
                  className="absolute inset-0 w-full h-full -z-1"
                  style={{
                    opacity: set2Opacity,
                  }}
                >
                  <LazyLottie
                    src="/assets/Scene/Scene4/s4-set1.json"
                    loop
                    playTrigger={set2Opacity}
                    className="w-full h-full"
                  />
                </m.div>

                {/* Set 4: Clothing */}
                <m.div
                  className="absolute bottom-[-2.1333%] left-[23.5375%] w-[52.8875%] h-[90.8444%]"
                  style={{
                    opacity: set4Opacity,
                    y: set4Y,
                  }}
                >
                  <LazyLottie
                    src="/assets/Scene/Scene4/s4-clothing.json"
                    loop
                    playTrigger={set4Opacity}
                    className="w-full h-full"
                  />
                </m.div>

                {/* Set 5: Cat */}
                <m.div
                  className="absolute bottom-[-4.2%] right-[28.1%] w-[7.17%] h-[22.77%] scale-x-[-1]"
                  style={{
                    opacity: set5Opacity,
                    y: set5Y,
                  }}
                >
                  <LazyLottie
                    src="/assets/Scene/Scene4/s4-cat.json"
                    playTrigger={set5Opacity}
                    loop
                    className="w-full h-full"
                  />
                </m.div>
                <m.div
                  className="absolute bottom-[-4.3%] left-[28%] w-[7.17%] h-[22.77%] "
                  style={{
                    opacity: set5Opacity,
                    y: set5Y,
                  }}
                >
                  <LazyLottie
                    src="/assets/Scene/Scene4/s4-cat.json"
                    playTrigger={set5Opacity}
                    loop
                    className="w-full h-full"
                  />
                </m.div>
              </SceneLayer>
            </m.div>
          </div>
        </m.div>

        {/* Human (750-1000vh) */}
        <m.div
          className="fixed inset-0 w-screen flex items-center justify-center pointer-events-none bg-s5"
          style={{
            opacity: videoOpacity,
          }}
        >
          <m.div className="w-full h-full" style={{scale : isMobile ? 0.8 : 1,}}>
          <LazyLottie
            src="/assets/Scene/Scene4/human.json"
            playTrigger={videoOpacity}
            loop
            className="w-full h-full"
          />
          </m.div>
        </m.div>
      </div>

      {/* ชุด 10: Subtitles */}
      <m.div
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
          progress={textAnimationProgress}
          className="w-full h-full"
        />
      </m.div>

      <EyelidOverlay externalRy={ry} />

      {/* Light overlay */}
      <div
        className="absolute w-screen inset-0 mix-blend-soft-light pointer-events-none"
        style={{ backgroundColor: "var(--color-overlay)", opacity: 0.5 }}
      />
    </m.div>
  );
}
