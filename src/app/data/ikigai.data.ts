import { getImgPath, getJsonUrl } from "@/utils/cloudinaryUtils";

// ─────────────────────────────────────────────────────────────
//? Card Types — 5 การ์ดตาม MaxSessionPercentage จาก API
//? การ์ดเป็น Lottie file, glow เป็น CSS radial-gradient
// ─────────────────────────────────────────────────────────────

export interface IkigaiSection {
  short_summary?: string;
  overall_summary: string;
  strengths: string[];
  development_points: string[];
}

export interface IkigaiAnalysis {
  what_you_love: IkigaiSection;
  what_you_good_at: IkigaiSection;
  what_the_world_need: IkigaiSection;
  what_you_can_be_paid_for: IkigaiSection;
  passion: IkigaiSection;
  mission: IkigaiSection;
  profession: IkigaiSection;
  vocation: IkigaiSection;
}

export type IkigaiScores = Partial<Record<keyof IkigaiAnalysis, number>>;

//? MaxSessionPercentage → CardType mapping
type CardType = "Lover" | "Master" | "Solver" | "Earner" | "Dreamer";

interface CardAsset {
  //? Lottie JSON URL สำหรับการ์ดตัวละคร
  cardLottie: string;
  //? กรอบการ์ด (frame) ครอบรอบ Lottie card
  cardFrame: string;
}

const CARD_ASSETS: Record<CardType, CardAsset> = {
  Lover: {
    cardLottie: getJsonUrl("Scene/Result/Lover.json"),
    cardFrame: getImgPath("Scene/Result/card.webp"),
  },
  Master: {
    cardLottie: getJsonUrl("Scene/Result/Master.json"),
    cardFrame: getImgPath("Scene/Result/card.webp"),
  },
  Solver: {
    cardLottie: getJsonUrl("Scene/Result/Solver.json"),
    cardFrame: getImgPath("Scene/Result/card.webp"),
  },
  Earner: {
    cardLottie: getJsonUrl("Scene/Result/Earner.json"),
    cardFrame: getImgPath("Scene/Result/card.webp"),
  },
  Dreamer: {
    cardLottie: getJsonUrl("Scene/Result/Dreamer.json"),
    cardFrame: getImgPath("Scene/Result/card.webp"),
  },
};


//? Map MaxSessionPercentage string → CardType
const MAX_SESSION_TO_CARD: Record<string, CardType> = {
  LovePercentage: "Lover",
  GoodAtPercentage: "Master",
  WorldNeedsPercentage: "Solver",
  PaidForPercentage: "Earner",
  SamePercentage: "Dreamer",
};

const getCardType = (maxSession?: string): CardType => {
  if (!maxSession) return "Dreamer";
  return MAX_SESSION_TO_CARD[maxSession] ?? "Dreamer";
};

export const getCardAssets = (maxSession?: string): CardAsset => {
  return CARD_ASSETS[getCardType(maxSession)];
};

//? สี accent ของแต่ละการ์ด — ใช้แสดง percent text, highlight ฯลฯ
const CARD_ACCENT_COLOR: Record<CardType, string> = {
  Lover: "#ec4151",
  Master: "#8D31FD",
  Solver: "#E1ED30",
  Earner: "#FFBC0C",
  Dreamer: "#3473C3",
};

export const getCardAccentColor = (maxSession?: string): string => {
  return CARD_ACCENT_COLOR[getCardType(maxSession)];
};

//? ตำแหน่งการ์ด (Desktop / Mobile) — ใช้สำหรับ Lottie container
export const CARD_POS = {
  // Desktop: x=269, y=101.08, w=468.31, h=807.42 → % of 1920x1080
  desktop: {
    left: "14.01%",
    top: "9.36%",
    width: "24.39%",
    height: "74.76%",
  },
  // Mobile: x=319, y=110, w=442.06, h=762.16 → % of 1080x1920
  mobile: {
    left: "29.54%",
    top: "5.73%",
    width: "40.93%",
    height: "39.7%",
  },
};

// ─────────────────────────────────────────────────────────────
//? Card Glow — CSS radial-gradient แทน card_light image
//? ใช้สี accent ของแต่ละ card type เป็นฐาน
// ─────────────────────────────────────────────────────────────

//? ตำแหน่ง glow effect ด้านหลังการ์ด
export const CARD_GLOW_POS = {
  // Desktop: x=17.79, y=18.47, w=971.08, h=971.08 → % of 1920x1080
  desktop: {
    left: "0.93%",
    top: "1.71%",
    width: "50.58%",
    height: "89.92%",
  },
  // Mobile: x=54, y=18.47, w=971.08, h=971.08 → % of 1080x1920
  mobile: {
    left: "5%",
    top: "0.96%",
    width: "89.92%",
    height: "50.58%",
  },
};

