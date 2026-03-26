import type { Metadata } from "next";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Quiz từ vựng",
  description: `Trắc nghiệm nghĩa tiếng Việt — ôn từ nhanh trên ${siteName}.`,
};

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
