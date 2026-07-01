# FINY FASHIONS — Component Map

Reference for every route, component, hook, and shared primitive. Use this to navigate the codebase quickly in future sessions.

**Legend**

- **SC** — Server Component (no `"use client"`)
- **CC** — Client Component (`"use client"`)
- **UI** — Design-system primitive (`components/ui/`)

---

## Routes (`src/app/`)

| File | Type | Exports | Notes |
|------|------|---------|-------|
| `layout.tsx` | SC | `RootLayout`, `metadata` | Fonts (Inter, Cormorant), `AppProviders`, `SiteLayout`, imports `globals.css` |
| `page.tsx` | SC | `HomePage` | Composes all `components/home/*` sections |
| `not-found.tsx` | SC | `NotFound` | Branded 404 |
| `shop/page.tsx` | SC | `ShopPage`, `metadata` | Wraps `ShopPageContent` in `Suspense`; editorial `ShopLoading` skeleton fallback |
| `product/[slug]/page.tsx` | SC | `ProductPage`, `generateStaticParams`, `generateMetadata` | SSG per product slug |
| `icon.tsx` | SC | default | Favicon (ImageResponse) |
| `apple-icon.tsx` | SC | default | Apple touch icon |

### Page → Component Tree

```
/ (page.tsx)
├── HeroSection
├── FeaturedCollections
├── FeaturedProducts
├── HorizontalLookbook
├── EditorialStorySection
├── BrandStory
├── BestSellers
├── Testimonials
└── NewsletterSection

/shop (shop/page.tsx)
├── ShopPageContent
│   ├── ShopCategoryPills
│   ├── ShopFilterSidebar → FilterPanel
│   ├── ShopFilterDrawer → FilterPanel
│   ├── ShopToolbar → ShopSortDropdown
│   ├── ShopFilterChips
│   └── ShopProductGrid
│       ├── ShopProductCard × N
│       ├── ShopLoadingSkeleton (sentinel)
│       ├── ShopEmptyState → NoResultsIllustration
│       └── ShopQuickView

/product/[slug] (product/[slug]/page.tsx)
└── ProductPageContent { product }
```

---

## Providers (`src/components/providers/`)

| Component | Type | Purpose | Children / API |
|-----------|------|---------|----------------|
| `app-providers.tsx` | CC | Root provider stack | `ThemeProvider` → `CartProvider` |
| `theme-provider.tsx` | CC | Dark/light mode | Wraps `next-themes`; `attribute="class"` |
| `cart-provider.tsx` | CC | Cart state + persistence | Exports `CartProvider`, `useCart()` |

### `useCart()` API

| Member | Description |
|--------|-------------|
| `items`, `itemCount`, `subtotal` | Cart data |
| `isOpen` | Drawer visibility |
| `addItem(product, color, size, qty?)` | Adds line item; opens drawer |
| `removeItem`, `updateQuantity`, `clearCart` | Mutations |
| `openCart`, `closeCart`, `toggleCart` | Drawer controls |

---

## Layout (`src/components/layout/`)

| Component | Type | Purpose | Used by |
|-----------|------|---------|---------|
| `site-layout.tsx` | SC | Global shell | `app/layout.tsx` |
| `footer.tsx` | CC | Footer + newsletter + social | `SiteLayout` |

### `SiteLayout` children (in order)

1. Background bloom + noise (decorative)
2. `LoadingScreen`
3. `ScrollIndicator`
4. `Navbar`
5. `<main>{children}</main>`
6. `Footer`
7. `CartDrawer`
8. `BackToTop`

---

## Navigation (`src/components/navigation/`)

| Component | Type | Purpose | Key dependencies |
|-----------|------|---------|----------------|
| `navbar.tsx` | CC | Fixed header, logo, nav, cart/wishlist badges | `Logo`, `MegaMenu`, `SearchDialog`, `MobileMenu`, `useCart`, `useWishlist` |
| `mega-menu.tsx` | CC | Desktop dropdown for nav items with children | `MAIN_NAV` |
| `search-dialog.tsx` | CC | Command-style product search modal | `PRODUCTS`, `Dialog`, `Input` |
| `mobile-menu.tsx` | CC | Slide-in mobile nav | `MAIN_NAV` |

---

## Cart (`src/components/cart/`)

| Component | Type | Purpose | Notes |
|-----------|------|---------|-------|
| `cart-drawer.tsx` | CC | Right sheet cart | Exports `CartDrawer`, `CartItemRow` |

---

## Home — Landing (`src/components/home/`)

