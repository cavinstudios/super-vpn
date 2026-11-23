import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: process.env.GITHUB_PAGES === "true" ? "/super-vpn" : undefined,
  assetPrefix: process.env.GITHUB_PAGES === "true" ? "/super-vpn/" : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
