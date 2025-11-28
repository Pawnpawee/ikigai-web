"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import WordByWordAnimation from "@/app/components/ui/WordByWordAnimation";
import GradientButton from "@/app/components/ui/GradientButton";

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

  // Fade In เมื่อ Scroll มาถึง
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center"
    >
      <motion.div
        style={{ opacity }}
        className="flex flex-col items-center gap-12 px-4 text-center"
      >
        {/* Text Animation */}
        <WordByWordAnimation
          text={text}
          scrollYProgress={scrollYProgress} // ผูกกับ Scroll ให้ค่อยๆ ขึ้น
          as="h2"
          className="typo-text-h3 text-white max-w-4xl leading-relaxed"
        />

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          <GradientButton
            text={primaryButtonText} // ปุ่มไปต่อ
            isSelected={true}
            onClick={onPrimaryClick}
            variant="default"
          />
          <GradientButton
            text={secondaryButtonText} // ปุ่มปฏิเสธ
            isSelected={false}
            onClick={onSecondaryClick || (() => {})}
            variant="transparent" // ใช้สีขาวเพื่อให้ดูเป็นตัวเลือกรอง
          />
        </div>
      </motion.div>
    </div>
  );
}