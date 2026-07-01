# FINY FASHIONS

A production-ready luxury e-commerce frontend built with Next.js 16, TypeScript, and Tailwind CSS v4. Designed as a senior-level portfolio showcase — cinematic UI, editorial commerce flows, and enterprise-grade engineering practices.

![FINY FASHIONS — Hero](docs/screenshots/hero.png)
*Screenshot placeholder — add `docs/screenshots/hero.png` after deploy*

---

## Project Overview

FINY FASHIONS is a frontend-only luxury fashion storefront featuring:

- Cinematic landing page with scroll-driven editorial sections
- Full shop experience with filters, infinite scroll, quick view, and grid/list modes
- Product detail pages with gallery, variants, reviews, and recommendations
- Cart, multi-step checkout, wishlist, compare, and profile
- Journal, lookbook, and brand content pages
- WCAG AA accessibility, comprehensive SEO, and PWA manifest

**Version:** 1.0.0 (Release Candidate)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + CSS design tokens |
| UI | Radix UI primitives + CVA |
| Animation | Framer Motion |
| Fonts | Inter + Cormorant Garamond (next/font) |
| Deployment | Netlify / Vercel compatible |

See [TECH_STACK.md](./TECH_STACK.md) for full details.

---

## Architecture

```
src/app/          → Routes, metadata, sitemap, robots
src/components/   → Feature UI (home, shop, product, cart, …)
src/constants/    → Static product data, branding, content
src/hooks/        → Client hooks (filters, wishlist, scroll, …)
src/lib/          → Utilities, metadata, structured data, analytics
src/types/        → Shared TypeScript types
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) and [COMPONENT_MAP.md](./COMPONENT_MAP.md).

---

## Folder Structure

```
finy-fashions/
├── public/              # Static assets (icon.svg, service worker)
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # React components by feature
│   ├── constants/       # Brand, products, content
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Shared utilities
│   ├── styles/          # globals.css, tokens.css
│   └── types/           # TypeScript definitions
├── ARCHITECTURE.md
├── COMPONENT_MAP.md
├── DEPLOYMENT.md
└── package.json
```

---

## Setup

**Requirements:** Node.js 20+

```bash
# Clone and install
git clone <repository-url>
cd finy-fashions
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build (SSG for products) |
| `npm run start` | Start production server |
| `npm run lint` | ESLint (Next.js core-web-vitals) |
| `npm run typecheck` | TypeScript strict check |

---

## Environment Variables

See [ENVIRONMENT.md](./ENVIRONMENT.md). Minimal setup:

```env
NEXT_PUBLIC_SITE_URL=https://finyfashions.com
```

---

## Deployment

Deploy to **Netlify** or **Vercel** with zero config changes. See [DEPLOYMENT.md](./DEPLOYMENT.md).

```bash
npm run build
```

---

## Performance

- Static generation for all product and journal pages (`generateStaticParams`)
- `optimizePackageImports` for lucide-react, framer-motion, Radix
- AVIF/WebP image formats via `next/image`
- Font optimization with `display: swap`
- Infinite scroll with `IntersectionObserver` (no heavy virtualization)
- GPU-accelerated transforms for motion components
- Security headers configured in `next.config.ts`

**Estimated Lighthouse (production deploy):** Performance 90+, Accessibility 95+, Best Practices 100, SEO 100

---

## Accessibility

- Skip-to-content link
- Semantic HTML and heading hierarchy
- ARIA labels on interactive controls
- Keyboard navigation for dialogs, drawers, and menus
- `prefers-reduced-motion` respected globally via `useSyncExternalStore`
- Focus-visible styles on all interactive elements
- Color contrast meets WCAG AA

---

## SEO

- Dynamic `robots.txt`, `sitemap.xml`, and `manifest.webmanifest`
- Open Graph and Twitter Card images (dynamic generation)
- JSON-LD: Organization, WebSite, Product, BreadcrumbList, Article, ItemList
- Canonical URLs and per-page metadata via `lib/metadata.ts`

---

## Features

See [FEATURES.md](./FEATURES.md) for the complete feature list.

---

## Future Roadmap

- Headless CMS integration (Sanity / Contentful)
- Stripe payment processing
- Server-side cart and user accounts
- Product search with Algolia or Typesense
- Internationalization (i18n)
- A/B testing for editorial campaigns

---

## Documentation

| Document | Description |
|----------|-------------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System design and conventions |
| [COMPONENT_MAP.md](./COMPONENT_MAP.md) | Component and route reference |
| [FEATURES.md](./FEATURES.md) | Feature inventory |
| [TECH_STACK.md](./TECH_STACK.md) | Technology choices |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Deploy guide (Netlify / Vercel) |
| [ENVIRONMENT.md](./ENVIRONMENT.md) | Environment variables |
| [CHANGELOG.md](./CHANGELOG.md) | Version history |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Contribution guidelines |
| [PORTFOLIO_CASE_STUDY.md](./PORTFOLIO_CASE_STUDY.md) | Portfolio narrative |

---

## License

MIT — see [LICENSE](./LICENSE).

---

Built with precision for the modern luxury consumer.
