"use client";

import { useEffect, useMemo, useState } from "react";
import type { WordEntry } from "@/lib/words";

type Question = {
  word: WordEntry;
  options: string[];
  correctIndex: number;
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildQuestions(words: WordEntry[], count: number): Question[] {
  if (words.length < 4) return [];
  const picked = shuffle(words).slice(0, Math.min(count, words.length));
  return picked.map((w) => {
    const others = words.filter((x) => x.id !== w.id);
    const wrong = shuffle(others).slice(0, 3);
    const options = shuffle([w.meaningVi, ...wrong.map((o) => o.meaningVi)]);
    const correctIndex = options.indexOf(w.meaningVi);
    return { word: w, options, correctIndex };
  });
}

export default function PracticePage() {
  const [words, setWords] = useState<WordEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    fetch("/api/words")
      .then((r) => r.json())
      .then((d: { words: WordEntry[] }) => {
        const list = d.words ?? [];
        setWords(list);
        setQuestions(buildQuestions(list, 5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const q = questions[qIndex];
  const totalQ = questions.length;

  const submitRound = async (correct: number, total: number) => {
    await fetch("/api/progress", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quiz: { correct, total } }),
    });
  };

  const pick = (idx: number) => {
    if (selected !== null || !q) return;
    setSelected(idx);
    const ok = idx === q.correctIndex;
    setScore((prev) => {
      const nextScore = prev + (ok ? 1 : 0);
      if (qIndex + 1 >= totalQ) {
        setFinished(true);
        void submitRound(nextScore, totalQ);
      }
      return nextScore;
    });
  };

  const nextQuestion = () => {
    setSelected(null);
    setQIndex((i) => i + 1);
  };

  const restart = () => {
    setQuestions(buildQuestions(words, 5));
    setQIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  const progressLabel = useMemo(() => {
    if (!q || finished) return "";
    return `Câu ${qIndex + 1} / ${totalQ}`;
  }, [q, qIndex, totalQ, finished]);

  if (loading) return <p className="text-muted-foreground">Đang tải…</p>;

  if (words.length < 4) {
    return (
      <p className="text-muted-foreground">
        Cần ít nhất 4 từ trong words.json để tạo quiz trắc nghiệm.
      </p>
    );
  }

  if (finished) {
    return (
      <div className="space-y-6 rounded-2xl border border-border bg-card p-8 text-center">
        <p className="text-[0.8125rem] text-muted-foreground sm:text-sm">Kết quả</p>
        <p className="text-3xl font-bold tabular-nums text-foreground sm:text-4xl">
          {score} / {totalQ}
        </p>
        <button
          type="button"
          onClick={restart}
          className="rounded-lg bg-primary px-5 py-2.5 text-[0.9375rem] font-medium text-primary-foreground sm:text-sm"
        >
          Làm lại
        </button>
      </div>
    );
  }

  if (!q) {
    return (
      <button
        type="button"
        onClick={restart}
        className="rounded-lg bg-primary px-5 py-2.5 text-[0.9375rem] text-primary-foreground sm:text-sm"
      >
        Bắt đầu quiz
      </button>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-[0.8125rem] text-muted-foreground sm:text-sm">{progressLabel}</p>
      <div>
        <p className="text-[0.6875rem] uppercase tracking-wide text-muted-foreground sm:text-xs">Chọn nghĩa đúng</p>
        <p className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl md:text-3xl">{q.word.word}</p>
        <p className="font-mono text-[0.8125rem] text-primary sm:text-sm">{q.word.ipa}</p>
      </div>
      <ul className="space-y-2">
        {q.options.map((opt, idx) => {
          let cls =
            "w-full rounded-lg border border-border px-4 py-3 text-left text-[0.9375rem] transition hover:bg-accent/50 sm:text-base";
          if (selected !== null) {
            if (idx === q.correctIndex) cls += " border-emerald-500 bg-emerald-500/10";
            else if (idx === selected) cls += " border-red-500/60 bg-red-500/10";
          }
          return (
            <li key={idx}>
              <button
                type="button"
                disabled={selected !== null}
                onClick={() => pick(idx)}
                className={cls}
              >
                {opt}
              </button>
            </li>
          );
        })}
      </ul>
      {selected !== null && qIndex + 1 < totalQ && (
        <button
          type="button"
          onClick={nextQuestion}
          className="rounded-lg bg-secondary px-4 py-2 text-[0.9375rem] text-secondary-foreground sm:text-sm"
        >
          Câu tiếp
        </button>
      )}
    </div>
  );
}
