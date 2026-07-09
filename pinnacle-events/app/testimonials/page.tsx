import type { Metadata } from "next";
import { Quote } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/shared/page-hero";
import { ContactCTA } from "@/components/home/contact-cta";
import { testimonialsPreview } from "@/content/home-data";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What corporate clients say about working with Pinnacle Events.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="In Their Words"
        title="Trusted across industries."
        description="Feedback from the marketing, HR and leadership teams we have partnered with."
      />

      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...testimonialsPreview, ...testimonialsPreview.slice(0, 2)].map((t, i) => (
              <figure
                key={`${t.name}-${i}`}
                className="border border-border-hairline rounded-lg p-8 flex flex-col justify-between"
              >
                <Quote className="w-6 h-6 text-gold-primary mb-6" />
                <blockquote className="text-text-primary leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 text-sm text-text-tertiary">
                  {t.name} — {t.company}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      <ContactCTA />
    </>
  );
}
