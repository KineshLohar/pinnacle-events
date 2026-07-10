import type { Metadata } from "next";
import { Award } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/shared/page-hero";
import { ContactCTA } from "@/components/home/contact-cta";
import { awards } from "@/content/awards";
import { AwardCard } from "@/components/shared/award-card";

export const metadata: Metadata = {
  title: "Awards & Recognition",
  description: "Recognition and client appreciation received by Pinnacle Events for corporate event execution.",
};

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
            {awards.map((a) => (
              <AwardCard key={a.id} award={a} />
            ))}
          </div>
        </Container>
      </Section>

      <ContactCTA />
    </>
  );
}
