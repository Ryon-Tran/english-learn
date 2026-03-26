"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { ReadingPaper } from "@/lib/papers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExamTimer } from "@/components/exam-timer";

type Props = { paper: ReadingPaper };

export function ReadingTest({ paper }: Props) {
  const flat = useMemo(
    () =>
      paper.passages.flatMap((p) =>
        p.questions.map((q) => ({ passageId: p.id, passageTitle: p.title, passageText: p.text, ...q })),
      ),
    [paper.passages],
  );

  const [answers, setAnswers] = useState<Record<string, number | undefined>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const answeredCount = flat.filter((q) => answers[q.id] !== undefined).length;
  const progressPct = flat.length ? Math.round((answeredCount / flat.length) * 100) : 0;

  const score = useMemo(() => {
    if (!submitted) return null;
    let ok = 0;
    for (const q of flat) {
      if (answers[q.id] === q.correctIndex) ok += 1;
    }
    return ok;
  }, [submitted, flat, answers]);

  async function handleSubmit() {
    if (answeredCount < flat.length) {
      toast.error("Làm hết các câu trước khi nộp.");
      return;
    }
    setSubmitted(true);
    setSaving(true);
    const ok = flat.filter((q) => answers[q.id] === q.correctIndex).length;
    try {
      const res = await fetch("/api/skill-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paperId: paper.id,
          skill: "reading",
          score: ok,
          maxScore: flat.length,
          summary: `Reading: ${ok}/${flat.length}`,
        }),
      });
      if (!res.ok) throw new Error("save failed");
      toast.success("Đã lưu kết quả.");
    } catch {
      toast.error("Không lưu được kết quả (thử lại).");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">{paper.title}</h1>
          <Badge variant="secondary">Reading</Badge>
          {paper.timeMinutes ? (
            <Badge variant="outline">{paper.timeMinutes} phút gợi ý</Badge>
          ) : null}
        </div>
        {paper.description ? (
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base">{paper.description}</p>
        ) : null}
      </div>

      <ExamTimer durationMinutes={paper.timeMinutes} paused={submitted} />

      <div className="space-y-2">
        <div className="flex justify-between text-[0.6875rem] text-muted-foreground sm:text-xs">
          <span>
            Đã chọn: {answeredCount}/{flat.length}
          </span>
          <span>{progressPct}%</span>
        </div>
        <Progress value={progressPct} />
      </div>

      <Tabs defaultValue={paper.passages[0]?.id ?? "p1"}>
        <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
          {paper.passages.map((p) => (
            <TabsTrigger key={p.id} value={p.id} className="text-xs sm:text-sm">
              {p.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {paper.passages.map((p) => (
          <TabsContent key={p.id} value={p.id} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{p.title}</CardTitle>
                <CardDescription>Đọc passage và trả lời câu hỏi bên dưới.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-w-none text-[0.9375rem] leading-[1.65] text-foreground/90 whitespace-pre-wrap sm:text-base sm:leading-relaxed">
                  {p.text}
                </div>
              </CardContent>
            </Card>
            <div className="space-y-4">
              {p.questions.map((q) => (
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
          </TabsContent>
        ))}
      </Tabs>

      {submitted && score !== null ? (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Kết quả</CardTitle>
            <CardDescription>
              {score} / {flat.length} câu đúng
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
