"use client";
import React, { useState } from "react";
import { motion, MotionProps } from "framer-motion";
import Icon from "./Icon";
import MenuModal from "./MenuModal";
import { useAudio } from "@/app/contexts/AudioContext";

export interface NavbarTopProps {
  className?: string;
}

const navItemMotionProps: MotionProps = {
  initial: {
    filter: "drop-shadow(0 0 0px rgba(0, 0, 0, 0))",
    opacity: 0.8,
    y: 3,
  },
  whileHover: {
    filter: `drop-shadow(0 0 1px var(--color-blue-200))`,
    opacity: 1,
    y: 0,
  },
  transition: { type: "spring", stiffness: 300, damping: 15 },
};

interface NavbarButtonProps {
  className?: string;
  iconSrc: string;
  label: string;
  onClick?: () => void;
}

function NavbarIconButton({
  className,
  iconSrc,
  label,
  onClick,
}: NavbarButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={className}
      data-name={label.toLowerCase().replace(" ", "-")}
      {...navItemMotionProps}
    >
      <Icon
        src={iconSrc}
        alt={label}
        size={50}
        className="relative shrink-0 w-10 lg:w-[50px]"
      />
    </motion.button>
  );
}

export default function Navbar({ className }: NavbarTopProps) {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const { isMuted, setIsMuted } = useAudio();
  const musicIcon = isMuted
    ? "/assets/Icon/mute.svg"
    : "/assets/Icon/music.svg";

  const handleMusicClick = () => {
    setIsMuted(!isMuted);
  };

  const handleMenuClick = () => {
    setIsMenuModalOpen(true);
  };

  return (
    <>
      <div
        className={`box-border flex items-center justify-between px-8 lg:px-14 py-0 fixed top-0 z-50 w-screen h-[100px] pointer-events-none${
          className || ""
        }`}
      >
        <div className="pointer-events-auto"> 
            <NavbarIconButton
            className="btn" 
            iconSrc={musicIcon}
            label={isMuted ? "Unmute music" : "Mute music"}
            onClick={handleMusicClick}
            />
        </div>

        {/* Menu Button */}
        <div className="pointer-events-auto"> 
            <NavbarIconButton
            className="btn"
            iconSrc="/assets/Icon/menu.svg"
            label="Open menu"
            onClick={handleMenuClick}
            />
        </div>
      </div>

      {/* Menu Modal */}
      <MenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
      />
    </>
  );
}
