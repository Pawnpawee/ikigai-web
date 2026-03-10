import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  //? information: การกำหนด formats ช่วยลดขนาดรูปภาพอัตโนมัติ
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
    qualities: [85, 90, 100],
    formats: ["image/avif", "image/webp"],
  },

  //? information: React Strict Mode ช่วยดักจับ Bug ในช่วง Dev
  reactStrictMode: true,

  transpilePackages: ["howler", "framer-motion"],

  //* คอมเมนต์สีเขียวธรรมดา: เพิ่ม experimental config เพื่อช่วย Tree-shaking ไลบรารีหนักๆ
  experimental: {
    optimizePackageImports: ["react-icons", "framer-motion"],
  },

  webpack: (config) => {
    //? information: บังคับให้ Webpack เปลี่ยน import 'lottie-web' ทั้งหมดไปเป็นรุ่น Light
    config.resolve.alias = {
      ...config.resolve.alias,
      "lottie-web": "lottie-web/build/player/lottie_light",
    };

    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
