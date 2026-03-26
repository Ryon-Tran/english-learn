"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BookOpen,
  CirclePlay,
  Headphones,
  Mic,
  Pencil,
  Search,
} from "lucide-react";
import type { ExamSlug } from "@/lib/exams";
import type { Paper, Skill } from "@/lib/papers";
import { SKILLS } from "@/lib/papers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const SKILL_META: Record<
  Skill,
  { label: string; labelVi: string; icon: typeof BookOpen; cardGradient: string }
> = {
  reading: {
    label: "Reading",
    labelVi: "Đọc",
    icon: BookOpen,
    cardGradient: "from-sky-400/25 via-sky-500/15 to-blue-600/20",
  },
  listening: {
    label: "Listening",
    labelVi: "Nghe",
    icon: Headphones,
    cardGradient: "from-emerald-400/25 via-teal-500/15 to-emerald-700/20",
  },
  writing: {
    label: "Writing",
    labelVi: "Viết",
    icon: Pencil,
    cardGradient: "from-amber-400/25 via-orange-400/15 to-amber-700/20",
  },
  speaking: {
    label: "Speaking",
    labelVi: "Nói",
    icon: Mic,
    cardGradient: "from-violet-400/25 via-purple-500/15 to-violet-800/20",
  },
};

const QUESTION_TYPES = [
  "Multiple Choice (Single)",
  "Multiple Choice (Multiple)",
  "Short Answer",
  "Matching",
  "True/False/Not Given",
] as const;

type Mode = "le" | "full";

function paperBadge(p: Paper): string {
  if (p.skill === "reading") {
    const n = p.passages?.length ?? 0;
    if (n > 1) return `PASSAGE 1–${n}`;
    if (n === 1) return "PASSAGE 1";
    return "READING";
  }
  if (p.skill === "listening") return "LISTENING";
  if (p.skill === "writing") return "WRITING";
  return "SPEAKING";
}

