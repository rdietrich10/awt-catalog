import type { Metadata } from "next";
import { Suspense } from "react";
import { InterestListContent } from "@/components/interest/InterestListContent";

export const metadata: Metadata = {
  title: "My List",
  description:
    "Review your selected products and submit an inquiry. Our physicians will review your list before we create your invoice.",
  robots: { index: false, follow: false },
};

function InterestListFallback() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 animate-pulse">
      <div className="h-9 bg-brand-grey-900 rounded w-48 mb-4" />
      <div className="h-4 bg-brand-grey-900 rounded w-64" />
    </div>
  );
}

export default function InterestListPage() {
  return (
    <Suspense fallback={<InterestListFallback />}>
      <InterestListContent />
    </Suspense>
  );
}