| Component | Type | Purpose |
|-----------|------|---------|
| `hero-section.tsx` | CC | Full-viewport hero: video fallback, split layout, floating product cards, text reveal, scroll hint |
| `featured-collections.tsx` | CC | Editorial collection cards (horizontal split image + copy) |
| `featured-products.tsx` | CC | Editor's selection grid; exports **`ProductCard`** (home + PDP related) |
| `horizontal-lookbook.tsx` | CC | Pinned horizontal scroll lookbook; exports `HorizontalLookbook`, `LookbookSection` |
| `editorial-story-section.tsx` | CC | Three alternating editorial chapters |
| `brand-story-section.tsx` | CC | Timeline, quote block, layered imagery |
| `best-sellers-section.tsx` | CC | Premium cards: image swap, labels, quick actions |
| `testimonials-carousel.tsx` | CC | Auto-advancing testimonial carousel |
| `newsletter-section.tsx` | CC | Premium signup with trust indicators |
| `text-reveal.tsx` | CC | `TextReveal`, `LineReveal` animation helpers |
| `parallax-layer.tsx` | CC | `ParallaxLayer`, `ScrollParallax` scroll-driven Y transform |

### Home-only helpers (not exported to other features)

- `text-reveal.tsx`, `parallax-layer.tsx` — prefer reusing for new editorial sections
- `LookbookSection` in `horizontal-lookbook.tsx` — alias for `HorizontalLookbook`

---

## Shop (`src/components/shop/`)

Premium editorial catalog (Phase 3). Orchestrated by `shop-page-content.tsx`; filter logic in `lib/shop-filters.ts` + `useShopFilters`.

| Component | Type | Purpose |
|-----------|------|---------|
| `shop-page-content.tsx` | CC | Page orchestrator: header, pills, sidebar, drawer, toolbar, chips, grid |
| `filter-panel.tsx` | CC | Shared filter UI (search, category, price, size, color, availability, brand) |
| `shop-filter-sidebar.tsx` | CC | Sticky desktop sidebar wrapping `FilterPanel` |
| `shop-filter-drawer.tsx` | CC | Mobile left sheet with scrollable `FilterPanel` |
| `shop-filter-chips.tsx` | CC | Active filter chips, summary count, clear-all |
| `shop-category-pills.tsx` | CC | Animated category pills (`layoutId` motion) |
| `shop-price-slider.tsx` | CC | Luxury dual-thumb price range with animated values |
| `shop-sort-dropdown.tsx` | CC | Animated sort menu (Radix `DropdownMenu`) |
| `shop-toolbar.tsx` | CC | Sticky toolbar: filter button, animated count, sort, grid/list toggle |
| `shop-product-card.tsx` | CC | Memoized card: hover image swap, badges, wishlist, compare, quick view |
| `shop-product-grid.tsx` | CC | Grid/list layout, infinite scroll, empty state, quick view host |
| `shop-quick-view.tsx` | CC | Quick View dialog: image, variants, add-to-bag |
| `shop-empty-state.tsx` | CC | No-results state with CTA |
| `shop-no-results-illustration.tsx` | SC | Inline SVG illustration for empty state |
| `shop-loading-skeleton.tsx` | SC | Editorial product grid skeleton (grid + list variants) |

### Shop data flow

```
URL params (category, sort) ──on mount──► useShopFilters
                                              │
constants/PRODUCTS ─────────────► lib/shop-filters.filterProducts()
                                              │
                                              ▼
                                    filteredProducts (memoized)
                                              │
                         ┌────────────────────┼────────────────────┐
                         ▼                    ▼                    ▼
                 ShopProductGrid      ShopFilterChips        ShopToolbar count
                         │
              useInfiniteScroll (8/page)
                         │
                 ShopProductCard
```

**Does not use** `ProductCard` from `featured-products.tsx` — shop has its own premium card.

---

## Product (`src/components/product/`)

| Component | Type | Purpose |
|-----------|------|---------|
| `product-page-content.tsx` | CC | PDP: bento gallery, sticky purchase card, accordion, related products |

---

## Common — Shared (`src/components/common/`)

