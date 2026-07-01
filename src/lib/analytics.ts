/**
 * Analytics abstraction — wire GA4 / Vercel Analytics via env vars.
 * No tracking fires until IDs are configured in production.
 */

export type AnalyticsEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  properties?: Record<string, string | number | boolean>;
};

type AnalyticsProvider = "ga4" | "vercel";

const GA4_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
const VERCEL_ANALYTICS_ENABLED =
  process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === "true";

let gaInitialized = false;

function isAnalyticsEnabled(): boolean {
  return Boolean(GA4_ID) || VERCEL_ANALYTICS_ENABLED;
}

function initGA4(): void {
  if (typeof window === "undefined" || !GA4_ID || gaInitialized) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA4_ID, { send_page_view: false });

  gaInitialized = true;
}

function initVercel(): void {
  if (typeof window === "undefined" || !VERCEL_ANALYTICS_ENABLED) return;
  // Placeholder: import @vercel/analytics when package is added
  // import { inject } from '@vercel/analytics';
  // inject();
}

export function initAnalytics(): void {
  if (!isAnalyticsEnabled()) return;
  initGA4();
  initVercel();
}

export function trackPageView(url: string, title?: string): void {
  if (!isAnalyticsEnabled()) return;

  if (GA4_ID && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: url,
      page_title: title ?? document.title,
    });
  }

  if (VERCEL_ANALYTICS_ENABLED) {
    // Placeholder for @vercel/analytics track()
  }
}

export function trackEvent(event: AnalyticsEvent): void {
  if (!isAnalyticsEnabled()) return;

  if (GA4_ID && window.gtag) {
    window.gtag("event", event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.properties,
    });
  }
}

export function trackEcommerce(event: {
  action: "add_to_cart" | "remove_from_cart" | "begin_checkout" | "purchase";
  items?: { id: string; name: string; price: number; quantity: number }[];
  value?: number;
  currency?: string;
}): void {
  trackEvent({
    action: event.action,
    category: "ecommerce",
    properties: {
      currency: event.currency ?? "USD",
      value: event.value ?? 0,
      items_count: event.items?.length ?? 0,
    },
  });
}

export function getActiveProviders(): AnalyticsProvider[] {
  const providers: AnalyticsProvider[] = [];
  if (GA4_ID) providers.push("ga4");
  if (VERCEL_ANALYTICS_ENABLED) providers.push("vercel");
  return providers;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
