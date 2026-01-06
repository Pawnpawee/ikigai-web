"use client";

import { m, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { useUI } from "@/app/contexts/UIStarContext";
import GradientButton from "../button/GradientButton";
import WordByWordAnimation from "../text/WordByWordAnimation";

interface DecisionSectionProps {
  text: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  onPrimaryClick: () => void;
  onSecondaryClick?: () => void;
}

export default function DecisionSection({
  text,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
}: DecisionSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  const { setShowStars } = useUI();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const isDecisionSectionVisible = latest > 0;

    if (isDecisionSectionVisible) {
      setShowStars(true);
    } else {
      setShowStars(false);
    }
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center"
    >
      <m.div
        style={{ opacity }}
        className="flex flex-col items-center gap-12 px-4 text-center"
      >
        {/* Text Animation */}
        <WordByWordAnimation
          text={text}
          scrollYProgress={scrollYProgress} // ผูกกับ Scroll ให้ค่อยๆ ขึ้น
          as="h2"
          className="text-3xl portrait:text-xl leading-normal text-white max-w-3xs md:max-w-4xl"
        />

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          <GradientButton
            text={primaryButtonText} // ปุ่มไปต่อ
            isSelected={true}
            onClick={onPrimaryClick}
            variant="default"
          />
          {secondaryButtonText && (
            <GradientButton
              text={secondaryButtonText}
              isSelected={false}
              onClick={onSecondaryClick || (() => {})}
              variant="transparent"
            />
          )}
        </div>
      </m.div>
    </div>
  );
}
