import { getImgPath } from "@/utils/cloudinaryUtils";
import type { SceneItemData } from "../components/reusable/SceneLayer";

interface CoverDataConfig {
  titleImage: string;
  iconImage: string;
  sessionText?: string;
}

//? Cover Session 3 Config: "What the world needs" (Session 3 - World)
export const COVER_SESSION3_CONFIG: CoverDataConfig = {
  titleImage: getImgPath("Scene/Scene8/00/what_the_world_needs.webp"),
  iconImage: "/assets/icons/world.webp",
  sessionText: "session 3",
};

//? Cover Session 3 Items: light effect layer
export const COVER_SESSION3_ITEMS: SceneItemData[] = [
  {
    id: "light",
    src: getImgPath("Scene/Scene8/00/light_world.webp"),
    alt: "Light blur effect",
    style: {
      width: "29.70%",
      height: "52.80%",
      right: "35.14%",
      bottom: "1%",
    },
    mobileStyle: {
      width: "52.80%",
      height: "29.70%",
      right: "23.59%",
      bottom: "23%",
    },
    className: "mix-blend-screen",
    animGroup: 4,
  },
];
