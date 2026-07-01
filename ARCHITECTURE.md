# FINY FASHIONS — Architecture

Production luxury e-commerce storefront built with Next.js App Router. This document describes how the project is structured, how data flows, and the conventions to follow when extending the codebase.

---

## Overview

| Item | Value |
|------|-------|
| Brand | FINY FASHIONS (`src/constants/branding.ts`) |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + CSS design tokens |
| Animation | Framer Motion |
| UI primitives | Radix UI + shadcn-style wrappers |
| Deployment | Netlify (`netlify.toml`) |

The app is **frontend-only** at this stage: product data is static, cart/wishlist/compare persist to `localStorage`, and there is no backend API.

---

## High-Level Diagram

```
┌─────────────────────────────────────────────────────────────┐
│  src/app/layout.tsx (Server)                                │
│  ├── fonts, baseMetadata, globals.css                       │
│  └── AppProviders (Client)                                  │
│       ├── ThemeProvider (next-themes)                       │
│       └── CartProvider (localStorage)                       │
│            └── SiteLayout                                   │
│                 ├── LoadingScreen, ScrollIndicator          │
│                 ├── Navbar (+ MegaMenu, Search, Mobile)      │
│                 ├── <main>{page}</main>                       │
│                 ├── Footer                                    │
│                 ├── CartDrawer                              │
│                 └── BackToTop                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Directory Structure

```
src/
├── app/                    # Next.js routes (pages + metadata)
├── components/
│   ├── ui/                 # Design-system primitives (Button, Input, …)
│   ├── common/             # Layout, typography, motion, media helpers
│   ├── layout/             # Site shell (footer, site-layout)
│   ├── navigation/         # Navbar, mega menu, search, mobile menu
│   ├── home/               # Landing page sections
│   ├── shop/               # Catalog page content
│   ├── product/            # PDP content
│   ├── cart/               # Cart drawer and page
│   ├── checkout/           # Multi-step checkout
│   ├── editorial/          # Reusable editorial blocks
│   ├── content/            # FAQ, contact, lookbook pages
│   └── providers/          # React context providers
├── constants/              # Branding, nav, products, home copy
├── hooks/                  # Client hooks (wishlist, shop filters, compare, scroll)
├── lib/                    # utils, animations, metadata, motion-config, shop-filters, analytics
├── styles/
│   ├── globals.css         # Tailwind + utilities + keyframes
│   └── tokens.css          # CSS custom properties (design tokens)
└── types/                  # Shared TypeScript types
```

**Path alias:** `@/*` → `src/*` (see `tsconfig.json`).

---

## Routing

| Route | File | Rendering | Description |
|-------|------|-----------|-------------|
| `/` | `app/page.tsx` | Static | Cinematic landing page (composed home sections) |
| `/shop` | `app/shop/page.tsx` | Static + Suspense | Premium editorial catalog: filters, grid/list, quick view, infinite scroll |
| `/product/[slug]` | `app/product/[slug]/page.tsx` | SSG | Product detail; `generateStaticParams` from `PRODUCTS` |
| (404) | `app/not-found.tsx` | Static | Branded not-found page |

**Metadata:** Root layout uses `baseMetadata` from `lib/metadata.ts`. Shop uses `createPageMetadata()`. Product pages use `generateMetadata()` per slug.

**Icons:** `app/icon.tsx`, `app/apple-icon.tsx` (generated), `public/icon.svg`.

---

## Server vs Client Components

### Server Components (default)

- All `app/**/page.tsx` files (except they import client children)
- `app/layout.tsx`
- `components/common/container.tsx`, `section.tsx`, `section-header.tsx`, `typography.tsx`, `surface.tsx`
- `components/layout/footer.tsx` is `"use client"` (form state) — see COMPONENT_MAP

**Rule:** Add `"use client"` only when the file needs hooks, browser APIs, Framer Motion, or event handlers.

### Client Components (`"use client"`)

- All `components/home/*` (motion, scroll, video)
- All `components/shop/*` (filters, grid, quick view, toolbar)
- `components/navigation/*` (interactivity)
- `components/cart/*`, `components/providers/*`
- `components/product/product-page-content.tsx`
- Motion wrappers, theme toggle, loading screen, etc.

**Shop exception:** `shop-loading-skeleton.tsx` and `shop-no-results-illustration.tsx` are Server Components (no interactivity). All other shop files are client components.

**Hydration:** Theme and cart read `localStorage` after mount. `suppressHydrationWarning` on `<html>` for theme class. Loading screen is client-only overlay.

---

## State Management

| Concern | Location | Persistence |
|---------|----------|-------------|
| Theme (light/dark) | `ThemeProvider` → `next-themes` | `class` on `<html>` |
| Cart items + drawer open | `CartProvider` | `localStorage` key from `branding.storageKeys.cart` |
| Wishlist IDs | `useWishlist` hook | `localStorage` key from `branding.storageKeys.wishlist` |
| Compare list (max 4) | `useCompare` hook | `localStorage` key from `branding.storageKeys.compare` |
| Shop filters / search | `useShopFilters` hook | Session only (URL params read once on mount) |
| Quick view modal | Local state in `ShopProductGrid` | Session only |
| View mode (grid/list) | Local state in `ShopPageContent` | Session only |
| Infinite scroll offset | `useInfiniteScroll` hook | Resets when filter results change |

**Cart API:** `useCart()` from `@/components/providers/cart-provider`.

**Shop filter API:** `useShopFilters()` from `@/hooks/use-shop-filters.ts` — wraps `lib/shop-filters.ts` pure functions with React state and memoized `filteredProducts`.

---

## Data Layer

| Source | File | Purpose |
|--------|------|---------|
| Brand copy | `constants/branding.ts` | **Single source of truth** for brand name, tagline, empty states, newsletter |
| Site config | `constants/site.ts` | Currency, shipping threshold; re-exports branding |
| Navigation | `constants/navigation.ts` | `MAIN_NAV`, `FOOTER_NAV`, section labels |
| Products | `constants/products.ts` | `PRODUCTS`, `CATEGORIES`, `BRANDS`, `SHOP_MAX_PRICE`, filter helpers |
| Home editorial | `constants/home-content.ts` | Hero video, lookbook slides, editorial chapters, timeline (not branding) |

**Types:** `types/product.ts`, `types/cart.ts`.

There is no database. Replacing static data later should keep the same types and helper function signatures where possible.

### Shop filter logic (`lib/shop-filters.ts`)

Pure functions — no React — so filtering stays testable and memoizable:

| Function | Purpose |
|----------|---------|
| `filterProducts(products, filters)` | Apply all filter dimensions + sort |
| `sortProducts(products, sort)` | Sort only |
| `getActiveFilterChips(filters)` | Derive removable chip labels for UI |
| `hasActiveFilters(filters)` | Boolean for empty-state copy |
| `DEFAULT_SHOP_FILTERS` | Initial filter state constant |

Filter state shape: `ShopFilterState` in `types/product.ts`. React wrapper: `useShopFilters()` in `hooks/use-shop-filters.ts`.

---

## Design System Layers

```
tokens.css          → CSS variables (--background, --surface, spacing, motion, z-index)
       ↓
globals.css         → @theme inline (Tailwind), utilities (.surface-glass, .transition-luxury)
       ↓
components/ui/*     → Radix + CVA primitives (Button, Dialog, Sheet, …)
       ↓
components/common/* → Container, Section, Typography, Surface, PremiumImage, MotionWrapper
       ↓
feature components → home/, shop/, product/, navigation/
```

**Do not hardcode brand strings** — import from `constants/branding.ts`.

**Do not hardcode colors in components** — use semantic tokens (`bg-surface`, `text-muted-foreground`, etc.).

---

## Animation Architecture

| Module | Role |
|--------|------|
| `lib/animations.ts` | Framer Motion `Variants` (fadeInUp, stagger, blurReveal, …) |
| `lib/motion-config.ts` | Durations, easing, `getTransition()`, `getViewportMargin()` |
| `hooks/use-reduced-motion.ts` | `prefers-reduced-motion` |
| `components/common/motion-wrapper.tsx` | `MotionWrapper`, `MotionStagger`, `MotionItem` |

**Important:** Scroll-linked transforms should use **callback** `useTransform(scrollYProgress, (p) => …)` or clamped `[0,1]` input arrays. See hotfix in `horizontal-lookbook.tsx` (no negative/out-of-range offset keys).

---

## Key User Flows

### Landing (`/`)

Composed in `app/page.tsx` — order matters for scroll narrative:

1. Hero → Collections → Featured → Horizontal Lookbook → Editorial chapters → Brand story → Best sellers → Testimonials → Newsletter

### Shop (`/shop`)

Premium editorial catalog composed in `ShopPageContent`. Filtering logic lives in `lib/shop-filters.ts`; state in `useShopFilters`.

```
ShopPageContent
├── Hero header + ShopCategoryPills
├── ShopFilterSidebar (desktop, sticky)
├── ShopFilterDrawer (mobile sheet)
├── ShopToolbar (sticky: count, sort, view toggle)
├── ShopFilterChips (active filters + clear-all)
└── ShopProductGrid
    ├── ShopProductCard × N (memoized; hover swap, badges, wishlist, compare)
    ├── useInfiniteScroll sentinel (8 items per page)
    ├── ShopEmptyState (no results)
    └── ShopQuickView (dialog)
```

**Filter dimensions:** category, search, price range, size, color, availability, brand (collection slug).

**Sort options:** newest, popular, price-asc, price-desc.

**Performance:** pure `filterProducts()` + `useMemo`; `ShopProductCard` wrapped in `memo()`; infinite scroll via `IntersectionObserver` (no virtualization library — catalog is small).

**Note:** Shop uses dedicated `ShopProductCard` — not `ProductCard` from `featured-products.tsx` (home/PDP related products still use `ProductCard`).

### Product (`/product/[slug]`)

Server page resolves product via `getProductBySlug`. `ProductPageContent` handles gallery, variants, add-to-cart.

### Cart

`CartDrawer` (sheet) opens via `useCart().openCart()` — triggered from Navbar and after `addItem`.

---

## Configuration Files

| File | Purpose |
|------|---------|
| `next.config.ts` | `images.remotePatterns` (Unsplash) |
| `tsconfig.json` | Strict TS, `@/*` paths |
| `postcss.config.mjs` | Tailwind v4 PostCSS plugin |
| `eslint.config.mjs` | Next.js ESLint flat config |
| `netlify.toml` | Build + `@netlify/plugin-nextjs` |

---

## Conventions for Contributors

1. **One component, one responsibility** — small files, named exports.
2. **Compose pages from sections** — avoid monolithic page files.
3. **Brand** → `branding.ts` only.
4. **New UI primitive** → `components/ui/` with CVA + `cn()`.
5. **New landing section** → `components/home/` + add to `app/page.tsx`.
6. **New route** → `app/<route>/page.tsx` + optional `components/<feature>/`.
7. **Client boundary** — push `"use client"` as deep as possible; keep pages as Server Components when feasible. Shop keeps skeleton/illustration as SC where possible.
8. **Images** — `next/image` or `PremiumImage`; remote URLs must match `next.config.ts`.
9. **Motion** — always respect `useReducedMotion()` for video, parallax, and infinite animations.
10. **Shop filters** — add dimensions in `types/product.ts` → `lib/shop-filters.ts` → `filter-panel.tsx` → `use-shop-filters.ts`.

---

## Build & Deploy

```bash
npm run dev        # Local development
npm run build      # Production build (SSG for products)
npm run start      # Production server
npm run lint       # ESLint
npm run typecheck  # TypeScript check
```

Netlify runs `npm run build` and publishes via the Next.js plugin. Add `.netlify` to `.gitignore` (already present).

---

## Related Documentation

- **[COMPONENT_MAP.md](./COMPONENT_MAP.md)** — exhaustive component and primitive reference
- **[FEATURES.md](./FEATURES.md)** — feature inventory
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** — deploy guide
- **[ENVIRONMENT.md](./ENVIRONMENT.md)** — environment variables

---

## Planned Extension Points

When adding backend or CMS later, prefer:

- Swap `constants/products.ts` for async data fetch in Server Components
- Keep `Product` type stable
- Move cart to server session or payment provider webhook
- Add `app/api/` routes without changing presentational components
