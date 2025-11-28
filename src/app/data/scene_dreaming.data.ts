import { SceneItemData } from "@/app/components/scene/SceneLayer";

export const SCENE_DREAMING_ITEMS: SceneItemData[] = [
  {
    id: "background",
    src: "/assets/Scene/Intro/bg.webp",
    alt: "Background",
    style: { top: "0%", left: "0%", width: "100%", height: "100%" },
    animGroup: 0,
  },
  {
    id: "desert1",
    src: "/assets/Scene/Intro/desert1.webp",
    alt: "desert1",
    style: { bottom: "0%", left: "0%", width: "100%", height: "48%" },
    animGroup: 3,
  },
  {
    id: "desert2",
    src: "/assets/Scene/Intro/desert2.webp",
    alt: "desert2",
    style: {
      bottom: "23.15%",
      left: "-13.02%",
      width: "67.19%",
      height: "48%",
    },
    animGroup: 2,
  },
  {
    id: "desert3",
    src: "/assets/Scene/Intro/desert3.webp",
    alt: "desert3",
    style: { bottom: "0%", left: "0%", width: "100%", height: "48%" },
    animGroup: 1,
  },
];
