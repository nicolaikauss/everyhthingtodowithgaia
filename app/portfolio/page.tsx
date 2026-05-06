import Link from "next/link";

import { BentoGrid } from "@/components/ui/bento-grid";
import { PageCta } from "@/components/sections/page-cta";
import { PageHero } from "@/components/sections/page-hero";
import { portfolioBentoSeeds, portfolioCopy, realEstateSpotlights } from "@/lib/site-content";

export default function PortfolioPage() {
  return (
    <>
      <PageHero eyebrow={portfolioCopy.eyebrow} title={portfolioCopy.title} lede={portfolioCopy.lede} />

      <section className="relative isolate overflow-hidden border-t border-white/[0.06] bg-night py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <BentoGrid items={portfolioBentoSeeds} />
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-t border-white/[0.06] bg-night py-20 sm:py-24">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl">
            <p className="text-[0.68rem] uppercase tracking-[0.16em] text-ink/58">Real estate</p>
            <h2 className="mt-4 font-serif text-3xl text-ink sm:text-[2.2rem]">Selected transactions</h2>
            <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-ink/72 sm:text-[0.97rem]">
              Snapshot views of selected real-estate transactions. Each brief outlines location context, close timing,
              and execution posture.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {realEstateSpotlights.map((asset) => (
              <article key={asset.slug} className="rounded-[14px] border border-ink/16 bg-night/68 p-7 sm:p-8">
                <p className="text-[0.65rem] uppercase tracking-[0.14em] text-ink/58">{asset.closeDate}</p>
                <h3 className="mt-3 font-serif text-2xl leading-tight text-ink">{asset.title}</h3>
                <p className="mt-2 text-[0.72rem] uppercase tracking-[0.14em] text-ink/52">{asset.location}</p>
                <p className="mt-5 text-sm leading-relaxed text-ink/76 sm:text-[0.95rem]">{asset.summary}</p>
                <Link
                  href={asset.href}
                  className="mt-6 inline-flex items-center text-[0.68rem] uppercase tracking-[0.14em] text-ink/84 transition-colors hover:text-ink"
                >
                  {asset.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PageCta />
    </>
  );
}
