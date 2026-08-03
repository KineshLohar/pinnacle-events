import { clientSchema, type Client } from "@/lib/schemas";

type RawClient = Omit<Client, "id" | "featured" | "sortOrder">;

const rawClients: RawClient[] = [
  { name: "Garnier" },
  { name: "TVS Eurogrip" },
  { name: "IIFL" },
  { name: "IFFCO" },
  { name: "Tata Capital" },
  { name: "SBI Securities" },
  { name: "Aakash Institute" },
  { name: "GoMechanic" },
  { name: "Storia" },
];

export const clients: Client[] = rawClients.map((c, i) => ({
  ...c,
  id: c.name.toLowerCase().replace(/\s+/g, "-"),
  featured: true, // all current clients appear in the Home marquee for now
  sortOrder: i,
}));

if (process.env.NODE_ENV !== "production") {
  clients.forEach((c) => clientSchema.parse(c));
}

export function getFeaturedClients() {
  return clients.filter((c) => c.featured);
}