//? Gradient stops: สีจาง + โปร่งใสขึ้นจากกลาง → ขอบ
const GLOW_STOPS = [
  { f: 1.0, pos: 0 },
  { f: 0.97, pos: 9 },
  { f: 0.89, pos: 23 },
  { f: 0.76, pos: 39 },
  { f: 0.58, pos: 56 },
  { f: 0.34, pos: 76 },
  { f: 0.06, pos: 96 },
  { f: 0, pos: 100 },
] as const;

/**
 * สร้าง radial-gradient string จาก hex accent color
 * แต่ละ stop: rgb = accent * factor, alpha = factor
 */
export const getCardGlowGradient = (hex: string): string => {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);

  const stops = GLOW_STOPS.map(
    ({ f, pos }) =>
      `rgba(${Math.round(r * f)}, ${Math.round(g * f)}, ${Math.round(b * f)}, ${f}) ${pos}%`,
  ).join(", ");

  return `radial-gradient(50% 50% at 50% 50%, ${stops})`;
};

// ─────────────────────────────────────────────────────────────
//? Venn Diagram Circle Config (ตำแหน่ง + สีของวงกลม 4 ด้านหลัก)
//? Reference Desktop: parent=1920x1080, Reference Mobile: parent=1080x1920
// ─────────────────────────────────────────────────────────────

interface VennCircleConfig {
  key: keyof IkigaiAnalysis;
  label: string;
  iconSrc: string;
  //? Desktop position (% of 1920x1080)
  desktop: { left: string; top: string; width: string; height: string };
  //? Mobile position (% of 1080x1920)
  mobile: { left: string; top: string; width: string; height: string };
  //? Gradient circle image
  circleSrc: string;
}

export const VENN_CIRCLES: VennCircleConfig[] = [
  {
    key: "what_you_can_be_paid_for",
    label: "What you can\nbe paid for",
    iconSrc: getImgPath("Icon/paid.webp"),
    circleSrc: getImgPath("Scene/Hero/paid-circle.webp"),
    // Desktop: x=1151, y=515, w=379.68, h=379.68
    desktop: {
      left: "59.95%",
      top: "47.69%",
      width: "19.78%",
      height: "35.16%",
    },
    // Mobile: x=368, y=1378, w=345.14, h=345.14
    mobile: {
      left: "34.07%",
      top: "71.77%",
      width: "31.96%",
      height: "17.98%",
    },
  },

  {
    key: "what_you_good_at",
    label: "What you are\ngood at",
    iconSrc: getImgPath("Icon/skill.webp"),
    circleSrc: getImgPath("Scene/Hero/skill-circle.webp"),
    // Desktop: x=914.52, y=305, w=379.68, h=379.68
    desktop: {
      left: "47.63%",
      top: "28.24%",
      width: "19.78%",
      height: "35.16%",
    },
    // Mobile: x=153, y=1187, w=345.14, h=345.14
    mobile: {
      left: "14.17%",
      top: "61.82%",
      width: "31.96%",
      height: "17.98%",
    },
  },
  {
    key: "what_the_world_need",
    label: "What the\nworld needs",
    iconSrc: getImgPath("Icon/world.webp"),
    circleSrc: getImgPath("Scene/Hero/world-circle.webp"),
    // Desktop: x=1385.37, y=305, w=379.68, h=379.68
    desktop: {
      left: "72.15%",
      top: "28.24%",
      width: "19.78%",
      height: "35.16%",
    },
    // Mobile: x=581.44, y=1187.08, w=345.14, h=345.14
    mobile: {
      left: "53.84%",
      top: "61.83%",
      width: "31.96%",
      height: "17.98%",
    },
  },
  {
    key: "what_you_love",
    label: "What you\nlove",
    iconSrc: getImgPath("Icon/love.webp"),
    circleSrc: getImgPath("Scene/Hero/love-circle.webp"),
    // Desktop: x=1151, y=95.7, w=379.68, h=379.68
    desktop: {
      left: "59.95%",
      top: "8.86%",
      width: "19.78%",
      height: "35.16%",
    },
    // Mobile: x=368, y=997, w=345.14, h=345.14
    mobile: {
      left: "34.07%",
      top: "51.93%",
      width: "31.96%",
      height: "17.98%",
    },
  },
];

// ─────────────────────────────────────────────────────────────
//? Intersection Labels (Passion, Mission, Profession, Vocation)
// ─────────────────────────────────────────────────────────────

