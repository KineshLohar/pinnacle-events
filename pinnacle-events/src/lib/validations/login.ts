import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email("Please enter a valid email.")
    .trim(),

  password: z
    .string()
    .min(8, "Password is required.")
});

export type LoginSchema = z.infer<typeof loginSchema>;