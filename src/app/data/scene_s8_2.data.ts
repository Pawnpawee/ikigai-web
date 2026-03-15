import { getImgPath } from "@/utils/cloudinaryUtils";
import type { SceneItemData } from "../components/reusable/SceneLayer";

//? Scene 8.2 Data: Select Gifts — Carousel (World Session — "มอบสิ่งใดให้โลก")
//? Layout: Desktop 1920×1080, Mobile 1080×1920
//? Figma: Desktop 867:7249, Mobile 867:13163
//?
//? Carousel pattern (same as s7_1 Hard Skills).
//? Each gift has an illustration card inside a decorative frame.
//? Background: bg-s8-2 CSS gradient (green leaf theme) + bgelement SceneLayer.
//? Animation Groups:
//? 1 = bgelement (decorative bottom vector pattern) — 0-0.1

// ────────────────────────────────────────────────────
//  Background SceneLayer Items
// ────────────────────────────────────────────────────

export const SCENE_S8_2_ITEMS: SceneItemData[] = [
  {
    id: "bgelement",
    src: getImgPath("Scene/Scene8/02/bgelement.webp"),
    alt: "Decorative bottom element",
    //? Figma 867:7550: x=0, y=435.9, w=1920.3, h=644.1
    //? → left=0%, top=40.36%, w=100%, h=59.64%
    style: {
      width: "100%",
      height: "59.64%",
      left: "0%",
      bottom: "0%",
    },
    mobileStyle: {
      width: "177.81%",
      height: "33.55%",
      left: "-38.9%",
      bottom: "0%",
    },
    animGroup: 1,
  },
];

// ────────────────────────────────────────────────────
//  Question Text
// ────────────────────────────────────────────────────

//? Figma 867:7255 (Desktop) / 867:13169 (Mobile)
export const S8_2_QUESTION =
  "เมื่อเสียงเรียกร้องมาถึงเจ้า… เจ้าจะเลือกมอบสิ่งใดให้โลก? จงเลือกสิ่งที่สะท้อนในใจของเจ้า ";

export const S8_2_QUESTION_MOBILE =
  "เมื่อเสียงเรียกร้องมาถึงเจ้า… เจ้าจะเลือกมอบสิ่งใดให้โลก?\nจงเลือกสิ่งที่สะท้อนในใจของเจ้า ";

// ────────────────────────────────────────────────────
//  Gift Card Data (Carousel)
// ────────────────────────────────────────────────────

interface GiftCard {
  id: string;
  label: string;
  imageSrc: string;
}

//? แต่ละ Card มีรูป illustration เฉพาะตัว
//? รูปเก็บที่ Cloudinary: Scene/Scene8/02/gift_{n}.webp
export const GIFT_CARDS: GiftCard[] = [
  {
    id: "gift-1",
    label: "ภาระรับผิดชอบ\n(Accountability)",
    imageSrc: getImgPath("Scene/Scene8/02/gift_1.webp"),
  },
  {
    id: "gift-2",
    label: "การเรียนรู้ตลอดชีวิต\n(Lifelong Learning)",
    imageSrc: getImgPath("Scene/Scene8/02/gift_2.webp"),
  },
  {
    id: "gift-3",
    label: "จรรยาบรรณในการทำงานที่ดี\n(Good Work Ethics)",
    imageSrc: getImgPath("Scene/Scene8/02/gift_3.webp"),
  },
  {
    id: "gift-4",
    label: "การควบคุมตนเองและการปรับตัว\n(Self-Regulation & Adaptability)",
    imageSrc: getImgPath("Scene/Scene8/02/gift_4.webp"),
  },
  {
    id: "gift-5",
    label: "การทำงานร่วมกับผู้อื่น\n(Collaborative Skills / Teamwork)",
    imageSrc: getImgPath("Scene/Scene8/02/gift_5.webp"),
  },
  {
    id: "gift-6",
    label: "การสื่อสาร\n(Communication)",
    imageSrc: getImgPath("Scene/Scene8/02/gift_6.webp"),
  },
  {
    id: "gift-7",
    label: "สำนึกรู้ด้านสิ่งแวดล้อม\n(Environmental Awareness)",
    imageSrc: getImgPath("Scene/Scene8/02/gift_7.webp"),
  },
  {
    id: "gift-8",
    label: "ความตระหนักถึงความปลอดภัย\n(Safety Awareness)",
    imageSrc: getImgPath("Scene/Scene8/02/gift_8.webp"),
  },
  {
    id: "gift-9",
    label: "การคิดเชิงสร้างสรรค์\n(Creative Thinking)",
    imageSrc: getImgPath("Scene/Scene8/02/gift_9.webp"),
  },
  {
    id: "gift-10",
    label: "การคิดเชิงวิเคราะห์และแก้ปัญหา\n(Analytical & Problem-solving)",
    imageSrc: getImgPath("Scene/Scene8/02/gift_10.webp"),
  },
  {
    id: "gift-11",
    label: "การประยุกต์ใช้เทคโนโลยี\n(Technology Adoption)",
    imageSrc: getImgPath("Scene/Scene8/02/gift_11.webp"),
  },
  {
    id: "gift-12",
    label: "การบริหารการเปลี่ยนแปลง\n(Change Management)",
    imageSrc: getImgPath("Scene/Scene8/02/gift_12.webp"),
  },
];

// ────────────────────────────────────────────────────
//  Carousel Config
// ────────────────────────────────────────────────────

//? Desktop: 3 cards per page (Figma 867:7262), Mobile: 3 cards stacked
export const ITEMS_PER_PAGE = 3;

//? Card frame image (decorative border around each card)
//? Figma 867:7265 — instance "Frame" 395.84×428.32
export const CARD_FRAME_SRC = getImgPath("Scene/Scene8/02/card_frame.webp");

//? Card frame image when selected (yellow/gold highlight)
export const SELECTED_FRAME_SRC = getImgPath(
  "Scene/Scene7/02/selected_frame.webp",
);

//? Carousel navigation arrow images
//? Figma 867:7258 arrow-l, 867:7260 arrow-r
export const ARROW_L_SRC = getImgPath("Scene/Scene7/02/arrow_l.webp");
export const ARROW_R_SRC = getImgPath("Scene/Scene7/02/arrow_r.webp");

// ────────────────────────────────────────────────────
//  Constants
// ────────────────────────────────────────────────────

export const MIN_GIFT_SELECTIONS = 1;
