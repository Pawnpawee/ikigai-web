// WordByWordAnimation.tsx
"use client";
import { motion, useTransform, MotionValue } from "framer-motion";
import { createElement, type FC } from "react";

interface WordByWordAnimationProps {
  text: string;
  scrollYProgress: MotionValue<number>;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "span";
  className?: string;
  style?: React.CSSProperties;
}

interface AnimatedWordProps {
  opacity: MotionValue<number>;
  children: string;
}

const AnimatedWord: FC<AnimatedWordProps> = ({ opacity, children }) => {
  return (
    <motion.span
      style={{
        opacity,
      }}
      className="
        cursor-pointer
        transition-all duration-500 ease-out
        hover:drop-shadow-[0_0_10px_#ffffff]
        hover:text-cyan-300
      "
    >
      {children}
    </motion.span>
  );
};

const WordByWordAnimation: FC<WordByWordAnimationProps> = ({
  text,
  scrollYProgress,
  as = "p",
  className = "typo-p-md",
  style,
}) => {
  const allWords = text.split(/\s+/).filter(Boolean);
  const totalWords = allWords.length;
  let wordCounter = 0;

  const lines = text.split("\n");

  return createElement(
    as,
    { className, style },
    lines.map((line, lineIndex) => (
      <span
        key={lineIndex}
        className="flex flex-wrap items-center justify-center whitespace-pre-line select-none py-1"
      >
        {line.split(" ").map((word, wordIndexInLine) => {
          if (word === "") return null;

          const start = wordCounter / totalWords;
          const end = (wordCounter + 1) / totalWords;

          //? Scroll Logic กลับมาเป็น Opacity แบบเรียบง่ายตามเดิม
          const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

          wordCounter++;

          return (
            <span key={wordIndexInLine} className="mr-2 relative">
              <AnimatedWord opacity={opacity}>{word}</AnimatedWord>
            </span>
          );
        })}
      </span>
    ))
  );
};

export default WordByWordAnimation;
