import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAllPapers, getPaper, isSkill } from "@/lib/papers";
import { Button } from "@/components/ui/button";
import { ListeningTest } from "@/components/skills/listening-test";
import { ReadingTest } from "@/components/skills/reading-test";
import { SpeakingForm } from "@/components/skills/speaking-form";
import { WritingForm } from "@/components/skills/writing-form";
import { siteName } from "@/lib/site";

type PageProps = { params: Promise<{ skill: string; paperId: string }> };

export function generateStaticParams() {
  return getAllPapers().map((p) => ({
    skill: p.skill,
    paperId: p.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { skill, paperId } = await params;
  if (!isSkill(skill)) return { title: "Đề bài" };
  const paper = getPaper(skill, paperId);
  if (!paper) return { title: "Đề bài" };
  return {
    title: paper.title,
    description: paper.description ?? `Làm bài ${skill} trên ${siteName}.`,
  };
}

export default async function PaperPage({ params }: PageProps) {
  const { skill, paperId } = await params;
  if (!isSkill(skill)) notFound();
  const paper = getPaper(skill, paperId);
  if (!paper) notFound();

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        asChild
        className="-ml-2 h-auto min-h-11 w-fit gap-2.5 px-2 py-2 text-base font-medium sm:text-lg"
      >
        <Link href={`/skills/${skill}`}>
          <ArrowLeft className="h-5 w-5 shrink-0" aria-hidden />
          Danh sách đề
        </Link>
      </Button>
      {paper.skill === "reading" ? (
        <ReadingTest paper={paper} />
      ) : paper.skill === "listening" ? (
        <ListeningTest paper={paper} />
      ) : paper.skill === "writing" ? (
        <WritingForm paper={paper} />
      ) : (
        <SpeakingForm paper={paper} />
      )}
    </div>
  );
}
