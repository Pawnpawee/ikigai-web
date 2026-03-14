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
import { getImgPath } from "@/utils/cloudinaryUtils";
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
}

export default function IkigaiResultDisplay({
  analysis,
  scores,
  playersInSessionPct = 0,
  maxSessionPercentage,
  playerName,
  onSaveSuccess,
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
    router.push("/closing");
  }, [router]);

  const handleSectionClick = useCallback((section: keyof IkigaiAnalysis) => {
    setSelectedSection(section);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedSection(null);
  }, []);

  const handleSaveResult = useCallback(async () => {
    if (!captureRef.current || saveStatus === "saving") return;
    setSaveStatus("saving");

    // ⭐ 1. เตรียมตัวแปรสำหรับ DOM Interception เพื่อแก้ปัญหา Next.js Image + Cloudinary จอดำ
    const captureEl = captureRef.current;
    const imgElements = captureEl.querySelectorAll("img");
    const originalAttributes: Array<{
      src: string;
      srcset: string | null;
      crossOrigin: string | null;
    }> = [];

    //? ใส่ bg-result gradient ชั่วคราว เพราะ parent อยู่นอก captureRef
    const originalBackground = captureEl.style.background;
    captureEl.style.background =
      "linear-gradient(180deg, #09345b 0%, #083054 5%, #062137 29%, #051622 54%, #041015 77%, #040e11 100%)";

    // ⭐ 2. แอบสลับ URL ของ Next.js กลับไปเป็น URL ของ Cloudinary แท้ๆ ชั่วคราว
    imgElements.forEach((img, index) => {
      // ✅ เก็บค่าดั้งเดิมของ React/Next.js ไว้ก่อน
      originalAttributes[index] = {
        src: img.src,
        srcset: img.getAttribute("srcset"),
        crossOrigin: img.getAttribute("crossOrigin"),
      };

      // ✅ ตรวจสอบว่าเป็นรูปภาพที่ผ่านการ Optimize โดย Next.js หรือไม่
      if (img.src.includes("/_next/image")) {
        try {
          const urlObj = new URL(img.src, window.location.origin);
          const actualCloudinaryUrl = urlObj.searchParams.get("url");

          if (actualCloudinaryUrl) {
            img.src = actualCloudinaryUrl; // ดึงภาพจาก Cloudinary ตรงๆ
            img.removeAttribute("srcset"); // ลบ srcset ชั่วคราว ป้องกัน Canvas สับสน
            img.crossOrigin = "anonymous"; // ปลดล็อค CORS Policy
          }
        } catch (e) {
          console.error("ไม่สามารถแกะ URL ของภาพได้:", e);
        }
      }
    });

    //? รอให้รูปทั้งหมดโหลด/ถอดรหัสเสร็จก่อน capture
    //? โดยเฉพาะบน mobile ที่ network ช้ากว่า ทำให้บางรูป (เช่นวงกลม) ยังไม่พร้อมตอน toPng
    const waitForImageReady = (img: HTMLImageElement) => {
      return new Promise<void>((resolve) => {
        // complete + naturalWidth > 0 = โหลดสำเร็จแล้ว
        if (img.complete && img.naturalWidth > 0) {
          if (typeof img.decode === "function") {
            img
              .decode()
              .catch(() => undefined)
              .finally(() => resolve());
            return;
          }
          resolve();
          return;
        }

        const done = () => {
          img.removeEventListener("load", done);
          img.removeEventListener("error", done);
          resolve();
        };

        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      });
    };

    await Promise.all(Array.from(imgElements).map(waitForImageReady));

    try {
      //? Screenshot ทั้ง container ด้วย html-to-image
      const dataUrl = await toPng(captureRef.current, {
        // ❌ ลบ cacheBust: true ออกเด็ดขาด เพื่อป้องกัน Next.js HTTP 400 Error
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
      // ⭐ 3. สำคัญมาก: ต้องคืนค่า DOM กลับสู่สภาพเดิมเสมอ! ไม่ว่าจะแคปสำเร็จหรือ Error
      // เพื่อป้องกันไม่ให้ Virtual DOM ของ React ทำงานผิดพลาดในภายหลัง
      captureEl.style.background = originalBackground;
      imgElements.forEach((img, index) => {
        img.src = originalAttributes[index].src;

        if (originalAttributes[index].srcset) {
          img.setAttribute(
            "srcset",
            originalAttributes[index].srcset as string,
          );
        }

        if (originalAttributes[index].crossOrigin) {
          img.setAttribute(
            "crossOrigin",
            originalAttributes[index].crossOrigin as string,
          );
        } else {
          img.removeAttribute("crossOrigin");
        }
      });
    }
  }, [onSaveSuccess, playerName, saveStatus]); // Dependencies ครบถ้วนตามที่คุณตั้งไว้

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
            <Image
              src={cardAssets.cardFrame}
              alt="Card frame"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 50vw, 30vw"
              crossOrigin="anonymous"
            />
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
                <Image
                  src={circle.circleSrc}
                  alt={circle.label}
                  fill
                  className="object-contain"
                  sizes={isMobile ? "32vw" : "20vw"}
                  crossOrigin="anonymous"
                />

                {/* Content: icon + label + percent + summary */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-[3.95%] px-[10%]">
                  {/* Icon */}
                  <div className="relative w-[12.57%] aspect-square">
                    <Image
                      src={circle.iconSrc}
                      alt={`${circle.label} icon`}
                      fill
                      className="object-contain"
                      sizes="48px"
                      crossOrigin="anonymous"
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
                <p className="text-white font-semibold text-xs min-[376px]:text-sm md:text-lg xl:text-2xl text-center py-[2.6%] px-[7.8%] whitespace-nowrap">
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
              src={getImgPath("Scene/Result/save_btn.webp")}
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
              src={getImgPath("Scene/Result/share_btn.webp")}
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
              src={getImgPath("Icon/continue_btn.webp")}
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
