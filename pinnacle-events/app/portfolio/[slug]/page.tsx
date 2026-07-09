import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Section, Eyebrow } from "@/components/layout/section";
import { ContactCTA } from "@/components/home/contact-cta";
import { caseStudies, getCaseStudyBySlug } from "@/content/portfolio";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};

  return {
    title: study.title,
    description: study.objective,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const details = [
    { label: "Objective", value: study.objective },
    { label: "Challenge", value: study.challenge },
    { label: "Execution", value: study.execution },
    { label: "Outcome", value: study.outcome },
  ];

  return (
    <>
      <section className="pt-40 pb-16 md:pt-48 border-b border-border-hairline">
        <Container>
          <p className="font-mono-tag text-[13px] text-gold-primary mb-6">
            {study.category}
          </p>
          <h1 className="font-display text-4xl md:text-6xl max-w-3xl leading-[1.05] mb-8">
            {study.title}
          </h1>
          <div className="flex flex-wrap gap-x-10 gap-y-2 text-sm text-text-secondary">
            <p><span className="text-text-tertiary">Client — </span>{study.client}</p>
            <p><span className="text-text-tertiary">Location — </span>{study.location}</p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="corner-brackets brackets-visible aspect-[16/8] rounded-lg bg-bg-surface border border-border-hairline" />
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14 max-w-4xl">
            {details.map((d) => (
              <div key={d.label}>
                <Eyebrow className="mb-3">{d.label}</Eyebrow>
                <p className="text-text-secondary leading-relaxed">{d.value}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Eyebrow className="mb-4">Gallery</Eyebrow>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="corner-brackets aspect-[4/5] rounded-lg bg-bg-surface border border-border-hairline"
              />
            ))}
          </div>
        </Container>
      </Section>

      <ContactCTA />
    </>
  );
}
