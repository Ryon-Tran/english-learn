import papersData from "@/data/papers.json";

export const SKILLS = ["reading", "listening", "writing", "speaking"] as const;
export type Skill = (typeof SKILLS)[number];

export type ReadingQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
};

export type ReadingPassage = {
  id: string;
  title: string;
  text: string;
  questions: ReadingQuestion[];
};

export type ReadingPaper = {
  id: string;
  skill: "reading";
  title: string;
  description?: string;
  timeMinutes?: number;
  passages: ReadingPassage[];
};

export type ListeningQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
};

export type ListeningPaper = {
  id: string;
  skill: "listening";
  title: string;
  description?: string;
  timeMinutes?: number;
  audioUrl: string;
  questions: ListeningQuestion[];
};

export type WritingPaper = {
  id: string;
  skill: "writing";
  title: string;
  description?: string;
  taskPrompt: string;
  minWords?: number;
};

export type SpeakingPaper = {
  id: string;
  skill: "speaking";
  title: string;
  description?: string;
  cueCard: string;
  preparationMinutes?: number;
  responseMinutes?: number;
};

export type Paper = ReadingPaper | ListeningPaper | WritingPaper | SpeakingPaper;

type PapersFile = { papers: Paper[] };

function loadPapers(): Paper[] {
  return (papersData as PapersFile).papers ?? [];
}

export function getAllPapers(): Paper[] {
  return loadPapers();
}

export function getPapersBySkill(skill: Skill): Paper[] {
  return loadPapers().filter((p) => p.skill === skill);
}

export function getPaper(skill: Skill, id: string): Paper | undefined {
  const p = loadPapers().find((x) => x.id === id && x.skill === skill);
  return p;
}

export function isSkill(s: string): s is Skill {
  return (SKILLS as readonly string[]).includes(s);
}
