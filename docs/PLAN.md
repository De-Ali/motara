# Implementation Plan — Motara Auto PWA MVP

**Date:** 2026-04-28 · **Target:** Frontend-only MVP, mock data, no backend

---

## Phase 0 — Setup (Day 1)
1. Next.js 14 App Router + TypeScript strict
2. Tailwind CSS + custom design tokens
3. ESLint + Prettier
4. PWA manifest + icons + custom service worker
5. Folder structure: `app/ components/ lib/ data/ messages/ public/`

## Phase 1 — Foundation (Day 1–2)
6. i18n provider (`<I18nProvider>`) — Context with locale + dir + messages
7. Theme provider (light/dark/system)
8. Favorites + Compare contexts (localStorage-backed)
9. Layout: Header (logo, nav, search, lang, theme, favorites count) + Footer + WhatsApp FAB
10. Global CSS: Inter + IBM Plex Sans Arabic, base tokens, RTL utilities

## Phase 2 — Mock data (Day 2)
11. `data/cars.ts` — 12 fully-detailed cars (Toyota Land Cruiser, Hilux, Camry, Nissan Patrol, Hyundai Tucson, Kia Sportage, Lexus LX, BMW X5, Mercedes E, Mazda CX-5, Mitsubishi Pajero, Honda Accord). Each with 10 image URLs (Unsplash), 50-point inspection, 4-stage repair timeline, EN+AR description.
12. `data/services.ts`, `data/blog.ts`, `data/testimonials.ts`

## Phase 3 — Components (Day 2–3)
13. `CarCard` (image, badges, specs strip, price, save, compare)
14. `FilterSidebar` (collapsible sections, sliders, chips)
15. `ImageGallery` (swipe + thumbnails + lightbox)
16. `InspectionReport` (5 categories, 50 items, status icons)
17. `RepairTimeline` (vertical timeline w/ photos)
18. `CompareDrawer` (sticky bottom, expand on click)
19. `TestDriveModal` (form w/ validation)
20. `WhatsAppFAB` + `WhatsAppButton`
21. `Stat` counter (animated)
22. `TestimonialCarousel`
23. `LanguageToggle`, `ThemeToggle`, `SaveButton`, `CompareButton`
24. `Skeleton`, `Toast`, `Badge`, `Button` primitives

## Phase 4 — Pages (Day 3–4)
25. `/` — Home with hero, search, featured cars, how-it-works, USPs, testimonials, blog teasers, CTA
26. `/cars` — listings + filter + sort + view toggle + infinite scroll (client-paginated)
27. `/cars/[slug]` — gallery + sticky CTA + tabs + related
28. `/compare` — side-by-side table, highlight diffs
29. `/about` — story, process, certifications, team
30. `/services` — 3 service cards, FAQ
31. `/blog` + `/blog/[slug]` — article list + reader
32. `/contact` — form, map embed (Muscat coords), WhatsApp/phone
33. `/favorites` — saved cars
34. `/admin` — locked stub w/ "Coming in Phase 2" + login form (UI only)
35. `/offline` — PWA offline page

## Phase 5 — PWA (Day 4)
36. `public/manifest.webmanifest`
37. `public/sw.js` — precache shell, runtime cache for images, offline fallback
38. SW registration in app
39. Apple touch icon, theme-color meta, viewport-fit
40. App icons (SVG-based, generated)

## Phase 6 — Polish (Day 4–5)
41. Framer-motion: hero fade-in, card stagger, gallery transitions, drawer slide
42. Micro-interactions: button hover lift, focus rings, ripple-free click states
43. Loading skeletons everywhere data loads
44. Empty states with illustrations (SVG)
45. Toast notifications for save/compare/copy
46. Cookie banner (EN/AR)
47. 404 page
48. RTL audit — flip every directional class
49. Lighthouse pass

## Phase 7 — Docs (Day 5)
50. README — install, run, build, structure, deploy
51. Component inventory in `/docs`

---

## Parallelization
- **Day 2:** mock data + global providers in parallel
- **Day 3:** component library + page shells in parallel
- **Day 4:** PWA + polish in parallel

## Dependencies
```
next@14, react@18, react-dom@18,
typescript, tailwindcss, postcss, autoprefixer,
framer-motion, lucide-react, clsx, tailwind-merge,
react-hook-form, zod
```

No backend deps. No DB. No auth lib. Lean.

## Acceptance gate
PRD § 9 acceptance tests all pass before declaring MVP done.

## Risks
- **Arabic typography:** verify IBM Plex Sans Arabic loads + numerals render
- **RTL leaks:** every `pl-`, `pr-`, `ml-`, `mr-` must use logical (`ps-`, `pe-`, `ms-`, `me-`)
- **Image weight:** use Next.js `<Image>` w/ priority on LCP only, lazy elsewhere
- **PWA on iOS:** test install flow, splash screens
