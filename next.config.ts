import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

// 1. ตั้งค่าให้ Analyzer ทำงานเฉพาะเมื่อเราสั่ง (ผ่าน Environment Variable)
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Config เดิมของคุณ (เช่น images domains) ใส่ตรงนี้
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" }
    ],
    qualities: [85, 90, 100],

    // ⭐ แนะนำให้กำหนด formats ด้วย เพื่อให้รองรับ WebP และ AVIF (ใหม่กว่า WebP)
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
};

export default withBundleAnalyzer(nextConfig);