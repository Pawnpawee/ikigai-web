"use client";
import { m } from "framer-motion";
import { useState } from "react";
import type { IkigaiAnalysis } from "@/app/types/ikigai.types";

interface IkigaiVennDiagramProps {
  analysis: IkigaiAnalysis;
  onSectionClick?: (section: keyof IkigaiAnalysis) => void;
}

const CIRCLE_CONFIG = [
  {
    key: "what_you_love" as const,
    label: "สิ่งที่คุณรัก",
    position: "top-[8%] left-[18%]",
    color: "rgba(255, 107, 157, 0.4)",
    hoverColor: "rgba(255, 107, 157, 0.7)",
  },
  {
    key: "what_you_good_at" as const,
    label: "สิ่งที่คุณถนัด",
    position: "top-[8%] right-[18%]",
    color: "rgba(255, 160, 107, 0.4)",
    hoverColor: "rgba(255, 160, 107, 0.7)",
  },
  {
    key: "what_the_world_need" as const,
    label: "สิ่งที่โลกต้องการ",
    position: "bottom-[8%] left-[18%]",
    color: "rgba(107, 207, 127, 0.4)",
    hoverColor: "rgba(107, 207, 127, 0.7)",
  },
  {
    key: "what_you_can_be_paid_for" as const,
    label: "สื่งที่สร้างรายได้",
    position: "bottom-[8%] right-[18%]",
    color: "rgba(107, 163, 255, 0.4)",
    hoverColor: "rgba(107, 163, 255, 0.7)",
  },
];

const INTERSECTION_CONFIG = [
  {
    key: "passion" as const,
    label: "Passion",
    position: "top-[28%] left-[50%] -translate-x-1/2",
    color: "rgba(255, 142, 199, 0.5)",
  },
  {
    key: "mission" as const,
    label: "Mission",
    position: "left-[12%] top-[50%] -translate-y-1/2",
    color: "rgba(142, 199, 255, 0.5)",
  },
  {
    key: "profession" as const,
    label: "Profession",
    position: "right-[12%] top-[50%] -translate-y-1/2",
    color: "rgba(142, 255, 179, 0.5)",
  },
  {
    key: "vocation" as const,
    label: "Vocation",
    position: "bottom-[28%] left-[50%] -translate-x-1/2",
    color: "rgba(255, 214, 142, 0.5)",
  },
];

export default function IkigaiVennDiagram({
  analysis,
  onSectionClick,
}: IkigaiVennDiagramProps) {
  const [hoveredSection, setHoveredSection] = useState<
    keyof IkigaiAnalysis | null
  >(null);

  return (
    <div className="relative w-full h-[600px] md:h-[800px]">
      {/* Center - Ikigai */}
      <m.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 1, type: "spring" }}
      >
        <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
          <div className="absolute inset-0 bg-linear-to-br from-yellow-300 to-amber-500 rounded-full animate-pulse" />
          <span className="relative z-10 text-white font-bold text-xl md:text-3xl drop-shadow-lg">
            Ikigai
          </span>
        </div>
      </m.div>

      {/* Four main circles */}
      {CIRCLE_CONFIG.map((circle, index) => (
        <m.div
          key={circle.key}
          className={`absolute ${circle.position} w-[40%] h-[40%] rounded-full cursor-pointer z-10 transition-all duration-300`}
          style={{
            backgroundColor:
              hoveredSection === circle.key ? circle.hoverColor : circle.color,
            border: `3px solid ${circle.color.replace("0.4", "0.8")}`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.2, duration: 0.8, type: "spring" }}
          onHoverStart={() => setHoveredSection(circle.key)}
          onHoverEnd={() => setHoveredSection(null)}
          onClick={() => onSectionClick?.(circle.key)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <p className="text-white font-bold text-base md:text-xl leading-tight drop-shadow-lg">
                {circle.label}
              </p>
              <p className="text-white text-base md:text-xl leading-tight drop-shadow-lg">
                {analysis[circle.key]?.short_summary}
              </p>
              {hoveredSection === circle.key && (
                <m.p
                  className="text-white text-xs md:text-sm mt-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  คลิกเพื่ออ่านเพิ่มเติม
                </m.p>
              )}
            </div>
          </div>
        </m.div>
      ))}

      {/* Intersection labels */}
      {INTERSECTION_CONFIG.map((intersection, index) => (
        <m.div
          key={intersection.key}
          className={`absolute ${intersection.position} z-20 cursor-pointer`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 1 + index * 0.15,
            duration: 0.6,
            type: "spring",
          }}
          onHoverStart={() => setHoveredSection(intersection.key)}
          onHoverEnd={() => setHoveredSection(null)}
          onClick={() => onSectionClick?.(intersection.key)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div
            className="px-3 py-2 rounded-full backdrop-blur-sm border-2 transition-all duration-300"
            style={{
              backgroundColor: intersection.color,
              borderColor:
                hoveredSection === intersection.key
                  ? "#ffffff"
                  : intersection.color.replace("0.5", "0.8"),
              boxShadow:
                hoveredSection === intersection.key
                  ? "0 0 20px rgba(255,255,255,0.5)"
                  : "none",
            }}
          >
            <p className="text-white font-semibold text-xs md:text-base whitespace-nowrap drop-shadow-lg">
              {analysis[intersection.key]?.short_summary || intersection.label}
            </p>
          </div>
        </m.div>
      ))}

      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-purple-900/20 to-black/40 pointer-events-none" />
    </div>
  );
}
