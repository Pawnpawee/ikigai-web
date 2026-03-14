import { getJsonUrl } from "@/utils/cloudinaryUtils";

//? Information: ข้อมูล Scene สำหรับหน้า About - แสดงทีมผู้พัฒนาโปรเจค Ikigai
//? Desktop (1920x1080): p1 อยู่กลางบน, p2 ล่างซ้าย, p3 ล่างขวา
//? Mobile (1080x1920): เรียงแนวตั้ง p1 → p2 → p3
//? ใช้ Lottie animation แทนรูปภาพ เพื่อให้ตัวละครขยับได้

interface AboutLottieItem {
  id: string;
  src: string;
  name: string;
  role: string;
  //? Desktop position (% จาก container 1920x1080)
  style: { left: string; top: string; width: string; height: string };
  //? Mobile position override (% จาก container 1080x1920)
  mobileStyle: { left: string; top: string; width: string; height: string };
}

export const SCENE_ABOUT_ITEMS: AboutLottieItem[] = [
  {
    //? p1: อาจารย์ที่ปรึกษา - ตำแหน่งกลางบน (Desktop) / บนสุด (Mobile)
    id: "p1",
    src: getJsonUrl("Scene/About/p1.json"),
    name: "อาจารย์ณัฐพงษ์ ประเสริฐสังข์",
    role: "อาจารย์ที่ปรึกษา",
    style: {
      left: "39.79%", // 764 / 1920
      top: "18.18%", // 196.38 / 1080
      width: "20.47%", // 393 / 1920
      height: "39.38%", // 425.32 / 1080
    },
    mobileStyle: {
      left: "31.48%", // 340 / 1080
      top: "15.26%", // 293.02 / 1920
      width: "37.04%", // 400 / 1080
      height: "22.15%", // 425.32 / 1920
    },
  },
  {
    //? p2: Developer - ตำแหน่งล่างซ้าย (Desktop) / กลาง (Mobile)
    id: "p2",
    src: getJsonUrl("Scene/About/p2.json"),
    name: "นางสาวพรปวีณ์ ธนลไชยพัฒน์",
    role: "Developer",
    style: {
      left: "19.90%", // 382 / 1920
      top: "51.80%", // 559.47 / 1080
      width: "20.83%", // 400 / 1920
      height: "39.38%", // 425.32 / 1080
    },
    mobileStyle: {
      left: "31.48%", // 340 / 1080
      top: "42.62%", // 818.34 / 1920
      width: "37.04%", // 400 / 1080
      height: "22.15%", // 425.32 / 1920
    },
  },
  {
    //? p3: Designer - ตำแหน่งล่างขวา (Desktop) / ล่างสุด (Mobile)
    id: "p3",
    src: getJsonUrl("Scene/About/p3.json"),
    name: "นางสาวมาริสา นาคากาว่า",
    role: "Designer",
    style: {
      left: "62.40%", // 1198 / 1920
      top: "51.88%", // 560.30 / 1080
      width: "17.71%", // 340 / 1920
      height: "39.38%", // 425.32 / 1080
    },
    mobileStyle: {
      left: "34.26%", // 370 / 1080
      top: "69.98%", // 1343.66 / 1920
      width: "31.48%", // 340 / 1080
      height: "22.15%", // 425.32 / 1920
    },
  },
];
