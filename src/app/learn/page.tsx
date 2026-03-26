"use client";

import { useCallback, useEffect, useState } from "react";
import type { WordEntry } from "@/lib/words";

export default function LearnPage() {
  const [words, setWords] = useState<WordEntry[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [knownCount, setKnownCount] = useState(0);

  useEffect(() => {
    fetch("/api/words")
      .then((r) => r.json())
      .then((d: { words: WordEntry[] }) => {
        setWords(d.words ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch("/api/progress")
      .then((r) => r.json())
      .then((p: { knownIds: string[] }) => setKnownCount(p.knownIds?.length ?? 0))
      .catch(() => {});
  }, []);

  const current = words[index];
  const total = words.length;

  const markKnown = useCallback(async () => {
    if (!current) return;
    const res = await fetch("/api/progress", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ markKnownId: current.id }),
    });
    if (res.ok) {
      const data = (await res.json()) as { knownIds: string[] };
      setKnownCount(data.knownIds?.length ?? 0);
    }
    setFlipped(false);
    setIndex((i) => (i + 1) % total);
  }, [current, total]);

  const next = useCallback(() => {
    setFlipped(false);
    setIndex((i) => (i + 1) % total);
  }, [total]);

  if (loading) {
    return <p className="text-muted-foreground">Đang tải…</p>;
  }

  if (!current || total === 0) {
    return (
      <p className="text-muted-foreground">
        Chưa có từ vựng. Thêm mục vào <code className="text-foreground">src/data/words.json</code>.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-[0.8125rem] text-muted-foreground sm:text-sm">
        <span>
          Thẻ {index + 1} / {total}
        </span>
        <span>Đã đánh dấu: {knownCount}</span>
      </div>

      <button
        type="button"
        onClick={() => setFlipped(!flipped)}
        className="relative w-full text-left"
        aria-label={flipped ? "Ẩn nghĩa" : "Xem nghĩa"}
      >
        <div
          className={`min-h-[220px] rounded-2xl border border-border bg-card p-8 transition-transform duration-300 ${
            flipped ? "ring-1 ring-primary/40" : ""
          }`}
        >
          {!flipped ? (
            <div className="space-y-3">
              <p className="text-[0.6875rem] uppercase tracking-wider text-muted-foreground sm:text-xs">Từ</p>
              <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">{current.word}</p>
              <p className="font-mono text-[0.8125rem] text-primary sm:text-sm">{current.ipa}</p>
              <p className="pt-4 text-[0.8125rem] text-muted-foreground sm:text-sm">Nhấn thẻ để xem nghĩa & ví dụ</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-[0.6875rem] uppercase tracking-wider text-muted-foreground sm:text-xs">Nghĩa</p>
              <p className="text-base font-medium leading-snug text-foreground sm:text-lg sm:leading-relaxed">{current.meaningVi}</p>
              <p className="border-l-2 border-primary pl-3 text-[0.8125rem] italic leading-relaxed text-muted-foreground sm:text-sm">
                {current.example}
              </p>
              <p className="text-[0.6875rem] text-muted-foreground sm:text-xs">Chủ đề: {current.topic}</p>
            </div>
          )}
        </div>
      </button>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={next}
          className="rounded-lg border border-border px-4 py-2 text-[0.9375rem] text-foreground hover:bg-accent/50 sm:text-sm"
        >
          Bỏ qua / Tiếp
        </button>
        <button
          type="button"
          onClick={markKnown}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-[0.9375rem] font-medium text-white hover:bg-emerald-500 sm:text-sm"
        >
          Đã thuộc
        </button>
      </div>
    </div>
  );
}
