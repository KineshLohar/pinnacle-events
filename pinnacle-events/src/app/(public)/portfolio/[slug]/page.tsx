import { ContactCTA } from "@/components/home/contact-cta";
import { Container } from "@/components/layout/container";
import { Eyebrow, Section } from "@/components/layout/section";
import { Reveal, RevealGroup } from "@/components/shared/reveal";
import { getPortfolioSlugs, getPortfolioSlugsMetadata, getWorkBySlug } from "@/lib/repository/work.repository";
import type { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const works =
    await getPortfolioSlugs();

  return works.map((work) => ({
    slug: work.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const work = await getPortfolioSlugsMetadata(slug);

  if (!work) {
    return {};
  }

  return {
    title: work.title,
    description:
      work.excerpt,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  "use cache";

  const { slug } = await params;

  cacheLife("max");
  cacheTag(`portfolio-${slug}`);

  const work =
    await getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  const details = [
    { label: "Objective", value: work.objective },
    { label: "Challenge", value: work.challenge },
    { label: "Execution", value: work.execution },
    { label: "Outcome", value: work.outcome },
  ];

  return (
    <>
      <section className="pt-40 pb-16 md:pt-48 border-b border-border-hairline">
        <Container>
          <p className="font-mono-tag text-[13px] text-gold-primary mb-6">
            {work.eventType}
          </p>
          <h1 className="font-display text-4xl md:text-6xl max-w-3xl leading-[1.05] mb-8">
            {work.title}
          </h1>
          <div className="flex flex-wrap gap-x-10 gap-y-2 text-sm text-text-secondary">
            <p><span className="text-text-tertiary">Client — </span>{work.client}</p>
            <p><span className="text-text-tertiary">Location — </span>{work.location}</p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <Reveal>
            <div className="corner-brackets brackets-visible aspect-[16/8] rounded-lg bg-bg-surface border border-border-hairline">
              <Image
                src={
                  work.coverImageUrl
                }
                alt={work.title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <Section>
        <Container>
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14 max-w-4xl">
            {details.map((d) => d.value && (
              <div key={d.label}>
                <Eyebrow className="mb-3">{d.label}</Eyebrow>
                <p className="text-text-secondary leading-relaxed">{d.value}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section>
        <Container>
          <Eyebrow className="mb-4">Gallery</Eyebrow>
          <RevealGroup className="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {work.gallery.map(
              (image) => (
                <div
                  key={image.id}
                  className="corner-brackets relative aspect-[4/5] overflow-hidden rounded-lg border border-border-hairline"
                >
                  <Image
                    src={
                      image.imageUrl
                    }
                    alt={
                      image.alt ??
                      work.title
                    }
                    fill
                    className="object-cover"
                    sizes="(min-width:1024px) 33vw, 50vw"
                  />
                </div>
              ),
            )}
          </RevealGroup>
        </Container>
      </Section>

      <ContactCTA />
    </>
  );
}