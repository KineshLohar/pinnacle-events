import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/section";
import { clients } from "@/content/home-data";

export function TrustedBrands() {
  const track = [...clients, ...clients];

  return (
    <section className="py-16 border-t border-border-hairline">
      <Container>
        <Eyebrow className="mb-8 text-center">Trusted By Leading Indian Brands</Eyebrow>
      </Container>

      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg-primary to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg-primary to-transparent z-10" />

        <div className="flex w-max animate-marquee">
          {track.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-display text-2xl md:text-3xl text-text-secondary/70 px-10 md:px-14 whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 32s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
