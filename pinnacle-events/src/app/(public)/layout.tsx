import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pinnacleevents.co.in"),
  title: {
    default: "Pinnacle Events | Corporate Event Management & Experiential Marketing, Ahmedabad",
    template: "%s | Pinnacle Events",
  },
  description:
    "Pinnacle Events plans and executes India's most demanding corporate activations, exhibitions, product launches and experiential marketing campaigns -- for brands including Garnier, TVS Eurogrip, IIFL, IFFCO, Tata Capital and SBI Securities.",
  keywords: [
    "corporate event management company India",
    "experiential marketing agency Ahmedabad",
    "brand activation agency",
    "event management Ahmedabad",
    "exhibition management company",
    "dealer meet organizer",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Pinnacle Events",
    title: "Pinnacle Events | Your Vision. Our Execution.",
    description:
      "India's premium corporate event management and experiential marketing partner, headquartered in Ahmedabad.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pinnacle Events | Your Vision. Our Execution.",
    description:
      "India's premium corporate event management and experiential marketing partner, headquartered in Ahmedabad.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main id="main-content" className="flex-1">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
