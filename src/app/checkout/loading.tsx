import { Container } from "@/components/common/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function CheckoutLoading() {
  return (
    <Container className="py-28 md:py-32">
      <Skeleton className="h-10 w-40" />
      <Skeleton className="mt-10 h-8 w-full max-w-2xl" />
      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-7">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-[var(--radius-xl)]" />
          ))}
        </div>
        <Skeleton className="h-72 rounded-[var(--radius-2xl)] lg:col-span-5" />
      </div>
    </Container>
  );
}
