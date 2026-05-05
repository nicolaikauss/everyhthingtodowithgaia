import { LiquidGlassCard } from "@/components/ui/liquid-glass-card";
import { PageCta } from "@/components/site/page-cta";
import { PageHero } from "@/components/site/page-hero";
import { principles } from "@/lib/site-content";

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="01 — Approach"
        title="A Disciplined View of Opportunity"
        lede="Our philosophy is grounded in alignment, patience, and careful execution. We advise where context and stewardship shape better outcomes."
      />

      <section className="relative isolate overflow-hidden border-t border-white/[0.06] bg-graphite/50 py-20 sm:py-28 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_45%_at_50%_-5%,rgba(245,242,237,0.10),transparent_70%)]"
          aria-hidden
        />
        <div className="mx-auto grid w-full max-w-[1440px] gap-6 px-6 sm:px-10 md:grid-cols-3 md:gap-8 lg:px-16">
          {principles.map((p) => (
            <LiquidGlassCard
              key={p.num}
              draggable={false}
              expandable={false}
              borderRadius="14px"
              shadowIntensity="sm"
              glowIntensity="xs"
              className="p-8 md:p-9"
            >
              <p className="font-sans text-[0.65rem] uppercase tracking-[0.22em] text-ink/50">{p.num}</p>
              <h2 className="mt-7 font-serif text-[1.75rem] leading-tight text-ink">{p.title}</h2>
              <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-ink/72">{p.text}</p>
            </LiquidGlassCard>
          ))}
        </div>
      </section>

      <PageCta />
    </>
  );
}
