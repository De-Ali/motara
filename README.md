# Motara Auto · مطرة للسيارات

> Bilingual (EN/AR · RTL) Progressive Web App for Oman's most transparent certified used-car dealership. Frontend MVP — no backend.

**🌐 Live demo:** https://de-ali.github.io/motara/
**🔐 Admin preview:** https://de-ali.github.io/motara/admin/login (any credentials work — mock auth)

[Docs: BRD](docs/BRD.md) · [PRD](docs/PRD.md) · [Implementation Plan](docs/PLAN.md)

---

## What's inside

A production-ready frontend MVP covering the full Phase 1–2 scope from the strategy document:

- **Bilingual** EN/AR with full RTL flip at the `<html>` level
- **9 public pages** + admin stub + offline page + 404
- **12 fully-detailed mock cars** with 50-point inspection reports, repair timelines, 10-image galleries, EN+AR copy
- **Modern interactive design** — gradient hero, glass-morphism header, framer-motion micro-animations, hover lifts, animated counters, lightbox gallery
- **PWA** — installable manifest, service worker (network-first HTML, stale-while-revalidate assets), maskable icons, offline page
- **Trust-first car detail** — inspection accordion w/ photos, repair timeline, warranty card, scarcity signal, sticky WhatsApp/call/test-drive CTAs
- **Compare drawer** — sticky bottom drawer, up to 3 cars, side-by-side table with diff highlighting
- **Favorites** — localStorage-backed, count badge in header, dedicated `/favorites` page
- **Test drive booking** — react-hook-form + zod validation modal
- **Filter sidebar** — make, body, fuel, transmission, price/year/mileage range sliders
- **Theme toggle** light/dark, system default
- **Accessibility** — WCAG 2.1 AA-aimed: focus rings, keyboard nav, reduced-motion respected, semantic HTML

## Tech stack

| | |
|--|--|
| Framework | Next.js 14 (App Router) + React 18 |
| Language | TypeScript strict |
| Styling | Tailwind CSS + custom tokens, RTL via logical properties |
| Animation | framer-motion |
| Icons | lucide-react |
| Forms | react-hook-form + zod |
| State | React Context + localStorage (i18n, theme, favorites, compare, toast) |
| PWA | manual `manifest.webmanifest` + custom `sw.js` |
| Data | local TS modules (`/data/*.ts`) — 12 cars, 4 testimonials, 3 blog posts |

No backend, no auth, no DB. Per scope.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build && npm start    # production
npm run lint
npm run type-check
```

PWA install prompts appear in the **production build only** (the SW is gated to `NODE_ENV=production`).

## Project structure

```
motara/
├─ app/                    Next.js App Router pages
│  ├─ layout.tsx           Root layout, fonts, providers, header/footer
│  ├─ page.tsx             Home
│  ├─ providers.tsx        Theme + i18n + Store + Toast
│  ├─ cars/page.tsx        Listings (filter, sort, grid/list)
│  ├─ cars/[slug]/page.tsx Car detail
│  ├─ compare/page.tsx     Side-by-side comparison
│  ├─ about/page.tsx       Story + team + certs
│  ├─ services/page.tsx    Services + FAQ
│  ├─ blog/                Blog index + post
│  ├─ contact/page.tsx     Contact + map
│  ├─ favorites/page.tsx   Saved cars
│  ├─ admin/page.tsx       Locked Phase-2 stub
│  ├─ offline/page.tsx     PWA offline fallback
│  └─ not-found.tsx        404
├─ components/             19 reusable components
├─ lib/                    types, utils, i18n, theme, store, toast
├─ data/                   cars, blog, testimonials, inspection template
├─ messages/               en.json, ar.json (full string tables)
├─ public/                 manifest, sw.js, icons (192/512/maskable/apple), og.jpg, robots
├─ docs/                   BRD.md, PRD.md, PLAN.md
└─ tailwind.config.ts      Brand tokens, animations, gradients
```

## Bilingual / RTL

Toggle EN ↔ AR from the header (or via the `Languages` button on mobile). The toggle:

1. Updates React Context + writes `motara.locale` to localStorage
2. Sets `<html lang>` and `<html dir>` to flip the entire layout
3. Switches font family between Inter (Latin) and IBM Plex Sans Arabic
4. Re-renders strings via the `useT()` hook keyed off `messages/{en|ar}.json`

All Tailwind directional classes use logical properties (`ps-`, `pe-`, `start-`, `end-`) so they mirror automatically. Icons that imply direction get `.rtl-flip` to mirror via CSS transform.

## PWA

- `public/manifest.webmanifest` — installable name, icons (192, 512, maskable, apple-touch), shortcuts to Cars + Favorites
- `public/sw.js` — versioned cache, network-first for navigations with offline fallback to `/offline`, stale-while-revalidate for same-origin and Unsplash images
- `components/RegisterSW.tsx` — registers the SW on `load` in production only
- `app/offline/page.tsx` — graceful offline page

To verify: `npm run build && npm start`, open Chrome DevTools → Application → Manifest, then "Install app" or use the address-bar install icon.

## Mock data

`data/cars.ts` exports 12 hand-crafted Toyota / Nissan / Hyundai / Kia / Lexus / BMW / Mercedes / Mazda / Mitsubishi / Honda listings. Each has:

- 10 Unsplash gallery images
- Realistic OMR pricing for the Oman market
- Bilingual (en/ar) `description`, `color`, `origin`, `location`, and `features`
- A 50-point inspection report (5 categories, deterministic per-car) generated by `data/inspection-template.ts`
- A 4-stage repair timeline with photos
- One of: Available · Reserved · Sold

When wiring a real backend later, replace `data/cars.ts` with API calls — the `Car` type in `lib/types.ts` is the contract.

## What's intentionally out of scope (per BRD)

- Backend, real auth, payments (Phase 2/3 of strategy)
- Seller onboarding (Phase 2)
- Financing calculator, insurance quotes (Phase 4)
- React Native app (Year 2)

## Acceptance — PRD § 9

| # | Test | Status |
|---|------|--------|
| 1 | Language toggle flips entire UI EN↔AR with `dir` | ✅ |
| 2 | Filter `make=Toyota` + `priceMax=8000` returns matching cars | ✅ |
| 3 | 4th compare attempt → toast `max 3` | ✅ |
| 4 | WhatsApp link works on every car detail | ✅ |
| 5 | Save favorite, refresh, count badge persists | ✅ |
| 6 | Inspection tab renders 50 items in 5 categories with photos | ✅ |
| 7 | PWA installable (manifest valid, SW registers in prod) | ✅ |
| 8 | Offline visit shows shell + offline page | ✅ |
| 9 | Keyboard nav with visible focus rings | ✅ |
| 10 | Production build green, all 13 routes prerendered | ✅ |

## Design notes

- **Brand:** deep teal (`#0F4C5C`) for trust + Omani-warm orange (`#E36414`) for action, on warm-white (`#F8F7F4`)
- **Typography:** Inter for Latin, IBM Plex Sans Arabic for Arabic (auto-swapped via `dir`)
- **Motion:** 200–400ms ease-out, framer-motion staggered cards on viewport-enter, hover lift on cards, scale-in modals
- **WhatsApp-first:** persistent FAB bottom-right (auto-flips to bottom-left in RTL via CSS logical), every car detail has WhatsApp + Call + Test Drive CTAs
- **Trust strip:** ROP / VAT / Trade License chips in the footer, "Motara Verified" badge on every car

## License

Proprietary · © 2026 Motara Auto · Confidential.

---

**Built by:** Shuneria · Mobile Apps, Web & AI Automation
