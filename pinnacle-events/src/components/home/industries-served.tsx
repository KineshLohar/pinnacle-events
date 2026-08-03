import { Container } from "@/components/layout/container";
import { Section, Eyebrow } from "@/components/layout/section";
import { RevealGroup } from "@/components/shared/reveal";
import { industries } from "@/content/home-data";
import { cacheLife, cacheTag } from "next/cache";

export async function IndustriesServed() {
  "use cache"
  cacheLife("max");
  cacheTag("industries-served");

  return (
    <Section id="industries">
      <Container>
        <Eyebrow className="mb-4">Industries Served</Eyebrow>
        <h2 className="font-display text-4xl md:text-5xl max-w-xl mb-14">
          Built for corporates that operate at scale.
        </h2>

        <RevealGroup className="flex flex-wrap gap-3" stagger={0.04}>
          {industries.map((industry) => (
            <span
              key={industry}
              className="text-sm text-text-secondary border border-border-hairline rounded-full px-5 py-2.5 hover:border-gold-primary hover:text-gold-primary transition-colors"
            >
              {industry}
            </span>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}