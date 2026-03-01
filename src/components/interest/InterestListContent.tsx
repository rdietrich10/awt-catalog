"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { List, LayoutGrid, Send, ArrowRight, ShoppingBag, Trash2, RotateCcw, Stethoscope } from "lucide-react";
import { useInterestList } from "@/context/InterestListContext";
import {
  PHYSICIAN_REVIEW_EMPTY_STATE,
  PHYSICIAN_REVIEW_HEADER_SUBTITLE,
  PROTOCOL_STATEMENT,
  SUCCESS_MODAL_MESSAGE,
} from "@/data/copy";
import { InterestListItem } from "@/components/interest/InterestListItem";
import { Modal } from "@/components/ui/Modal";
import { CompareTable } from "@/components/interest/CompareTable";
import { InquirySubmission } from "@/components/interest/InquirySubmission";
import type { EmailCaptureData } from "@/components/interest/EmailCaptureForm";
import { Button, ButtonLink } from "@/components/ui/Button";

export function InterestListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items, removeItem, clearList } = useInterestList();
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [view, setView] = useState<"list" | "compare">("list");

  useEffect(() => {
    if (searchParams.get("submit") === "1" && items.length > 0) {
      setShowEmailCapture(true);
      router.replace("/interest-list", { scroll: false });
    }
  }, [searchParams, items.length, router]);

  const handleClearList = () => {
    clearList();
    setShowClearConfirm(false);
  };

  const handleSubmitClick = () => {
    setShowEmailCapture(true);
  };

  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [inquiryError, setInquiryError] = useState<string | null>(null);

  const handleEmailCaptureSubmit = async (data: EmailCaptureData) => {
    setInquiryLoading(true);
    setInquiryError(null);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          products: items.map((p) => ({
            name: p.name,
            slug: p.slug,
            category: p.category,
            genericName: p.genericName,
            medicationClass: p.medicationClass,
            administrationRoute: p.administrationRoute,
            isBlend: p.isBlend,
            blendComponents: p.blendComponents,
            price: p.price,
            membershipPrice: p.membershipPrice,
            variants: p.variants.map((v) => ({
              strength: v.strength,
              vialSize: v.vialSize,
              concentration: v.concentration,
              schedule: v.schedule,
              price: v.price,
              membershipPrice: v.membershipPrice,
            })),
            keyBenefits: p.keyBenefits,
          })),
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setInquiryError(
          result.error || "Something went wrong. Please try again."
        );
        return;
      }

      setShowEmailCapture(false);
      setShowSuccess(true);
    } catch {
      setInquiryError(
        "Lost connection mid-flight! Check your internet and try again — your list is safe."
      );
    } finally {
      setInquiryLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    clearList();
  };

  const canCompare = items.length >= 2;

  const ctaBlock = (
    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-4">
      <ButtonLink
        href="/products"
        variant="secondary"
        size="lg"
        icon={ArrowRight}
        iconPosition="right"
        className="sm:order-first"
      >
        Continue Browsing
      </ButtonLink>
      <Button
        type="button"
        onClick={handleSubmitClick}
        variant="cta"
        size="lg"
        icon={Send}
        iconPosition="right"
      >
        Submit Inquiry
      </Button>
    </div>
  );

  if (items.length === 0 && !showSuccess) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-4">
          My List
        </h1>
        <p className="text-body-sm text-brand-silver mb-4">
          {PHYSICIAN_REVIEW_EMPTY_STATE}
        </p>
        <p className="text-body-sm text-brand-silver-dark mb-4 max-w-xl mx-auto">
          {PROTOCOL_STATEMENT}
        </p>
        <p className="text-body-sm text-brand-silver-dark mb-8">
          Your list is empty. Add products from the catalog to inquire about them.
        </p>
        <ButtonLink
          href="/products"
          variant="primary"
          size="lg"
          icon={ShoppingBag}
          iconPosition="right"
        >
          Browse Catalog
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 min-h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8 shrink-0">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-brand-white">
            My List
          </h1>
          <p className="text-body-sm text-brand-silver mt-2">
            {PHYSICIAN_REVIEW_HEADER_SUBTITLE}
          </p>
          <p className="text-body-sm text-brand-silver-dark mt-1">
            {PROTOCOL_STATEMENT}
          </p>
        </div>
        <Button
          type="button"
          onClick={() => setShowClearConfirm(true)}
          variant="ghost"
          size="md"
          icon={RotateCcw}
          iconPosition="left"
          className="sm:self-start"
        >
          Clear List
        </Button>
      </div>

      <div className="mb-6 sm:mb-8 shrink-0 border border-brand-border bg-brand-grey-900/30 p-4 flex items-start gap-3">
        <Stethoscope className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" aria-hidden />
        <p className="text-body-sm text-brand-silver">
          This is a medical inquiry — not a shopping cart. A licensed physician will
          review your selections and determine clinical appropriateness before any
          products are dispensed.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8 shrink-0">
        <div className="flex items-center gap-2">
          {items.length >= 2 && (
            <>
              <Button
                type="button"
                onClick={() => setView("list")}
                variant="toggle"
                size="md"
                isSelected={view === "list"}
                icon={List}
                iconPosition="left"
              >
                List
              </Button>
              <Button
                type="button"
                onClick={() => setView("compare")}
                variant="toggle"
                size="md"
                isSelected={view === "compare"}
                icon={LayoutGrid}
                iconPosition="left"
              >
                Compare
              </Button>
            </>
          )}
          {items.length === 1 && (
            <p className="text-body-sm text-brand-silver-dark">
              Add 2 or more products to compare them side by side.
            </p>
          )}
        </div>
        {ctaBlock}
      </div>

      {view === "list" && (
        <div className="flex flex-col flex-1 min-h-0">
          <div
            className={
              items.length === 1
                ? "flex-1 flex flex-col min-h-0"
                : "space-y-6 flex-1"
            }
          >
            {items.map((p) => (
              <div
                key={p.slug}
                className={items.length === 1 ? "flex-1 min-h-0 flex" : undefined}
              >
                <InterestListItem
                  product={p}
                  onRemove={() => removeItem(p.slug)}
                  className={items.length === 1 ? "flex-1 min-h-0 w-full" : undefined}
                />
              </div>
            ))}
          </div>
          <div className="mt-8 sm:mt-12 shrink-0">{ctaBlock}</div>
        </div>
      )}

      {view === "compare" && canCompare && (
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 min-h-0 overflow-auto">
            <CompareTable products={items} />
          </div>
          <div className="mt-6 sm:mt-8 shrink-0">{ctaBlock}</div>
        </div>
      )}

      <Modal
        isOpen={showEmailCapture}
        onClose={() => setShowEmailCapture(false)}
        title="Submit Your Inquiry"
        className="max-w-lg"
      >
        <InquirySubmission
          items={items}
          onSubmit={handleEmailCaptureSubmit}
          onCancel={() => setShowEmailCapture(false)}
          loading={inquiryLoading}
          error={inquiryError}
        />
      </Modal>

      <Modal isOpen={showSuccess} onClose={handleCloseSuccess} title="Inquiry Sent">
        <p className="text-body-sm text-brand-silver">
          {SUCCESS_MODAL_MESSAGE}
        </p>
        <Link
          href="/products"
          onClick={handleCloseSuccess}
          className="mt-6 inline-block text-brand-white underline"
        >
          Back to Catalog
        </Link>
      </Modal>

      <Modal
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        title="Clear your list?"
      >
        <p className="text-body-sm text-brand-silver mb-6">
          Your selections will vanish into the void—but you can always add them back. No pressure.
        </p>
        <div className="flex flex-col-reverse sm:flex-row gap-4">
          <Button
            type="button"
            onClick={() => setShowClearConfirm(false)}
            variant="secondary"
            size="lg"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleClearList}
            variant="primary"
            size="lg"
            icon={Trash2}
            iconPosition="left"
          >
            Clear List
          </Button>
        </div>
      </Modal>
    </div>
  );
}
