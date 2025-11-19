// WordByWordAnimation.tsx
"use client";
import { motion, useTransform, MotionValue } from "framer-motion";
import { createElement, type FC } from "react";

interface WordByWordAnimationProps {
  text: string;
  scrollYProgress: MotionValue<number>;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "span";
  className?: string; // ใส่คลาสตัวอักษรเช่น "typo-h1" หรือ "typo-p-md"
  style?: React.CSSProperties;
}

const AnimatedWord: FC<{ opacity: MotionValue<number>; children: string }> = ({ opacity, children }) => {
  return (
    // ใช้ display: 'inline-block' เพื่อให้ transform ทำงานได้ถูกต้อง
    <motion.span style={{ opacity, display: 'inline-block' }}>
      {children}
    </motion.span>
  );
};

const WordByWordAnimation: FC<WordByWordAnimationProps> = ({ text, scrollYProgress, as = "p", className = "typo-p-md", style }) => {
  // 1. แยกข้อความทั้งหมดด้วยช่องว่างหรือการขึ้นบรรทัดใหม่ เพื่อนับจำนวนคำทั้งหมดให้ถูกต้อง
  const allWords = text.split(/\s+/).filter(Boolean);
  const totalWords = allWords.length;
  let wordCounter = 0;

  // 2. แยกข้อความออกเป็นแต่ละบรรทัด
  const lines = text.split("\n");

  return (
    // ใช้ createElement เพื่อรองรับ dynamic tag โดยไม่พึ่ง JSX namespace
    // Children เป็น array ของ spans ต่อบรรทัด
    createElement(
      as,
      { className, style },
      lines.map((line, lineIndex) => (
        // 3. คอนเทนเนอร์สำหรับแต่ละบรรทัด
        <span key={lineIndex} className="flex flex-wrap items-center justify-center whitespace-pre-line select-none">
          {line.split(" ").map((word, wordIndexInLine) => {
            if (word === "") return null;

            // 4. คำนวณช่วงเวลา animation ของแต่ละคำตามลำดับทั้งหมด
            const start = wordCounter / totalWords;
            const end = (wordCounter + 1) / totalWords;
            const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

            wordCounter++;

            return (
              <span key={wordIndexInLine} className="mr-2">
                <AnimatedWord opacity={opacity}>{word}</AnimatedWord>
              </span>
            );
          })}
        </span>
      ))
    )
  );
};

export default WordByWordAnimation;