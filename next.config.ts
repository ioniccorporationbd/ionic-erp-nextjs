import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/loan-management-ionic-erp",
        destination: "/lone-management-ionic-erp",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
