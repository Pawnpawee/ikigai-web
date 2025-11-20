"use client";

import ReactLenis, { useLenis } from "lenis/react";
import LoveSessionContainer from "./components/LoveSessionContainer";
import MouseFollower from "../components/ui/MouseFollower";
import Navbar from "../components/ui/Navbar";
import { useEffect } from "react";

export default function LoveSessionPage() {
  const lenis = useLenis();
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [lenis]);
  return (
    <main>
      <ReactLenis root options={{ lerp: 0.05 }}>
        <MouseFollower />
        <LoveSessionContainer />
        <Navbar />
      </ReactLenis>
    </main>
  );
}
