import { Suspense } from "react";
import { ShopPageContent } from "@/components/shop/shop-page-content";
import { ShopLoadingSkeleton } from "@/components/shop/shop-loading-skeleton";
import { Container } from "@/components/common/container";
import { Skeleton } from "@/components/ui/skeleton";
import { JsonLd } from "@/components/seo/json-ld";
import { createPageMetadata } from "@/lib/metadata";
import { shopDescription } from "@/constants/branding";
import { PRODUCTS } from "@/constants/products";
import { getItemListSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Shop",
  description: shopDescription,
  path: "/shop",
});

function ShopLoading() {
  return (
    <>
      <div className="border-b border-border-subtle bg-surface-muted pt-24 pb-10 md:pt-32 md:pb-14">
        <Container>
          <Skeleton className="h-4 w-16" />
          <Skeleton className="mt-3 h-10 w-64" />
          <Skeleton className="mt-4 h-5 w-96 max-w-full" />
          <div className="mt-8 flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-28 rounded-[var(--radius-full)]" />
            ))}
          </div>
        </Container>
      </div>
      <Container className="py-12">
        <div className="flex gap-12">
          <Skeleton className="hidden h-[32rem] w-72 shrink-0 rounded-[var(--radius-2xl)] lg:block" />
          <div className="flex-1">
            <Skeleton className="h-12 w-full rounded-[var(--radius-xl)]" />
            <ShopLoadingSkeleton className="mt-8" />
          </div>
        </div>
      </Container>
    </>
  );
}

export default function ShopPage() {
  return (
    <>
      <JsonLd data={getItemListSchema(PRODUCTS, "FINY FASHIONS Collection")} />
      <Suspense fallback={<ShopLoading />}>
        <ShopPageContent />
      </Suspense>
    </>
  );
}
