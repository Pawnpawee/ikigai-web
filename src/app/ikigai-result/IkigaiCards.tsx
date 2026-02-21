"use client";
import { m } from "framer-motion";
import Image from "next/image";
import type { IkigaiAnalysis, IkigaiScores } from "@/app/types/ikigai.types";
import { getImgPath } from "@/utils/cloudinaryUtils";

//? 4 ด้านหลักที่ใช้หาตัวละคร
const CARD_KEYS = [
  "what_you_love",
  "what_you_good_at",
  "what_the_world_need",
  "what_you_can_be_paid_for",
] as const;

type CardKey = (typeof CARD_KEYS)[number];

//? Config ตัวละครแต่ละด้าน — ใส่ mock path ไว้ก่อน แล้วค่อยเปลี่ยนเป็น asset จริง
//todo: เปลี่ยน characterImg เป็น Cloudinary path จริงเมื่อมี asset
const CHARACTER_CONFIG: Record<
  CardKey,
  {
    name: string;
    title: string;
    subtitle: string;
    icon: string;
    characterImg: string;
    gradient: string;
    borderColor: string;
    glowColor: string;
    accentColor: string;
  }
> = {
  what_you_love: {
    name: "นักฝัน",
    title: "What You Love",
    subtitle: "สิ่งที่คุณรัก",
    icon: "❤️",
    characterImg: getImgPath("Result/character_love.webp"),
    gradient: "from-rose-600/60 via-pink-700/40 to-fuchsia-900/60",
    borderColor: "border-rose-400/70",
    glowColor: "shadow-rose-500/50",
    accentColor: "#ff6b9d",
  },
  what_you_good_at: {
    name: "จอมยุทธ์",
    title: "What You're Good At",
    subtitle: "สิ่งที่คุณถนัด",
    icon: "⭐",
    characterImg: getImgPath("Result/character_skill.webp"),
    gradient: "from-amber-600/60 via-orange-700/40 to-yellow-900/60",
    borderColor: "border-amber-400/70",
    glowColor: "shadow-amber-500/50",
    accentColor: "#ffa06b",
  },
  what_the_world_need: {
    name: "ผู้พิทักษ์",
    title: "What The World Needs",
    subtitle: "สิ่งที่โลกต้องการ",
    icon: "🌍",
    characterImg: getImgPath("Result/character_world.webp"),
    gradient: "from-emerald-600/60 via-green-700/40 to-teal-900/60",
    borderColor: "border-emerald-400/70",
    glowColor: "shadow-emerald-500/50",
    accentColor: "#6bffa3",
  },
  what_you_can_be_paid_for: {
    name: "นักสร้าง",
    title: "What You Can Be Paid For",
    subtitle: "สิ่งที่สร้างรายได้",
    icon: "💰",
    characterImg: getImgPath("Result/character_paid.webp"),
    gradient: "from-blue-600/60 via-indigo-700/40 to-sky-900/60",
    borderColor: "border-blue-400/70",
    glowColor: "shadow-blue-500/50",
    accentColor: "#6ba3ff",
  },
};

interface IkigaiCardsProps {
  scores: IkigaiScores;
  analysis: IkigaiAnalysis;
  onCardClick?: (key: keyof IkigaiAnalysis) => void;
}

export default function IkigaiCards({
  scores,
  analysis,
  onCardClick,
}: IkigaiCardsProps) {
  //? หาด้านที่คะแนนสูงสุด → ใช้เป็นตัวละครหลัก
  let topKey: CardKey = "what_you_love";
  let topScore = 0;
  for (const key of CARD_KEYS) {
    const s = scores[key] ?? 0;
    if (s > topScore) {
      topScore = s;
      topKey = key;
    }
  }

  const character = CHARACTER_CONFIG[topKey];
  const score = scores[topKey] ?? 0;
  const summary = analysis[topKey]?.short_summary;

  //? วงกลม progress สำหรับ score
  const RADIUS = 44;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Character Card */}
      <m.div
        className={`relative w-full max-w-[280px] rounded-2xl border-2 ${character.borderColor} backdrop-blur-lg overflow-hidden cursor-pointer group shadow-lg ${character.glowColor}`}
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
        whileHover={{ scale: 1.04, y: -4 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => onCardClick?.(topKey)}
      >
        {/* Card Background Gradient */}
        <div
          className={`absolute inset-0 bg-linear-to-b ${character.gradient}`}
        />

        {/* Animated glow border */}
        <div
          className="absolute inset-0 animate-pulse pointer-events-none"
          style={{
            boxShadow: `inset 0 0 30px ${character.accentColor}20, 0 0 40px ${character.accentColor}15`,
          }}
        />

        {/* Card Content */}
        <div className="relative z-10 flex flex-col items-center p-5 gap-3">
          {/* Top Badge */}
          <m.div
            className="flex items-center gap-1.5 bg-black/30 rounded-full px-3 py-1"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
          >
            <span className="text-sm">{character.icon}</span>
            <span className="text-white/80 text-[10px] font-medium tracking-wide uppercase">
              {character.subtitle}
            </span>
          </m.div>

          {/* Character Image */}
          <m.div
            className="relative w-40 h-48 md:w-44 md:h-52"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
          >
            <Image
              src={character.characterImg}
              alt={`${character.name} — ${character.title}`}
              fill
              className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              sizes="(max-width: 768px) 160px, 176px"
            />
          </m.div>

          {/* Character Name */}
          <m.div
            className="text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <h3
              className="text-xl md:text-2xl font-bold drop-shadow-lg"
              style={{ color: character.accentColor }}
            >
              {character.name}
            </h3>
            <p className="text-white/50 text-[10px] md:text-xs mt-0.5 tracking-wider uppercase">
              {character.title}
            </p>
          </m.div>

          {/* Score Ring */}
          <m.div
            className="relative w-16 h-16"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.6, type: "spring" }}
          >
            <svg
              className="w-full h-full -rotate-90"
              viewBox="0 0 100 100"
              role="img"
              aria-label={`${character.subtitle} ${score}%`}
            >
              <circle
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="5"
              />
              <m.circle
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                stroke={character.accentColor}
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${CIRCUMFERENCE}`}
                initial={{ strokeDashoffset: CIRCUMFERENCE }}
                animate={{
                  strokeDashoffset: CIRCUMFERENCE * (1 - score / 100),
                }}
                transition={{
                  delay: 1.0,
                  duration: 1.4,
                  ease: "easeOut",
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="font-bold text-base drop-shadow-lg"
                style={{ color: character.accentColor }}
              >
                {score}%
              </span>
            </div>
          </m.div>

          {/* Summary */}
          {summary && (
            <m.p
              className="text-white/60 text-[10px] md:text-xs text-center leading-relaxed line-clamp-2 px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              {summary}
            </m.p>
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors pointer-events-none" />
      </m.div>
    </div>
  );
}
