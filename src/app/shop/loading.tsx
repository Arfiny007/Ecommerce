import { Container } from "@/components/common/container";
import { Skeleton } from "@/components/ui/skeleton";
import { ShopLoadingSkeleton } from "@/components/shop/shop-loading-skeleton";

export default function ShopRouteLoading() {
  return (
    <>
      <div className="border-b border-border-subtle bg-surface-muted pt-24 pb-10 md:pt-32 md:pb-14">
        <Container>
          <Skeleton className="h-4 w-16" />
          <Skeleton className="mt-3 h-10 w-64" />
          <Skeleton className="mt-4 h-5 w-96 max-w-full" />
        </Container>
      </div>
      <Container className="py-12">
        <ShopLoadingSkeleton />
      </Container>
    </>
  );
}
