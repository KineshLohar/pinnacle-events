import { z } from "zod";

/** Mirrors the future `case_studies` Postgres table. */
export const caseStudySchema = z.object({
  id: z.string().min(1), // == slug, used as primary key
  slug: z.string().min(1),
  title: z.string().min(1),
  client: z.string().min(1),
  location: z.string().min(1),
  category: z.string().min(1),
  objective: z.string().min(1),
  challenge: z.string().min(1),
  execution: z.string().min(1),
  outcome: z.string().min(1),
  // Cloudinary/Drive URLs once media is wired up; empty for now.
  images: z.array(z.string().url()).default([]),
  featured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type CaseStudy = z.infer<typeof caseStudySchema>;
