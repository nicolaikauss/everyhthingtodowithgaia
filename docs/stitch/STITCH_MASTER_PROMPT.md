# Google Stitch — master prompt (Gaia Capital home `/`)

Copy the block below into **Google Stitch** as the primary prompt. Attach or paste the screenshots referenced in `VISUALS_AND_SCREENSHOTS.md` in the same order (hero → positioning states → why gaia → contact → footer). Optionally attach `LANDING_PAGE_OFFER.md` and `LANDING_DESIGN.md` as context files.

---

## Prompt (paste from here)

You are designing **desktop and mobile variants** of a **single-page institutional landing** for **Gaia Capital**, a private firm operating across **real estate, financing, and technology** (technology as **Private Equity** / disciplined tech investing — not a consumer SaaS).

### Non-negotiables

- **Aesthetic**: Dark-first, premium, quiet, Swiss-editorial meets private-capital. **No** startup illustration kits, **no** neon gradients, **no** playful iconography, **no** stock “team in suits shaking hands” clichés unless extremely restrained.
- **Typography**: **Cormorant Garamond** (or equivalent high-contrast serif) for display headlines; **Inter** (or equivalent neutral grotesk) for UI, labels, body. Eyebrows in **all caps** with **letter-spacing** (wide tracking).
- **Color**: Deep navy/black backgrounds (`#121821` family), warm off-white text (`#faf8f4` family) with opacity for hierarchy. Hairline borders in **low-alpha white**.
- **Content fidelity**: Preserve the **exact meaning** of these sections and CTAs:
  1. **Hero**: Eyebrow “Real estate · Financing · Technology”. Headline “We invest in” + **animated rotating emphasis** among **Discipline / Vision / Precision**. CTAs: **View portfolio** (primary to portfolio) and **Begin a conversation** (to contact anchor).
  2. **Positioning / sectors**: Horizontal narrative (or vertically stacked on mobile) with a **strong architectural photograph** as full-bleed backdrop. Four beats: **Activity sectors** (title index), then **01 Real estate**, **02 Financing**, **03 Private Equity** — each with the **sector descriptions** as in the reference site (long-horizon, governance, discipline language — do not invent performance claims).
  3. **Why Gaia**: Section title **Built For Substance**; three proof tiles: **Three sectors of activity**, **Execution-driven**, **Long-term mindset** — keep the **substance of the copy**, paraphrase only if grammar improves.
  4. **Contact**: Title **Begin a Private Conversation**; explain selective responses and discretion; **mailto-driven** inquiry (no backend) — UI can show Name, Email, Message, submit opens email client.
  5. **Footer**: Tagline about real estate, financing, and technology subsidiary; discrete navigation; **Gaia Labs** as subsidiary mark; discretion note.

### Motion

- Subtle, **scroll-linked** depth on hero (parallax / scale / opacity) is part of the brand; offer a **reduced-motion** variant that is static but still premium.
- Horizontal sector strip may be **scroll-scrubbed** on desktop; on mobile prefer **clear vertical readability** (either stacked panels or simplified horizontal snap).

### Deliverables from Stitch

For **each iteration** (label v1, v2, v3…), output:

1. **Desktop** artboard (min ~1440px wide) showing **full page** or clear stitched vertical flow.
2. **Mobile** artboard (~390×844) for hero, sectors, why, contact.
3. **Component notes**: Navbar behavior (transparent → blurred bar after hero), button variants (ghost hero, subtle filled, text+arrow link), bento card anatomy, frosted inquiry panel.
4. **Explicit diff list**: What changed vs previous iteration and **why** (e.g. “increased sector panel contrast for WCAG AA on body text”).

### Reference inputs

Treat the attached **screenshots** as **ground truth for composition and hierarchy**. Do **not** drift the information architecture: hero → sectors → why → contact → footer.

### Optional stretch goals (only if baseline is strong)

- A **fourth iteration** exploring a **more editorial** hero (still dark, still serif) with **no** rotating word — instead a single static line — and assess tradeoffs.
- Explore **one** alternative hero background mood (still architectural, cool palette) while keeping overlays readable.

---

## Prompt ends here

### After Stitch responds

- Save exported frames into `docs/stitch/screenshots/iterations/` with names like `stitch-v2-desktop.png`.
- Log major copy deviations against `LANDING_PAGE_OFFER.md` before accepting a variant.
