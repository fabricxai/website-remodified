import type { NextConfig } from "next";

/** After Innovation Fair 2026, set FAIR_OVER=1 and /fair permanently redirects to /demo. */
const fairOver = process.env.FAIR_OVER === '1';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  async redirects() {
    return fairOver ? [{ source: '/fair', destination: '/demo', permanent: true }] : [];
  },
};

export default nextConfig;
