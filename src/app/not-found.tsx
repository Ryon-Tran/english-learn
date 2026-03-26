import Link from "next/link";
import { Home } from "lucide-react";
import { MascotOctopusMark } from "@/components/mascot/mascot-octopus";
import { Button } from "@/components/ui/button";
import { siteName } from "@/lib/site";
import { mascot } from "@/lib/mascot";
export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 text-primary">
        <MascotOctopusMark size={40} variant="standalone" />
      </div>      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">
          Lỗi 404 · {mascot.name} cũng không thấy trang này
        </p>        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Không tìm thấy trang</h1>
        <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
          Đường dẫn không tồn tại hoặc đã được đổi. Quay về trang chủ {siteName} hoặc chọn mục luyện tập bên dưới.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link href="/">
            <Home className="h-4 w-4" />
            Trang chủ
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/skills">4 kỹ năng</Link>
        </Button>
      </div>
    </div>
  );
}
