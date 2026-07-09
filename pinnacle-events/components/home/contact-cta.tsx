import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";

export function ContactCTA() {
  return (
    <section className="py-28 md:py-40 border-t border-border-hairline">
      <Container>
        <div className="corner-brackets brackets-visible border border-border-hairline rounded-2xl px-8 py-16 md:px-16 md:py-24 flex flex-col items-start">
          <p className="font-mono-tag text-[13px] text-gold-primary mb-6">
            Let&apos;s Talk
          </p>
          <h2 className="font-display text-4xl md:text-6xl max-w-2xl leading-[1.05]">
            Planning something that has to go right the first time?
          </h2>
          <p className="mt-6 max-w-xl text-text-secondary leading-relaxed">
            Tell us about the mandate -- scale, timeline, cities involved -- and our
            team will get back with an approach, not just a quote.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 bg-gold-primary text-bg-primary text-sm font-medium rounded-full px-7 py-3.5 hover:bg-gold-bright transition-colors"
          >
            Start a Conversation
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
