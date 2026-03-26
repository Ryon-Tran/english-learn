# MVP — lệnh cài & kế hoạch

## Đã có sẵn trong repo

- **UI:** Tailwind + shadcn-style (`button`, `card`, `input`, `tabs`, `badge`, …) + Radix (dialog, tabs, label, progress).
- **Icon:** `lucide-react`.
- **Form / validate:** `react-hook-form`, `@hookform/resolvers`, `zod`.
- **Toast:** `sonner`.

## Lệnh cài thêm (Radix — dùng với shadcn)

Các gói Radix dưới đây **đã được thêm vào `package.json`** trong repo; nếu clone mới, chạy lại:

```bash
pnpm add @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-scroll-area @radix-ui/react-tooltip @radix-ui/react-checkbox @radix-ui/react-popover
```

**Lưu ý:** Cần thêm file component trong `src/components/ui` (qua shadcn CLI hoặc copy từ docs) thì dropdown, select, tooltip… mới dùng được trong code.

Sau đó thêm component từ shadcn (khớp `src/components/ui`):

```bash
pnpm dlx shadcn@latest init
```

Trả lời prompt: Next.js, App Router, TS, Tailwind, `src/components/ui`, alias `@/*`.

```bash
pnpm dlx shadcn@latest add dropdown-menu separator select scroll-area tooltip checkbox popover sheet skeleton
```

Nếu `init` trùng cấu hình Tailwind hiện tại, có thể **bỏ qua init** và chỉ copy từng file từ [ui.shadcn.com](https://ui.shadcn.com/docs/components) vào `src/components/ui`, rồi `pnpm add` đúng gói `@radix-ui/*` như trên.

**Icon:** không cần gói thứ hai nếu đã dùng Lucide; tùy chọn `@tabler/icons-react` nếu muốn bộ icon khác.

**Biểu đồ tiến độ (sau MVP):**

```bash
pnpm add recharts
```

**Bảng lớn / lọc (sau MVP):**

```bash
pnpm add @tanstack/react-table
```

## Kế hoạch hoàn thiện MVP (gợi ý 3–4 tuần)

### Tuần 1 — Nội dung & luồng cốt lõi

- [x] Chuẩn hóa **1 bộ đề mẫu** đầy đủ 4 kỹ năng trong `papers.json` (Listening dùng `/audio/demo-listening.mp3` trong `public/audio`).
- [x] Rà soát **mọi route** từ trang chủ → hub → làm bài → lưu → `/history` (luồng đã nối API).
- [x] Thống nhất **copy tiếng Việt** cơ bản (toast, 404/error, Speaking MVP).

### Tuần 2 — Trải nghiệm người dùng

- [x] **Timer** (`ExamTimer`) cho Reading, Listening, Speaking — hết giờ toast + vẫn nộp được; dừng khi đã nộp (Reading/Listening) hoặc sau khi lưu Speaking.
- [x] **Speaking:** chọn file audio — chỉ lưu **tên file** + ghi chú (không upload server); copy giải thích rõ.
- [x] **Writing:** đếm từ realtime + **thanh Progress** theo mục tiêu tối thiểu.

### Tuần 3 — Dữ liệu & deploy

- [x] Biến môi trường: mẫu `.env.example` với `NEXT_PUBLIC_SITE_URL`.
- [ ] **Lưu tiến độ production:** hiện ghi `src/data/*.json` (phù hợp dev / single server); **Prisma + DB** khi cần đa instance.
- [ ] **Deploy:** chạy `pnpm build` trên máy/CI và cấu hình host (Vercel/VPS).

### Tuần 4 — Hoàn thiện MVP

- [x] Trang **`not-found`** và **`error`** (tiếng Việt); `/learn`, `/practice` responsive theo layout chung.
- [x] **Metadata** route: `skills/layout`, hub `skills/page`, `learn`/`practice`/`history` layout, `generateMetadata` cho `/skills/[skill]` và `/skills/[skill]/[paperId]`.
- [ ] Checklist nội bộ: 1 người dùng mới làm hết 1 đề mỗi kỹ năng + flashcard + quiz (bạn tự test).

## Linh vật (bạch tuộc)

- Tên & tagline: `src/lib/mascot.ts` (`Tako` — đổi tại đây cho đồng bộ).
- Ảnh chính: `public/mascot-tako.png` — `src/components/mascot/mascot-avatar.tsx` (`MascotAvatar`).
- SVG dự phòng: `src/components/mascot/mascot-octopus.tsx` (`MascotOctopusMark`).
- Đang dùng ảnh: logo header, badge hero trang chủ, trang 404.

## Định nghĩa “MVP xong”

- Người dùng làm được **đủ 4 kỹ năng** với đề có sẵn, xem **lịch sử**, ôn **từ vựng** (flashcard + quiz).
- `pnpm build` thành công, có URL public (hoặc bản demo) với `NEXT_PUBLIC_SITE_URL` đúng.
