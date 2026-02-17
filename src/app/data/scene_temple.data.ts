import type { SceneItemData } from "../components/reusable/SceneLayer";

//? Scene 10: Temple Arrival - Journey to the Temple
export const TEMPLE_ARRIVAL_ITEMS: SceneItemData[] = [
  
];

//? Analysis steps configuration with Thai text
export const ANALYSIS_STEPS_CONFIG = [
  {
    id: 1,
    text: "กำลังวิเคราะห์ What you love",
    duration: 15000, // 15 seconds
    icon: "❤️",
  },
  {
    id: 2,
    text: "กำลังวิเคราะห์ What you good at",
    duration: 15000, // 15 seconds
    icon: "⭐",
  },
  {
    id: 3,
    text: "กำลังวิเคราะห์ What the world need",
    duration: 15000, // 15 seconds
    icon: "🌍",
  },
  {
    id: 4,
    text: "กำลังวิเคราะห์ What you can be paid for",
    duration: 15000, // 15 seconds
    icon: "💰",
  },
  {
    id: 5,
    text: "กำลังวิเคราะห์ อาชีพที่ใช่สำหรับคุณ",
    duration: 30000, // 30 seconds
    icon: "💼",
  },
  {
    id: 6,
    text: "กำลังวิเคราะห์ ikigai ของคุณ",
    duration: 30000, // 30 seconds
    icon: "✨",
  },
  {
    id: 7,
    text: "ใกล้เสร็จแล้ว...",
    duration: 10000, // 10 seconds
    icon: "🎯",
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
