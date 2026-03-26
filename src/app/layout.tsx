import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/app/providers";
import { SiteHeader } from "@/components/site-header";
import { getSiteUrl, siteName } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "vietnamese"], variable: "--font-sans" });

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Học tiếng Anh: 4 kỹ năng & từ vựng`,
    template: `%s | ${siteName}`,
  },
  description:
    "Học tiếng Anh trực tuyến: Reading, Listening, Writing, Speaking — phù hợp ôn Cambridge (B1 Preliminary, v.v.), TOEIC, TOEFL, IELTS hoặc đề tự thêm. Flashcard và quiz từ vựng, lưu lịch sử làm bài. Giao diện rõ ràng, học mọi lúc trên trình duyệt.",
  applicationName: siteName,
  authors: [{ name: siteName }],
  creator: siteName,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName,
  },
  twitter: { card: "summary_large_image" },
  category: "education",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.className} min-h-screen font-sans antialiased`}>
        <Providers>
          <SiteHeader />
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
