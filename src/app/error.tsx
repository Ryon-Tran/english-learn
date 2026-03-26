"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/15 text-destructive">
        <AlertTriangle className="h-8 w-8" aria-hidden />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Đã xảy ra lỗi</h1>
        <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
          Ứng dụng gặp sự cố không mong muốn. Bạn có thể thử tải lại trang hoặc về trang chủ.
        </p>
        {process.env.NODE_ENV === "development" && error.message ? (
          <p className="mt-3 rounded-lg border border-border bg-muted/50 p-3 text-left font-mono text-xs text-destructive">
            {error.message}
          </p>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button type="button" onClick={() => reset()}>
          <RefreshCw className="h-4 w-4" />
          Thử lại
        </Button>
        <Button asChild variant="outline">
          <Link href="/">
            <Home className="h-4 w-4" />
            Trang chủ
          </Link>
        </Button>
      </div>
    </div>
  );
}
