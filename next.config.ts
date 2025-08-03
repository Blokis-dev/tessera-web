import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    externalDir: true, // Allows using external directories
  },
  // Disable server-side features not supported by Cloudflare Pages
  distDir: 'out',
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  // srcDir: 'src', // Uncomment if you are using a custom source directory
  // This is useful if you have your Next.js app in a 'src' folder
};

export default nextConfig;
