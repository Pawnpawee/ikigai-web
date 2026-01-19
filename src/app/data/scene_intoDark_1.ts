import { getImgPath } from "@/utils/cloudinaryUtils";
import type { SceneItemData } from "../components/reusable/SceneLayer";

export const SCENE_INTODARK_1_ITEMS: SceneItemData[] = [
  {
    id: "bg-gradient",
    src: getImgPath("Scene/Scene5/01/bg_gradient.webp"),
    alt: "Background gradient",
    style: {
      left: "-11.34%",
      bottom: "-37.63%",
      width: "80.76%",
      height: "143.56%",
    },
    mobileStyle: {
      width: "144.166%",
      height: "81.093%",
      left: "-22.407%",
      bottom: "-16.537%",
    },
    animGroup: 1,
    className: "mix-blend-screen",
    priority: true,
  },
];
