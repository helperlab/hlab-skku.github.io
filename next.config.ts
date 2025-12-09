import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/hlab-skku.github.io' : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
