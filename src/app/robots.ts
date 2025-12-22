import type { MetadataRoute } from "next";

//* ฟังก์ชันนี้จะทำหน้าที่ Generate ไฟล์ robots.txt ให้กับเว็บไซต์
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      //? userAgent: '*' หมายถึงอนุญาตให้ Bot ทุกประเภทเข้ามาเก็บข้อมูล
      userAgent: "*",
      allow: "/",
    },
  };
}
