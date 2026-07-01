import { Container } from "@/components/common/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function CartLoading() {
  return (
    <Container className="py-28 md:py-32">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="mt-3 h-5 w-72" />
      <div className="mt-12 grid gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-28 w-20 shrink-0 rounded-[var(--radius-xl)]" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          ))}
        </div>
        <Skeleton className="h-80 rounded-[var(--radius-2xl)] lg:col-span-5" />
      </div>
    </Container>
  );
}
