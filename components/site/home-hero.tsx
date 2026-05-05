"use client";

import { useEffect, useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/button";

export const HOME_HERO_BACKGROUND_IMAGE =
  "https://images.unsplash.com/photo-1759490902867-15cf6d82ab7e?auto=format&fit=crop&w=2200&q=80";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(value: number) {
  return value * value * (3 - 2 * value);
}

export function HomeHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealProgress, setRevealProgress] = useState(0);
  const [pinnedProgress, setPinnedProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) {
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollable = Math.max(rect.height - viewportHeight, 1);
      const pinned = clamp(-rect.top / totalScrollable, 0, 1);
      const revealRaw = clamp((pinned - 0.05) / 0.7, 0, 1);
      const reveal = smoothstep(revealRaw);
      setPinnedProgress(pinned);
      setRevealProgress(reveal);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const panelReveal = clamp((revealProgress - 0.05) / 0.95, 0, 1);
  const heroScale = 1 - panelReveal * 0.1;
  const heroLift = panelReveal * -10;

  const bgScale = 1.04 + 0.1 * (1 - smoothstep(pinnedProgress));
  const bgLift = pinnedProgress * -22;

  const exit = clamp((pinnedProgress - 0.78) / 0.22, 0, 1);
  const heroOpacity = 1 - exit * exit;
  const bgOpacity = 1 - exit;

  return (
    <section ref={sectionRef} className="hero-surface relative isolate h-[180vh] w-full">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-black" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_36%,rgba(245,242,237,0.09)_0%,transparent_58%)]"
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div
            className="absolute inset-[-10%] bg-cover bg-center will-change-[transform,opacity]"
            style={{
              backgroundImage: `url("${HOME_HERO_BACKGROUND_IMAGE}")`,
              transform: `translateY(${bgLift}px) scale(${bgScale})`,
              opacity: 0.29 * bgOpacity
            }}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,8,11,0.74)_0%,rgba(7,9,12,0.64)_45%,rgba(7,9,12,0.9)_100%)]" />
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-24" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col px-6 pb-16 pt-24 sm:px-10 sm:pb-20 sm:pt-28 lg:px-16 lg:pb-24 lg:pt-32">
          <div className="my-auto flex flex-1 -translate-y-6 items-center justify-center py-10 sm:-translate-y-8 sm:py-16 lg:-translate-y-10 lg:py-20">
            <div
              className="animate-slow-fade w-full max-w-[760px] text-center transition-transform duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[transform,opacity]"
              style={{
                transform: `translateY(${heroLift}px) scale(${heroScale})`,
                opacity: heroOpacity
              }}
            >
              <p className="mb-7 text-xs uppercase tracking-[0.2em] text-ink/64 sm:text-[0.78rem]">
                Private Advisory and Strategic Capital Perspective
              </p>
              <h1 className="mx-auto max-w-[12ch] text-center font-serif text-5xl leading-[0.94] text-ink sm:text-6xl md:text-7xl lg:text-[5.4rem]">
                Built for Long-Term Capital Decisions
              </h1>
              <p className="mx-auto mt-8 max-w-[50ch] text-center text-sm leading-relaxed text-ink/80 sm:text-base">
                Gaia Capital advises where judgment, discretion, and long-term alignment
                matter most.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
                <ButtonLink href="/#contact" variant="ghost">
                  Start a Conversation
                </ButtonLink>
                <ButtonLink href="/approach" variant="linkArrow">
                  Explore Our Approach
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
