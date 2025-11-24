"use client";

import Hero from "./prologue/Hero";
import Navbar from "./components/ui/Navbar";
import { ReactLenis, useLenis } from "lenis/react";
import MouseFollower from "./components/ui/MouseFollower";
import Intro from "./prologue//Intro";
import IntoDark from "./prologue//IntoDark/IntoDark";
import ScrollTo from "./components/ui/ScrollTo";
import { useScroll, useTransform } from "framer-motion";
import { useEffect } from "react";
import StarryBackground from "./components/ui/StarryBackground";
import Preloader from "./components/ui/Preloader";
import Dreaming from "./prologue//Dreaming";
import JobApplication from "./prologue//JobApplication/JobApplication";
import Sleeping from "./prologue//Sleeping";
import Weighing from "./prologue//Weighing";

export default function Home() {
  const lenis = useLenis();
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [lenis]);

  const { scrollYProgress } = useScroll();

  const scrollToOpacity = useTransform(
    scrollYProgress,
    [0, 0.8, 0.95, 1],
    [1, 1, 0, 0],
  );

  return (
    <main className="relative flex flex-col justify-between h-full">
      <Preloader />
      <StarryBackground />

      <MouseFollower />
      <Navbar />
      <ScrollTo opacity={scrollToOpacity} />

      {/* Scene Intro */}
      <Hero />
      {/* <Intro /> 
      <JobApplication/>
      <Sleeping />
      <Dreaming />
      <Weighing />
      <IntoDark /> */}
    </main>
  );
}
