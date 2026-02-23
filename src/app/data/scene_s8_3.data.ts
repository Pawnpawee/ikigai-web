import { getImgPath } from "@/utils/cloudinaryUtils";
import type { SceneItemData } from "../components/reusable/SceneLayer";

//? Scene 8.3 Data: Visual Transition Scene (World Session)
//? Layout: Desktop 1920×1080, Mobile 1080×1920
//? 300vh total: 200vh (starlight, leaf, lotus, butterfly) + 100vh (lotus bloom, butterfly 2)
//?
//? Animation Groups:
//? 1 = starlight    (full frame, stars background)
//? 2 = leaf         (full frame, leaf decoration)
//? 3 = lotus        (positioned lotus flower)
//? 4 = butterfly    (positioned butterfly, left)
//? 5 = lotus_bloom  (full frame / positioned, blooming lotus)
//? 6 = butterfly_2  (positioned butterfly, right)

// ────────────────────────────────────────────────────
//  Scene Items
// ────────────────────────────────────────────────────

export const SCENE_S8_3_ITEMS: SceneItemData[] = [
  {
    id: "starlight",
    src: getImgPath("Scene/Scene8/03/starlight.webp"),
    mobileSrc: getImgPath("Scene/Scene8/03/starlight_mb.webp"),
    alt: "Starlight background with stars",
    style: {
      width: "100%",
      height: "100%",
      left: "0%",
      top: "0%",
    },
    mobileStyle: {
      width: "100%",
      height: "100%",
      left: "0%",
      top: "0%",
    },
    animGroup: 1,
    priority: true,
  },
  {
    id: "leaf",
    src: getImgPath("Scene/Scene8/03/leaf.webp"),
    mobileSrc: getImgPath("Scene/Scene8/03/leaf_mb.webp"),
    alt: "Leaf decoration overlay",
    style: {
      width: "100%",
      height: "100%",
      left: "0%",
      top: "0%",
    },
    mobileStyle: {
      width: "100%",
      height: "100%",
      left: "0%",
      top: "0%",
    },
    animGroup: 2,
  },
  {
    id: "lotus",
    src: getImgPath("Scene/Scene8/03/lotus.webp"),
    mobileSrc: getImgPath("Scene/Scene8/03/lotus_mb.webp"),
    alt: "Lotus flower",
    style: {
      //? Desktop: 333.60×424.21 at (787.86, 339.37) in 1920×1080
      width: "17.38%",
      height: "39.28%",
      left: "41.03%",
      top: "31.42%",
    },
    mobileStyle: {
      //? Mobile: 344.38×437.93 at (397.71, 837.77) in 1080×1920
      width: "31.89%",
      height: "22.81%",
      left: "36.82%",
      top: "43.63%",
    },
    animGroup: 3,
  },
  {
    id: "butterfly",
    src: getImgPath("Scene/Scene8/03/butterfly.webp"),
    alt: "Butterfly on the left",
    style: {
      //? Desktop: 234.90×234.90 at (219.31, 136.47) in 1920×1080
      width: "12.23%",
      height: "21.75%",
      left: "11.42%",
      top: "12.64%",
    },
    mobileStyle: {
      //? Mobile: 242.50×242.50 at (66.21, 367.54) in 1080×1920
      width: "22.45%",
      height: "12.63%",
      left: "6.13%",
      top: "19.14%",
    },
    animGroup: 4,
  },
  {
    id: "lotus_bloom",
    src: getImgPath("Scene/Scene8/03/lotus_bloom.webp"),
    mobileSrc: getImgPath("Scene/Scene8/03/lotus_bloom_mb.webp"),
    alt: "Blooming lotus",
    style: {
      //? Desktop: full frame (1920×1080)
      width: "100%",
      height: "100%",
      left: "0%",
      top: "0%",
    },
    mobileStyle: {
      //? Mobile: 712.24×1625.97 at (205.89, 732.74) in 1080×1920
      width: "65.95%",
      height: "84.69%",
      left: "19.06%",
      top: "38.16%",
    },
    animGroup: 5,
  },
];
