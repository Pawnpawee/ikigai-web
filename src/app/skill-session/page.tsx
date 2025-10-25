"use client";

import ReactLenis, { useLenis } from "lenis/react";
import { useEffect } from "react";
import MouseFollower from "../components/ui/MouseFollower";
import Navbar from "../components/ui/Navbar";
import SkillSessionContainer from "./components/SkillSessionContainer";

export default function SkillSessionPage() {
  const lenis = useLenis();

  // Ensure page starts at the top on refresh
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [lenis]);

  return (
    <main>
      <ReactLenis root options={{ lerp: 0.05 }}>
        <MouseFollower />
        <SkillSessionContainer />
        <Navbar />
      </ReactLenis>
    </main>
  );
}