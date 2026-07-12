import { z } from "zod";

export const WORK_CATEGORIES = [
  "Corporate Event",
  "Product Launch",
  "Exhibition",
  "Conference",
  "Roadshow",
  "Brand Activation",
  "Award Ceremony",
] as const;

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

export const workSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(150),

  slug: z
    .string()
    .trim()
    .min(3, "Slug is required.")
    .max(150)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Only lowercase letters, numbers and hyphens are allowed.",
    ),

  client: z
    .string()
    .trim()
    .min(2, "Client is required.")
    .max(120),

  // category: z
  //   .string()
  //   .trim()
  //   .min(2, "Category is required.")
  //   .max(120),
  category: z.enum(WORK_CATEGORIES),

  location: z
    .string()
    .trim()
    .min(2, "Location is required.")
    .max(120),

  projectDate: z
    .string()
    .min(1, "Project date is required."),

  featured: z.boolean(),

  isPublished: z.boolean(),

  coverImage: z
    .string()
    .min(1, "Cover image is required."),

  gallery: z
    .array(galleryImageSchema)
    .min(1, "Upload at least one gallery image."),

  objective: z
    .string()
    .trim()
    .optional(),
    // .min(10, "Objective is required."),

  challenge: z
    .string()
    .trim()
    .optional(),
    // .min(10, "Challenge is required."),

  execution: z
    .string()
    .trim()
    .optional(),
    // .min(10, "Execution is required."),

  outcome: z
    .string()
    .trim()
    .optional(),
    // .min(10, "Outcome is required."),
});

export type WorkFormValues = z.infer<typeof workSchema>;

export const defaultWorkValues: WorkFormValues = {
  title: "",
  slug: "",

  client: "",
  category: WORK_CATEGORIES[0],
  location: "",

  projectDate: "",

  featured: false,
  isPublished: true,

  coverImage: "",

  gallery: [],

  objective: "",
  challenge: "",
  execution: "",
  outcome: "",
};