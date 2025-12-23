import type { SceneItemData } from "../components/reusable/SceneLayer";

//? Scene 2 dimensions from Figma: 3840x1080
//? Calculated as percentage for aspect ratio 3840/1080
//? Total 16 images in this scene
export const SCENE_2_ITEMS: SceneItemData[] = [
  {
    id: "table",
    src: "/assets/Scene/Scene1/table.webp",
    alt: "Desk table",
    style: { left: "1.15%", top: "73.06%", width: "48.15%", height: "78.54%" },
  },
  {
    id: "poster1",
    src: "/assets/Scene/Scene1/poster1.webp",
    alt: "Wall poster group 1",
    style: {
      left: "3.52%",
      top: "-108.33%",
      width: "43.75%",
      height: "74.51%",
    },
  },
  {
    id: "poster2",
    src: "/assets/Scene/Scene1/poster2.webp",
    alt: "Wall poster group 2",
    style: { left: "5.65%", top: "-79.54%", width: "26.92%", height: "68.54%" },
  },
  {
    id: "poster3",
    src: "/assets/Scene/Scene1/poster3.webp",
    alt: "Wall poster group 3",
    style: {
      left: "24.01%",
      top: "-23.20%",
      width: "25.07%",
      height: "61.39%",
    },
  },
  {
    id: "poster4",
    src: "/assets/Scene/Scene1/poster4.webp",
    alt: "Wall poster group 4",
    style: { left: "-0.76%", top: "7.57%", width: "13.28%", height: "45.67%" },
  },
  {
    id: "poster5",
    src: "/assets/Scene/Scene1/poster5.webp",
    alt: "Wall poster group 5",
    style: { left: "39.66%", top: "44.42%", width: "12.01%", height: "20.15%" },
  },
  {
    id: "poster8",
    src: "/assets/Scene/Scene1/poster8.webp",
    alt: "Wall poster",
    style: { left: "52.69%", top: "18.07%", width: "6.41%", height: "17.63%" },
  },
  {
    id: "computer",
    src: "/assets/Scene/Scene1/Computer.webp",
    alt: "Computer workstation",
    style: { left: "12.53%", top: "14.28%", width: "24.94%", height: "70.28%" },
  },
  {
    id: "light",
    src: "/assets/Scene/Scene1/light.webp",
    alt: "Lamp light",
    style: { left: "11.92%", top: "23.17%", width: "25.50%", height: "59.89%" },
    className: "mix-blend-screen",
  },
  {
    id: "set1",
    src: "/assets/Scene/Scene1/set1.webp",
    alt: "Desk items set 1: book, pen, pencil box, post-it",
    style: { left: "37.30%", top: "67.67%", width: "9.16%", height: "21.63%" },
  },
  {
    id: "set2",
    src: "/assets/Scene/Scene1/set2.webp",
    alt: "Desk items set 2: lamp, book, paper",
    style: { left: "2.96%", top: "12.05%", width: "12.46%", height: "77.37%" },
  },
  {
    id: "lightWindow",
    src: "/assets/Scene/Scene1/light window.webp",
    alt: "Window light glow",
    style: { left: "67.31%", top: "19.30%", width: "14.89%", height: "62.68%" },
    animGroup: 2,
  },
  {
    id: "star",
    src: "/assets/Scene/Scene1/star.webp",
    alt: "Stars and circles decoration",
    style: { left: "67.13%", top: "21.62%", width: "14.34%", height: "24.88%" },
    animGroup: 4,
  },
  {
    id: "building2",
    src: "/assets/Scene/Scene1/building2.webp",
    alt: "Building exterior",
    style: { left: "67.31%", top: "37.61%", width: "14.89%", height: "44.37%" },
    animGroup: 4,
  },
  {
    id: "building1",
    src: "/assets/Scene/Scene1/building1.webp",
    alt: "Building exterior",
    style: { left: "67.31%", top: "48.01%", width: "14.89%", height: "33.97%" },
    animGroup: 5,
  },
  {
    id: "window",
    src: "/assets/Scene/Scene1/window.webp",
    alt: "Window frame",
    style: { left: "60.95%", top: "6.22%", width: "28.09%", height: "88.73%" },
    animGroup: 1,
  },
];

export default SCENE_2_ITEMS;
