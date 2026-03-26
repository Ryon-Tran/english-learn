import type { Metadata } from "next";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "4 kỹ năng tiếng Anh",
  description: `Luyện Reading, Listening, Writing, Speaking — đề Cambridge (B1…), TOEIC, TOEFL, IELTS hoặc đề bạn tự thêm; chọn đề và làm bài trên ${siteName}.`,
};

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
