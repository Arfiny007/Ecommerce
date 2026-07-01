# Changelog

All notable changes to FINY FASHIONS are documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [1.0.0] — 2026-07-01 — Release Candidate (RC-1)

### Added

- Complete luxury e-commerce frontend (shop, PDP, cart, checkout, wishlist, compare)
- 42 routes including journal, lookbook, support, and legal pages
- JSON-LD structured data (Organization, WebSite, Product, Breadcrumb, Article, ItemList)
- Dynamic Open Graph and Twitter Card images
- GA4 ecommerce event tracking (add to cart, begin checkout, purchase)
- Production documentation suite (README, ARCHITECTURE, DEPLOYMENT, etc.)
- `typecheck` script and Node 20 engine requirement
- Article schema on journal pages

### Changed

- Package renamed to `finy-fashions`, version bumped to 1.0.0
- ESLint migrated to flat config with `eslint-config-next/core-web-vitals`
- `useReducedMotion` refactored to `useSyncExternalStore` (no effect setState)
- `useLocalStorage` uses lazy initialization (no hydration effect)
- Netlify config updated for Next.js plugin (removed manual publish dir)

### Fixed

- Duplicate `OrderSummary` rendering on checkout (mobile/desktop split)
- Conditional `React.useId()` hook violation in `FloatingLabelInput`
- React Hooks lint errors across theme toggle, loading screen, shop filters
- Stale ESLint disable in `json-ld.tsx`

### Removed

- Dead code: `InstagramGallery`, `ParallaxLayer`, `Grid`/`GridItem`
- Unused barrel exports: `hooks/use-cart.ts`, `types/index.ts`
- Unused lib exports: `slugify`, `getSpring`, `fadeInDown`, `hoverLift`, `defaultTransition`
- Unused hooks: `useMediaQuery`, `useIsMobile`, `useIsTablet`
- Analytics placeholder comments and dead Vercel init stub

---

## [0.1.0] — Pre-RC development phases

Initial feature development across Phases 1–8: design system, landing, shop, PDP, cart, checkout, content pages, motion system, and SEO foundation.
