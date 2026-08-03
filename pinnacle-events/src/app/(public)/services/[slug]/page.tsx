import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section, Eyebrow } from "@/components/layout/section";
import { PageHero } from "@/components/shared/page-hero";
import { RevealGroup } from "@/components/shared/reveal";
import { ContactCTA } from "@/components/home/contact-cta";
import { services, getServiceBySlug } from "@/content/services";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.name,
    description: service.overview,
    openGraph: {
      title: `${service.name} | Pinnacle Events`,
      description: service.overview,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <PageHero eyebrow={service.category} title={service.name} description={service.overview} />

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <Eyebrow className="mb-4">Benefits</Eyebrow>
              <h2 className="font-display text-3xl">Why clients choose us for this.</h2>
            </div>
            <RevealGroup as="ul" className="lg:col-span-8 space-y-5" stagger={0.06}>
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-text-secondary">
                  <Check className="w-5 h-5 text-gold-primary shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      <Section className="bg-bg-surface">
        <Container>
          <Eyebrow className="mb-4">Our Process</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl max-w-xl mb-14">
            How we take this from brief to delivery.
          </h2>
          <RevealGroup className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {service.process.map((step, i) => (
              <div key={step} className="border-t border-border-hairline pt-5">
                <p className="font-mono-tag text-[12px] text-gold-primary mb-3">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">{step}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* <Section>
        <Container>
          <Eyebrow className="mb-4">Gallery</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl max-w-xl mb-14">
            {service.name} in execution.
          </h2>
          <RevealGroup className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="corner-brackets aspect-[4/5] rounded-lg bg-bg-surface border border-border-hairline"
              ></div>
            ))}
          </RevealGroup>
        </Container>
      </Section> */}

      <Section className="bg-bg-surface">
        <Container>
          <Eyebrow className="mb-4">FAQ</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl max-w-xl mb-14">
            Common questions.
          </h2>
          <RevealGroup className="max-w-3xl divide-y divide-border-hairline border-t border-border-hairline">
            {service.faqs.map((faq) => (
              <div key={faq.q} className="py-6">
                <p className="font-display text-lg mb-2">{faq.q}</p>
                <p className="text-text-secondary text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section border={false} className="pt-0 pb-0">
        <Container>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-text-secondary hover:text-gold-primary transition-colors mb-8"
          >
            <ArrowUpRight className="w-4 h-4 rotate-[225deg]" />
            Back to all services
          </Link>
        </Container>
      </Section>

      <ContactCTA />
    </>
  );
}