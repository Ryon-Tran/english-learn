import type { Metadata } from "next";
import Link from "next/link";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: `Đăng nhập ${siteName}.`,
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md space-y-4 text-center">
      <h1 className="text-2xl font-bold tracking-tight">Đăng nhập</h1>
      <p className="text-muted-foreground">Trang đăng nhập sẽ được bổ sung sau.</p>
      <p>
        <Link href="/register" className="text-primary underline-offset-4 hover:underline">
          Chưa có tài khoản? Đăng ký
        </Link>
      </p>
    </div>
  );
}
