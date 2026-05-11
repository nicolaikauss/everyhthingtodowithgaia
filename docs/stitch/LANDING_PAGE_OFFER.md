# Gaia Capital — Home landing page: what it offers

This document inventories **content, structure, and user-facing value** on `/` (the home page) as implemented in the Next.js app. Use it as the factual source for Google Stitch iterations, copy decks, or design reviews.

## Global chrome (not unique to `/`, but part of the experience)

- **Route intro (`PreHeroIntro`)**: Full-screen brand beat on first paint for `/`: dark backdrop, Gaia Capital wordmark, caption “Real Estate · Financing · Technology”. Preloads hero background and fonts; minimum ~1.4s before exit animation (~680ms). Body scroll locked while visible.
- **Navbar**: Fixed top; Gaia Capital mark (light) links home. Primary links: Home, Portfolio, Contact (`/#contact`). Transparent over the hero; after the tall hero section, gains blurred `night` surface and subtle border. Mobile: hamburger + slide-down panel (44px min tap targets).
- **Footer**: Tagline, Explore (Portfolio), Firm (Contact), discretion paragraph, copyright, subsidiary row (Gaia Labs mark + links to portfolio anchor and bottom links “Begin a conversation” / “Why Gaia”).

## Section 1 — Hero (`HomeHero`)

**Purpose**: Immediate positioning and emotional tone — premium, quiet, institutional.

**What the visitor gets**

- **Category signal (eyebrow)**: “Real estate · Financing · Technology”.
- **Headline**: “We invest in” + rotating words **Discipline / Vision / Precision** (cycling animation).
- **Primary CTA**: “View portfolio” → `/portfolio`.
- **Secondary CTA**: “Begin a conversation” → `/#contact` (link with arrow treatment).
- **Visuals**: Full-viewport hero with large photographic background (URL from `homeCopy.heroImage`), soft radial highlight, vertical gradient scrim, subtle **hero-grid** mask overlay, scroll-linked scale/opacity on background and content (pinned sticky viewport inside a tall `180vh` section for scroll choreography). Respects `prefers-reduced-motion`.

**Implicit promise**: Three-sector mandate, long-horizon language, discretion-adjacent tone (no hype metrics).

## Section 2 — Positioning & sectors (`PositioningOffersSection`)

**Purpose**: Explain **what Gaia does** in four horizontal “panels” over a **sticky lobby photograph** (`/positioning-lobby-bg.jpg`), with **scroll-scrubbed horizontal translation** (Sentosa-style track). First panel is an index title; the next three are the sectors.

**Panels (in order)**

1. **Activity sectors** — title only (intro beat for the strip).
2. **01 — Real estate** — Investment and ownership across real assets; acquisitions, repositioning, portfolio discipline, long-term value.
3. **02 — Financing** — Capital structuring and funding strategies aligned with risk, governance, and opportunity timeline.
4. **03 — Private Equity** — Technology-focused investment with operational support; products/platforms scaling with discipline.

**What the visitor gets**

- A **spatial narrative**: architecture-forward still + typography-led panels; motion ties vertical scroll to horizontal discovery.
- **Sr-only heading**: “Positioning and offerings” for accessibility.

**Reduced motion**: Track collapses to a vertical stack (CSS in `globals.css`); no scrub transform.

## Section 3 — Why Gaia (`WhyGaiaSection`)

**Purpose**: Differentiation in three equal “bento” tiles with icons (Lucide via `BentoGrid`).

**Header**

- Label: “Why Gaia”
- Title: “Built For Substance”
- Supporting line: Three sectors under one parent structure — real estate, financing, and technology — **operator posture, not a brochure**.

**Tiles (from `differentiators`)**

1. **Three sectors of activity** — Real estate investment and repositioning, financing for acquisitions/growth, technology where it earns its place; three mandates under one parent firm.
2. **Execution-driven** — Capital deployment with accountability; systems/data/automation where they sharpen decisions, not replace judgment.
3. **Long-term mindset** — Durability and downside awareness over short-term theater; years not quarters.

**Surface**: `bg-graphite/25`, max width 1440px, generous vertical padding.

## Section 4 — Contact (`ContactSection`)

**Purpose**: Private inbound channel without backend storage.

**What the visitor gets**

- **Left column**: Eyebrow “Contact”, title “Begin a Private Conversation”, body about aligned mandates and confidentiality, “Contact Gaia Capital” mailto, “View portfolio” link, footnote on discretion.
- **Right column**: Glass-style panel (“Inquiry”) with Name / Email / Message; submit builds a **mailto:** to `contact@gaiacapital.com` with subject/body prefilled. Hint: opens mail client; no data stored on page.
- **Background**: `SilkBackground` + dark veil for depth.

## What the landing page does *not* do (scope boundary)

- No live deal metrics, team grid, newsroom, or login.
- Portfolio detail lives on `/portfolio` and transaction pages — hero only **teases** via CTA.

## Source of truth in code

- Page assembly: `app/page.tsx`
- Copy constants: `lib/site-content.ts` (`homeCopy`, `positioningOffers`, `whyGaiaSectionCopy`, `differentiators`, `contactCopy`, `footerCopy`)
- Layout shell: `app/layout.tsx` (`RouteIntro`, `Navbar`, `main`, `SiteFooter`)

## Companion docs for Stitch

- `VISUALS_AND_SCREENSHOTS.md` — Screenshot map and capture runbook
- `LANDING_DESIGN.md` — Tokens, typography, layout, motion notes
- `STITCH_MASTER_PROMPT.md` — Single large prompt for Google Stitch
