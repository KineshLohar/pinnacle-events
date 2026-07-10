import { z } from "zod";

/** Mirrors the future `awards` Postgres table. */
export const awardSchema = z.object({
  id: z.string().min(1),
  year: z.string().min(4).max(4),
  title: z.string().min(1),
  imageUrl: z.string().min(1).optional(),
  org: z.string().min(1),
  sortOrder: z.number().int().default(0),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Award = z.infer<typeof awardSchema>;
