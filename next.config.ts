import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The scraper runs in the Node runtime — it touches node:fs and undici.
  serverExternalPackages: ["rehype-parse", "unified", "neotraverse"],
};

export default nextConfig;
