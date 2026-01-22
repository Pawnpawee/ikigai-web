import { getImgPath } from "@/utils/cloudinaryUtils";
import type { SceneItemData } from "../components/reusable/SceneLayer";

export const REASONS = [
  { text: "เครียดเรื่องเรียน" },
  { text: "กลัวว่าตนเองจะไม่เก่งพอ" },
  { text: "กลัวจะไม่มีที่ทำงาน" },
  { text: "กลัวว่าทักษะตัวเองจะดีไม่พอ\nสำหรับการทำงาน" },
  { text: "กลัวไม่มีรายได้ต่อเนื่อง" },
  { text: "กลัวจะเข้ากับคนอื่นไม่ได้" },
];

export const SCENE_INTODARK_2_ITEMS: SceneItemData[] = [
  {
    id: "bg-gradient-top",
    src: getImgPath("Scene/Scene5/02/bg_gradient_top.webp"),
    mobileSrc: getImgPath("Scene/Scene5/02/bg_gradient_top_mobile.webp"),
    alt: "Background gradient",
    style: {
      left: "-11.30%",
      top: "-17.07%",
      width: "111.86%",
      height: "81.28%",
    },
    mobileStyle: {
      right: "-44.61%",
      top: "-17.58%",
      width: "183.13%",
      height: "77.21%",
    },
    animGroup: 1,
    className: "mix-blend-screen",
  },

  {
    id: "bg-gradient-bottom",
    src: getImgPath("Scene/Scene5/02/bg_gradient_bottom.webp"),
    mobileSrc: getImgPath("Scene/Scene5/02/bg_gradient_bottom_mobile.webp"),
    alt: "Background gradient",
    style: {
      left: "0",
      bottom: "-1%",
      width: "100%",
      height: "39.28%",
    },
    mobileStyle: {
      left: "0%",
      bottom: "0%",
      width: "100%",
      height: "22.86%",
    },
    animGroup: 1,
  },
  {
    id: "little-star",
    src: getImgPath("Scene/Scene5/02/little_star.webp"),
    mobileSrc: getImgPath("Scene/Scene5/02/little_star_mobile.webp"),
    alt: "Little Star",
    style: {
      right: "5.49%",
      bottom: "5.35%",
      width: "86.01%",
      height: "80.84%",
    },
    mobileStyle: {
      right: "5.37%",
      bottom: "3.17%",
      width: "89.26%",
      height: "74.22%",
    },
    animGroup: 2,
    className: "mix-blend-screen animate-pulse",
  },
];
