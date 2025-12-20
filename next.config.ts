import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    qualities: [85, 90, 100],
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
};

export default withBundleAnalyzer(nextConfig);
