"use client";

import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import DecisionSection from "@/app/components/reusable/DecisionSection";
import EyelidOverlay from "@/app/components/reusable/EyeLidOverlay";
import { useAudio } from "@/app/contexts/AudioContext";
import { getAudioUrl } from "@/utils/cloudinaryUtils";
import Dreaming from "./Dreaming";
import Weighing from "./Weighing";

export default function DreamingPage() {
  const router = useRouter();
  const { playSfx, isMuted, setBgMusic } = useAudio(); //? isMuted ยังใช้สำหรับเสียง SFX แมวเมี่ยว

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

  //? ตั้งเพลง bg ทุกครั้งที่เข้าหน้า ไม่ว่าจะ mute หรือไม่ เพื่อให้ soundRef ตรงกับหน้าปัจจุบัน
  useEffect(() => {
    setBgMusic(getAudioUrl("Sound/3-4/egypt-jelly-dance.mp3"));
  }, [setBgMusic]);

  const handleNotLook = () => {
    // เริ่ม Effect ตาปรือ
    setIsSnoozing(true);

    setTimeout(() => {
      const nextIndex = snoozeCount;

      //? เช็คว่ายังมีข้อความเหลือไหม?
      if (nextIndex < notLookTexts.length) {
        setDecisionText(notLookTexts[nextIndex]);
        setSnoozeCount((prev) => prev + 1);

        //? เล่นเสียงแมวเมี่ยวตอนข้อความที่ 3
        if (nextIndex === 2 && !isMuted) {
          playSfx(getAudioUrl("Sound/3-4/cat-meow.mp3"));
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
    router.push("/prologue/into-dark");
  };

  return (
    <div>
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
