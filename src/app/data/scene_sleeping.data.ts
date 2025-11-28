import { SceneItemData } from "@/app/components/scene/SceneLayer";

// Calculated from inset: top right bottom left => convert to top/left/width/height
export const SCENE_SLEEPING_ITEMS: SceneItemData[] = [
  // Background (full)
  {
    id: "bg",
    src: "/assets/Scene/Scene2/bg.webp",
    alt: "background room",
    style: { left: "0%", top: "0%", width: "100%", height: "100%" },
  },

  // Table2 (set1)
  {
    id: "table2",
    src: "/assets/Scene/Scene2/table2.webp",
    alt: "decorative table",
    style: { left: "72.95%", top: "15.23%", width: "18.43%", height: "20.39%" },
    animGroup: 1,
  },

  // Table1 (set1)
  {
    id: "table1",
    src: "/assets/Scene/Scene2/table1.webp",
    alt: "decorative table",
    style: { left: "8.68%", top: "14.78%", width: "18.43%", height: "20.39%" },
    animGroup: 1,
  },

  // Slipper (set2)
  {
    id: "slipper",
    src: "/assets/Scene/Scene2/slipper.webp",
    alt: "slippers on floor",
    style: { left: "17.98%", top: "46.99%", width: "9.65%", height: "22.48%" },
    animGroup: 2,
  },

  // Bed (set1) - priority
  {
    id: "bed",
    src: "/assets/Scene/Scene2/bed.webp",
    alt: "bed with person sleeping",
    style: { left: "24.83%", top: "7.79%", width: "50.4%", height: "92.21%" },
    animGroup: 1,
  },

  // Book2 (set2)
  {
    id: "book2",
    src: "/assets/Scene/Scene2/book2.webp",
    alt: "book on nightstand",
    style: { left: "11.4%", top: "20.48%", width: "4.99%", height: "10.14%" },
    animGroup: 2,
  },

  // Lamp (set3)
  {
    id: "lamp",
    src: "/assets/Scene/Scene2/lamp.webp",
    alt: "bedside lamp",
    style: { left: "17.91%", top: "17.13%", width: "5.51%", height: "9.78%" },
    animGroup: 3,
  },

  // Note (set2)
  {
    id: "note",
    src: "/assets/Scene/Scene2/note.webp",
    alt: "note on table",
    style: { left: "82.81%", top: "22.39%", width: "3.57%", height: "8.08%" },
    animGroup: 2,
  },

  // Clock (set3)
  {
    id: "clock",
    src: "/assets/Scene/Scene2/clock.webp",
    alt: "wall clock",
    style: { left: "74.66%", top: "21.17%", width: "6.47%", height: "5.73%" },
    animGroup: 3,
  },

  // Book1 (set4)
  {
    id: "book1",
    src: "/assets/Scene/Scene2/book1.webp",
    alt: "book on table",
    style: { left: "85.03%", top: "16.34%", width: "4.98%", height: "10.15%" },
    animGroup: 4,
  },

  // Head (set4)
  {
    id: "head",
    src: "/assets/Scene/Scene2/head.webp",
    alt: "person head",
    style: { left: "42.31%", top: "19.11%", width: "16.01%", height: "25.5%" },
    animGroup: 4,
  },

  // Body (set4)
  {
    id: "body",
    src: "/assets/Scene/Scene2/body.webp",
    alt: "person body",
    style: { left: "41.98%", top: "42.14%", width: "16.58%", height: "36.29%" },
    animGroup: 4,
  },

  // Blanket (set5) - priority
  {
    id: "blanket",
    src: "/assets/Scene/Scene2/blanket.webp",
    alt: "blanket covering person",
    style: { left: "31.96%", top: "47.7%", width: "36.17%", height: "49.5%" },
    animGroup: 5,
  },

  // Phone (set5)
  {
    id: "phone",
    src: "/assets/Scene/Scene2/phone.webp",
    alt: "phone on bed",
    style: { left: "62.2%", top: "41.65%", width: "3.52%", height: "9.05%" },
    animGroup: 5,
  },
];

export default SCENE_SLEEPING_ITEMS;
