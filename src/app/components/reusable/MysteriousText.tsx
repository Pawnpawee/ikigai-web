"use client";

import { type MotionValue, motion, useTransform } from "framer-motion";
import { useMemo } from "react";

interface MysteriousTextProps {
  text: string;
  scrollYProgress: MotionValue<number>;
  startProgress: number; // เมื่อไรเริ่มแสดง (เช่น 0.714)
  endProgress: number; // เมื่อไรแสดงครบ (เช่น 0.857)
  className?: string;
}

//? Child Component สำหรับแต่ละตัวอักษร - เพื่อให้เรียก useTransform ได้อย่างปลอดภัย
function AnimatedChar({
  char,
  scrollYProgress,
  charStart,
  charEnd,
}: {
  char: string;
  scrollYProgress: MotionValue<number>;
  charStart: number;
  charEnd: number;
}) {
  //? ขยายช่วงเวลาการ transition ให้นานขึ้น เพื่อให้ดูลึกลับและช้าลง
  const transitionDuration = (charEnd - charStart) * 2.5; // ทำให้ช้าลง 2.5 เท่า
  const extendedEnd = charStart + transitionDuration;

  const opacity = useTransform(
    scrollYProgress,
    [charStart, extendedEnd],
    [0, 1],
  );
  const y = useTransform(scrollYProgress, [charStart, extendedEnd], [30, 0]);

  return (
    <motion.span
      style={{
        opacity,
        y,
        display: "inline-block",
        whiteSpace: char === " " ? "pre" : "normal",
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 0.61, 0.36, 1], // Smooth easeOutCubic
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

export default function MysteriousText({
  text,
  scrollYProgress,
  startProgress,
  endProgress,
  className = "",
}: MysteriousTextProps) {
  // ใช้ Intl.Segmenter เพื่อแบ่ง grapheme clusters ที่ถูกต้อง (รวมสระกับพยัญชนะ)
  const segmenter = useMemo(
    () => new Intl.Segmenter("th", { granularity: "grapheme" }),
    [],
  );

  //? Pre-calculate character data และ animation ranges
  const characterData = useMemo(() => {
    const textLines = text.split("\n");
    const totalChars = text.replace(/\n/g, "").length;
    let charIndex = 0;

    return textLines.map((line) => {
      const characters = [...segmenter.segment(line)].map(
        (segment) => segment.segment,
      );

      return {
        line,
        chars: characters.map((char) => {
          const charStart =
            startProgress +
            ((endProgress - startProgress) * charIndex) / totalChars;
          const charEnd =
            startProgress +
            ((endProgress - startProgress) * (charIndex + 1)) / totalChars;
          charIndex++;

          return {
            char,
            charStart,
            charEnd,
          };
        }),
      };
    });
  }, [text, startProgress, endProgress, segmenter]);

  let globalCharIndex = 0;

  return (
    <span className={`select-none ${className}`}>
      {characterData.map(({ line, chars }, lineIndex) => (
        <span key={`line-${lineIndex}-${line}`}>
          {chars.map(({ char, charStart, charEnd }) => {
            const currentIndex = globalCharIndex;
            globalCharIndex++;

            return (
              <AnimatedChar
                key={`char-${currentIndex}`}
                char={char}
                scrollYProgress={scrollYProgress}
                charStart={charStart}
                charEnd={charEnd}
              />
            );
          })}
          {lineIndex < characterData.length - 1 && <br />}
        </span>
      ))}
    </span>
  );
}
