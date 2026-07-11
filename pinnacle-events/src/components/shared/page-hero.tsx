import { Container } from "@/components/layout/container";
import Image from "next/image";

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
    <section className="relative pt-40 pb-20 md:pt-48 md:pb-24 border-b border-border-hairline">
       <div className="absolute inset-0 -z-10">
        <Image
          src={"https://images.unsplash.com/photo-1700514077430-3659e38eb5e7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          alt="Pinnacle Events corporate activation in execution"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(9,9,9,1) 0%, rgba(9,9,9,1) 30%, rgba(9,9,9,0.6) 100%)",
          }}
        />
      </div>
      <Container>
        <p className="font-mono-tag text-[14px] text-gold-primary mb-4 font-medium">{eyebrow}</p>
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
