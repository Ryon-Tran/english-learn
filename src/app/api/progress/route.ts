import { NextRequest, NextResponse } from "next/server";
import { readProgress, writeProgress, type ProgressData } from "@/lib/progress";

export async function GET() {
  const progress = await readProgress();
  return NextResponse.json(progress);
}

export async function PATCH(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Expected object body" }, { status: 400 });
  }

  const current = await readProgress();
  const b = body as Partial<ProgressData> & {
    markKnownId?: string;
    quiz?: { correct: number; total: number };
  };

  const next: ProgressData = { ...current };

  if (Array.isArray(b.knownIds)) {
    next.knownIds = [...new Set(b.knownIds.map(String))];
  }

  if (typeof b.markKnownId === "string" && b.markKnownId) {
    const set = new Set(next.knownIds);
    set.add(b.markKnownId);
    next.knownIds = [...set];
  }

  if (b.quiz && typeof b.quiz.correct === "number" && typeof b.quiz.total === "number") {
    next.quizScores = [
      ...next.quizScores,
      {
        at: new Date().toISOString(),
        correct: b.quiz.correct,
        total: b.quiz.total,
      },
    ];
  }

  await writeProgress(next);
  return NextResponse.json(next);
}
