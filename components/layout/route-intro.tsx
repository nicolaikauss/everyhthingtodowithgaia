"use client";

import { usePathname } from "next/navigation";

import { PreHeroIntro } from "@/components/sections/pre-hero-intro";
import { homeCopy } from "@/lib/site-content";

/** Mounts `PreHeroIntro` once per pathname so client navigations replay the brand beat. */
export function RouteIntro() {
  const pathname = usePathname();
  const heroImageUrl = pathname === "/" ? homeCopy.heroImage : undefined;
  return <PreHeroIntro key={pathname} heroImageUrl={heroImageUrl} />;
}
