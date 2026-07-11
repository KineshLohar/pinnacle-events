import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section, Eyebrow } from "@/components/layout/section";
import { PortfolioCard } from "@/components/shared/portfolio-card";
import { RevealGroup } from "@/components/shared/reveal";
import { getFeaturedCaseStudies } from "@/content/portfolio";
import { cacheLife, cacheTag } from "next/cache";

export async function FeaturedPortfolio() {
  "use cache"
  cacheLife("max");
  cacheTag("featured-portfolio");

  const featured = getFeaturedCaseStudies();

  return (
    <Section id="work">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-16">
          <div>
            <Eyebrow className="mb-4">Selected Work</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl max-w-xl">
              Large-scale execution, city after city.
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-text-secondary hover:text-gold-primary transition-colors shrink-0"
          >
            View full portfolio
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <PortfolioCard
              key={p.slug}
              title={p.title}
              slug={p.slug}
              client={p.client}
              location={p.location}
              category={p.category}
            />
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}