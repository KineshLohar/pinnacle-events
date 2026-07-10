import { z } from "zod";

/** Mirrors the future `clients` Postgres table. */
export const clientSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  logoUrl: z.string().url().optional(), // Cloudinary URL once uploaded via admin
  websiteUrl: z.string().url().optional(),
  featured: z.boolean().default(true), // shown in the home marquee vs. full /clients grid only
  sortOrder: z.number().int().default(0),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Client = z.infer<typeof clientSchema>;
