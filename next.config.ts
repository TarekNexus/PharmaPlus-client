import type { NextConfig } from "next";

const nextConfig: NextConfig = {

 images: {
  domains: ['i.ibb.co', 'i.ibb.co.com'],
   remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        
      },
      {
            protocol: 'https',
        hostname: 'res.cloudinary.com',
      }
    ], // add if URLs really have .com
},async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
