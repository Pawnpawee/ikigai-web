"use client";
import { m } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { IkigaiAnalysis } from "@/app/types/ikigai.types";
import { getImgPath } from "@/utils/cloudinaryUtils";
import IkigaiVennDiagram from "./IkigaiVennDiagram";
import SectionDetailModal from "./SectionDetailModal";

interface IkigaiResultDisplayProps {
  analysis: IkigaiAnalysis;
  playerName?: string;
}

export default function IkigaiResultDisplay({
  analysis,
  playerName,
}: IkigaiResultDisplayProps) {
  const router = useRouter();
  const [showCircle, setShowCircle] = useState(false);
  const [selectedSection, setSelectedSection] = useState<
    keyof IkigaiAnalysis | null
  >(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle",
  );

  //? After symbols merge animation completes, show the circle
  const handleSymbolsMerged = () => {
    setTimeout(() => setShowCircle(true), 1000);
  };

  const handleSectionClick = (section: keyof IkigaiAnalysis) => {
    setSelectedSection(section);
  };

  //? Save result as JSON or PDF
  const handleSaveResult = () => {
    setSaveStatus("saving");

    try {
      const resultData = {
        playerName,
        analysis,
        savedAt: new Date().toISOString(),
      };

      //? Download as JSON
      const blob = new Blob([JSON.stringify(resultData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ikigai-result-${playerName || "user"}-${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      console.error("Error saving result:", error);
      setSaveStatus("idle");
    }
  };

  //? Share result via Web Share API or copy link
  const handleShareResult = async () => {
    const shareText = `ฉันได้ค้นพบ Ikigai ของตัวเองแล้ว! 🌟\n\nมาค้นหา Ikigai ของคุณกันเถอะ`;
    const shareUrl = window.location.origin;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Ikigai - ค้นพบเส้นทางชีวิตของคุณ",
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      //? Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
        alert("คัดลอกลิงก์แล้ว! แชร์ไปเลย 🎉");
      } catch (error) {
        console.error("Error copying to clipboard:", error);
      }
    }
  };

  //? Continue to next page (e.g., recommendations, next steps, etc.)
  const handleContinue = () => {
    //todo Navigate to next page (career recommendations, goal setting, etc.)
    router.push("/");
  };

  const selectedSectionData = selectedSection
    ? analysis[selectedSection]
    : null;

  return (
    <div className="relative min-h-screen w-full bg-linear-to-b from-purple-950 via-indigo-900 to-black overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map(() => {
          const randomLeft = Math.random() * 100;
          const randomTop = Math.random() * 100;
          return (
            <m.div
              key={`star-${randomLeft}-${randomTop}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          );
        })}
      </div>

      {/* Deity message */}
      <m.div
        className="absolute top-[5%] w-full text-center px-4 z-20"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <p className="text-white text-lg md:text-2xl leading-relaxed drop-shadow-lg">
          {playerName && (
            <span className="text-yellow-300 font-semibold">{playerName}</span>
          )}
          {playerName ? " " : ""}หัวใจของเจ้าได้รับการชั่งแล้ว…
          <br />
          นี่คือ Ikigai ของเจ้า
        </p>
      </m.div>

      {/* Symbols merging animation */}
      {!showCircle && (
        <div className="absolute inset-0 flex items-center justify-center">
          {[0, 1, 2, 3].map((index) => (
            <m.div
              key={`symbol-${index}`}
              className="absolute w-16 h-16 md:w-24 md:h-24"
              initial={{
                x: [250, -250, -250, 250][index],
                y: [-250, -250, 250, 250][index],
                opacity: 0,
                scale: 0,
              }}
              animate={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: index * 0.3,
                duration: 1.5,
                type: "spring",
                damping: 20,
              }}
              onAnimationComplete={
                index === 3 ? handleSymbolsMerged : undefined
              }
            >
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: [
                    "linear-gradient(135deg, #FF6B9D, #FFA06B)",
                    "linear-gradient(135deg, #FFA06B, #FFD68E)",
                    "linear-gradient(135deg, #6BCF7F, #6BA3FF)",
                    "linear-gradient(135deg, #6BA3FF, #8EC7FF)",
                  ][index],
                  boxShadow: "0 0 30px rgba(255,255,255,0.5)",
                }}
              />
            </m.div>
          ))}

          {/* Character silhouette forming */}
          <m.div
            className="absolute w-32 h-32 md:w-48 md:h-48"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 1, type: "spring" }}
          >
            <Image
              src={getImgPath("journey/character-silhouette.webp")}
              alt="Character"
              fill
              className="object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.8)]"
            />
          </m.div>
        </div>
      )}

      {/* Ikigai Circle Diagram */}
      {showCircle && (
        <m.div
          className="absolute top-[20%] md:top-[15%] w-full px-4 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <div className="w-full max-w-4xl">
            <IkigaiVennDiagram
              analysis={analysis}
              onSectionClick={handleSectionClick}
            />
          </div>
        </m.div>
      )}

      {/* Action buttons */}
      {showCircle && (
        <m.div
          className="absolute bottom-[5%] w-full flex flex-wrap justify-center gap-3 md:gap-4 px-4 z-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <button
            type="button"
            onClick={handleSaveResult}
            disabled={saveStatus === "saving"}
            className="px-4 py-2 md:px-8 md:py-4 bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold text-sm md:text-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span className="text-xl">💾</span>
            {saveStatus === "saving"
              ? "กำลังบันทึก..."
              : saveStatus === "saved"
                ? "บันทึกแล้ว ✓"
                : "บันทึกผลลัพธ์"}
          </button>
          <button
            type="button"
            onClick={handleShareResult}
            className="px-4 py-2 md:px-8 md:py-4 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold text-sm md:text-lg shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
          >
            <span className="text-xl">📤</span>
            แชร์
          </button>
          <button
            type="button"
            onClick={handleContinue}
            className="px-4 py-2 md:px-8 md:py-4 bg-linear-to-r from-purple-500 to-pink-600 text-white rounded-full font-semibold text-sm md:text-lg shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
          >
            ดำเนินการต่อ
            <span className="text-xl">→</span>
          </button>
        </m.div>
      )}

      {/* Section Detail Modal */}
      <SectionDetailModal
        isOpen={selectedSection !== null}
        onClose={() => setSelectedSection(null)}
        sectionKey={selectedSection}
        sectionData={selectedSectionData}
      />
    </div>
  );
}
