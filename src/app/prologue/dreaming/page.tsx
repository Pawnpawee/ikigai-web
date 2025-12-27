// app/dreaming/page.tsx
"use client";

import { m } from "framer-motion";
import { Howl } from "howler";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import DecisionSection from "@/app/components/reusable/DecisionSection";
import EyelidOverlay from "@/app/components/reusable/EyeLidOverlay";
import { useAudio } from "@/app/contexts/AudioContext";
import Dreaming from "./Dreaming";
import Weighing from "./Weighing";

export default function DreamingPage() {
  const router = useRouter();
  const { sfxVolume, isMuted, setBgMusic } = useAudio();

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  const notLookTexts = [
    "ไม่อยากดูหรอกหรอ?...",
    "จะอยู่ตรงนี้ก่อน?...",
    "มันส่งเสียงเรียกซะแล้ว...",
    "บางอย่างกำลังเข้ามาใกล้แล้ว...",
  ];
  const [snoozeCount, setSnoozeCount] = useState(0);
  const [secondaryBtnText, setSecondaryBtnText] = useState<string | null>(
    "ยังก่อน",
  );
  const [isSnoozing, setIsSnoozing] = useState(false);
  const [decisionText, setDecisionText] = useState(
    "คุณตกลงมาจุดสิ้นสุด.... คุณเจอกับบางอย่างกำลังเดินใกล้เข้ามาจะดูมันไหม",
  );

  const meowSoundRef = useRef<Howl | null>(null);

  useEffect(() => {
    if (!isMuted) {
      setBgMusic("/assets/Sound/3-4/egypt-jelly-dance.mp3");
    }

    meowSoundRef.current = new Howl({
      src: ["/assets/Sound/3-4/cat-meow.mp3"],
      loop: false,
      volume: sfxVolume / 100,
    });
  }, [isMuted, setBgMusic, sfxVolume]);

  const handleNotLook = () => {
    // เริ่ม Effect ตาปรือ
    setIsSnoozing(true);

    setTimeout(() => {
      const nextIndex = snoozeCount;

      //? เช็คว่ายังมีข้อความเหลือไหม?
      if (nextIndex < notLookTexts.length) {
        setDecisionText(notLookTexts[nextIndex]);
        setSnoozeCount((prev) => prev + 1);

        if (nextIndex === 2 && !isMuted) {
          const meowSound = meowSoundRef.current;

          if (meowSound && !meowSound.playing()) {
            meowSound.fade(0, sfxVolume / 100, 500);
            meowSound.play();
          }
        }
      } else {
        //? ข้อความหมดแล้ว บังคับตื่น
        setDecisionText("ต้องเผชิญหน้ากับมัน แล้วล่ะ...");
        setSecondaryBtnText(null);
      }

      // จบ Effect ตาปรือ
      setIsSnoozing(false);
    }, 1000); // รอให้ Effect มืดสนิทก่อนค่อยเปลี่ยนข้อความ
  };

  const handleLook = async () => {
    router.push("/into-dark");
  };

  return (
    <div>
      {/* Fade In */}
      <m.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="fixed inset-0 z-99 bg-black pointer-events-none"
      />

      {/* Scenes */}
      <Dreaming />
      <Weighing />

      {/* ส่วนตัดสินใจ */}
      <DecisionSection
        text={decisionText}
        primaryButtonText="ดูสิ"
        secondaryButtonText={secondaryBtnText as string}
        onPrimaryClick={handleLook}
        onSecondaryClick={handleNotLook}
      />

      <EyelidOverlay isSnoozing={isSnoozing} />
    </div>
  );
}
