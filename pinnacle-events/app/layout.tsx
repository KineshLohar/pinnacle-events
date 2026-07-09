import type { Metadata } from "next";
import { Fraunces, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

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
      className={`${fraunces.variable} ${manrope.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold-primary focus:text-bg-primary focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
