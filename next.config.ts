import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/hlab-skku.github.io',
  assetPrefix: '/hlab-skku.github.io',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
