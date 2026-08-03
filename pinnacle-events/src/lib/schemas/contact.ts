import { z } from "zod";

/**
 * Validates data coming from the public contact form -- used identically on
 * the client (inline validation) and in the server action that will persist
 * it, so the rules can never drift between the two.
 */
export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  company: z.string().min(1, "Please enter your company name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Tell us a little more about the mandate"),
});

/** Mirrors the future `contact_submissions` Postgres table. */
export const contactSubmissionSchema = contactFormSchema.extend({
  id: z.string().min(1),
  createdAt: z.date().optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;
