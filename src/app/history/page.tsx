import Link from "next/link";
import { readSkillProgress } from "@/lib/skill-progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("vi-VN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default async function HistoryPage() {
  const { attempts } = await readSkillProgress();
  const sorted = [...attempts].sort((a, b) => b.completedAt.localeCompare(a.completedAt));

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="outline" className="text-xs">
          Tiến độ
        </Badge>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Lịch sử làm bài</h1>
        <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base">
          Các lượt nộp từ Reading, Listening, Writing, Speaking được lưu qua{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">POST /api/skill-progress</code> vào{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">src/data/skill-progress.json</code>.
        </p>
      </div>

      {sorted.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Chưa có lượt nào</CardTitle>
            <CardDescription>Làm một đề trong mục 4 kỹ năng để thấy lịch sử tại đây.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="secondary" size="sm">
              <Link href="/skills">Đi tới 4 kỹ năng</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-3">
          {sorted.map((a) => (
            <li key={a.id}>
              <Card className="transition-colors hover:border-primary/40">
                <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-3 space-y-0 pb-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="capitalize">
                        {a.skill}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{formatDate(a.completedAt)}</span>
                    </div>
                    <CardTitle className="text-[0.9375rem] font-medium sm:text-base">
                      Đề: <span className="font-mono text-[0.8125rem] sm:text-sm">{a.paperId}</span>
                    </CardTitle>
                    {a.summary ? <CardDescription>{a.summary}</CardDescription> : null}
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-center">
                    {typeof a.score === "number" && typeof a.maxScore === "number" ? (
                      <span className="text-[0.9375rem] font-semibold tabular-nums sm:text-sm">
                        {a.score}/{a.maxScore}
                      </span>
                    ) : null}
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/skills/${a.skill}/${a.paperId}`}>Mở lại đề</Link>
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
