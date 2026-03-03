"use client";

import { useEffect, useLayoutEffect } from "react";

import { useAudio } from "@/app/contexts/AudioContext";
import { getAudioUrl } from "@/utils/cloudinaryUtils";

import IntoDark from "./IntoDark";

export default function IntoDarkPage() {
  const { setBgMusic } = useAudio();

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  //? ตั้งเพลง bg ทุกครั้งที่เข้าหน้า ไม่ว่าจะ mute หรือไม่ เพื่อให้ soundRef ตรงกับหน้าปัจจุบัน
  useEffect(() => {
    setBgMusic(getAudioUrl("Sound/5/mysterious-dark-background.mp3"));
  }, [setBgMusic]);

  return (
    <div>
      <IntoDark />
    </div>
  );
}
