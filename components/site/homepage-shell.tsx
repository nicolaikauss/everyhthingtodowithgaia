"use client";

import { HomeHero, HOME_HERO_BACKGROUND_IMAGE } from "@/components/site/home-hero";
import { HomeSections } from "@/components/site/home-sections";
import { Navbar } from "@/components/site/navbar";
import { PreHeroIntro } from "@/components/site/pre-hero-intro";

export function HomepageShell() {
  return (
    <>
      <PreHeroIntro heroImageUrl={HOME_HERO_BACKGROUND_IMAGE} />
      <main>
        <Navbar />
        <HomeHero />
        <HomeSections />
      </main>
    </>
  );
}
