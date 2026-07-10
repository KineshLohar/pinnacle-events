import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/shared/page-hero";
import { ContactCTA } from "@/components/home/contact-cta";
import { clients } from "@/content/home-data";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "Pinnacle Events has delivered corporate events and experiential campaigns for Garnier, TVS Eurogrip, IIFL, IFFCO, Tata Capital, SBI Securities and more.",
};

export default function ClientsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Clients"
        title="Trusted by enterprises that cannot afford execution risk."
        description="A selection of the corporate and enterprise brands Pinnacle Events has partnered with across industries."
      />

      <Section>
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {clients.map((name) => (
              <div
                key={name}
                className="border border-border-hairline rounded-lg h-32 flex items-center justify-center px-4 hover:border-gold-primary transition-colors"
              >
                <p className="font-display text-xl text-center text-text-primary">{name}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <ContactCTA />
    </>
  );
}
