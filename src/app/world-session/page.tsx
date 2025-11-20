"use client";

import ReactLenis, { useLenis } from "lenis/react";
import { useEffect } from "react";
import MouseFollower from "../components/ui/MouseFollower";
import Navbar from "../components/ui/Navbar";
import WorldSessionContainer from "./components/WorldSessionContainer";

export default function WorldSessionPage() {
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
        <WorldSessionContainer />
        <Navbar />
      </ReactLenis>
    </main>
  );
}
