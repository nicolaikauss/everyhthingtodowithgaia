"use client";

/**
 * Fixed primary navigation with scroll-linked backdrop blur and a mobile drawer.
 * Safe-area padding keeps the mark clear of the notch; links meet a 44px minimum tap height.
 */

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { brandAssets } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" }
] as const;

const contactHref = "/#contact";

function useHashContactActive() {
  const pathname = usePathname();
  const [contactFromHash, setContactFromHash] = useState(false);

  useEffect(() => {
    const read = () => {
      const hash = window.location.hash.replace(/^#/, "");
      setContactFromHash(pathname === "/" && hash === "contact");
    };

    read();
    window.addEventListener("hashchange", read);
    window.addEventListener("popstate", read);
    return () => {
      window.removeEventListener("hashchange", read);
      window.removeEventListener("popstate", read);
    };
  }, [pathname]);

  return contactFromHash;
}

function isRouteActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const contactNavActive = useHashContactActive();

  useEffect(() => {
    const onScroll = () => {
      if (pathname !== "/") {
        setIsScrolled(window.scrollY > 16);
        return;
      }

      const hero = document.querySelector<HTMLElement>("section.hero-surface");
      if (!hero) {
        setIsScrolled(window.scrollY > 16);
        return;
      }

      const heroBottom = hero.offsetTop + hero.offsetHeight;
      setIsScrolled(window.scrollY >= heroBottom - 88);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isMobileOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMobileOpen]);

  useEffect(() => {
    if (!isMobileOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-[border-color,background-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        isScrolled
          ? "border-white/10 bg-night/62 backdrop-blur-xl supports-[backdrop-filter]:bg-night/[0.56]"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-6 pt-safe-t sm:h-[4.6rem] sm:px-10 md:pt-0 lg:px-16">
        <Link
          href="/"
          aria-label="Gaia Capital"
          className="inline-flex min-h-11 items-center rounded-sm transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-night"
        >
          <Image
            src={brandAssets.capitalMarkLight}
            alt="Gaia Capital"
            width={260}
            height={72}
            priority
            className="h-auto w-[172px] sm:w-[198px]"
          />
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {navItems.map((item) => {
            const routeActive = isRouteActive(pathname, item.href);
            const isActive =
              item.href === "/" ? routeActive && !contactNavActive : routeActive;

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative inline-flex min-h-11 items-center rounded-sm px-1 py-2 text-[0.68rem] uppercase tracking-[0.14em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-night",
                  isActive ? "text-ink" : "text-ink/78 hover:text-ink"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "pointer-events-none absolute inset-x-1 -bottom-0.5 h-px origin-left bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                    isActive ? "scale-x-100" : "scale-x-0"
                  )}
                  aria-hidden
                />
              </Link>
            );
          })}
          <Link
            href={contactHref}
            aria-current={contactNavActive ? "page" : undefined}
            className={cn(
              "group relative inline-flex min-h-11 items-center gap-2 rounded-sm px-1 py-2 text-[0.68rem] uppercase tracking-[0.14em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-night",
              contactNavActive ? "text-ink" : "text-ink/84 hover:text-ink"
            )}
          >
            Contact
            <span className="h-px w-5 bg-ink/40 transition-[width,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-7 group-hover:bg-ink/70" />
            <span
              className={cn(
                "pointer-events-none absolute inset-x-1 -bottom-0.5 h-px origin-left bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                contactNavActive ? "scale-x-100" : "scale-x-0"
              )}
              aria-hidden
            />
          </Link>
        </nav>

        <button
          type="button"
          aria-expanded={isMobileOpen}
          aria-controls="site-mobile-nav"
          aria-label="Toggle menu"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-night md:hidden"
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-3.5 w-5">
            <span
              className={cn(
                "absolute left-0 top-0 h-px w-5 bg-ink transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                isMobileOpen ? "translate-y-[7px] rotate-45" : ""
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[7px] h-px w-5 bg-ink transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                isMobileOpen ? "opacity-0" : "opacity-90"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[14px] h-px w-5 bg-ink transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                isMobileOpen ? "-translate-y-[7px] -rotate-45" : ""
              )}
            />
          </span>
        </button>
      </div>

      <div
        id="site-mobile-nav"
        className={cn(
          "overflow-hidden border-t border-white/10 bg-night/88 backdrop-blur-xl transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:hidden",
          isMobileOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav
          className="mx-auto flex w-full max-w-[1440px] flex-col px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 sm:px-10"
          aria-label="Mobile primary"
        >
          {navItems.map((item, index) => {
            const routeActive = isRouteActive(pathname, item.href);
            const isActive =
              item.href === "/" ? routeActive && !contactNavActive : routeActive;

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center rounded-sm py-3 text-xs uppercase tracking-[0.14em] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-night",
                  isMobileOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
                  isActive ? "text-ink" : "text-ink/84 hover:text-ink"
                )}
                style={
                  isMobileOpen ? { transitionDelay: `${70 + index * 55}ms` } : { transitionDelay: "0ms" }
                }
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={contactHref}
            onClick={() => setIsMobileOpen(false)}
            aria-current={contactNavActive ? "page" : undefined}
            className={cn(
              "mt-3 flex min-h-11 w-fit items-center rounded-sm py-3 text-xs uppercase tracking-[0.14em] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-night",
              isMobileOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
              contactNavActive ? "text-ink" : "text-ink/88 hover:text-ink"
            )}
            style={
              isMobileOpen ? { transitionDelay: `${70 + navItems.length * 55}ms` } : { transitionDelay: "0ms" }
            }
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
