import { NextRequest, NextResponse } from "next/server";
import { isSkill } from "@/lib/papers";
import { readSkillProgress, writeSkillProgress, type SkillAttempt, type SkillProgressData } from "@/lib/skill-progress";

export async function GET() {
  const data = await readSkillProgress();
  return NextResponse.json(data);
}

function randomId() {
  return `att_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Expected object body" }, { status: 400 });
  }

  const b = body as Partial<SkillAttempt>;

  if (!b.paperId || typeof b.paperId !== "string") {
    return NextResponse.json({ error: "paperId required" }, { status: 400 });
  }
  if (!b.skill || typeof b.skill !== "string" || !isSkill(b.skill)) {
    return NextResponse.json({ error: "valid skill required" }, { status: 400 });
  }

  const current = await readSkillProgress();
  const attempt: SkillAttempt = {
    id: randomId(),
    paperId: b.paperId,
    skill: b.skill,
    completedAt: new Date().toISOString(),
    score: typeof b.score === "number" ? b.score : undefined,
    maxScore: typeof b.maxScore === "number" ? b.maxScore : undefined,
    summary: typeof b.summary === "string" ? b.summary.slice(0, 2000) : undefined,
  };

  const next: SkillProgressData = {
    attempts: [...current.attempts, attempt],
  };
  await writeSkillProgress(next);
  return NextResponse.json({ attempt, attempts: next.attempts });
}
