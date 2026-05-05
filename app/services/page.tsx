"use client";

import { useState } from "react";

import { LiquidGlassCard } from "@/components/ui/liquid-glass-card";
import { PageCta } from "@/components/site/page-cta";
import { PageHero } from "@/components/site/page-hero";
import { cn } from "@/lib/utils";
import { services } from "@/lib/site-content";

export default function ServicesPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <PageHero
        eyebrow="02 — Services"
        title="Strategic Capabilities, Clearly Defined"
        lede="Our scope remains focused: advisory, investment perspective, and private capital support for decisions that require trust and precision."
      />

      <section className="relative isolate overflow-hidden border-t border-white/[0.06] bg-graphite/50 py-20 sm:py-28 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_40%_at_80%_10%,rgba(245,242,237,0.08),transparent_72%)]"
          aria-hidden
        />

        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-6 sm:px-10 lg:px-16">
          {services.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <LiquidGlassCard
                key={item.title}
                draggable={false}
                expandable
                expanded={isOpen}
                onExpandedChange={(next) => setOpenIndex(next ? index : null)}
                width="100%"
                expandedWidth="100%"
                borderRadius="14px"
                shadowIntensity="sm"
                glowIntensity="xs"
                className="p-7 sm:p-9"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
                  <div className="min-w-0">
                    <h2 className="font-serif text-2xl leading-tight text-ink sm:text-[1.9rem]">{item.title}</h2>
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-[56ch] pt-4 text-sm leading-relaxed text-ink/72 sm:pt-5 sm:text-base">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="shrink-0 text-left text-[0.62rem] uppercase tracking-[0.18em] text-ink/45 md:max-w-[14ch] md:text-right">
                    {item.tag}
                  </p>
                </div>
                <p className="mt-4 text-[0.62rem] uppercase tracking-[0.16em] text-ink/38 md:hidden">
                  {isOpen ? "Tap to collapse" : "Tap to read"}
                </p>
              </LiquidGlassCard>
            );
          })}
        </div>
      </section>

      <PageCta />
    </>
  );
}
