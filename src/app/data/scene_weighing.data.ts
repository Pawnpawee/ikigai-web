import type { SceneItemData } from "../components/reusable/SceneLayer";

export const SCENE_WEIGHING_ITEMS: SceneItemData[] = [
  {
    id: "ground",
    src: "/assets/Scene/Scene4/ground.webp",
    alt: "ground",
    style: {
      width: "100%",
      height: "52.3808%",
      left: "-0.2%",
      bottom: "-52.2419%",
    },
    animGroup: 2,
  },
  {
    id: "building",
    src: "/assets/Scene/Scene4/building.webp",
    alt: "Building",
    style: {
      width: "52.8875%",
      height: "90.8444%",
      left: "23.5375%",
      bottom: "-2.1333%",
    },
    animGroup: 4,
  },
  {
    id: "scale-2-1",
    src: "/assets/Scene/Scene4/scale-2.webp",
    alt: "Scale Left",
    style: {
      bottom: "43.80%",
      right: "43.55%",
      width: "12.86%",
      height: "2.30%",
    },
    animGroup: 69,
  },
  {
    id: "scale_center",
    src: "/assets/Scene/Scene4/scale.webp",
    alt: "Scale",
    style: { top: "45.77%", left: "41.95%", width: "16.11%", height: "31.79%" },
    animGroup: 6,
  },
  {
    id: "heart_plate",
    src: "/assets/Scene/Scene4/heart-plate.webp",
    alt: "Heart Plate",
    style: { top: "62.68%", left: "41.95%", width: "3.38%", height: "1.54%" },
    animGroup: 66,
  },
  {
    id: "feather_plate",
    src: "/assets/Scene/Scene4/feather-plate.webp",
    alt: "Feather Plate",
    style: { top: "63.02%", left: "53.56%", width: "3.38%", height: "1.54%" },
    animGroup: 67,
  },
  {
    id: "heart",
    src: "/assets/Scene/Scene4/heart.webp",
    alt: "Heart",
    style: { top: "58.44%", left: "42.18%", width: "3.50%", height: "4.99%" },
    animGroup: 7,
  },
  {
    id: "feather",
    src: "/assets/Scene/Scene4/feather.webp",
    alt: "Feather",
    style: { top: "58.76%", left: "54.60%", width: "3.42%", height: "4.96%" },
    animGroup: 8,
  },

  {
    id: "light_overlay",
    src: "/assets/Scene/Scene4/light.webp",
    alt: "Light",
    style: { top: "23.39%", left: "32.43%", width: "35.14%", height: "62.45%" },
    animGroup: 68,
    className: "mix-blend-screen",
    priority: true,
  },
];
