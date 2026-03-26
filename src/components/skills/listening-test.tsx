"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { ListeningPaper } from "@/lib/papers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ExamTimer } from "@/components/exam-timer";

type Props = { paper: ListeningPaper };

export function ListeningTest({ paper }: Props) {
  const [answers, setAnswers] = useState<Record<string, number | undefined>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const qs = paper.questions;
  const answeredCount = qs.filter((q) => answers[q.id] !== undefined).length;
  const progressPct = qs.length ? Math.round((answeredCount / qs.length) * 100) : 0;

  const score = useMemo(() => {
    if (!submitted) return null;
    return qs.filter((q) => answers[q.id] === q.correctIndex).length;
  }, [submitted, qs, answers]);

  async function handleSubmit() {
    if (answeredCount < qs.length) {
      toast.error("Trả lời hết các câu trước khi nộp.");
      return;
    }
    setSubmitted(true);
    setSaving(true);
    const ok = qs.filter((q) => answers[q.id] === q.correctIndex).length;
    try {
      const res = await fetch("/api/skill-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paperId: paper.id,
          skill: "listening",
          score: ok,
          maxScore: qs.length,
          summary: `Listening: ${ok}/${qs.length}`,
        }),
      });
      if (!res.ok) throw new Error("save failed");
      toast.success("Đã lưu kết quả.");
    } catch {
      toast.error("Không lưu được kết quả.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">{paper.title}</h1>
          <Badge variant="secondary">Listening</Badge>
          {paper.timeMinutes ? <Badge variant="outline">{paper.timeMinutes} phút gợi ý</Badge> : null}
        </div>
        {paper.description ? (
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base">{paper.description}</p>
        ) : null}
      </div>

      <ExamTimer durationMinutes={paper.timeMinutes} paused={submitted} />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Audio</CardTitle>
          <CardDescription>Nghe và làm câu hỏi. Thay audioUrl trong papers.json bằng file đề của bạn.</CardDescription>
        </CardHeader>
        <CardContent>
          <audio className="w-full" controls src={paper.audioUrl} preload="metadata">
            Trình duyệt không hỗ trợ audio.
          </audio>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <div className="flex justify-between text-[0.6875rem] text-muted-foreground sm:text-xs">
          <span>
            Đã chọn: {answeredCount}/{qs.length}
          </span>
          <span>{progressPct}%</span>
        </div>
        <Progress value={progressPct} />
      </div>

      <div className="space-y-4">
        {qs.map((q) => (
          <Card key={q.id}>
            <CardHeader className="pb-3">
              <CardTitle className="text-[0.9375rem] font-medium leading-snug sm:text-sm">{q.prompt}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {q.options.map((opt, idx) => {
                const selected = answers[q.id] === idx;
                const show = submitted;
                const isCorrect = idx === q.correctIndex;
                let ring = "border-input";
                if (show) {
                  if (isCorrect) ring = "border-emerald-500 bg-emerald-500/10";
                  else if (selected) ring = "border-red-500/50 bg-red-500/10";
                } else if (selected) ring = "border-primary";
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={submitted}
                    onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: idx }))}
                    className={`w-full rounded-lg border px-3 py-2.5 text-left text-[0.9375rem] transition-colors sm:text-sm ${ring}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>

      {submitted && score !== null ? (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Kết quả</CardTitle>
            <CardDescription>
              {score} / {qs.length} câu đúng
            </CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      <div className="flex flex-wrap gap-3">
        {!submitted ? (
          <Button onClick={handleSubmit} disabled={saving}>
            Nộp bài
          </Button>
        ) : (
          <Button variant="outline" onClick={() => window.location.reload()}>
            Làm lại
          </Button>
        )}
      </div>
    </div>
  );
}
