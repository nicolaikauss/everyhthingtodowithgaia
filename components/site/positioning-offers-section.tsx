"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

/** Lobby still from `section_ambiances_architecturales.html` (Le Lobby / render_53) — extracted to public */
export const POSITIONING_LOBBY_BG = "/positioning-lobby-bg.jpg";

const offers = [
  {
    num: "01",
    title: "Strategic\nadvisory",
    text: "Capital strategy, partnership design, and positioning for decisions that cannot be rushed."
  },
  {
    num: "02",
    title: "Investment\nperspective",
    text: "Assessment and allocation judgment across private and strategic opportunities, with continuity in mind."
  },
  {
    num: "03",
    title: "Private capital\nsupport",
    text: "Discreet introductions, structuring context, and readiness for transactions that depend on trust."
  },
  {
    num: "04",
    title: "Governance &\ncontinuity",
    text: "Framing choices through time horizon, downside awareness, and the stakeholders who will live with the outcome."
  }
] as const;

function splitTitle(s: string) {
  const parts = s.split("\n");
  return parts.map((line, i) => (
    <span key={i}>
      {i > 0 ? <br /> : null}
      {line}
    </span>
  ));
}

export function PositioningOffersSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const reduceMotionRef = useRef(false);
  const [scrollX, setScrollX] = useState(0);

  useLayoutEffect(() => {
    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const updateScroll = useCallback(() => {
    if (reduceMotionRef.current) return;
    const track = trackRef.current;
    const frame = frameRef.current;
    if (!track || !frame) return;
    const rect = track.getBoundingClientRect();
    const range = track.offsetHeight - window.innerHeight;
    if (range <= 0) {
      setScrollX(0);
      return;
    }
    const p = Math.min(1, Math.max(0, -rect.top / range));
    const maxX = Math.max(0, frame.scrollWidth - window.innerWidth);
    setScrollX(p * maxX);
  }, []);

  useEffect(() => {
    if (reduceMotionRef.current) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateScroll]);

  return (
    <section id="positioning" className="relative w-full bg-black" aria-labelledby="positioning-heading">
      <div
        ref={trackRef}
        className="sentosa-offers-track relative z-10 w-full h-[min(118vw,230svh)]"
      >
        <div className="sentosa-offers-camera sticky top-0 h-[100dvh] min-h-[100svh] w-full overflow-hidden bg-black">
          <h2 id="positioning-heading" className="sr-only">
            Positioning and offerings
          </h2>

          <div className="pointer-events-none absolute inset-0 overflow-hidden bg-black" aria-hidden>
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
                backfaceVisibility: "hidden",
                filter: "brightness(0.85) saturate(0.92)"
              }}
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(5,7,10,0.72)] via-[rgba(7,9,12,0.4)] to-[rgba(5,6,9,0.86)]"
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
            className="sentosa-offers-frame relative flex h-full w-max max-w-none items-stretch will-change-transform"
            style={{ transform: `translate3d(-${scrollX}px, 0, 0)` }}
          >
            <div className="sentosa-offers-panel flex h-full w-[min(92vw,520px)] flex-none items-center justify-end pr-6 pt-16 sm:w-[min(88vw,560px)] sm:pr-10 sm:pt-20 md:w-[56vw] md:pr-14 lg:pr-20">
              <div className="w-full max-w-[400px] space-y-6 text-left">
                <p className="font-sans text-[0.68rem] uppercase tracking-[0.18em] text-ink/50">
                  Positioning
                </p>
                <p className="font-serif text-2xl leading-snug text-ink/90 sm:text-[1.65rem] sm:leading-tight">
                  Selective advisory for complex capital decisions.
                </p>
                <p className="font-sans text-sm leading-[1.75] text-ink/68 sm:text-[0.9375rem]">
                  Gaia Capital supports clients who value judgment, discretion, and strategic clarity.
                  We work where continuity matters more than short-term momentum.
                </p>
              </div>
            </div>

            {offers.map((item) => (
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
