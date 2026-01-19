// utils/cloudinaryUtils.ts

//? information: ดึง Path สำหรับรูปภาพ
// การใช้งาน: ใส่ Path โดยไม่ต้องมี /assets/ ข้างหน้า
// ตัวอย่าง: getImgPath("Scene/Scene6/04/tree.webp")
// จะได้: /assets/Scene/Scene6/04/tree.webp (local) หรือ Cloudinary URL (ถ้ามี)
export const getImgPath = (path: string) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  //? Return Cloudinary URL สำหรับ production
  // Note: ต้อง upload รูปไปที่ folder assets ใน Cloudinary ก่อน
  return `https://res.cloudinary.com/${cloudName}/image/upload/assets/${path}`;
};

//? information: สร้าง URL เต็มสำหรับไฟล์ JSON (Lottie)
// การใช้งาน: ต้องใส่ Path เต็ม + นามสกุลไฟล์ .json
// ตัวอย่าง: getJsonUrl("Scene/Hero/starry-bg.json")
export const getJsonUrl = (path: string) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloudName}/raw/upload/v1/assets/${path}`;
};

//? information: สร้าง URL เต็มสำหรับไฟล์เสียง (Audio)
// การใช้งาน: ต้องใส่ Path เต็ม + นามสกุลไฟล์ .mp3
// ตัวอย่าง: getAudioUrl("Sound/bg-music.mp3")
export const getAudioUrl = (path: string) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  // ไฟล์เสียงใน Cloudinary จะถูกมองเป็น video resource type
  return `https://res.cloudinary.com/${cloudName}/video/upload/v1/assets/${path}`;
};
