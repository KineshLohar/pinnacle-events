import { Container } from "@/components/layout/container";
import { Section, Eyebrow } from "@/components/layout/section";
import { industries } from "@/content/home-data";

export function IndustriesServed() {
  return (
    <Section id="industries">
      <Container>
        <Eyebrow className="mb-4">Industries Served</Eyebrow>
        <h2 className="font-display text-4xl md:text-5xl max-w-xl mb-14">
          Built for corporates that operate at scale.
        </h2>

        <div className="flex flex-wrap gap-3">
          {industries.map((industry) => (
            <span
              key={industry}
              className="text-sm text-text-secondary border border-border-hairline rounded-full px-5 py-2.5 hover:border-gold-primary hover:text-gold-primary transition-colors"
            >
              {industry}
            </span>
          ))}
        </div>
      </Container>
    </Section>
  );
}
