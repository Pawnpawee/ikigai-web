import { getImgPath } from "@/utils/cloudinaryUtils";
import type { SceneItemData } from "../components/reusable/SceneLayer";

//? Scene 10.1: Walking through the desert - ฉากเดินทางข้ามทะเลทราย
//? Desktop Reference: 1920x1080 | Container: 16/9

export const SCENE_WALK_DESERT_ITEMS: SceneItemData[] = [
  //? Mountain layer (background) - ภูเขาไกล
  //? Figma: x=88.76, y=396.15, w=1007.4, h=318.1
  {
    id: "mountain",
    src: getImgPath("Scene/Scene10/mountain.webp"),
    alt: "Desert mountains in the background",
    style: {
      left: "4.6%",
      top: "36.7%",
      width: "52.5%",
      height: "29.5%",
    },
    animGroup: 2,
    sizes: "(max-width: 768px) 60vw, 50vw",
  },

  //? Hill layer (foreground) - เนินทราย
  //? Figma: x=0, y=621.31, w=1920.47, h=577.56
  {
    id: "hill",
    src: getImgPath("Scene/Scene10/hill.webp"),
    alt: "Desert hills foreground",
    style: {
      left: "0%",
      top: "57.5%",
      width: "100%",
      height: "53.5%",
    },
    animGroup: 1,
    sizes: "100vw",
  },
];
