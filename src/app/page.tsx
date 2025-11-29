"use client";

import Hero from "./prologue/Hero";
import Navbar from "./components/ui/Navbar";
import { ReactLenis, useLenis } from "lenis/react";
import MouseFollower from "./components/ui/MouseFollower";
import Intro from "./prologue//Intro";
import ScrollTo from "./components/ui/ScrollTo";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import Preloader from "./components/ui/Preloader";
import JobApplication from "./prologue//JobApplication/JobApplication";
import Sleeping from "./prologue//Sleeping";
import DecisionSection from "./components/scene/DecisionSection";
import { useRouter } from "next/navigation";
import { useAudio } from "./contexts/AudioContext";

export default function Home() {
  const router = useRouter();
  const lenis = useLenis();
  const { pauseBgMusic } = useAudio();
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [lenis]);

  const { scrollYProgress } = useScroll();

  const scrollToOpacity = useTransform(
    scrollYProgress,
    [0, 0.8, 0.95, 1],
    [1, 1, 0, 0]
  );

  const handleWakeUp = async () => {
    setIsTransitioning(true);
    
    // Fade out background music (1 วินาที)
    pauseBgMusic();
    
    // รอให้ fade out เสร็จก่อนเปลี่ยนหน้า
    setTimeout(() => {
      router.push("/dreaming"); // ⭐ ไป Route ใหม่
    }, 1000);
  };

  return (
    <main className="relative flex flex-col justify-between h-full ">
      <Preloader />

      <MouseFollower />
      <Navbar />
      <ScrollTo opacity={scrollToOpacity} />

      {/* Scene Intro */}
      <Hero />
      <Intro />
      <JobApplication />
      <Sleeping />
      {/* ⭐ ส่วนตัดสินใจ 1: ตื่นหรือไม่ */}
      <DecisionSection
        text="คุณหลับมาพักนึงแล้ว อยากตื่นขึ้นเลยไหม"
        primaryButtonText="ตื่นเลย"
        secondaryButtonText="ยังก่อน"
        onPrimaryClick={handleWakeUp}
      />

      {/* Transition Overlay (ม่านดำสำหรับเปลี่ยนหน้า) */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-20 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </main>
  );
}
