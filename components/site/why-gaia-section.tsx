import { SectionHeader } from "@/components/site/section-header";
import { SilkBackground } from "@/components/ui/silk-background";
import { differentiators } from "@/lib/site-content";

export function WhyGaiaSection() {
  return (
    <section
      id="why-gaia"
      className="relative isolate overflow-hidden bg-graphite/25 py-28 sm:py-32 lg:py-40"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <SilkBackground />
        <div className="absolute inset-0 bg-night/55" />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <SectionHeader
          label="Why Gaia"
          title="Partnership Before Transaction"
          text="Our differentiators are practical, not performative. We remain selective by design and deliberate in execution."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {differentiators.map((item, index) => (
            <article
              key={item.text}
              className="flex h-full flex-col rounded-sm border border-white/14 bg-night/35 p-7 shadow-hero-soft backdrop-blur-md sm:p-9"
            >
              <p className="font-sans text-[0.68rem] uppercase tracking-[0.18em] text-ink/48">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-7 max-w-[20ch] font-serif text-[1.6rem] leading-tight text-ink">
                {item.headline}
              </h3>
              <p className="mt-5 max-w-[36ch] text-sm leading-relaxed text-ink/72">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
