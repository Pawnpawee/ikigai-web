import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  //? information: การกำหนด formats ช่วยลดขนาดรูปภาพอัตโนมัติ
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    qualities: [85, 90, 100],
    formats: ["image/avif", "image/webp"],
  },

  //? information: React Strict Mode ช่วยดักจับ Bug ในช่วง Dev
  reactStrictMode: true,

  //* คอมเมนต์สีเขียวธรรมดา: เพิ่ม experimental config เพื่อช่วย Tree-shaking ไลบรารีหนักๆ
  experimental: {
    optimizePackageImports: [
      "react-icons",
      "lottie-react",
      "react-howler",
      "framer-motion",
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
