import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/shared/page-hero";
import { PortfolioCard } from "@/components/shared/portfolio-card";
import { ContactCTA } from "@/components/home/contact-cta";
import { caseStudies } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Case studies from Pinnacle Events' work with Garnier, TVS Eurogrip, IIFL, Aakash Institute and other leading Indian brands.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected Work"
        title="Large-scale execution, city after city."
        description="A selection of corporate events, activations and campaigns delivered for enterprise clients across India."
      />

      <Section>
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((c) => (
              <PortfolioCard
                key={c.slug}
                title={c.title}
                slug={c.slug}
                client={c.client}
                location={c.location}
                category={c.category}
              />
            ))}
          </div>
        </Container>
      </Section>

      <ContactCTA />
    </>
  );
}
