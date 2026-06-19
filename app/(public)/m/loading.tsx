import { LoadingState } from "@/components/ui/loading-state";

export default function Loading() {
  return <main className="min-h-screen bg-coffee-900 px-5 py-6 text-coffee-50"><LoadingState title="در حال آماده‌سازی منو" rows={6} /></main>;
}
