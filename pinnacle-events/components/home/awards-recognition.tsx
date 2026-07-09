import Link from "next/link";
import { ArrowUpRight, Award } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section, Eyebrow } from "@/components/layout/section";

const recognitions = [
  {
    title: "Client Appreciation Award",
    org: "Corporate Partner Recognition",
    year: "2023",
  },
  {
    title: "Excellence in Event Execution",
    org: "Industry Recognition Program",
    year: "2022",
  },
  {
    title: "Top Experiential Agency, Gujarat",
    org: "Regional Business Recognition",
    year: "2021",
  },
];

export function AwardsRecognition() {
  return (
    <Section id="awards">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <Eyebrow className="mb-4">Recognition</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl max-w-xl">
              Appreciated by the clients we execute for.
            </h2>
          </div>
          <Link
            href="/awards"
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-gold-primary transition-colors shrink-0"
          >
            View all recognition
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recognitions.map((r) => (
            <div
              key={r.title}
              className="border border-border-hairline rounded-lg p-8 flex flex-col gap-6"
            >
              <Award className="w-6 h-6 text-gold-primary" />
              <div>
                <p className="font-display text-xl leading-snug">{r.title}</p>
                <p className="text-sm text-text-tertiary mt-2">
                  {r.org} — {r.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
