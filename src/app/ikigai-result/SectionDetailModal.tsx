"use client";

import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import { useDevice } from "@/app/contexts/DeviceContext";
import { getModalConfig } from "@/app/data/ikigai_modal.data";
import type { IkigaiAnalysis, IkigaiSection } from "@/app/types/ikigai.types";

// ─────────────────────────────────────────────────────────────
//? Figma Reference: node 930:8328 (s12-modal)
//? Desktop: Modal w=1278.23, h=652.36 in 1920x1080
//? Header row h=129.7, Content h=522.66
//? Icon 69.7x69.7, Close button at top-right
//? 3 content sections: สรุปภาพรวม, จุดแข็ง, จุดพัฒนา
// ─────────────────────────────────────────────────────────────

interface SectionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionKey: keyof IkigaiAnalysis | null;
  sectionData: IkigaiSection | null;
}

export default function SectionDetailModal({
  isOpen,
  onClose,
  sectionKey,
  sectionData,
}: SectionDetailModalProps) {
  const { isMobile } = useDevice();

  if (!isOpen || !sectionData || !sectionKey) return null;

  const config = getModalConfig(sectionKey);
  if (!config) return null;

  //? Content sections data
  const sections = [
    {
      id: "overall",
      label: config.overallLabel,
      iconSrc: config.overallIcon,
      content: sectionData.overall_summary,
      type: "text" as const,
    },
    {
      id: "strengths",
      label: config.strengthLabel,
      iconSrc: config.strengthIcon,
      content: sectionData.strengths,
      type: "list" as const,
    },
    {
      id: "development",
      label: config.developLabel,
      iconSrc: config.developIcon,
      content: sectionData.development_points,
      type: "list" as const,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ─── Backdrop ─── */}
          <m.div
            className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* ─── Modal Container (centered) ─── */}
          <m.div
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <m.div
              className={`pointer-events-auto relative flex min-h-0 flex-col overflow-hidden rounded-[2.35%] border border-white/15 shadow-2xl ${
                isMobile ? "w-[92%] max-h-[80vh]" : "w-[66.57%] max-h-[85vh]"
              }`}
              style={{ background: config.bgGradient }}
              initial={{ scale: 0.85, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 22, stiffness: 260 }}
            >
              {/* ─── Header Row ─── */}
              {/*? h=129.7/652.36 = 19.88% of modal, icon=69.7/1278.23 = 5.45% of w */}
              <div
                className="relative flex shrink-0 items-center gap-[2.35%] px-[3.91%] py-[2.5%]"
                style={{ background: config.headerBg }}
              >
                {/* Section Icon */}
                <div className="relative w-[5.45%] aspect-square shrink-0">
                  <Image
                    src={config.iconSrc}
                    alt={config.title}
                    fill
                    className="object-contain"
                    sizes="70px"
                  />
                </div>

                {/* Title */}
                <h2
                  className="font-bold text-lg md:text-3xl lg:text-4xl leading-tight"
                  style={{ color: config.titleColor }}
                >
                  {config.title}
                </h2>

                {/* Close Button */}
                {/*? Figma: top-right, circular */}
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-[2.34%] top-1/2 -translate-y-1/2 w-[3.13%] aspect-square rounded-full bg-white/15 hover:bg-white/30 transition-colors flex items-center justify-center cursor-pointer"
                  aria-label="Close modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-[60%] h-[60%]"
                  >
                    <title>Close</title>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* ─── Content Area ─── */}
              {/*? h=522.66/652.36 = 80.12% of modal, scrollable */}
              {/*? data-lenis-prevent ป้องกัน Lenis ดักจับ scroll event */}
              <div
                data-lenis-prevent
                className="modal-scrollbar flex-1 overflow-y-auto px-[3.91%] py-[3.44%] space-y-[4.59%]"
                style={{ background: config.contentBg }}
              >
                {sections.map((section, sIdx) => {
                  //? Skip empty lists
                  if (
                    section.type === "list" &&
                    Array.isArray(section.content) &&
                    section.content.length === 0
                  ) {
                    return null;
                  }

                  return (
                    <m.div
                      key={section.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: sIdx * 0.12, duration: 0.5 }}
                    >
                      {/* Section Header: icon + label */}
                      <div className="flex items-center gap-[1.56%] mb-[1.84%]">
                        <div className="relative w-[1.88%] aspect-square shrink-0">
                          <Image
                            src={section.iconSrc}
                            alt={section.label}
                            fill
                            className="object-contain"
                            sizes="24px"
                          />
                        </div>
                        <h3 className="text-white font-semibold text-base md:text-xl lg:text-2xl">
                          {section.label}
                        </h3>
                      </div>

                      {/* Section Content */}
                      {section.type === "text" ? (
                        <p className="text-white/90 leading-relaxed text-sm md:text-base lg:text-lg whitespace-pre-line pl-[3.44%]">
                          {section.content as string}
                        </p>
                      ) : (
                        <ul className="space-y-[1.53%] pl-[3.44%]">
                          {(section.content as string[]).map((item, idx) => (
                            <m.li
                              key={`${section.id}-${idx}`}
                              className="flex gap-[1.17%] text-white/90 leading-relaxed text-sm md:text-base lg:text-lg"
                              initial={{ opacity: 0, x: -12 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: sIdx * 0.12 + idx * 0.08,
                                duration: 0.4,
                              }}
                            >
                              <span className="text-white/60 shrink-0 mt-0.5">
                                •
                              </span>
                              <span>{item}</span>
                            </m.li>
                          ))}
                        </ul>
                      )}
                    </m.div>
                  );
                })}
              </div>
            </m.div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
