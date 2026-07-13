import { z } from "zod";

export const WORK_CATEGORIES = [
  "Corporate Event",
  "Product Launch",
  "Exhibition",
  "Conference",
  "Roadshow",
  "Brand Activation",
  "Award Ceremony",
  "Roadshow",
  "Employee Engagement",
  "Other"
] as const;

export const workCategorySchema = z.enum(WORK_CATEGORIES);

export const galleryImageSchema = z.object({
  image: z
    .string()
    .min(1, "Image is required."),

  alt: z
    .string()
    .trim()
    .max(120, "Alt text cannot exceed 120 characters.")
    .optional(),
});

export const workBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3)
    .max(150),

  slug: z
    .string()
    .trim()
    .min(3)
    .max(150)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Invalid slug.",
    ),

  client: z
    .string()
    .trim()
    .min(2)
    .max(120),
  excerpt: z
    .string()
    .trim()
    .min(10)
    .max(300),
  eventType: workCategorySchema,

  location: z
    .string()
    .trim()
    .min(2)
    .max(120),

  projectDate: z.string().min(1),

  featured: z.boolean(),

  isPublished: z.boolean(),

  objective: z
    .string()
    .trim()
    .optional(),

  challenge: z
    .string()
    .trim()
    .optional(),

  execution: z
    .string()
    .trim()
    .optional(),

  outcome: z
    .string()
    .trim()
    .optional(),
});

export const workClientSchema =
  workBaseSchema.extend({
    coverImage: z
      .instanceof(File, {
        message: "Cover image is required.",
      }).nullable(),

    gallery: z
      .array(
        z.object({
          image: z.instanceof(File),
          alt: z
            .string()
            .trim()
            .max(120)
            .optional(),
        }),
      )
      .min(1),
  });

export type WorkFormValues =
  z.infer<typeof workClientSchema>;

export const cloudinaryImageSchema = z.object({
  url: z.string().url(),
  publicId: z.string(),
});

export const workServerSchema =
  workBaseSchema.extend({
    coverImage: cloudinaryImageSchema,

    gallery: z.array(
      cloudinaryImageSchema.extend({
        alt: z.string().optional(),
      }),
    ),
  });

export const defaultWorkValues: WorkFormValues = {
  title: "",
  slug: "",
  excerpt: "",
  client: "",
  eventType: WORK_CATEGORIES[0],
  location: "",

  projectDate: "",

  featured: false,
  isPublished: true,

  coverImage: null,

  gallery: [],

  objective: "",
  challenge: "",
  execution: "",
  outcome: "",
};