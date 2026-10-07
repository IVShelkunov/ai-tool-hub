import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.ufs.sh',
        port: '',
        pathname: '/**',
      }
    ]
  }
};

export default nextConfig;
