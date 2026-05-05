"use client";

/**
 * Horizontal scrub of positioning panels over a sticky lobby still.
 * Uses `iphone-scrub` overscroll containment and `visualViewport` for stable range math on iOS.
 */

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

import { positioningIntroCopy, positioningOffers } from "@/lib/site-content";

/** Lobby still from `section_ambiances_architecturales.html` (Le Lobby / render_53) — extracted to public */
export const POSITIONING_LOBBY_BG = "/positioning-lobby-bg.jpg";

function splitTitle(s: string) {
  const parts = s.split("\n");
  return parts.map((line, i) => (
    <span key={i}>
      {i > 0 ? <br /> : null}
      {line}
    </span>
  ));
}

function readViewportHeight() {
  if (typeof window === "undefined") {
    return 800;
  }
  return window.visualViewport?.height ?? window.innerHeight;
}

function readViewportWidth() {
  if (typeof window === "undefined") {
    return 1200;
  }
  return window.visualViewport?.width ?? window.innerWidth;
}

export function PositioningOffersSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const reduceMotionRef = useRef(false);

  const applyScroll = useCallback(() => {
    if (reduceMotionRef.current) {
      return;
    }
    const track = trackRef.current;
    const frame = frameRef.current;
    if (!track || !frame) {
      return;
    }
    const rect = track.getBoundingClientRect();
    const vh = readViewportHeight();
    const range = track.offsetHeight - vh;
    if (range <= 0) {
      frame.style.transform = "translate3d(0,0,0)";
      return;
    }
    const p = Math.min(1, Math.max(0, -rect.top / range));
    const vw = readViewportWidth();
    const maxX = Math.max(0, frame.scrollWidth - vw);
    frame.style.transform = `translate3d(-${p * maxX}px, 0, 0)`;
  }, []);

  useLayoutEffect(() => {
    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    applyScroll();
  }, [applyScroll]);

  useEffect(() => {
    if (reduceMotionRef.current) {
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(applyScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.visualViewport?.addEventListener("resize", onScroll);
    applyScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.visualViewport?.removeEventListener("resize", onScroll);
    };
  }, [applyScroll]);

  return (
    <section id="positioning" className="relative w-full bg-black" aria-labelledby="positioning-heading">
      <div
        ref={trackRef}
        className="iphone-scrub sentosa-offers-track relative z-10 h-[min(118vw,230svh)] w-full"
      >
        <div className="sentosa-offers-camera sticky top-0 h-[100dvh] min-h-[100svh] w-full overflow-hidden bg-black">
          <h2 id="positioning-heading" className="sr-only">
            {positioningIntroCopy.srHeading}
          </h2>

          <div className="pointer-events-none absolute inset-0 overflow-hidden bg-black" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element -- native img in sticky scrub for perf */}
            <img
              src={POSITIONING_LOBBY_BG}
              alt=""
              width={2117}
              height={1614}
              decoding="async"
              draggable={false}
              className="pointer-events-none absolute inset-0 block h-full w-full max-w-none object-cover object-center outline-none ring-0"
              style={{
                objectPosition: "50% 68%",
                transform: "scale(1.12)",
                transformOrigin: "center center",
                backfaceVisibility: "hidden"
              }}
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(5,7,10,0.82)] via-[rgba(7,9,12,0.52)] to-[rgba(5,6,9,0.9)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[16%] bg-gradient-to-b from-black via-[rgba(5,6,9,0.65)] to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_100%_0%,rgba(5,7,10,0.5),transparent_62%)]"
            aria-hidden
          />

          <div
            ref={frameRef}
            className="sentosa-offers-frame relative flex h-full w-max max-w-none items-stretch"
          >
            <div className="sentosa-offers-panel flex h-full w-[min(92vw,520px)] flex-none items-center justify-end pr-6 pt-16 sm:w-[min(88vw,560px)] sm:pr-10 sm:pt-20 md:w-[56vw] md:pr-14 lg:pr-20">
              <div className="w-full max-w-[400px] space-y-6 text-left">
                <p className="font-sans text-[0.68rem] uppercase tracking-[0.18em] text-ink/50">
                  {positioningIntroCopy.eyebrow}
                </p>
                <p className="font-serif text-2xl leading-snug text-ink/90 sm:text-[1.65rem] sm:leading-tight">
                  {positioningIntroCopy.title}
                </p>
                <p className="font-sans text-sm leading-[1.75] text-ink/68 sm:text-[0.9375rem]">
                  {positioningIntroCopy.body}
                </p>
              </div>
            </div>

            {positioningOffers.map((item) => (
              <div
                key={item.num}
                className="sentosa-offers-panel flex h-full w-[min(92vw,520px)] flex-none items-center justify-end pr-6 sm:w-[min(88vw,600px)] sm:pr-10 md:w-[56vw] md:pr-14 lg:pr-20"
              >
                <article className="group w-full max-w-[400px]">
                  <div className="flex flex-col gap-7 sm:gap-8">
                    <span className="font-sans text-[0.65rem] uppercase tracking-[0.22em] text-ink/38 transition-colors duration-700 ease-out group-hover:text-ink/50">
                      {item.num}
                    </span>
                    <h3 className="font-serif text-[clamp(1.75rem,4.2vw,3rem)] font-normal leading-[1.05] tracking-[-0.02em] text-ink transition-colors duration-700 ease-out group-hover:text-ink/[0.92]">
                      {splitTitle(item.title)}
                    </h3>
                    <p className="font-sans text-sm leading-[1.75] text-ink/68 sm:text-[0.9375rem] sm:leading-[1.8] transition-colors duration-700 ease-out group-hover:text-ink/74">
                      {item.text}
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
