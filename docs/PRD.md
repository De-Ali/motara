# Product Requirements Document (PRD)
## Motara Auto · Progressive Web App — MVP

**Version:** 1.0 · **Date:** 2026-04-28
**Linked BRD:** [BRD.md](./BRD.md)

---

## 1. Product Vision

A Progressive Web App that **sells trust as a product**. Every screen reinforces: *Motara cars are inspected, documented, repaired transparently, and warrantied.* The site converts browsers to WhatsApp conversations within 30 seconds.

---

## 2. Personas

| Persona | Profile | Primary device | Language | Key need |
|---------|---------|----------------|----------|----------|
| **Khalid** — Omani local, 32 | Government employee, second-time buyer | Android, Samsung Internet | Arabic | Trust, fair financing, family-size SUV |
| **Priya** — Indian expat, 28 | Software engineer, first car in Oman | iPhone | English | Reliable, low mileage, English-speaking sales |
| **Ahmed** — Used-car dealer (Phase 2) | Wants to list 5–25 cars | Desktop + mobile | Arabic | List management, lead access |
| **Operator** — Motara admin | Manages inventory + inquiries | Desktop | Bilingual | Speed, photo upload, lead status |

---

## 3. Information Architecture

```
/                        Home
/cars                    Listings (filter + grid/list)
/cars/[slug]             Car detail
/compare                 Side-by-side (up to 3)
/about                   Story + import/repair process + certifications
/services                Import · Repair · Warranty plans
/blog                    Editorial (SEO content)
/blog/[slug]             Article
/contact                 WhatsApp · phone · map · form
/admin                   Stub (locked, "Phase 1")
```

Bilingual routing handled via locale toggle (`?lang=ar` / `?lang=en`) with localStorage persistence. Direction (`dir="rtl"` / `dir="ltr"`) flips at the `<html>` level.

---

## 4. Functional Requirements

### 4.1 Home page
- **Hero:** large bilingual headline, search bar (make / max price / year), trust badges (Inspected · Warranted · ROP-registered)
- **Stats strip:** cars sold · 50-point inspections · happy customers · years of expertise
- **Featured cars:** 6 cards, "View all" CTA
- **How it works:** 4-step visual (Source → Inspect → Repair → Deliver)
- **Why Motara:** 6 USPs with icons
- **Customer testimonials:** carousel, 3+ entries with photos
- **Latest from blog:** 3 articles
- **CTA band:** "Find your car" + WhatsApp

### 4.2 Car listings (`/cars`)
- **Filter sidebar (sticky):** make, model, body type, price range slider (OMR), year range, mileage range, fuel, transmission, color
- **Sort:** newest · price asc/desc · mileage asc · year desc
- **View toggle:** grid / list
- **Pagination or infinite scroll:** infinite scroll (mobile-friendly)
- **Active filter chips** above results, dismissable
- **Results count + "Reset filters"**
- **Empty state** with suggestion to clear filters

### 4.3 Car detail (`/cars/[slug]`)
- **Image gallery:** ≥10 photos, swipeable on mobile, lightbox on desktop, thumbnail strip
- **Title block:** make · model · year · trim · price (prominent OMR), badges
- **Quick specs grid:** mileage · fuel · transmission · body · color · seats · engine
- **Sticky action bar (mobile):** WhatsApp · Call · Save · Compare
- **Tabs:** Overview · Specifications · **50-Point Inspection** · Repair History · Warranty · Location
- **Inspection report:** structured visual checklist (Exterior 12, Interior 10, Mechanical 15, Electrical 8, Road test 5), each item with status icon (pass/repaired/note) + photo where applicable
- **Repair history timeline:** stages with photos (received → diagnosis → repair → final)
- **Warranty card:** 3-month basic / 6-month plus, what's covered
- **Trust strip:** Motara Verified · ROP # · VAT cert
- **Scarcity:** "X people inquired this week"
- **Related cars:** 4 similar
- **Test drive booking modal:** name, phone, preferred date/time, notes

### 4.4 Compare (`/compare`)
- Up to **3 cars** side-by-side
- Persistent compare drawer at bottom of screen during navigation (collapsible)
- Categories: photos · price · year · mileage · engine · fuel · transmission · body · features · inspection score
- Highlight differing values
- Remove/add cars inline

### 4.5 Cross-cutting
- **Language toggle** in header (EN ↔ AR), instant flip with `dir` attribute change
- **Theme toggle** (light/dark), system default initially
- **WhatsApp FAB** bottom-right (bottom-left in RTL) on every page
- **Favorites:** heart icon, localStorage, count badge in header, `/favorites` view
- **Search:** global search modal (⌘K / button)
- **Skeleton loaders** for car cards, gallery, inspection report
- **Toasts** for actions (saved, removed, copied)
- **Cookie banner** (EN/AR), localStorage consent

