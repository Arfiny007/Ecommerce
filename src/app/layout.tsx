import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import { SiteLayout } from "@/components/layout/site-layout";
import { SITE_NAME, SITE_DESCRIPTION } from "@/constants/site";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Luxury Fashion & Lifestyle`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ["luxury", "fashion", "lifestyle", "premium", "e-commerce"],
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
        <AppProviders>
          <SiteLayout>{children}</SiteLayout>
        </AppProviders>
      </body>
    </html>
  );
}
