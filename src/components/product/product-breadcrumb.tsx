import Link from "next/link";
import type { Product } from "@/types/product";

interface ProductBreadcrumbProps {
  product: Product;
}

export function ProductBreadcrumb({ product }: ProductBreadcrumbProps) {
  return (
    <nav
      className="py-6 text-xs text-muted-foreground"
      aria-label="Breadcrumb"
    >
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="transition-luxury hover:text-foreground">
            Home
          </Link>
        </li>
        <li aria-hidden className="mx-1">
          /
        </li>
        <li>
          <Link href="/shop" className="transition-luxury hover:text-foreground">
            Shop
          </Link>
        </li>
        <li aria-hidden className="mx-1">
          /
        </li>
        <li>
          <span className="text-foreground" aria-current="page">
            {product.name}
          </span>
        </li>
      </ol>
    </nav>
  );
}
