import { SceneItemData } from "@/app/components/scene/SceneLayer";

// Base Reference: 1920 x 2160 px
export const SCENE_5_04_ITEMS: SceneItemData[] = [
  // Backgrounds
  {
    id: "bggradient1",
    src: "/assets/Scene/Scene5/scene5-04/bggradient.svg",
    alt: "background gradient 1",
    style: {
      top: "-4.97%",    // ⭐ -107.35 / 2160
      left: "16.29%",   // ⭐ 312.77 / 1920
      width: "67.42%",  // ⭐ 1294.46 / 1920
      height: "59.94%", // ⭐ 1294.70 / 2160
    },
    className: "mix-blend-screen absolute", 
    priority: false,
  },
  {
    id: "bggradient2",
    src: "/assets/Scene/Scene5/scene5-04/bggradient.svg",
    alt: "background gradient 2",
    style: {
      top: "43.61%",    // ⭐ 942.00 / 2160
      left: "-12.07%",  // ⭐ -231.74 / 1920
      width: "70.52%",  // ⭐ 1353.98 / 1920
      height: "62.68%", // ⭐ 1353.86 / 2160
    },
    className: "mix-blend-screen absolute",
    priority: false,
  },
  {
    id: "cloud1",
    src: "/assets/Scene/Scene5/scene5-04/Cloud1.svg",
    alt: "cloud 1",
    style: {
      top: "47.80%",    // ⭐ 1032.48 / 2160
      left: "51.66%",   // ⭐ 991.87 / 1920
      width: "39.14%",  // ⭐ 751.49 / 1920
      height: "7.52%",  // ⭐ 162.43 / 2160
    },
    className: "mix-blend-screen absolute",
    priority: false,
  },
  // Light Cat (moved from inline markup into SceneLayer)
  {
    id: "light-cat",
    src: "/assets/Scene/Scene5/scene5-03/Light Cat.svg",
    alt: "light cat",
    style: {
      // Converted from provided px values (reference 1920x2160)
      left: "19.5%",   // 310 / 1920
      bottom: "9.2778%",  // 200.28 / 2160
      width: "17.6406%",  // 338.58 / 1920
      height: "14.5278%", // 313.72 / 2160
    },
    className: "mix-blend-screen absolute",
    priority: false,
  },

  // Little stars
  {
    id: "little-star3",
    src: "/assets/Scene/Scene5/scene5-04/Little star3.svg",
    alt: "Little star 3",
    style: {
      top: "55.20%",    // ⭐ 1192.32 / 2160
      left: "4.21%",    // ⭐ 80.83 / 1920
      width: "88.03%",  // ⭐ 1690.18 / 1920
      height: "41.71%", // ⭐ 900.94 / 2160
    },
    className: "mix-blend-screen absolute",
    animGroup: 1,
    priority: false,
  },
  {
    id: "little-star4",
    src: "/assets/Scene/Scene5/scene5-04/Little star4.svg",
    alt: "Little star 4",
    style: {
      top: "56.68%",    // ⭐ 1224.29 / 2160
      left: "47.69%",   // ⭐ 915.65 / 1920
      width: "48.11%",  // ⭐ 923.71 / 1920
      height: "37.75%", // ⭐ 815.40 / 2160
    },
    className: "mix-blend-screen  absolute",
    animGroup: 1,
    priority: false,
  },
  {
    id: "little-star5",
    src: "/assets/Scene/Scene5/scene5-04/Little star5.svg",
    alt: "Little star 5",
    style: {
      top: "54.10%",    // ⭐ 1168.56 / 2160
      left: "3.59%",    // ⭐ 68.93 / 1920
      width: "84.03%",  // ⭐ 1613.38 / 1920
      height: "43.32%", // ⭐ 935.71 / 2160
    },
    className: "mix-blend-screen  absolute",
    animGroup: 1,
    priority: false,
  },
  {
    id: "little-star6",
    src: "/assets/Scene/Scene5/scene5-04/Little star6.svg",
    alt: "Little star 6",
    style: {
      top: "2.41%",     // ⭐ 52.06 / 2160
      left: "4.73%",    // ⭐ 90.82 / 1920
      width: "86.22%",  // ⭐ 1655.42 / 1920
      height: "14.26%", // ⭐ 308.02 / 2160
    },
    className: "mix-blend-screen  absolute",
    animGroup: 1,
    priority: false,
  },
  {
    id: "little-star7",
    src: "/assets/Scene/Scene5/scene5-04/Little star7.svg",
    alt: "Little star 7",
    style: {
      top: "9.00%",     // ⭐ 194.40 / 2160
      left: "3.37%",    // ⭐ 64.70 / 1920
      width: "93.26%",  // ⭐ 1790.59 / 1920
      height: "37.30%", // ⭐ 805.60 / 2160
    },
    className: "mix-blend-screen  absolute",
    animGroup: 1,
    priority: false,
  },
  {
    id: "little-star8",
    src: "/assets/Scene/Scene5/scene5-04/Little Star8.svg",
    alt: "Little star 8",
    style: {
      top: "-0.11%",    // ⭐ -2.38 / 2160
      left: "1.44%",    // ⭐ 27.65 / 1920
      width: "94.03%",  // ⭐ 1805.38 / 1920
      height: "7.92%",  // ⭐ 171.15 / 2160
    },
    className: "mix-blend-screen  absolute",
    animGroup: 1,
    priority: false,
  },
];

export const SCENE_5_04_ANIMATIONS = {}; 

export default SCENE_5_04_ITEMS;