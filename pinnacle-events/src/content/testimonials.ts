import { testimonialSchema, type Testimonial } from "@/lib/schemas";

type RawTestimonial = Omit<Testimonial, "id" | "featured" | "sortOrder">;

const rawTestimonials: RawTestimonial[] = [
  {
    quote:
      "Pinnacle Events managed a multi-city rollout for us without a single missed deadline. Their coordination across venues was seamless.",
    name: "Marketing Head",
    company: "Leading Financial Services Brand",
  },
  {
    quote:
      "What stood out was how calm the execution felt on-ground, even with the scale involved. That comes from real process discipline.",
    name: "Brand Manager",
    company: "FMCG Enterprise",
  },
  {
    quote:
      "We have worked with several agencies. Pinnacle is the only one we now call first for anything large-scale.",
    name: "HR Director",
    company: "Automobile Group",
  },
];

export const testimonials: Testimonial[] = rawTestimonials.map((t, i) => ({
  ...t,
  id: `testimonial-${i + 1}`,
  featured: true, // all current testimonials are shown on Home for now
  sortOrder: i,
}));

if (process.env.NODE_ENV !== "production") {
  testimonials.forEach((t) => testimonialSchema.parse(t));
}

export function getFeaturedTestimonials() {
  return testimonials.filter((t) => t.featured);
}
