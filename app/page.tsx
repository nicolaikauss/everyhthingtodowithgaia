import { HomeHero, HOME_HERO_BACKGROUND_IMAGE } from "@/components/site/home-hero";
import { PositioningOffersSection } from "@/components/site/positioning-offers-section";
import { PreHeroIntro } from "@/components/site/pre-hero-intro";
import { ContactSection } from "@/components/site/contact-section";
import { WhyGaiaSection } from "@/components/site/why-gaia-section";

export default function HomePage() {
  return (
    <>
      <PreHeroIntro heroImageUrl={HOME_HERO_BACKGROUND_IMAGE} />
      <HomeHero />
      <PositioningOffersSection />
      <WhyGaiaSection />
      <ContactSection />
    </>
  );
}
