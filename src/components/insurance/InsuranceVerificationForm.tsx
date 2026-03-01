"use client";

import { useState, useCallback } from "react";
import { Send, Loader2, AlertTriangle, CheckCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { InsuranceCardUpload } from "./InsuranceCardUpload";
import {
  INSURANCE_FORM_HEADING,
  INSURANCE_FORM_DESCRIPTION,
  INSURANCE_SUCCESS_HEADING,
  INSURANCE_SUCCESS_MESSAGE,
  INSURANCE_CONSENT_LABEL,
  INSURANCE_DISCLAIMER,
  SEX_OPTIONS,
  US_STATES,
} from "@/data/insurance";

interface FormState {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  sex: string;
  email: string;
  insuranceCompany: string;
  policyNumber: string;
  hipaaConsent: boolean;
}

const initialState: FormState = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  sex: "",
  email: "",
  insuranceCompany: "",
  policyNumber: "",
  hipaaConsent: false,
};

const inputStyles =
  "w-full bg-transparent border border-brand-border px-4 py-3 text-body-sm text-brand-white placeholder:text-brand-silver-dim focus:outline-none focus:border-brand-gold transition-colors min-h-[44px]";

export function InsuranceVerificationForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [cardFront, setCardFront] = useState<File | null>(null);
  const [cardBack, setCardBack] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }));
      if (error) setError(null);
    },
    [error],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      if (!cardFront || !cardBack) {
        setError(
          "Please upload images of both the front and back of your insurance card.",
        );
        setLoading(false);
        return;
      }

      try {
        const formData = new FormData();

        for (const [key, value] of Object.entries(form)) {
          if (typeof value === "boolean") {
            formData.append(key, String(value));
          } else {
            formData.append(key, value);
          }
        }

        formData.append("cardFront", cardFront);
        formData.append("cardBack", cardBack);

        const res = await fetch("/api/insurance-verification", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Something went wrong. Please try again.");
          return;
        }

        setSubmitted(true);
      } catch {
        setError(
          "Looks like we lost connection for a sec. Check your internet and give it another go!",
        );
      } finally {
        setLoading(false);
      }
    },
    [form, cardFront, cardBack],
  );

  if (submitted) {
    return (
      <div className="border border-brand-border p-8 text-center">
        <CheckCircle className="w-10 h-10 text-brand-gold mx-auto" />
        <h3 className="mt-4 font-display text-lg uppercase tracking-wider text-brand-white">
          {INSURANCE_SUCCESS_HEADING}
        </h3>
        <p className="mt-2 text-body-sm text-brand-silver max-w-lg mx-auto">
          {INSURANCE_SUCCESS_MESSAGE}
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(initialState);
            setCardFront(null);
            setCardBack(null);
            setSubmitted(false);
          }}
          className="mt-4 text-body-sm text-brand-silver-dark hover:text-brand-white transition-colors underline underline-offset-2"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <ShieldCheck className="w-6 h-6 text-brand-gold shrink-0" />
        <h3 className="font-display text-lg uppercase tracking-wider text-brand-white">
          {INSURANCE_FORM_HEADING}
        </h3>
      </div>
      <p className="text-body-sm text-brand-silver mb-6 max-w-2xl">
        {INSURANCE_FORM_DESCRIPTION}
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div
            role="alert"
            className="flex items-start gap-3 border border-red-500/30 bg-red-500/5 p-4"
          >
            <AlertTriangle
              className="w-5 h-5 text-red-400 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <p className="text-body-sm text-red-300">{error}</p>
          </div>
        )}

        {/* Personal Information */}
        <fieldset className="space-y-4">
          <legend className="text-caption font-display tracking-widest uppercase text-brand-gold mb-3">
            Personal Information
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="ins-firstName"
                className="block text-caption font-display tracking-wider uppercase text-brand-silver-dark mb-1.5"
              >
                First Name <span className="text-brand-gold">*</span>
              </label>
              <input
                type="text"
                id="ins-firstName"
                name="firstName"
                required
                disabled={loading}
                value={form.firstName}
                onChange={handleChange}
                placeholder="First name"
                className={inputStyles}
              />
            </div>
            <div>
              <label
                htmlFor="ins-lastName"
                className="block text-caption font-display tracking-wider uppercase text-brand-silver-dark mb-1.5"
              >
                Last Name <span className="text-brand-gold">*</span>
              </label>
              <input
                type="text"
                id="ins-lastName"
                name="lastName"
                required
                disabled={loading}
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className={inputStyles}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="ins-dateOfBirth"
                className="block text-caption font-display tracking-wider uppercase text-brand-silver-dark mb-1.5"
              >
                Date of Birth <span className="text-brand-gold">*</span>
              </label>
              <input
                type="date"
                id="ins-dateOfBirth"
                name="dateOfBirth"
                required
                disabled={loading}
                value={form.dateOfBirth}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                className={inputStyles}
              />
            </div>
            <div>
              <label
                htmlFor="ins-sex"
                className="block text-caption font-display tracking-wider uppercase text-brand-silver-dark mb-1.5"
              >
                Sex <span className="text-brand-gold">*</span>
              </label>
              <select
                id="ins-sex"
                name="sex"
                required
                disabled={loading}
                value={form.sex}
                onChange={handleChange}
                className={`${inputStyles} appearance-none`}
              >
                <option value="" disabled>
                  Select
                </option>
                {SEX_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-brand-black">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="ins-phone"
                className="block text-caption font-display tracking-wider uppercase text-brand-silver-dark mb-1.5"
              >
                Phone <span className="text-brand-gold">*</span>
              </label>
              <input
                type="tel"
                id="ins-phone"
                name="phone"
                required
                disabled={loading}
                value={form.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
                className={inputStyles}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="ins-email"
              className="block text-caption font-display tracking-wider uppercase text-brand-silver-dark mb-1.5"
            >
              Email <span className="text-brand-gold">*</span>
            </label>
            <input
              type="email"
              id="ins-email"
              name="email"
              required
              disabled={loading}
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={inputStyles}
            />
          </div>
        </fieldset>

        {/* Address */}
        <fieldset className="space-y-4">
          <legend className="text-caption font-display tracking-widest uppercase text-brand-gold mb-3">
            Address
          </legend>

          <div>
            <label
              htmlFor="ins-addressLine1"
              className="block text-caption font-display tracking-wider uppercase text-brand-silver-dark mb-1.5"
            >
              Street Address <span className="text-brand-gold">*</span>
            </label>
            <input
              type="text"
              id="ins-addressLine1"
              name="addressLine1"
              required
              disabled={loading}
              value={form.addressLine1}
              onChange={handleChange}
              placeholder="123 Main St"
              className={inputStyles}
            />
          </div>

          <div>
            <label
              htmlFor="ins-addressLine2"
              className="block text-caption font-display tracking-wider uppercase text-brand-silver-dark mb-1.5"
            >
              Apt / Suite / Unit
            </label>
            <input
              type="text"
              id="ins-addressLine2"
              name="addressLine2"
              disabled={loading}
              value={form.addressLine2}
              onChange={handleChange}
              placeholder="Apt 4B"
              className={inputStyles}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="col-span-2 sm:col-span-2">
              <label
                htmlFor="ins-city"
                className="block text-caption font-display tracking-wider uppercase text-brand-silver-dark mb-1.5"
              >
                City <span className="text-brand-gold">*</span>
              </label>
              <input
                type="text"
                id="ins-city"
                name="city"
                required
                disabled={loading}
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className={inputStyles}
              />
            </div>
            <div>
              <label
                htmlFor="ins-state"
                className="block text-caption font-display tracking-wider uppercase text-brand-silver-dark mb-1.5"
              >
                State <span className="text-brand-gold">*</span>
              </label>
              <select
                id="ins-state"
                name="state"
                required
                disabled={loading}
                value={form.state}
                onChange={handleChange}
                className={`${inputStyles} appearance-none`}
              >
                <option value="" disabled>
                  State
                </option>
                {US_STATES.map((s) => (
                  <option key={s} value={s} className="bg-brand-black">
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="ins-zip"
                className="block text-caption font-display tracking-wider uppercase text-brand-silver-dark mb-1.5"
              >
                ZIP <span className="text-brand-gold">*</span>
              </label>
              <input
                type="text"
                id="ins-zip"
                name="zip"
                required
                disabled={loading}
                value={form.zip}
                onChange={handleChange}
                placeholder="33435"
                inputMode="numeric"
                className={inputStyles}
              />
            </div>
          </div>
        </fieldset>

        {/* Insurance Information */}
        <fieldset className="space-y-4">
          <legend className="text-caption font-display tracking-widest uppercase text-brand-gold mb-3">
            Insurance Information
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="ins-insuranceCompany"
                className="block text-caption font-display tracking-wider uppercase text-brand-silver-dark mb-1.5"
              >
                Insurance Company <span className="text-brand-gold">*</span>
              </label>
              <input
                type="text"
                id="ins-insuranceCompany"
                name="insuranceCompany"
                required
                disabled={loading}
                value={form.insuranceCompany}
                onChange={handleChange}
                placeholder="e.g. Blue Cross Blue Shield"
                className={inputStyles}
              />
            </div>
            <div>
              <label
                htmlFor="ins-policyNumber"
                className="block text-caption font-display tracking-wider uppercase text-brand-silver-dark mb-1.5"
              >
                Policy Number <span className="text-brand-gold">*</span>
              </label>
              <input
                type="text"
                id="ins-policyNumber"
                name="policyNumber"
                required
                disabled={loading}
                value={form.policyNumber}
                onChange={handleChange}
                placeholder="Policy or member ID"
                className={inputStyles}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InsuranceCardUpload
              label="Front of Insurance Card"
              id="ins-cardFront"
              file={cardFront}
              onChange={setCardFront}
              disabled={loading}
            />
            <InsuranceCardUpload
              label="Back of Insurance Card"
              id="ins-cardBack"
              file={cardBack}
              onChange={setCardBack}
              disabled={loading}
            />
          </div>
        </fieldset>

        {/* HIPAA Consent */}
        <div className="border border-brand-border p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="hipaaConsent"
              checked={form.hipaaConsent}
              onChange={handleChange}
              disabled={loading}
              required
              className="mt-1 shrink-0 accent-brand-gold w-4 h-4"
            />
            <span className="text-body-sm text-brand-silver leading-relaxed">
              {INSURANCE_CONSENT_LABEL}{" "}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gold hover:underline"
              >
                View Privacy Practices
              </a>
            </span>
          </label>
        </div>

        <p className="text-caption text-brand-silver-dim leading-relaxed">
          {INSURANCE_DISCLAIMER}
        </p>

        <Button
          type="submit"
          variant="cta"
          size="lg"
          icon={loading ? Loader2 : Send}
          iconPosition="right"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Verify My Coverage"}
        </Button>
      </form>
    </div>
  );
}
