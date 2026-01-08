// WordByWordAnimation.tsx
"use client";
import { type MotionValue, m, useTransform } from "framer-motion";
import { createElement, type FC } from "react";

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
        cursor-pointer
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
  const allWords = text.split(/\s+/).filter(Boolean);
  const totalWords = allWords.length;
  const lines = text.split("\n");
  let wordCounter = 0;

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

          return (
            <span
              key={`word-${wordIndexInLine}-${word}`}
              className="mr-2 relative"
            >
              <AnimatedWord
                scrollYProgress={scrollYProgress}
                start={start}
                end={end}
              >
                {word}
              </AnimatedWord>
            </span>
          );
        })}
      </span>
    )),
  );
};

export default WordByWordAnimation;
