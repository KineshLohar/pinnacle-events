import { z } from "zod";

/**
 * Mirrors the future `services` Postgres table.
 * `benefits`, `process`, and `faqs` are modeled as JSONB columns (via Drizzle's
 * `jsonb().$type<...>()`) rather than child tables -- they are small, always
 * loaded with the parent, and never queried independently.
 */
export const faqSchema = z.object({
  q: z.string().min(1),
  a: z.string().min(1),
});

export const serviceSchema = z.object({
  id: z.string().min(1), // == slug, used as primary key
  slug: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1),
  overview: z.string().min(1),
  tagline: z.string().min(1).optional(), // short punchy copy for card grids; falls back to overview
  benefits: z.array(z.string().min(1)).min(1),
  process: z.array(z.string().min(1)).min(1),
  faqs: z.array(faqSchema),
  featured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Faq = z.infer<typeof faqSchema>;
export type Service = z.infer<typeof serviceSchema>;
