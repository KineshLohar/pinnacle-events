import { serviceGroups } from "@/content/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import { cacheLife, cacheTag } from "next/cache";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Container } from "./container";
import FooterDate from "./footer-date";

export async function Footer() {
  "use cache"
  cacheLife("max");
  cacheTag("footer");

  return (
    <footer className="border-t border-border-hairline bg-bg-primary">
      <Container>
        <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4">
            <p className="font-display text-2xl mb-4">
              PINNACLE <span className="text-gold-primary">EVENTS</span>
            </p>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Corporate event management and experiential marketing, executed with
              precision -- from Ahmedabad, for brands across India.
            </p>
            <div className="flex gap-4 mt-6">
              <Link aria-label="Instagram" href="#" target="_blank" className="text-text-tertiary hover:text-gold-primary transition-colors">
                <FaInstagram className="w-5 h-5" />
              </Link>
              <Link aria-label="LinkedIn" href="#" target="_blank" className="text-text-tertiary hover:text-gold-primary transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </Link>
              <Link aria-label="Facebook" href="#" target="_blank" className="text-text-tertiary hover:text-gold-primary transition-colors">
                <FaFacebook className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {serviceGroups.map((group) => (
              <div key={group.title}>
                <p className="font-mono-tag text-[11px] text-text-tertiary mb-3">
                  {group.title}
                </p>
                <ul className="space-y-2">
                  {group.services.slice(0, 4).map((s) => (
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

          <div className="lg:col-span-3">
            <p className="font-mono-tag text-[11px] text-text-tertiary mb-3">Get in Touch</p>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-gold-primary shrink-0" />
                Ahmedabad, Gujarat, India
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-primary shrink-0" />
                <Link href="tel:+910000000000" className="hover:text-gold-bright transition-colors">
                  +91 00000 00000
                </Link>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-primary shrink-0" />
                <Link href="mailto:hello@pinnacleevents.co.in" className="hover:text-gold-bright transition-colors">
                  hello@pinnacleevents.co.in
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-border-hairline flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-text-tertiary">
          <FooterDate />
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-gold-primary transition-colors">About</Link>
            <Link href="/portfolio" className="hover:text-gold-primary transition-colors">Work</Link>
            <Link href="/contact" className="hover:text-gold-primary transition-colors">Contact</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
