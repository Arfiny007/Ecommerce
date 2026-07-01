import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/constants/products";
import { getJournalSlugs } from "@/constants/content/journal";
import { SITE_URL } from "@/constants/site";

const CONTENT_ROUTES = [
  "/about",
  "/contact",
  "/stores",
  "/careers",
  "/press",
  "/lookbook",
  "/journal",
  "/shipping",
  "/returns",
  "/faq",
  "/privacy",
  "/terms",
  "/cookies",
  "/size-guide",
  "/support",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/cart`, lastModified: now, changeFrequency: "weekly", priority: 0.3 },
    { url: `${SITE_URL}/profile`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    ...CONTENT_ROUTES.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: `${SITE_URL}/product/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const journalRoutes: MetadataRoute.Sitemap = getJournalSlugs().map((slug) => ({
    url: `${SITE_URL}/journal/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...productRoutes, ...journalRoutes];
}
