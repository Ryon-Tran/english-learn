import type { Metadata } from "next";
import Link from "next/link";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Đăng ký",
  description: `Đăng ký tài khoản ${siteName}.`,
};

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md space-y-4 text-center">
      <h1 className="text-2xl font-bold tracking-tight">Đăng ký</h1>
      <p className="text-muted-foreground">Trang đăng ký sẽ được bổ sung sau.</p>
      <p>
        <Link href="/login" className="text-primary underline-offset-4 hover:underline">
          Đã có tài khoản? Đăng nhập
        </Link>
      </p>
    </div>
  );
}
