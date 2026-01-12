import type { SceneItemData } from "../components/reusable/SceneLayer";

export const COVER_SESSION1_ITEMS: SceneItemData[] = [
  {
    id: "light-blur",
    src: "/assets/Scene/Scene6/light_blur.webp",
    alt: "Light blur effect",
    style: {
      width: "97.81%",
      height: "55.56%",
      left: "1.09%",
      top: "0",
    },
    mobileStyle: {
      left: "-36.94%",
      width: "173.89%",
      height: "31.25%",
      top: "0%",
    },
    animGroup: 2,
  },

  {
    id: "light",
    src: "/assets/Scene/Scene6/light_love.webp",
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
