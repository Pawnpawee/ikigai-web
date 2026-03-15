"use client";

import { AnimatePresence, m } from "framer-motion";
import { toPng } from "html-to-image";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import LazyLottie from "@/app/components/reusable/LazyLottie";
import SceneLayer from "@/app/components/reusable/SceneLayer";
import { useDevice } from "@/app/contexts/DeviceContext";
import {
  CARD_GLOW_POS,
  CARD_POS,
  CONTINUE_BTN_POS,
  DESCRIPTION_POS,
  getCardAccentColor,
  getCardAssets,
  getCardGlowGradient,
  IKIGAI_CENTER,
  type IkigaiAnalysis,
  type IkigaiScores,
  INTERSECTION_LABELS,
  PERCENT_TEXT_POS,
  SAVE_BTN_POS,
  SHARE_BTN_POS,
  VENN_CIRCLES,
} from "@/app/data/ikigai.data";
import SectionDetailModal from "./SectionDetailModal";

// ─────────────────────────────────────────────────────────────
//? Animation Sequence — ขั้นตอนการแสดงผลทีละอย่าง
//? 0: bg + star (แสดงแต่แรก via SceneLayer shouldAnimate)
//? 1: card + card_light (SceneLayer items)
//? 2: percent
//? 3: Venn circles (What you love, good at, world needs, paid for)
//? 4: ikigai center + description
//? 5: Intersection labels (Passion, Mission, Profession, Vocation)
//? 6: save + share buttons
// ─────────────────────────────────────────────────────────────

const SEQUENCE_DELAYS = {
  percent: 0,
  circles: 0,
  ikigaiCenter: 0,
  description: 0,
  labels: 0,
  buttons: 0,
} as const;

//? Pop-up animation variant
//? transition แยกออกเป็น top-level เพื่อไม่ให้ delay ไปทับ whileHover/whileTap
const popUpVariant = (delay: number) => ({
  initial: { opacity: 0, scale: 0.8, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: "easeOut" as const },
});

//? Fade-in animation variant
const fadeInVariant = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay, duration: 0.8, ease: "easeOut" as const },
});

// ─────────────────────────────────────────────────────────────
//? Props
// ─────────────────────────────────────────────────────────────

interface IkigaiResultDisplayProps {
  analysis: IkigaiAnalysis;
  scores?: IkigaiScores;
  playersInSessionPct?: number;
  maxSessionPercentage?: string;
  playerName?: string;
  onSaveSuccess?: () => void;
  onContinue?: () => void;
}

