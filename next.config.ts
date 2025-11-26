import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://devine-backend-889o.onrender.com',
    BACKEND_URL: process.env.BACKEND_URL || 'https://devine-backend-889o.onrender.com',
  },
};

export default nextConfig;
