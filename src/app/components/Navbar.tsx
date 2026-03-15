"use client";
import { useState } from "react";
import { useAudio } from "@/app/contexts/AudioContext";
import { useDevice } from "@/app/contexts/DeviceContext";
import MenuModal from "./modal/MenuModal";
import Icon from "./reusable/Icon";

export default function Navbar() {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  const { isMuted, start, stop } = useAudio();

  const { isMobile } = useDevice();

  const musicIcon = isMuted
    ? "/assets/icons/mute.svg"
    : "/assets/icons/music.svg";

  const handleMusicClick = () => {
    if (isMuted) {
      start(); // ถ้าเงียบอยู่ -> ให้เริ่มเล่น (Unmute & Play)
    } else {
      stop(); // ถ้าเล่นอยู่ -> ให้หยุด (Mute & Pause)
    }
  };

  const handleMenuClick = () => {
    setIsMenuModalOpen(true);
  };

  return (
    <>
      <div className="box-border flex items-center justify-between px-8 md:px-14 py-0 fixed top-0 z-99 w-screen h-[70px] md:h-[100px] pointer-events-none">
        <div className="pointer-events-auto">
          <Icon
            src={musicIcon}
            label={isMuted ? "Unmute music" : "Mute music"}
            size={isMobile ? 40 : 50}
            onClick={handleMusicClick}
            withHoverEffect
          />
        </div>

        {/* Menu Button */}
        <div className="pointer-events-auto">
          <Icon
            src="/assets/icons/menu.svg"
            label="Open menu"
            size={isMobile ? 40 : 50}
            onClick={handleMenuClick}
            withHoverEffect
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
