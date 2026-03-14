"use client";
import { AnimatePresence, m } from "framer-motion"; // ⭐ Import AnimatePresence เพิ่ม
import type { Howl } from "howler";
import type { AnimationItem } from "lottie-web";
import Image from "next/image"; // ⭐ Import Image component ของ Next.js
import { useCallback, useEffect, useRef, useState } from "react";
import { getAudioUrl, getJsonUrl } from "@/utils/cloudinaryUtils";
import LazyLottie from "../components/reusable/LazyLottie";
import { useAudio } from "../contexts/AudioContext";
import { TEMPLE_DIALOGUE } from "../data/scene_temple.data";

interface HeartWeighingProcessProps {
  isProcessing: boolean;
  progress: number;
  statusText: string;
  // ⭐ เพิ่ม Type ให้กับ Props ใหม่
  statusIcon: { src: string; alt: string } | null;
}

export default function HeartWeighingProcess({
  isProcessing,
  progress,
  statusText,
  statusIcon, // ⭐ รับค่า Props
}: HeartWeighingProcessProps) {
  const [showDialogue, setShowDialogue] = useState(false);
  const { playSfx } = useAudio();
  const bgLottieRef = useRef<AnimationItem | null>(null);

  const handleBgRef = useCallback((instance: AnimationItem | null) => {
    bgLottieRef.current = instance;
    if (instance) {
      instance.goToAndStop(0, true);
      instance.addEventListener("complete", () => {
        setShowDialogue(true);
        instance.playSegments([904, 1216], true);
      });
      instance.playSegments([0, 1216], true);
    }
  }, []);

  const sparklingSoundRef = useRef<Howl | null>(null);
  const shimmeringSoundRef = useRef<Howl | null>(null);

  useEffect(() => {
    if (isProcessing) {
      const sparkle = playSfx(getAudioUrl("Sound/10/magical_sparkling.mp3"), {
        loop: true,
      });
      const shimmer = playSfx(getAudioUrl("Sound/10/shimmering_object.mp3"), {
        loop: true,
      });
      if (sparkle) sparklingSoundRef.current = sparkle;
      if (shimmer) shimmeringSoundRef.current = shimmer;
    }

    return () => {
      if (sparklingSoundRef.current) {
        sparklingSoundRef.current.stop();
        sparklingSoundRef.current.unload();
      }
      if (shimmeringSoundRef.current) {
        shimmeringSoundRef.current.stop();
        shimmeringSoundRef.current.unload();
      }
    };
  }, [isProcessing, playSfx]);

  if (!isProcessing) return null;

  return (
    <m.div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
      <div className="absolute inset-0">
        <LazyLottie
          src={getJsonUrl("Scene/Result/s11.json")}
          className="w-full h-full"
          loop={false}
          play={isProcessing}
          getRef={handleBgRef}
          ignoreAspectRatio
        />
      </div>

      {showDialogue && (
        <m.div
          className="absolute top-[10%] w-[90%] md:w-[70%] text-center px-4 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-white text-xl md:text-2xl leading-relaxed whitespace-pre-line drop-shadow-[0_0_10px_#ffffff]">
            {TEMPLE_DIALOGUE.weighing}
          </p>
        </m.div>
      )}

      {/* ⭐ ส่วนแสดงสถานะ (Text + Icon) */}
      <m.div
        className="absolute bottom-[15%] w-[90%] md:w-[60%] flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* ไอคอนพร้อม Effect เปลี่ยนรูป */}
        <div className="h-16 w-16 mb-4 relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            {statusIcon ? (
              <m.div
                key={statusIcon.src} // ให้ AnimatePresence รู้ว่ารูปเปลี่ยน
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
                transition={{ duration: 0.5 }}
                className="relative w-12 h-12 md:w-16 md:h-16 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
              >
                <Image
                  src={statusIcon.src}
                  alt={statusIcon.alt}
                  fill
                  className="object-contain animate-pulse" // ให้รูปเต้นตุ๊บๆ เบาๆ
                />
              </m.div>
            ) : (
              // โชว์วงกลมโหลดรอไว้ถ้าไม่มีไอคอน
              <m.div
                key="loading-spinner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin drop-shadow-[0_0_10px_#ffffff]"
              />
            )}
          </AnimatePresence>
        </div>

        <m.p
          key={statusText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-xl md:text-3xl font-light tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        >
          {statusText || "กำลังเชื่อมต่อ..."}
        </m.p>

        <div className="w-full h-2 md:h-3 bg-white/20 rounded-full mt-6 overflow-hidden relative shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          <m.div
            className="h-full rounded-full bg-linear-to-r from-amber-400 to-yellow-200 shadow-[0_0_10px_#fbbf24]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
          />
        </div>
        <p className="text-white/80 text-sm md:text-base mt-2 tracking-widest">
          {progress}%
        </p>
      </m.div>
    </m.div>
  );
}
