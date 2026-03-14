"use client";
import { type MotionValue, m } from "framer-motion";
import { HiArrowDown, HiCheckCircle, HiLockClosed } from "react-icons/hi";
import { useDevice } from "@/app/contexts/DeviceContext";

interface ScrollToProps {
  opacity: MotionValue<number> | number;
  message?: string;
  tone?: "default" | "warning" | "success";
  icon?: "down" | "lock" | "check";
}

export default function ScrollTo({
  opacity,
  message = "เลื่อนต่อเพื่อดำเนินเรื่อง...",
  tone = "default",
  icon = "down",
}: ScrollToProps) {
  const { isMobile } = useDevice();

  const toneClasses =
    tone === "success"
      ? "text-emerald-100"
      : tone === "warning"
        ? "text-amber-100"
        : "text-white";

  const IconComponent =
    icon === "check"
      ? HiCheckCircle
      : icon === "lock"
        ? HiLockClosed
        : HiArrowDown;

  return (
    <m.div
      className="box-border flex flex-col gap-2 items-center justify-center px-8 md:px-14 py-0 fixed bottom-[env(safe-area-inset-bottom)] z-50 w-screen h-[70px] md:h-[100px] pointer-events-none"
      style={{ opacity }}
    >
      <div className="flex flex-col gap-0 items-center animate-fade-loop">
        <div className="flex gap-2 items-center relative shrink-0">
          <p className={`text-xs sm:text-sm md:text-base ${toneClasses}`}>
            {message}
          </p>
        </div>

        <div className={icon === "down" ? "animate-bounce-slow" : ""}>
          <IconComponent size={isMobile ? 20 : 30} className={toneClasses} />
        </div>
      </div>
    </m.div>
  );
}
