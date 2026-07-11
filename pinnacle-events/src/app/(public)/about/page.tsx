import type { Metadata } from "next";
import Link from "next/link";
import { Users, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section, Eyebrow } from "@/components/layout/section";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal, RevealGroup } from "@/components/shared/reveal";
import { ContactCTA } from "@/components/home/contact-cta";
import { cacheLife, cacheTag } from "next/cache";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Pinnacle Events is a corporate event management and experiential marketing company headquartered in Ahmedabad, founded in 2015.",
};

const values = [
  { title: "Precision", description: "Every detail is planned, documented and rehearsed -- nothing is left to chance on-site." },
  { title: "Ownership", description: "One team accountable end-to-end, from concept to teardown." },
  { title: "Discretion", description: "We work quietly and reliably, letting the client's brand take the spotlight." },
  { title: "Scale without compromise", description: "The same execution standard, whether it's one city or ten." },
];

const journey = [
  { year: "2014", milestone: "Vision for a premium corporate event execution partner established" },
  { year: "2015", milestone: "Pinnacle Events founded in Ahmedabad" },
  { year: "2018", milestone: "Expanded execution capability to nationwide, multi-city mandates" },
  { year: "2021", milestone: "Crossed 200+ corporate events executed" },
  { year: "2024", milestone: "400+ events executed across 30+ Indian cities" },
];

const companyProcess = [
  "Discovery & objective mapping",
  "Strategy & concept development",
  "Proposal, budgeting & sign-off",
  "Production & vendor coordination",
  "On-ground execution",
  "Post-event reporting & debrief",
];

// Placeholder leadership roles -- replace with real names, titles and photos
// once available. Kept role-only for now rather than inventing names.
const leadership = [
  { role: "Founder & Managing Director" },
  { role: "Head of Operations" },
  { role: "Creative Director" },
];

const achievements = [
  "Executed nationwide dealer-meet programs across 12+ cities simultaneously",
  "Sustained multi-year partnerships with financial services and FMCG enterprise clients",
  "Grown from a single-city operation to a 30+ city execution network",
  "Zero major on-ground escalations across 400+ executed events",
];

const whyChooseUs = [
  {
    title: "A single point of contact",
    description: "One senior team member owns your mandate end-to-end -- you are never passed between departments.",
  },
  {
    title: "Transparent reporting",
    description: "Daily on-ground updates and a full post-event debrief, not just a final invoice.",
  },
  {
    title: "Senior involvement throughout",
    description: "The same core team that pitches the mandate stays on it through live execution.",
  },
  {
    title: "Built for repeat partnerships",
    description: "Most of our client relationships span multiple events across several years, not a single engagement.",
  },
];

const culture = [
  {
    title: "On-ground first",
    description: "Our planning teams have all worked a live event floor -- decisions get made with execution reality in mind, not just slide decks.",
  },
  {
    title: "Documentation as discipline",
    description: "Every event runs on a written run-of-show. Nothing depends on memory on the day.",
  },
  {
    title: "Calm under scale",
    description: "The goal on-site is for nothing to look like it's being managed in real time, even when it is.",
  },
];

