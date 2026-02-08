import type { NextConfig } from "next";

const nextConfig: NextConfig = {

 images: {
  domains: ['i.ibb.co', 'i.ibb.co.com'],
   remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ], // add if URLs really have .com
}
};

export default nextConfig;
