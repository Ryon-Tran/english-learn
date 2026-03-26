/**
 * Build static export: tạm sao chép rồi xóa src/app/api (Next không hỗ trợ API trong output: export),
 * chạy next build, rồi khôi phục thư mục api.
 * Dùng copy+rm thay vì rename để giảm lỗi EPERM trên Windows.
 */
import { cpSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const apiDir = join(root, "src", "app", "api");
const backupDir = join(root, "src", "app", "__api_backup_static_export");

function moveApiAside() {
  if (!existsSync(apiDir)) return false;
  if (existsSync(backupDir)) {
    console.error(
      "Đã tồn tại src/app/__api_backup_static_export — xóa thư mục đó hoặc khôi phục api trước khi build.",
    );
    process.exit(1);
  }
  cpSync(apiDir, backupDir, { recursive: true });
  rmSync(apiDir, { recursive: true });
  console.log("[build-static] Đã tạm chuyển src/app/api → __api_backup_static_export");
  return true;
}

function restoreApi() {
  if (!existsSync(backupDir)) return;
  if (existsSync(apiDir)) {
    rmSync(apiDir, { recursive: true });
  }
  cpSync(backupDir, apiDir, { recursive: true });
  rmSync(backupDir, { recursive: true });
  console.log("[build-static] Đã khôi phục src/app/api");
}

const moved = moveApiAside();

const isWin = process.platform === "win32";
const result = spawnSync(isWin ? "pnpm.cmd" : "pnpm", ["exec", "next", "build"], {
  stdio: "inherit",
  shell: isWin,
  cwd: root,
  env: process.env,
});

if (moved) {
  restoreApi();
}

process.exit(result.status ?? 1);
