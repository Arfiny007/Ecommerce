import { Container } from "@/components/common/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <Container className="py-24 md:py-32">
      <Skeleton className="h-4 w-48" />
      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <Skeleton className="aspect-[3/4] w-full rounded-[var(--radius-2xl)]" />
        <div className="space-y-6">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-12 w-full rounded-[var(--radius-full)]" />
        </div>
      </div>
    </Container>
  );
}
