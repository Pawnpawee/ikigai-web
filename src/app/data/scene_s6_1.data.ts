import { getImgPath } from "@/utils/cloudinaryUtils";
import type { SceneItemData } from "../components/reusable/SceneLayer";

export const SCENE_S6_1_ITEMS: SceneItemData[] = [
  {
    id: "bggradient",
    src: getImgPath("Scene/Scene6/02/bg gradient.webp"),
    mobileSrc: getImgPath("Scene/Scene6/02/bg gradient mobile.webp"),
    alt: "Background gradient",
    style: {
      width: "100%",
      height: "23.91%",
      left: "0%",
      top: "0%",
    },
    mobileStyle: {
      width: "100%",
      height: "21.07%",
      left: "0%",
      top: "0%",
    },
    animGroup: 1,
    className: "mix-blend-difference",
  },
  {
    id: "tree4",
    src: getImgPath("Scene/Scene6/02/tree4.webp"),
    mobileSrc: getImgPath("Scene/Scene6/02/tree4 mb.webp"),
    alt: "Tree 4",
    style: {
      width: "111.60%", // 2142.66 / 1920
      height: "53.27%", // 1150.66 / 2160
      left: "-8.77%", // -168.477 / 1920
      top: "46.57%", // 1005.87 / 2160
    },
    mobileStyle: {
      width: "329.97%",
      height: "49.88%",
      left: "-118.24%",
      top: "49.97%",
    },
    animGroup: 3,
  },
  {
    id: "tree3",
    src: getImgPath("Scene/Scene6/02/tree3.webp"),
    mobileSrc: getImgPath("Scene/Scene6/02/tree3 mb.webp"),
    alt: "Tree 3",
    style: {
      width: "79.38%", // 1524.07 / 1920
      height: "55.95%", // 1208.49 / 2160
      left: "35.71%", // 685.645 / 1920
      top: "39.9%", // 861.888 / 2160
    },
    mobileStyle: {
      width: "134.15%",
      height: "52.39%",
      left: "13.29%",
      top: "43.73%",
    },
    animGroup: 4,
  },
  {
    id: "tree2",
    src: getImgPath("Scene/Scene6/02/tree2.webp"),
    mobileSrc: getImgPath("Scene/Scene6/02/tree2 mb.webp"),
    alt: "Tree 2",
    style: {
      width: "120.59%", // 2315.33 / 1920
      height: "67.39%", // 1455.69 / 2160
      left: "4.65%", // 89.223 / 1920
      top: "23.79%", // 513.775 / 2160
    },
    mobileStyle: {
      width: "296.9%",
      height: "63.1%",
      left: "-78.58%",
      top: "28.65%",
    },
    animGroup: 5,
  },
  {
    id: "tree1",
    src: getImgPath("Scene/Scene6/02/tree1.webp"),
    mobileSrc: getImgPath("Scene/Scene6/02/tree1 mb.webp"),
    alt: "Tree 1",
    style: {
      width: "50.19%", // 963.64 / 1920
      height: "52.51%", // 1134.2 / 2160
      left: "-12.53%", // -240.645 / 1920
      top: "32.52%", // 702.408 / 2160
    },
    mobileStyle: {
      width: "87.92%",
      height: "19.64%",
      left: "-68.91%",
      top: "45.59%",
    },
    animGroup: 6,
  },
  {
    id: "leave",
    src: getImgPath("Scene/Scene6/02/leave.webp"),
    mobileSrc: getImgPath("Scene/Scene6/02/leave mb.webp"),
    alt: "Leaves",
    style: {
      width: "108.84%", // 2089.82 / 1920
      height: "26.99%", // 583.06 / 2160
      left: "-6.79%", // -130.348 / 1920
      top: "73.01%", // 1576.94 / 2160
    },
    mobileStyle: {
      width: "301.78%",
      height: "19.33%",
      left: "-92.31%",
      top: "80.67%",
    },
    animGroup: 7,
  },
  {
    id: "paper",
    src: getImgPath("Scene/Scene6/02/paper.webp"),
    mobileSrc: getImgPath("Scene/Scene6/02/paper mb.webp"),
    alt: "Paper",
    style: {
      width: "83.35%", // 1600.27 / 1920
      height: "42.97%", // 928.12 / 2160
      left: "8.54%", // 164.043 / 1920
      top: "53.36%", // 1152.47 / 2160
    },
    mobileStyle: {
      width: "76.93%",
      height: "43.98%",
      left: "14.25%",
      top: "53.38%",
    },
    animGroup: 8,
  },
];

export const ACTIVITIES = [
  { id: 1, label: "วาดรูป" },
  { id: 2, label: "ถ่ายรูป" },
  { id: 3, label: "ตัดต่อคลิป" },
  { id: 4, label: "ทำอาหาร" },
  { id: 5, label: "เขียนนิยาย" },
  { id: 6, label: "อ่านการ์ตูน/หนังสือ" },
  { id: 7, label: "ร้องเพลง" },
  { id: 8, label: "เล่นดนตรี" },
  { id: 9, label: "เล่นเกม" },
  { id: 10, label: "ดูหนัง/ซีรี่ย์" },
  { id: 11, label: "เล่นกับหมา/แมว" },
  { id: 12, label: "เดินทางท่องเที่ยว" },
  { id: 13, label: "ออกกำลังกาย" },
  { id: 14, label: "ไปคาเฟ่" },
  { id: 15, label: "สร้างคอนเทนต์สั้น" },
  { id: 16, label: "งานคราฟต์" },
  { id: 17, label: "สะสมของเก่า" },
  { id: 18, label: "กิจกรรมกลางแจ้ง" },
  { id: 19, label: "บอร์ดเกม" },
  { id: 20, label: "ปลูกต้นไม้" },
  { id: 21, label: "ไปคอนเสิร์ต" },
  { id: 22, label: "เรียนภาษาใหม่ ๆ" },
];
