"use client";
import { m, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDevice } from "@/app/contexts/DeviceContext";

export default function GifCursor() {
  const { isMobile } = useDevice();

  // 1. Motion Values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  //? useRef เก็บค่า hover จริง + useState สำหรับ batch update
  const isHoverRef = useRef(false);
  const [isHover, setIsHover] = useState(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // เช็คว่า Hover ปุ่มไหม
      const target = e.target as HTMLElement;
      const hovering = !!target.closest(
        "button, a, input, textarea, [role='button'], .cursor-pointer",
      );

      //? อัปเดต React state เฉพาะเมื่อ hover เปลี่ยนจริง + throttle ด้วย rAF
      if (hovering !== isHoverRef.current) {
        isHoverRef.current = hovering;
        if (rafId.current) cancelAnimationFrame(rafId.current);
        rafId.current = requestAnimationFrame(() => {
          setIsHover(hovering);
        });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isMobile, mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <m.div
      className="fixed top-0 left-0 pointer-events-none z-9999"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: "-50%",
        translateY: "-35%",
      }}
      animate={{
        opacity: 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Image
        src={
          isHover
            ? "/assets/cursors/cursor-hover-w.svg"
            : "/assets/cursors/cursor.webp"
        }
        alt="Spirit Cursor"
        width={60}
        height={60}
        crossOrigin="anonymous"
        priority={true}
        unoptimized={true}
        className="pointer-events-none select-none"
      />
    </m.div>
  );
}
