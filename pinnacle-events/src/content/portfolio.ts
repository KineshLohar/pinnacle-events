export type CaseStudy = {
  title: string;
  slug: string;
  client: string;
  location: string;
  category: string;
  objective: string;
  challenge: string;
  execution: string;
  outcome: string;
};

export const caseStudies: CaseStudy[] = [
  {
    title: "TVS Eurogrip — Nationwide Dealer Meet",
    slug: "tvs-eurogrip-dealer-meet",
    client: "TVS Eurogrip",
    location: "Multi-City, India",
    category: "Dealer Meets",
    objective:
      "Bring together dealer partners from across India for a unified brand and product update, reinforcing channel confidence ahead of a key sales cycle.",
    challenge:
      "Coordinating delegate travel, venue logistics and a consistent program experience across multiple cities without variance in quality.",
    execution:
      "Pinnacle managed end-to-end delegate travel, venue production, stage design and on-ground coordination across each city, with a shared run-of-show to keep delivery consistent.",
    outcome:
      "Delivered a consistent, high-satisfaction experience across all locations with zero major logistical escalations.",
  },
  {
    title: "Garnier — Retail Activation Campaign",
    slug: "garnier-retail-activation",
    client: "Garnier",
    location: "Pan-India",
    category: "Retail Branding",
    objective:
      "Increase in-store visibility and engagement for a product line across a large retail network.",
    challenge:
      "Rolling out consistent branding and promoter-led engagement across a high number of outlets in a compressed timeline.",
    execution:
      "Standardized in-store kits were produced and installed pan-India, supported by trained promoters and daily field reporting.",
    outcome:
      "Achieved full network rollout on schedule with measurable uplift in in-store engagement.",
  },
  {
    title: "IIFL — Investor Conference",
    slug: "iifl-investor-conference",
    client: "IIFL",
    location: "Ahmedabad",
    category: "Conferences",
    objective:
      "Host a high-stakes investor conference requiring precise delegate management and stage production.",
    challenge:
      "Managing compliance-sensitive delegate logistics alongside a polished, high-production stage experience.",
    execution:
      "Delegate registration, venue production, AV and stage management were handled end-to-end, with strict adherence to timing and disclosure protocols.",
    outcome: "Delivered a seamless conference experience with full compliance and no scheduling deviations.",
  },
  {
    title: "Aakash Institute — College Campaign",
    slug: "aakash-college-campaign",
    client: "Aakash Institute",
    location: "Gujarat",
    category: "College Campaigns",
    objective:
      "Build brand awareness and engagement among student audiences across multiple colleges in the region.",
    challenge:
      "Coordinating scheduling and content relevance across a diverse set of college campuses within a single region.",
    execution:
      "A youth-relevant engagement format was designed and executed across multiple campuses with dedicated on-ground teams per location.",
    outcome: "Reached student audiences across the target region with consistent engagement quality.",
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
