# FINY FASHIONS — Environment Variables

Copy `.env.example` to `.env.local` for local development.

## Required

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata, sitemap, JSON-LD | `https://finyfashions.com` |

If unset, defaults to `https://finyfashions.com` in `src/constants/site.ts`.

## Optional — Analytics

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Google Analytics 4 measurement ID | (empty — no tracking) |
| `NEXT_PUBLIC_VERCEL_ANALYTICS` | Enable Vercel Analytics | `false` |

Analytics only initializes when at least one provider is configured. Ecommerce events (`add_to_cart`, `begin_checkout`, `purchase`) fire through `src/lib/analytics.ts`.

## Local Development

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Production (Netlify / Vercel)

Set variables in the hosting dashboard under **Site settings → Environment variables**.

**Never commit `.env.local` or files containing secrets.**
