"use client";

/**
 * Dark-themed bento layout aligned with Gaia Capital typography (serif headings, ink/night surfaces).
 * Consumes RSC-safe {@link BentoSeedItem} records from `lib/site-content` (`iconKey` resolved here).
 */
import Image from "next/image";
import Link from "next/link";

import { Building2, Cpu, Landmark, Layers, Sparkles, type LucideIcon } from "lucide-react";

import type { BentoIconKey, BentoSeedItem } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const BENTO_ICONS: Record<BentoIconKey, LucideIcon> = {
  building2: Building2,
  landmark: Landmark,
  sparkles: Sparkles,
  layers: Layers,
  cpu: Cpu
};

export type BentoGridProps = {
  items: BentoSeedItem[];
  className?: string;
};

export function BentoGrid({ items, className }: BentoGridProps) {
  return (
    <div className={cn("mx-auto grid max-w-[1440px] grid-cols-1 gap-3 md:grid-cols-3", className)}>
      {items.map((item) => {
        const Icon = BENTO_ICONS[item.iconKey];
        const inner = (
          <>
            <div
              className={cn(
                "pointer-events-none absolute inset-0 transition-opacity duration-500",
                "bg-[radial-gradient(circle_at_center,rgba(245,242,237,0.04)_1px,transparent_1px)] bg-[length:5px_5px]",
                item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              )}
              aria-hidden
            />

            <div className="relative flex min-h-[44px] flex-col gap-5">
              <div className="flex items-center justify-between gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-ink/8 text-ink/72">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                {item.status ? (
                  <span className="rounded-md bg-ink/8 px-2 py-1 text-[0.62rem] uppercase tracking-[0.16em] text-ink/55">
                    {item.status}
                  </span>
                ) : null}
              </div>

              {item.logoSrc ? (
                <div className="relative min-h-[36px]">
                  <Image src={item.logoSrc} alt="" width={220} height={48} className="h-9 w-auto max-w-[200px]" />
                </div>
              ) : null}

              <div className="space-y-2">
                <h3 className="font-serif text-2xl leading-tight tracking-tight text-ink sm:text-[1.6rem]">
                  {item.title}
                  {item.meta ? (
                    <span className="ml-3 font-sans text-[0.65rem] uppercase tracking-[0.16em] text-ink/40">
                      {item.meta}
                    </span>
                  ) : null}
                </h3>
                <p className="max-w-[56ch] text-sm leading-relaxed text-ink/72 sm:text-[0.9375rem]">
                  {item.description}
                </p>
              </div>

              <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
                {item.tags && item.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-ink/8 px-2 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-ink/55"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span />
                )}
                <span className="text-[0.62rem] uppercase tracking-[0.14em] text-ink/45 opacity-0 transition-opacity group-hover:opacity-100 motion-reduce:opacity-100 motion-reduce:group-hover:opacity-100">
                  {item.cta ?? "Explore"}
                </span>
              </div>
            </div>

            <div
              className={cn(
                "pointer-events-none absolute inset-0 -z-10 rounded-[14px] bg-gradient-to-br from-transparent via-white/[0.06] to-transparent p-px opacity-0 transition-opacity duration-300",
                item.hasPersistentHover ? "opacity-100" : "group-hover:opacity-100"
              )}
              aria-hidden
            />
          </>
        );

        const shellClass = cn(
          "group relative block min-h-[44px] overflow-hidden rounded-[14px] border border-ink/14 bg-night/55 p-7 shadow-bento sm:p-9",
          "transition-[transform,border-color,background-color,box-shadow] duration-300 motion-reduce:transition-none",
          "hover:-translate-y-0.5 hover:border-ink/22 hover:bg-night/65 motion-reduce:hover:translate-y-0",
          item.colSpan === 2 && "md:col-span-2",
          item.colSpan === 3 && "md:col-span-3",
          item.hasPersistentHover && "border-ink/22 bg-night/65"
        );

        if (!item.href) {
          return (
            <div key={item.id} id={item.id} className={shellClass}>
              {inner}
            </div>
          );
        }

        if (item.href.startsWith("/")) {
          return (
            <Link key={item.id} id={item.id} href={item.href} className={shellClass}>
              {inner}
            </Link>
          );
        }

        return (
          <a key={item.id} id={item.id} href={item.href} className={shellClass}>
            {inner}
          </a>
        );
      })}
    </div>
  );
}
