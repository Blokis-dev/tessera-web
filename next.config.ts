import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    externalDir: true, // Allows using external directories
  },
  // srcDir: 'src', // Uncomment if you are using a custom source directory
  // This is useful if you have your Next.js app in a 'src' folder
};

export default nextConfig;
