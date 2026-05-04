import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-night px-6">
      <div className="max-w-lg text-center">
        <p className="text-xs uppercase tracking-[0.16em] text-ink/55">Not Found</p>
        <h1 className="mt-4 font-serif text-4xl text-ink sm:text-5xl">Page unavailable</h1>
        <p className="mt-5 text-sm leading-relaxed text-ink/72 sm:text-base">
          The page you requested is not available.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-sm border border-ink/30 px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-ink transition hover:border-ink/55 hover:bg-white/[0.03]"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
