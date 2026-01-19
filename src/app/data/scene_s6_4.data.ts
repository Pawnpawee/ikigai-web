import { getImgPath } from "@/utils/cloudinaryUtils";
import type { SceneItemData } from "../components/reusable/SceneLayer";

//? Scene 6-4 Data: Love Session - Final Question
//? Animation Groups:
//? 1 = ground (floor1, hill1, hill2) - 0-50vh
//? 2 = treeback + tree + leave - 50-100vh
//? 3 = cat-human (Lottie) - 100-200vh

export const SCENE_S6_4_ITEMS: SceneItemData[] = [
  {
    id: "ground",
    src: getImgPath("Scene/Scene6/04/ground.webp"),
    alt: "Floor ground",
    style: {
      width: "100.31%", // (1926 / 1920) * 100
      height: "45.70%", // (493.6 / 1080) * 100
      right: "-0.19%", // (-3.6 / 1920) * 100
      bottom: "-13.46%", // (-145.36 / 1080) * 100
    },
    mobileStyle: {
      width: "287.98%", // (3110.199 / 1080) * 100
      height: "41.51%", // (797.089 / 1920) * 100
      left: "-99.53%", // (-1074.97 / 1080) * 100
      bottom: "0.00%", // (0.003 / 1920) * 100
    },
    animGroup: 1,
    priority: true,
  },
  {
    id: "tree-back",
    src: getImgPath("Scene/Scene6/04/tree_back.webp"),
    alt: "Trees background",
    style: {
      width: "30.95%", // (594.18 / 1920) * 100
      height: "98.56%", // (1064.42 / 1080) * 100
      left: "-3.96%", // (-76.11 / 1920) * 100
      top: "-27.85%", // (-300.74 / 1080) * 100
    },
    mobileStyle: {
      width: "88.84%", // (959.51 / 1080) * 100
      height: "89.52%", // (1718.877 / 1920) * 100
      left: "-110.56%", // (-1194 / 1080) * 100
      top: "-28.36%", // (-544.42 / 1920) * 100
    },
    animGroup: 2,
  },
  {
    id: "tree-front",
    src: getImgPath("Scene/Scene6/04/tree_front.webp"),
    alt: "Trees front",
    style: {
      width: "24.62%", // (472.714 / 1920) * 100
      height: "127.85%", // (1380.74 / 1080) * 100
      left: "5.39%", // (103.41 / 1920) * 100
      top: "-27.85%", // (-300.74 / 1080) * 100
      zIndex: 1,
    },
    mobileStyle: {
      width: "70.68%", // (763.362 / 1080) * 100
      height: "116.13%", // (2229.686 / 1920) * 100
      left: "-83.71%", // (-904.103 / 1080) * 100
      top: "-15%",
    },
    animGroup: 2,
  },
  {
    id: "tree-main",
    src: getImgPath("Scene/Scene6/04/tree.webp"),
    alt: "Main trees and stones",
    style: {
      width: "96.03%", // (1843.82 / 1920) * 100
      height: "103.16%", // (1114.109 / 1080) * 100
      right: "0.00%", // (0 / 1920) * 100
      top: "-27.85%", // (-300.75 / 1080) * 100
      zIndex: -1,
    },
    mobileStyle: {
      width: "275.69%", // (2977.49 / 1080) * 100
      height: "93.70%", // (1799.118 / 1920) * 100
      right: "-87.91%", // (-949.416 / 1080) * 100
      top: "-28.36%", // (-544.42 / 1920) * 100
    },
    animGroup: 2,
  },

  {
    id: "tree-main2",
    src: getImgPath("Scene/Scene6/04/tree.webp"),
    alt: "Main trees and stones",
    style: {
      width: "96.03%", // (1843.82 / 1920) * 100
      height: "103.16%", // (1114.109 / 1080) * 100
      right: "0.00%", // (0 / 1920) * 100
      top: "-27.85%", // (-300.75 / 1080) * 100
      zIndex: -1,
    },
    mobileStyle: {
      width: "275.69%", // (2977.49 / 1080) * 100
      height: "93.70%", // (1799.118 / 1920) * 100
      right: "-87.91%", // (-949.416 / 1080) * 100
      top: "-28.36%", // (-544.42 / 1920) * 100
    },
    animGroup: 4,
  },
  {
    id: "tree-front2",
    src: getImgPath("Scene/Scene6/04/tree_front.webp"),
    alt: "Trees front",
    style: {
      width: "24.62%", // (472.714 / 1920) * 100
      height: "127.85%", // (1380.74 / 1080) * 100
      left: "5.39%", // (103.41 / 1920) * 100
      top: "-27.85%", // (-300.74 / 1080) * 100
      zIndex: 1,
    },
    mobileStyle: {
      width: "70.68%", // (763.362 / 1080) * 100
      height: "116.13%", // (2229.686 / 1920) * 100
      left: "-83.71%", // (-904.103 / 1080) * 100
      top: "-15%",
    },
    animGroup: 4,
  },
];
