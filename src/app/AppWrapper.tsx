"use client";
import React, { useState, useEffect } from "react";
import WelcomeSoundModal from "./components/ui/WelcomeSoundModal";
import { useAudio, AudioProvider } from "./contexts/AudioContext";
import { AssetLoaderProvider } from "./contexts/AssetLoaderContext";
import Preloader from "./components/ui/Preloader";
import ReactLenis from "lenis/react";

function AppContent({ children }: { children: React.ReactNode }) {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const { startAudio, pauseAudio, userConsented, isInitialized } = useAudio();

  useEffect(() => {
    if (isInitialized) {
      if (!userConsented) {
        setShowWelcomeModal(true);
      }
    }
  }, [userConsented, isInitialized]);

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
      <Preloader /> {/* Preloader จะเรียก useLenis() ข้างในเพื่อสั่งหยุด scroll */}
      <WelcomeSoundModal
        isOpen={showWelcomeModal}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
      {/* เนื้อหาหลักของเว็บ */}
      {children}
    </>
  );
}

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // Detect mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on mount
    checkMobile();
    
    // Check on resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const lenisOptions = {
    wheelMultiplier: isMobile ? 0.4 : 0.6, // ลดความเร็วบนมือถือ
    touchMultiplier: 1.5, // ลดความไวของ touch
    duration: isMobile ? 1.8 : 1.2, // เพิ่มระยะเวลา animation บนมือถือ
    lerp: isMobile ? 0.05 : 0.1, // ลด lerp = ทำให้นุ่มนวลขึ้น
    smoothWheel: true,
    smoothTouch: true, // เปิด smooth touch
  };

  return (
    // 1. AssetLoader อยู่บนสุด (โหลดของ)
    <AssetLoaderProvider>
      {/* 3. Lenis ครอบทั้งหมดเพื่อให้ทุก Component เข้าถึง lenis instance ได้ */}
      <ReactLenis root options={lenisOptions}>
        <AppContent>{children}</AppContent>
      </ReactLenis>
    </AssetLoaderProvider>
  );
}
