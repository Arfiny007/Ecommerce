# Contributing to FINY FASHIONS

Thank you for your interest in contributing. This project is structured for clarity and maintainability.

---

## Development Setup

```bash
git clone <repository-url>
cd finy-fashions
npm install
cp .env.example .env.local
npm run dev
```

## Quality Gates

Before submitting changes, ensure all pass:

```bash
npm run lint
npm run typecheck
npm run build
```

## Code Conventions

1. **TypeScript strict** — no `any`, no `@ts-ignore`
2. **Brand strings** — import from `src/constants/branding.ts` only
3. **Colors** — use semantic tokens from `tokens.css`, not hardcoded hex
4. **Client boundaries** — add `"use client"` only when needed (hooks, motion, events)
5. **Motion** — always respect `useReducedMotion()`
6. **Images** — use `next/image` or `PremiumImage`; add remote domains to `next.config.ts`
7. **One component per file** — named exports, focused responsibility
8. **No console.log** in production code

## File Organization

| Adding… | Location |
|---------|----------|
| New route | `src/app/<route>/page.tsx` |
| Landing section | `src/components/home/` |
| Shop feature | `src/components/shop/` |
| UI primitive | `src/components/ui/` |
| Shared hook | `src/hooks/` |
| Pure utility | `src/lib/` |
| Static content | `src/constants/` |

## Pull Request Process

1. Create a feature branch from `main`
2. Make focused changes (avoid unrelated refactors)
3. Update documentation if adding routes or features
4. Ensure lint, typecheck, and build pass
5. Open PR with clear description and test plan

## Commit Messages

Use imperative mood, concise summary:

```
Add size filter to shop toolbar
Fix checkout order summary on mobile
Update product schema for sale prices
```

## Questions

Open an issue for architectural questions before large changes.
