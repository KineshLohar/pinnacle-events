import { getPublicAwards } from "@/actions/award.action";
import { ContactCTA } from "@/components/home/contact-cta";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AwardCard } from "@/components/shared/award-card";
import { PageHero } from "@/components/shared/page-hero";
import { RevealGroup } from "@/components/shared/reveal";
import type { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";

export const metadata: Metadata = {
  title: "Awards & Recognition",
  description: "Recognition and client appreciation received by Pinnacle Events for corporate event execution.",
};

export default async function AwardsPage() {
  "use cache";

  cacheLife("max");
  cacheTag("awards");

  const awards = await getPublicAwards();
  return (
    <>
      <PageHero
        eyebrow="Recognition"
        title="Appreciated by the clients we execute for."
        description="Recognition earned through consistent, high-stakes delivery -- not marketing spend."
      />

      <Section>
        <Container>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((a) => (
              <AwardCard key={a.id} award={a} />
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <ContactCTA />
    </>
  );
}