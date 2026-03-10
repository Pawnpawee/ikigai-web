import { getImgPath } from "@/utils/cloudinaryUtils";
import type { SceneItemData } from "../components/reusable/SceneLayer";

//? Scene 10.2: Temple Weighing - ฉากวิหารชั่งหัวใจ
//? Desktop Reference: 1920x1080 | Container: 16/9
//? Reuse Scene4 assets (building, scale, heart, feather)
//? เพิ่ม lightcat สำหรับแสงรอบตัวแมว
export const TEMPLE_ARRIVAL_ITEMS: SceneItemData[] = [
  //? Ground layer - พื้นวิหาร
  {
    id: "ground",
    src: getImgPath("Scene/Scene4/ground.webp"),
    alt: "Temple ground",
    style: {
      width: "100.7%",
      height: "153.4%",
      right: "-0.7%",
      bottom: "-52.3%",
      zIndex: 0,
    },
    animGroup: 4,
    sizes: "100vw",
  },

  //? Building structure - อาคารวิหาร
  {
    id: "building",
    src: getImgPath("Scene/Scene4/building.webp"),
    alt: "Temple building",
    style: {
      width: "127.1%",
      height: "110.6%",
      left: "-13.5%",
      bottom: "-9.7%",
      zIndex: 0,
    },
    animGroup: 4,
    sizes: "100vw",
  },

  //? Scale bar (rotatable) - แกนตาชั่ง (หมุนได้)
  {
    id: "scale-2-1",
    src: getImgPath("Scene/Scene4/scale-2.webp"),
    alt: "Scale bar",
    style: {
      bottom: "43.8%",
      right: "43.6%",
      width: "12.9%",
      height: "2.3%",
      zIndex: 1,
    },
    animGroup: 69,
    sizes: "(max-width: 768px) 15vw, 10vw",
    priority: true,
  },

  //? Scale center - โครงสร้างตาชั่งกลาง
  {
    id: "scale_center",
    src: getImgPath("Scene/Scene4/scale.webp"),
    alt: "Scale center structure",
    style: {
      top: "45.8%",
      left: "42.0%",
      width: "16.1%",
      height: "31.8%",
      zIndex: 1,
    },
    animGroup: 6,
    sizes: "(max-width: 768px) 20vw, 15vw",
    priority: true,
  },

  //? Heart plate - จานวางหัวใจ
  {
    id: "heart_plate",
    src: getImgPath("Scene/Scene4/heart-plate.webp"),
    alt: "Heart plate",
    style: {
      top: "58.5%",
      left: "42.0%",
      width: "3.7%",
      height: "5.8%",
      zIndex: 1,
    },
    animGroup: 66,
    sizes: "(max-width: 768px) 5vw, 3vw",
    priority: true,
  },

  //? Feather plate - จานวางขนนก
  {
    id: "feather_plate",
    src: getImgPath("Scene/Scene4/feather-plate.webp"),
    alt: "Feather plate",
    style: {
      top: "58.8%",
      left: "53.6%",
      width: "4.4%",
      height: "5.8%",
      zIndex: 1,
    },
    animGroup: 67,
    sizes: "(max-width: 768px) 5vw, 3vw",
    priority: true,
  },

  //? Light overlay - แสงเรืองรอบตาชั่ง
  {
    id: "light_overlay",
    src: getImgPath("Scene/Scene4/light.webp"),
    alt: "Light effect overlay",
    style: {
      top: "23.4%",
      left: "32.4%",
      width: "35.1%",
      height: "62.5%",
      zIndex: 0,
    },
    animGroup: 68,
    className: "mix-blend-screen animate-pulse",
    priority: true,
    sizes: "(max-width: 768px) 40vw, 30vw",
  },
];

//? Analysis steps configuration with Thai text
export const ANALYSIS_STEPS_CONFIG = [
  {
    id: 1,
    text: "กำลังวิเคราะห์ What you love",
    duration: 15000, // 15 seconds
    icon: getImgPath("Icon/love.webp"),
  },
  {
    id: 2,
    text: "กำลังวิเคราะห์ What you good at",
    duration: 15000, // 15 seconds
    icon: getImgPath("Icon/skill.webp"),
  },
  {
    id: 3,
    text: "กำลังวิเคราะห์ What the world need",
    duration: 15000, // 15 seconds
    icon: getImgPath("Icon/world.webp"),
  },
  {
    id: 4,
    text: "กำลังวิเคราะห์ What you can be paid for",
    duration: 15000, // 15 seconds
    icon: getImgPath("Icon/paid.webp"),
  },
  {
    id: 5,
    text: "กำลังวิเคราะห์ อาชีพที่ใช่สำหรับคุณ",
    duration: 30000, // 30 seconds
    icon: getImgPath("Icon/paid.webp"),
  },
  {
    id: 6,
    text: "กำลังวิเคราะห์ ikigai ของคุณ",
    duration: 30000, // 30 seconds
  },
  {
    id: 7,
    text: "ใกล้เสร็จแล้ว...",
    duration: 10000, // 10 seconds
  },
];

//? Dialogue texts
export const TEMPLE_DIALOGUE = {
  deity: `เจ้ามาถึงวิหารแล้ว… โลกและความสามารถของเจ้ากำลังจะถูกชั่งอย่างยุติธรรม
นี่คือโอกาสครั้งที่สองของเจ้า… เพื่อค้นพบ Ikigai ของตนเอง`,

  weighing: `ตอนนี้… หัวใจเจ้ากำลังถูกชั่ง… 
ขนนกจะบอกความจริงเกี่ยวกับอิคิไกของเจ้า 
โดยผลลัพธ์นี้เป็นเพียงภาพหนึ่งของความเป็นเจ้า ณ ตอนนี้เท่านั้น`,
};
