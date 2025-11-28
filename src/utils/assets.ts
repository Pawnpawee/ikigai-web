// src/utils/assets.ts

// 1. ใส่ path ของรูปที่ไฟล์ใหญ่ๆ หรือรูปที่อยู่ใน Scene แรกๆ ลงในนี้
// ยิ่งใส่ครบ หน้าเว็บยิ่งลื่น แต่หน้าโหลดก็จะนานขึ้นนิดนึงตามขนาดไฟล์
export const ASSETS_TO_PRELOAD = [
  // Hero Scene
  "/assets/Scene/Hero/hill-c-b.webp",
  "/assets/Scene/Hero/hill-c-f.webp",
  "/assets/Scene/Hero/hill-l-f.webp",
  "/assets/Scene/Hero/hill-r-f.webp",
  "/assets/Scene/Hero/love-circle.webp",
  "/assets/Scene/Hero/skill-circle.webp",
  "/assets/Scene/Hero/world-circle.webp",
  "/assets/Scene/Hero/paid-circle.webp",
  
  // Intro Scene
  "/assets/Scene/Intro/bg.webp",
  "/assets/Scene/Intro/desert1.webp",
  "/assets/Scene/Intro/desert2.webp",
  "/assets/Scene/Intro/desert3.webp",
  
  // Scene1 (Job Application)
  "/assets/Scene/Scene1/table.webp",
  "/assets/Scene/Scene1/Computer.webp",
  "/assets/Scene/Scene1/human.lottie",
  "/assets/Scene/Scene1/moon.lottie",
  "/assets/Scene/Scene1/window.webp",
  "/assets/Scene/Scene1/curtain1.webp",
  "/assets/Scene/Scene1/curtain2.webp",
  "/assets/Scene/Scene1/building1.webp",
  "/assets/Scene/Scene1/building2.webp",
  "/assets/Scene/Scene1/circle.webp",
  "/assets/Scene/Scene1/lamp.webp",
  "/assets/Scene/Scene1/book1.webp",
  "/assets/Scene/Scene1/book2.webp",
  "/assets/Scene/Scene1/paper1.webp",
  "/assets/Scene/Scene1/paper2.webp",
  "/assets/Scene/Scene1/paper3.webp",
  "/assets/Scene/Scene1/paper4.webp",
  "/assets/Scene/Scene1/pen.webp",
  "/assets/Scene/Scene1/pencil box.webp",
  "/assets/Scene/Scene1/postit.webp",
  "/assets/Scene/Scene1/light.webp",
  "/assets/Scene/Scene1/light window.webp",
  "/assets/Scene/Scene1/star.webp",
  "/assets/Scene/Scene1/poster1.webp",
  "/assets/Scene/Scene1/poster2.webp",
  "/assets/Scene/Scene1/poster3.webp",
  "/assets/Scene/Scene1/poster4.webp",
  "/assets/Scene/Scene1/poster5.webp",
  "/assets/Scene/Scene1/poster6.webp",
  "/assets/Scene/Scene1/poster7.webp",
  "/assets/Scene/Scene1/poster8.webp",
  "/assets/Scene/Scene1/poster9.webp",
  "/assets/Scene/Scene1/poster10.webp",
  "/assets/Scene/Scene1/poster11.webp",
  "/assets/Scene/Scene1/poster12.webp",
  "/assets/Scene/Scene1/poster13.webp",
  "/assets/Scene/Scene1/poster14.webp",
  "/assets/Scene/Scene1/poster15.webp",
  
  // Scene2 (Sleeping)
  "/assets/Scene/Scene2/bg.webp",
  "/assets/Scene/Scene2/bed.webp",
  "/assets/Scene/Scene2/table1.webp",
  "/assets/Scene/Scene2/table2.webp",
  "/assets/Scene/Scene2/lamp.webp",
  "/assets/Scene/Scene2/clock.webp",
  "/assets/Scene/Scene2/book1.webp",
  "/assets/Scene/Scene2/book2.webp",
  "/assets/Scene/Scene2/note.webp",
  "/assets/Scene/Scene2/head.webp",
  "/assets/Scene/Scene2/body.webp",
  "/assets/Scene/Scene2/blanket.webp",
  "/assets/Scene/Scene2/phone.webp",
  "/assets/Scene/Scene2/slipper.webp",
  
  // // Scene4 (Weighing)
  "/assets/Scene/Scene4/bg.webp",
  "/assets/Scene/Scene4/wall.webp",
  "/assets/Scene/Scene4/light.webp",
  "/assets/Scene/Scene4/scale.webp",
  "/assets/Scene/Scene4/scale-2.webp",
  "/assets/Scene/Scene4/heart.webp",
  "/assets/Scene/Scene4/heart-plate.webp",
  "/assets/Scene/Scene4/feather.webp",
  "/assets/Scene/Scene4/feather-plate.webp",
  
  // // Scene5-01 (Into Dark - Name Input)
  // "/assets/Scene/Scene5/scene5-01/bggradient.webp",
  // "/assets/Scene/Scene5/scene5-01/Light cat.webp",
  // "/assets/Scene/Scene5/scene5-01/Little star1.webp",
  // "/assets/Scene/Scene5/scene5-01/Little star2.webp",
  // "/assets/Scene/Scene5/scene5-01/Little star3.webp",
  // "/assets/Scene/Scene5/scene5-01/star line1.webp",
  // "/assets/Scene/Scene5/scene5-01/star line2.webp",
  // "/assets/Scene/Scene5/scene5-01/star line3.webp",
  // "/assets/Scene/Scene5/scene5-01/water.webp",
  // "/assets/Scene/Scene5/scene5-01/tail.webp",
  // "/assets/Scene/Scene5/scene5-01/cat face.webp",
  
  // // Scene5-02 (Into Dark - Choices)
  // "/assets/Scene/Scene5/scene5-02/bggradient1.webp",
  // "/assets/Scene/Scene5/scene5-02/bggradient2.webp",
  // "/assets/Scene/Scene5/scene5-02/bggradient3.webp",
  // "/assets/Scene/Scene5/scene5-02/Light Cat.webp",
  // "/assets/Scene/Scene5/scene5-02/cat.webp",
  // "/assets/Scene/Scene5/scene5-02/cat face.webp",
  // "/assets/Scene/Scene5/scene5-02/Little Star1.webp",
  // "/assets/Scene/Scene5/scene5-02/Little Star2.webp",
  // "/assets/Scene/Scene5/scene5-02/Little Star3.webp",
  // "/assets/Scene/Scene5/scene5-02/Star line1.webp",
  // "/assets/Scene/Scene5/scene5-02/Star line2.webp",
  
  // // Scene5-03 (Into Dark - Heard)
  // "/assets/Scene/Scene5/scene5-03/bggradient.webp",
  // "/assets/Scene/Scene5/scene5-03/Light Cat.webp",
  // "/assets/Scene/Scene5/scene5-03/Cloud.webp",
  // "/assets/Scene/Scene5/scene5-03/Little Star1.webp",
  // "/assets/Scene/Scene5/scene5-03/Little Star2.webp",
  // "/assets/Scene/Scene5/scene5-03/Little Star3.webp",
  // "/assets/Scene/Scene5/scene5-03/Star line1.webp",
  
  // // Scene5-04 (Into Dark - Submit)
  // "/assets/Scene/Scene5/scene5-04/bggradient1.webp",
  // "/assets/Scene/Scene5/scene5-04/bggradient2.webp",
  // "/assets/Scene/Scene5/scene5-04/Cloud1.webp",
  // "/assets/Scene/Scene5/scene5-04/Cloud2.webp",
  // "/assets/Scene/Scene5/scene5-04/Light Cat.webp",
  // "/assets/Scene/Scene5/scene5-04/Line star1.webp",
  // "/assets/Scene/Scene5/scene5-04/Little star.webp",
  // "/assets/Scene/Scene5/scene5-04/Little star1.webp",
  // "/assets/Scene/Scene5/scene5-04/Little star1-1.webp",
  // "/assets/Scene/Scene5/scene5-04/Little star2.webp",
  // "/assets/Scene/Scene5/scene5-04/Little star2-1.webp",
  // "/assets/Scene/Scene5/scene5-04/love circle.webp",
  // "/assets/Scene/Scene5/scene5-04/paid circle.webp",
  // "/assets/Scene/Scene5/scene5-04/skill circle.webp",
  // "/assets/Scene/Scene5/scene5-04/world circle.webp",
  // "/assets/Scene/Scene5/scene5-04/cat.webp",
  // "/assets/Scene/Scene5/scene5-04/cat face.webp",
  // "/assets/Scene/Scene5/scene5-04/cat-noise.webp",
];

// ฟังก์ชันช่วยเรียก URL (เผื่ออนาคตอยากกลับไปใช้ CDN ก็แก้ที่นี่ที่เดียว)
export const getAssetUrl = (path: string): string => {
  // ถ้าไม่ได้ตั้งค่า CDN ก็ให้คืนค่า path เดิม (ใช้ของ Vercel)
  const cdnBase = process.env.NEXT_PUBLIC_CDN_URL || "";
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return cdnBase ? `${cdnBase}/${cleanPath}` : `/${cleanPath}`;
};