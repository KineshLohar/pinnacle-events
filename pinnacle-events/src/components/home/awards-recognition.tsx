import { getLatestAwards } from "@/actions/award.action";
import { Container } from "@/components/layout/container";
import { Eyebrow, Section } from "@/components/layout/section";
import { AwardCard } from "@/components/shared/award-card";
import { RevealGroup } from "@/components/shared/reveal";
import { ArrowUpRight } from "lucide-react";
import { cacheLife, cacheTag } from "next/cache";
import Link from "next/link";

export async function AwardsRecognition() {
  "use cache"
  cacheLife("max");
  cacheTag("awards-recognition");

  const recognitions = await getLatestAwards();

  return (
    <Section id="awards">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-16">
          <div>
            <Eyebrow className="mb-4">Recognition</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl max-w-xl">
              Appreciated by the clients we execute for.
            </h2>
          </div>
          <Link
            href="/awards"
            className="inline-flex items-center gap-1.5 text-text-secondary hover:text-gold-primary transition-colors shrink-0"
          >
            View all recognition
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recognitions.map((a) => (
            <AwardCard key={a.id} award={a} />
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}