| Component | Type | Purpose | Key props |
|-----------|------|---------|-----------|
| `container.tsx` | SC | Max-width wrapper + horizontal padding | `size`: narrow \| default \| wide \| full; `asGrid` |
| `section.tsx` | SC | Page section with optional header | `eyebrow`, `title`, `description`, `action`, `spacing`, `background`, `containerized` |
| `section-header.tsx` | SC | Eyebrow + title + description + CTA row | `align`: left \| center; exports `SectionLinkAction` |
| `typography.tsx` | SC | `Display`, `Heading`, `Subheading`, `Eyebrow`, `Lead`, `Body`, `Caption` | `as` for heading level |
| `grid.tsx` | SC | `Grid`, `GridItem` | 12-column helpers |
| `surface.tsx` | SC | Surface variants | `variant`: primary \| elevated \| muted \| bordered \| glass |
| `premium-image.tsx` | CC | Image with shimmer, zoom-on-hover, optional overlay | `aspectRatio`, `rounded`, `zoomOnHover` |
| `motion-wrapper.tsx` | CC | Scroll-triggered motion | `MotionWrapper`, `MotionStagger`, `MotionItem`; variants: fade, fadeUp, scale, blur, image, text, slide* |
| `logo.tsx` | CC | FINY / FASHIONS wordmark | `size`, `showSubtitle`, `animated`, `variant` |
| `loading-screen.tsx` | CC | Initial load overlay with logo animation | Auto-dismisses ~2.2s |
| `scroll-indicator.tsx` | CC | Top progress bar tied to scroll | Uses `useScrollProgress` |
| `back-to-top.tsx` | CC | Floating scroll-to-top button | Appears after 600px scroll |
| `theme-toggle.tsx` | CC | Light/dark toggle | `useTheme` |
| `marquee.tsx` | CC | Infinite horizontal marquee | `speed`, `reverse` |
| `social-icons.tsx` | SC | SVG icons + `SOCIAL_ICONS` config | Instagram, Pinterest, X, TikTok |

---

## UI Primitives (`src/components/ui/`)

All use `cn()` from `@/lib/utils` and design tokens. Radix primitives where noted.

| Component | Type | Radix / CVA | Variants / notes |
|-----------|------|-------------|------------------|
| `button.tsx` | SC | Slot + CVA | default, secondary, outline, ghost, link, text, luxury, champagne, **cta**; sizes: sm, default, lg, icon, xl |
| `input.tsx` | SC | — | Rounded input with focus ring |
| `badge.tsx` | SC | CVA | default, secondary, outline, champagne, muted |
| `card.tsx` | SC | CVA | default, elevated, muted, ghost; `interactive` hover lift |
| `dialog.tsx` | CC | Dialog | Modal overlay + content |
| `sheet.tsx` | CC | Dialog (side panel) | `side`: top \| bottom \| left \| right |
| `accordion.tsx` | CC | Accordion | Collapsible sections |
| `slider.tsx` | CC | Slider | Range input |
| `switch.tsx` | CC | Switch | Toggle |
| `separator.tsx` | SC | Separator | Horizontal / vertical |
| `scroll-area.tsx` | CC | ScrollArea | Custom scrollbar |
| `skeleton.tsx` | SC | — | Pulse / shimmer loading block |
| `dropdown-menu.tsx` | CC | DropdownMenu | Sort menu, future action menus |

**Cart drawer** uses `Sheet`. **Search** and **Quick View** use `Dialog`. **Mobile shop filters** use `Sheet`.

---

## Hooks (`src/hooks/`)

| Hook | Type | File | Purpose |
|------|------|------|---------|
| `useCart` | CC | `use-cart.ts` | Re-export from `cart-provider.tsx` |
| `useWishlist` | CC | `use-wishlist.ts` | `wishlist`, `count`, `isWishlisted`, `toggleWishlist` |
| `useCompare` | CC | `use-compare.ts` | `compareList`, `count`, `isCompared`, `toggleCompare` (max 4) |
| `useShopFilters` | CC | `use-shop-filters.ts` | Shop filter state + memoized `filteredProducts`, chip helpers |
| `useInfiniteScroll` | CC | `use-infinite-scroll.ts` | `IntersectionObserver` pagination; `visibleCount`, `sentinelRef` |
| `useReducedMotion` | CC | `use-reduced-motion.ts` | `prefers-reduced-motion` |
| `useMediaQuery` | CC | `use-media-query.ts` | Generic media query + `useIsMobile`, `useIsTablet`, `useLocalStorage` |
| `useScrollProgress` | CC | `use-scroll-progress.ts` | Scroll progress 0–1, `useScrollDirection` |

### `useShopFilters()` API

| Member | Description |
|--------|-------------|
| `filters` | Current `ShopFilterState` |
| `filteredProducts` | Memoized filtered + sorted `Product[]` |
| `activeChips` | `ActiveFilterChip[]` for chip UI |
| `isFiltered` | Whether any non-default filters are active |
| `setCategory`, `setSearch`, `setPriceRange`, `setSort` | Scalar setters |
| `toggleSize`, `toggleColor`, `toggleBrand` | Multi-select toggles |
| `setAvailability` | `"all"` \| `"in-stock"` \| `"sold-out"` |
| `removeChip`, `clearAll` | Chip removal and full reset |

---

## Lib (`src/lib/`)

| Module | Purpose |
|--------|---------|
| `utils.ts` | `cn()`, `formatPrice()`, `slugify()` |
| `animations.ts` | Framer Motion variant objects |
| `motion-config.ts` | Token-aligned durations; `getTransition()`, `getViewportMargin()` |
| `metadata.ts` | `baseMetadata`, `createPageMetadata()` |
| `shop-filters.ts` | `filterProducts()`, `sortProducts()`, `getActiveFilterChips()`, `DEFAULT_SHOP_FILTERS` |

