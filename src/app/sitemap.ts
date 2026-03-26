import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

/** Các URL tĩnh chính; bổ sung route động khi có DB / slug. */
const paths = [
  "/",
  "/skills",
  "/skills/reading",
  "/skills/listening",
  "/skills/writing",
  "/skills/speaking",
  "/learn",
  "/practice",
  "/history",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();
  return paths.map((path) => ({
    url: path === "/" ? base : `${base}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
