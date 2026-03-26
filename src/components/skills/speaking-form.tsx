"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import type { SpeakingPaper } from "@/lib/papers";
import { ExamTimer } from "@/components/exam-timer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = { paper: SpeakingPaper };

const schema = z.object({
  notes: z.string().min(1, "Ghi chú outline hoặc transcript ngắn."),
  audioLabel: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function SpeakingForm({ paper }: Props) {
  const [sessionDone, setSessionDone] = useState(false);
  const suggestedMinutes =
    (paper.preparationMinutes ?? 0) + (paper.responseMinutes ?? 0) > 0
      ? (paper.preparationMinutes ?? 0) + (paper.responseMinutes ?? 0)
      : undefined;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { notes: "", audioLabel: "" },
  });

  const audioLabel = form.watch("audioLabel");

  async function onSubmit(values: FormValues) {
    try {
      const res = await fetch("/api/skill-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paperId: paper.id,
          skill: "speaking",
          summary: `Speaking: ${paper.title} — ${values.notes.slice(0, 400)}${values.audioLabel ? ` [file: ${values.audioLabel}]` : ""}`,
        }),
      });
      if (!res.ok) throw new Error("save failed");
      toast.success("Đã lưu phiên luyện.");
      setSessionDone(true);
      form.reset();
    } catch {
      toast.error("Không lưu được.");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">{paper.title}</h1>
          <Badge variant="secondary">Speaking</Badge>
        </div>
        {paper.description ? (
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base">{paper.description}</p>
        ) : null}
        {(paper.preparationMinutes || paper.responseMinutes) && (
          <p className="mt-2 text-xs text-muted-foreground">
            Gợi ý thời gian: chuẩn bị {paper.preparationMinutes ?? "—"} phút · nói{" "}
            {paper.responseMinutes ?? "—"} phút
          </p>
        )}
      </div>

      <ExamTimer durationMinutes={suggestedMinutes} paused={sessionDone} />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Cue card</CardTitle>
          <CardDescription className="whitespace-pre-wrap leading-relaxed">{paper.cueCard}</CardDescription>
        </CardHeader>
      </Card>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="notes">Ghi chú / outline / transcript</Label>
          <Textarea id="notes" rows={8} placeholder="Viết ý chính hoặc transcript sau khi luyện…" {...form.register("notes")} />
          {form.formState.errors.notes ? (
            <p className="text-sm text-destructive">{form.formState.errors.notes.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="file">File ghi âm (chỉ trên máy bạn)</Label>
          <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">
            MVP không upload file lên server — chỉ lưu <strong>tên file</strong> kèm ghi chú khi bạn nộp.
          </p>
          <Input
            id="file"
            type="file"
            accept="audio/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              form.setValue("audioLabel", f?.name ?? "");
            }}
          />
          {audioLabel ? (
            <p className="text-sm text-foreground">
              Đã chọn: <span className="font-mono text-xs">{audioLabel}</span>
            </p>
          ) : null}
        </div>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Lưu phiên luyện
        </Button>
      </form>
    </div>
  );
}
