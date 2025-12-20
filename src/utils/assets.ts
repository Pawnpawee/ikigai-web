// src/utils/assets.ts

// 1. ใส่ path ของรูปที่ไฟล์ใหญ่ๆ หรือรูปที่อยู่ใน Scene แรกๆ ลงในนี้
export const ASSETS_TO_PRELOAD = [
  //Icon
  "/assets/Icon/mute.svg",
  "/assets/Icon/music.svg",
  "/assets/Icon/menu.svg",
  "/assets/Icon/love.svg",
  "/assets/Icon/skill.svg",
  "/assets/Icon/world.svg",
  "/assets/Icon/paid.svg",
  "/assets/Icon/star.svg",

  // Hero Scene
  "/assets/Scene/Hero/hill-c-b.webp",
  "/assets/Scene/Hero/hill-c-f.webp",
  "/assets/Scene/Hero/hill-l-f.webp",
  "/assets/Scene/Hero/hill-r-f.webp",
  "/assets/Scene/Hero/love-circle.webp",
  "/assets/Scene/Hero/skill-circle.webp",
  "/assets/Scene/Hero/world-circle.webp",
  "/assets/Scene/Hero/paid-circle.webp",
];

export const getAssetUrl = (path: string): string => {
  // ถ้าไม่ได้ตั้งค่า CDN ก็ให้คืนค่า path เดิม (ใช้ของ Vercel)
  const cdnBase = process.env.NEXT_PUBLIC_CDN_URL || "";
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return cdnBase ? `${cdnBase}/${cleanPath}` : `/${cleanPath}`;
};
