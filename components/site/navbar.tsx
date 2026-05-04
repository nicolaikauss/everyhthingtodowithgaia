"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", href: "#" },
  { label: "Approach", href: "#approach" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" }
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        isScrolled ? "bg-night/58 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-6 sm:h-[4.6rem] sm:px-10 lg:px-16">
        <Link
          href="#"
          className="font-serif text-lg tracking-[0.08em] text-ink transition hover:text-ink/85 sm:text-[1.45rem]"
        >
          Gaia Capital
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[0.68rem] uppercase tracking-[0.14em] text-ink/78 transition hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="group inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.14em] text-ink/84 transition hover:text-ink"
          >
            Contact
            <span className="h-px w-5 bg-ink/40 transition group-hover:w-7 group-hover:bg-ink/70" />
          </Link>
        </nav>

        <button
          type="button"
          aria-expanded={isMobileOpen}
          aria-label="Toggle menu"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 h-px w-5 bg-ink transition-all duration-300 ${
                isMobileOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-px w-5 bg-ink transition-opacity duration-300 ${
                isMobileOpen ? "opacity-0" : "opacity-90"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-px w-5 bg-ink transition-all duration-300 ${
                isMobileOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-white/10 bg-night/92 backdrop-blur-md transition-[max-height,opacity] duration-500 md:hidden ${
          isMobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex w-full max-w-[1440px] flex-col gap-2 px-6 py-5 sm:px-10">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className="py-2.5 text-xs uppercase tracking-[0.14em] text-ink/84 transition hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setIsMobileOpen(false)}
            className="mt-2 w-fit py-2 text-xs uppercase tracking-[0.14em] text-ink/88 transition hover:text-ink"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
