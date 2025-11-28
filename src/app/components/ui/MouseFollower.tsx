"use client";
import React, { useState, useEffect, FC, useRef } from "react";
import { motion, useMotionValue, useSpring, Variants } from "framer-motion";

const MouseFollower: FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // 1. Spring Config: ปรับให้เมาส์ตามมือไวขึ้นนิดนึง (ลด damping) เพื่อความกระชับ
  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // ❌ ลบส่วน Velocity/Stretch/Angle ออกทั้งหมด เพื่อให้วงกลมไม่เบี้ยว

  const [isHoveringButton, setIsHoveringButton] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // ⭐ Function สร้างละอองดาว
  const createSparkle = (x: number, y: number) => {
    const sparkle = document.createElement("span");
    // เพิ่มตัวเลือกสัญลักษณ์ให้หลากหลายขึ้น
    const shapes = ["✦", "★", "●", "•", "✨", "｡"];
    sparkle.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];

    sparkle.style.position = "fixed";
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.pointerEvents = "none";
    sparkle.style.zIndex = "9998";

    // สุ่มขนาดให้มีเล็กมีใหญ่ (2px - 12px)
    const size = Math.random() * 10 + 2 + "px";
    sparkle.style.fontSize = size;
    // สุ่มสี ขาว หรือ ทอง หรือ ใสๆ
    sparkle.style.color = Math.random() > 0.3 ? "white" : "#FFD700";
    sparkle.style.textShadow = "0 0 4px rgba(255, 255, 255, 0.9)";
    sparkle.style.opacity = "0.8";

    document.body.appendChild(sparkle);

    // Animation: ให้ตกแบบกระจายตัว (Spray)
    const destX = (Math.random() - 0.5) * 60; // กระจายออกข้างกว้างขึ้น
    const destY = Math.random() * 60 + 20; // ตกลงข้างล่าง

    const animation = sparkle.animate(
      [
        { transform: `translate(0, 0) scale(1) rotate(0deg)`, opacity: 0.8 },
        {
          transform: `translate(${destX}px, ${destY}px) scale(0) rotate(${Math.random() * 360}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: Math.random() * 600 + 400, // ความเร็วในการตกหลากหลาย
        easing: "cubic-bezier(0, .9, .57, 1)",
      },
    );

    animation.onfinish = () => sparkle.remove();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Center เมาส์ (ถ้าขนาด default 30px ลบ 15)
      mouseX.set(e.clientX - 15);
      mouseY.set(e.clientY - 15);

      const dist = Math.sqrt(
        Math.pow(e.clientX - lastMousePos.current.x, 2) +
          Math.pow(e.clientY - lastMousePos.current.y, 2),
      );

      // ⭐ แก้ไขตรงนี้: ลดระยะ Threshold จาก 30 เหลือ 3 px
      // ยิ่งเลขน้อย ยิ่งปล่อยดาวออกมาถี่ (ตกเยอะขึ้น)
      if (dist > 20) {
        // ปล่อยดาว 1-2 ดวงต่อรอบ เพื่อความหนาแน่น
        const count = Math.random() > 0.5 ? 2 : 1;

        for (let i = 0; i < count; i++) {
          // Random ตำแหน่งรอบๆ เมาส์นิดหน่อย ไม่ให้เป็นเส้นตรงเป๊ะ
          const offsetX = (Math.random() - 0.5) * 20;
          const offsetY = (Math.random() - 0.5) * 20;
          createSparkle(e.clientX + offsetX, e.clientY + offsetY);
        }

        lastMousePos.current = { x: e.clientX, y: e.clientY };
      }

      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest(".cursor-pointer");

      setIsHoveringButton(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter,
      );
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );
    };
  }, [mouseX, mouseY]);

  const cursorVariants: Variants = {
    default: {
      width: 30,
      height: 30,
      x: 0,
      y: 0,
      backgroundColor: "#FFF",
      boxShadow:
        "0 0 15px 2px rgba(255, 255, 255, 0.6), 0 0 30px 5px rgba(255, 255, 255, 0.3), 0 0 50px 10px rgba(255, 255, 255, 0.1)",
      mixBlendMode: "normal",
      opacity: 1,
    },
    hover: {
      width: 80,
      height: 80,
      x: -25,
      y: -25,
      backgroundColor: "transparent",
      boxShadow:
        "0 0 15px 2px rgba(255, 255, 255, 0.6), 0 0 30px 5px rgba(255, 255, 255, 0.3), 0 0 50px 10px rgba(255, 255, 255, 0.1)",
      mixBlendMode: "difference",
      opacity: 1,
    },
    clicked: {
      scale: 0.9,
      width: isHoveringButton ? 70 : 25,
      height: isHoveringButton ? 70 : 25,
      transition: { duration: 0.1 },
    },
    hidden: {
      opacity: 0,
      scale: 0,
    },
  };

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{
        x: springX,
        y: springY,
        willChange: "transform",
      }}
    >
      <motion.div
        className="rounded-full"
        variants={cursorVariants}
        animate={
          !isVisible
            ? "hidden"
            : isClicked
              ? "clicked"
              : isHoveringButton
                ? "hover"
                : "default"
        }
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
        // ❌ เอา scaleX, scaleY, rotate ออกเพื่อให้คงรูปวงกลม
      />
    </motion.div>
  );
};

export default MouseFollower;
