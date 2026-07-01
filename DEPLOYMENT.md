# FINY FASHIONS — Deployment Guide

## Prerequisites

- Node.js 20+ (see `.nvmrc`)
- Git repository connected to hosting provider
- Environment variables configured (see [ENVIRONMENT.md](./ENVIRONMENT.md))

---

## Netlify (Recommended)

This project includes `netlify.toml` with the official Next.js plugin.

### Git-based deploy

1. Push repository to GitHub/GitLab/Bitbucket
2. In Netlify: **Add new site → Import from Git**
3. Build settings (auto-detected):
   - **Build command:** `npm run build`
   - **Plugin:** `@netlify/plugin-nextjs`
4. Set environment variables:
   - `NEXT_PUBLIC_SITE_URL` → your production URL (e.g. `https://finyfashions.netlify.app`)
5. Deploy

### CLI deploy

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --build --prod
```

### Netlify configuration

```toml
[build]
  command = "npm run build"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "20"
```

---

## Vercel

1. Import repository at [vercel.com/new](https://vercel.com/new)
2. Framework preset: **Next.js** (auto-detected)
3. Set `NEXT_PUBLIC_SITE_URL` to your Vercel domain
4. Deploy

No additional configuration required. `next.config.ts` headers and image optimization work out of the box.

---

## GitHub

The repository is ready for GitHub with:

- `.gitignore` excluding `.env*`, `.next`, `.netlify`, `node_modules`
- `.env.example` for required variables
- MIT `LICENSE`

### Recommended branch protection

- Require `npm run lint`, `npm run typecheck`, and `npm run build` in CI before merge

---

## Pre-deploy Checklist

```bash
npm install
npm run lint        # 0 errors
npm run typecheck   # 0 errors
npm run build       # 42 static routes
npm run start       # smoke test locally
```

### Post-deploy verification

- [ ] Homepage loads with fonts and images
- [ ] `/shop` filters and infinite scroll work
- [ ] `/product/cashmere-overcoat` PDP renders
- [ ] Cart persists after refresh
- [ ] `/robots.txt` and `/sitemap.xml` accessible
- [ ] `/manifest.webmanifest` valid
- [ ] Open Graph preview correct (share a product URL)
- [ ] 404 page renders for unknown routes
- [ ] Security headers present (check with securityheaders.com)

---

## Caching & Headers

Security headers are set in `next.config.ts`:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: origin-when-cross-origin`
- `Permissions-Policy` (camera, microphone, geolocation disabled)

Static assets (`icon.svg`) cached for 1 year.

---

## Custom Domain

1. Add domain in hosting dashboard
2. Update `NEXT_PUBLIC_SITE_URL` to production domain
3. Redeploy for canonical URLs and sitemap to update
