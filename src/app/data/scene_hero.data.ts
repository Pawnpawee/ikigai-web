import { getImgPath } from "@/utils/cloudinaryUtils";
import type { SceneItemData } from "../components/reusable/SceneLayer";

export const SCENE_HERO_ITEMS: SceneItemData[] = [
  {
    id: "hill-c-b",
    src: getImgPath("Scene/Hero/hill-c-b.webp"),
    alt: "Hill background",
    style: { left: "0%", bottom: "0%", width: "100%", height: "100%" },
    motionConfig: {
      parallaxDepth: 15,
      delay: 1.5,
      duration: 1.5,
    },
    sizes: "100vw",
  },
  {
    id: "hill-c-f",
    src: getImgPath("Scene/Hero/hill-c-f.webp"),
    alt: "Hill mid",
    style: { left: "0%", bottom: "0%", width: "100%", height: "100%" },
    motionConfig: {
      parallaxDepth: 15,
      delay: 2.5,
      duration: 1.5,
    },
    sizes: "100vw",
  },
  {
    id: "hill-r-f",
    src: getImgPath("Scene/Hero/hill-r-f.webp"),
    alt: "Hill right foreground",
    style: { left: "0%", bottom: "0%", width: "100%", height: "100%" },
    motionConfig: {
      parallaxDepth: 5,
      delay: 0.5,
      duration: 1.5,
    },
    sizes: "100vw",
  },
  {
    id: "hill-l-f",
    src: getImgPath("Scene/Hero/hill-l-f.webp"),
    alt: "Hill left foreground",
    style: { left: "0%", bottom: "0%", width: "100%", height: "100%" },
    priority: true, // ตัวหน้าสุด โหลดก่อนเสมอ
    motionConfig: {
      parallaxDepth: 5,
      delay: 0,
      duration: 1.5,
    },
    sizes: "100vw",
  },
];
