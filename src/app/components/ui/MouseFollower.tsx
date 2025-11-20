"use client";
import React, { useState, useEffect, FC } from "react";
import { motion } from "framer-motion";


interface MousePosition {
  x: number;
  y: number;
}

const MouseFollower: FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  // State 1: สำหรับเช็คว่าเมาส์อยู่ในหน้าจอหรือไม่
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // State 2: สำหรับเช็คว่าเมาส์กำลังอยู่บนปุ่มหรือไม่
  const [isHoveringButton, setIsHoveringButton] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // อัปเดตตำแหน่งเมาส์เสมอ
      setMousePosition({ x: e.clientX, y: e.clientY });

      // เช็คว่า target ที่เมาส์ชี้อยู่มีคลาส 'btn' หรือไม่
      const target = e.target as HTMLElement;
      if (target.closest(".btn")) {
        setIsHoveringButton(true);
      } else {
        setIsHoveringButton(false);
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // เพิ่ม listener สำหรับการขยับ, เข้า, และออกจากหน้าจอ
    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, []);

  // สร้าง Variants เพื่อควบคุมสถานะต่างๆ ของแอนิเมชัน
  const cursorVariants = {
    visible: {
      // สถานะปกติ
      opacity: 1,
      scale: 1,
      boxShadow: `0 0 15px 5px var(--color-blue-200)`,
    },
    hidden: {
      // สถานะเมื่อเมาส์อยู่นอกจอ
      opacity: 0,
      scale: 0,
    },
    onButton: {
      // สถานะเมื่อเมาส์อยู่บนปุ่ม
      opacity: 0,
      scale: 0.5,
    },
  };

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-9999 w-[40px] h-[40px] rounded-full"
      style={{
        x: mousePosition.x - 20,
        y: mousePosition.y - 20,
      }}
      variants={cursorVariants}
      // เลือก variant ที่จะใช้ตามเงื่อนไขของ state
      animate={
        !isVisible ? "hidden" : isHoveringButton ? "onButton" : "visible"
      }
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 200,
        mass: 0.5,
      }}
    />
  );
};

export default MouseFollower;
