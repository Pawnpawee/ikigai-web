"use client";
import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import GradientButton from "../components/button/GradientButton";
import WordByWordAnimation from "../components/text/WordByWordAnimation";
import { useStarsVisibility } from "../hooks/useStarsVisibility";

interface TempleArrivalProps {
  onStartCeremony: () => void;
}

const TEMPLE_DIALOGUE = `เจ้ามาถึงวิหารแล้ว… โลกและความสามารถของเจ้ากำลังจะถูกชั่งอย่างยุติธรรม
นี่คือโอกาสครั้งที่สองของเจ้า… เพื่อค้นพบ Ikigai ของตนเอง`;

export default function TempleArrival({ onStartCeremony }: TempleArrivalProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  //? Transform values for scene
  const sceneOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 1],
  );
  const textProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  //? Button appearance
  const buttonOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0.85, 0.95], [50, 0]);

  //? Stars visibility
  useStarsVisibility(scrollYProgress, {
    shouldShow: (p) => p >= 0 && p < 1,
  });

  return (
    <m.div ref={ref} className="h-[300vh] w-full relative">
      <m.div
        className="fixed flex flex-col justify-center items-center bg-black gap-10 h-full w-full"
        style={{ opacity: sceneOpacity }}
      >
        {/* Dialogue text */}
        <m.div className="text-center px-4" style={{ opacity: sceneOpacity }}>
          <WordByWordAnimation
            text={TEMPLE_DIALOGUE}
            scrollYProgress={textProgress}
            as="p"
            className="text-white text-lg md:text-2xl leading-relaxed drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]"
          />
        </m.div>

        {/* Ceremony button */}
        <m.div
          className=""
          style={{
            opacity: buttonOpacity,
            y: buttonY,
          }}
        >
          <GradientButton
            text="เริ่มพิธีชั่งหัวใจ"
            isSelected={false}
            onClick={onStartCeremony}
            variant="white"
            className="text-xl md:text-3xl"
          />
        </m.div>
      </m.div>
    </m.div>
  );
}
