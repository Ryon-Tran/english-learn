import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Headphones, Mic, Pencil } from "lucide-react";
import { getExamTrack, isExamSlug } from "@/lib/exams";
import { siteName } from "@/lib/site";
import { SKILLS } from "@/lib/papers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const meta: Record<
  (typeof SKILLS)[number],
  { title: string; desc: string; icon: typeof BookOpen; href: string }
> = {
  reading: {
    title: "Reading",
    desc: "Passage + câu hỏi; điểm và lịch sử qua API.",
    icon: BookOpen,
    href: "/skills/reading",
  },
  listening: {
    title: "Listening",
    desc: "Audio + trắc nghiệm; thay audioUrl trong papers.json.",
    icon: Headphones,
    href: "/skills/listening",
  },
  writing: {
    title: "Writing",
    desc: "Đề Task + editor; validate tối thiểu từ (RHF + Zod).",
    icon: Pencil,
    href: "/skills/writing",
  },
  speaking: {
    title: "Speaking",
    desc: "Cue card + ghi chú / nhãn file ghi âm (mở rộng upload sau).",
    icon: Mic,
    href: "/skills/speaking",
  },
};

type PageProps = { searchParams: Promise<{ exam?: string }> };

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { exam } = await searchParams;
  const label = exam && isExamSlug(exam) ? getExamTrack(exam)!.label : null;
  return {
    title: label ? `${label} — 4 kỹ năng` : "Hub — luyện theo kỹ năng",
    description: `Chọn Reading, Listening, Writing hoặc Speaking — ${siteName}.`,
  };
}

export default async function SkillsHubPage({ searchParams }: PageProps) {
  const { exam } = await searchParams;
  const track = exam && isExamSlug(exam) ? getExamTrack(exam) : null;
  const examQs = track ? `?exam=${track.slug}` : "";

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="outline" className="text-xs">
          {track ? track.label : "TOEIC · B1 · Cambridge · IELTS"}
        </Badge>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Luyện theo kỹ năng</h1>
        {track ? (
          <div className="space-y-2">
            <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base">
              {track.short}
            </p>
            <p>
              <Link
                href={`/exams/${track.slug}`}
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Mở giao diện lọc đề (sidebar + danh sách)
              </Link>
            </p>
          </div>
        ) : null}
        <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base">
          Đề mẫu nằm trong <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">src/data/papers.json</code>.
          Thay bằng đề của bạn — cùng cấu trúc JSON.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {SKILLS.map((s) => {
          const m = meta[s];
          const Icon = m.icon;
          return (
            <Card key={s} className="transition-colors hover:border-primary/40">
              <CardHeader className="flex flex-row items-start gap-3 space-y-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-base sm:text-lg">{m.title}</CardTitle>
                  <CardDescription>{m.desc}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild variant="secondary" size="sm">
                  <Link href={`${m.href}${examQs}`}>Chọn đề</Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
