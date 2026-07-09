import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section, Eyebrow } from "@/components/layout/section";
import { PortfolioCard } from "@/components/shared/portfolio-card";
import { featuredPortfolio } from "@/content/home-data";

export function FeaturedPortfolio() {
  return (
    <Section id="work">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <Eyebrow className="mb-4">Selected Work</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl max-w-xl">
              Large-scale execution, city after city.
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-gold-primary transition-colors shrink-0"
          >
            View full portfolio
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPortfolio.map((p) => (
            <PortfolioCard key={p.slug} {...p} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
