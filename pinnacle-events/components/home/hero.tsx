"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";

export function Hero() {
  const lineRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const bracketRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      lineRefs.current.forEach((el) => el?.style.setProperty("transform", "translateY(0)"));
      eyebrowRef.current?.style.setProperty("opacity", "1");
      bracketRef.current?.classList.add("brackets-visible");
      return;
    }

    let cancelled = false;

    (async () => {
      const gsap = (await import("gsap")).default;
      if (cancelled) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6 })
        .to(
          lineRefs.current.filter(Boolean),
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
          },
          "-=0.2",
        )
        .call(() => bracketRef.current?.classList.add("brackets-visible"), [], "-=0.4");
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden">
      <Container>
        <div ref={bracketRef} className="corner-brackets absolute inset-x-5 top-32 bottom-8 md:inset-x-8 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <p
              ref={eyebrowRef}
              className="font-mono-tag text-[13px] text-gold-primary opacity-0 translate-y-3 mb-8"
            >
              Event Management &amp; Experiential Marketing — Ahmedabad, India
            </p>

            <h1 className="font-display text-[13vw] leading-[0.98] sm:text-[8vw] lg:text-[5.5rem] xl:text-[6.5rem] tracking-tight">
              {["Your Vision.", "Our Execution."].map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <span
                    ref={(el) => {
                      lineRefs.current[i] = el;
                    }}
                    className="block opacity-0 translate-y-full"
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p className="mt-10 max-w-xl text-lg text-text-secondary leading-relaxed">
              Pinnacle Events plans and executes India&apos;s most demanding corporate
              activations — for brands that cannot afford a single detail to go wrong.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gold-primary text-bg-primary text-sm font-medium rounded-full px-7 py-3.5 hover:bg-gold-bright transition-colors"
              >
                Start a Conversation
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-sm text-text-primary border border-border-hairline-strong rounded-full px-7 py-3.5 hover:border-gold-primary hover:text-gold-primary transition-colors"
              >
                View Our Work
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <div className="border border-border-hairline rounded-lg px-6 py-6 w-full max-w-[260px]">
              <p className="font-display text-4xl text-gold-primary">400+</p>
              <p className="text-sm text-text-secondary mt-1">
                Corporate events executed across 30+ cities in India
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
