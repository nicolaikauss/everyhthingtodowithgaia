/**
 * Closing CTA strip for portfolio/about routes; copy from `ctaCopy`.
 */
import { ButtonLink } from "@/components/ui/button";
import { ctaCopy } from "@/lib/site-content";

export function PageCta() {
  return (
    <section className="border-t border-white/[0.06] bg-night/20 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[760px] px-6 text-center sm:px-10 lg:px-16">
        <p className="text-[0.68rem] uppercase tracking-[0.18em] text-ink/48">{ctaCopy.eyebrow}</p>
        <h2 className="mt-5 font-serif text-3xl leading-tight text-ink sm:text-4xl">{ctaCopy.title}</h2>
        <p className="mx-auto mt-5 max-w-[48ch] text-sm leading-relaxed text-ink/65 sm:text-base">{ctaCopy.body}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <ButtonLink href="/#contact" variant="subtle">
            {ctaCopy.primary}
          </ButtonLink>
          <ButtonLink href="/" variant="linkArrow">
            {ctaCopy.secondary}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
