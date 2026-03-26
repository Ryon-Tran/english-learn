import wordsData from "@/data/words.json";

export type WordEntry = {
  id: string;
  word: string;
  ipa: string;
  meaningVi: string;
  example: string;
  topic: string;
};

export function getAllWords(): WordEntry[] {
  return wordsData as WordEntry[];
}

export function getWordById(id: string): WordEntry | undefined {
  return getAllWords().find((w) => w.id === id);
}

export function pickRandomWords(count: number, excludeIds: string[] = []): WordEntry[] {
  const pool = getAllWords().filter((w) => !excludeIds.includes(w.id));
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
