import { z } from "zod";

export const awardBaseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3)
    .max(150),

  excerpt: z
    .string()
    .trim()
    .min(10)
    .max(300),

  awardDate: z
    .string()
    .min(1),
});

export const awardClientSchema =
  awardBaseSchema.extend({
    image: z
      .instanceof(File)
      .nullable(),
  });

export type AwardFormValues =
  z.infer<typeof awardClientSchema>;

export const uploadedAwardImageSchema =
  z.object({
    url: z.string().url(),
    publicId: z.string(),
  });

export const awardServerSchema =
  awardBaseSchema.extend({
    image: uploadedAwardImageSchema,
  });

export const defaultAwardValues: AwardFormValues =
  {
    name: "",

    excerpt: "",

    awardDate: "",

    image: null,
  };