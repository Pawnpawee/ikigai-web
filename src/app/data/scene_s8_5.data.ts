import { getImgPath } from "@/utils/cloudinaryUtils";
import type { SceneItemData } from "../components/reusable/SceneLayer";

//? Scene 8.5 Data: Future Value (World Session — "งานจะยังมีคุณค่าในอีกสิบปี?")
//? Layout: Desktop 1920×1080, Mobile 1080×1920
//? Figma: Desktop 867:5042, Mobile 867:12145
//? 400vh total: 200vh (lake scene) + 200vh (cat + question)
//?
//? Animation Groups — Phase 1 (lake scene):
//? 1 = mountain_lake  (full frame bg)
//? 2 = stone_lake     (full frame lake overlay)
//? 3 = lotus_5        (right lotus cluster)
//? 4 = lotus_4        (left bottom lotus)
//? 5 = lotus_2        (center-left lotus)
//? 6 = lotus_1        (right lotus)
//? 7 = lotus_3        (center lotus)
//? 8 = head           (character head at bottom)
//?
//? Animation Groups — Phase 2 (cat + question):
//? 9 = cat            (cat illustration)
//? Dark overlay uses CSS <m.div> (like S8_1), not an image

// ────────────────────────────────────────────────────
//  Phase 1: Lake Scene Items (200vh)
// ────────────────────────────────────────────────────

