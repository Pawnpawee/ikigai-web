import type { SceneItemData } from "../components/reusable/SceneLayer";

export const SCENE_INTODARK_4_ITEMS: SceneItemData[] = [
  {
    id: "bg-gradient",
    src: "/assets/Scene/Scene5/04/bg gradient.webp",
    mobileSrc: "/assets/Scene/Scene5/04/bg gradient mobile.webp",
    alt: "Background gradient",
    style: {
      width: "95.79%",
      height: "111.26%",
      left: "-12.07%",
      bottom: "-6.75%",
    },
    mobileStyle: {
      width: "114.22%",
      height: "90.67%",
      right: "-7.18%",
      bottom: "0.05%",
    },
    animGroup: 1,
    className: "mix-blend-screen",
  },
  {
    id: "little-star",
    src: "/assets/Scene/Scene5/04/little star.webp",
    mobileSrc: "/assets/Scene/Scene5/04/little star mobile.webp",
    alt: "Little Star",
    style: {
      width: "93.27%",
      height: "95.01%",
      left: "3.36%",
      bottom: "2.12%",
    },
    mobileStyle: {
      width: "81.50%",
      height: "98.87%",
      left: "8.44%",
      top: "-0.05%",
    },
    animGroup: 2,
    className: "mix-blend-screen animate-pulse",
  },
  {
    id: "cloud",
    src: "/assets/Scene/Scene5/04/cloud.webp",
    alt: "Cloud",
    style: {
      width: "39.14%",
      height: "7.51%",
      right: "9.20%",
      bottom: "44.22%",
      zIndex: -1,
    },
    mobileStyle: {
      width: "63.39%",
      height: "3.85%",
      right: "-17.22%",
      top: "43.93%",
    },
    animGroup: 3,
  },
];
