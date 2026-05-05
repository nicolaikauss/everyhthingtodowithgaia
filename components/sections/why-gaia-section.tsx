/**
 * “Why Gaia” narrative section with three differentiator cards.
 */
import { SectionHeader } from "./section-header";
import { differentiators, whyGaiaSectionCopy } from "@/lib/site-content";

export function WhyGaiaSection() {
  return (
    <section
      id="why-gaia"
      className="relative isolate overflow-hidden bg-graphite/25 py-28 sm:py-32 lg:py-40"
    >
      <div className="relative mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <SectionHeader
          label={whyGaiaSectionCopy.label}
          title={whyGaiaSectionCopy.title}
          text={whyGaiaSectionCopy.text}
        />

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {differentiators.map((item, index) => (
            <article
              key={item.headline}
              className="flex h-full flex-col rounded-sm border border-white/14 bg-night/35 p-7 shadow-hero-soft sm:p-9"
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
