/**
 * “Why Gaia” narrative section with three differentiator cards as a bento grid.
 */
import { BentoGrid } from "@/components/ui/bento-grid";
import { whyGaiaBentoSeeds, whyGaiaSectionCopy } from "@/lib/site-content";

import { SectionHeader } from "./section-header";

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

        <BentoGrid items={whyGaiaBentoSeeds} className="mt-16" />
      </div>
    </section>
  );
}
