"use client";

/**
 * Horizontal scrub of positioning panels over a sticky lobby still.
 * Uses `iphone-scrub` overscroll containment and `visualViewport` for stable range math on iOS.
 * Track height is computed from horizontal travel + viewport so mobile range stays positive.
 */

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

import { positioningOffers } from "@/lib/site-content";
import { cn } from "@/lib/utils";

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
  const applyScrollSampleRef = useRef(0);
  const healthyApplyLoggedRef = useRef(false);

  const applyScroll = useCallback(() => {
    // #region agent log
    if (reduceMotionRef.current) {
      fetch("http://127.0.0.1:7704/ingest/c525ad29-80b5-433a-89d4-3c2ad67c5159", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "b335d7" },
        body: JSON.stringify({
          sessionId: "b335d7",
          runId: "pre-fix",
          hypothesisId: "H2",
          location: "positioning-offers-section.tsx:applyScroll",
          message: "applyScroll skipped: prefers-reduced-motion",
          data: {},
          timestamp: Date.now()
        })
      }).catch(() => {});
      return;
    }
    // #endregion
    const track = trackRef.current;
    const frame = frameRef.current;
    if (!track || !frame) {
      // #region agent log
      fetch("http://127.0.0.1:7704/ingest/c525ad29-80b5-433a-89d4-3c2ad67c5159", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "b335d7" },
        body: JSON.stringify({
          sessionId: "b335d7",
          runId: "pre-fix",
          hypothesisId: "H5",
          location: "positioning-offers-section.tsx:applyScroll",
          message: "applyScroll skipped: missing refs",
          data: { hasTrack: !!track, hasFrame: !!frame },
          timestamp: Date.now()
        })
      }).catch(() => {});
      // #endregion
      return;
    }
    const rect = track.getBoundingClientRect();
    const vh = readViewportHeight();
    const range = track.offsetHeight - vh;
    if (range <= 0) {
      // #region agent log
      fetch("http://127.0.0.1:7704/ingest/c525ad29-80b5-433a-89d4-3c2ad67c5159", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "b335d7" },
        body: JSON.stringify({
          sessionId: "b335d7",
          runId: "pre-fix",
          hypothesisId: "H3",
          location: "positioning-offers-section.tsx:applyScroll",
          message: "range<=0 scrub noop",
          data: {
            trackOffsetH: track.offsetHeight,
            vh,
            range,
            rectTop: rect.top,
            scrollW: frame.scrollWidth,
            innerH: typeof window !== "undefined" ? window.innerHeight : null,
            vvH: typeof window !== "undefined" ? window.visualViewport?.height ?? null : null
          },
          timestamp: Date.now()
        })
      }).catch(() => {});
      // #endregion
      frame.style.transform = "translate3d(0,0,0)";
      return;
    }
    const p = Math.min(1, Math.max(0, -rect.top / range));
    const vw = readViewportWidth();
    const maxX = Math.max(0, frame.scrollWidth - vw);
    if (!healthyApplyLoggedRef.current) {
      healthyApplyLoggedRef.current = true;
      // #region agent log
      fetch("http://127.0.0.1:7704/ingest/c525ad29-80b5-433a-89d4-3c2ad67c5159", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "b335d7" },
        body: JSON.stringify({
          sessionId: "b335d7",
          runId: "pre-fix",
          hypothesisId: "H4",
          location: "positioning-offers-section.tsx:applyScroll",
          message: "first healthy applyScroll (range>0)",
          data: { p, range, maxX, rectTop: rect.top, vw, vh, scrollW: frame.scrollWidth, trackH: track.offsetHeight },
          timestamp: Date.now()
        })
      }).catch(() => {});
      // #endregion
    }
    applyScrollSampleRef.current += 1;
    if (applyScrollSampleRef.current % 10 === 0) {
      // #region agent log
      fetch("http://127.0.0.1:7704/ingest/c525ad29-80b5-433a-89d4-3c2ad67c5159", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "b335d7" },
        body: JSON.stringify({
          sessionId: "b335d7",
          runId: "pre-fix",
          hypothesisId: "H4",
          location: "positioning-offers-section.tsx:applyScroll",
          message: "applyScroll sample",
          data: { p, range, maxX, rectTop: rect.top, vw, vh, scrollW: frame.scrollWidth },
          timestamp: Date.now()
        })
      }).catch(() => {});
      // #endregion
    }
    if (maxX === 0 && p > 0.01) {
      // #region agent log
      fetch("http://127.0.0.1:7704/ingest/c525ad29-80b5-433a-89d4-3c2ad67c5159", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "b335d7" },
        body: JSON.stringify({
          sessionId: "b335d7",
          runId: "pre-fix",
          hypothesisId: "H4",
          location: "positioning-offers-section.tsx:applyScroll",
          message: "maxX zero but p>0",
          data: { p, scrollW: frame.scrollWidth, vw },
          timestamp: Date.now()
        })
      }).catch(() => {});
      // #endregion
    }
    frame.style.transform = `translate3d(-${p * maxX}px, 0, 0)`;
  }, []);

  const updateTrackHeight = useCallback(() => {
    const track = trackRef.current;
    const frame = frameRef.current;
    if (!track || !frame) {
      return;
    }
    if (reduceMotionRef.current) {
      track.style.height = "";
      return;
    }
    const vw = readViewportWidth();
    const vh = readViewportHeight();
    const horizontalTravel = Math.max(0, frame.scrollWidth - vw);
    const heightPx = Math.round(horizontalTravel + vh);
    track.style.height = `${heightPx}px`;
    // #region agent log
    fetch("http://127.0.0.1:7704/ingest/c525ad29-80b5-433a-89d4-3c2ad67c5159", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "b335d7" },
      body: JSON.stringify({
        sessionId: "b335d7",
        runId: "pre-fix",
        hypothesisId: "H1",
        location: "positioning-offers-section.tsx:updateTrackHeight",
        message: "track height set",
        data: {
          vw,
          vh,
          scrollW: frame.scrollWidth,
          horizontalTravel,
          heightPx,
          innerW: typeof window !== "undefined" ? window.innerWidth : null,
          vvW: typeof window !== "undefined" ? window.visualViewport?.width ?? null : null
        },
        timestamp: Date.now()
      })
    }).catch(() => {});
    // #endregion
  }, []);

  const layoutRefresh = useCallback(() => {
    updateTrackHeight();
    applyScroll();
  }, [updateTrackHeight, applyScroll]);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMq = () => {
      reduceMotionRef.current = mq.matches;
      layoutRefresh();
    };
    syncMq();
    mq.addEventListener("change", syncMq);
    return () => mq.removeEventListener("change", syncMq);
  }, [layoutRefresh]);

  useEffect(() => {
    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(layoutRefresh);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("scroll", schedule);
    window.addEventListener("orientationchange", schedule);
    window.addEventListener("pageshow", schedule);
    window.addEventListener("load", schedule);

    if ("fonts" in document) {
      void document.fonts.ready.then(schedule);
    }

    schedule();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("scroll", schedule);
      window.removeEventListener("orientationchange", schedule);
      window.removeEventListener("pageshow", schedule);
      window.removeEventListener("load", schedule);
    };
  }, [layoutRefresh]);

  return (
    <section id="positioning" className="relative w-full bg-black" aria-labelledby="positioning-heading">
      <div ref={trackRef} className="iphone-scrub sentosa-offers-track relative z-10 w-full">
        <div className="sentosa-offers-camera sticky top-0 h-[100svh] w-full overflow-hidden bg-black">
          <h2 id="positioning-heading" className="sr-only">
            Positioning and offerings
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
            {positioningOffers.map((item, index) => (
              <div
                key={`${index}-${item.num}`}
                className={cn(
                  "sentosa-offers-panel flex h-full w-[min(92vw,520px)] flex-none items-center pr-6 sm:w-[min(88vw,600px)] sm:pr-10 md:w-[56vw] md:pr-14 lg:pr-20",
                  index === 0 ? "justify-end md:justify-center" : "justify-end"
                )}
              >
                <article className={cn("group w-full max-w-[400px]", index === 0 ? "md:max-w-[500px]" : "")}>
                  <div className={cn("flex flex-col gap-7 sm:gap-8", index === 0 ? "justify-center gap-0" : "")}>
                    {item.num ? (
                      <span className="font-sans text-[0.65rem] uppercase tracking-[0.22em] text-ink/38 transition-colors duration-700 ease-out group-hover:text-ink/50">
                        {item.num}
                      </span>
                    ) : null}
                    <h3
                      className={cn(
                        "font-serif font-normal tracking-[-0.02em] text-ink transition-colors duration-700 ease-out group-hover:text-ink/[0.92]",
                        index === 0
                          ? "text-[clamp(2.6rem,7.2vw,5.4rem)] leading-[0.95]"
                          : "text-[clamp(1.75rem,4.2vw,3rem)] leading-[1.05]"
                      )}
                    >
                      {splitTitle(item.title)}
                    </h3>
                    {item.text ? (
                      <p className="font-sans text-sm leading-[1.75] text-ink/68 sm:text-[0.9375rem] sm:leading-[1.8] transition-colors duration-700 ease-out group-hover:text-ink/74">
                        {item.text}
                      </p>
                    ) : null}
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
