/**
 * Set BUILD_TARGET=static to produce a fully static site in `out/`
 * (for Hostinger or any static host). Leave it unset for Vercel/Node,
 * which keeps Next.js image optimization enabled.
 */
const isStaticExport = process.env.BUILD_TARGET === "static";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(isStaticExport ? { output: "export" } : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    // Static export has no image optimization server.
    unoptimized: isStaticExport,
  },
};

export default nextConfig;
