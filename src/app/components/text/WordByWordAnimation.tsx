// WordByWordAnimation.tsx
"use client";
import { type MotionValue, m, useTransform } from "framer-motion";
import { createElement, type FC } from "react";
import { useDevice } from "@/app/contexts/DeviceContext";

interface WordByWordAnimationProps {
  text: string;
  scrollYProgress: MotionValue<number>;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "span";
  className?: string;
  style?: React.CSSProperties;
}

interface AnimatedWordProps {
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
  children: string;
}

const AnimatedWord: FC<AnimatedWordProps> = ({
  scrollYProgress,
  start,
  end,
  children,
}) => {
  //? Hook called at top level of AnimatedWord component
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  return (
    <m.span
      style={{
        opacity,
      }}
      className="
        transition-all duration-500 ease-out
        hover:drop-shadow-[0_0_10px_#ffffff]
        hover:text-shadow-amber-100
      "
    >
      {children}
    </m.span>
  );
};

const WordByWordAnimation: FC<WordByWordAnimationProps> = ({
  text,
  scrollYProgress,
  as = "p",
  className = "text-sm",
  style,
}) => {
  const { isMobile } = useDevice();

  //? Mobile: แสดงข้อความตรงๆ ไม่ต้องมี animation เพื่อเพิ่ม performance
  if (isMobile) {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return createElement(
      as,
      { className, style },
      <span className="flex flex-wrap items-center justify-center whitespace-pre-line select-none">
        {parts.map((part) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={`bold-${part}`}>{part.slice(2, -2)}</strong>;
          }
          return <span key={`text-${part}`}>{part}</span>;
        })}
      </span>,
    );
  }

  const allWords = text.split(/\s+/).filter(Boolean);
  const totalWords = allWords.length;
  const lines = text.split("\n");
  let wordCounter = 0;
  let inBold = false;

  return createElement(
    as,
    { className, style },
    lines.map((line, lineIndex) => (
      <span
        key={`line-${lineIndex}-${line}`}
        className="flex flex-wrap items-center justify-center whitespace-pre-line select-none"
      >
        {line.split(" ").map((word, wordIndexInLine) => {
          if (word === "") return null;

          const start = wordCounter / totalWords;
          const end = (wordCounter + 1) / totalWords;
          wordCounter++;

          //? Support **bold** markers
          let displayWord = word;
          let wordIsBold = inBold;
          if (displayWord.startsWith("**")) {
            displayWord = displayWord.slice(2);
            inBold = true;
            wordIsBold = true;
          }
          if (displayWord.endsWith("**")) {
            displayWord = displayWord.slice(0, -2);
            wordIsBold = true;
            inBold = false;
          }

          return (
            <span
              key={`word-${wordIndexInLine}-${word}`}
              className={`mr-2 relative ${wordIsBold ? "font-bold" : ""}`}
            >
              <AnimatedWord
                scrollYProgress={scrollYProgress}
                start={start}
                end={end}
              >
                {displayWord}
              </AnimatedWord>
            </span>
          );
        })}
      </span>
    )),
  );
};

export default WordByWordAnimation;
