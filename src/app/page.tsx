"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import WelcomeSoundModal from "./components/modal/WelcomeSoundModal";
import DecisionSection from "./components/reusable/DecisionSection";
import EyelidOverlay from "./components/reusable/EyeLidOverlay";
import { useAudio } from "./contexts/AudioContext";
import Hero from "./prologue/Hero";
import Intro from "./prologue/Intro";
import JobApplication from "./prologue/JobApplication";
import Sleeping from "./prologue/Sleeping";

export default function Home() {
  const router = useRouter();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const { start, stop } = useAudio();

  const [shouldAnimate, setShouldAnimate] = useState(false);

  //? ควบคุม Modal
  useEffect(() => {
    const hasSettings = localStorage.getItem("audioSettings");

    if (!hasSettings) {
      setShowWelcomeModal(true);
    } else {
      setShouldAnimate(true);
    }
  }, []);

  const handleAcceptSoundModal = () => {
    setShowWelcomeModal(false);
    start();
    setShouldAnimate(true);
  };

  const handleDeclineSoundModal = () => {
    setShowWelcomeModal(false);
    stop();
    setShouldAnimate(true);
  };

  const sleepyTexts = [
    "งั้นอีก 5 นาทีนะ...",
    "ฝันนี้ยังดีอยู่เลยหรอ...",
    "โลกความจริงมันเหนื่อยสินะ...",
    "ZZZzzz...",
  ];
  const [snoozeCount, setSnoozeCount] = useState(0);
  const [secondaryBtnText, setSecondaryBtnText] = useState<string | null>(
    "ยังก่อน",
  );
  const [isSnoozing, setIsSnoozing] = useState(false);
  const [decisionText, setDecisionText] = useState(
    "คุณนอนหลับมาพักนึงแล้ว อยากตื่นขึ้นเลยไหม",
  );

  const handleStayAsleep = () => {
    // เริ่ม Effect ตาปรือ
    setIsSnoozing(true);

    setTimeout(() => {
      const nextIndex = snoozeCount;

      //? เช็คว่ายังมีข้อความเหลือไหม?
      if (nextIndex < sleepyTexts.length) {
        setDecisionText(sleepyTexts[nextIndex]);
        setSnoozeCount((prev) => prev + 1);
      } else {
        //? ข้อความหมดแล้ว บังคับตื่น
        setDecisionText("ถึงเวลาที่ต้อง 'ตื่น' แล้วล่ะ...");
        setSecondaryBtnText(null);
      }

      // จบ Effect ตาปรือ
      setIsSnoozing(false);
    }, 1000); // รอให้ Effect มืดสนิทก่อนค่อยเปลี่ยนข้อความ
  };

  const handleWakeUp = () => {
    router.push("/prologue/dreaming");
  };

  return (
    <div>
      <WelcomeSoundModal
        isOpen={showWelcomeModal}
        onAccept={handleAcceptSoundModal}
        onDecline={handleDeclineSoundModal}
      />
      {/* //todo: wait for design */}

      <Hero shouldAnimate={shouldAnimate} />
      <Intro />
      <JobApplication />
      <Sleeping />
      <DecisionSection
        text={decisionText}
        primaryButtonText="ตื่นเลย"
        secondaryButtonText={secondaryBtnText as string}
        onPrimaryClick={handleWakeUp}
        onSecondaryClick={handleStayAsleep}
      />

      <EyelidOverlay isSnoozing={isSnoozing} />
    </div>
  );
}
