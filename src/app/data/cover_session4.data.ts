import { getImgPath } from "@/utils/cloudinaryUtils";
import type { SceneItemData } from "../components/reusable/SceneLayer";

interface CoverDataConfig {
  titleImage: string;
  iconImage: string;
  sessionText?: string;
}

//? Cover Session 4 Config: "What you can be paid for" (Session 4 - Paid)
export const COVER_SESSION4_CONFIG: CoverDataConfig = {
  titleImage: getImgPath("Scene/Scene9/00/what_you_can_be_paid_for.webp"),
  iconImage: getImgPath("Icon/paid.webp"),
  sessionText: "session 4",
};

//? Cover Session 4 Items: light effect layer
export const COVER_SESSION4_ITEMS: SceneItemData[] = [
  {
    id: "light",
    src: getImgPath("Scene/Scene9/00/light_paid.webp"),
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
