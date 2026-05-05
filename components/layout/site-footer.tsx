/**
 * Site-wide footer: firm narrative, explore links, discretion note, and Gaia Labs subsidiary row.
 * Copy is sourced from `footerCopy` in `lib/site-content`.
 */
import Image from "next/image";
import Link from "next/link";

import { brandAssets, footerCopy } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-14 sm:py-16">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <Link
              href="/"
              aria-label={footerCopy.capitalLogoAlt}
              className="inline-block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-night"
            >
              <Image
                src={brandAssets.capitalMarkLight}
                alt={footerCopy.capitalLogoAlt}
                width={200}
                height={56}
                className="h-7 w-auto opacity-90"
              />
            </Link>
            <p className="mt-5 max-w-[32ch] text-sm leading-relaxed text-ink/55">{footerCopy.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-14">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.16em] text-ink/42">{footerCopy.exploreLabel}</p>
              <ul className="mt-5 space-y-3">
                <li>
                  <Link
                    href="/portfolio"
                    className="footer-grow-link text-[0.68rem] uppercase tracking-[0.14em] text-ink/58 transition-colors hover:text-ink/88"
                  >
                    {footerCopy.links.portfolio}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.16em] text-ink/42">{footerCopy.firmLabel}</p>
              <ul className="mt-5 space-y-3">
                <li>
                  <Link
                    href="/#contact"
                    className="footer-grow-link text-[0.68rem] uppercase tracking-[0.14em] text-ink/58 transition-colors hover:text-ink/88"
                  >
                    {footerCopy.links.contact}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:text-right">
            <p className="text-[0.62rem] uppercase tracking-[0.16em] text-ink/42">{footerCopy.discretionLabel}</p>
            <p className="mt-5 text-sm leading-relaxed text-ink/55 lg:ml-auto lg:max-w-[28ch]">
              {footerCopy.discretionBody}
            </p>
            <p className="mt-8 text-xs text-ink/48">{footerCopy.discretionMeta}</p>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-ink/45">© {new Date().getFullYear()} Gaia Capital</p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <Link
                href={footerCopy.labsHref}
                className="inline-flex items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-night"
              >
                <span className="text-[0.62rem] uppercase tracking-[0.14em] text-ink/42">
                  {footerCopy.subsidiaryLabel}
                </span>
                <Image
                  src={brandAssets.labsMarkLight}
                  alt={footerCopy.labsLogoAlt}
                  width={160}
                  height={40}
                  className="h-6 w-auto opacity-95"
                />
              </Link>
              <div className="flex flex-wrap gap-6 text-[0.62rem] uppercase tracking-[0.14em] text-ink/42">
                <Link href="/#contact" className="footer-grow-link transition-colors hover:text-ink/75">
                  {footerCopy.bottomLinks.conversation}
                </Link>
                <Link href="/#why-gaia" className="footer-grow-link transition-colors hover:text-ink/75">
                  {footerCopy.bottomLinks.whyGaia}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
