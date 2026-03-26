import { promises as fs } from "fs";
import path from "path";

export type ProgressData = {
  knownIds: string[];
  quizScores: { at: string; correct: number; total: number }[];
};

const progressPath = path.join(process.cwd(), "src", "data", "progress.json");
const defaultPath = path.join(process.cwd(), "src", "data", "progress.default.json");

async function ensureFile(): Promise<void> {
  try {
    await fs.access(progressPath);
  } catch {
    const raw = await fs.readFile(defaultPath, "utf-8");
    await fs.writeFile(progressPath, raw, "utf-8");
  }
}

export async function readProgress(): Promise<ProgressData> {
  await ensureFile();
  const raw = await fs.readFile(progressPath, "utf-8");
  return JSON.parse(raw) as ProgressData;
}

export async function writeProgress(data: ProgressData): Promise<void> {
  await fs.writeFile(progressPath, JSON.stringify(data, null, 2), "utf-8");
}
