import { Quote } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section, Eyebrow } from "@/components/layout/section";
import { RevealGroup } from "@/components/shared/reveal";
import { getFeaturedTestimonials } from "@/content/testimonials";
import { cacheLife, cacheTag } from "next/cache";

export async function TestimonialsPreview() {
  "use cache"
  cacheLife("max");
  cacheTag("testimonials-preview");

  const testimonials = getFeaturedTestimonials();

  return (
    <Section id="testimonials" className="bg-bg-surface">
      <Container>
        <div className="mb-16">
          <Eyebrow className="mb-4">In Their Words</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl max-w-xl">
            Trusted across industries.
          </h2>
        </div>

        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure
              key={t.id}
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
        </RevealGroup>
      </Container>
    </Section>
  );
}