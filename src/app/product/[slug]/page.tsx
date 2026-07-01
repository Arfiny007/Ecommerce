import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, PRODUCTS } from "@/constants/products";
import { ProductPageContent } from "@/components/product/product-page-content";
import { JsonLd } from "@/components/seo/json-ld";
import { createProductMetadata } from "@/lib/metadata";
import {
  getProductSchema,
  getProductBreadcrumbSchema,
} from "@/lib/structured-data";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return createProductMetadata(product);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[getProductSchema(product), getProductBreadcrumbSchema(product)]}
      />
      <ProductPageContent product={product} />
    </>
  );
}
