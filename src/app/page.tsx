"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import WelcomeSoundModal from "./components/modal/WelcomeSoundModal";
import EyelidOverlay from "./components/reusable/EyeLidOverlay";
import { useAudio } from "./contexts/AudioContext";
import Hero from "./prologue/Hero";

//? Dynamic import below-fold components เพื่อลด TBT
const Intro = dynamic(() => import("./prologue/Intro"));
const JobApplication = dynamic(() => import("./prologue/JobApplication"));
const Sleeping = dynamic(() => import("./prologue/Sleeping"));
const DecisionSection = dynamic(
  () => import("./components/reusable/DecisionSection"),
);

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
    "ถึงเวลาที่ต้อง 'ตื่น' แล้วล่ะ...",
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

      const text = sleepyTexts[nextIndex];
      setDecisionText(text);
      setSnoozeCount((prev) => prev + 1);

      //? คลิกครั้งที่ 2 = ข้อความสุดท้าย → ซ่อนปุ่ม บังคับตื่น
      if (nextIndex >= sleepyTexts.length - 1) {
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
