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
//? (star, cat_frame, cat_pics ย้ายไปใช้ LazyLottie ใน s7_3.tsx แล้ว)
//? 4 = Q1 papers

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
