import { z } from "zod";

/** Mirrors the future `testimonials` Postgres table. */
export const testimonialSchema = z.object({
  id: z.string().min(1),
  quote: z.string().min(1),
  name: z.string().min(1),
  company: z.string().min(1),
  avatarUrl: z.string().url().optional(),
  featured: z.boolean().default(false), // surfaced on Home; all testimonials still live on Home/Contact
  sortOrder: z.number().int().default(0),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Testimonial = z.infer<typeof testimonialSchema>;
