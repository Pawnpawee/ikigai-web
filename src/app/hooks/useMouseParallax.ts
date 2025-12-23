"use client";
import { useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function useMouseParallax() {
  const mouseX = useMotionValue(0.5); // เริ่มที่ตรงกลาง
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 50, stiffness: 400 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // คำนวณเป็น % (0 - 1)
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return { smoothMouseX, smoothMouseY };
}
