import { awardSchema, type Award } from "@/lib/schemas";

type RawAward = Omit<Award, "id" | "sortOrder">;

const rawAwards: RawAward[] = [
  {
    year: "2023",
    title: "Client Appreciation Award",
    org: "Corporate Partner Recognition",
    imageUrl: "/images/awards/award-2023.jpg",
  },
  {
    year: "2022",
    title: "Excellence in Event Execution",
    org: "Industry Recognition Program",
    imageUrl: "/images/awards/award-2022.jpg",
  },
  {
    year: "2021",
    title: "Top Experiential Agency, Gujarat",
    org: "Regional Business Recognition",
    imageUrl: "/images/awards/award-2021.jpg",
  },
  {
    year: "2019",
    title: "Emerging Event Management Company",
    org: "State Business Awards",
    imageUrl: "/images/awards/award-2019.jpg",
  },
];

export const awards: Award[] = rawAwards.map((a, i) => ({
  ...a,
  id: `award-${a.year}`,
  sortOrder: i,
}));

if (process.env.NODE_ENV !== "production") {
  awards.forEach((a) => awardSchema.parse(a));
}

/** Most recent few, for the Home page teaser section. */
export function getFeaturedAwards(count = 3) {
  return awards.slice(0, count);
}