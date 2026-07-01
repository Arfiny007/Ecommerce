import type { MetadataRoute } from "next";
import { brandName, description, shortName } from "@/constants/branding";
import { SITE_URL } from "@/constants/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brandName,
    short_name: shortName,
    description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#fafaf8",
    theme_color: "#0a0a0a",
    lang: "en",
    dir: "ltr",
    categories: ["shopping", "lifestyle"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    screenshots: [],
    id: SITE_URL,
  };
}
