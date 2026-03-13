"use client";
import { m } from "framer-motion";
import type { Howl } from "howler";
import type { AnimationItem } from "lottie-web";
import { useCallback, useEffect, useRef, useState } from "react";
import { getAudioUrl, getJsonUrl } from "@/utils/cloudinaryUtils";
import LazyLottie from "../components/reusable/LazyLottie";
import { useAudio } from "../contexts/AudioContext";
import { TEMPLE_DIALOGUE } from "../data/scene_temple.data";

// ⭐ 1. รับ Props เพิ่มเติมจากหน้าแม่
interface HeartWeighingProcessProps {
  isProcessing: boolean;
  progress: number;
  statusText: string;
}

export default function HeartWeighingProcess({
  isProcessing,
  progress,
  statusText,
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
        instance.playSegments([226, 304], true);
      });
      instance.playSegments([0, 225], true);
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

      {/* 2. แสดงสถานะและหลอดโหลดตามข้อมูลจริงจาก C# */}
      <m.div
        className="absolute bottom-[15%] w-[90%] md:w-[60%] text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <m.p
          key={statusText} // ทำให้กระพริบเปลี่ยนตอน text เปลี่ยน
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white text-xl md:text-3xl font-light tracking-wide"
        >
          {statusText || "กำลังเชื่อมต่อ..."}
        </m.p>

        <div className="w-full h-2 md:h-3 bg-white/20 rounded-full mt-6 overflow-hidden relative">
          <m.div
            className="h-full rounded-full bg-linear-to-r from-amber-400 to-yellow-200"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: "easeInOut" }} // สมูทมากก
          />
        </div>
        <p className="text-white/60 text-sm md:text-base mt-2">{progress}%</p>
      </m.div>
    </m.div>
  );
}
