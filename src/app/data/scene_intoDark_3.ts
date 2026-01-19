import { getImgPath } from "@/utils/cloudinaryUtils";
import type { SceneItemData } from "../components/reusable/SceneLayer";

export const SCENE_INTODARK_3_ITEMS: SceneItemData[] = [
  {
    id: "little-star",
    src: getImgPath("Scene/Scene5/03/little star.webp"),
    mobileSrc: getImgPath("Scene/Scene5/03/little star mobile.webp"),
    alt: "Little Star",
    style: {
      width: "97.11%",
      height: "100.44%",
      left: "1.44%",
      bottom: "-15.72%",
    },
    mobileStyle: {
      width: "80.47%",
      height: "47.82%",
      left: "7.62%",
      bottom: "-5.36%",
    },
    animGroup: 2,
    className: "mix-blend-screen animate-pulse",
  },

  {
    id: "cloud",
    src: getImgPath("Scene/Scene5/03/cloud.webp"),
    alt: "Cloud",
    style: {
      width: "43.30%",
      height: "13.21%",
      right: "25.69%",
      bottom: "4.96%",
    },
    mobileStyle: {
      width: "74.61%",
      height: "7.20%",
      left: "-4.98%",
      bottom: "6.81%",
    },
    animGroup: 3,
  },
];
