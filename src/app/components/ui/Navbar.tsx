"use client";
import React, { useState } from "react";
import Link from "next/link"; 
import { motion, MotionProps } from "framer-motion"; 
import Icon from "./Icon";
import MenuModal from "./MenuModal";
import MusicModal from "./MusicModal";

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

function NavbarIconButton({ className, iconSrc, label, onClick }: NavbarButtonProps) {
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

function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Go to homepage">
      <motion.img
        {...navItemMotionProps}
        src="/assets/Icon/logo.svg"
        alt="Logo - Go to Home" 
        className={`h-7 lg:h-8 ${className || ""}`}
      />
    </Link>
  );
}

export default function Navbar({ className }: NavbarTopProps) {
  const [isMusicModalOpen, setIsMusicModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  const handleMusicClick = () => {
    setIsMusicModalOpen(true);
  };

  const handleMenuClick = () => {
    setIsMenuModalOpen(true);
  };

  return (
    <>
      <div
        className={`box-border flex items-center justify-between px-8 lg:px-14 py-0 fixed top-0 z-50 w-screen h-[100px] ${
          className || ""
        }`} 
      >
        <NavbarIconButton
          className="btn"
          iconSrc="/assets/Icon/Music.svg"
          label="Toggle music player"
          onClick={handleMusicClick}
        />
        <Logo className="btn" />
        <NavbarIconButton
          className="btn"
          iconSrc="/assets/Icon/Menu.svg"
          label="Open menu"
          onClick={handleMenuClick}
        />
      </div>

      {/* Modals */}
      <MusicModal
        isOpen={isMusicModalOpen}
        onClose={() => setIsMusicModalOpen(false)}
      />
      <MenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
      />
    </>
  );
}