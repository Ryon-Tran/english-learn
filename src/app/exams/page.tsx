import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  CirclePlay,
  GraduationCap,
  Headphones,
} from "lucide-react";
import { EXAM_TRACKS } from "@/lib/exams";
import { siteName } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Chọn đề luyện",
  description: `Chọn TOEIC, Cambridge, IELTS… rồi vào luyện đề — ${siteName}.`,
};

const examIcons = {
  toeic: Headphones,
  b1: BookOpen,
  cambridge: GraduationCap,
  ielts: BookOpen,
} as const;

export default function ExamsHubPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 text-primary">
          <GraduationCap className="h-6 w-6 shrink-0" aria-hidden />
          <span className="text-2xl font-bold">Luyện theo đề</span>
        </div>
      </header>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {EXAM_TRACKS.map((t) => {
          const Icon = examIcons[t.slug];
          return (
            <li key={t.slug} className="flex h-full min-h-0">
              <Link
                href={`/exams/${t.slug}`}
                aria-label={`Vào luyện đề ${t.label}`}
                className="group flex w-full min-h-0 flex-col outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
              >
                <article className="flex h-full w-full min-h-[280px] flex-col overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm transition-all duration-200 hover:border-primary/35 hover:shadow-md sm:min-h-[300px]">
                  <div
                    className={cn(
                      "relative aspect-[2/1] w-full shrink-0 bg-gradient-to-br sm:aspect-[16/9]",
                      t.cardGradient,
                    )}
                  >
                    <Badge
                      className="absolute left-2 top-2 border-0 bg-background/95 px-2 py-0.5 text-xs font-semibold text-foreground shadow-sm"
                      variant="secondary"
                    >
                      {t.badge}
                    </Badge>
                    <div className="flex h-full items-center justify-center pb-6 pt-10">
                      <Icon
                        className="h-10 w-10 text-foreground/20 transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11"
                        strokeWidth={1.25}
                        aria-hidden
                      />
                    </div>
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col gap-2 p-3 sm:p-3.5">
                    <h2 className="line-clamp-2 text-sm font-bold leading-snug text-foreground sm:text-[0.9375rem]">
                      {t.cardTitle}
                    </h2>
                    <ul className="flex-1 list-inside list-disc space-y-1 text-[0.6875rem] leading-relaxed text-muted-foreground sm:text-xs">
                      {t.bullets.map((line, idx) => (
                        <li key={idx} className="line-clamp-2">
                          {line}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex h-9 w-full shrink-0 items-center justify-center gap-1.5 rounded-lg border border-primary/35 bg-background text-xs font-semibold text-primary shadow-sm transition-colors group-hover:bg-primary/5 sm:h-10 sm:text-[0.8125rem]">
                      <CirclePlay className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                      Vào luyện đề
                    </div>
                  </div>
                </article>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
