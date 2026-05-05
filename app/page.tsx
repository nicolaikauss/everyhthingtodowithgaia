import { HomeHero } from "@/components/sections/home-hero";
import { PositioningOffersSection } from "@/components/sections/positioning-offers-section";
import { ContactSection } from "@/components/sections/contact-section";
import { WhyGaiaSection } from "@/components/sections/why-gaia-section";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <PositioningOffersSection />
      <WhyGaiaSection />
      <ContactSection />
    </>
  );
}
