"use client";
import { m } from "framer-motion";
import { useEffect, useState } from "react";
import { useAudio } from "@/app/contexts/AudioContext";
import { getAudioUrl } from "@/utils/cloudinaryUtils";

interface GradientButtonProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
  variant?: "default" | "white" | "transparent";
  disabled?: boolean; //? เพิ่ม prop disabled เป็น optional
  children?: React.ReactNode; //? เพิ่ม children เพื่อรับ icon หรือ element อื่นๆ
}

export default function GradientButton({
  text,
  isSelected,
  onClick,
  className = "",
  variant = "default",
  disabled = false, //* กำหนด Default value เป็น false
  children, //? รับ children
}: GradientButtonProps) {
  const isWhiteVariant = variant === "white";
  const isTransparentVariant = variant === "transparent";
  const { playSfx } = useAudio();
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateCanHover = () => {
      setCanHover(mediaQuery.matches);
    };

    updateCanHover();
    mediaQuery.addEventListener("change", updateCanHover);

    return () => {
      mediaQuery.removeEventListener("change", updateCanHover);
    };
  }, []);

  const handleClick = () => {
    // หาก disabled เป็น true ให้ return ออกทันที ไม่เล่นเสียงและไม่เรียก onClick
    if (disabled) return;

    playSfx(getAudioUrl("Sound/Pop_Select_Button.mp3"));
    onClick();
  };

  const getButtonStyles = () => {
    //? ถ้า disabled ให้ลด Opacity ลง แต่ยังคงโครงสร้างเดิมไว้
    const baseStyle = {
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? "not-allowed" : "pointer",
    };

    if (isTransparentVariant) {
      return {
        ...baseStyle,
        border: "2px solid rgba(255, 255, 255, 1)",
        background: "rgba(255, 255, 255, 0)",
      };
    }
    if (isWhiteVariant) {
      return {
        ...baseStyle,
        border: "4px solid var(--white-radial)",
        background: "var(--white-linear)",
      };
    }
    // Default variant
    return {
      ...baseStyle,
    };
  };

  return (
    <m.button
      onClick={handleClick}
      //? เพิ่ม aria-disabled เพื่อ Accessibility (a11y)
      aria-disabled={disabled}
      disabled={disabled}
      className={`
        relative
        rounded-full
        px-6 py-2
        md:px-14 md:py-4
        text-lg md:text-2xl
        transition-all
        caret-transparent
        
        ${
          isTransparentVariant
            ? "text-white hover:bg-white/10 hover:border-white"
            : isWhiteVariant
              ? "text-black"
              : isSelected
                ? "bg-linear-to-b from-slate-200 to-slate-100 border-slate-200 text-black border-2 md:border-4"
                : "bg-linear-to-b from-slate-200/30 to-slate-100/30 border-slate-200/50 text-white border-2 md:border-4"
        }
        ${className}
        ${disabled ? "grayscale pointer-events-none md:shadow-none" : ""}
        ${!disabled && (isWhiteVariant || isSelected) ? "[box-shadow:0_0_20px_-10px_#CFD5DC] xl:[box-shadow:0_0_40px_-10px_#CFD5DC]" : ""} 
      `}
      style={getButtonStyles()}
      //? ปิด Animation เมื่อ disabled เพื่อ Performance และ UX
      whileHover={disabled || !canHover ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
    >
      <span className="relative z-10 pointer-events-none flex items-center justify-center gap-2">
        {text}
        {children}
      </span>
    </m.button>
  );
}
