import { getImgPath } from "@/utils/cloudinaryUtils";
import type { SceneItemData } from "../components/reusable/SceneLayer";

//? Scene 8.1 Data: Called Upon (World Session)
//? Layout: Desktop 1920×1080, Mobile 1080×1920
//? 500vh total: 200vh (lake) + 100vh (bloom) + 200vh (dark/cat/question)
//?
//? Animation Groups:
//? 1  = mountain_lake       (0→0.08 fade in, 0.55→0.62 fade out)
//? 2  = stone_lake          (0.02→0.10 fade in, 0.55→0.62 fade out)
//? 3  = lotus_5             (0.04→0.12 fade in, 0.55→0.62 fade out)
//? 4  = lotus_4             (0.06→0.14 fade in, 0.55→0.62 fade out)
//? 5  = lotus_2             (0.08→0.16 fade in, 0.38→0.42 fade out for bloom)
//? 6  = lotus_1             (0.08→0.16 fade in, 0.38→0.42 fade out for bloom)
//? 7  = lotus_3             (0.10→0.18 fade in, 0.38→0.42 fade out for bloom)
//? 8  = head                (0.12→0.20 fade in, 0.55→0.62 fade out)
//? 9  = lotus_2_bloom       (0.40→0.48 fade in, 0.55→0.62 fade out)
//? 10 = lotus_1_bloom       (0.40→0.48 fade in, 0.55→0.62 fade out)
//? 11 = lotus_3_bloom       (0.40→0.48 fade in, 0.55→0.62 fade out)
//? 12 = cat                 (0.65→0.73 fade in)
//?
//? Text overlays (rendered as real text, not images):
//? text_1 "เราต้องการ คนคิดใหม่ ๆ"          (0.42→0.50 fade in, 0.55→0.62 fade out)
//? text_2 "เราต้องการ คนสื่อสารได้หลายภาษา"  (0.44→0.52 fade in, 0.55→0.62 fade out)
//? text_3 "เราต้องการ ผู้นำ"                  (0.46→0.54 fade in, 0.55→0.62 fade out)
//? text_4 cat dialogue                       (0.70→0.78 fade in)

// ────────────────────────────────────────────────────
//  Scene Items
// ────────────────────────────────────────────────────

