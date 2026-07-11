import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/shared/page-hero";
import { ServiceCard } from "@/components/shared/service-card";
import { RevealGroup } from "@/components/shared/reveal";
import { ContactCTA } from "@/components/home/contact-cta";
import { serviceGroups } from "@/content/navigation";
import { services } from "@/content/services";
import { cacheLife, cacheTag } from "next/cache";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Corporate events, brand activations, product launches, experiential marketing, retail branding, exhibitions and 18 disciplines of end-to-end event execution.",
};

export default async function ServicesPage() {
  "use cache"
  cacheLife("max");
  cacheTag("services-page");

  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Eighteen disciplines. One execution standard."
        description="From boardroom-scale conferences to nationwide retail rollouts, every service below is delivered by the same in-house team -- with the same standard of precision."
      />

      {serviceGroups.map((group) => (
        <Section key={group.title}>
          <Container>
            <h2 className="font-mono-tag text-[14px] text-gold-primary mb-10 font-medium">
              {group.title}
            </h2>
            <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {group.services.map((s) => {
                const full = services.find((svc) => svc.slug === s.slug);
                const description = full ? `${full.overview.slice(0, 110)}...` : "";
                return (
                  <ServiceCard key={s.slug} name={s.name} slug={s.slug} description={description} />
                );
              })}
            </RevealGroup>
          </Container>
        </Section>
      ))}

      <ContactCTA />
    </>
  );
}