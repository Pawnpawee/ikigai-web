import { getImgPath } from "@/utils/cloudinaryUtils";
import type { SceneItemData } from "../components/reusable/SceneLayer";

interface CoverDataConfig {
  titleImage: string;
  iconImage: string;
  sessionText?: string;
}

export const COVER_SESSION2_CONFIG: CoverDataConfig = {
  titleImage: getImgPath("Scene/Scene7/01/what_you_good_at.webp"),
  iconImage: "/assets/icons/skill.webp",
  sessionText: "session 2",
};

export const COVER_SESSION2_ITEMS: SceneItemData[] = [
  {
    id: "light",
    src: getImgPath("Scene/Scene7/01/light_skill.webp"),
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
