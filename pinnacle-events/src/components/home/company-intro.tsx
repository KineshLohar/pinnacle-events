import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/section";

export function CompanyIntro() {
  return (
    <section className="py-24 md:py-32 border-t border-border-hairline">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Eyebrow>Since 2015</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <p className="font-display text-3xl md:text-4xl leading-[1.3] text-text-primary">
              Pinnacle Events is a corporate event management and experiential
              marketing company headquartered in Ahmedabad, built around a single
              premise: the execution matters as much as the idea.
            </p>
            <p className="mt-6 text-text-secondary leading-relaxed max-w-2xl">
              Since 2015, we have planned and executed corporate events, exhibitions,
              product launches and nationwide brand campaigns for enterprises across
              India -- managing everything from concept and fabrication to on-ground
              coordination and teardown.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-1.5 text-sm text-gold-primary hover:text-gold-bright transition-colors"
            >
              More about Pinnacle Events
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
