"use client";
import { motion } from "framer-motion";

interface GradientButtonProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

export default function GradientButton({
  text,
  isSelected,
  onClick,
  className = "",
}: GradientButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        relative
        rounded-full
        border-4
        px-14 py-4
        typo-text-h4
        transition-all
        ${
          isSelected
            ? "bg-linear-to-b from-slate-200 to-slate-100 border-slate-200 text-black"
            : "bg-linear-to-b from-slate-200/30 to-slate-100/30 border-slate-200/50 text-white"
        }
        ${className}
      `}
      style={{
        boxShadow: isSelected ? "0 0 60px -10px #CFD5DC" : "none",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">{text}</span>
    </motion.button>
  );
}
