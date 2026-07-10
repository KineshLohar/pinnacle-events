import { Container } from "@/components/layout/container";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="pt-40 pb-20 md:pt-48 md:pb-24 border-b border-border-hairline">
      <Container>
        <p className="font-mono-tag text-[13px] text-gold-primary mb-6">{eyebrow}</p>
        <h1 className="font-display text-4xl md:text-6xl max-w-3xl leading-[1.05]">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-text-secondary leading-relaxed text-lg">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
