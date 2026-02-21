import { getImgPath } from "@/utils/cloudinaryUtils";
import type { SceneItemData } from "../components/reusable/SceneLayer";

//? Scene 7.3 Data: Skills Match Job - Decision Section
//? Combined single scene: Desktop 1920×2160, Mobile 1080×3840
//? Q1 (top half): "จากความถนัดของเจ้า มีตรงกับความต้องการของงานหรือไม่?"
//?   bg + sitting cat on mat + flying papers
//? Q2 (bottom half): "เมื่อเปลี่ยนบทบาทใหม่ เจ้าคิดว่าจะได้ใช้ความถนัดของเจ้าไหม?"
//?   sleeping cat with crystal ball picture
//?
//? Animation Groups:
//? 1 = Q1 bg (top half background)
//? 2 = star (decorative stars overlay)
//? 3 = Q1 cat sitting
//? 4 = Q1 papers
//? 5 = Q2 cat sleeping

// ────────────────────────────────────────────────────
//  Combined Scene Items (Q1 top half + Q2 bottom half)
//  Desktop: 1920×2160, Mobile: 1080×3840
// ────────────────────────────────────────────────────

export const SCENE_S7_3_ITEMS: SceneItemData[] = [
  //? ── Q1: Background (top half) ──
  {
    id: "q1-bg",
    src: getImgPath("Scene/Scene7/04/bg.webp"),
    mobileSrc: getImgPath("Scene/Scene7/04/bg_mb.webp"),
    alt: "Background gradient for question 1",
    style: {
      width: "100%",
      height: "100%",
      left: "0%",
      top: "0%",
    },
    mobileStyle: {
      height: "100%",
    },
    animGroup: 1,
    priority: true,
  },
  //? ── Star decoration (full scene overlay) ──
  {
    id: "star",
    src: getImgPath("Scene/Scene7/04/star.webp"),
    mobileSrc: getImgPath("Scene/Scene7/04/star_mb.webp"),
    alt: "Decorative stars",
    style: {
      //? Desktop: 2004.10×2159.91 at (-51.15, 39.32) in 1920×2160
      width: "104.38%", //? 2004.10/1920
      height: "99.99%", //? 2159.91/2160
      left: "-2.66%", //? -51.15/1920
      top: "1.82%", //? 39.32/2160
    },
    mobileStyle: {
      width: "104.38%",
      height: "99.99%",
      left: "-2.66%",
      top: "1.82%",
    },
    animGroup: 2,
  },
  //? ── Q1: Cat sitting on mat ──
  {
    id: "q1-cat-sitting",
    src: getImgPath("Scene/Scene7/04/cat_frame.webp"),
    alt: "Sitting cat on mat",
    style: {
      //? Desktop: 541.21×506.02 at (715.23, 541.96) in 1920×2160
      width: "28.19%", //? 541.21/1920
      height: "23.43%", //? 506.02/2160
      left: "37.25%", //? 715.23/1920
      top: "25.09%", //? 541.96/2160
    },
    mobileStyle: {
      //? Mobile: 541.21×506.02 at (293.98, 1112.73) in 1080×3840
      width: "50.11%", //? 541.21/1080
      height: "13.18%", //? 506.02/3840
      left: "27.22%", //? 293.98/1080
      top: "28.98%", //? 1112.73/3840
    },
    animGroup: 3,
  },
  //? ── Q1: Flying papers ──
  {
    id: "q1-paper",
    src: getImgPath("Scene/Scene7/04/paper.webp"),
    alt: "Flying papers decoration",
    style: {
      //? Desktop: 1945.97×853.18 at (-56.30, 406.03) in 1920×2160
      width: "101.35%", //? 1945.97/1920
      height: "39.50%", //? 853.18/2160
      left: "-2.93%", //? -56.30/1920
      top: "18.80%", //? 406.03/2160
    },
    mobileStyle: {
      //? Mobile: 1346.51×246.45 at (-136.84, 1355.42) in 1080×3840
      width: "124.68%", //? 1346.51/1080
      height: "6.42%", //? 246.45/3840
      left: "-12.67%", //? -136.84/1080
      top: "35.30%", //? 1355.42/3840
    },
    animGroup: 4,
  },
  //? ── Q2: Sleeping cat with crystal ball (bottom half) ──
  {
    id: "q2-cat-sleeping",
    src: getImgPath("Scene/Scene7/04/cat_pics.webp"),
    alt: "Sleeping cat with crystal ball picture",
    style: {
      //? Desktop: 697.01×768.28 at (200.61, 1080+347.43) in 1920×2160
      width: "36.30%", //? 697.01/1920
      height: "35.57%", //? 768.28/2160
      left: "10.45%", //? 200.61/1920
      top: "66.09%", //? 1427.43/2160
    },
    mobileStyle: {
      //? Mobile: 697.01×768.28 at (269.35, 1920+930.73) in 1080×3840
      width: "64.54%", //? 697.01/1080
      height: "20.01%", //? 768.28/3840
      left: "24.94%", //? 269.35/1080
      top: "74.24%", //? 2850.73/3840
    },
    animGroup: 5,
  },
];

// ────────────────────────────────────────────────────
//  Question & Choice Constants
// ────────────────────────────────────────────────────

export const S7_3_QUESTION_1 =
  "จากความถนัดของเจ้า มีตรงกับความต้องการของงานหรือไม่?";

export const S7_3_QUESTION_2 =
  "เมื่อเปลี่ยนบทบาทใหม่ \n เจ้าคิดว่าจะได้ใช้ความถนัดของเจ้าไหม?";

export const SKILLS_MATCH_CHOICES = [
  { id: "match", text: "ตรง" },
  { id: "no_match", text: "ไม่ตรง" },
];

export const USE_SKILLS_CHOICES = [
  { id: "yes", text: "ใช่" },
  { id: "no", text: "ไม่ใช่" },
];
