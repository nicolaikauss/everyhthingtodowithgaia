import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-14 sm:py-16">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <p className="font-serif text-lg tracking-[0.08em] text-ink/92">Gaia Capital</p>
            <p className="mt-5 max-w-[32ch] text-sm leading-relaxed text-ink/55">
              Private advisory and strategic capital perspective — selective by design.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-14">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.16em] text-ink/42">Explore</p>
              <ul className="mt-5 space-y-3">
                <li>
                  <Link
                    href="/approach"
                    className="footer-grow-link text-[0.68rem] uppercase tracking-[0.14em] text-ink/58 transition-colors hover:text-ink/88"
                  >
                    Approach
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="footer-grow-link text-[0.68rem] uppercase tracking-[0.14em] text-ink/58 transition-colors hover:text-ink/88"
                  >
                    Services
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.16em] text-ink/42">Firm</p>
              <ul className="mt-5 space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="footer-grow-link text-[0.68rem] uppercase tracking-[0.14em] text-ink/58 transition-colors hover:text-ink/88"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#contact"
                    className="footer-grow-link text-[0.68rem] uppercase tracking-[0.14em] text-ink/58 transition-colors hover:text-ink/88"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:text-right">
            <p className="text-[0.62rem] uppercase tracking-[0.16em] text-ink/42">Discretion</p>
            <p className="mt-5 text-sm leading-relaxed text-ink/55 lg:ml-auto lg:max-w-[28ch]">
              Conversations are handled with care. This site is a quiet introduction — not a substitute for a private
              briefing.
            </p>
            <p className="mt-8 text-xs text-ink/48">International advisory perspective</p>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-ink/45">© {new Date().getFullYear()} Gaia Capital</p>
            <div className="flex flex-wrap gap-6 text-[0.62rem] uppercase tracking-[0.14em] text-ink/42">
              <Link href="/#contact" className="footer-grow-link transition-colors hover:text-ink/75">
                Begin a conversation
              </Link>
              <Link href="/#why-gaia" className="footer-grow-link transition-colors hover:text-ink/75">
                Why Gaia
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