export default function IkigaiResultDisplay({
  analysis,
  scores,
  playersInSessionPct = 0,
  maxSessionPercentage,
  playerName,
  onSaveSuccess,
  onContinue,
}: IkigaiResultDisplayProps) {
  const { isMobile } = useDevice();
  const router = useRouter();
  const captureRef = useRef<HTMLDivElement>(null);
  const [selectedSection, setSelectedSection] = useState<
    keyof IkigaiAnalysis | null
  >(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle",
  );

  // ─────────────────────────────────────────────────────────
  //? Handlers
  // ─────────────────────────────────────────────────────────

  const handleContinue = useCallback(() => {
    if (onContinue) {
      onContinue();
    } else {
      router.push("/closing");
    }
  }, [onContinue, router]);

  const handleSectionClick = useCallback((section: keyof IkigaiAnalysis) => {
    setSelectedSection(section);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedSection(null);
  }, []);

  const handleSaveResult = useCallback(async () => {
    const targetRef = captureRef;
    if (!targetRef.current || saveStatus === "saving") return;
    setSaveStatus("saving");

    const captureEl = targetRef.current;

    //? ใส่ bg-result gradient ชั่วคราว เพราะ parent อยู่นอก captureRef
    const originalBackground = captureEl.style.background;
    captureEl.style.background =
      "linear-gradient(180deg, #09345b 0%, #083054 5%, #062137 29%, #051622 54%, #041015 77%, #040e11 100%)";

    try {
      //? Screenshot ทั้ง container ด้วย html-to-image
      const dataUrl = await toPng(captureEl, {
        pixelRatio: 2,
        backgroundColor: "rgba(0,0,0,0)",
        //? ซ่อนปุ่ม save/share/continue ออกจากภาพ
        filter: (node) => {
          const el = node as HTMLElement;
          return el.getAttribute?.("data-hide-capture") !== "true";
        },
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `ikigai-result-${playerName || "user"}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSaveStatus("saved");
      onSaveSuccess?.();
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      console.error("Error saving screenshot:", error);
      setSaveStatus("idle");
    } finally {
      captureEl.style.background = originalBackground;
    }
  }, [onSaveSuccess, playerName, saveStatus]);

  const handleShareResult = useCallback(async () => {
    const shareText =
      "ฉันได้ค้นพบ Ikigai ของตัวเองแล้ว! 🌟\n\nมาค้นหา Ikigai ของคุณกันเถอะ";
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
      try {
        await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      } catch (error) {
        console.error("Error copying to clipboard:", error);
      }
    }
  }, []);

  //? ดึง card assets ตาม MaxSessionPercentage จาก API
  const cardAssets = useMemo(
    () => getCardAssets(maxSessionPercentage),
    [maxSessionPercentage],
  );

  //? สี accent ตามการ์ดที่ได้
  const accentColor = useMemo(
    () => getCardAccentColor(maxSessionPercentage),
    [maxSessionPercentage],
  );

  //? CSS radial-gradient สำหรับ glow ด้านหลังการ์ด (แทน card_light image)
  const cardGlowGradient = useMemo(
    () => getCardGlowGradient(accentColor),
    [accentColor],
  );

  //? ข้อมูลที่เลือกสำหรับ Modal
  const selectedSectionData = selectedSection
    ? analysis[selectedSection]
    : null;

  // ─────────────────────────────────────────────────────────
  //? Responsive position helper
  // ─────────────────────────────────────────────────────────

  const getPos = useCallback(
    (config: {
      desktop: Record<string, string>;
      mobile: Record<string, string>;
    }) => {
      return isMobile ? config.mobile : config.desktop;
    },
    [isMobile],
  );

  return (
    <div
      ref={captureRef}
      className="fixed flex justify-center top-0 h-screen w-screen overflow-hidden z-2"
    >
      <div className="flex items-center w-screen h-screen portrait:w-auto scale-[0.9] origin-center portrait:scale-100">
        {/* ─── Main Scene Container (SceneLayer = โครงสร้างนอกสุด) ─── */}
        <SceneLayer
          items={[]}
          shouldAnimate={true}
          containerAspectRatio={isMobile ? "1080 / 1920" : "1920 / 1080"}
        >
          <div className="contents">
            {/* ─── Card Glow (CSS radial-gradient + mix-blend-mode: screen) ─── */}
            <m.div
              className="absolute pointer-events-none mix-blend-screen"
              style={{
                ...getPos(CARD_GLOW_POS),
                background: cardGlowGradient,
                opacity: 0.7,
              }}
              {...fadeInVariant(0.3)}
            />

            {/* ─── Card Frame (กรอบการ์ด ครอบ Lottie) ─── */}
            <m.div
              className="absolute pointer-events-none"
              style={getPos(CARD_POS)}
              {...popUpVariant(0.6)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 443 763"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <path
                  d="M414.006 0H28.0541C12.5603 0 0 12.5603 0 28.0541V734.108C0 749.602 12.5603 762.162 28.0541 762.162H414.006C429.5 762.162 442.06 749.602 442.06 734.108V28.0541C442.06 12.5603 429.5 0 414.006 0Z"
                  fill="#FFD578"
                />
              </svg>
            </m.div>

            {/* ─── Card Lottie (5 การ์ดตาม MaxSessionPercentage) ─── */}
            <m.div
              className="absolute z-10"
              style={getPos(CARD_POS)}
              {...popUpVariant(0.6)}
            >
              <LazyLottie
                src={cardAssets.cardLottie}
                className="w-full h-full"
                loop={true}
                play={true}
              />
            </m.div>
          </div>

          {/* ─── Percent Text (PlayersInSessionPct จากผู้เล่นทั้งหมด) ─── */}
          <m.div
            className="absolute portrait:w-full"
            style={getPos(PERCENT_TEXT_POS)}
          >
            <p className="text-white font-semibold text-sm min-[376px]:text-base md:text-xl xl:text-3xl leading-10 text-center whitespace-nowrap">
              <span style={{ color: accentColor }}>{playersInSessionPct}%</span>{" "}
              จากผู้เล่นทั้งหมด
            </p>
          </m.div>

          {/* ─── Venn Diagram: 4 วงกลมหลัก ─── */}
          {VENN_CIRCLES.map((circle) => {
            const pos = getPos(circle);
            const sectionScore = scores?.[circle.key] ?? 0;
            const shortSummary =
              analysis[circle.key]?.short_summary || "short summary";

            return (
              <m.button
                key={circle.key}
                type="button"
                className="absolute z-10 cursor-pointer"
                style={pos}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSectionClick(circle.key)}
              >
                {/* วงกลม Gradient Background */}
                {circle.key === "what_you_love" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 346 346"
                    fill="none"
                    aria-hidden="true"
                    className="absolute inset-0"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path
                      opacity="0.7"
                      d="M172.57 345.14C267.878 345.14 345.14 267.878 345.14 172.57C345.14 77.2622 267.878 0 172.57 0C77.2622 0 0 77.2622 0 172.57C0 267.878 77.2622 345.14 172.57 345.14Z"
                      fill="url(#paint0_radial_930_11695)"
                    />
                    <defs>
                      <radialGradient
                        id="paint0_radial_930_11695"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(172.568 172.575) rotate(45) scale(172.57)"
                      >
                        <stop stopColor="#601126" />
                        <stop offset="1" stopColor="#EC4151" />
                      </radialGradient>
                    </defs>
                  </svg>
                )}
                {circle.key === "what_the_world_need" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 346 346"
                    fill="none"
                    aria-hidden="true"
                    className="absolute inset-0"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path
                      opacity="0.7"
                      d="M172.57 345.14C267.878 345.14 345.14 267.878 345.14 172.57C345.14 77.2622 267.878 0 172.57 0C77.2622 0 0 77.2622 0 172.57C0 267.878 77.2622 345.14 172.57 345.14Z"
                      fill="url(#paint0_radial_930_11658)"
                    />
                    <defs>
                      <radialGradient
                        id="paint0_radial_930_11658"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(172.569 172.575) rotate(-45) scale(172.57)"
                      >
                        <stop stopColor="#38804D" />
                        <stop offset="1" stopColor="#E1ED30" />
                      </radialGradient>
                    </defs>
                  </svg>
                )}
                {circle.key === "what_you_good_at" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 346 346"
                    fill="none"
                    aria-hidden="true"
                    className="absolute inset-0"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path
                      opacity="0.7"
                      d="M172.57 345.14C267.878 345.14 345.14 267.878 345.14 172.57C345.14 77.2622 267.878 0 172.57 0C77.2622 0 0 77.2622 0 172.57C0 267.878 77.2622 345.14 172.57 345.14Z"
                      fill="url(#paint0_radial_930_11732)"
                    />
                    <defs>
                      <radialGradient
                        id="paint0_radial_930_11732"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(172.565 172.568) rotate(-45) scale(172.57)"
                      >
                        <stop stopColor="#0700A6" />
                        <stop offset="1" stopColor="#927CFB" />
                      </radialGradient>
                    </defs>
                  </svg>
                )}
                {circle.key === "what_you_can_be_paid_for" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 346 346"
                    fill="none"
                    aria-hidden="true"
                    className="absolute inset-0"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path
                      opacity="0.7"
                      d="M172.57 345.14C267.878 345.14 345.14 267.878 345.14 172.57C345.14 77.2622 267.878 0 172.57 0C77.2622 0 0 77.2622 0 172.57C0 267.878 77.2622 345.14 172.57 345.14Z"
                      fill="url(#paint0_radial_930_11769)"
                    />
                    <defs>
                      <radialGradient
                        id="paint0_radial_930_11769"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(172.571 172.561) rotate(45) scale(172.57)"
                      >
                        <stop stopColor="#C24F0E" />
                        <stop offset="1" stopColor="#F4C13E" />
                      </radialGradient>
                    </defs>
                  </svg>
                )}

                {/* Content: icon + label + percent + summary */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 2xl:gap-4  px-[10%]">
                  {/* Icon */}
                  <div className="relative w-[12.57%] aspect-square">
                    <img
                      src={circle.iconSrc}
                      alt={`${circle.label} icon`}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Label */}
                  <p className="text-white text-center text-[10px] min-[376px]:text-xs md:text-sm xl:text-xl leading-tight whitespace-pre-line">
                    {circle.label}
                  </p>

                  {/* Percent Badge */}
                  <div className="bg-white/50 rounded-full px-[5.27%] py-[1.32%]">
                    <p className="text-black font-semibold text-[10px] min-[376px]:text-xs md:text-base xl:text-2xl text-center">
                      {sectionScore} %
                    </p>
                  </div>

                  {/* Short Summary */}
                  <p className="text-white text-center text-[8px] min-[376px]:text-[10px] md:text-sm xl:text-base whitespace-pre-line">
                    {shortSummary}
                  </p>
                </div>
              </m.button>
            );
          })}

          {/* ─── IKIGAI Center Label ─── */}
          <m.div
            className="absolute z-20 flex items-center justify-center rounded-full"
            style={{
              ...getPos(IKIGAI_CENTER),
              background:
                "radial-gradient(circle, rgba(148,86,28,0.7) 0%, rgba(255,254,253,1) 100%)",
            }}
            {...popUpVariant(SEQUENCE_DELAYS.ikigaiCenter)}
          >
            <p className="text-white font-semibold text-[10px] min-[376px]:text-xs md:text-base xl:text-3xl text-center">
              IKIGAI
            </p>
          </m.div>

          {/* ─── Intersection Labels (Passion, Mission, Profession, Vocation) ─── */}
          {INTERSECTION_LABELS.map((label, index) => {
            const pos = getPos(label);
            return (
              <m.button
                key={label.key}
                type="button"
                className="absolute px-[2%] py-[0.5%] rounded-[200px] flex items-center justify-center cursor-pointer"
                style={{
                  ...pos,
                  backgroundColor: label.bgColor,
                }}
                {...popUpVariant(SEQUENCE_DELAYS.labels + index * 0.1)}
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSectionClick(label.key)}
              >
                <p className="text-white font-semibold text-[10px] min-[376px]:text-xs md:text-lg xl:text-2xl text-center py-[2.6%] px-[7.8%] whitespace-nowrap">
                  {label.label}
                </p>
              </m.button>
            );
          })}

          {/* ─── Description Text ─── */}
          <m.div
            className="absolute flex flex-col items-center text-center text-white"
            style={getPos(DESCRIPTION_POS)}
            {...fadeInVariant(SEQUENCE_DELAYS.description)}
          >
            <p className="font-semibold text-sm min-[376px]:text-base md:text-xl xl:text-2xl">
              เส้นทางแห่งการปรับตัวเพื่อเข้าสู่สังคมการทำงาน
            </p>
            <p className="text-[10px] min-[376px]:text-xs md:text-sm xl:text-base mt-[1%]">
              กดคลิกแต่ละวงกลมเพื่ออ่านเพิ่มเติม
            </p>
          </m.div>

          {/* ─── Save Button ─── */}
          <m.button
            type="button"
            className="absolute z-20 cursor-pointer"
            style={getPos(SAVE_BTN_POS)}
            data-hide-capture="true"
            {...popUpVariant(SEQUENCE_DELAYS.buttons)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSaveResult}
            disabled={saveStatus === "saving"}
            aria-label="บันทึกผลลัพธ์"
          >
            <Image
              src="/assets/icons/save_btn.webp"
              alt="Save result"
              fill
              className="object-contain"
              sizes="70px"
              crossOrigin="anonymous"
            />
          </m.button>

          {/* ─── Share Button ─── */}
          <m.button
            type="button"
            className="absolute z-20 cursor-pointer"
            style={getPos(SHARE_BTN_POS)}
            data-hide-capture="true"
            {...popUpVariant(SEQUENCE_DELAYS.buttons + 0.1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShareResult}
            aria-label="แชร์ผลลัพธ์"
          >
            <Image
              src="/assets/icons/share_btn.webp"
              alt="Share result"
              fill
              className="object-contain"
              sizes="70px"
              crossOrigin="anonymous"
            />
          </m.button>

          {/* ─── Continue Button (ไป Closing Scene) ─── */}
          <m.button
            type="button"
            className="absolute z-20 cursor-pointer"
            style={getPos(CONTINUE_BTN_POS)}
            data-hide-capture="true"
            {...popUpVariant(SEQUENCE_DELAYS.buttons + 0.2)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleContinue}
            aria-label="ไปต่อ"
          >
            <Image
              src="/assets/icons/continue_btn.webp"
              alt="Continue to closing"
              fill
              className="object-contain"
              sizes="70px"
              crossOrigin="anonymous"
            />
          </m.button>
        </SceneLayer>

        {/* ─── Section Detail Modal ─── */}
        <AnimatePresence>
          {selectedSection && selectedSectionData && (
            <SectionDetailModal
              isOpen={true}
              onClose={handleCloseModal}
              sectionKey={selectedSection}
              sectionData={selectedSectionData}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
