"use client";
import { AnimatePresence, m } from "framer-motion";
import type { IkigaiAnalysis, IkigaiSection } from "@/app/types/ikigai.types";
import { IKIGAI_SECTIONS } from "@/app/types/ikigai.types";

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
  if (!isOpen || !sectionData || !sectionKey) return null;

  const config = IKIGAI_SECTIONS.find((s) => s.key === sectionKey);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <m.div
            className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <m.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <m.div
              className="bg-linear-to-br from-gray-900 via-purple-900 to-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto relative border-2 border-white/20 shadow-2xl"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <span className="text-2xl text-white">✕</span>
              </button>

              {/* Header */}
              <div
                className="p-6 md:p-8 border-b border-white/10"
                style={{
                  background: `linear-gradient(135deg, ${config?.color}40, transparent)`,
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl md:text-5xl">{config?.icon}</span>
                  <div>
                    <h2 className="text-2xl md:text-4xl font-bold text-white">
                      {config?.title}
                    </h2>
                    <p className="text-lg md:text-xl text-white/80 mt-1">
                      {config?.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-8">
                {/* Overall Summary */}
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-8 rounded-full bg-linear-to-b from-yellow-400 to-amber-600" />
                    สรุปภาพรวม
                  </h3>
                  <p className="text-white/90 leading-relaxed text-base md:text-lg whitespace-pre-line">
                    {sectionData.overall_summary}
                  </p>
                </div>

                {/* Strengths */}
                {sectionData.strengths.length > 0 && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                      <span className="w-2 h-8 rounded-full bg-linear-to-b from-green-400 to-emerald-600" />
                      จุดแข็ง
                    </h3>
                    <ul className="space-y-4">
                      {sectionData.strengths.map((strength, idx) => (
                        <m.li
                          key={`strength-${strength}`}
                          className="flex gap-4 text-white/90 leading-relaxed text-base md:text-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <span className="text-green-400 font-bold shrink-0 mt-1">
                            ✓
                          </span>
                          <span>{strength}</span>
                        </m.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Development Points */}
                {sectionData.development_points.length > 0 && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                      <span className="w-2 h-8 rounded-full bg-linear-to-b from-blue-400 to-indigo-600" />
                      จุดพัฒนา
                    </h3>
                    <ul className="space-y-4">
                      {sectionData.development_points.map((point, idx) => (
                        <m.li
                          key={`dev-point-${point}`}
                          className="flex gap-4 text-white/90 leading-relaxed text-base md:text-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <span className="text-blue-400 font-bold shrink-0 mt-1">
                            →
                          </span>
                          <span>{point}</span>
                        </m.li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </m.div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
