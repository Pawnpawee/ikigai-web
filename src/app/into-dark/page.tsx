// app/into-dark/page.tsx
"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { motion } from "framer-motion";

import MouseFollower from "../components/ui/MouseFollower";
import Navbar from "../components/ui/Navbar";
import IntoDark from "./IntoDark";

export default function IntoDarkPage() {
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
  }, [lenis]);

  return (
    <main className="relative bg-black min-h-screen">
      <MouseFollower />
      <Navbar />

      {/* Fade In Transition */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="fixed inset-0 z-99 pointer-events-none"
      />

      <IntoDark />
    </main>
  );
}
