import { NextResponse } from "next/server";
import { getAllWords } from "@/lib/words";

export async function GET() {
  const words = getAllWords();
  return NextResponse.json({ words });
}
