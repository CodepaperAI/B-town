import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { FloatingActions } from "@/components/floating-actions";
import { MotionShell } from "@/components/motion-shell";
import { brand } from "@/lib/content";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"]
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: {
    default: "B-Town Entertainment | Brampton Wedding DJ, Décor, Dhol & Event Production",
    template: "%s | B-Town Entertainment"
  },
  description:
    "Premium Brampton and GTA event entertainment for South Asian weddings, receptions, Rokas, birthdays, corporate events, DJ services, décor, dhol, photography, videography, sparklers, and dry ice effects.",
  keywords: [
    "Brampton wedding DJ",
    "GTA Punjabi DJ",
    "Bollywood wedding DJ",
    "Brampton event decor",
    "Dhol services GTA",
    "cold sparklers wedding",
    "dry ice dancing on clouds",
    "South Asian wedding entertainment"
  ],
  openGraph: {
    title: "B-Town Entertainment",
    description:
      "Luxury entertainment, décor, media, dhol, and production for Brampton and GTA celebrations.",
    url: "https://btownent.ca",
    siteName: "B-Town Entertainment",
    images: [
      {
        url: "/images/hero-reception.webp",
        width: 1920,
        height: 1280,
        alt: "South Asian wedding reception dance floor"
      }
    ],
    locale: "en_CA",
    type: "website"
  },
  metadataBase: new URL("https://btownent.ca")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a
          href="#main"
          className="focus-ring fixed left-4 top-4 z-[100] -translate-y-20 rounded-[4px] bg-ivory px-4 py-3 text-sm font-bold text-ink transition focus:translate-y-0"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <MotionShell>{children}</MotionShell>
        <SiteFooter />
        <FloatingActions phoneHref={brand.phoneHref} whatsappHref={brand.whatsappHref} />
      </body>
    </html>
  );
}
