export type Service = {
  name: string;
  slug: string;
  category: string;
  overview: string;
  benefits: string[];
  process: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    name: "Corporate Events",
    slug: "corporate-events",
    category: "Corporate & MICE",
    overview:
      "From annual conferences to town halls and leadership offsites, we plan and execute corporate events that reflect the standards of the organizations we work with.",
    benefits: [
      "Single point of accountability across planning and execution",
      "Venue sourcing and negotiation across major Indian cities",
      "In-house AV, staging and fabrication capability",
      "Detailed run-of-show documentation for every stakeholder",
    ],
    process: [
      "Discovery & objective mapping",
      "Concept and budget proposal",
      "Vendor and venue lock-in",
      "Production and rehearsal",
      "On-ground execution",
      "Post-event reporting",
    ],
    faqs: [
      {
        q: "Do you manage events outside Ahmedabad?",
        a: "Yes -- we execute corporate events across 30+ cities in India through our vendor and production network.",
      },
      {
        q: "Can you handle multi-day conferences?",
        a: "Yes, including multi-track sessions, delegate management and speaker coordination.",
      },
    ],
  },
  {
    name: "Brand Activations",
    slug: "brand-activations",
    category: "Brand & Retail",
    overview:
      "On-ground brand activations designed to create direct engagement between a brand and its audience, in the environments where purchase decisions actually happen.",
    benefits: [
      "Concept-to-execution ownership",
      "Trained on-ground promoter and staffing management",
      "Real-time reporting from activation locations",
    ],
    process: ["Strategy", "Concept design", "Fabrication", "On-ground execution", "Reporting"],
    faqs: [
      {
        q: "Can activations run simultaneously across cities?",
        a: "Yes, this is one of our core strengths -- coordinated multi-city rollouts with consistent quality.",
      },
    ],
  },
  {
    name: "Product Launches",
    slug: "product-launches",
    category: "Brand & Retail",
    overview:
      "Launch events choreographed to build anticipation and deliver a moment worthy of the product -- from reveal mechanics to media and guest management.",
    benefits: ["End-to-end launch choreography", "Media and guest list management", "Stage, AV and reveal engineering"],
    process: ["Concept", "Production design", "Rehearsal", "Live execution"],
    faqs: [
      { q: "Do you handle celebrity or dignitary logistics?", a: "Yes, including green-room, security coordination and schedule management." },
    ],
  },
  {
    name: "Experiential Marketing",
    slug: "experiential-marketing",
    category: "Campaigns & Outreach",
    overview:
      "Immersive brand experiences built to convert attention into recall -- pop-ups, interactive installations and campaign tours.",
    benefits: ["Custom experience design", "Fabrication in-house", "Data capture and campaign reporting"],
    process: ["Insight", "Experience design", "Build", "Tour execution", "Reporting"],
    faqs: [{ q: "Can this run as a multi-city tour?", a: "Yes, we regularly manage multi-week, multi-city experiential tours." }],
  },
  {
    name: "Retail Branding",
    slug: "retail-branding",
    category: "Brand & Retail",
    overview:
      "In-store branding and retail environment design that reinforces brand presence at the point of sale, executed consistently across outlet networks.",
    benefits: ["Standardized in-store kits", "Pan-India installation network", "Quality audits post-installation"],
    process: ["Design", "Kit production", "Rollout scheduling", "Installation", "Audit"],
    faqs: [{ q: "How many outlets can you cover?", a: "Our vendor network supports rollouts across hundreds of outlets simultaneously." }],
  },
  {
    name: "Roadshows",
    slug: "roadshows",
    category: "Campaigns & Outreach",
    overview:
      "Mobile brand roadshows that carry a campaign directly to high-footfall locations across cities, towns and highways.",
    benefits: ["Route and location planning", "Vehicle branding and fabrication", "On-ground crew management"],
    process: ["Route planning", "Vehicle build", "Crew deployment", "Daily reporting"],
    faqs: [{ q: "What is a typical roadshow duration?", a: "Anywhere from a single-city weekend activation to multi-week, multi-state tours." }],
  },
  {
    name: "Dealer Meets",
    slug: "dealer-meets",
    category: "Campaigns & Outreach",
    overview:
      "Channel-partner and dealer meet events that reinforce trust and alignment across a brand's distribution network, at single-city or nationwide scale.",
    benefits: ["Delegate travel and hospitality coordination", "Consistent multi-city production quality", "Engagement and recognition formats"],
    process: ["Planning", "Venue and travel coordination", "Production", "Execution", "Feedback capture"],
    faqs: [{ q: "Can you manage delegate travel?", a: "Yes, including outstation delegate logistics for nationwide dealer meets." }],
  },
  {
    name: "Trade Marketing",
    slug: "trade-marketing",
    category: "Marketing & Media",
    overview:
      "Trade marketing campaigns that strengthen visibility and relationships at the retail and distribution level.",
    benefits: ["Retail and channel alignment", "Point-of-sale material rollout", "Field execution tracking"],
    process: ["Strategy", "Material design", "Field rollout", "Tracking"],
    faqs: [{ q: "Do you support FMCG trade marketing at scale?", a: "Yes, this is a core part of our retail and trade practice." }],
  },
  {
    name: "Outdoor Branding",
    slug: "outdoor-branding",
    category: "Brand & Retail",
    overview:
      "Outdoor and out-of-home branding executions -- hoardings, gantries and site branding -- planned and installed with quality control at every site.",
    benefits: ["Site survey and planning", "Fabrication and installation", "Post-installation quality checks"],
    process: ["Site survey", "Design approval", "Fabrication", "Installation", "Audit"],
    faqs: [{ q: "Can you manage outdoor sites across multiple cities?", a: "Yes, through our nationwide vendor and installation network." }],
  },
  {
    name: "Exhibitions",
    slug: "exhibitions",
    category: "Corporate & MICE",
    overview:
      "Exhibition stall design, fabrication and on-ground management for trade shows and industry exhibitions across India's major venues.",
    benefits: ["Custom stall design and fabrication", "On-site build and teardown management", "Visitor engagement planning"],
    process: ["Design", "Fabrication", "On-site build", "Live management", "Teardown"],
    faqs: [{ q: "Do you manage exhibitions outside Gujarat?", a: "Yes, we have executed exhibition stalls at major venues across India." }],
  },
  {
    name: "Conferences",
    slug: "conferences",
    category: "Corporate & MICE",
    overview:
      "Multi-track corporate and investor conferences, managed from delegate registration to stage production.",
    benefits: ["Delegate management systems", "Multi-track session logistics", "Stage and AV production"],
    process: ["Planning", "Registration setup", "Production", "Execution", "Reporting"],
    faqs: [{ q: "Can you handle investor conferences?", a: "Yes, including compliance-sensitive delegate and disclosure logistics." }],
  },
  {
    name: "MICE",
    slug: "mice",
    category: "Corporate & MICE",
    overview:
      "Meetings, incentives, conferences and exhibitions -- managed end-to-end for corporates running domestic MICE programs.",
    benefits: ["Destination and venue sourcing", "Group travel coordination", "Program design and execution"],
    process: ["Program design", "Venue sourcing", "Travel coordination", "On-ground execution"],
    faqs: [{ q: "Do you handle group travel logistics?", a: "Yes, including flights, accommodation and ground transport for MICE groups." }],
  },
  {
    name: "Mall Promotions",
    slug: "mall-promotions",
    category: "Brand & Retail",
    overview:
      "High-footfall mall activations designed for daily-traffic retail environments, executed with mall-compliant fabrication and staffing.",
    benefits: ["Mall compliance and permissions handling", "High-footfall engagement design", "Daily reporting"],
    process: ["Mall approvals", "Design", "Setup", "Daily execution", "Teardown"],
    faqs: [{ q: "Do you handle mall permissions?", a: "Yes, we manage the full permission and compliance process with mall management." }],
  },
  {
    name: "School Programs",
    slug: "school-programs",
    category: "Campaigns & Outreach",
    overview:
      "Educational and brand-awareness programs executed across school networks, designed with age-appropriate engagement formats.",
    benefits: ["School network access", "Age-appropriate content design", "Safety-compliant execution"],
    process: ["Program design", "School coordination", "Execution", "Feedback capture"],
    faqs: [{ q: "How many schools can a program cover?", a: "Programs can scale from a single city to statewide school networks." }],
  },
  {
    name: "College Campaigns",
    slug: "college-campaigns",
    category: "Campaigns & Outreach",
    overview:
      "Campus engagement campaigns that connect brands with student audiences through relevant, well-executed on-ground formats.",
    benefits: ["Campus network access", "Youth-relevant engagement design", "Multi-college scheduling"],
    process: ["Strategy", "Campus coordination", "Execution", "Reporting"],
    faqs: [{ q: "Can this run across multiple colleges in one city?", a: "Yes, multi-college scheduling within a city or region is standard." }],
  },
  {
    name: "Digital Advertising",
    slug: "digital-advertising",
    category: "Marketing & Media",
    overview:
      "Digital campaign planning and execution that complements on-ground activity with measurable online reach.",
    benefits: ["Campaign planning and media buying", "Integration with on-ground activations", "Performance reporting"],
    process: ["Planning", "Buying", "Execution", "Reporting"],
    faqs: [{ q: "Do you run digital alongside on-ground events?", a: "Yes, integrated digital and on-ground campaigns are a core offering." }],
  },
  {
    name: "Media Buying",
    slug: "media-buying",
    category: "Marketing & Media",
    overview:
      "Media planning and buying across print, outdoor and digital channels to support campaign reach objectives.",
    benefits: ["Channel and inventory negotiation", "Budget optimization", "Campaign performance tracking"],
    process: ["Planning", "Negotiation", "Buying", "Tracking"],
    faqs: [{ q: "Which media channels do you cover?", a: "Print, outdoor, radio and digital, planned around each campaign's audience." }],
  },
  {
    name: "Corporate Celebrations",
    slug: "corporate-celebrations",
    category: "Corporate & MICE",
    overview:
      "Anniversaries, milestone celebrations and employee-recognition events, produced with the same rigor as a corporate conference.",
    benefits: ["Employee experience design", "Recognition and award formats", "Entertainment and production management"],
    process: ["Concept", "Production", "Rehearsal", "Live execution"],
    faqs: [{ q: "Can you include entertainment and awards together?", a: "Yes, we regularly combine recognition formats with entertainment programming." }],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
