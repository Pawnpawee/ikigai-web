"use client";
import React, { useState, useEffect, FC } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const MouseFollower: FC = () => {
  // ⭐ ใช้ MotionValue เพื่อบายพาส React Render Cycle
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // ⭐ ใช้ useSpring เพื่อให้เมาส์มีความนุ่มนวล (Smooth) โดยไม่ต้องคำนวณเองใน useEffect
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isHoveringButton, setIsHoveringButton] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // ⭐ อัปเดตค่า MotionValue โดยตรง (Performance สูงมาก)
      mouseX.set(e.clientX - 20); // ลบ 20 เพื่อจัดกึ่งกลาง (ครึ่งของ width 40)
      mouseY.set(e.clientY - 20);

      const target = e.target as HTMLElement;
      if (target.closest(".btn")) {
        setIsHoveringButton(true);
      } else {
        setIsHoveringButton(false);
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter,
      );
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );
    };
  }, [mouseX, mouseY]); // ⭐ เพิ่ม dependencies

  const cursorVariants = {
    visible: {
      opacity: 1,
      scale: 1,
      boxShadow: `0 0 15px 5px var(--color-blue-200)`,
    },
    hidden: {
      opacity: 0,
      scale: 0,
    },
    onButton: {
      opacity: 0, // ซ่อน Cursor เมื่ออยู่บนปุ่ม (ตาม Logic เดิม)
      scale: 0.5,
    },
  };

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-9999"
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        x: springX, // ⭐ ผูกค่ากับ Spring MotionValue
        y: springY, // ⭐ ผูกค่ากับ Spring MotionValue
      }}
      variants={cursorVariants}
      animate={
        !isVisible ? "hidden" : isHoveringButton ? "onButton" : "visible"
      }
    />
  );
};

export default MouseFollower;
