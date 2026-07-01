import { Suspense } from "react";
import { ShopPageContent } from "@/components/shop/shop-page-content";
import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/common/container";
import { createPageMetadata } from "@/lib/metadata";
import { shopDescription } from "@/constants/branding";

export const metadata = createPageMetadata("Shop", shopDescription);

function ShopLoading() {
  return (
    <Container className="py-32">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="mt-4 h-12 w-96" />
      <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />
        ))}
      </div>
    </Container>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopLoading />}>
      <ShopPageContent />
    </Suspense>
  );
}
