"use client";

/**
 * Pinned hero: outer section is tall (`180vh`) while inner viewport is sticky.
 * Scroll-linked transforms are applied imperatively (no React state) for performance.
 * On iOS Safari, uses `visualViewport` height where available to reduce URL-bar jitter.
 */
import { useLayoutEffect, useRef } from "react";

import { ButtonLink } from "@/components/ui/button";
import { homeCopy } from "@/lib/site-content";

/** @deprecated Import from `@/lib/site-content` — kept for backward-compatible imports from this module. */
export { HOME_HERO_BACKGROUND_IMAGE } from "@/lib/site-content";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(value: number) {
  return value * value * (3 - 2 * value);
}

function readViewportHeight() {
  if (typeof window === "undefined") {
    return 800;
  }
  return window.visualViewport?.height ?? window.innerHeight;
}

export function HomeHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const heroBgRef = useRef<HTMLDivElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const reduceMotionRef = useRef(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMq = () => {
      reduceMotionRef.current = mq.matches;
    };
    syncMq();
    mq.addEventListener("change", syncMq);

    let scrollRaf = 0;

    const resetTransforms = () => {
      const content = heroContentRef.current;
      const bg = heroBgRef.current;
      if (content) {
        content.style.transform = "";
        content.style.opacity = "";
      }
      if (bg) {
        bg.style.transform = "";
        bg.style.opacity = "";
      }
    };

    const tick = () => {
      scrollRaf = 0;
      const section = sectionRef.current;
      const content = heroContentRef.current;
      const bg = heroBgRef.current;
      if (!section || !content || !bg) {
        return;
      }

      if (reduceMotionRef.current) {
        resetTransforms();
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = readViewportHeight();
      const totalScrollable = Math.max(rect.height - viewportHeight, 1);
      const pinned = clamp(-rect.top / totalScrollable, 0, 1);
      const revealRaw = clamp((pinned - 0.05) / 0.7, 0, 1);
      const reveal = smoothstep(revealRaw);
      const panelReveal = clamp((reveal - 0.05) / 0.95, 0, 1);

      const heroScale = 1 - panelReveal * 0.1;
      const heroLift = panelReveal * -10;

      const bgScale = 1.04 + 0.1 * (1 - smoothstep(pinned));
      const bgLift = pinned * -22;

      const exit = clamp((pinned - 0.78) / 0.22, 0, 1);
      const heroOpacity = 1 - exit * exit;
      const bgOpacity = 1 - exit;

      content.style.transform = `translateY(${heroLift}px) scale(${heroScale})`;
      content.style.opacity = String(heroOpacity);
      bg.style.transform = `translateY(${bgLift}px) scale(${bgScale})`;
      bg.style.opacity = String(0.29 * bgOpacity);
    };

    const onScrollOrResize = () => {
      if (scrollRaf) {
        return;
      }
      scrollRaf = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    window.visualViewport?.addEventListener("resize", onScrollOrResize);

    return () => {
      mq.removeEventListener("change", syncMq);
      if (scrollRaf) {
        cancelAnimationFrame(scrollRaf);
      }
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.visualViewport?.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero-surface relative isolate h-[180vh] w-full">
      <div className="sticky top-0 h-[100svh] min-h-[100svh] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-black" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_36%,rgba(250,248,244,0.14)_0%,transparent_58%)]"
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div
            ref={heroBgRef}
            className="absolute inset-[-10%] bg-cover bg-center"
            style={{
              backgroundImage: `url("${homeCopy.heroImage}")`
            }}
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(18,24,33,0.54)_0%,rgba(18,24,33,0.46)_45%,rgba(18,24,33,0.74)_100%)]"
          aria-hidden
        />
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-24" aria-hidden />

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col px-6 pb-16 pt-[calc(env(safe-area-inset-top)+6rem)] sm:px-10 sm:pb-20 sm:pt-[calc(env(safe-area-inset-top)+7rem)] lg:px-16 lg:pb-24 lg:pt-[calc(env(safe-area-inset-top)+8rem)]">
          <div className="my-auto flex flex-1 -translate-y-6 items-center justify-center py-10 sm:-translate-y-8 sm:py-16 lg:-translate-y-10 lg:py-20">
            <div
              ref={heroContentRef}
              className="animate-slow-fade w-full max-w-[760px] text-center transition-transform duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:translate-y-0"
            >
              <p className="mb-7 text-xs uppercase tracking-[0.2em] text-ink/64 sm:text-[0.78rem]">
                {homeCopy.heroEyebrow}
              </p>
              <h1 className="mx-auto max-w-[12ch] text-center font-serif text-5xl leading-[0.94] text-ink sm:text-6xl md:text-7xl lg:text-[5.4rem]">
                {homeCopy.heroHeadline}
              </h1>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 sm:mt-14">
                <ButtonLink href={homeCopy.heroPrimaryCta.href} variant="ghost">
                  {homeCopy.heroPrimaryCta.label}
                </ButtonLink>
                <ButtonLink href={homeCopy.heroSecondaryCta.href} variant="linkArrow">
                  {homeCopy.heroSecondaryCta.label}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
