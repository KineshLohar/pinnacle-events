import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/shared/contact-form";
import Link from "next/link";
import { cacheLife, cacheTag } from "next/cache";
import { EMAIL, PHONE } from "@/lib/CONSTANTS";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Pinnacle Events for corporate event management and experiential marketing mandates across India.",
};

// Placeholder address -- swap this query (or the whole embed URL, e.g. from
// Google Maps > Share > Embed a map) once the real office address is final.
// const MAP_QUERY = "SG Highway, Ahmedabad, Gujarat, India";
// const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;
const MAP_EMBED_SRC = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.983584379246!2d72.6541587!3d23.0610634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e872dabca45bb%3A0x53c7db6853504331!2sPinnacle%20Events!5e0!3m2!1sen!2sin!4v1783758804611!5m2!1sen!2sin`;

export default async function ContactPage() {
  "use cache"
  cacheLife("max");
  cacheTag("contact-page");

  return (
    <>
      <PageHero
        eyebrow="Let's Talk"
        title="Planning something that has to go right the first time?"
        description="Tell us about the mandate -- scale, timeline, cities involved -- and our team will get back with an approach, not just a quote."
      />

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            <div className="lg:col-span-5">
              <div className="border border-border-hairline rounded-lg p-8 space-y-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-text-tertiary">Head Office</p>
                    <p className="text-text-primary">Ahmedabad, Gujarat, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gold-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-text-tertiary">Phone</p>
                    <Link href={`tel:${PHONE}`} className="text-text-primary hover:text-gold-bright transition-colors">
                      {PHONE}
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gold-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-text-tertiary">Email</p>
                    <Link
                      href={`mailto:${EMAIL}`}
                      className="text-text-primary hover:text-gold-bright transition-colors"
                    >
                      {EMAIL}
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gold-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-text-tertiary">Business Hours</p>
                    <p className="text-text-primary">Mon — Sat, 10:00 AM – 7:00 PM IST</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 aspect-[4/3] rounded-lg border border-border-hairline overflow-hidden">
                <iframe
                  src={MAP_EMBED_SRC}
                  title="Pinnacle Events office location"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(0.4) invert(0.9) contrast(0.9)" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}