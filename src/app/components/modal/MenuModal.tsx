import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { ChangeEvent } from "react";
import { useAudio } from "@/app/contexts/AudioContext";
import { getImgPath } from "@/utils/cloudinaryUtils";

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuModal({ isOpen, onClose }: MenuModalProps) {
  const { volume, sfxVolume, setVolume, setSfxVolume } = useAudio();

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
  };

  const handleSfxVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setSfxVolume(newVolume);
  };

  return (
    <>
      {isOpen && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 z-99"
            onClick={onClose}
          />

          {/* Modal */}
          <m.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex w-screen h-screen items-center justify-center z-100 fixed caret-transparent"
          >
            <div className="bg-[#1b1f21] flex flex-col items-center rounded-2xl md:rounded-4xl px-2.5 py-5 md:py-10 gap-5 md:gap-10">
              {/* Header */}
              <div className="flex items-center justify-center w-full gap-2.5 pl-16 pr-0">
                <h2 className="flex-1 text-xl md:text-3xl text-white text-center">
                  เมนู
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 hover:opacity-70 transition-opacity"
                  aria-label="ปิดเมนู"
                >
                  <Image
                    src={getImgPath("Icon/close.webp")}
                    alt="Close"
                    width={27}
                    height={27}
                    className="h-4 md:h-[27px] w-auto"
                  />
                </button>
              </div>

              {/* Volume Controls Section */}
              <div className="flex flex-col gap-5 md:gap-10 px-4 md:px-9 w-full">
                {/* SFX Volume (เอฟเฟกต์) */}
                <div className="flex flex-col gap-2.5">
                  <p className="text-lg md:text-2xl text-white">
                    ระดับเสียงเอฟเฟกต์
                  </p>
                  <div className="flex items-center gap-7.5">
                    <Image
                      src={getImgPath("Icon/mute_icon.webp")}
                      alt="Mute"
                      width={27}
                      height={37}
                      className="h-5 md:h-[37px] w-auto"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sfxVolume}
                      onChange={handleSfxVolumeChange}
                      className="flex-1 h-1.5 appearance-none rounded-full
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:w-6
                        [&::-webkit-slider-thumb]:h-6
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:bg-white
                        [&::-webkit-slider-thumb]:
                        [&::-webkit-slider-thumb]:border-2
                        [&::-webkit-slider-thumb]:border-white
                        [&::-moz-range-thumb]:w-6
                        [&::-moz-range-thumb]:h-6
                        [&::-moz-range-thumb]:rounded-full
                        [&::-moz-range-thumb]:bg-white
                        [&::-moz-range-thumb]:
                        [&::-moz-range-thumb]:border-2
                        [&::-moz-range-thumb]:border-white
                        [&::-webkit-slider-runnable-track]:h-6
                        [&::-webkit-slider-runnable-track]:rounded-full
                        [&::-moz-range-track]:h-6
                        [&::-moz-range-track]:rounded-full"
                      style={{
                        background: `linear-gradient(to right, #FF6B6B 0%, #FF6B6B ${sfxVolume}%, #5A6268 ${sfxVolume}%, #5A6268 100%)`,
                      }}
                    />
                    <Image
                      src={getImgPath("Icon/unmute_icon.webp")}
                      alt="Unmute"
                      width={43}
                      height={37}
                      className="h-5 md:h-[37px] w-auto"
                    />
                  </div>
                </div>

                {/* Background Music Volume (ประกอบ) */}
                <div className="flex flex-col gap-2.5">
                  <p className="text-lg md:text-2xl text-white">
                    ระดับเสียงประกอบ
                  </p>
                  <div className="flex items-center gap-7.5">
                    <Image
                      src={getImgPath("Icon/mute_icon.webp")}
                      alt="Mute"
                      width={27}
                      height={37}
                      className="h-5 md:h-[37px] w-auto"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="flex-1 h-1.5 appearance-none  rounded-full
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:w-6
                        [&::-webkit-slider-thumb]:h-6
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:bg-white
                        [&::-webkit-slider-thumb]:
                        [&::-webkit-slider-thumb]:border-2
                        [&::-webkit-slider-thumb]:border-white
                        [&::-moz-range-thumb]:w-6
                        [&::-moz-range-thumb]:h-6
                        [&::-moz-range-thumb]:rounded-full
                        [&::-moz-range-thumb]:bg-white
                        [&::-moz-range-thumb]:
                        [&::-moz-range-thumb]:border-2
                        [&::-moz-range-thumb]:border-white
                        [&::-webkit-slider-runnable-track]:h-6
                        [&::-webkit-slider-runnable-track]:rounded-full
                        [&::-moz-range-track]:h-
                        [&::-moz-range-track]:rounded-full"
                      style={{
                        background: `linear-gradient(to right, #4A9EFF 0%, #4A9EFF ${volume}%, #5A6268 ${volume}%, #5A6268 100%)`,
                      }}
                    />
                    <Image
                      src={getImgPath("Icon/unmute_icon.webp")}
                      alt="Unmute"
                      width={43}
                      height={37}
                      className="h-5 md:h-[37px] w-auto"
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-[#4a5157]" />

                {/* About */}
                <Link href="/about" onClick={onClose}>
                  <m.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="bg-[#363e43] hover:bg-[#404a50] rounded-2xl p-4 md:p-8 flex items-center justify-between transition-colors "
                  >
                    <div className="flex items-center gap-5 md:gap-[45px]">
                      <Image
                        src={getImgPath("Icon/person_icon.webp")}
                        alt="About"
                        width={47}
                        height={47}
                        className="h-[25px] md:h-14 w-auto"
                      />
                      <div className="flex flex-col px-2.5">
                        <p className="text-base md:text-xl text-white">
                          เกี่ยวกับเรา
                        </p>
                        <p className="text-sm md:text-lg text-white">
                          ข้อมูลและติดต่อ
                        </p>
                      </div>
                    </div>
                    <Image
                      src={getImgPath("Icon/next_btn.webp")}
                      alt="Next"
                      width={19}
                      height={25}
                      className="h-[13px] md:h-[25px] w-auto"
                    />
                  </m.div>
                </Link>
              </div>
            </div>
          </m.div>
        </>
      )}
    </>
  );
}
