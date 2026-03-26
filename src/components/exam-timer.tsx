"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { AlarmClock } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  /** Thời gian gợi ý (phút). Không truyền = ẩn timer. */
  durationMinutes?: number;
  /** Dừng đếm (ví dụ đã nộp bài). */
  paused?: boolean;
  className?: string;
};

function formatMmSs(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function ExamTimer({ durationMinutes, paused = false, className }: Props) {
  const totalSec = durationMinutes && durationMinutes > 0 ? Math.round(durationMinutes * 60) : 0;
  const [remaining, setRemaining] = useState(totalSec);
  const firedRef = useRef(false);

  useEffect(() => {
    setRemaining(totalSec);
    firedRef.current = false;
  }, [totalSec]);

  useEffect(() => {
    if (totalSec <= 0 || paused) return;
    const id = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          window.clearInterval(id);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [totalSec, paused]);

  useEffect(() => {
    if (remaining !== 0 || firedRef.current || totalSec <= 0 || paused) return;
    firedRef.current = true;
    toast.warning("Hết thời gian gợi ý — bạn vẫn có thể làm tiếp và nộp bài.");
  }, [remaining, totalSec, paused]);

  if (totalSec <= 0) return null;

  const urgent = remaining > 0 && remaining <= 60;
  const overtime = remaining === 0;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm shadow-sm",
        overtime
          ? "border-amber-500/40 bg-amber-500/10 text-amber-950 dark:text-amber-100"
          : urgent
            ? "border-destructive/30 bg-destructive/5"
            : "border-border bg-muted/40",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-label="Đồng hồ làm bài gợi ý"
    >
      <span className="inline-flex items-center gap-2 font-medium text-foreground">
        <AlarmClock className={cn("h-4 w-4 shrink-0", urgent && !overtime && "text-destructive")} aria-hidden />
        {overtime ? "Hết giờ gợi ý" : "Thời gian gợi ý"}
      </span>
      <span
        className={cn(
          "tabular-nums text-base font-semibold tracking-tight sm:text-lg",
          urgent && !overtime && "text-destructive",
          overtime && "text-amber-800 dark:text-amber-200",
        )}
      >
        {overtime ? "0:00" : formatMmSs(remaining)}
        {!overtime ? <span className="ml-1 text-xs font-normal text-muted-foreground">/ {formatMmSs(totalSec)}</span> : null}
      </span>
    </div>
  );
}
