import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    turbo: {
      // Silence workspace root warning in dev
      root: "./",
    },
  },
};

export default nextConfig;
