import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  GraduationCap,
  Headphones,
  History,
  Layers,
  Mic,
  Pencil,
} from "lucide-react";
import { MascotOctopusMark } from "@/components/mascot/mascot-octopus";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getSiteUrl, siteName } from "@/lib/site";
import { mascot } from "@/lib/mascot";

const homeDescription =
  "Học tiếng Anh trực tuyến miễn phí trên trình duyệt: Reading, Listening, Writing, Speaking. Có thể ôn theo dạng đề Cambridge (ví dụ B1 Preliminary), TOEIC, TOEFL, IELTS hoặc đề bạn tự thêm — flashcard, quiz, lịch sử làm bài và tiến độ học.";

export const metadata: Metadata = {
  title: "Học tiếng Anh — 4 kỹ năng & từ vựng (Cambridge, TOEIC, TOEFL…)",
  description: homeDescription,
  keywords: [
    "học tiếng Anh",
    "Cambridge English",
    "B1 Preliminary",
    "PET Cambridge",
    "TOEIC",
    "TOEFL",
    "IELTS",
    "luyện reading",
    "luyện listening",
    "writing tiếng Anh",
    "speaking tiếng Anh",
    "flashcard tiếng Anh",
    "từ vựng tiếng Anh",
    "thi thử tiếng Anh",
    "ôn chứng chỉ tiếng Anh",
    siteName,
  ],
  openGraph: {
    title: `${siteName} — Học tiếng Anh: 4 kỹ năng & từ vựng`,
    description: homeDescription,
    url: getSiteUrl(),
  },
  twitter: {
    title: `${siteName} — Học tiếng Anh: 4 kỹ năng`,
    description: homeDescription,
  },
  alternates: { canonical: "/" },
};


const heroSkillPills = ["Reading", "Listening", "Writing", "Speaking"] as const;

const skills = [
  {
    href: "/skills/reading",
    title: "Reading",
    desc: "Đọc hiểu, passage và câu hỏi trắc nghiệm.",
    icon: BookOpen,
    accent: "from-sky-500/15 to-blue-600/10 text-sky-700 dark:text-sky-300",
    iconBg: "bg-sky-500/20 text-sky-700",
  },
  {
    href: "/skills/listening",
    title: "Listening",
    desc: "Nghe audio, trả lời câu hỏi như trong đề.",
    icon: Headphones,
    accent: "from-cyan-500/15 to-teal-600/10 text-teal-800 dark:text-teal-300",
    iconBg: "bg-cyan-500/20 text-teal-800",
  },
  {
    href: "/skills/writing",
    title: "Writing",
    desc: "Viết bài theo đề, đếm từ và lưu bài làm.",
    icon: Pencil,
    accent: "from-amber-500/15 to-orange-500/10 text-amber-900 dark:text-amber-200",
    iconBg: "bg-amber-500/20 text-amber-900",
  },
  {
    href: "/skills/speaking",
    title: "Speaking",
    desc: "Cue card, ghi chú outline và luyện nói có chủ đích.",
    icon: Mic,
    accent: "from-violet-500/15 to-purple-600/10 text-violet-900 dark:text-violet-200",
    iconBg: "bg-violet-500/20 text-violet-900",
  },
];

