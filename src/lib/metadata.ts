import type { Metadata } from "next";
import {
  brandName,
  description,
  seoKeywords,
  shortName,
} from "@/constants/branding";

export const baseMetadata: Metadata = {
  title: {
    default: brandName,
    template: `%s | ${brandName}`,
  },
  description,
  keywords: [...seoKeywords],
  applicationName: brandName,
  authors: [{ name: brandName }],
  creator: brandName,
  publisher: brandName,
  openGraph: {
    type: "website",
    siteName: brandName,
    title: brandName,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: brandName,
    description,
  },
};

export function createPageMetadata(
  title: string,
  pageDescription?: string
): Metadata {
  return {
    title,
    description: pageDescription ?? description,
    openGraph: {
      title: `${title} | ${brandName}`,
      description: pageDescription ?? description,
    },
  };
}

export { brandName, shortName, description };
