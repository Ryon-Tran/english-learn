"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, GraduationCap, History, LayoutGrid, Menu } from "lucide-react";
import { MascotOctopusMark } from "@/components/mascot/mascot-octopus";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/learn", label: "Flashcard", icon: BookOpen },
  { href: "/practice", label: "Quiz", icon: LayoutGrid },
  { href: "/history", label: "Lịch sử", icon: History },
] as const;

const EXAMS_HUB = "/exams";

function linkActive(href: string, pathname: string | null) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function examsHubActive(pathname: string | null) {
  if (!pathname) return false;
  if (pathname === EXAMS_HUB) return true;
  if (pathname.startsWith(`${EXAMS_HUB}/`)) return true;
  if (pathname.startsWith("/skills")) return true;
  return false;
}

export function SiteHeader() {
  const pathname = usePathname();
  const examFlowActive = examsHubActive(pathname);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-card/95 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-2.5 sm:gap-4 sm:px-6 sm:py-3">
        <Link
          href="/"
          className="group flex w-fit shrink-0 items-center gap-2 rounded-lg outline-none ring-offset-background transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary transition-colors group-hover:bg-primary/20">
            <MascotOctopusMark size={22} />
          </span>
          <span className="text-[0.9375rem] font-semibold tracking-tight sm:text-base">
            <span className="text-primary">English</span>
            <span className="text-foreground"> Learn</span>
          </span>
        </Link>

        <nav
          className="hidden items-center justify-center gap-1 sm:gap-5 md:flex lg:gap-6"
          aria-label="Điều hướng chính"
        >
          <Link
            href={EXAMS_HUB}
            className={cn(
              "flex items-center gap-1.5 whitespace-nowrap px-1 py-2 text-sm font-medium transition-colors sm:text-base",
              examFlowActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <GraduationCap className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
            Luyện theo đề
          </Link>

          {navItems.map(({ href, label }) => {
            const active = linkActive(href, pathname);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "whitespace-nowrap px-1 py-2 text-sm font-medium transition-colors sm:text-base",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex justify-end gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden shrink-0 rounded-lg border-2 md:inline-flex md:h-10 md:px-4 md:text-sm"
          >
            <Link href="/login">Đăng nhập</Link>
          </Button>
          <Button asChild size="sm" className="hidden shrink-0 rounded-lg shadow-sm md:inline-flex md:h-10 md:px-4 md:text-sm">
            <Link href="/register">Đăng ký</Link>
          </Button>
          <div className="flex items-center gap-1.5 md:hidden">
            <Button asChild variant="outline" size="sm" className="h-9 shrink-0 rounded-lg border-2 px-2.5 text-xs sm:px-3 sm:text-sm">
              <Link href="/login">Đăng nhập</Link>
            </Button>
            <Button asChild size="sm" className="h-9 shrink-0 rounded-lg px-2.5 text-xs sm:px-3 sm:text-sm">
              <Link href="/register">Đăng ký</Link>
            </Button>
            <details className="relative">
              <summary
                className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted/70 hover:text-foreground open:bg-muted/50 [&::-webkit-details-marker]:hidden"
                aria-label="Mở menu điều hướng"
              >
                <Menu className="h-5 w-5" aria-hidden />
              </summary>
              <div
                className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-[min(100vw-2rem,18rem)] overflow-hidden rounded-xl bg-card py-2 shadow-lg ring-1 ring-border/40 animate-in fade-in slide-in-from-top-2 duration-200"
                onClick={(e) => {
                  const el = e.currentTarget.parentElement as HTMLDetailsElement | null;
                  if (el && e.target instanceof HTMLElement && e.target.closest("a")) {
                    el.open = false;
                  }
                }}
              >
                <nav className="flex flex-col gap-0.5 px-2" aria-label="Menu điều hướng">
                  <Link
                    href={EXAMS_HUB}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
                      examFlowActive ? "text-primary" : "text-foreground hover:bg-muted/80",
                    )}
                  >
                    <GraduationCap className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
                    Luyện theo đề
                  </Link>
                  <div className="my-1 h-px bg-border" role="separator" />
                  {navItems.map(({ href, label, icon: Icon }) => {
                    const active = linkActive(href, pathname);
                    return (
                      <Link
                        key={href}
                        href={href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
                          active ? "text-primary" : "text-foreground hover:bg-muted/80",
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
                        {label}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
