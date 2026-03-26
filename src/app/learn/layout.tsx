import type { Metadata } from "next";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Flashcard từ vựng",
  description: `Học từ vựng tiếng Anh bằng thẻ lật trên ${siteName}.`,
};

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
