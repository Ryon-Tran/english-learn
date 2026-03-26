import type { Metadata } from "next";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lịch sử làm bài",
  description: `Xem các lượt làm Reading, Listening, Writing, Speaking đã lưu trên ${siteName}.`,
};

export default function HistoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
