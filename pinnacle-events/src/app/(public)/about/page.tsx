import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section, Eyebrow } from "@/components/layout/section";
import { PageHero } from "@/components/shared/page-hero";
import { ContactCTA } from "@/components/home/contact-cta";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Pinnacle Events is a corporate event management and experiential marketing company headquartered in Ahmedabad, founded in 2015.",
};

const values = [
  { title: "Precision", description: "Every detail is planned, documented and rehearsed -- nothing is left to chance on-site." },
  { title: "Ownership", description: "One team accountable end-to-end, from concept to teardown." },
  { title: "Discretion", description: "We work quietly and reliably, letting the client's brand take the spotlight." },
  { title: "Scale without compromise", description: "The same execution standard, whether it's one city or ten." },
];

const journey = [
  { year: "2014", milestone: "Vision for a premium corporate event execution partner established" },
  { year: "2015", milestone: "Pinnacle Events founded in Ahmedabad" },
  { year: "2018", milestone: "Expanded execution capability to nationwide, multi-city mandates" },
  { year: "2021", milestone: "Crossed 200+ corporate events executed" },
  { year: "2024", milestone: "400+ events executed across 30+ Indian cities" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Pinnacle Events"
        title="Built for the mandates other agencies hesitate to take on."
        description="Headquartered in Ahmedabad, Pinnacle Events has spent nine years turning ambitious corporate briefs into precisely executed, large-scale realities."
      />

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <Eyebrow className="mb-4">Our Story</Eyebrow>
              <h2 className="font-display text-3xl">Vision to execution, since 2015.</h2>
            </div>
            <div className="lg:col-span-8 space-y-6 text-text-secondary leading-relaxed max-w-2xl">
              <p>
                Pinnacle Events was founded on a simple observation: brands rarely fail
                at ideas, but they often fail at execution. We built the company
                specifically to close that gap -- for corporates who need a partner
                capable of nationwide, high-stakes delivery.
              </p>
              <p>
                Today, we plan and execute corporate events, exhibitions, product
                launches, dealer meets and experiential campaigns for enterprises
                across India, with an in-house team spanning creative, production,
                fabrication and on-ground operations.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-bg-surface">
        <Container>
          <Eyebrow className="mb-4">Our Values</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl max-w-xl mb-14">
            What guides how we work.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.title} className="border-t border-border-hairline pt-6">
                <h3 className="font-display text-xl mb-3">{v.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Eyebrow className="mb-4">Our Journey</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl max-w-xl mb-14">
            Nine years of nationwide execution.
          </h2>
          <div className="space-y-0">
            {journey.map((j) => (
              <div
                key={j.year}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-10 py-6 border-t border-border-hairline last:border-b"
              >
                <p className="font-display text-2xl text-gold-primary w-24 shrink-0">{j.year}</p>
                <p className="text-text-secondary">{j.milestone}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <ContactCTA />
    </>
  );
}
