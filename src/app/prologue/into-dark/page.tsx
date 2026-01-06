"use client";

import { useEffect, useLayoutEffect } from "react";

import { useAudio } from "@/app/contexts/AudioContext";

import IntoDark from "./IntoDark";

export default function IntoDarkPage() {
  const { setBgMusic, isMuted } = useAudio();

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  // เปลี่ยนเพลงกลับไป default bg-music เมื่อเข้าหน้า IntoDark
  useEffect(() => {
    if (!isMuted) {
      setBgMusic("/assets/Sound/bg-music.mp3");
    }
  }, [setBgMusic, isMuted]);

  return (
    <div>
      <IntoDark />
    </div>
  );
}
