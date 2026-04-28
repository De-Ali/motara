# Business Requirements Document (BRD)
## Motara Auto · مطرة للسيارات

**Version:** 1.0 · **Date:** 2026-04-28 · **Status:** Approved for MVP build
**Owner:** Motara Auto (Muscat, Oman) · **Prepared by:** Shuneria

---

## 1. Executive Summary

Motara Auto is a hybrid dealership-marketplace platform for the Oman used-car market, headquartered in Muscat. The business imports used cars (primarily from auctions in the US, Japan, UAE), performs in-house refurbishment, and resells them to Omani residents and expats with a **50-point inspection report, transparent repair history, and warranty**.

The digital platform is the primary conversion channel: a bilingual (Arabic/English, RTL-aware) **Progressive Web App** that builds buyer trust through transparency and converts via a WhatsApp-first sales funnel.

---

## 2. Business Objectives

| # | Objective | Success Metric (Year 1) |
|---|-----------|-------------------------|
| B1 | Establish Motara as Oman's most-trusted certified used-car brand | ≥4.7★ Google rating, 200+ reviews |
| B2 | Generate qualified leads via the website | 150+ WhatsApp inquiries/month by month 6 |
| B3 | Sell 10–15 cars in Phase 1 (months 1–3) | 12 vehicles sold, 18% gross margin |
| B4 | Beat OpenSooq on perceived quality, not price | 70% of buyers cite "trust/transparency" as reason |
| B5 | Build foundation for marketplace pivot (Phase 2, month 7+) | Platform architecture supports multi-seller without rewrite |
| B6 | GCC expansion readiness | Bilingual, RTL, multi-currency-ready by year 2 |

---

## 3. Stakeholders

| Stakeholder | Role | Interest |
|-------------|------|----------|
| Motara owner / founder | Decision-maker, P&L | ROI, brand reputation, scale |
| Sales staff (Muscat showroom) | Lead handlers (WhatsApp) | Lead quality, response speed |
| Mechanic / inspector | Repair + 50-point report | Tooling for report capture |
| Buyers — Omani locals | Primary customer | Trust, fair price, Arabic UX |
| Buyers — expats (Indian, Filipino, Western) | Secondary customer | English UX, transparent repair history |
| Future verified sellers (Phase 2) | Marketplace supply | Listing tools, lead access |
| Banking / insurance partners | Referral channel | Lead volume |
| Investors | Funders | Scalability, unit economics |

---

## 4. Business Model

**Phase 1 (months 1–3):** Pure dealership. Own inventory only. Revenue = sale margin (target 15–25% gross per vehicle).
**Phase 2 (months 7–12):** Curated marketplace. Verified third-party sellers added. Revenue = 2–5% transaction commission + featured listing fees (10–25 OMR/week) + dealer subscriptions (30–150 OMR/month).
**Phase 3 (year 2+):** Full ecosystem — financing referrals (Bank Muscat), insurance referrals (Oman Insurance, 8–15% commission), in-house logistics.

### Revenue Streams (priority order)
1. Direct car sales margin — Phase 1, immediate
2. Marketplace commission — Phase 2
3. Featured listings + dealer subscriptions — Phase 2
4. Insurance + financing referral commissions — Phase 3

---

## 5. Scope

### In scope (MVP — this engagement)
- Bilingual (EN/AR + RTL) PWA frontend
- Pages: Home, Cars list, Car detail, Compare, About, Services, Blog, Contact, Admin (UI-only stub)
- Mock data for 12+ sample cars with full inspection reports
- WhatsApp click-to-chat on every listing
- Test drive booking form (UI only — submits to mock handler)
- Favorites (localStorage)
- Compare (up to 3 cars)
- Installable PWA (manifest + service worker, offline shell)

### Out of scope (this engagement)
- Backend API, database, real auth
- Payment integration (Thawani/MyFatoorah)
- Marketplace seller registration (Phase 2)
- Mobile native app (React Native — year 2)
- Real CMS / blog admin
- AI recommendations

---

## 6. Constraints

- **Language:** Arabic + English mandatory, RTL must be production-grade
- **Performance:** Mobile-first, Lighthouse ≥90 on 4G Oman
- **Hosting target:** DigitalOcean Bahrain region (low GCC latency) — note for deployment
- **Compliance:** Display ROP registration, trade license, VAT cert on site
- **Currency:** Omani Rial (OMR), no multi-currency in MVP
- **Browser support:** Last 2 versions Chrome/Safari/Edge, Samsung Internet (high MENA share)

---

## 7. Risks & Assumptions

| Risk | Impact | Mitigation |
|------|--------|------------|
| Low trust in online used-car sales in Oman | High | 50-point inspection report shown prominently; warranty badge; ROP/VAT proof |
| OpenSooq has incumbent SEO | Medium | Long-tail bilingual keywords + content marketing (blog) |
| WhatsApp reliance — single channel | Medium | Add phone + form fallback CTAs |
| Photo quality drives conversion | High | Mandate ≥10 HD photos per listing in admin tooling |
| Arabic UX often poor in regional sites | Medium-High | Native Arabic copy review, full RTL audit |

**Assumptions:** Owner controls inventory and inspection process. Showroom + WhatsApp number live at launch. Google Business Profile + ROP registration in place.

---

## 8. Success Criteria (MVP acceptance)

1. All 9 public pages render in EN and AR with correct RTL/LTR direction
2. Lighthouse score ≥90 (Perf, A11y, Best Practices, SEO) on `/` and `/cars/[id]`
3. PWA installable on iOS and Android home screens
4. WhatsApp deep-link works from every car detail
5. Compare drawer holds up to 3 cars across navigation
6. Favorites persist across sessions
7. 12+ realistic mock cars with full inspection reports loaded
