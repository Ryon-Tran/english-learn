"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import type { WritingPaper } from "@/lib/papers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Props = { paper: WritingPaper };

function wordCount(text: string) {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function WritingForm({ paper }: Props) {
  const min = paper.minWords ?? 250;

  const schema = z.object({
    essay: z
      .string()
      .min(1, "Nhập bài viết.")
      .refine((s) => wordCount(s) >= min, { message: `Tối thiểu ${min} từ.` }),
  });

  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { essay: "" },
  });

  const wc = wordCount(form.watch("essay") ?? "");
  const wordProgress = min > 0 ? Math.min(100, Math.round((wc / min) * 100)) : 0;

  async function onSubmit(values: FormValues) {
    try {
      const res = await fetch("/api/skill-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paperId: paper.id,
          skill: "writing",
          summary: `Writing: ${wordCount(values.essay)} từ — ${paper.title}`,
        }),
      });
      if (!res.ok) throw new Error("save failed");
      toast.success("Đã lưu bài (server).");
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
          <Badge variant="secondary">Writing</Badge>
        </div>
        {paper.description ? (
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base">{paper.description}</p>
        ) : null}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Đề bài</CardTitle>
          <CardDescription className="whitespace-pre-wrap leading-relaxed">{paper.taskPrompt}</CardDescription>
        </CardHeader>
      </Card>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <Label htmlFor="essay">Bài làm</Label>
            <span
              className={cn(
                "tabular-nums text-sm font-semibold sm:text-base",
                wc >= min ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground",
              )}
            >
              {wc} / {min}+ từ
            </span>
          </div>
          <Progress value={wordProgress} className="h-2" aria-label="Tiến độ số từ tối thiểu" />
          <Textarea
            id="essay"
            rows={16}
            placeholder="Viết bài của bạn tại đây…"
            className="resize-y"
            {...form.register("essay")}
          />
          {form.formState.errors.essay ? (
            <p className="text-sm text-destructive">{form.formState.errors.essay.message}</p>
          ) : null}
        </div>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Nộp bài
        </Button>
      </form>
    </div>
  );
}
