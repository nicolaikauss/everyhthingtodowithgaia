import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { realEstateSpotlights } from "@/lib/site-content";

type DealPageProps = {
  params: Promise<{ slug: string }>;
};

function getDealBySlug(slug: string) {
  return realEstateSpotlights.find((deal) => deal.slug === slug);
}

export function generateStaticParams() {
  return realEstateSpotlights.map((deal) => ({ slug: deal.slug }));
}

export async function generateMetadata({ params }: DealPageProps): Promise<Metadata> {
  const { slug } = await params;
  const deal = getDealBySlug(slug);
  if (!deal) {
    return { title: "Deal not found | Gaia Capital" };
  }
  return {
    title: `${deal.title} | Gaia Capital`,
    description: deal.summary
  };
}

export default async function RealEstateDealPage({ params }: DealPageProps) {
  const { slug } = await params;
  const deal = getDealBySlug(slug);
  if (!deal) {
    notFound();
  }

  return (
    <main className="bg-night text-ink">
      <section className="border-b border-white/[0.06] pb-14 pt-32 sm:pb-16 sm:pt-36">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10 lg:px-16">
          <p className="text-[0.68rem] uppercase tracking-[0.16em] text-ink/58">{deal.closeDate}</p>
          <h1 className="mt-4 max-w-[20ch] font-serif text-4xl leading-tight sm:text-5xl">{deal.title}</h1>
          <p className="mt-4 text-[0.72rem] uppercase tracking-[0.14em] text-ink/52">{deal.location}</p>
          <p className="mt-8 max-w-[72ch] text-sm leading-relaxed text-ink/76 sm:text-[1rem]">{deal.summary}</p>
        </div>
      </section>

      {deal.imageSrc ? (
        <section className="py-8 sm:py-10">
          <div className="mx-auto max-w-[1100px] px-6 sm:px-10 lg:px-16">
            <div className="relative overflow-hidden rounded-[16px] border border-white/[0.08]">
              <Image
                src={deal.imageSrc}
                alt={deal.title}
                width={1800}
                height={1100}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="pb-20 pt-8 sm:pb-24">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-8 px-6 sm:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-16">
          <article className="rounded-[16px] border border-white/[0.08] bg-night/70 p-7 sm:p-9">
            <h2 className="font-serif text-2xl">Transaction perspective</h2>
            <p className="mt-5 text-sm leading-relaxed text-ink/76 sm:text-[0.97rem]">{deal.narrative}</p>
          </article>

          <aside className="rounded-[16px] border border-white/[0.08] bg-night/70 p-7 sm:p-9">
            <h2 className="font-serif text-xl">References</h2>
            <div className="mt-5 flex flex-col gap-4">
              {deal.externalReferenceHref ? (
                <a
                  href={deal.externalReferenceHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit text-[0.68rem] uppercase tracking-[0.14em] text-ink/84 transition-colors hover:text-ink"
                >
                  External reference
                </a>
              ) : null}
              <Link
                href="/portfolio"
                className="inline-flex w-fit text-[0.68rem] uppercase tracking-[0.14em] text-ink/84 transition-colors hover:text-ink"
              >
                Back to portfolio
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
