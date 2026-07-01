import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import { SiteLayout } from "@/components/layout/site-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import { ServiceWorkerRegister } from "@/components/pwa/service-worker-register";
import { baseMetadata } from "@/lib/metadata";
import {
  getOrganizationSchema,
  getWebSiteSchema,
} from "@/lib/structured-data";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}
      >
        <JsonLd data={[getOrganizationSchema(), getWebSiteSchema()]} />
        <AppProviders>
          <SiteLayout>{children}</SiteLayout>
          <Suspense fallback={null}>
            <AnalyticsProvider />
          </Suspense>
          <ServiceWorkerRegister />
        </AppProviders>
      </body>
    </html>
  );
}