function JsonLdScript() {
  const base = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: siteName,
        description: homeDescription,
        inLanguage: "vi-VN",
        publisher: { "@id": `${base}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: siteName,
        url: base,
      },
      {
        "@type": "WebApplication",
        name: siteName,
        url: base,
        description: homeDescription,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web browser",
        browserRequirements: "Requires JavaScript",
        offers: { "@type": "Offer", price: "0", priceCurrency: "VND" },
        inLanguage: ["vi", "en"],
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export default function HomePage() {
  return (
    <div className="space-y-8 sm:space-y-8">
      <JsonLdScript />
      {/* Hero — chữ trái, minh họa phải */}
      <section
        className="relative overflow-hidden rounded-3xl border border-border/70 bg-card px-5 py-10 shadow-md sm:px-8 sm:py-12 lg:px-12 lg:py-14"
        aria-labelledby="home-hero-heading"
      >
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/[0.07] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl"
          aria-hidden
        />
        <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-16">
          <div className="max-w-xl text-left">
            <p className="mb-4 inline-flex flex-wrap items-center gap-2 rounded-full border border-sky-200/80 bg-sky-50 px-3.5 py-1.5 text-xs font-medium text-sky-900 dark:border-sky-800/60 dark:bg-sky-950/40 dark:text-sky-100 sm:text-sm">
              <MascotOctopusMark size={18} className="shrink-0 text-primary sm:h-5 sm:w-5" />
              <span>
                Luyện tiếng Anh mỗi ngày · cùng{" "}
                <span className="font-semibold text-primary">{mascot.name}</span>
              </span>
            </p>
            <h1
              id="home-hero-heading"
              className="text-balance text-[1.65rem] font-bold leading-[1.2] tracking-tight text-foreground sm:text-4xl sm:leading-tight md:text-[2.15rem] lg:text-[2.35rem]"
            >
              Cùng bạn chinh phục{" "}
              <span className="bg-gradient-to-r from-primary to-cyan-600 bg-clip-text text-transparent">4 kỹ năng</span>{" "}
              &amp; từ vựng
            </h1>
            <p className="mt-5 text-pretty text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base">
              Giao diện dễ nhìn, thao tác đơn giản — bạn tập trung vào bài học, phần còn lại để chúng tôi lo.
            </p>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground/95">{mascot.tagline}</p>
            <ul
              className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 sm:gap-x-6"
              aria-label="Bốn kỹ năng luyện tập"
            >
              {heroSkillPills.map((label) => (
                <li key={label} className="flex items-center gap-2.5 text-[0.8125rem] font-medium text-foreground sm:text-sm">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                    <Check className="h-3.5 w-3.5 stroke-[3]" aria-hidden />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                size="lg"
                className="h-11 min-w-[200px] rounded-full px-7 text-sm font-semibold shadow-md sm:h-12 sm:px-8 sm:text-base"
              >
                <Link href="/exams">
                  Bắt đầu luyện tập
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 min-w-[200px] rounded-full border-2 border-border bg-background px-7 text-sm font-semibold sm:h-12 sm:px-8 sm:text-base"
              >
                <Link href="/learn">Ôn từ vựng</Link>
              </Button>
            </div>
            <p className="mt-6 text-xs leading-normal text-muted-foreground sm:text-sm">
              Muốn xem các lần làm bài trước?{" "}
              <Link href="/history" className="font-medium text-primary underline-offset-4 hover:underline">
                Mở lịch sử
              </Link>
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:justify-self-end">
            <div className="overflow-hidden rounded-[1.75rem] border-2 border-primary/20 bg-muted/30 shadow-sm ring-1 ring-border/60 dark:border-primary/30 dark:bg-muted/20">
              <Image
                src="/mascot-tako.png"
                alt="Minh họa học tiếng Anh cùng nhân vật dễ thương tại bàn học"
                width={560}
                height={420}
                className="h-auto w-full object-contain"
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            <div
              className="mt-5 flex justify-center gap-2"
              role="presentation"
              aria-hidden
            >
              <span className="h-2 w-2 rounded-full bg-primary/25" />
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="h-2 w-2 rounded-full bg-primary/25" />
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-6" aria-labelledby="home-skills-heading">
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <div className="inline-flex items-center justify-center gap-2 sm:justify-start">
            <GraduationCap className="h-5 w-5 text-primary" aria-hidden />
            <h2 id="home-skills-heading" className="text-xl font-bold tracking-tight sm:text-2xl md:text-[1.75rem]">
              Chọn kỹ năng
            </h2>
          </div>
          <p className="mx-auto max-w-2xl text-[0.9375rem] leading-relaxed text-muted-foreground sm:mx-0 sm:text-base">
            Mỗi kỹ năng một không gian riêng — vào thẳng bài hoặc xem danh sách đề trước khi làm.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map(({ href, title, desc, icon: Icon, accent, iconBg }) => (
            <Link key={href} href={href} className="group block rounded-2xl outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring">
              <Card className="h-full overflow-hidden border-border/70 transition-all duration-200 hover:border-primary/35 hover:shadow-md">
                <CardContent className={`bg-gradient-to-br p-6 ${accent}`}>
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
                      <Icon className="h-6 w-6" aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <h3 className="text-base font-semibold text-foreground sm:text-lg">{title}</h3>
                      <p className="text-[0.8125rem] leading-relaxed text-muted-foreground group-hover:text-foreground/80 sm:text-sm md:text-[0.9375rem]">
                        {desc}
                      </p>
                      <span className="inline-flex items-center gap-1 pt-2 text-xs font-semibold text-primary sm:text-sm">
                        Vào luyện
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="flex justify-center sm:justify-start">
          <Button asChild variant="secondary" size="lg" className="rounded-full">
            <Link href="/exams">
              <Layers className="h-4 w-4" />
              Chọn loại đề
            </Link>
          </Button>
        </div>
      </section>

      {/* Vocabulary + progress */}
      <section className="grid gap-6 lg:grid-cols-2" aria-label="Từ vựng và tiến độ học">
        <Card className="overflow-hidden border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 via-card to-card shadow-sm dark:border-emerald-900/40 dark:from-emerald-950/30">
          <CardContent className="space-y-4 p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
              <BookOpen className="h-6 w-6" aria-hidden />
            </div>
            <h2 className="text-lg font-bold tracking-tight sm:text-xl">Sổ từ vựng</h2>
            <p className="text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base">
              Học từ theo thẻ lật, sau đó kiểm tra nhanh bằng quiz để nhớ lâu hơn.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild className="rounded-full">
                <Link href="/learn">Mở flashcard</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-emerald-200 bg-background/80 dark:border-emerald-800">
                <Link href="/practice">Làm quiz</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/[0.07] via-card to-card shadow-sm">
          <CardContent className="space-y-4 p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <BarChart3 className="h-6 w-6" aria-hidden />
            </div>
            <h2 className="text-lg font-bold tracking-tight sm:text-xl">Theo dõi tiến độ làm bài</h2>
            <p className="text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base">
              Mỗi lần nộp bài được ghi lại — xem lại điểm, kỹ năng và mở lại đề bất cứ lúc nào.
            </p>
            <Button asChild variant="secondary" className="rounded-full">
              <Link href="/history">
                <History className="h-4 w-4" />
                Xem lịch sử
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
