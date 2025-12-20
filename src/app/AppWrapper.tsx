"use client";
import {
  domAnimation,
  LazyMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import ReactLenis from "lenis/react";
import React from "react";
import { getLenisOptions } from "@/utils/lenisConfig";
import GifCursor from "./components/GifCursor";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import ScrollTo from "./components/ScrollTo";
import { AssetLoaderProvider } from "./contexts/AssetLoaderContext";
import { useDevice } from "./contexts/DeviceContext";

function AppLogic({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const scrollToOpacity = useTransform(
    scrollYProgress,
    [0, 0.8, 0.95, 1],
    [1, 1, 0, 0],
  );

  return (
    <>
      <Preloader />
      {/* //todo: wait for design */}
      <GifCursor />
      {/* //todo: wait for design */}

      <Navbar />
      <ScrollTo opacity={scrollToOpacity} />
      <main className="relative w-full">{children}</main>
    </>
  );
}

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMobile } = useDevice();

  //? ใช้ useMemo เพื่อป้องกันการ create object ใหม่ทุกครั้งที่ re-render (Performance)
  const lenisOptions = React.useMemo(
    () => getLenisOptions(isMobile),
    [isMobile],
  );

  return (
    <AssetLoaderProvider>
      <ReactLenis root options={lenisOptions}>
        <LazyMotion features={domAnimation}>
          <AppLogic>{children}</AppLogic>
        </LazyMotion>
      </ReactLenis>
    </AssetLoaderProvider>
  );
}
