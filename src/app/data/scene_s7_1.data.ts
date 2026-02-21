import { getImgPath } from "@/utils/cloudinaryUtils";
import type { SceneItemData } from "../components/reusable/SceneLayer";

//? Scene 7.2 Data: Hard Skills Selection (Carousel)
//? Layout: Desktop 1920x1080, Mobile 1080x1920
//? Animation Groups:
//? 1 = bgcircle (background gradient circles) - 0-0.1
//? 2 = starlight (decorative stars) - 0.05-0.15

// ────────────────────────────────────────────────────
//  Background SceneLayer Items
// ────────────────────────────────────────────────────

export const SCENE_S7_1_ITEMS: SceneItemData[] = [
  {
    id: "bgcircle",
    src: getImgPath("Scene/Scene7/02/bgcircle.webp"),
    mobileSrc: getImgPath("Scene/Scene7/02/bgcircle_mb.webp"),
    alt: "Background gradient circles",
    style: {
      width: "100%",
      height: "89.75%",
      left: "0.06%",
      top: "2.90%",
    },
    mobileStyle: {
      width: "177.76%",
      height: "50.48%",
      left: "-38.20%",
      top: "4.97%",
    },
    animGroup: 1,
  },
  {
    id: "starlight",
    src: getImgPath("Scene/Scene7/02/starlight.webp"),
    mobileSrc: getImgPath("Scene/Scene7/02/starlight_mb.webp"),
    alt: "Decorative starlight",
    style: {
      width: "90.12%",
      height: "39.13%",
      left: "4.94%",
      top: "-0.35%",
    },
    mobileStyle: {
      width: "87.63%",
      height: "22.01%",
      left: "6.18%",
      top: "-9.82%",
    },
    animGroup: 2,
  },
];

// ────────────────────────────────────────────────────
//  Hard Skill Card Data (Carousel)
// ────────────────────────────────────────────────────

export interface HardSkillCard {
  id: string;
  label: string;
  /** Illustration image inside the card frame */
  imageSrc: string;
}

//? แต่ละ Card มีรูป illustration เฉพาะตัว
//? รูปเก็บที่ Cloudinary: Scene/Scene7/02/hardskill_{n}.webp
export const HARD_SKILL_CARDS: HardSkillCard[] = [
  {
    id: "hs-1",
    label: "เทคโนโลยีสารสนเทศ & พัฒนาซอฟต์แวร์",
    imageSrc: getImgPath("Scene/Scene7/02/hardskill_1.webp"),
  },
  {
    id: "hs-2",
    label: "ด้านข้อมูล คณิตศาสตร์ สถิติ และการวิเคราะห์",
    imageSrc: getImgPath("Scene/Scene7/02/hardskill_2.webp"),
  },
  {
    id: "hs-3",
    label: "วิศวกรรม & ช่าง",
    imageSrc: getImgPath("Scene/Scene7/02/hardskill_3.webp"),
  },
  {
    id: "hs-4",
    label: "ไฟฟ้า อิเล็กทรอนิกส์ และระบบควบคุม",
    imageSrc: getImgPath("Scene/Scene7/02/hardskill_4.webp"),
  },
  {
    id: "hs-5",
    label: "การขนส่ง โครงสร้างพื้นฐาน และโยธา",
    imageSrc: getImgPath("Scene/Scene7/02/hardskill_5.webp"),
  },
  {
    id: "hs-6",
    label: "สำรวจ ภูมิสารสนเทศ",
    imageSrc: getImgPath("Scene/Scene7/02/hardskill_6.webp"),
  },
  {
    id: "hs-7",
    label: "ห้องปฏิบัติการ ชีวภาพ เคมี และเทคโนโลยีชีวภาพ",
    imageSrc: getImgPath("Scene/Scene7/02/hardskill_7.webp"),
  },
  {
    id: "hs-8",
    label: "การเกษตร พืช และสัตวศาสตร์",
    imageSrc: getImgPath("Scene/Scene7/02/hardskill_8.webp"),
  },
  {
    id: "hs-9",
    label: "การผลิต พลังงาน โลหะ และโลหการ",
    imageSrc: getImgPath("Scene/Scene7/02/hardskill_9.webp"),
  },
  {
    id: "hs-10",
    label: "เหมือง แร่ และธรณีเทคนิค",
    imageSrc: getImgPath("Scene/Scene7/02/hardskill_10.webp"),
  },
  {
    id: "hs-11",
    label: "สื่อ บันเทิง และเทคโนโลยีเสียง",
    imageSrc: getImgPath("Scene/Scene7/02/hardskill_11.webp"),
  },
  {
    id: "hs-12",
    label: "การแพทย์ และการดูแลสุขภาพ",
    imageSrc: getImgPath("Scene/Scene7/02/hardskill_12.webp"),
  },
  {
    id: "hs-13",
    label: "การเงิน บัญชี และการตรวจสอบ",
    imageSrc: getImgPath("Scene/Scene7/02/hardskill_13.webp"),
  },
  {
    id: "hs-14",
    label: "โลจิสติกส์ ซัพพลายเชน และคลังสินค้า",
    imageSrc: getImgPath("Scene/Scene7/02/hardskill_14.webp"),
  },
  {
    id: "hs-15",
    label: "แฟชั่นและอุตสาหกรรมศิลป์",
    imageSrc: getImgPath("Scene/Scene7/02/hardskill_15.webp"),
  },
  {
    id: "hs-16",
    label: "ผลิตอาหารและการแปรรูปอาหาร",
    imageSrc: getImgPath("Scene/Scene7/02/hardskill_16.webp"),
  },
  {
    id: "hs-17",
    label: "การให้บริการ ที่ปรึกษาและภาษา",
    imageSrc: getImgPath("Scene/Scene7/02/hardskill_17.webp"),
  },
];

//? Carousel Config
export const ITEMS_PER_PAGE = 3;

//? Card frame image (decorative border around each card)
export const CARD_FRAME_SRC = getImgPath("Scene/Scene7/02/card_frame.webp");

//? Card frame image when selected
export const SELECTED_FRAME_SRC = getImgPath(
  "Scene/Scene7/02/selected_frame.webp",
);

//? Carousel navigation arrow images
export const ARROW_L_SRC = getImgPath("Scene/Scene7/02/arrow_l.webp");
export const ARROW_R_SRC = getImgPath("Scene/Scene7/02/arrow_r.webp");
