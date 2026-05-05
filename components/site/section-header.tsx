export function SectionHeader({
  label,
  title,
  text
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <div className="max-w-[760px]">
      <p className="text-[0.68rem] uppercase tracking-[0.16em] text-ink/55">{label}</p>
      <h2 className="mt-4 max-w-[18ch] font-serif text-4xl leading-[1.02] text-ink sm:text-5xl">
        {title}
      </h2>
      <p className="mt-6 max-w-[60ch] text-sm leading-relaxed text-ink/75 sm:text-base">{text}</p>
    </div>
  );
}
