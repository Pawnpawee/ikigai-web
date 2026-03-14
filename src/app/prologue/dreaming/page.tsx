"use client";

import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import DecisionSection from "@/app/components/reusable/DecisionSection";
import EyelidOverlay from "@/app/components/reusable/EyeLidOverlay";
import LoadingScreen from "@/app/components/reusable/LoadingScreen";
import { useAudio } from "@/app/contexts/AudioContext";
import { SCENE_DREAMING_ITEMS } from "@/app/data/scene_dreaming.data";
import { SCENE_WEIGHING_ITEMS } from "@/app/data/scene_weighing.data";
import { useAssetPreloader } from "@/app/hooks/useAssetPreloader";
import { createSceneAssetGroup } from "@/app/utils/assetGroups";
import { getAudioUrl, getJsonUrl } from "@/utils/cloudinaryUtils";
import Dreaming from "./Dreaming";
import Weighing from "./Weighing";

export default function DreamingPage() {
  const router = useRouter();
  const { playSfx, isMuted, setBgMusic } = useAudio(); //? isMuted ยังใช้สำหรับเสียง SFX แมวเมี่ยว
  const { areGroupsLoaded, preloadGroups } = useAssetPreloader();
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [preloadUntilIndex, setPreloadUntilIndex] = useState(0);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  const notLookTexts = [
    "ไม่อยากดูหรอกหรอ?...",
    "ต้องเผชิญหน้ากับมัน แล้วล่ะ...",
  ];
  const [snoozeCount, setSnoozeCount] = useState(0);
  const [secondaryBtnText, setSecondaryBtnText] = useState<string | null>(
    "ยังก่อน",
  );
  const [isSnoozing, setIsSnoozing] = useState(false);
  const [decisionText, setDecisionText] = useState(
    "คุณตกลงมาจุดสิ้นสุด.... \n คุณเจอกับบางอย่างกำลังเดินใกล้เข้ามาจะดูมันไหม",
  );

  //? ตั้งเพลง bg ทุกครั้งที่เข้าหน้า ไม่ว่าจะ mute หรือไม่ เพื่อให้ soundRef ตรงกับหน้าปัจจุบัน
  useEffect(() => {
    setBgMusic(getAudioUrl("Sound/3-4/egypt-jelly-dance.mp3"));
  }, [setBgMusic]);

  const assetGroups = useMemo(
    () => [
      createSceneAssetGroup({
        id: "dreaming",
        items: SCENE_DREAMING_ITEMS,
        extraAssets: [
          getAudioUrl("Sound/3-4/egypt-jelly-dance.mp3"),
          getAudioUrl("Sound/3-4/cat-meow.mp3"),
          getJsonUrl("Scene/Scene3/sky.json"),
          getJsonUrl("Scene/Scene3/sun.json"),
          getJsonUrl("Scene/Scene3/camel.json"),
        ],
      }),
      createSceneAssetGroup({
        id: "weighing",
        items: SCENE_WEIGHING_ITEMS,
        extraAssets: [
          getAudioUrl("Sound/3-4/weighing.mp3"),
          getAudioUrl("Sound/3-4/metal-slide.mp3"),
          getAudioUrl("Sound/3-4/black-hole.mp3"),
          getAudioUrl("Sound/3-4/falling.mp3"),
          getJsonUrl("Scene/Scene4/s4-clothing.json"),
          getJsonUrl("Scene/Scene4/human.json"),
        ],
      }),
    ],
    [],
  );

  useEffect(() => {
    void preloadGroups(assetGroups.slice(0, preloadUntilIndex + 1));
  }, [assetGroups, preloadGroups, preloadUntilIndex]);

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      if (scrollPosition >= viewportHeight * 6) {
        setActiveSceneIndex(1);
      } else {
        setActiveSceneIndex(0);
      }

      if (scrollPosition >= viewportHeight * 4) {
        setPreloadUntilIndex(1);
      } else {
        setPreloadUntilIndex(0);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNotLook = () => {
    // เริ่ม Effect ตาปรือ
    setIsSnoozing(true);

    setTimeout(() => {
      const nextIndex = snoozeCount;

      const text = notLookTexts[nextIndex];
      setDecisionText(text);
      setSnoozeCount((prev) => prev + 1);

      //? คลิกครั้งที่ 2 = ข้อความสุดท้าย → ซ่อนปุ่ม บังคับดู
      if (nextIndex >= notLookTexts.length - 1) {
        setSecondaryBtnText(null);
      }

      //? เล่นเสียงแมวเมี่ยวตอนคลิกครั้งแรก
      if (nextIndex === 0 && !isMuted) {
        playSfx(getAudioUrl("Sound/3-4/cat-meow.mp3"));
      }

      // จบ Effect ตาปรือ
      setIsSnoozing(false);
    }, 1000); // รอให้ Effect มืดสนิทก่อนค่อยเปลี่ยนข้อความ
  };

  const handleLook = async () => {
    router.push("/prologue/into-dark");
  };

  const currentGroupId =
    assetGroups[Math.min(activeSceneIndex, assetGroups.length - 1)]?.id;

  if (!currentGroupId || !areGroupsLoaded([currentGroupId])) {
    return <LoadingScreen isLoading={true} />;
  }

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
