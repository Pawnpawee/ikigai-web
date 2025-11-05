"use client";
import { motion, MotionValue, useTransform } from "framer-motion";

interface SubtitleScrollProps {
  subtitles: string[];
  scrollYProgress: MotionValue<number>;
  className?: string;
}

export default function SubtitleScroll({
  subtitles,
  scrollYProgress,
  className = "",
}: SubtitleScrollProps) {
  // Calculate scroll ranges for each subtitle
  // Each subtitle gets equal portion of the scroll range
  const totalSubtitles = subtitles.length;
  
  // กรณีพิเศษ: ถ้ามี subtitle เดียว ให้ใช้ scrollYProgress โดยตรง
  if (totalSubtitles === 1) {
    return (
      <div className={`relative ${className}`}>
        <motion.div
          className="absolute inset-0 flex justify-center items-center px-8"
          style={{ opacity: scrollYProgress }}
        >
          <div className="bg-black/20 px-6 py-3 rounded-lg max-w-5xl">
            <p className="typo-text-h5 text-white text-center leading-relaxed">
              {subtitles[0]}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  const portionSize = 1 / totalSubtitles;

  return (
    <div className={`relative ${className}`}>
      {subtitles.map((subtitle, index) => {
        // Calculate fade in/out ranges for this subtitle
        const startFadeIn = index * portionSize;
        const fullyVisible = startFadeIn + portionSize * 0.2; // 20% of portion for fade in
        const startFadeOut = (index + 1) * portionSize - portionSize * 0.2; // Start fade out at 80%
        const endFadeOut = (index + 1) * portionSize;

        const opacity = useTransform(
          scrollYProgress,
          [startFadeIn, fullyVisible, startFadeOut, endFadeOut],
          [0, 1, 1, 0]
        );

        return (
          <motion.div
            key={index}
            className="absolute inset-0 flex justify-center items-center px-8"
            style={{ opacity }}
          >
            <div className="bg-black/20 px-6 py-3 rounded-lg max-w-5xl">
              <p className="typo-text-h5 text-white text-center leading-relaxed">
                {subtitle}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
