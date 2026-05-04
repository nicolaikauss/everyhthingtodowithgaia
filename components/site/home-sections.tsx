import Link from "next/link";

import { FallingPattern } from "@/components/ui/falling-pattern";
import { PositioningOffersSection } from "@/components/site/positioning-offers-section";

const principles = [
  {
    title: "Alignment before action",
    text: "Every mandate begins with objectives, risk tolerance, and time horizon."
  },
  {
    title: "Discipline in selection",
    text: "We prioritize quality of opportunity over pace, volume, or market noise."
  },
  {
    title: "Strategic context",
    text: "Decisions are framed through governance, timing, and downside awareness."
  }
];

const services = [
  {
    title: "Strategic Advisory",
    text: "Capital strategy, partnership design, and market positioning for high-value decisions."
  },
  {
    title: "Investment Advisory",
    text: "Assessment and allocation perspective across private and strategic opportunities."
  },
  {
    title: "Private Capital Support",
    text: "Introductions, structuring guidance, and transaction readiness in discreet contexts."
  }
];

const differentiators = [
  "Selective engagement with clear fit criteria",
  "Cross-border perspective informed by institutional standards",
  "Confidential process designed for private conversations"
];

const credibilityItems = [
  "Serious advisory posture with long-term orientation",
  "Standards centered on discretion, rigor, and continuity",
  "Relationship-led approach across founders, investors, families, and institutions"
];

function SectionHeader({
  label,
  title,
  text
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <div className="max-w-[760px]">
      <p className="text-[0.68rem] uppercase tracking-[0.16em] text-ink/55">{label}</p>
      <h2 className="mt-4 max-w-[18ch] font-serif text-4xl leading-[1.02] text-ink sm:text-5xl">
        {title}
      </h2>
      <p className="mt-6 max-w-[60ch] text-sm leading-relaxed text-ink/75 sm:text-base">{text}</p>
    </div>
  );
}

export function HomeSections() {
  return (
    <>
      <PositioningOffersSection />

      <section id="approach" className="border-b border-white/[0.05] bg-graphite/35 py-28 sm:py-32 lg:py-40">
        <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <SectionHeader
            label="Approach"
            title="A Disciplined View of Opportunity"
            text="Our philosophy is grounded in alignment, patience, and careful execution. We advise where context and stewardship shape better outcomes."
          />

          <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
            {principles.map((item) => (
              <article key={item.title} className="animate-slow-fade">
                <h3 className="font-serif text-[1.75rem] leading-tight text-ink">{item.title}</h3>
                <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-ink/70">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-28 sm:py-32 lg:py-40">
        <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <SectionHeader
            label="Services"
            title="Strategic Capabilities, Clearly Defined"
            text="Our scope remains focused: advisory, investment perspective, and private capital support for decisions that require trust and precision."
          />

          <div className="mt-16 border-t border-white/10">
            {services.map((item) => (
              <article
                key={item.title}
                className="grid gap-4 border-b border-white/10 py-9 md:grid-cols-[1.1fr_1.6fr] md:items-start md:gap-10"
              >
                <h3 className="font-serif text-2xl leading-tight text-ink sm:text-[1.9rem]">{item.title}</h3>
                <p className="max-w-[56ch] text-sm leading-relaxed text-ink/70 sm:text-base">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="why-gaia" className="bg-graphite/25 py-28 sm:py-32 lg:py-40">
        <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <SectionHeader
            label="Why Gaia"
            title="Partnership Before Transaction"
            text="Our differentiators are practical, not performative. We remain selective by design and deliberate in execution."
          />

          <div className="mt-16 space-y-7">
            {differentiators.map((item) => (
              <div key={item} className="flex items-start gap-4 pb-7">
                <span className="mt-2 h-px w-8 bg-ink/40" />
                <p className="max-w-[64ch] text-sm leading-relaxed text-ink/74 sm:text-base">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-28 sm:py-32 lg:py-40">
        <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <SectionHeader
            label="About"
            title="Institutional Discipline, Human Judgment"
            text="Gaia Capital exists to support decisions where capital, trust, and long-term perspective intersect. The firm is built on rigor, discretion, and continuity."
          />

          <div className="mt-16 border-l border-white/12 pl-6 sm:pl-8">
            <p className="max-w-[78ch] text-base leading-relaxed text-ink/72">
              We work across founders, investors, family offices, and institutions where judgment
              carries long-term consequences. Our standards are stable: discretion in process, rigor
              in analysis, and continuity in partnership.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {credibilityItems.map((item) => (
              <p key={item} className="max-w-[36ch] border-t border-white/10 pt-5 text-sm leading-relaxed text-ink/68">
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="relative isolate overflow-hidden border-t border-white/10 bg-graphite/45 py-28 sm:py-32 lg:py-36"
      >
        <div className="pointer-events-none absolute inset-0 z-0 min-h-full" aria-hidden>
          <FallingPattern
            className="min-h-[28rem] sm:min-h-[32rem]"
            color="rgba(245, 242, 237, 0.82)"
            backgroundColor="var(--surface-graphite-45)"
            duration={160}
            blurIntensity="0.65em"
            density={1.15}
          />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="max-w-[760px]">
            <p className="text-[0.68rem] uppercase tracking-[0.16em] text-ink/55">Contact</p>
            <h2 className="mt-4 max-w-[16ch] font-serif text-4xl leading-[1.04] text-ink sm:text-5xl">
              Begin a Private Conversation
            </h2>
            <p className="mt-6 max-w-[58ch] text-sm leading-relaxed text-ink/74 sm:text-base">
              We review inquiries with care. If your mandate aligns with our approach, we will
              continue the conversation in confidence.
            </p>
            <div className="mt-11 flex flex-wrap items-center gap-6">
              <Link
                href="mailto:contact@gaiacapital.com"
                className="inline-flex items-center rounded-sm border border-white/22 px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-ink transition hover:border-white/34 hover:bg-white/[0.03]"
              >
                Contact Gaia Capital
              </Link>
              <Link
                href="#approach"
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-ink/80 transition hover:text-ink"
              >
                Read Our Philosophy
                <span className="h-px w-8 bg-ink/45 transition group-hover:w-10 group-hover:bg-ink/80" />
              </Link>
            </div>
            <p className="mt-8 text-xs text-ink/55">All inquiries are treated with discretion.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-12">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-6 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-16">
          <p className="font-serif text-lg tracking-[0.08em] text-ink/92">Gaia Capital</p>
          <div className="flex flex-wrap gap-5 text-[0.68rem] uppercase tracking-[0.14em] text-ink/58">
            <Link href="#approach" className="transition hover:text-ink/86">
              Approach
            </Link>
            <Link href="#services" className="transition hover:text-ink/86">
              Services
            </Link>
            <Link href="#about" className="transition hover:text-ink/86">
              About
            </Link>
            <Link href="#contact" className="transition hover:text-ink/86">
              Contact
            </Link>
          </div>
          <p className="text-xs text-ink/50">International advisory perspective</p>
        </div>
      </footer>
    </>
  );
}
