"use client";
import { m, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDevice } from "@/app/contexts/DeviceContext";

export default function GifCursor() {
  const { isMobile } = useDevice();

  // 1. Motion Values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 3. State สำหรับเช็ค Hover
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // เช็คว่า Hover ปุ่มไหม
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(
        "button, a, input, textarea, [role='button'], .cursor-pointer",
      );
      setIsHover(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [isMobile, mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <m.div
      className="fixed top-0 left-0 pointer-events-none z-9999 mix-blend-screen"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: "-50%", // จัดให้อยู่กึ่งกลางเมาส์
        translateY: "-50%",
      }}
      animate={{
        scale: isHover ? 1.5 : 1, // ขยายเมื่อ Hover
        opacity: 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Image
        src="/assets/cursors/blue-spirit.gif"
        alt="Spirit Cursor"
        width={64}
        height={64}
        priority={true}
        unoptimized={true}
        className="pointer-events-none select-none"
      />
    </m.div>
  );
}
