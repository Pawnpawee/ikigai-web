import type { MotionValue } from "framer-motion";
import { useMotionValueEvent } from "framer-motion";
import { useRef } from "react";
import { useUI } from "@/app/contexts/UIStarContext";

interface StarsVisibilityConfig {
  //? เงื่อนไขการ mount/unmount stars
  shouldShow: (progress: number) => boolean;
}

/**
 * Custom Hook สำหรับ mount/unmount Stars โดยอัตโนมัติตาม scroll
 * เมื่อ shouldShow คืน false → component จะถูก unmount ออกจาก DOM เพื่อหยุด Lottie loop
 * @param scrollYProgress - Motion value จาก useScroll
 * @param config - Configuration object
 * @example
 * useStarsVisibility(scrollYProgress, {
 *   shouldShow: (p) => p < 1
 * });
 */
export function useStarsVisibility(
  scrollYProgress: MotionValue<number>,
  config: StarsVisibilityConfig,
) {
  const { setShowStars } = useUI();
  const prevVisibilityRef = useRef<boolean | null>(null);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const shouldShowStars = config.shouldShow(latest);

    //! Guard: เช็คว่าค่าเปลี่ยนจริงๆ ถึงจะ update
    if (shouldShowStars !== prevVisibilityRef.current) {
      setShowStars(shouldShowStars);
      prevVisibilityRef.current = shouldShowStars;
    }
  });
}