function descriptionLines(p: Paper): string[] {
  const raw = p.description?.trim();
  if (!raw) return ["Đề mẫu — cập nhật mô tả trong papers.json."];
  const parts = raw
    .split(/[.;\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length ? parts.slice(0, 4) : [raw];
}

type Props = {
  examSlug: ExamSlug;
  examLabel: string;
  papers: Paper[];
};

export function ExamCatalog({ examSlug, examLabel, papers }: Props) {
  const [skill, setSkill] = useState<Skill>("reading");
  const [mode, setMode] = useState<Mode>("le");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"newest" | "title">("newest");
  const [qTypes, setQTypes] = useState<Record<string, boolean>>(
    () => Object.fromEntries(QUESTION_TYPES.map((t) => [t, true])) as Record<string, boolean>,
  );

  const filtered = useMemo(() => {
    let list = papers.filter((p) => p.skill === skill);
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.description?.toLowerCase().includes(q) ?? false),
      );
    }
    if (sort === "title") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title, "vi"));
    }
    return list;
  }, [papers, skill, search, sort]);

  const hrefForPaper = (p: Paper) =>
    `/skills/${p.skill}/${p.id}?exam=${examSlug}${mode === "full" ? "&mode=full" : ""}`;

  return (
    <div className="space-y-8">
      {/* Thanh công cụ — căn lưới 12 cột trên desktop */}
      <div className="grid gap-6 border-b border-border/60 pb-6 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="relative w-full max-w-full sm:max-w-[16rem] lg:col-span-3">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            placeholder="Tìm kiếm bài tập"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-xl border-border bg-background pl-10 pr-3 text-sm shadow-sm"
            aria-label="Tìm kiếm bài tập"
          />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:col-span-9">
          <div className="min-w-0 flex-1 space-y-1">
            <h1 className="text-balance text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {examLabel}
              <span className="font-semibold text-muted-foreground"> — Luyện đề</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Chọn kỹ năng bên trái — danh sách đề cập nhật bên phải.
            </p>
          </div>
          <label className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground">
            <span className="whitespace-nowrap">Sắp xếp</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "newest" | "title")}
              className="h-10 min-w-[10rem] rounded-xl border border-input bg-background px-3 text-sm font-medium text-foreground shadow-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="newest">Mới nhất</option>
              <option value="title">Tên A → Z</option>
            </select>
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
        {/* Sidebar cố định rộng — các nút kỹ năng đồng nhất */}
        <aside
          className="w-full shrink-0 space-y-4 lg:w-[17.5rem] lg:min-w-[17.5rem]"
          aria-label="Lọc kỹ năng"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Kỹ năng
          </p>
          <div className="grid grid-cols-1 gap-2">
            {SKILLS.map((s) => {
              const m = SKILL_META[s];
              const Icon = m.icon;
              const active = skill === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSkill(s)}
                  className={cn(
                    "flex h-14 w-full items-center gap-3 rounded-xl border px-3 text-left text-sm font-semibold transition-all",
                    "border-border bg-card shadow-sm hover:bg-muted/50",
                    active && "border-primary bg-primary/5 ring-2 ring-primary/25",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-primary",
                      active && "bg-primary/15",
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-foreground">{m.label}</span>
                    <span className="text-xs font-normal text-muted-foreground">{m.labelVi}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="rounded-xl border border-border bg-muted/25 p-4 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Hình thức đề
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="paper-mode"
                  checked={mode === "le"}
                  onChange={() => setMode("le")}
                  className="h-4 w-4 accent-primary"
                />
                Bài lẻ
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="paper-mode"
                  checked={mode === "full"}
                  onChange={() => setMode("full")}
                  className="h-4 w-4 accent-primary"
                />
                Full đề
              </label>
            </div>
            {skill === "reading" ? (
              <div className="mt-4 border-t border-border/60 pt-4">
                <p className="mb-2 text-xs font-medium text-foreground">Passage (gợi ý)</p>
                <div className="flex flex-wrap gap-2">
                  {["Passage 1", "Passage 2", "Passage 3"].map((p) => (
                    <span
                      key={p}
                      className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="rounded-xl border border-border bg-muted/25 p-4 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Loại câu hỏi
            </p>
            <ul className="space-y-2.5">
              {QUESTION_TYPES.map((t) => (
                <li key={t}>
                  <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-snug text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={qTypes[t] ?? true}
                      onChange={() => setQTypes((prev) => ({ ...prev, [t]: !prev[t] }))}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-input accent-primary"
                    />
                    <span>{t}</span>
                  </label>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Bộ lọc mẫu — có thể nối với dữ liệu đề sau.
            </p>
          </div>
        </aside>

        {/* Lưới đề — cùng chiều cao từng hàng */}
        <section className="min-w-0 flex-1" aria-label="Danh sách đề">
          {filtered.length === 0 ? (
            <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-12 text-center text-muted-foreground">
              Không có đề nào khớp. Thử đổi từ khóa hoặc kỹ năng khác.
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
              {filtered.map((p) => {
                const meta = SKILL_META[p.skill];
                const Icon = meta.icon;
                return (
                  <li key={p.id} className="flex h-full min-h-0">
                    <article className="flex w-full min-h-[420px] flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-shadow hover:shadow-md sm:min-h-[440px]">
                      <div
                        className={cn(
                          "relative aspect-[16/10] w-full shrink-0 bg-gradient-to-br",
                          meta.cardGradient,
                        )}
                      >
                        <Badge
                          className="absolute left-3 top-3 border-0 bg-background/95 font-semibold text-foreground shadow-sm"
                          variant="secondary"
                        >
                          {paperBadge(p)}
                        </Badge>
                        <div className="flex h-full items-center justify-center pb-8 pt-12">
                          <Icon className="h-14 w-14 text-foreground/20" strokeWidth={1.25} aria-hidden />
                        </div>
                      </div>
                      <div className="flex min-h-0 flex-1 flex-col gap-3 p-4 sm:p-5">
                        <h2 className="line-clamp-2 min-h-[2.75rem] text-base font-bold leading-snug text-foreground">
                          {p.title}
                        </h2>
                        <ul className="min-h-[5.5rem] flex-1 list-inside list-disc space-y-1.5 text-[0.8125rem] leading-relaxed text-muted-foreground">
                          {descriptionLines(p).map((line, idx) => (
                            <li key={`${p.id}-${idx}`} className="line-clamp-2">
                              {line}
                            </li>
                          ))}
                        </ul>
                        <Button
                          asChild
                          variant="outline"
                          className="mt-auto h-11 w-full shrink-0 rounded-xl border-primary/35 bg-background font-semibold text-primary hover:bg-primary/5"
                        >
                          <Link href={hrefForPaper(p)} className="gap-2">
                            <CirclePlay className="h-4 w-4" aria-hidden />
                            Làm bài
                          </Link>
                        </Button>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
