import { PageCta } from "@/components/site/page-cta";
import { PageHero } from "@/components/site/page-hero";
import { credibilityItems } from "@/lib/site-content";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="03 — About"
        title="Institutional Discipline, Human Judgment"
        lede="Gaia Capital exists to support decisions where capital, trust, and long-term perspective intersect. The firm is built on rigor, discretion, and continuity."
      />

      <section className="about-chapter relative isolate overflow-hidden border-t border-white/[0.06] py-20 sm:py-28 lg:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="absolute left-1/2 top-1/2 h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(245,242,237,0.06)_0%,transparent_68%)] blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
            <div className="max-w-[42ch] border-l border-white/12 pl-6 sm:pl-8">
              <p className="font-serif text-2xl leading-snug text-ink/90 sm:text-[1.65rem] sm:leading-[1.35]">
                We work across founders, investors, family offices, and institutions where judgment carries long-term
                consequences.
              </p>
              <p className="mt-8 text-base leading-relaxed text-ink/72">
                Our standards are stable: discretion in process, rigor in analysis, and continuity in partnership.
              </p>
            </div>

            <div className="space-y-0">
              {credibilityItems.map((item, index) => (
                <div
                  key={item}
                  className="border-t border-white/10 py-8 first:border-t-0 first:pt-0 md:flex md:gap-10 md:py-9"
                >
                  <span className="shrink-0 font-sans text-[0.65rem] uppercase tracking-[0.22em] text-ink/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-ink/68 md:mt-0 md:text-[0.9375rem]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PageCta />
    </>
  );
}
