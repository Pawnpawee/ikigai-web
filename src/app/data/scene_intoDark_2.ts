import type { SceneItemData } from "../components/reusable/SceneLayer";

export const REASONS = [
  { id: 1, text: "เครียดเรื่องเรียน" },
  { id: 2, text: "กลัวว่าตนเองจะไม่เก่งพอ" },
  { id: 3, text: "กลัวจะไม่มีที่ทำงาน" },
  { id: 4, text: "กลัวว่าทักษะตัวเองจะดีไม่พอ\nสำหรับการทำงาน" },
  { id: 5, text: "กลัวไม่มีรายได้ต่อเนื่อง" },
  { id: 6, text: "กลัวจะเข้ากับคนอื่นไม่ได้" },
];

export const SCENE_INTODARK_2_ITEMS: SceneItemData[] = [
  {
    id: "bg-gradient-top",
    src: "/assets/Scene/Scene5/02/bg gradient top.webp",
    mobileSrc: "/assets/Scene/Scene5/02/bg gradient top mobile.webp",
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
    src: "/assets/Scene/Scene5/02/bg gradient bottom.webp",
    mobileSrc: "/assets/Scene/Scene5/02/bg gradient bottom mobile.webp",
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
    src: "/assets/Scene/Scene5/02/little star.webp",
    mobileSrc: "/assets/Scene/Scene5/02/little star mobile.webp",
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
