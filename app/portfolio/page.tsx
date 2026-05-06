import { BentoGrid } from "@/components/ui/bento-grid";
import { PageCta } from "@/components/sections/page-cta";
import { PageHero } from "@/components/sections/page-hero";
import { portfolioBentoSeeds, portfolioCopy } from "@/lib/site-content";

export default function PortfolioPage() {
  return (
    <>
      <PageHero eyebrow={portfolioCopy.eyebrow} title={portfolioCopy.title} lede={portfolioCopy.lede} />

      <section className="relative isolate overflow-hidden border-t border-white/[0.06] bg-night py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <BentoGrid items={portfolioBentoSeeds} />
        </div>
      </section>

      <PageCta />
    </>
  );
}