---

## Constants (`src/constants/`)

| File | Contents |
|------|----------|
| `branding.ts` | **Brand SSOT** — name, tagline, newsletter, empty states, storage keys (`cart`, `wishlist`, `compare`), hero copy |
| `site.ts` | `CURRENCY`, `FREE_SHIPPING_THRESHOLD`; re-exports branding |
| `navigation.ts` | `MAIN_NAV`, `FOOTER_NAV`, `FOOTER_SECTION_LABELS`, `NavItem` type |
| `products.ts` | `PRODUCTS`, `CATEGORIES`, `BRANDS`, `SHOP_MAX_PRICE`, `getShopFilterOptions()`, `isProductInStock()`, getter helpers |
| `home-content.ts` | Editorial chapters, lookbook slides, timeline, hero video URL, testimonials copy |

---

## Types (`src/types/`)

| File | Exports |
|------|---------|
| `product.ts` | `Product`, `ProductColor`, `ProductSize`, `ProductFilters`, `ShopFilterState`, `SortOption`, `AvailabilityFilter`, `ActiveFilterChip`, `ViewMode` |
| `cart.ts` | `CartItem`, `CartState`, `CartContextValue` |
| `index.ts` | Barrel re-export |

---

## Styles (`src/styles/`)

| File | Role |
|------|------|
| `tokens.css` | Semantic CSS variables (color, spacing, radius, shadow, motion, z-index) |
| `globals.css` | Tailwind `@theme`, base styles, utilities (`.surface-glass`, `.bg-noise`, `.transition-luxury`), keyframes |

---

## Dependency Graph (simplified)

```
app/layout
  └── AppProviders
        └── SiteLayout
              ├── navigation/navbar → common/logo, ui/button, cart (via useCart)
              ├── layout/footer → common/logo, marquee, social-icons
              ├── cart/cart-drawer → ui/sheet, providers/cart
              └── pages
                    ├── home/* → common/*, ui/*, constants/home-content
                    ├── shop/* → lib/shop-filters, hooks/use-shop-filters, ui/dialog, ui/sheet, ui/dropdown-menu
                    └── product/* → home/featured-products (ProductCard), ui/accordion
```

---

## Cross-Feature Reuse

| Shared export | Defined in | Consumed by |
|---------------|------------|-------------|
| `ProductCard` | `home/featured-products.tsx` | `featured-products`, `product-page-content` (related) |
| `ShopProductCard` | `shop/shop-product-card.tsx` | `shop-product-grid` only |
| `FilterPanel` | `shop/filter-panel.tsx` | `shop-filter-sidebar`, `shop-filter-drawer` |
| `useCart` | `providers/cart-provider.tsx` | `navbar`, `cart-drawer`, `product-page-content`, `shop-quick-view` |
| `useWishlist` | `hooks/use-wishlist.ts` | `navbar`, `featured-products`, `best-sellers`, `shop-product-card` |
| `useCompare` | `hooks/use-compare.ts` | `shop-product-card` |
| `useShopFilters` | `hooks/use-shop-filters.ts` | `shop-page-content` |
| `filterProducts` | `lib/shop-filters.ts` | `use-shop-filters` |
| `Section` + `SectionHeader` | `common/section.tsx` | Most home sections, shop header area, product related |
| `PremiumImage` | `common/premium-image.tsx` | Collections, featured, editorial, product gallery, shop quick view |
| `MotionWrapper` / `MotionStagger` | `common/motion-wrapper.tsx` | Home sections, product related |

---

## Adding New Components — Quick Checklist

| Need | Location |
|------|----------|
| New button variant | `ui/button.tsx` (CVA) |
| New landing section | `home/<name>.tsx` + `app/page.tsx` |
| New global UI behavior | `layout/site-layout.tsx` or `navigation/navbar.tsx` |
| New product field | `types/product.ts` + `constants/products.ts` |
| New shop filter dimension | `types/product.ts` → `lib/shop-filters.ts` → `filter-panel.tsx` → `use-shop-filters.ts` |
| New brand string | `constants/branding.ts` only |
| New animation variant | `lib/animations.ts` + optional `motion-wrapper.tsx` map |

---

## File Count Summary

| Area | Files |
|------|-------|
| `app/` | 7 |
| `components/` | 65 |
| `hooks/` | 8 |
| `lib/` | 5 |
| `constants/` | 5 |
| `types/` | 3 |
| `styles/` | 2 |

*Last aligned with codebase after Phase 3 (Premium Shop Experience).*
