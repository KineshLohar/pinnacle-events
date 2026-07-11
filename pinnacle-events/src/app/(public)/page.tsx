import { Hero } from "@/components/home/hero";
import { CompanyIntro } from "@/components/home/company-intro";
import { TrustedBrands } from "@/components/home/trusted-brands";
import { FeaturedServices } from "@/components/home/featured-services";
import { FeaturedPortfolio } from "@/components/home/featured-portfolio";
import { WhyPinnacle } from "@/components/home/why-pinnacle";
import { AwardsRecognition } from "@/components/home/awards-recognition";
import { StatsBand } from "@/components/home/stats-band";
import { TestimonialsPreview } from "@/components/home/testimonials-preview";
import { IndustriesServed } from "@/components/home/industries-served";
import { ContactCTA } from "@/components/home/contact-cta";

export default async function Home() {
  return (
    <>
      <Hero />
      <TrustedBrands />
      <CompanyIntro />
      <FeaturedServices />
      <FeaturedPortfolio />
      <WhyPinnacle />
      <AwardsRecognition />
      <StatsBand />
      <TestimonialsPreview />
      <IndustriesServed />
      <ContactCTA />
    </>
  );
}
