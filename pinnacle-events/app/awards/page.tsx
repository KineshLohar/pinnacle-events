import type { Metadata } from "next";
import { Award } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/shared/page-hero";
import { ContactCTA } from "@/components/home/contact-cta";

export const metadata: Metadata = {
  title: "Awards & Recognition",
  description: "Recognition and client appreciation received by Pinnacle Events for corporate event execution.",
};

const timeline = [
  { year: "2023", title: "Client Appreciation Award", org: "Corporate Partner Recognition" },
  { year: "2022", title: "Excellence in Event Execution", org: "Industry Recognition Program" },
  { year: "2021", title: "Top Experiential Agency, Gujarat", org: "Regional Business Recognition" },
  { year: "2019", title: "Emerging Event Management Company", org: "State Business Awards" },
];

export default function AwardsPage() {
  return (
    <>
      <PageHero
        eyebrow="Recognition"
        title="Appreciated by the clients we execute for."
        description="Recognition earned through consistent, high-stakes delivery -- not marketing spend."
      />

      <Section>
        <Container>
          <div className="max-w-3xl">
            {timeline.map((t) => (
              <div
                key={t.title}
                className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10 py-8 border-t border-border-hairline last:border-b"
              >
                <p className="font-display text-2xl text-gold-primary w-24 shrink-0">{t.year}</p>
                <div className="flex items-start gap-4">
                  <Award className="w-5 h-5 text-gold-primary mt-1 shrink-0" />
                  <div>
                    <p className="font-display text-xl">{t.title}</p>
                    <p className="text-sm text-text-tertiary mt-1">{t.org}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <ContactCTA />
    </>
  );
}
