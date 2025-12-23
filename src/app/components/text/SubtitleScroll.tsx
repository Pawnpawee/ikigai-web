"use client";

import { type MotionValue, m, useTransform } from "framer-motion";

interface SubtitleScrollProps {
  subtitles: string[];
  //? ค่า 0-1 ของช่วงเวลานั้นๆ 
  progress: MotionValue<number>;
  className?: string;
}

export default function SubtitleScroll({
  subtitles,
  progress, // รับค่า progress 0-1
  className = "",
}: SubtitleScrollProps) {
  const totalSubtitles = subtitles.length;
  const portionSize = 1 / totalSubtitles;

  return (
    <div className={`relative ${className}`}>
      {subtitles.map((subtitle, index) => {
        
        const startFadeIn = index * portionSize;
        const fullyVisible = startFadeIn + portionSize * 0.2;
        const startFadeOut = (index + 1) * portionSize - portionSize * 0.2;
        const endFadeOut = (index + 1) * portionSize;

        const opacity = useTransform(
          progress,
          [startFadeIn, fullyVisible, startFadeOut, endFadeOut],
          [0, 1, 1, 0],
        );

        return (
          <m.div
            key={subtitle} 
            className="absolute inset-0 flex justify-center items-center px-8"
            style={{ opacity }}
          >
            <div className="bg-black/20 px-6 py-3 rounded-lg max-w-5xl">
              <p className="typo-text-h5 text-white text-center leading-relaxed">
                {subtitle}
              </p>
            </div>
          </m.div>
        );
      })}
    </div>
  );
}