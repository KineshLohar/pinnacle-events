import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/shared/page-hero";
import { ServiceCard } from "@/components/shared/service-card";
import { ContactCTA } from "@/components/home/contact-cta";
import { serviceGroups } from "@/content/navigation";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Corporate events, brand activations, product launches, experiential marketing, retail branding, exhibitions and 18 disciplines of end-to-end event execution.",
};

export default function ServicesPage() {
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
            <h2 className="font-mono-tag text-[13px] text-gold-primary mb-10">
              {group.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {group.services.map((s) => {
                const full = services.find((svc) => svc.slug === s.slug);
                const description = full ? `${full.overview.slice(0, 110)}...` : "";
                return (
                  <ServiceCard key={s.slug} name={s.name} slug={s.slug} description={description} />
                );
              })}
            </div>
          </Container>
        </Section>
      ))}

      <ContactCTA />
    </>
  );
}
