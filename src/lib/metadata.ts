import type { Metadata } from "next";
import {
  brandName,
  description,
  seoKeywords,
  shortName,
  socialLinks,
  contactEmail,
} from "@/constants/branding";
import {
  SITE_URL,
  SITE_LOCALE,
  DEFAULT_OG_IMAGE,
  SEO_DEFAULTS,
  NOINDEX_ROBOTS,
} from "@/constants/site";

const twitterHandle = "@finyfashions";

export const metadataBase = new URL(SITE_URL);

export const baseMetadata: Metadata = {
  metadataBase,
  title: {
    default: brandName,
    template: `%s | ${brandName}`,
  },
  description,
  keywords: [...seoKeywords],
  applicationName: brandName,
  authors: [{ name: brandName, url: SITE_URL }],
  creator: brandName,
  publisher: brandName,
  category: "shopping",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: SEO_DEFAULTS.robots,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: brandName,
    title: brandName,
    description,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${brandName} — ${description}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: twitterHandle,
    creator: twitterHandle,
    title: brandName,
    description,
    images: [DEFAULT_OG_IMAGE],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: shortName,
  },
  other: {
    "msapplication-TileColor": "#0a0a0a",
  },
};

export interface PageMetadataOptions {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
  type?: "website" | "article";
}

export function createPageMetadata({
  title,
  description: pageDescription,
  path = "",
  image,
  imageAlt,
  noIndex = false,
  type = "website",
}: PageMetadataOptions): Metadata {
  const desc = pageDescription ?? description;
  const url = path ? `${SITE_URL}${path}` : SITE_URL;
  const ogImage = image ?? DEFAULT_OG_IMAGE;
  const ogAlt = imageAlt ?? `${title} | ${brandName}`;

  return {
    title,
    description: desc,
    alternates: { canonical: url },
    robots: noIndex ? NOINDEX_ROBOTS : SEO_DEFAULTS.robots,
    openGraph: {
      type,
      locale: SITE_LOCALE,
      url,
      siteName: brandName,
      title: `${title} | ${brandName}`,
      description: desc,
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      site: twitterHandle,
      creator: twitterHandle,
      title: `${title} | ${brandName}`,
      description: desc,
      images: [ogImage],
    },
  };
}

export function createProductMetadata(product: {
  name: string;
  description: string;
  slug: string;
  images: string[];
  price: number;
}): Metadata {
  const path = `/product/${product.slug}`;
  const image = product.images[0];

  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `${SITE_URL}${path}` },
    robots: SEO_DEFAULTS.robots,
    openGraph: {
      type: "website",
      locale: SITE_LOCALE,
      url: `${SITE_URL}${path}`,
      siteName: brandName,
      title: `${product.name} | ${brandName}`,
      description: product.description,
      images: [{ url: image, width: 1200, height: 630, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      site: twitterHandle,
      creator: twitterHandle,
      title: `${product.name} | ${brandName}`,
      description: product.description,
      images: [image],
    },
    other: {
      "product:price:amount": String(product.price),
      "product:price:currency": "USD",
    },
  };
}

export { brandName, shortName, description, socialLinks, contactEmail };
