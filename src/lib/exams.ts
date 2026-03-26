/** Các “dòng đề” / chứng chỉ — card trên /exams và query ?exam= */
export const EXAM_TRACKS = [
  {
    slug: "toeic",
    label: "TOEIC",
    short: "Nghe–đọc, format quen thuộc.",
    badge: "TOEIC",
    cardTitle: "TOEIC — Listening & Reading (format chuẩn)",
    bullets: [
      "Mẫu định dạng: part listening + reading.",
      "Thay bằng đề của bạn trong papers.json.",
      "Sau đó lọc kỹ năng và chọn đề bên phải.",
    ],
    cardGradient: "from-sky-400/25 via-sky-500/15 to-blue-600/20",
    image: "/exams/toeic.svg",
  },
  {
    slug: "b1",
    label: "B1",
    short: "Cambridge B1 Preliminary (PET).",
    badge: "B1 PET",
    cardTitle: "Cambridge B1 — Preliminary (PET)",
    bullets: [
      "Mẫu định dạng: bài lẻ + full đề.",
      "Thay bằng đề của bạn trong papers.json.",
      "Đồng bộ với luyện 4 kỹ năng trên app.",
    ],
    cardGradient: "from-emerald-400/25 via-teal-500/15 to-emerald-700/20",
    image: "/exams/b1.svg",
  },
  {
    slug: "cambridge",
    label: "Cambridge",
    short: "KET, FCE, CAE… — các cấp khác.",
    badge: "CAMBRIDGE",
    cardTitle: "Cambridge English — KET, FCE, CAE…",
    bullets: [
      "Mẫu định dạng: theo từng cấp độ.",
      "Thay bằng đề của bạn trong papers.json.",
      "Một nơi quản lý đề cho mọi chứng chỉ Cambridge.",
    ],
    cardGradient: "from-amber-400/25 via-orange-400/15 to-amber-700/20",
    image: "/exams/cambridge.svg",
  },
  {
    slug: "ielts",
    label: "IELTS",
    short: "Academic / General — 4 kỹ năng.",
    badge: "IELTS",
    cardTitle: "IELTS — Academic / General (4 kỹ năng)",
    bullets: [
      "Mẫu định dạng: passage + trắc nghiệm / task writing.",
      "Thay bằng đề của bạn trong papers.json.",
      "Luyện reading, listening, writing, speaking có hệ thống.",
    ],
    cardGradient: "from-violet-400/25 via-purple-500/15 to-violet-800/20",
    image: "/exams/ielts.svg",
  },
] as const;

export type ExamSlug = (typeof EXAM_TRACKS)[number]["slug"];

export function isExamSlug(s: string): s is ExamSlug {
  return EXAM_TRACKS.some((t) => t.slug === s);
}

export function getExamTrack(slug: string) {
  return EXAM_TRACKS.find((t) => t.slug === slug);
}
