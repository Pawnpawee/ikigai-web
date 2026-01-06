"use client";
import { m } from "framer-motion";
import { useAudio } from "@/app/contexts/AudioContext";

interface GradientButtonProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
  variant?: "default" | "white" | "transparent";
}

export default function GradientButton({
  text,
  isSelected,
  onClick,
  className = "",
  variant = "default",
}: GradientButtonProps) {
  const isWhiteVariant = variant === "white";
  const isTransparentVariant = variant === "transparent";
  const { playSfx } = useAudio();

  const handleClick = () => {
    playSfx("/assets/Sound/Pop Select Button.mp3");
    onClick();
  };

  const getButtonStyles = () => {
    if (isTransparentVariant) {
      return {
        border: "2px solid rgba(255, 255, 255, 1)",
        background: "rgba(255, 255, 255, 0)",
        boxShadow: "0 0 40px -20px var(--color-slate-100)",
      };
    }
    if (isWhiteVariant) {
      return {
        border: "4px solid var(--white-radial)",
        background: "var(--white-linear)",
        boxShadow: "0 0 40px -20px var(--color-slate-100)",
      };
    }
    // Default variant
    return {
      boxShadow: isSelected ? "0 0 40px -10px #CFD5DC" : "none",
    };
  };

  return (
    <m.button
      onClick={handleClick}
      className={`
        relative
        rounded-full
        px-14 py-4
        text-xl
        transition-all
        
        ${
          isTransparentVariant
            ? "text-white hover:bg-white/10 hover:border-white"
            : isWhiteVariant
            ? "text-black"
            : isSelected
            ? "bg-linear-to-b from-slate-200 to-slate-100 border-slate-200 text-black border-4"
            : "bg-linear-to-b from-slate-200/30 to-slate-100/30 border-slate-200/50 text-white border-4"
        }
        ${className}
      `}
      style={getButtonStyles()}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10 pointer-events-none">{text}</span>
    </m.button>
  );
}
