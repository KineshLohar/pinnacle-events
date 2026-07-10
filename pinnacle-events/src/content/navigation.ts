export type ServiceLink = {
  name: string;
  slug: string;
};

export type ServiceGroup = {
  title: string;
  services: ServiceLink[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    title: "Corporate & MICE",
    services: [
      { name: "Corporate Events", slug: "corporate-events" },
      { name: "Conferences", slug: "conferences" },
      { name: "MICE", slug: "mice" },
      { name: "Corporate Celebrations", slug: "corporate-celebrations" },
      { name: "Exhibitions", slug: "exhibitions" },
    ],
  },
  {
    title: "Brand & Retail",
    services: [
      { name: "Brand Activations", slug: "brand-activations" },
      { name: "Retail Branding", slug: "retail-branding" },
      { name: "Product Launches", slug: "product-launches" },
      { name: "Mall Promotions", slug: "mall-promotions" },
      { name: "Outdoor Branding", slug: "outdoor-branding" },
    ],
  },
  {
    title: "Campaigns & Outreach",
    services: [
      { name: "Experiential Marketing", slug: "experiential-marketing" },
      { name: "Roadshows", slug: "roadshows" },
      { name: "Dealer Meets", slug: "dealer-meets" },
      { name: "School Programs", slug: "school-programs" },
      { name: "College Campaigns", slug: "college-campaigns" },
    ],
  },
  {
    title: "Marketing & Media",
    services: [
      { name: "Trade Marketing", slug: "trade-marketing" },
      { name: "Digital Advertising", slug: "digital-advertising" },
      { name: "Media Buying", slug: "media-buying" },
    ],
  },
];

export const primaryNav = [
  { name: "Work", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Clients", href: "/clients" },
  { name: "Contact", href: "/contact" },
];
