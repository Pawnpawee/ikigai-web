"use client";

import Hero from "./prologue/Hero";
import Intro from "./prologue//Intro";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAudio } from "./contexts/AudioContext";
import { useAssetLoader } from "./contexts/AssetLoaderContext";
import WelcomeSoundModal from "./components/modal/WelcomeSoundModal";


export default function Home() {
  const router = useRouter();

  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const { start, stop } = useAudio();

  const { isLoading } = useAssetLoader();

  const [shouldAnimate, setShouldAnimate] = useState(false);

  //? ควบคุม Modal
  useEffect(() => {
    const hasSettings = localStorage.getItem("audioSettings");

    if (!hasSettings) {
      setShowWelcomeModal(true);
    } else {
      if (!isLoading) setShouldAnimate(true);
    }
  }, [isLoading]);

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

  const handleWakeUp = async () => {
    setTimeout(() => {
      router.push("/dreaming");
    }, 1000);
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

    </div>
  );
}
