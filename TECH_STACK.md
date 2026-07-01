# FINY FASHIONS — Tech Stack

## Core

| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org) | 16.2 | App Router, SSG, metadata API |
| [React](https://react.dev) | 19.2 | UI library |
| [TypeScript](https://www.typescriptlang.org) | 6.0 | Type safety (strict mode) |
| [Tailwind CSS](https://tailwindcss.com) | 4.3 | Utility-first styling |
| [PostCSS](https://postcss.org) | 8.5 | CSS processing |

## UI & Interaction

| Technology | Purpose |
|------------|---------|
| [Radix UI](https://www.radix-ui.com) | Accessible primitives (Dialog, Accordion, Slider, …) |
| [class-variance-authority](https://cva.style) | Component variant API |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | Conditional class merging (`cn()`) |
| [Framer Motion](https://www.framer.com/motion) | Page transitions, scroll animations |
| [Lucide React](https://lucide.dev) | Icon system |
| [next-themes](https://github.com/pacocoursey/next-themes) | Dark/light mode |

## Fonts

| Font | Role | Loading |
|------|------|---------|
| Inter | Body / UI | `next/font/google` |
| Cormorant Garamond | Display / headings | `next/font/google` |

## Tooling

| Tool | Purpose |
|------|---------|
| ESLint 9 (flat config) | Linting via `eslint-config-next` |
| TypeScript compiler | Type checking (`tsc --noEmit`) |
| Turbopack | Dev and production bundling (Next.js 16 default) |

## Deployment Targets

| Platform | Config |
|----------|--------|
| Netlify | `netlify.toml` + `@netlify/plugin-nextjs` |
| Vercel | Zero-config (Next.js native) |

## Data Layer

| Source | Type |
|--------|------|
| `src/constants/products.ts` | Static product catalog |
| `src/constants/content/` | Journal, policies, company content |
| `localStorage` | Cart, wishlist, compare, preferences |

No database or API in v1.0.0.

## Image CDN

Product and editorial images served from `images.unsplash.com` (configured in `next.config.ts` `remotePatterns`).
