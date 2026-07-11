import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Manrope, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

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
    <html
      lang="en"
      className={cn("h-full", fraunces.variable, manrope.variable, plexMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary antialiased">
        <noscript>
          <style>{`.js-reveal, .js-reveal-group > * { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
