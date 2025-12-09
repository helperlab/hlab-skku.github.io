import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const basePath = process.env.GITHUB_REPOSITORY 
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}` 
  : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd && basePath ? basePath : '',
  assetPrefix: isProd && basePath ? basePath : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
