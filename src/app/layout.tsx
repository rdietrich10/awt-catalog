import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InterestListProvider } from "@/context/InterestListContext";
import { JsonLd, organizationJsonLd, webSiteJsonLd } from "@/lib/structured-data";
import { GoogleAnalytics } from "@/components/layout/GoogleAnalytics";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { Analytics } from "@vercel/analytics/next";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AW Therapeutics | Advanced Therapeutics",
    template: "%s | AW Therapeutics",
  },
  description:
    "AW Therapeutics advanced therapeutics catalog. Medical Grade compounds for weight management, recovery, longevity, and hormonal health. Browse, compare, submit inquiries. Provider-guided, precision formulated.",
  keywords: [
    "advanced therapeutics",
    "therapeutic medications",
    "AW Therapeutics",
    "semaglutide",
    "tirzepatide",
    "BPC-157",
    "TB-500",
    "weight management",
    "longevity",
    "growth hormone",
    "clinical grade",
  ],
  authors: [{ name: "AW Therapeutics" }],
  creator: "AW Therapeutics",
  publisher: "AW Therapeutics",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "AW Therapeutics Advanced Therapeutics",
    title: "AW Therapeutics | Advanced Therapeutics",
    description:
      "AW Therapeutics advanced therapeutics catalog. Medical Grade compounds for weight management, recovery, longevity, and hormonal health. Browse, compare, submit inquiries. Precision therapeutics. Elevated outcomes.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "AW Therapeutics Advanced Therapeutics — Precision therapeutics. Elevated outcomes.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AW Therapeutics | Advanced Therapeutics",
    description:
      "AW Therapeutics advanced therapeutics catalog. Medical Grade compounds for weight management, recovery, longevity, and hormonal health. Browse, compare, submit inquiries. Precision therapeutics. Elevated outcomes.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <meta name="theme-color" content="#090d0b" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col font-body">
        <GoogleAnalytics />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={webSiteJsonLd()} />
        <InterestListProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-brand-gold focus:text-brand-black focus:font-display focus:text-sm focus:uppercase focus:tracking-wider"
          >
            Skip to main content
          </a>
          <AnnouncementBar />
          <Navbar />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
        </InterestListProvider>
        <Analytics />
      </body>
    </html>
  );
}
