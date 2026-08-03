import { Container } from "@/components/layout/container";
import { Section, Eyebrow } from "@/components/layout/section";
import { RevealGroup } from "@/components/shared/reveal";
import { cacheLife, cacheTag } from "next/cache";

const strengths = [
  {
    title: "End-to-end ownership",
    description:
      "Concept, fabrication, logistics, on-site execution and teardown -- managed by one team, not stitched across vendors.",
  },
  {
    title: "Nationwide execution capability",
    description:
      "A vendor network built to run simultaneous activations across cities without a drop in quality.",
  },
  {
    title: "Technical & AV depth",
    description:
      "In-house command over staging, lighting, AV and fabrication -- the details that make or break a live event.",
  },
  {
    title: "Process discipline",
    description:
      "Documented timelines, on-ground coordination protocols and contingency planning for every mandate.",
  },
];

export async function WhyPinnacle() {
  "use cache"
  cacheLife("max");
  cacheTag("why-pinnacle");

  return (
    <Section id="why-pinnacle" className="bg-bg-surface">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-4">Why Pinnacle</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl">
              Scale that doesn&apos;t compromise on precision.
            </h2>
          </div>

          <RevealGroup className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
            {strengths.map((s) => (
              <div key={s.title} className="border-t border-border-hairline pt-6">
                <h3 className="font-display text-xl mb-3">{s.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}