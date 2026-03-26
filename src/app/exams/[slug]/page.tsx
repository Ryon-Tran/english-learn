import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ExamCatalog } from "@/app/exams/[slug]/exam-catalog";
import { Button } from "@/components/ui/button";
import { getExamTrack, isExamSlug } from "@/lib/exams";
import { getAllPapers } from "@/lib/papers";
import { siteName } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isExamSlug(slug)) return { title: "Đề luyện" };
  const t = getExamTrack(slug)!;
  return {
    title: `${t.label} — luyện đề`,
    description: `Chọn kỹ năng và đề — ${t.label} trên ${siteName}.`,
  };
}

export default async function ExamCatalogPage({ params }: PageProps) {
  const { slug } = await params;
  if (!isExamSlug(slug)) notFound();
  const track = getExamTrack(slug)!;
  const papers = getAllPapers();

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <Button
        variant="ghost"
        asChild
        className="-ml-2 h-auto min-h-11 gap-2.5 px-2 py-2 text-base font-medium sm:text-lg"
      >
        <Link href="/exams">
          <ArrowLeft className="h-5 w-5 shrink-0" aria-hidden />
          Chọn chứng chỉ khác
        </Link>
      </Button>
      <ExamCatalog examSlug={slug} examLabel={track.label} papers={papers} />
    </div>
  );
}
