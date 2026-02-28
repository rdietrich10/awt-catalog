"use client";

import Image from "next/image";
import { useState } from "react";
import { getBlurDataURL } from "@/lib/blurData";

export interface QualityReport {
  src: string;
  label: string;
}

interface QualityReportGridProps {
  reports: QualityReport[];
}

function ReportCard({ report }: { report: QualityReport }) {
  const [expanded, setExpanded] = useState(false);
  const blurData = getBlurDataURL(report.src);

  return (
    <>
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="group border border-brand-border rounded-sm overflow-hidden bg-brand-grey-900 hover:border-brand-silver-dark transition-colors text-left"
      >
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={report.src}
            alt={`${report.label} report`}
            fill
            className="object-contain p-2"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            placeholder={blurData ? "blur" : "empty"}
            blurDataURL={blurData}
          />
        </div>
        <div className="border-t border-brand-border px-3 py-2">
          <p className="text-body-sm text-brand-silver group-hover:text-brand-white transition-colors truncate">
            {report.label}
          </p>
        </div>
      </button>

      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setExpanded(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${report.label} report expanded view`}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <Image
              src={report.src}
              alt={`${report.label} report`}
              width={900}
              height={1200}
              className="object-contain max-h-[90vh] w-auto rounded-sm"
            />
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-grey-900 border border-brand-border text-brand-silver hover:text-brand-white transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function QualityReportGrid({ reports }: QualityReportGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {reports.map((report) => (
        <ReportCard key={report.src} report={report} />
      ))}
    </div>
  );
}
