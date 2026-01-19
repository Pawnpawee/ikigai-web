import type { MotionValue } from "framer-motion";
import { useMotionValueEvent } from "framer-motion";
import { useRef } from "react";
import { useUI } from "@/app/contexts/UIStarContext";

interface StarsVisibilityConfig {
  //? เงื่อนไขการแสดง/ซ่อน stars
  shouldShow: (progress: number) => boolean;
}

/**
 * Custom Hook สำหรับจัดการการแสดง/ซ่อน Stars โดยอัตโนมัติ
 * @param scrollYProgress - Motion value จาก useScroll
 * @param config - Configuration object
 * @example
 * // Show stars when scrollYProgress < 1
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
