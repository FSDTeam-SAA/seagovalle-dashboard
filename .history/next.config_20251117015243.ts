import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  image:{
     remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        port: '',
        pathname: '/account123/**',
      },
    ],
  }
};

export default nextConfig;
