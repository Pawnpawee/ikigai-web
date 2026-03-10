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
//? (star, cat_frame, cat_pics, paper ย้ายไปใช้ LazyLottie ใน s7_3.tsx แล้ว)

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
];

// ────────────────────────────────────────────────────
//  Question & Choice Constants
// ────────────────────────────────────────────────────

export const S7_3_QUESTION_1 =
  "จากความถนัดของเจ้า มีตรงกับความต้องการของงานหรือไม่?";

export const S7_3_QUESTION_1_MOBILE =
  "จากความถนัดของเจ้า \n มีตรงกับความต้องการของงานหรือไม่?";

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
