import { promises as fs } from "fs";
import path from "path";
import type { Skill } from "@/lib/papers";

export type SkillAttempt = {
  id: string;
  paperId: string;
  skill: Skill;
  completedAt: string;
  score?: number;
  maxScore?: number;
  summary?: string;
};

export type SkillProgressData = {
  attempts: SkillAttempt[];
};

const filePath = path.join(process.cwd(), "src", "data", "skill-progress.json");
const defaultPath = path.join(process.cwd(), "src", "data", "skill-progress.default.json");

async function ensureFile(): Promise<void> {
  try {
    await fs.access(filePath);
  } catch {
    const raw = await fs.readFile(defaultPath, "utf-8");
    await fs.writeFile(filePath, raw, "utf-8");
  }
}

export async function readSkillProgress(): Promise<SkillProgressData> {
  await ensureFile();
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as SkillProgressData;
}

export async function writeSkillProgress(data: SkillProgressData): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}
