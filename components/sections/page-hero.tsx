/**
 * Standard inner-page hero (eyebrow, title, lede). Top padding includes safe-area for notched devices.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  className = ""
}: {
  eyebrow: string;
  title: string;
  lede: string;
  className?: string;
}) {
  return (
    <header
      className={`mx-auto w-full max-w-[1440px] px-6 pb-16 pt-[calc(env(safe-area-inset-top)+7rem)] text-center sm:px-10 sm:pb-20 sm:pt-[calc(env(safe-area-inset-top)+8rem)] lg:px-16 lg:pt-[calc(env(safe-area-inset-top)+9rem)] ${className}`}
    >
      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-ink/48">{eyebrow}</p>
      <h1 className="mx-auto mt-6 max-w-[18ch] font-serif text-4xl leading-[1.02] text-ink sm:max-w-[22ch] sm:text-5xl md:text-6xl">
        {title}
      </h1>
      <p className="mx-auto mt-8 max-w-[56ch] text-sm leading-relaxed text-ink/72 sm:text-base">{lede}</p>
    </header>
  );
}