export const SCENE_S8_5_ITEMS: SceneItemData[] = [
  {
    id: "mountain_lake",
    src: getImgPath("Scene/Scene8/05/mountain_lake.webp"),
    alt: "Mountain lake background",
    //? Desktop: 867:5047 x=-482.55, y=58.02, w=2837.24, h=1145.82 → full frame
    style: {
      width: "147.77%",
      height: "106.09%",
      left: "-25.13%",
      bottom: "-11.47%",
    },
    //? Mobile: 867:12155 x=-1558.69, y=293.66, w=4030.82, h=1627.85 → full frame
    mobileStyle: {
      width: "373.22%",
      height: "84.78%",
      left: "-144.32%",
      bottom: "0%",
    },
    animGroup: 1,
    priority: true,
  },
  {
    id: "stone_lake",
    src: getImgPath("Scene/Scene8/05/stone_lake.webp"),
    mobileSrc: getImgPath("Scene/Scene8/05/stone_lake_mb.webp"),
    alt: "Stone lake overlay",
    //? Desktop: 867:5050 x=-527.81, y=219.15, w=2834.72, h=724.84 → full frame
    style: {
      width: "147.64%",
      height: "67.11%",
      left: "-27.49%",
      bottom: "12.59%",
    },
    //? Mobile: 867:12158 x=-1622.99, y=522.60, w=3839.04, h=528.58 → full frame
    mobileStyle: {
      width: "355.47%",
      height: "27.53%",
      left: "-150.28%",
      top: "27.22%",
    },
    animGroup: 2,
  },
  {
    id: "lotus_5",
    src: getImgPath("Scene/Scene8/05/lotus_5.webp"),
    alt: "Lotus cluster — right",
    style: {
      //? Desktop: 867:5279 x=1234.84, y=537.55, w=776.37, h=1184.59
      width: "40.44%",
      height: "109.68%",
      left: "64.31%",
      top: "49.77%",
    },
    mobileStyle: {
      //? Mobile: 867:12294 x=881.19, y=985.32, w=294.28, h=94.84
      width: "27.25%",
      height: "4.94%",
      left: "81.59%",
      top: "51.32%",
    },
    animGroup: 3,
  },
  {
    id: "lotus_4",
    src: getImgPath("Scene/Scene8/05/lotus_4.webp"),
    alt: "Lotus — bottom left",
    style: {
      //? Desktop: 867:5083 x=-4.67, y=470.26, w=700.58, h=865.62
      width: "36.49%",
      height: "80.15%",
      left: "-0.24%",
      top: "43.54%",
    },
    mobileStyle: {
      //? Mobile: 867:12174 x=-99.21, y=1026.91, w=214.72, h=69.47
      width: "19.88%",
      height: "3.62%",
      left: "-9.19%",
      top: "53.48%",
    },
    animGroup: 4,
  },
  {
    id: "lotus_2",
    src: getImgPath("Scene/Scene8/05/lotus_2.webp"),
    alt: "Lotus — center left",
    style: {
      //? Desktop: 867:5201 x=560.18, y=522.69, w=607.96, h=898.97
      width: "31.66%",
      height: "83.24%",
      left: "29.18%",
      top: "48.40%",
    },
    mobileStyle: {
      //? Mobile: 867:12216 x=-77.29, y=953.82, w=863.70, h=1277.13
      width: "79.97%",
      height: "66.52%",
      left: "-7.16%",
      top: "49.68%",
    },
    animGroup: 5,
  },
  {
    id: "lotus_1",
    src: getImgPath("Scene/Scene8/05/lotus_1.webp"),
    alt: "Lotus — right",
    style: {
      //? Desktop: 867:5162 x=1110.61, y=669.57, w=386.14, h=460.01
      width: "20.11%",
      height: "42.59%",
      left: "57.84%",
      top: "62.00%",
    },
    mobileStyle: {
      //? Mobile: 867:12183 x=704.67, y=1162.52, w=548.59, h=653.51
      width: "50.80%",
      height: "34.04%",
      left: "65.25%",
      top: "60.55%",
    },
    animGroup: 6,
  },
  {
    id: "lotus_3",
    src: getImgPath("Scene/Scene8/05/lotus_3.webp"),
    alt: "Lotus — center",
    style: {
      //? Desktop: 867:5244 x=923.69, y=441.82, w=264.89, h=271.52
      width: "13.80%",
      height: "25.14%",
      left: "48.11%",
      top: "40.91%",
    },
    mobileStyle: {
      //? Mobile: 867:12259 x=439.16, y=838.92, w=376.31, h=385.76
      width: "34.84%",
      height: "20.09%",
      left: "40.66%",
      top: "43.69%",
    },
    animGroup: 7,
  },
  {
    id: "head",
    src: getImgPath("Scene/Scene8/05/head.webp"),
    alt: "Character head",
    style: {
      //? Desktop: 867:8659 x=650.63, y=792.03, w=694.68, h=630.72
      width: "36.18%",
      height: "58.40%",
      left: "33.89%",
      top: "73.34%",
    },
    mobileStyle: {
      //? Mobile: 867:12305 x=6.14, y=1338.10, w=1036.64, h=896.07
      width: "95.99%",
      height: "46.67%",
      left: "0.57%",
      top: "69.69%",
    },
    animGroup: 8,
  },

  // ────────────────────────────────────────────────────
  //  Phase 2: Cat + Question Scene Items (200vh)
  // ────────────────────────────────────────────────────

  {
    id: "cat",
    src: getImgPath("Scene/Scene8/05/cat.webp"),
    alt: "Cat illustration",
    style: {
      //? Desktop: 867:7968 x=220.36, y=234.73, w=647.85, h=660.03
      width: "33.74%",
      height: "61.11%",
      left: "11.48%",
      top: "21.73%",
    },
    mobileStyle: {
      //? Mobile: 867:14373 x=176.76, y=894.32, w=726.59, h=740.24
      width: "67.28%",
      height: "38.55%",
      left: "16.37%",
      top: "46.58%",
    },
    animGroup: 9,
    className: "z-1",
  },
];

// ────────────────────────────────────────────────────
//  Question: Future Value
// ────────────────────────────────────────────────────

//? Figma 867:8162 (Desktop) / 867:14567 (Mobile)
export const S8_5_QUESTION =
  "เจ้าคิดหรือไม่… ว่างานที่เจ้าเลือก\nจะยังคงมีคุณค่าในอีกสิบปีข้างหน้า?";

export const FUTURE_VALUE_CHOICES = [
  { id: "yes", text: "ใช่" },
  { id: "no", text: "ไม่ใช่" },
] as const;

//? Question frame position (contains text + buttons as flex-col)
export const S8_5_QUESTION_POSITION = {
  //? Desktop: 867:8161 x=1021, y=423, w=582 in 1920×1080
  style: { left: "53.18%", top: "39.17%", width: "30.31%" },
  //? Mobile: 867:14566 x=249, y=423, w=582 in 1080×1920
  mobileStyle: { left: "0%", top: "22.03%", width: "100%" },
};
