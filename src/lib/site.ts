/**
 * Dùng cho SEO / metadataBase.
 * GitHub Pages (workflow): NEXT_PUBLIC_SITE_URL = https://<user>.github.io hoặc …/io/<repo>
 */
export const siteName = "English Learn";

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  return "http://localhost:3000";
}
