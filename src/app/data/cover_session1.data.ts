import type { SceneItemData } from "../components/reusable/SceneLayer";

export interface CoverDataConfig {
  titleImage: string;
  iconImage: string;
  sessionText?: string;
}

export const COVER_SESSION1_CONFIG: CoverDataConfig = {
  titleImage: "/assets/Scene/Scene6/01/what_you_love.webp",
  iconImage: "/assets/Icon/love.webp",
  sessionText: "session 1",
};

export const COVER_SESSION1_ITEMS: SceneItemData[] = [
  {
    id: "light",
    src: "/assets/Scene/Scene6/01/light_love.webp",
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
