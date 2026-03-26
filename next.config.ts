import type { NextConfig } from "next";

/**
 * Static export cho GitHub Pages.
 * - Đặt NEXT_PUBLIC_BASE_PATH=/tên-repo (project site) hoặc để trống (user site username.github.io).
 * - API routes không có trong bản export — workflow CI tạm đổi tên thư mục api trước khi build.
 */
const raw = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath =
  raw === "" || raw === "/"
    ? undefined
    : (raw.startsWith("/") ? raw : `/${raw}`).replace(/\/$/, "") || undefined;

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
