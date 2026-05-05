import Image from "next/image";

import { PageCta } from "@/components/sections/page-cta";
import { PageHero } from "@/components/sections/page-hero";
import { BentoGrid } from "@/components/ui/bento-grid";
import { aboutBentoSeeds, aboutCopy, brandAssets } from "@/lib/site-content";

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={aboutCopy.eyebrow} title={aboutCopy.title} lede={aboutCopy.lede} />

      <section className="relative isolate overflow-hidden border-t border-white/[0.06] bg-night py-20 sm:py-28 lg:py-32">
        <div className="relative mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
            <div className="max-w-[42ch] border-l border-white/12 pl-6 sm:pl-8">
              <p className="font-serif text-2xl leading-snug text-ink/90 sm:text-[1.65rem] sm:leading-[1.35]">
                {aboutCopy.introLead}
              </p>
              <p className="mt-8 text-base leading-relaxed text-ink/72">{aboutCopy.introSecondary}</p>

              <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-white/10 pt-10">
                <Image
                  src={brandAssets.capitalMarkLight}
                  alt={aboutCopy.capitalLogoAlt}
                  width={200}
                  height={56}
                  className="h-8 w-auto opacity-95"
                />
                <span
                  className="hidden font-sans text-[0.65rem] uppercase tracking-[0.22em] text-ink/35 sm:inline"
                  aria-hidden
                >
                  |
                </span>
                <Image
                  src={brandAssets.labsMarkLight}
                  alt={aboutCopy.labsLogoAlt}
                  width={200}
                  height={48}
                  className="h-7 w-auto opacity-95"
                />
                <p className="w-full font-sans text-[0.62rem] uppercase tracking-[0.16em] text-ink/45">
                  {aboutCopy.orgCaption}
                </p>
              </div>
            </div>

            <div className="min-w-0 lg:pt-0">
              <BentoGrid items={aboutBentoSeeds} />
            </div>
          </div>
        </div>
      </section>

      <PageCta />
    </>
  );
}
