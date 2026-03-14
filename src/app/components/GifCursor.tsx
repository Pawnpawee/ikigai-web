"use client";
import { m, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDevice } from "@/app/contexts/DeviceContext";

export default function GifCursor() {
  const { isMobile } = useDevice();
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      // ✅ เมาส์จริงอยู่ตรงไหน อัปเดตพิกัดตามนั้น
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

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
      className="fixed top-0 left-0 pointer-events-none z-999"
      style={{
        x: mouseX,
        y: mouseY,
      }}
      animate={{ opacity: 1 }}
      // ลด Damping ลงนิดหน่อยเพื่อให้เมาส์ตามติดมือไวขึ้น (ลดความหน่วง)
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
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
        priority={true}
        unoptimized={true}
        className="pointer-events-none select-none -translate-x-[15px] -translate-y-[15px]"
      />
    </m.div>
  );
}
