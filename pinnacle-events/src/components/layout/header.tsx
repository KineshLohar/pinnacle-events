"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Container } from "./container";
import { primaryNav, serviceGroups } from "@/content/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
        scrolled || mobileOpen
          ? "bg-bg-primary/90 backdrop-blur-md border-b border-border-hairline"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="font-display text-xl tracking-tight text-text-primary"
            onClick={() => setMobileOpen(false)}
          >
            PINNACLE <span className="text-gold-primary">EVENTS</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {primaryNav.map((item) =>
              item.name === "Services" ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-gold-primary transition-colors py-2"
                  >
                    {item.name}
                  </Link>
                  {servicesOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[640px]">
                      <div className="grid grid-cols-4 gap-6 bg-bg-elevated border border-border-hairline rounded-lg p-8 shadow-2xl">
                        {serviceGroups.map((group) => (
                          <div key={group.title}>
                            <p className="font-mono-tag text-[11px] text-text-tertiary mb-3">
                              {group.title}
                            </p>
                            <ul className="space-y-2.5">
                              {group.services.map((s) => (
                                <li key={s.slug}>
                                  <Link
                                    href={`/services/${s.slug}`}
                                    className="text-sm text-text-secondary hover:text-gold-bright transition-colors"
                                  >
                                    {s.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-text-secondary hover:text-gold-primary transition-colors"
                >
                  {item.name}
                </Link>
              ),
            )}
          </nav>

          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center gap-1.5 text-sm border border-border-hairline-strong rounded-full px-5 py-2.5 text-text-primary hover:border-gold-primary hover:text-gold-primary transition-colors"
          >
            Start a Conversation
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="lg:hidden text-text-primary"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border-hairline bg-bg-primary">
          <Container>
            <nav className="flex flex-col py-6 gap-5">
              {primaryNav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg text-text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 inline-flex w-fit items-center gap-1.5 text-sm border border-gold-primary text-gold-primary rounded-full px-5 py-2.5"
                onClick={() => setMobileOpen(false)}
              >
                Start a Conversation
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
