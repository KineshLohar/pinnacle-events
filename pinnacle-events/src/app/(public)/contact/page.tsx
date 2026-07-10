import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/shared/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Pinnacle Events for corporate event management and experiential marketing mandates across India.",
};

export default function ContactPage() {
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
                    <a href="tel:+910000000000" className="text-text-primary hover:text-gold-bright transition-colors">
                      +91 00000 00000
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gold-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-text-tertiary">Email</p>
                    <a
                      href="mailto:hello@pinnacleevents.co.in"
                      className="text-text-primary hover:text-gold-bright transition-colors"
                    >
                      hello@pinnacleevents.co.in
                    </a>
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

              <div className="mt-6 aspect-[4/3] rounded-lg border border-border-hairline bg-bg-surface flex items-center justify-center">
                <p className="text-sm text-text-tertiary font-mono-tag">Map Embed</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
