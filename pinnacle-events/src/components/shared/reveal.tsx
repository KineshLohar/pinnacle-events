"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps a single block of content and fades/slides it up once it scrolls
 * into view. Server Components can render their normal (server-rendered)
 * content as `children` here -- this component only adds the client-side
 * animation shell around it, it doesn't need to own the content itself.
 */
export function Reveal({
  children,
  className,
  y = 24,
  duration = 0.8,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !ref.current) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [y, duration, delay]);

  return (
    <div ref={ref} className={`js-reveal ${className ?? ""}`} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

/**
 * Same idea, but staggers each direct child individually -- use for grids of
 * cards (services, portfolio, awards, testimonials) instead of fading the
 * whole grid in as one block. Initial hidden state comes from the
 * `.js-reveal-group > *` rule in globals.css (not inline styles), since
 * children are opaque ReactNode here.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol";
}) {
  const ref = useRef<HTMLDivElement & HTMLUListElement & HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = Array.from(el.children) as HTMLElement[];
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      items.forEach((item) => {
        item.style.opacity = "1";
        item.style.transform = "none";
      });
      return;
    }

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !ref.current) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          items,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [stagger]);

  return (
    <Tag ref={ref} className={`js-reveal-group ${className ?? ""}`}>
      {children}
    </Tag>
  );
}