import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section, Eyebrow } from "@/components/layout/section";
import { ServiceCard } from "@/components/shared/service-card";
import { RevealGroup } from "@/components/shared/reveal";
import { getFeaturedServices } from "@/content/services";
import { cacheLife, cacheTag } from "next/cache";

export async function FeaturedServices() {
  "use cache"
  cacheLife("max");
  cacheTag("featured-services");

  const featured = getFeaturedServices();

  return (
    <Section id="services">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-16">
          <div>
            <Eyebrow className="mb-4">What We Do</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl max-w-xl">
              Eighteen disciplines. One execution standard.
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-text-secondary hover:text-gold-primary transition-colors shrink-0"
          >
            View all services
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((s) => (
            <ServiceCard
              key={s.slug}
              name={s.name}
              slug={s.slug}
              description={s.tagline ?? s.overview}
            />
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}