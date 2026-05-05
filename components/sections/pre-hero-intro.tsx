"use client";

/**
 * Full-screen brand beat before the hero loads; preloads hero + logo then dismisses.
 * Decorative only (`aria-hidden` on root); respects reduced motion for the exit transition.
 */

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { brandAssets, homeCopy } from "@/lib/site-content";

type IntroPhase = "visible" | "exiting" | "hidden";

type PreHeroIntroProps = {
  /** Preloaded when set (home hero background); omitted on other routes. */
  heroImageUrl?: string;
  logoSrc?: string;
};

const MIN_INTRO_MS = 1400;
const MAX_READY_WAIT_MS = 2800;
const EXIT_MS = 420;

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function waitForFonts() {
  if (typeof document === "undefined" || !("fonts" in document)) {
    return Promise.resolve();
  }

  return document.fonts.ready.then(() => undefined).catch(() => undefined);
}

function waitForWindowLoad() {
  if (document.readyState === "complete") {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const onLoad = () => resolve();
    window.addEventListener("load", onLoad, { once: true });
    window.setTimeout(resolve, 2500);
  });
}

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

function waitForNextPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

export function PreHeroIntro({
  heroImageUrl,
  logoSrc = brandAssets.capitalMarkLight
}: PreHeroIntroProps) {
  const [phase, setPhase] = useState<IntroPhase>("visible");
  const [reducedMotion, setReducedMotion] = useState(false);

  const isActive = phase !== "hidden";
  const overlayClass = useMemo(() => {
    if (phase === "visible") {
      return "opacity-100 scale-100 translate-y-0";
    }

    if (phase === "exiting") {
      return "opacity-0 scale-[1.005] -translate-y-1";
    }

    return "opacity-0 scale-100 translate-y-0 pointer-events-none";
  }, [phase]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isActive]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const minDuration = wait(MIN_INTRO_MS);
      const criticalTasks = [
        waitForFonts(),
        waitForWindowLoad(),
        ...(heroImageUrl ? [preloadImage(heroImageUrl)] : []),
        preloadImage(logoSrc),
        waitForNextPaint()
      ];
      const criticalReady = Promise.race([
        Promise.allSettled(criticalTasks),
        wait(MAX_READY_WAIT_MS)
      ]);

      await Promise.all([minDuration, criticalReady]);

      if (cancelled) {
        return;
      }

      setPhase("exiting");

      if (reducedMotion) {
        setPhase("hidden");
        return;
      }

      window.setTimeout(() => {
        if (!cancelled) {
          setPhase("hidden");
        }
      }, EXIT_MS);
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [heroImageUrl, logoSrc, reducedMotion]);

  if (phase === "hidden") {
    return null;
  }

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#050608] pl-safe-l pr-safe-r pt-safe-t pb-safe-b transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${overlayClass}`}
    >
      <div className="pointer-events-none flex flex-col items-center gap-5">
        <span className="h-px w-16 bg-white/20" aria-hidden />
        <Image
          src={logoSrc}
          alt={homeCopy.preHeroLogoAlt}
          width={300}
          height={90}
          priority
          className="h-auto w-[220px] bg-transparent opacity-90 sm:w-[280px]"
        />
        <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#f5f2ed]/52">
          {homeCopy.preHeroCaption}
        </p>
      </div>
    </div>
  );
}
