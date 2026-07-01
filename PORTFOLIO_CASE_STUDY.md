# FINY FASHIONS — Portfolio Case Study

## The Challenge

Design and engineer a luxury fashion e-commerce experience that feels editorial, not transactional — while demonstrating senior-level frontend architecture, performance engineering, and production readiness suitable for public deployment and recruiter review.

## Approach

### 1. Architecture First

Chose Next.js 16 App Router with a strict Server/Client component boundary. Pages are Server Components; interactivity is pushed to leaf client components. Product and journal routes use `generateStaticParams` for build-time SSG.

### 2. Design System Over One-offs

Built a layered system: CSS tokens → Tailwind theme → Radix primitives → feature components. Every color, spacing, and motion value flows from `tokens.css`, ensuring consistency without a component library lock-in.

### 3. Motion as Craft, Not Decoration

Framer Motion powers page transitions, scroll reveals, and magnetic interactions — all gated by `useSyncExternalStore` for `prefers-reduced-motion`. Animation variants live in `lib/animations.ts` with shared easing curves.

### 4. Commerce Without Backend

Implemented a complete shopping flow (catalog → PDP → cart → checkout) with `localStorage` persistence and pure filter functions in `lib/shop-filters.ts`. The architecture is ready for a headless CMS and payment API swap without rewriting UI.

### 5. Production Engineering

- Security headers, no exposed secrets
- JSON-LD for rich search results
- Dynamic OG images for social sharing
- GA4 ecommerce abstraction (opt-in via env vars)
- ESLint + TypeScript strict with zero errors
- PWA manifest and service worker registration

## Key Technical Decisions

| Decision | Rationale |
|----------|-----------|
| Static product data | Portfolio scope; types and helpers designed for async swap |
| `useSyncExternalStore` for media queries | Eliminates effect-based setState; React 19 compliant |
| Pure filter functions | Testable, memoizable, no React in business logic |
| Netlify + Vercel dual deploy | Maximum hosting flexibility for portfolio |
| No CSS-in-JS | Tailwind v4 + tokens = smaller bundle, better DX |

## Metrics (Estimated Production)

| Lighthouse Category | Score |
|---------------------|-------|
| Performance | 90–95 |
| Accessibility | 95–100 |
| Best Practices | 100 |
| SEO | 100 |

## What This Demonstrates

- **Modern React patterns** — Server Components, Suspense, streaming-ready layout
- **Component system design** — 140+ components, clear boundaries, reusable primitives
- **UX craftsmanship** — Multi-step checkout, quick view, infinite scroll, theme toggle
- **Accessibility** — Skip nav, ARIA, keyboard traps, reduced motion
- **SEO** — Full metadata, structured data, sitemap, robots
- **Documentation** — Architecture, component map, deployment guide
- **Maintainability** — Strict TypeScript, linted, dead code removed, v1.0.0 release

## Live Demo

Deploy with one click to Netlify or Vercel. Set `NEXT_PUBLIC_SITE_URL` and share.

---

*FINY FASHIONS v1.0.0 — Built as a release candidate, not a prototype.*
