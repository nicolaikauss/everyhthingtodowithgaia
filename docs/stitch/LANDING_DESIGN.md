# Gaia Capital home — design specification for Stitch

Use this with screenshots in `VISUALS_AND_SCREENSHOTS.md` so Stitch preserves **visual DNA** while exploring layout variants.

## Brand & tone

- **Voice**: Institutional, restrained, confident. No retail-finance hype, no emoji, no loud gradients-as-brand.
- **Metaphor**: “Quiet introduction” / private briefing energy; photography and architecture as credibility cues.

## Color (Tailwind tokens)

| Token | Role | Hex / note |
|--------|------|------------|
| `night` | Primary background | `#121821` |
| `graphite` | Section surfaces | `#1a2330` (with opacities e.g. `/25`, `/70`) |
| `ink` | Primary text | `#faf8f4` (opacity steps `ink/38` … `ink/92` for hierarchy) |
| White overlays | Hairlines, borders | `border-white/10`, `border-white/14`, etc. |

**Hero**: Near-black base + cool scrim; background image heavily graded (opacity ~0.29 animated).

**Positioning strip**: Black stage; lobby image with multi-stop vertical gradient + corner radial vignette.

**Contact**: Dark graphite/night stack with frosted panel (`backdrop-blur-md`, translucent `night`).

## Typography

- **Serif (display)**: Cormorant Garamond — hero H1, section H2s, panel titles in positioning.
- **Sans (UI / body)**: Inter — eyebrows (all caps, wide tracking ~0.14–0.22em), body, labels, nav.

**Scale patterns**

- Hero H1: responsive clamp roughly `2rem` → `4.1rem`, tight leading (`leading-[1]`).
- Section titles: ~`text-4xl` / `sm:text-5xl`, `leading-[1.02]`.
- Positioning first panel title: very large clamp (`~2.6rem`–`5.4rem`).
- Body: `text-sm`–`text-base`, relaxed leading (`1.75`–`1.8` in panels).

## Layout & grid

- **Max content width**: `1440px` (`max-w-[1440px]`), horizontal padding `px-6` → `sm:px-10` → `lg:px-16`.
- **Hero**: Full viewport sticky inner frame; vertically centered content block `max-w-[760px]`.
- **Positioning**: Full-viewport sticky “camera”; inner frame `w-max` row of panels each `w-[min(92vw,520px)]` etc.
- **Why Gaia**: Single column header + `BentoGrid` (three equal columns on large screens; stacked on small).
- **Contact**: Two-column grid on `lg`: narrative left, form panel right.

## Components & motifs

- **Buttons**: Ghost primary on hero; “link + arrow” secondary; `subtle` filled style in contact/footer contexts.
- **Eyebrows**: Small caps label above serif title (consistent `SectionHeader` pattern).
- **Bento cards**: Inset highlight, soft shadow `bento`, icon in header row, optional meta index `01`, `02`…
- **Hero grid**: Subtle square grid masked by radial fade (technical but quiet).
- **Footer links**: Underline grow animation (`footer-grow-link`).

## Motion & interaction

- **Pre-hero**: Logo/caption fade-scale exit; `prefers-reduced-motion` skips to hidden.
- **Hero scroll**: Imperative transforms on scroll — content scale/lift/opacity exit; background parallax scale/translate and opacity tied to scroll progress through `180vh` section.
- **Positioning scrub**: Vertical scroll drives `translate3d` on horizontal frame; track height = `horizontalTravel + viewportHeight` for stable range on mobile (`visualViewport` listeners).
- **Text cycle**: Hero headline third line cycles words with interval ~2.6s (`AnimatedTextCycle`).
- **Navbar**: Border/background transition when leaving hero zone.

## Imagery

- **Hero**: Wide architectural / cityscape still (Unsplash URL in `homeCopy.heroImage`) — cool tones, readable under dark scrim.
- **Positioning**: Single lobby interior still (`positioning-lobby-bg.jpg`), object-position ~`50% 68%`, slight scale for crop breathing room.

## Accessibility

- Skip hidden content for screen readers where appropriate (`sr-only` heading for positioning).
- Focus rings: `ring-ink/40` on interactive elements, offset on dark surfaces.
- Touch targets: 44px minimum on form controls and mobile nav.
- `prefers-reduced-motion`: Disables hero transforms, collapses horizontal scrub to stacked panels.

## Stitch iteration axes (suggested)

Without losing the above DNA, Stitch can explore:

1. **Hero**: Alternate photography, headline structure (still three-sector), CTA hierarchy, serif scale.
2. **Positioning**: Panel width rhythm, typographic hierarchy on first panel, lobby vs abstract texture.
3. **Why Gaia**: Bento vs simple three-column editorial, iconography style (stroke weight).
4. **Contact**: Panel chrome (glass vs solid), form density, mailto vs Calendly-style (visual only).

Always preserve: dark-first palette, serif/sans pairing, wide tracking eyebrows, restrained motion, and “private firm” copy posture.
