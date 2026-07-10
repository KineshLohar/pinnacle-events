"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Wire up to an email/CRM endpoint during implementation.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-border-hairline rounded-lg p-8">
        <p className="font-display text-2xl mb-2">Thank you.</p>
        <p className="text-text-secondary">
          We have received your inquiry and will be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm text-text-secondary mb-2">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full bg-bg-surface border border-border-hairline rounded-md px-4 py-3 text-text-primary placeholder:text-text-tertiary focus-visible:border-gold-primary"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm text-text-secondary mb-2">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            className="w-full bg-bg-surface border border-border-hairline rounded-md px-4 py-3 text-text-primary placeholder:text-text-tertiary focus-visible:border-gold-primary"
            placeholder="Company name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm text-text-secondary mb-2">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full bg-bg-surface border border-border-hairline rounded-md px-4 py-3 text-text-primary placeholder:text-text-tertiary focus-visible:border-gold-primary"
            placeholder="jane@company.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm text-text-secondary mb-2">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full bg-bg-surface border border-border-hairline rounded-md px-4 py-3 text-text-primary placeholder:text-text-tertiary focus-visible:border-gold-primary"
            placeholder="+91"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-text-secondary mb-2">
          Tell us about the mandate
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full bg-bg-surface border border-border-hairline rounded-md px-4 py-3 text-text-primary placeholder:text-text-tertiary focus-visible:border-gold-primary"
          placeholder="Event type, scale, cities involved, timeline..."
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 bg-gold-primary text-bg-primary text-sm font-medium rounded-full px-7 py-3.5 hover:bg-gold-bright transition-colors"
      >
        Send Inquiry
        <ArrowUpRight className="w-4 h-4" />
      </button>
    </form>
  );
}
