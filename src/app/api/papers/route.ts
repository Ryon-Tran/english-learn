import { NextRequest, NextResponse } from "next/server";
import { getAllPapers, getPapersBySkill, isSkill } from "@/lib/papers";

export async function GET(request: NextRequest) {
  const skill = request.nextUrl.searchParams.get("skill");
  if (skill && isSkill(skill)) {
    return NextResponse.json({ papers: getPapersBySkill(skill) });
  }
  return NextResponse.json({ papers: getAllPapers() });
}
