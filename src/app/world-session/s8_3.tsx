"use client";

import {
  type MotionValue,
  m,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import type { Howl } from "howler";
import Image from "next/image";
import { useMemo, useRef } from "react";
import SceneLayer, {
  type AnimationMap,
} from "@/app/components/reusable/SceneLayer";
import { SCENE_S8_3_ITEMS } from "@/app/data/scene_s8_3.data";
import { getAudioUrl, getJsonUrl } from "@/utils/cloudinaryUtils";
import LazyLottie from "../components/reusable/LazyLottie";
import { useAudio } from "../contexts/AudioContext";
import { useDevice } from "../contexts/DeviceContext";

// ────────────────────────────────────────────────────
//  Types
// ────────────────────────────────────────────────────

interface S8_3Props {
  scrollYProgress: MotionValue<number>;
}

// ────────────────────────────────────────────────────
//  Main Component: S8_3 (Visual Transition — 300vh)
//
//  Phase 1 (0-0.24): starlight, leaf, lotus, butterfly stagger fade-in + slide-up
//  Phase 2 (0.30-0.60): butterfly flies sine wave → butterfly_2 position
//                        leaf + lotus fade out together (0.30-0.50)
//  Phase 3 (0.55-0.65): butterfly rotates -45°, then fades out
//  Phase 4 (0.667-0.85): lotus_bloom + butterfly_2 fade in
//
//  Butterfly is rendered outside SceneLayer for custom path animation.
// ────────────────────────────────────────────────────

export default function S8_3({ scrollYProgress }: S8_3Props) {
  const { isMobile } = useDevice();
  const { playSfx } = useAudio();

  //? SFX tracking refs
  const hasPlayedChime = useRef(false);
  const hasPlayedBloom = useRef(false);
  const chimeSoundRef = useRef<Howl | null>(null);

  // ─── Container Fade ───

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.9, 1.0],
    [0, 1, 1, 0],
  );
  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.05, 0.92, 1.0],
    [-1, 10, 10, -1],
  );

  // ─── Phase 1: Stagger fade-in + slide-up ───

  //? animGroup 1: starlight — now Lottie
  const starlightOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const starlightY = useTransform(scrollYProgress, [0, 0.12], [60, 0]);

  //? animGroup 2: leaf — fade in then fade out (0.30-0.50) with lotus
  const leafOpacity = useTransform(
    scrollYProgress,
    [0.04, 0.16, 0.3, 0.5],
    [0, 1, 1, 0],
  );
  const leafY = useTransform(scrollYProgress, [0.04, 0.16], [80, 0]);

  //? animGroup 3: lotus — fade in then fade out (0.30-0.50) with leaf
  const lotusOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.2, 0.3, 0.5],
    [0, 1, 1, 0],
  );
  const lotusY = useTransform(scrollYProgress, [0.08, 0.2], [50, 0]);

  // ─── Butterfly: Custom sine-wave flight animation ───
  //? Rendered separately from SceneLayer for full control

  //? Fade in (phase 1) → stay visible during flight → fade out as butterfly_2 appears
  const butterflyOpacity = useTransform(
    scrollYProgress,
    [0.12, 0.24, 1],
    [0, 1, 1],
  );

  //? Initial slide-up (phase 1 only, translateY in px)
  const butterflySlideY = useTransform(scrollYProgress, [0.12, 0.5], [40, 0]);

  //? Flight path progress (clamped 0-1)
  const flightProgress = useTransform(scrollYProgress, [0.3, 0.8], [0, 1], {
    clamp: true,
  });

  //? Positions: butterfly start → butterfly_2 end (from Figma %)
  const startX = isMobile ? 6.13 : 11.42;
  const endX = isMobile ? 76.83 : 77.03;
  const startY = isMobile ? 19.14 : 12.64;
  const endY = isMobile ? 23.48 : 24.1;

  //? X: linear interpolation from start to end
  const butterflyLeft = useTransform(
    flightProgress,
    (p) => `${startX + (endX - startX) * p}%`,
  );

  //? Y: linear path + sine wave oscillation (2 full waves, dampening towards end)
  const butterflyTop = useTransform(flightProgress, (p) => {
    const linearY = startY + (endY - startY) * p;
    const amplitude = isMobile ? 4 : 6;
    const sineWave = Math.sin(p * Math.PI * 4) * amplitude * (1 - p * 0.7);
    return `${linearY + sineWave}%`;
  });

  //? Rotation: oscillate ±20° during flight (cos matches sine Y direction), then settle at -45°
  const butterflyRotate = useTransform(flightProgress, (p) => {
    //? Oscillation: ±20° synced with sine Y path, dampens as it approaches end
    const oscillation = Math.cos(p * Math.PI * 4) * 20 * (1 - p * 0.7);
    //? Ease into final -45° rotation in the last 30% of flight
    const settleT = Math.max(0, (p - 0.7) / 0.3); // 0→1 over 70%–100%
    const finalRotate = -45 * settleT * settleT; // ease-in quad
    return oscillation * (1 - settleT) + finalRotate;
  });

  // ─── Phase 4: lotus_bloom + butterfly_2 ───

  //? animGroup 5: lotus bloom
  const lotusBloomOpacity = useTransform(scrollYProgress, [0.667, 0.8], [0, 1]);

  // ─── SFX Events ───

  //? เล่นเสียง chime เมื่อผีเสื้อเริ่มบิน (flightProgress เริ่มที่ scrollYProgress 0.3)
  //? เล่นเสียง flower_bloom เมื่อดอกบัวบาน (lotusBloom เริ่มที่ scrollYProgress 0.667)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.3 && !hasPlayedChime.current) {
      const sound = playSfx(getAudioUrl("Sound/8/chime.mp3"));
      if (sound) chimeSoundRef.current = sound;
      hasPlayedChime.current = true;
    } else if (latest < 0.25 && hasPlayedChime.current) {
      //? หยุดเสียง chime เมื่อเลื่อนกลับ
      if (chimeSoundRef.current) {
        chimeSoundRef.current.stop();
        chimeSoundRef.current.unload();
        chimeSoundRef.current = null;
      }
      hasPlayedChime.current = false;
    }
    //? หยุดเสียง chime เมื่อ scene กำลังจะหายไป
    if (latest > 0.9 && chimeSoundRef.current) {
      chimeSoundRef.current.stop();
      chimeSoundRef.current.unload();
      chimeSoundRef.current = null;
    }
    if (latest >= 0.667 && !hasPlayedBloom.current) {
      playSfx(getAudioUrl("Sound/8/flower_bloom.mp3"));
      hasPlayedBloom.current = true;
    } else if (latest < 0.6 && hasPlayedBloom.current) {
      hasPlayedBloom.current = false;
    }
  });

  // ─── Filter butterfly from SceneLayer (handled separately above) ───

  const sceneItems = useMemo(
    () => SCENE_S8_3_ITEMS.filter((item) => item.id !== "butterfly"),
    [],
  );

  //? Get butterfly image src from data
  const butterflyItem = useMemo(
    () => SCENE_S8_3_ITEMS.find((item) => item.id === "butterfly"),
    [],
  );
  const butterflySrc =
    isMobile && butterflyItem?.mobileSrc
      ? butterflyItem.mobileSrc
      : (butterflyItem?.src ?? "");

  // ─── Animation Map (no butterfly — it has its own animation) ───

  const animations: AnimationMap = useMemo(
    () => ({
      2: { opacity: leafOpacity, y: leafY },
      3: { opacity: lotusOpacity, y: lotusY },
      5: { opacity: lotusBloomOpacity },
    }),
    [leafOpacity, leafY, lotusOpacity, lotusY, lotusBloomOpacity],
  );

  return (
    <m.div
      className="fixed flex justify-center top-0 h-screen w-screen bg-s8-3 overflow-hidden"
      style={{ opacity, zIndex }}
    >
      <m.div className="flex items-center h-screen w-screen portrait:w-auto">
        <SceneLayer
          items={sceneItems}
          animations={animations}
          containerAspectRatio={isMobile ? "1080 / 1920" : "1920 / 1080"}
        >
          {/* ═══ Starlight Background (LazyLottie) ═══ */}
          <m.div
            className="absolute"
            style={{
              width: "100%",
              height: "100%",
              left: "0%",
              top: "0%",
              opacity: starlightOpacity,
              y: starlightY,
            }}
          >
            <LazyLottie
              src={getJsonUrl(
                isMobile
                  ? "Scene/Scene8/03/s8-starlight-mb.json"
                  : "Scene/Scene8/03/s8-starlight.json",
              )}
              className="w-full h-full"
              loop
              playTrigger={starlightOpacity}
            />
          </m.div>

          {/*? Butterfly: sine-wave flight from original → butterfly_2 position */}
          <m.div
            className="absolute"
            style={{
              left: butterflyLeft,
              top: butterflyTop,
              width: isMobile ? "22.45%" : "12.23%",
              height: isMobile ? "12.63%" : "21.75%",
              opacity: butterflyOpacity,
              rotate: butterflyRotate,
              y: butterflySlideY,
              willChange: "transform, opacity",
            }}
          >
            <Image
              src={butterflySrc}
              alt="Flying butterfly"
              fill
              sizes="(max-width: 768px) 25vw, 15vw"
              className="object-contain"
              quality={85}
            />
          </m.div>
        </SceneLayer>
      </m.div>
    </m.div>
  );
}
