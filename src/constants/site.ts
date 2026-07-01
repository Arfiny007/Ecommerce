export const CURRENCY = "USD";
export const FREE_SHIPPING_THRESHOLD = 250;

/** Canonical site URL — set NEXT_PUBLIC_SITE_URL in production */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://finyfashions.com";

export const SITE_LOCALE = "en_US";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image`;

export const SEO_DEFAULTS = {
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
} as const;

export const NOINDEX_ROBOTS = {
  index: false,
  follow: false,
} as const;

export {
  brandName,
  shortName,
  tagline,
  description,
  copyright,
  socialLinks,
  contactEmail,
  supportEmail,
  address,
  storageKeys,
} from "@/constants/branding";
