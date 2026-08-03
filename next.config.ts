import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Add remote domains here if you later serve images from a CMS or CDN
    remotePatterns: [],
  },
};

export default nextConfig;
