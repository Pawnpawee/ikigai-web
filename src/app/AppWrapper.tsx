"use client";
import React, { useState, useEffect } from "react";
import WelcomeSoundModal from "./components/ui/WelcomeSoundModal";
import { useAudio } from "./contexts/AudioContext";

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

  return (
    <>
      <WelcomeSoundModal
        isOpen={showWelcomeModal}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
      {children}
    </>
  );
}
