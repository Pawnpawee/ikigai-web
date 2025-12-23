"use client";

import { useEffect, useState } from "react";
import WelcomeSoundModal from "./components/modal/WelcomeSoundModal";
import { useAudio } from "./contexts/AudioContext";
import Hero from "./prologue/Hero";
import Intro from "./prologue/Intro";
import JobApplication from "./prologue/JobApplication";
import Sleeping from "./prologue/Sleeping";

export default function Home() {
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
    </div>
  );
}
