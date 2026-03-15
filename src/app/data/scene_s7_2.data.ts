import { getImgPath } from "@/utils/cloudinaryUtils";
import type { SceneItemData } from "../components/reusable/SceneLayer";

//? Scene 7.3 Data: Soft Skills Selection (ChoiceButton Grid)
//? Layout: Desktop 1920x1080, Mobile 1080x1920
//? Animation Groups:
//? 1 = pattern (decorative background curves) - 0-0.1
//? 2 = star (corner stars) - 0.05-0.15
//? 3 = painting (easel illustration) - 0.15-0.25

// ────────────────────────────────────────────────────
//  Background SceneLayer Items
// ────────────────────────────────────────────────────

export const SCENE_S7_2_ITEMS: SceneItemData[] = [
  {
    id: "pattern",
    src: getImgPath("Scene/Scene7/03/pattern.webp"),
    mobileSrc: getImgPath("Scene/Scene7/03/pattern_mb.webp"),
    alt: "Decorative background pattern",
    style: {
      width: "110.88%", // 2128.84 / 1920
      height: "79.57%", // 859.39 / 1080
      left: "-1.62%", // -31.15 / 1920
      top: "20.43%", // 220.61 / 1080
    },
    mobileStyle: {
      width: "117.70%",
      height: "37.91%",
      left: "-3.60%",
      top: "62.09%",
    },
    animGroup: 1,
    priority: true,
  },
  {
    id: "star",
    src: getImgPath("Scene/Scene7/03/star.webp"),
    mobileSrc: getImgPath("Scene/Scene7/03/star_mb.webp"),
    alt: "Decorative stars",
    style: {
      width: "103.00%", // 1977.54 / 1920
      height: "82.86%", // 894.86 / 1080
      left: "-2.43%", // -46.71 / 1920
      top: "4.73%", // 51.08 / 1080
    },
    mobileStyle: {
      width: "103.56%",
      height: "82.28%",
      left: "-2.47%",
      top: "4.37%",
    },
    animGroup: 2,
  },
  {
    id: "painting",
    src: getImgPath("Scene/Scene7/03/painting.webp"),
    alt: "Easel painting illustration",
    style: {
      width: "23.02%", // 442.06 / 1920
      height: "86.88%", // 938.35 / 1080
      left: "6.98%", // 133.97 / 1920
      top: "6.56%", // 70.83 / 1080
    },
    mobileStyle: {
      width: "40.93%", // 442.06 / 1080
      height: "48.87%", // 938.35 / 1920
      left: "29.53%", // 318.97 / 1080
      top: "47.07%", // 903.83 / 1920
    },
    animGroup: 3,
    className: "portrait:opacity-30! portrait:xl:opacity-100!",
  },
];

// ────────────────────────────────────────────────────
//  Soft Skills Options List
// ────────────────────────────────────────────────────

export const SOFT_SKILLS_OPTIONS = [
  "ทักษะสื่อสาร",
  "การทำงานเป็นทีม & ความร่วมมือ",
  "ความเป็นผู้นำ & การบริหาร",
  "การคิดวิเคราะห์ & แก้ปัญหา",
  "การตัดสินใจ",
  "การจัดการเวลา & การวางแผน",
  "การปรับตัว & ยืดหยุ่น",
  "อารมณ์สังคม",
  "ความคิดสร้างสรรค์ & นวัตกรรม",
  "จริยธรรม & ความรับผิดชอบ",
  "ความใส่ใจรายละเอียด & คุณภาพงาน",
  "การบริการลูกค้า & การเจรจา",
];
