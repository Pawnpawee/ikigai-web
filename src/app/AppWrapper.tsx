"use client";
import React, { useState, useEffect } from "react";
import WelcomeSoundModal from "./components/ui/WelcomeSoundModal";
import { useAudio } from "./contexts/AudioContext";
// 1. Import 'ReactLenis' (ไม่ใช่ 'Lenis')
import { ReactLenis } from "lenis/react";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const { startAudio, pauseAudio, userConsented } = useAudio();

  useEffect(() => {
    // แสดง modal เมื่อโหลดหน้าครั้งแรก
    if (!userConsented) {
      setShowWelcomeModal(true);
    }
  }, [userConsented]);

  const handleAccept = () => {
    setShowWelcomeModal(false);
    startAudio();
  };

  const handleDecline = () => {
    setShowWelcomeModal(false);
    pauseAudio();
  };

  // 3. สร้าง object options ของคุณ
  const lenisOptions = {
    wheelMultiplier: 0.4,
    duration: 2,
    lerp: 0.05,
  };

  return (
    // 4. ใช้ <ReactLenis> หุ้มทุกอย่าง
    // และส่ง options เข้าไป
    <ReactLenis root options={lenisOptions}>
      <WelcomeSoundModal
        isOpen={showWelcomeModal}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
      {children}
    </ReactLenis>
  );
}
