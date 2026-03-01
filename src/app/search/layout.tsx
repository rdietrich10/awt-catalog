import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search AW Therapeutics catalog for products, articles, and glossary terms across weight management, recovery, longevity, and hormonal health.",
  robots: { index: false, follow: true },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
