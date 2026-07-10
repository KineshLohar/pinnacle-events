import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section, Eyebrow } from "@/components/layout/section";
import { testimonialsPreview } from "@/content/home-data";

export function TestimonialsPreview() {
  return (
    <Section id="testimonials" className="bg-bg-surface">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <Eyebrow className="mb-4">In Their Words</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl max-w-xl">
              Trusted across industries.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsPreview.map((t) => (
            <figure
              key={t.name}
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
  );
}
