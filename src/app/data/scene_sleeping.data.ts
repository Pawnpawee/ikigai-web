import type { SceneItemData } from "../components/reusable/SceneLayer";

//? Converted from Figma inset values [top right bottom left] to position/size
//? Canvas: 1920x1080 (16:9 aspect ratio)
export const SCENE_SLEEPING_ITEMS: SceneItemData[] = [
  // Layer 1: Background (inset: [0 -0.06% 0 0])
  {
    id: "bg",
    src: "/assets/Scene/Scene2/bg.webp",
    alt: "background room",
    style: { left: "0%", top: "0%", width: "100.06%", height: "100%" },
    priority: true,
  },

  // Layer 2: Bed (inset: [7.79% 8.62% 0 8.68%])
  // width = 100 - 8.68 - 8.62 = 82.7%
  // height = 100 - 7.79 - 0 = 92.21%
  {
    id: "bed",
    src: "/assets/Scene/Scene2/bed.webp",
    alt: "bed with person sleeping",
    style: { left: "8.68%", top: "7.79%", width: "82.7%", height: "92.21%" },
    animGroup: 1,
  },

  // Layer 3: set1 (inset: [16.34% 9.99% 30.53% 11.4%])
  // Contains: slipper, book2, note, book1
  // width = 100 - 11.4 - 9.99 = 78.61%
  // height = 100 - 16.34 - 30.53 = 53.13%
  {
    id: "set1",
    src: "/assets/Scene/Scene2/set1.webp",
    alt: "books and notes on table",
    style: { left: "11.4%", top: "16.34%", width: "78.61%", height: "53.13%" },
    animGroup: 2,
  },

  // Layer 4: set2 (inset: [17.13% 18.87% 73.09% 17.91%])
  // Contains: lamp, clock
  // width = 100 - 17.91 - 18.87 = 63.22%
  // height = 100 - 17.13 - 73.09 = 9.78%
  {
    id: "set2",
    src: "/assets/Scene/Scene2/set2.webp",
    alt: "lamp and clock",
    style: { left: "17.91%", top: "17.13%", width: "63.22%", height: "9.78%" },
    animGroup: 3,
  },

  // Layer 5: Human (inset: [19.11% 41.44% 21.57% 41.98%])
  // width = 100 - 41.98 - 41.44 = 16.58%
  // height = 100 - 19.11 - 21.57 = 59.32%
  {
    id: "human",
    src: "/assets/Scene/Scene2/human.webp",
    alt: "person sleeping on bed",
    style: { left: "41.98%", top: "19.11%", width: "16.58%", height: "59.32%" },
    animGroup: 2,
  },

  // Layer 6: Blanket (inset: [41.65% 31.87% 2.8% 31.96%])
  // Contains: all blanket parts including phone
  // width = 100 - 31.96 - 31.87 = 36.17%
  // height = 100 - 41.65 - 2.8 = 55.55%
  {
    id: "blanket",
    src: "/assets/Scene/Scene2/blanket.webp",
    alt: "blanket covering person",
    style: { left: "31.96%", top: "41.65%", width: "36.17%", height: "55.55%" },
    animGroup: 5,
  },
];

export default SCENE_SLEEPING_ITEMS;
