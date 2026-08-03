import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is required.")
    .max(100, "Name is too long."),

  company: z
    .string()
    .trim()
    .min(2, "Company is required.")
    .max(120, "Company is too long."),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(255),

  phone: z
    .string()
    .trim()
    .min(8, "Phone number is required.")
    .max(20)
    .regex(
      /^[0-9+\-\s()]+$/,
      "Enter a valid phone number.",
    ),

  message: z
    .string()
    .trim()
    .min(
      20,
      "Please provide at least 20 characters.",
    )
    .max(
      3000,
      "Message is too long.",
    ),
});

export type ContactFormValues =
  z.infer<typeof contactSchema>;

export const defaultContactValues: ContactFormValues =
  {
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  };