### 4.6 PWA requirements
- `manifest.json` with name, short_name, icons (192, 512, maskable), theme_color, background_color, display=standalone, start_url, scope
- Service worker: precache app shell + offline fallback page
- iOS-specific apple-touch-icon, splash screens
- Installable banner trigger on second visit
- Offline shell: header + "You're offline — cached cars below" with cached listings if any

---

## 5. Non-functional Requirements

| Category | Requirement |
|----------|-------------|
| Performance | LCP <2.5s on 4G; CLS <0.1; INP <200ms; Lighthouse ≥90 |
| Accessibility | WCAG 2.1 AA — keyboard nav, focus rings, alt text, ARIA, contrast ≥4.5:1, reduced-motion respected |
| i18n | All copy keyed; RTL mirror layouts; Arabic numerals optional toggle |
| SEO | SSR/SSG via Next.js, structured data (Vehicle schema.org), sitemap, hreflang EN/AR, OpenGraph |
| Security | CSP headers, no inline scripts, sanitised inputs, no PII in client logs |
| Browser | Chrome/Safari/Edge last 2, Samsung Internet ≥21, iOS Safari ≥15 |
| Tech debt | Typed (TypeScript strict), components <200 LOC, no `any` |

---

## 6. Design System

**Brand direction:** premium, trustworthy, modern. Not flashy. Inspired by Carvana clarity + Syarah warmth.

| Token | Value |
|-------|-------|
| Primary | `#0F4C5C` (deep teal — trust) |
| Accent | `#E36414` (Omani warmth) |
| Success | `#2D6A4F` |
| Surface | `#F8F7F4` light · `#0E1419` dark |
| Heading font | Inter (Latin) · IBM Plex Sans Arabic (Arabic) |
| Body font | Inter / IBM Plex Sans Arabic |
| Radius | 12 (cards), 8 (inputs), 999 (pills) |
| Shadows | soft, layered, no harsh black |
| Motion | 200–400ms ease-out; framer-motion for hero/cards/drawer |

**Visual language:** generous whitespace, large photography, glass-morphism on sticky CTA bar, gradient accents on hero, subtle grain texture on hero background, hover lift on cards, animated stat counters.

---

## 7. Tech Stack (MVP frontend)

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Next.js 14 (App Router)** | SSR/SSG, SEO, image optim |
| Language | TypeScript strict | Type safety |
| Styling | Tailwind CSS + CSS variables | Speed, RTL plugin, themes |
| Animation | framer-motion | Interactive feel |
| Icons | lucide-react | Tree-shaken, modern |
| State | React Context + localStorage | Favorites, compare, locale, theme |
| i18n | Custom lightweight provider (messages JSON) | No backend; can swap to next-intl later |
| Forms | react-hook-form + zod | Type-safe forms |
| PWA | Manual `manifest.json` + custom SW | Full control, no plugin lock-in |
| Data | Local TS modules (`/data/cars.ts`) | No backend per scope |

---

## 8. Mock Data Schema (Car)

```ts
type Car = {
  id: string; slug: string;
  make: string; model: string; trim?: string;
  year: number; priceOMR: number; mileageKm: number;
  fuel: 'Petrol'|'Diesel'|'Hybrid'|'Electric';
  transmission: 'Automatic'|'Manual';
  bodyType: 'Sedan'|'SUV'|'Hatchback'|'Pickup'|'Coupe';
  color: string; seats: number; engine: string;
  origin: string;          // e.g. "Imported · USA"
  inspectionScore: number; // out of 100
  warrantyMonths: 3|6|12;
  status: 'Available'|'Reserved'|'Sold';
  badges: ('Motara Verified'|'Low Mileage'|'New Arrival'|'Hot Deal')[];
  images: string[];        // ≥10
  inspection: InspectionReport;
  repairTimeline: RepairStage[];
  features: string[];
  description: { en: string; ar: string };
  inquiriesThisWeek: number;
};
```

---

## 9. Acceptance Tests (MVP)

1. ✅ Toggle language → entire UI flips EN↔AR with correct `dir`
2. ✅ Filter by `Make=Toyota` + `priceMax=8000` returns only matching cars
3. ✅ Add 3 cars to compare → 4th attempt shows toast "max 3"
4. ✅ Click WhatsApp on car detail → opens `wa.me/...?text=...car link`
5. ✅ Save favorite, refresh, count badge persists
6. ✅ Open inspection tab → 50 items render with categories + photos
7. ✅ PWA installable on Android Chrome (manifest valid)
8. ✅ Offline visit → shell loads, offline page shown for uncached routes
9. ✅ Keyboard tab through home → all interactive elements focusable with visible ring
10. ✅ Lighthouse mobile ≥90 / 90 / 90 / 90

---

## 10. Out-of-scope (post-MVP backlog)

- Real auth (Phase 2)
- Seller registration + listings (Phase 2)
- Thawani payments (Phase 3)
- Financing calculator (Phase 4)
- Insurance instant quotes (Phase 4)
- Import status tracker (Phase 4)
- AI recommendations (Phase 4, ≥500 listings)
- React Native app (year 2)