export const SCENE_S8_1_ITEMS: SceneItemData[] = [
  //? ── Phase 1: Lake Scene (200vh) ──

  {
    id: "mountain_lake",
    src: getImgPath("Scene/Scene8/01/mountain_lake.webp"),
    alt: "Mountain and lake background",
    style: {
      //? Desktop: 2837.24×1182.76 at (-482.55, 58.02) in 1920×1080
      width: "147.77%",
      height: "109.51%",
      left: "-25.13%",
      top: "5.37%",
    },
    mobileStyle: {
      //? Mobile: 4113.84×1714.93 at (-1593.61, 272.76) in 1080×1920
      width: "380.91%",
      height: "89.32%",
      left: "-147.56%",
      top: "14.21%",
    },
    animGroup: 1,
    priority: true,
  },
  {
    id: "stone_lake",
    src: getImgPath("Scene/Scene8/01/stone_lake.webp"),
    alt: "Stone formations on the lake",
    style: {
      //? Desktop: 2834.72×724.84 at (-527.81, 219.15) in 1920×1080
      width: "147.64%",
      height: "67.11%",
      left: "-27.49%",
      top: "20.29%",
    },
    mobileStyle: {
      //? Mobile: 3918.11×539.48 at (-1659.24, 506.39) in 1080×1920
      width: "362.79%",
      height: "28.10%",
      left: "-153.63%",
      top: "30%",
    },
    animGroup: 2,
  },
  {
    id: "lotus_5",
    src: getImgPath("Scene/Scene8/01/lotus_5.webp"),
    alt: "Lotus flower 5",
    style: {
      //? Desktop: 776.37×1184.59 at (1234.84, 537.55) in 1920×1080
      width: "40.44%",
      height: "109.68%",
      left: "64.31%",
      top: "49.77%",
    },
    mobileStyle: {
      //? Mobile: 300.33×96.80 at (896.54, 978.67) in 1080×1920
      width: "27.81%",
      height: "5.04%",
      left: "83.01%",
      top: "50.97%",
    },
    animGroup: 3,
  },
  {
    id: "lotus_4",
    src: getImgPath("Scene/Scene8/01/lotus_4.webp"),
    alt: "Lotus flower 4",
    style: {
      //? Desktop: 700.58×865.62 at (-4.67, 470.26) in 1920×1080
      width: "36.49%",
      height: "80.15%",
      left: "-0.24%",
      top: "43.54%",
    },
    mobileStyle: {
      //? Mobile: 219.16×70.91 at (-104.06, 1021.10) in 1080×1920
      width: "20.29%",
      height: "3.69%",
      left: "-9.64%",
      top: "53.18%",
    },
    animGroup: 4,
  },
  {
    id: "lotus_2",
    src: getImgPath("Scene/Scene8/01/lotus_2.webp"),
    alt: "Lotus flower 2 (closed)",
    style: {
      //? Desktop: 607.96×896.60 at (560.18, 525.06) in 1920×1080
      width: "31.66%",
      height: "83.02%",
      left: "29.18%",
      top: "48.62%",
    },
    mobileStyle: {
      //? Mobile: 881.50×1300.02 at (-81.71, 949.94) in 1080×1920
      width: "81.62%",
      height: "67.71%",
      left: "-7.57%",
      top: "49.48%",
    },
    animGroup: 5,
  },
  {
    id: "lotus_1",
    src: getImgPath("Scene/Scene8/01/lotus_1.webp"),
    alt: "Lotus flower 1 (closed)",
    style: {
      //? Desktop: 386.14×461.48 at (1110.61, 668.10) in 1920×1080
      width: "20.11%",
      height: "42.73%",
      left: "57.84%",
      top: "61.86%",
    },
    mobileStyle: {
      //? Mobile: 559.91×669.15 at (716.36, 1157.34) in 1080×1920
      width: "51.84%",
      height: "34.85%",
      left: "66.33%",
      top: "60.28%",
    },
    animGroup: 6,
  },
  {
    id: "lotus_3",
    src: getImgPath("Scene/Scene8/01/lotus_3.webp"),
    alt: "Lotus flower 3 (closed)",
    style: {
      //? Desktop: 236.15×273.64 at (923.69, 439.70) in 1920×1080
      width: "12.30%",
      height: "25.34%",
      left: "48.11%",
      top: "40.71%",
    },
    mobileStyle: {
      //? Mobile: 342.36×396.79 at (445.38, 826.16) in 1080×1920
      width: "31.70%",
      height: "20.67%",
      left: "41.24%",
      top: "43.03%",
    },
    animGroup: 7,
  },
  {
    id: "head",
    src: getImgPath("Scene/Scene8/01/head.webp"),
    alt: "Character head reflection in lake",
    style: {
      //? Desktop: 694.68×630.72 at (650.63, 792.03) in 1920×1080
      width: "36.18%",
      height: "58.40%",
      left: "33.89%",
      top: "73.34%",
    },
    mobileStyle: {
      //? Mobile: 1057.99×914.53 at (-1.28, 1337.01) in 1080×1920
      width: "97.96%",
      height: "47.63%",
      left: "-0.12%",
      top: "69.64%",
    },
    animGroup: 8,
    className: "z-1",
  },

  //? ── Phase 2: Bloom Lotuses (100vh) ──

  {
    id: "lotus_2_bloom",
    src: getImgPath("Scene/Scene8/01/lotus_2_bloom.webp"),
    alt: "Lotus flower 2 (blooming)",
    style: {
      //? Desktop: 607.96×902.83 at (560.18, 518.83) in 1920×1080
      width: "31.66%",
      height: "83.60%",
      left: "29.18%",
      top: "48.04%",
    },
    mobileStyle: {
      //? Mobile: 881.50×1309.05 at (-81.71, 940.91) in 1080×1920
      width: "81.62%",
      height: "68.18%",
      left: "-7.57%",
      top: "49.01%",
    },
    animGroup: 9,
  },
  {
    id: "lotus_1_bloom",
    src: getImgPath("Scene/Scene8/01/lotus_1_bloom.webp"),
    alt: "Lotus flower 1 (blooming)",
    style: {
      //? Desktop: 386.14×465.11 at (1110.61, 664.47) in 1920×1080
      width: "20.11%",
      height: "43.07%",
      left: "57.84%",
      top: "61.52%",
    },
    mobileStyle: {
      //? Mobile: 559.91×674.38 at (716.36, 1152.11) in 1080×1920
      width: "51.84%",
      height: "35.12%",
      left: "66.33%",
      top: "60.01%",
    },
    animGroup: 10,
  },
  {
    id: "lotus_3_bloom",
    src: getImgPath("Scene/Scene8/01/lotus_3_bloom.webp"),
    alt: "Lotus flower 3 (blooming)",
    style: {
      //? Desktop: 264.57×275.38 at (923.69, 437.96) in 1920×1080
      width: "13.78%",
      height: "25.50%",
      left: "48.11%",
      top: "40.55%",
    },
    mobileStyle: {
      //? Mobile: 383.59×399.31 at (445.38, 823.64) in 1080×1920
      width: "35.52%",
      height: "20.80%",
      left: "41.24%",
      top: "42.90%",
    },
    animGroup: 11,
  },

  //? ── Phase 3: Cat (200vh) ──
  //? Dark overlay is rendered as CSS in the component
  //? cat ย้ายไปใช้ LazyLottie ใน s8_1.tsx แล้ว (cat1.json)
];

