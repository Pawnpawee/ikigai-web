"use client";
import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface MysteriousTextProps {
  text: string;
  scrollYProgress: MotionValue<number>;
  startProgress: number; // เมื่อไรเริ่มแสดง (เช่น 0.714)
  endProgress: number; // เมื่อไรแสดงครบ (เช่น 0.857)
  className?: string;
}

export default function MysteriousText({ 
  text, 
  scrollYProgress, 
  startProgress, 
  endProgress,
  className = "" 
}: MysteriousTextProps) {
  // ใช้ Intl.Segmenter เพื่อแบ่ง grapheme clusters ที่ถูกต้อง (รวมสระกับพยัญชนะ)
  const segmenter = new Intl.Segmenter("th", { granularity: "grapheme" });
  const characters = [...segmenter.segment(text)].map(segment => segment.segment);
  const totalChars = characters.length;

  return (
    <div className={`select-none ${className}`}>
      {characters.map((char, index) => {
        // คำนวณช่วง progress สำหรับแต่ละตัวอักษร
        const charStart = startProgress + ((endProgress - startProgress) * index / totalChars);
        const charEnd = startProgress + ((endProgress - startProgress) * (index + 1) / totalChars);
        
        const charOpacity = useTransform(
          scrollYProgress,
          [charStart, charEnd],
          [0, 1]
        );
        
        const charY = useTransform(
          scrollYProgress,
          [charStart, charEnd],
          [20, 0]
        );

        return (
          <motion.span
            key={index}
            style={{ 
              opacity: charOpacity,
              y: charY,
              display: "inline-block", 
              whiteSpace: char === " " ? "pre" : "normal" 
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </div>
  );
}