interface IntersectionLabelConfig {
  key: keyof IkigaiAnalysis;
  label: string;
  bgColor: string;
  //? Desktop position (% of 1920x1080)
  desktop: { left: string; top: string; width: string };
  //? Mobile position (% of 1080x1920)
  mobile: { left: string; top: string; width: string };
}

export const INTERSECTION_LABELS: IntersectionLabelConfig[] = [
  {
    key: "passion",
    label: "Passion",
    bgColor: "rgba(255,131,255,0.5)",
    // Desktop: x=979, y=204, w=147
    desktop: { left: "50.99%", top: "18.89%", width: "7.66%" },
    // Mobile: x=208, y=1096, w=147
    mobile: { left: "19.26%", top: "57.08%", width: "13.61%" },
  },
  {
    key: "mission",
    label: "Mission",
    bgColor: "rgba(222,255,141,0.5)",
    // Desktop: x=1572, y=204, w=145
    desktop: { left: "81.88%", top: "18.89%", width: "7.55%" },
    // Mobile: x=740, y=1096, w=145
    mobile: { left: "68.52%", top: "57.08%", width: "13.43%" },
  },
  {
    key: "profession",
    label: "Profession",
    bgColor: "rgba(182,148,237,0.5)",
    // Desktop: x=963, y=742, w=178
    desktop: { left: "50.16%", top: "68.7%", width: "9.27%" },
    // Mobile: x=192, y=1586, w=178
    mobile: { left: "17.78%", top: "82.6%", width: "16.48%" },
  },
  {
    key: "vocation",
    label: "Vocation",
    bgColor: "rgba(255,158,41,0.5)",
    // Desktop: x=1566, y=742, w=157
    desktop: { left: "81.56%", top: "68.7%", width: "8.18%" },
    // Mobile: x=734, y=1586, w=157
    mobile: { left: "67.96%", top: "82.6%", width: "14.54%" },
  },
];

// ─────────────────────────────────────────────────────────────
//? IKIGAI Center Label Config
// ─────────────────────────────────────────────────────────────

export const IKIGAI_CENTER = {
  //? Desktop: x=1253.11, y=400.48, w=180, h=180
  desktop: {
    left: "65.27%",
    top: "37.08%",
    width: "9.38%",
    height: "16.67%",
  },
  //? Mobile: x=469, y=1289, w=142, h=142
  mobile: {
    width: "10.19%",
    height: "5.73%",
    left: "44.91%",
    bottom: "26.30%",
  },
};

// ─────────────────────────────────────────────────────────────
//? Percent Text & Description Positions
// ─────────────────────────────────────────────────────────────

export const PERCENT_TEXT_POS = {
  //? Desktop: x=354 (center), y=949
  desktop: { left: "18.44%", top: "87.87%" },
  //? Mobile: x=391 (center ~540 centered), y=903
  mobile: { left: "0%", top: "45.8%" },
};

export const DESCRIPTION_POS = {
  //? Desktop: x=1020, y=921, w=645
  desktop: { left: "53.13%", top: "85.28%", width: "33.59%" },
  //? Mobile: x=218, y=1754, w=645
  mobile: { left: "0%", top: "91.35%", width: "100%" },
};

// ─────────────────────────────────────────────────────────────
//? Save / Share Button Positions
// ─────────────────────────────────────────────────────────────

export const SAVE_BTN_POS = {
  //? Desktop: x=1675.16, y=969.3, w=69.44, h=69.44
  desktop: {
    left: "87.25%",
    top: "89.75%",
    width: "3.62%",
    height: "6.43%",
  },
  //? Mobile: x=950.39, y=111.91, w=69.44, h=69.44
  mobile: {
    left: "77.5%",
    top: "31%",
    width: "6.43%",
    height: "3.62%",
  },
};

export const SHARE_BTN_POS = {
  //? Desktop: x=1778.75, y=969.3, w=69.44, h=69.44
  desktop: {
    left: "92.64%",
    top: "89.75%",
    width: "3.62%",
    height: "6.43%",
  },
  //? Mobile: x=950.39, y=202.49, w=69.44, h=69.44
  mobile: {
    left: "77.5%",
    top: "36%",
    width: "6.43%",
    height: "3.62%",
  },
};

export const CONTINUE_BTN_POS = {
  //? Desktop: ถัดจาก share button ลงล่าง, centered
  desktop: {
    left: "98.03%",
    top: "89.75%",
    width: "3.62%",
    height: "6.43%",
  },
  //? Mobile: ถัดจาก share button ลงล่าง
  mobile: {
    left: "77.5%",
    top: "41%",
    width: "6.43%",
    height: "3.62%",
  },
};
