import { SceneItemData } from "@/app/components/scene/SceneLayer";

// Mountains / hero background layers (order bottom -> top)
export const SCENE_HERO_ITEMS: SceneItemData[] = [
  {
    id: "hill-c-b",
    src: "/assets/Scene/Hero/hill-c-b.webp",
    alt: "Hill background",
    style: { left: "0%", bottom: "0%", width: "100%", height: "100%" },
  },
  {
    id: "hill-c-f",
    src: "/assets/Scene/Hero/hill-c-f.webp",
    alt: "Hill mid",
    style: { left: "0%", bottom: "0%", width: "100%", height: "100%" },
  },
  {
    id: "hill-r-f",
    src: "/assets/Scene/Hero/hill-r-f.webp",
    alt: "Hill right foreground",
    style: { left: "0%", bottom: "0%", width: "100%", height: "100%" },
  },
  {
    id: "hill-l-f",
    src: "/assets/Scene/Hero/hill-l-f.webp",
    alt: "Hill left foreground",
    style: { left: "0%", bottom: "0%", width: "100%", height: "100%" },

    priority: true,
  },
];

export default SCENE_HERO_ITEMS;
