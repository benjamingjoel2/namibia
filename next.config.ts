import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // One quality for every photo: full-bleed shots sit under dark overlays,
    // where 65 is indistinguishable from 75 and about a quarter smaller.
    qualities: [65],
    // Sources are 2000-2400px wide; no point offering 3840.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // Photos never change in place (a new photo gets a new file name), so
    // optimised copies can be cached for a month.
    minimumCacheTTL: 2678400,
  },
  async headers() {
    const immutable = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];
    return [
      { source: "/photos/:path*", headers: immutable },
      { source: "/images/:path*", headers: immutable },
    ];
  },
  poweredByHeader: false,
};

export default nextConfig;
