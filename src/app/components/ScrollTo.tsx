"use client";
import { type MotionValue, m } from "framer-motion";
import { HiArrowDown } from "react-icons/hi";
import { useDevice } from "@/app/contexts/DeviceContext";

interface ScrollToProps {
  opacity: MotionValue<number>;
}

export default function ScrollTo({ opacity }: ScrollToProps) {
  const { isMobile } = useDevice();
  return (
    <m.div
      className="box-border flex flex-col gap-2 items-center justify-center px-8 md:px-14 py-0 fixed bottom-[env(safe-area-inset-bottom)] z-50 w-screen h-[70px] md:h-[100px]"
      style={{ opacity }}
    >
      <div className="flex flex-col gap-0 items-center animate-fade-loop">
        <div className="flex gap-2 items-center relative shrink-0">
          <p className="text-base text-white">scroll to continue</p>
        </div>

        <div className="animate-bounce-slow">
          <HiArrowDown size={isMobile ? 20 : 30} className="text-white" />
        </div>
      </div>
    </m.div>
  );
}
