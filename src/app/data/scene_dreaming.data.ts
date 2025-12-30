import type { SceneItemData } from "../components/reusable/SceneLayer";

export const SCENE_DREAMING_ITEMS: SceneItemData[] = [
  {
    id: "desert1",
    src: "/assets/Scene/Scene3/desert1.webp",
    alt: "desert1",
    style: { bottom: "0%", left: "0%", width: "100%", height: "46.8%" },
    sizes: "100vw",
    animGroup: 3,
  },
  {
    id: "desert2",
    src: "/assets/Scene/Scene3/desert2.webp",
    alt: "desert2",
    style: {
      bottom: "23.2%",
      left: "-13.0%",
      width: "67.2%",
      height: "40.8%",
    },
    sizes: "(max-width: 768px) 70vw, 60vw",
    animGroup: 2,
  },
  {
    id: "desert3",
    src: "/assets/Scene/Scene3/desert3.webp",
    alt: "desert3",
    style: { bottom: "0%", left: "0%", width: "100%", height: "32.4%" },
    sizes: "100vw",
    animGroup: 1,
  },
];
