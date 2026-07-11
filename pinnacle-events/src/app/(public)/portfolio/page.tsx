import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/shared/page-hero";
import { PortfolioCard } from "@/components/shared/portfolio-card";
import { ContactCTA } from "@/components/home/contact-cta";
import { caseStudies, getCaseStudiesPage, PORTFOLIO_PAGE_SIZE } from "@/content/portfolio";
import { cacheLife, cacheTag } from "next/cache";
import { PortfolioFeed } from "@/components/portfolio/portfolio-feed";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Case studies from Pinnacle Events' work with Garnier, TVS Eurogrip, IIFL, Aakash Institute and other leading Indian brands.",
};

export default async function PortfolioPage() {
  "use cache"
  cacheLife("max");
  cacheTag("portfolio-page");

  const firstPage = getCaseStudiesPage(0, PORTFOLIO_PAGE_SIZE);

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
            initialItems={firstPage.items}
            initialNextCursor={firstPage.nextCursor}
            initialHasMore={firstPage.hasMore}
          />
        </Container>
      </Section>

      <ContactCTA />
    </>
  );
}
