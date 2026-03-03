import { getImgPath } from "@/utils/cloudinaryUtils";
import type { SceneItemData } from "../components/reusable/SceneLayer";

//? Scene 9.3 Data: Monetizable Experience
//? Layout: Desktop 1920x1080, Mobile 1080x1920
//? Animation Groups:
//?  1 = money_bg    (0 → 0.12)  — coin/money background illustration
//?  2 = starlight   (0.05→ 0.15) — decorative stars
//?  3 = cat         (0.10→ 0.25) — mysterious cat guide

// ────────────────────────────────────────────────────
//  Background SceneLayer Items
// ────────────────────────────────────────────────────

export const SCENE_S9_3_ITEMS: SceneItemData[] = [
  {
    id: "money_bg",
    src: getImgPath("Scene/Scene9/03/money_bg.webp"),
    mobileSrc: getImgPath("Scene/Scene9/03/money_bg_mb.webp"),
    alt: "Money and coins background",
    //? Desktop: 1950.38/1920 = 101.58%, 1162.76/1080 = 107.66%
    style: {
      width: "101.58%",
      height: "107.66%",
      left: "1.32%",
      top: "0%",
    },
    //? Mobile: 1079.38/1080 = 99.94%, 1818.11/1920 = 94.69%
    mobileStyle: {
      width: "99.94%",
      height: "94.69%",
      left: "7.07%",
      top: "1.60%",
    },
    animGroup: 1,
  },
  {
    id: "starlight",
    src: getImgPath("Scene/Scene9/03/starlight.webp"),
    mobileSrc: getImgPath("Scene/Scene9/03/starlight_mb.webp"),
    alt: "Decorative starlight",
    //? Desktop: 1800.58/1920 = 93.78%, 969.21/1080 = 89.74%
    style: {
      width: "93.78%",
      height: "89.74%",
      left: "3.30%",
      top: "17.12%",
    },
    //? Mobile: 1027.51/1080 = 95.14%, 1631.52/1920 = 84.97%
    mobileStyle: {
      width: "95.14%",
      height: "84.97%",
      left: "4.82%",
      top: "7.51%",
    },
    animGroup: 2,
  },
  //? cat ย้ายไปใช้ LazyLottie ใน s9_3.tsx แล้ว (cat1.json)
];

// ────────────────────────────────────────────────────
//  Question Text & Validation
// ────────────────────────────────────────────────────

export const S9_3_QUESTION_TEXT_MOBILE =
  "เจ้าคิดว่าเคยช่วยใครแล้วพูดกับตัวเองว่า…\n'ว้าว ฉันคิดเงินได้จากสิ่งนี้นะ' ไหม?\nบางครั้งสิ่งที่เจอในอดีต อาจบอกเส้นทางให้เจ้ารู้ว่า\nเจ้าเก่งอะไร และสิ่งนั้นมีค่าในตลาด";

export const S9_3_QUESTION_TEXT =
  "เจ้าคิดว่าเคยช่วยใครแล้วพูดกับตัวเองว่า… 'ว้าว ฉันคิดเงินได้จากสิ่งนี้นะ' ไหม?\nบางครั้งสิ่งที่เจอในอดีต อาจบอกเส้นทางให้เจ้ารู้ว่า เจ้าเก่งอะไร และสิ่งนั้นมีค่าในตลาด";

export const S9_3_INPUT_PLACEHOLDER = "พิมพ์ประสบการณ์ ไม่เกิน 100 ตัวอักษร";
export const S9_3_MAX_LENGTH = 100;

// ────────────────────────────────────────────────────
//  Gibberish / Random Text Detection
//  (ย้ายมาจาก PaidWork.tsx)
// ────────────────────────────────────────────────────

export function validateMeaningfulText(text: string): string | null {
  const trimmed = text.trim();

  //? 1. ความยาวขั้นต่ำ — ต้องมีอย่างน้อย 5 ตัวอักษร
  if (trimmed.length < 5) {
    return "กรุณาพิมพ์คำตอบอย่างน้อย 5 ตัวอักษร";
  }

  //? 2. ตัวอักษรซ้ำติดกัน เช่น "aaaaaaa", "กกกกก", "5555555"
  if (/(.)\1{3,}/u.test(trimmed)) {
    return "ดูเหมือนข้อความจะมีตัวอักษรซ้ำมากเกินไปนะ ลองพิมพ์ใหม่อีกครั้ง";
  }

  //? 3. Keyboard smash patterns (English + Thai)
  const keyboardPatterns =
    /asdf|qwer|zxcv|hjkl|uiop|bnm|fghj|tyui|sdfg|xcvb|wasd|ฟหกด|แโใไ|ๆไำพ|กดเ้|ทมใฝ|บปลห|อิืท|เ้าส|พะัี|ฟหกด|ดเ้า|หกดส|กดสว|ผปแอ|ฤๅษศ|ฯญฐ/i;
  if (keyboardPatterns.test(trimmed)) {
    return "ดูเหมือนจะพิมพ์มั่วๆ อยู่นะ ลองตอบอีกครั้งได้ไหม?";
  }

  //? 4. ตัวอักษรที่ไม่ซ้ำน้อยเกินไป (unique ratio ต่ำ = พิมพ์ซ้ำๆ)
  const uniqueChars = new Set(trimmed.replace(/\s/g, "")).size;
  const nonSpaceLen = trimmed.replace(/\s/g, "").length;
  if (nonSpaceLen >= 5 && uniqueChars / nonSpaceLen < 0.25) {
    return "ข้อความนี้ดูซ้ำๆ กันมาก ลองเล่าให้หลากหลายขึ้นอีกนิดนะ";
  }

  //? 5. มีแต่ตัวเลข / สัญลักษณ์พิเศษ ไม่มีตัวอักษรจริงเลย
  const hasThaiOrEnglish = /[ก-๙a-zA-Z]/u.test(trimmed);
  if (!hasThaiOrEnglish) {
    return "กรุณาพิมพ์เป็นข้อความภาษาไทยหรืออังกฤษ";
  }

  //? 6. สัญลักษณ์มากเกินครึ่ง
  const symbolCount = (trimmed.match(/[^ก-๙a-zA-Z\s]/gu) || []).length;
  if (symbolCount / nonSpaceLen > 0.5) {
    return "ข้อความมีสัญลักษณ์มากเกินไป ลองพิมพ์เป็นคำตอบที่อ่านได้นะ";
  }

  return null; //* ผ่านการตรวจสอบ
}
