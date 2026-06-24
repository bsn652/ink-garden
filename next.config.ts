import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ink-garden",
  assetPrefix: "/ink-garden",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
