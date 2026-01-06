"use client";

import { type MotionValue, motion, useTransform } from "framer-motion";

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
  className = "",
}: MysteriousTextProps) {
  // แยกข้อความตาม \n
  const lines = text.split("\n");

  // ใช้ Intl.Segmenter เพื่อแบ่ง grapheme clusters ที่ถูกต้อง (รวมสระกับพยัญชนะ)
  const segmenter = new Intl.Segmenter("th", { granularity: "grapheme" });

  // นับจำนวนตัวอักษรทั้งหมด (รวมทุกบรรทัด)
  const totalChars = text.replace(/\n/g, "").length;
  let charIndex = 0;

  return (
    <span className={`select-none ${className}`}>
      {lines.map((line, lineIndex) => {
        const characters = [...segmenter.segment(line)].map(
          (segment) => segment.segment,
        );

        return (
          <span key={`line-${lineIndex}-${line}`}>
            {characters.map((char) => {
              // คำนวณช่วง progress สำหรับแต่ละตัวอักษรตามลำดับทั้งหมด
              const charStart =
                startProgress +
                ((endProgress - startProgress) * charIndex) / totalChars;
              const charEnd =
                startProgress +
                ((endProgress - startProgress) * (charIndex + 1)) / totalChars;
              const currentCharIndex = charIndex;
              charIndex++;

              const charOpacity = useTransform(
                scrollYProgress,
                [charStart, charEnd],
                [0, 1],
              );

              const charY = useTransform(
                scrollYProgress,
                [charStart, charEnd],
                [20, 0],
              );

              return (
                <motion.span
                  key={`char-${currentCharIndex}`}
                  style={{
                    opacity: charOpacity,
                    y: charY,
                    display: "inline-block",
                    whiteSpace: char === " " ? "pre" : "normal",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              );
            })}
            {lineIndex < lines.length - 1 && <br />}
          </span>
        );
      })}
    </span>
  );
}
