import { ContactCTA } from "@/components/home/contact-cta";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PortfolioFeed } from "@/components/portfolio/portfolio-feed";
import { PageHero } from "@/components/shared/page-hero";
import { PORTFOLIO_PAGE_SIZE } from "@/lib/CONSTANTS";
import { getPortfolioPage } from "@/lib/repository/work.repository";
import type { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Case studies from Pinnacle Events' work with Garnier, TVS Eurogrip, IIFL, Aakash Institute and other leading Indian brands.",
};

export default async function PortfolioPage() {
  "use cache"
  cacheLife("max");
  cacheTag("portfolio-page");

  const initialItems =
    await getPortfolioPage(
      0,
      PORTFOLIO_PAGE_SIZE,
    );

  return (
    <>
      <PageHero
        eyebrow="Selected Work"
        title="Large-scale execution, city after city."
        description="A selection of corporate events, activations and campaigns delivered for enterprise clients across India."
      />

      <Section>
        <Container>
          <PortfolioFeed
            initialItems={initialItems}
          />
        </Container>
      </Section>

      <ContactCTA />
    </>
  );
}
