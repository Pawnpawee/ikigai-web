import { getImgPath } from "@/utils/cloudinaryUtils";
import type { SceneItemData } from "../components/reusable/SceneLayer";

//? Scene 8.4 Data: No Manual Work + Mismatch Choice (World Session)
//? Layout: Desktop 1920×1080, Mobile 1080×1920
//? 300vh total: 200vh (Q1: No Manual) + 100vh (Q2: Mismatch)
//?
//? Animation Groups:
//? 1 = lotus   (phase 1 only, bottom decoration)
//? 2 = icon_1  (phase 1 work illustration)
//? 3 = icon_2  (phase 2 work illustration)

// ────────────────────────────────────────────────────
//  SceneLayer Items (images only)
// ────────────────────────────────────────────────────

export const SCENE_S8_4_ITEMS: SceneItemData[] = [
  {
    id: "lotus",
    src: getImgPath("Scene/Scene8/04/lotus.webp"),
    alt: "Lotus flower decoration",
    style: {
      //? Desktop: 403.32×403.32 at (758.34, 777.46) in 1920×1080
      width: "21.01%",
      height: "37.34%",
      left: "39.50%",
      top: "71.99%",
    },
    mobileStyle: {
      //? Mobile: 394.84×394.84 at (342.58, 956.75) in 1080×1920
      width: "36.56%",
      height: "20.56%",
      left: "31.72%",
      top: "49.83%",
    },
    animGroup: 1,
  },
  {
    id: "icon_1",
    src: getImgPath("Scene/Scene8/04/icon.webp"),
    alt: "Work illustration — phase 1",
    className: "[filter:drop-shadow(0_0_40px_rgba(255,255,255,0.75))]",
    style: {
      //? Desktop: 1011.13×591.49 at (454.43, 268.50) in 1920×1080
      width: "52.66%",
      height: "54.77%",
      left: "23.67%",
      top: "24.86%",
    },
    mobileStyle: {
      //? Mobile: 989.85×579.02 at (45.08, 458.52) in 1080×1920
      width: "91.65%",
      height: "30.16%",
      left: "4.17%",
      top: "23.88%",
    },
    animGroup: 2,
  },
  {
    id: "icon_2",
    src: getImgPath("Scene/Scene8/04/icon_2.webp"),
    alt: "Work illustration — phase 2",
    className: "[filter:drop-shadow(0_0_40px_rgba(255,255,255,0.75))]",
    style: {
      //? Desktop: 1019.85×596.58 at (450.06, 267.65) in 1920×1080
      width: "53.12%",
      height: "55.24%",
      left: "23.44%",
      top: "24.78%",
    },
    mobileStyle: {
      //? Mobile: 994.06×581.50 at (42.98, 455.65) in 1080×1920
      width: "92.04%",
      height: "30.29%",
      left: "3.98%",
      top: "23.73%",
    },
    animGroup: 3,
  },
];

// ────────────────────────────────────────────────────
//  Question 1: No Manual Work (Phase 1 — 200vh)
// ────────────────────────────────────────────────────

export const S8_4_QUESTION_1 =
  "มีงานถูกวางตรงหน้าเจ้า…แต่ไม่มีคู่มือหรือคำสั่งใด ๆ เจ้าจะเลือกทำอย่างไร?";

export const S8_4_QUESTION_1_MOBILE =
  "มีงานถูกวางตรงหน้าเจ้า…\nแต่ไม่มีคู่มือหรือคำสั่งใด ๆเจ้าจะเลือกทำอย่างไร?";

export const S8_4_Q1_POSITION = {
  //? Desktop: text at x=337, y=123, w=1246 in 1920×1080
  style: { left: "0%", top: "13%", width: "100%" },
  //? Mobile: text at x=223, y=272, w=637 in 1080×1920
  mobileStyle: { left: "0%", top: "14.17%", width: "100%" },
};

export const NO_MANUAL_CHOICES = [
  { id: "do_myself", text: "ลงมือหาวิธีด้วยตัวเอง" },
  { id: "ask_first", text: "ขอคำสั่งหรือ feedback ก่อน\nแล้วจึงทำตาม" },
] as const;

export const S8_4_CHOICE1_POSITION = {
  //? Desktop: frame at x=51, y=476, w=1832 in 1920×1080
  style: { left: "2.66%", top: "44.07%", width: "95.42%" },
  //? Mobile: frame at x=107, y=1434, w=866 in 1080×1920
  mobileStyle: { left: "0%", top: "74.69%", width: "100%" },
};

// ────────────────────────────────────────────────────
//  Question 2: Mismatch Choice (Phase 2 — 100vh)
// ────────────────────────────────────────────────────

export const S8_4_QUESTION_2 =
  "ถ้างานที่ได้รับไม่ตรงกับสิ่งที่เจ้าอยากทำ เช่น งานด้านตัวเลข \n ในขณะที่เจ้าใฝ่หาความคิดสร้างสรรค์…เจ้าจะเลือกอย่างไร?";

export const S8_4_Q2_POSITION = {
  //? Desktop: text at x=472, y=93, w=976 in 1920×1080
  style: { left: "0%", top: "13%", width: "100%" },
  //? Mobile: text at x=151, y=272, w=781 in 1080×1920
  mobileStyle: { left: "0%", top: "14.17%", width: "100%" },
};

export const MISMATCH_CHOICES = [
  { id: "adapt_self", text: "ปรับตัวเอง\n(พัฒนาทัศนคติ)" },
  { id: "adapt_role", text: "ปรับบทบาท\n(ใช้ความถนัดของตน\nประยุกต์กับงาน)" },
  { id: "both", text: "ทั้งคู่" },
] as const;

export const S8_4_CHOICE2_POSITION = {
  //? Desktop: frame at x=48, y=368, w=1707 in 1920×1080 (2 stacked left + 1 right)
  style: { left: "2.50%", top: "39%", width: "88.91%" },
  //? Mobile: frame at x=157, y=1408, w=767 in 1080×1920 (2 top row + 1 bottom center)
  mobileStyle: { left: "14.54%", top: "73.33%", width: "71.02%" },
};
