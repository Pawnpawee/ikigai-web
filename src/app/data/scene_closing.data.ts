import { getImgPath } from "@/utils/cloudinaryUtils";
import type { SceneItemData } from "../components/reusable/SceneLayer";

//? information: Scene 13 - Closing (ฉากปิดท้ายหลังเห็นผล Ikigai)
//? Desktop Reference: 1920×1080 | Mobile Reference: 1080×1920

// --- Scene Layer Items (Static Images) ---
export const SCENE_CLOSING_ITEMS: SceneItemData[] = [
  {
    id: "pyramid",
    src: getImgPath("Scene/Closing/pyramid.webp"),
    alt: "Egyptian pyramids silhouette",
    //? Desktop: x=-12.65, y=123.38, w=1945.30, h=604.99 (1920×1080)
    style: {
      left: "-0.66%",
      top: "11.4%",
      width: "101.3%",
      height: "56%",
      zIndex: 1,
    },
    //? Mobile: x=-432.65, y=440.24, w=1945.30, h=604.99 (1080×1920)
    mobileStyle: {
      left: "-40.1%",
      top: "22.9%",
      width: "180.1%",
      height: "31.5%",
    },
    animGroup: 1,
    sizes: "100vw",
    priority: true,
  },
  {
    id: "water",
    src: getImgPath("Scene/Closing/water.webp"),
    alt: "Nile water reflection",
    //? Desktop: x=-0.32, y=728.20, w=1920.64,
    style: {
      left: "0%",
      top: "67.4%",
      width: "100%",
      height: "86.7%",
      zIndex: 2,
    },
    //? Mobile: x=-420.32, y=1045.06, w=1920.64, h=874.94
    mobileStyle: {
      left: "-38.9%",
      top: "54.4%",
      width: "177.8%",
      height: "48.8%",
    },
    animGroup: 2,
    sizes: "100vw",
  },
  {
    id: "tree_land",
    src: getImgPath("Scene/Closing/tree_land.webp"),
    mobileSrc: getImgPath("Scene/Closing/tree_land_mb.webp"),
    alt: "Palm trees and sandy shore",
    //? Desktop: x=-3.14, y=441.27, w=1923.46, h=352.26 (1920×1080)
    style: {
      left: "-0.16%",
      top: "40.9%",
      width: "100.2%",
      height: "32.6%",
      zIndex: 3,
    },
    //? Mobile: x=-419.98, y=975.33, w=1920.30, h=135.05
    mobileStyle: {
      left: "-38.9%",
      top: "50.8%",
      width: "177.9%",
      height: "7%",
    },
    animGroup: 2,
    sizes: "100vw",
  },
  {
    id: "human",
    src: getImgPath("Scene/Closing/human.webp"),
    mobileSrc: getImgPath("Scene/Closing/human_mb.webp"),
    alt: "Player character silhouette from behind",
    //? Desktop: x=601.75, y=650.05, w=716.50, h=619.32 (head only)
    style: {
      left: "31.3%",
      top: "60.2%",
      width: "37.3%",
      height: "57.3%",
      zIndex: 5,
    },
    //? Mobile: x=181.75, y=966.91, w=716.50, h=1072.96 (head + body)
    mobileStyle: {
      left: "16.8%",
      top: "50.4%",
      width: "66.3%",
      height: "55.9%",
    },
    animGroup: 3,
    sizes: "(max-width: 768px) 70vw, 40vw",
  },
];

// --- Closing Dialogue ---
export const CLOSING_DIALOGUE = {
  //? (ชื่อผู้เล่น) จะถูกแทนที่ด้วยชื่อจริงของผู้เล่นจาก session
  text: `เส้นทางชีวิตนี้เป็นของเจ้า… (playerName)
อิคิไก ไม่ใช่คู่มือชีวิต เป็นเพียงเครื่องมือช่วยสะท้อนสิ่งที่เจ้ารัก ถนัด โลกต้องการ และสร้างรายได้ แต่จำไว้ว่าเป็น ภาพ ณ ตอนนี้ เท่านั้น
เจ้าสามารถเปลี่ยนความคิดและ
กลับมาสำรวจอีกครั้งได้เสมอ ณ ที่แห่งนี้....`,

  buttons: {
    retry: "ลองอีกครั้ง",
    home: "กลับหน้าหลัก",
  },
};
