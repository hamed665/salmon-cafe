import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-coffee-900 px-5 text-coffee-50">
      <div className="w-full max-w-xl">
        <EmptyState
          title="صفحه پیدا نشد"
          description="این لینک فعال نیست یا صفحه موردنظر حذف شده است."
          action={<Link href="/" className="rounded-2xl bg-gold-400 px-5 py-3 font-black text-coffee-950">بازگشت به خانه</Link>}
        />
      </div>
    </main>
  );
}
