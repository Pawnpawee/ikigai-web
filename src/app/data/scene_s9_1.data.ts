import { getImgPath } from "@/utils/cloudinaryUtils";
import type { SceneItemData } from "../components/reusable/SceneLayer";

//? Scene 9.1 Data: Ever Paid (Market Scene)
//? Layout: Desktop 1920x1080, Mobile 1080x1920
//? Animation Groups (staggered entrance):
//?  Phase 1 — ฉากตลาด (market build-up, 0-0.5)
//?   1 = wall        (0   → 0.12)
//?   2 = shop4       (0.04→ 0.16)
//?   3 = shop3       (0.08→ 0.20)
//?   4 = shop2       (0.12→ 0.24)
//?   5 = shop1       (0.16→ 0.28)
//?   6 = humanmiddle (0.20→ 0.34)  — x ขวา
//?   7 = humanback   (0.24→ 0.38)
//?   8 = humanfront  (0.28→ 0.42)
//?  Phase 2 — คำถาม (dark overlay + question, 0.5-1.0)
//?   9  = bgblack    CSS overlay (ไม่ใช่รูปภาพ — ใช้ <m.div> แทน)
//?   10 = cat        (0.55→ 0.68)

// ────────────────────────────────────────────────────
//  Background SceneLayer Items
// ────────────────────────────────────────────────────

export const SCENE_S9_1_ITEMS: SceneItemData[] = [
  //? ─── Phase 1: Market Build-up ────────────────────

  {
    id: "wall",
    src: getImgPath("Scene/Scene9/01/wall.webp"),
    alt: "Market wall background",
    style: {
      width: "229.74%",
      height: "181.61%",
      left: "-73.80%",
      top: "-42.74%",
    },
    mobileStyle: {
      width: "408.42%",
      height: "102.16%",
      left: "-167.60%",
      top: "-1.64%",
    },
    animGroup: 1,
  },
  {
    id: "shop4",
    src: getImgPath("Scene/Scene9/01/shop4.webp"),
    alt: "Market shop 4",
    style: {
      width: "10.49%",
      height: "22.12%",
      left: "27.54%",
      top: "48.71%",
    },
    mobileStyle: {
      width: "18.66%",
      height: "12.44%",
      left: "12.56%",
      top: "49.80%",
    },
    animGroup: 2,
  },
  {
    id: "shop3",
    src: getImgPath("Scene/Scene9/01/shop3.webp"),
    alt: "Market shop 3",
    style: {
      width: "29.48%",
      height: "76.61%",
      left: "58.53%",
      top: "10.08%",
    },
    mobileStyle: {
      width: "52.41%",
      height: "43.09%",
      left: "67.66%",
      top: "28.07%",
    },
    animGroup: 3,
  },
  {
    id: "shop2",
    src: getImgPath("Scene/Scene9/01/shop2.webp"),
    alt: "Market shop 2",
    style: {
      width: "46.81%",
      height: "85.07%",
      left: "-11.49%",
      top: "15.57%",
    },
    mobileStyle: {
      width: "72.40%",
      height: "47.85%",
      left: "-46.02%",
      top: "31.16%",
    },
    animGroup: 4,
  },
  {
    id: "shop1",
    src: getImgPath("Scene/Scene9/01/shop1.webp"),
    alt: "Market shop 1",
    style: {
      width: "51.51%",
      height: "107.53%",
      left: "63.14%",
      top: "3.54%",
    },
    mobileStyle: {
      width: "81.90%",
      height: "54.63%",
      left: "75.84%",
      top: "24.39%",
    },
    animGroup: 5,
  },
  {
    id: "humanmiddle",
    src: getImgPath("Scene/Scene9/01/humanmiddle.webp"),
    alt: "Human middle character",
    style: {
      width: "16.33%",
      height: "85.96%",
      left: "18.98%",
      top: "38.15%",
    },
    mobileStyle: {
      width: "37.86%",
      height: "52.77%",
      left: "-6.87%",
      top: "43.86%",
    },
    animGroup: 6,
  },
  {
    id: "humanback",
    src: getImgPath("Scene/Scene9/01/humanback.webp"),
    alt: "Human back character",
    style: {
      width: "19.69%",
      height: "43.99%",
      left: "34.97%",
      top: "42.33%",
    },
    mobileStyle: {
      width: "35.00%",
      height: "24.74%",
      left: "25.77%",
      top: "46.21%",
    },
    animGroup: 7,
  },
  {
    id: "humanfront",
    src: getImgPath("Scene/Scene9/01/humanfront.webp"),
    alt: "Human front character",
    style: {
      width: "28.02%",
      height: "119.46%",
      left: "55.64%",
      top: "17.29%",
    },
    mobileStyle: {
      width: "49.82%",
      height: "70.31%",
      left: "62.51%",
      top: "32.12%",
    },
    animGroup: 8,
  },

  //? ─── Phase 2: Cat (bgblack ใช้ CSS overlay แทนรูปภาพ) ───

  {
    id: "cat",
    src: getImgPath("Scene/Scene9/01/cat.webp"),
    alt: "Mysterious cat guide",
    style: {
      width: "33.00%",
      height: "54.39%",
      left: "10.13%",
      top: "28.33%",
    },
    mobileStyle: {
      width: "58.67%",
      height: "30.59%",
      left: "20.66%",
      top: "51.65%",
    },
    animGroup: 9,
    className: "z-1",
  },
];

// ────────────────────────────────────────────────────
//  Question text and choices
// ────────────────────────────────────────────────────

export const S9_1_QUESTION_TEXT =
  "เจ้ามาถึงตลาดแห่งรายได้แล้ว… สถานที่ที่ทุกทักษะ \nทุกความสามารถ มีค่าและสามารถเปลี่ยนเป็นรายได้ได้\nเจ้าล่ะ เคยได้รับค่าจ้างจากสิ่งใดบ้างหรือไม่?";

export const PAID_ANSWER_CHOICES = [
  { id: "yes", text: "ได้" },
  { id: "no", text: "ไม่ได้" },
] as const;