// ────────────────────────────────────────────────────
//  Question & Choice Data
// ────────────────────────────────────────────────────

//? Text bubble content (Phase 2 — rendered as real text overlays)
export const S8_1_TEXT_BUBBLES = [
  {
    id: "text_1",
    text: "เราต้องการ\nคนคิดใหม่ ๆ",
    //? Desktop: 238×140 at (576, 371) in 1920×1080
    style: { left: "30.00%", top: "34.35%", width: "12.40%" },
    //? Mobile: 198×116 at (62, 739) in 1080×1920
    mobileStyle: { left: "5.74%", top: "38.49%", width: "18.33%" },
  },
  {
    id: "text_2",
    text: "เราต้องการ\nคนสื่อสารได้หลายภาษา",
    //? Desktop: 423×140 at (882, 296) in 1920×1080
    style: { left: "45.94%", top: "27.41%", width: "22.03%" },
    //? Mobile: 346×116 at (529, 662) in 1080×1920
    mobileStyle: { left: "48.98%", top: "34.48%", width: "32.04%" },
  },
  {
    id: "text_3",
    text: "เราต้องการ\nผู้นำ",
    //? Desktop: 228×140 at (1207, 512) in 1920×1080
    style: { left: "62.86%", top: "47.41%", width: "11.88%" },
    //? Mobile: 191×116 at (835, 974) in 1080×1920
    mobileStyle: { left: "77.31%", top: "50.73%", width: "17.69%" },
  },
] as const;

//? Cat dialogue text (Phase 3 — rendered as real text overlay)
export const S8_1_CAT_DIALOGUE =
  "เจ้ามองเห็นหรือไม่… โลกใบนี้เต็มไปด้วยเสียงเรียกร้อง\nทุกแห่งต่างตามหาผู้คนที่จะมอบบางสิ่งให้แก่พวกเขา";

//? Cat dialogue position
export const S8_1_CAT_DIALOGUE_POSITION = {
  //? Desktop: 888×120 at (852, 259) in 1920×1080
  style: { left: "44.38%", top: "23.98%", width: "46.25%" },
  //? Mobile: 888×120 at (96, 269) in 1080×1920
  mobileStyle: { left: "0%", top: "14.01%", width: "100%" },
};

//? Question text for the "Called Upon" scene
export const S8_1_QUESTION =
  "เจ้าล่ะ… เคยมีใครขอให้เจ้าช่วยเหลือสิ่งใดบ้างไหม\nหรือคนส่วนใหญ่มักพูดขอบคุณเจ้า?";

//? Choice options
export const CALLED_UPON_CHOICES = [
  { id: "yes", text: "เคย" },
  { id: "no", text: "ไม่เคย" },
] as const;
