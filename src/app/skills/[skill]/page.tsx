import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { getPapersBySkill, isSkill } from "@/lib/papers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { siteName } from "@/lib/site";

type PageProps = { params: Promise<{ skill: string }> };

const skillLabels: Record<string, string> = {
  reading: "Reading",
  listening: "Listening",
  writing: "Writing",
  speaking: "Speaking",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { skill } = await params;
  if (!isSkill(skill)) return { title: "Kỹ năng" };
  const label = skillLabels[skill] ?? skill;
  return {
    title: `${label} — danh sách đề`,
    description: `Chọn đề ${label} và luyện tập trên ${siteName}.`,
  };
}

export default async function SkillListPage({ params }: PageProps) {  const { skill } = await params;
  if (!isSkill(skill)) notFound();

  const papers = getPapersBySkill(skill);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="ghost"
          asChild
          className="-ml-2 h-auto min-h-11 gap-2.5 px-2 py-2 text-base font-medium sm:text-lg"
        >
          <Link href="/skills">
            <ArrowLeft className="h-5 w-5 shrink-0" aria-hidden />
            Hub
          </Link>
        </Button>
        <Badge variant="secondary" className="capitalize">
          {skill}
        </Badge>
      </div>
      <div>
        <h1 className="text-2xl font-bold capitalize tracking-tight sm:text-3xl">{skill}</h1>
        <p className="mt-1 text-[0.9375rem] text-muted-foreground sm:text-base">Chọn một đề để bắt đầu.</p>
      </div>
      {papers.length === 0 ? (
        <p className="text-[0.9375rem] text-muted-foreground sm:text-base">Chưa có đề. Thêm vào papers.json.</p>
      ) : (
        <ul className="space-y-3">
          {papers.map((p) => (
            <li key={p.id}>
              <Link href={`/skills/${skill}/${p.id}`}>
                <Card className="transition-colors hover:border-primary/40">
                  <CardHeader className="flex flex-row items-start justify-between gap-4">
                    <div className="space-y-1">
                      <CardTitle className="text-base">{p.title}</CardTitle>
                      {p.description ? <CardDescription>{p.description}</CardDescription> : null}
                    </div>
                    {"timeMinutes" in p && p.timeMinutes ? (
                      <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {p.timeMinutes}′
                      </span>
                    ) : null}
                  </CardHeader>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