export default async function AboutPage() {
  "use cache"
  cacheLife("max");
  cacheTag("about-page");

  return (
    <>
      <PageHero
        eyebrow="About Pinnacle Events"
        title="Built for the mandates other agencies hesitate to take on."
        description="Headquartered in Ahmedabad, Pinnacle Events has spent nine years turning ambitious corporate briefs into precisely executed, large-scale realities."
      />

      {/* Our Story */}
      <Section>
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4">
                <Eyebrow className="mb-4">Our Story</Eyebrow>
                <h2 className="font-display text-3xl">Vision to execution, since 2015.</h2>
              </div>
              <div className="lg:col-span-8 space-y-6 text-text-secondary leading-relaxed max-w-2xl">
                <p>
                  Pinnacle Events was founded on a simple observation: brands rarely fail
                  at ideas, but they often fail at execution. We built the company
                  specifically to close that gap -- for corporates who need a partner
                  capable of nationwide, high-stakes delivery.
                </p>
                <p>
                  Today, we plan and execute corporate events, exhibitions, product
                  launches, dealer meets and experiential campaigns for enterprises
                  across India, with an in-house team spanning creative, production,
                  fabrication and on-ground operations.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Mission & Vision */}
      <Section className="bg-bg-surface">
        <Container>
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="border-t border-border-hairline pt-6">
              <Eyebrow className="mb-4">Our Mission</Eyebrow>
              <p className="font-display text-2xl leading-snug mb-4">
                Make world-class execution accessible to Indian brands, at any scale.
              </p>
              <p className="text-text-secondary leading-relaxed">
                No team should have to compromise on precision because of the
                complexity or scale of what they&apos;re planning.
              </p>
            </div>
            <div className="border-t border-border-hairline pt-6">
              <Eyebrow className="mb-4">Our Vision</Eyebrow>
              <p className="font-display text-2xl leading-snug mb-4">
                The corporate event partner Indian enterprises call first.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Known as much for process discipline as for creative work -- for
                mandates of any scale, in any city.
              </p>
            </div>
          </RevealGroup>
        </Container>
      </Section>

      {/* Values */}
      <Section>
        <Container>
          <Eyebrow className="mb-4">Our Values</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl max-w-xl mb-14">
            What guides how we work.
          </h2>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.title} className="border-t border-border-hairline pt-6">
                <h3 className="font-display text-xl mb-3">{v.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{v.description}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Our Process */}
      <Section className="bg-bg-surface">
        <Container>
          <Eyebrow className="mb-4">Our Process</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl max-w-xl mb-14">
            How a mandate moves from brief to delivery.
          </h2>
          <RevealGroup className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {companyProcess.map((step, i) => (
              <div key={step} className="border-t border-border-hairline pt-5">
                <p className="font-mono-tag text-[13px] text-gold-primary mb-3">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">{step}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Leadership */}
      <Section>
        <Container>
          <Eyebrow className="mb-4">Leadership</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl max-w-xl mb-14">
            The team behind the execution.
          </h2>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadership.map((person) => (
              <div
                key={person.role}
                className="corner-brackets border border-border-hairline rounded-lg overflow-hidden"
              >
                <div className="aspect-[4/3] bg-bg-surface flex items-center justify-center">
                  <Users className="w-8 h-8 text-text-tertiary" />
                </div>
                <div className="p-6">
                  <p className="font-display text-lg">[Add Name]</p>
                  <p className="text-sm text-text-tertiary mt-1">{person.role}</p>
                </div>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Achievements */}
      <Section className="bg-bg-surface">
        <Container>
          <Eyebrow className="mb-4">Achievements</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl max-w-xl mb-14">
            Milestones along the way.
          </h2>
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            {achievements.map((a) => (
              <p
                key={a}
                className="text-text-secondary leading-relaxed border-t border-border-hairline pt-5"
              >
                {a}
              </p>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Awards teaser (link-out only -- full grid already lives on /awards
          and on Home, no need to repeat the same cards a third time) */}
      <Section>
        <Container>
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border border-border-hairline rounded-lg px-8 py-10">
              <div>
                <Eyebrow className="mb-3">Awards & Recognition</Eyebrow>
                <p className="font-display text-2xl max-w-lg">
                  Recognition earned through delivery, not marketing spend.
                </p>
              </div>
              <Link
                href="/awards"
                className="inline-flex items-center gap-1.5 text- md:text-base text-gold-primary hover:text-gold-bright transition-colors shrink-0"
              >
                View our full record
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Why Choose Us */}
      <Section className="bg-bg-surface">
        <Container>
          <Eyebrow className="mb-4">Why Choose Us</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl max-w-xl mb-14">
            What a partnership with us actually looks like.
          </h2>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
            {whyChooseUs.map((w) => (
              <div key={w.title} className="border-t border-border-hairline pt-6">
                <h3 className="font-display text-xl mb-3">{w.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{w.description}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Journey */}
      <Section>
        <Container>
          <Eyebrow className="mb-4">Our Journey</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl max-w-xl mb-14">
            Nine years of nationwide execution.
          </h2>
          <RevealGroup className="space-y-0">
            {journey.map((j) => (
              <div
                key={j.year}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-10 py-6 border-t border-border-hairline last:border-b"
              >
                <p className="font-display text-2xl text-gold-primary w-24 shrink-0">{j.year}</p>
                <p className="text-text-secondary">{j.milestone}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Company Culture */}
      <Section className="bg-bg-surface">
        <Container>
          <Eyebrow className="mb-4">Company Culture</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl max-w-xl mb-14">
            How the team actually operates.
          </h2>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {culture.map((c) => (
              <div key={c.title} className="border-t border-border-hairline pt-6">
                <h3 className="font-display text-xl mb-3">{c.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{c.description}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <ContactCTA />
    </>
  );
}