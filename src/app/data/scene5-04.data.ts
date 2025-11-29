import { SceneItemData } from "@/app/components/scene/SceneLayer";

// Base Reference: 1920 x 2160 px
export const getScene504Items = (isPortrait: boolean): SceneItemData[] => [


  // Backgrounds
  {
    id: "bggradient1",
    src: "/assets/Scene/Scene5/scene5-04/bggradient.svg",
    alt: "background gradient 1",
    style: {
      width: isPortrait ? "119.87%" : "67.42%",
      height: isPortrait ? "29.97%" : "59.94%",
      left: isPortrait ? "-9.91%" : "16.29%",
      top: isPortrait ? "9.61%" : "-4.97%",
    },
    className: "mix-blend-screen absolute",
    priority: false,
  },
  {
    id: "bggradient2",
    src: "/assets/Scene/Scene5/scene5-04/bggradient.svg",
    alt: "background gradient 2",
    style: {
      top: isPortrait ? "68.04%" : "43.61%",    // Portrait: 2939.19 / 4320, Landscape: 942.00 / 2160
      left: isPortrait ? "-12.69%" : "-12.07%",  // Portrait: -137 / 1080, Landscape: -231.74 / 1920
      width: isPortrait ? "125.37%" : "70.52%",  // Portrait: 1354.04 / 1080, Landscape: 1353.98 / 1920
      height: isPortrait ? "31.34%" : "62.68%", // Portrait: 1354.04 / 4320, Landscape: 1353.86 / 2160
    },
    className: "mix-blend-screen absolute",
    priority: false,
  },
  {
    id: "cloud1",
    src: "/assets/Scene/Scene5/scene5-04/Cloud1.svg",
    alt: "cloud 1",
    style: {
      top: isPortrait ? "45.35%" : "47.80%",    // Portrait: 1959 / 4320, Landscape: 1032.48 / 2160
      left: isPortrait ? "47.13%" : "51.66%",   // Portrait: 509 / 1080, Landscape: 991.87 / 1920
      width: isPortrait ? "69.58%" : "39.14%",  // Portrait: 751.43 / 1080, Landscape: 751.49 / 1920
      height: isPortrait ? "3.76%" : "7.52%",  // Portrait: 162.29 / 4320, Landscape: 162.43 / 2160
    },
    className: "mix-blend-screen absolute",
    priority: false,
  },
  // Light Cat (moved from inline markup into SceneLayer)
  // {
  //   id: "light-cat",
  //   src: "/assets/Scene/Scene5/scene5-03/Light Cat.svg",
  //   alt: "light cat",
  //   style: {
  //     // Converted from provided px values (reference landscape: 1920x2160, portrait: 1080x4320)
  //     left: isPortrait ? "8.61%" : "19.5%",   // Portrait: 93 / 1080, Landscape: 310 / 1920
  //     bottom: isPortrait ? "11.70%" : "9.2778%",  // Portrait: 505.72 / 4320, Landscape: 200.28 / 2160
  //     width: isPortrait ? "77.07%" : "17.6406%",  // Portrait: 832.37 / 1080, Landscape: 338.58 / 1920
  //     height: isPortrait ? "18.17%" : "14.5278%", // Portrait: 785.02 / 4320, Landscape: 313.72 / 2160
  //   },
  //   className: "mix-blend-screen absolute",
  //   priority: false,
  // },

  // Little stars
  {
    id: "little-star3",
    src: "/assets/Scene/Scene5/scene5-04/Little star3.svg",
    alt: "Little star 3",
    style: {
      top: isPortrait ? "72.87%" : "55.20%",    // Portrait: 3148 / 4320, Landscape: 1192.32 / 2160
      left: isPortrait ? "16.67%" : "4.21%",    // Portrait: 180 / 1080, Landscape: 80.83 / 1920
      width: isPortrait ? "156.50%" : "88.03%",  // Portrait: 1690.19 / 1080, Landscape: 1690.18 / 1920
      height: isPortrait ? "20.85%" : "41.71%", // Portrait: 900.89 / 4320, Landscape: 900.94 / 2160
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
      top: isPortrait ? "52.57%" : "56.68%",    // Portrait: 2271 / 4320, Landscape: 1224.29 / 2160
      left: isPortrait ? "7.22%" : "47.69%",   // Portrait: 78 / 1080, Landscape: 915.65 / 1920
      width: isPortrait ? "85.53%" : "48.11%",  // Portrait: 923.69 / 1080, Landscape: 923.71 / 1920
      height: isPortrait ? "18.87%" : "37.75%", // Portrait: 815.35 / 4320, Landscape: 815.40 / 2160
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
      top: isPortrait ? "0.30%" : "54.10%",    // Portrait: 12.91 / 4320, Landscape: 1168.56 / 2160
      left: isPortrait ? "-24.72%" : "3.59%",    // Portrait: -267 / 1080, Landscape: 68.93 / 1920
      width: isPortrait ? "149.38%" : "84.03%",  // Portrait: 1613.33 / 1080, Landscape: 1613.38 / 1920
      height: isPortrait ? "21.66%" : "43.32%", // Portrait: 935.62 / 4320, Landscape: 935.71 / 2160
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
      top: isPortrait ? "45.23%" : "2.41%",     // Portrait: 1954 / 4320, Landscape: 52.06 / 2160
      left: isPortrait ? "-17.04%" : "4.73%",    // Portrait: -184 / 1080, Landscape: 90.82 / 1920
      width: isPortrait ? "149.38%" : "86.22%",  // Portrait: 1613.33 / 1080, Landscape: 1655.42 / 1920
      height: isPortrait ? "21.66%" : "14.26%", // Portrait: 935.62 / 4320, Landscape: 308.02 / 2160
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
      top: isPortrait ? "72.50%" : "9.00%",     // Portrait: 3132 / 4320, Landscape: 194.40 / 2160
      left: isPortrait ? "-17.04%" : "3.37%",    // Portrait: -184 / 1080, Landscape: 64.70 / 1920
      width: isPortrait ? "149.38%" : "93.26%",  // Portrait: 1613.33 / 1080, Landscape: 1790.59 / 1920
      height: isPortrait ? "21.66%" : "37.30%", // Portrait: 935.62 / 4320, Landscape: 805.60 / 2160
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
      top: isPortrait ? "25.87%" : "-0.11%",    // Portrait: 1117.73 / 4320, Landscape: -2.38 / 2160
      left: isPortrait ? "8.89%" : "1.44%",    // Portrait: 96 / 1080, Landscape: 27.65 / 1920
      width: isPortrait ? "153.29%" : "94.03%",  // Portrait: 1655.49 / 1080, Landscape: 1805.38 / 1920
      height: isPortrait ? "7.13%" : "7.92%", // Portrait: 308.03 / 4320, Landscape: 171.15 / 2160
    },
    className: "mix-blend-screen  absolute",
    animGroup: 1,
    priority: false,
  },
];

export const SCENE_5_04_ANIMATIONS = {};

// Export as constant for backward compatibility
export const SCENE_5_04_ITEMS = getScene504Items(false);