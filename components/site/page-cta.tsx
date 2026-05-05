import { ButtonLink } from "@/components/ui/button";

export function PageCta() {
  return (
    <section className="border-t border-white/[0.06] bg-night/20 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[760px] px-6 text-center sm:px-10 lg:px-16">
        <p className="text-[0.68rem] uppercase tracking-[0.18em] text-ink/48">Next step</p>
        <h2 className="mt-5 font-serif text-3xl leading-tight text-ink sm:text-4xl">Begin in confidence</h2>
        <p className="mx-auto mt-5 max-w-[48ch] text-sm leading-relaxed text-ink/65 sm:text-base">
          If the fit is right, we will continue the conversation with discretion and care.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <ButtonLink href="/#contact" variant="subtle">
            Open the contact form
          </ButtonLink>
          <ButtonLink href="/" variant="linkArrow">
            Return home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
