"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Send, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  HIPAA_BANNER_TEXT,
  HIPAA_BANNER_LINK_TEXT,
  HIPAA_CONSENT_LABEL,
} from "@/data/hipaa";
import { SEX_OPTIONS, US_STATES } from "@/data/insurance";

export interface EmailCaptureData {
  firstName: string;
  lastName: string;
  sex: string;
  dateOfBirth: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  referralCode?: string;
}

interface EmailCaptureFormProps {
  onSubmit: (data: EmailCaptureData) => void;
  onCancel?: () => void;
  submitLabel?: string;
  loading?: boolean;
  error?: string | null;
}

const inputBase =
  "w-full bg-transparent border border-brand-border px-4 py-2 text-body-sm text-brand-white placeholder:text-brand-silver-dark focus:outline-none focus:border-brand-silver-dark transition-colors";

const selectBase =
  "w-full bg-transparent border border-brand-border px-4 py-2 text-body-sm text-brand-white focus:outline-none focus:border-brand-silver-dark transition-colors appearance-none";

const labelBase =
  "block text-label font-display tracking-wider uppercase text-brand-silver mb-1";

export function EmailCaptureForm({
  onSubmit,
  onCancel,
  submitLabel = "Submit Inquiry",
  loading = false,
  error = null,
}: EmailCaptureFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sex, setSex] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [hipaaConsent, setHipaaConsent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ firstName, lastName, sex, dateOfBirth, address1, address2, city, state, zip, phone, email, referralCode });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-start gap-3 border border-red-500/30 bg-red-500/5 p-3">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <p className="text-body-sm text-red-300">{error}</p>
        </div>
      )}

      {/* Personal Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="capture-first-name" className={labelBase}>
            First Name
          </label>
          <input
            id="capture-first-name"
            type="text"
            required
            disabled={loading}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            className={inputBase}
          />
        </div>
        <div>
          <label htmlFor="capture-last-name" className={labelBase}>
            Last Name
          </label>
          <input
            id="capture-last-name"
            type="text"
            required
            disabled={loading}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            className={inputBase}
          />
        </div>
      </div>

      <div>
        <label htmlFor="capture-sex" className={labelBase}>
          Sex
        </label>
        <select
          id="capture-sex"
          required
          disabled={loading}
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          className={selectBase}
        >
          <option value="" disabled className="bg-brand-black">
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
        <label htmlFor="capture-dob" className={labelBase}>
          Date of Birth
        </label>
        <input
          id="capture-dob"
          type="date"
          required
          disabled={loading}
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          className={inputBase}
        />
      </div>

      {/* Address */}
      <div>
        <label htmlFor="capture-address1" className={labelBase}>
          Address
        </label>
        <input
          id="capture-address1"
          type="text"
          required
          disabled={loading}
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
          placeholder="Street address"
          className={inputBase}
        />
      </div>
      <div>
        <label htmlFor="capture-address2" className={labelBase}>
          Address 2 <span className="text-brand-silver-dark">(optional)</span>
        </label>
        <input
          id="capture-address2"
          type="text"
          disabled={loading}
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
          placeholder="Apt, suite, unit, etc."
          className={inputBase}
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2">
          <label htmlFor="capture-city" className={labelBase}>
            City
          </label>
          <input
            id="capture-city"
            type="text"
            required
            disabled={loading}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className={inputBase}
          />
        </div>
        <div>
          <label htmlFor="capture-state" className={labelBase}>
            State
          </label>
          <select
            id="capture-state"
            required
            disabled={loading}
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={selectBase}
          >
            <option value="" disabled className="bg-brand-black">
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
          <label htmlFor="capture-zip" className={labelBase}>
            Zip
          </label>
          <input
            id="capture-zip"
            type="text"
            required
            disabled={loading}
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="12345"
            className={inputBase}
          />
        </div>
      </div>

      {/* Contact */}
      <div>
        <label htmlFor="capture-phone" className={labelBase}>
          Phone
        </label>
        <input
          id="capture-phone"
          type="tel"
          required
          disabled={loading}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(555) 123-4567"
          className={inputBase}
        />
      </div>
      <div>
        <label htmlFor="capture-email" className={labelBase}>
          Email
        </label>
        <input
          id="capture-email"
          type="email"
          required
          disabled={loading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={inputBase}
        />
      </div>

      <div>
        <label htmlFor="capture-referral-code" className={labelBase}>
          Referral Code <span className="text-brand-silver-dark">(optional)</span>
        </label>
        <input
          id="capture-referral-code"
          type="text"
          disabled={loading}
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
          placeholder="e.g. FRIEND2024"
          className={inputBase}
        />
      </div>

      {/* HIPAA Consent */}
      <div className="pt-4 border-t border-brand-border space-y-3">
        <p className="text-caption text-brand-silver-dark leading-relaxed">
          {HIPAA_BANNER_TEXT}{" "}
          <Link
            href="/privacy"
            target="_blank"
            className="underline text-brand-silver hover:text-brand-white transition-colors"
          >
            {HIPAA_BANNER_LINK_TEXT}
          </Link>
        </p>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={hipaaConsent}
            onChange={(e) => setHipaaConsent(e.target.checked)}
            disabled={loading}
            className="mt-0.5 shrink-0 accent-brand-gold w-4 h-4"
            required
          />
          <span className="text-caption text-brand-silver-dark leading-relaxed group-hover:text-brand-silver transition-colors">
            {HIPAA_CONSENT_LABEL}
          </span>
        </label>
      </div>

      <div className="pt-4 space-y-4">
        <Button
          type="submit"
          variant="cta"
          size="lg"
          icon={loading ? Loader2 : Send}
          iconPosition="right"
          className="w-full"
          disabled={loading || !hipaaConsent}
        >
          {loading ? "Submitting..." : submitLabel}
        </Button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="block w-full text-center text-caption text-brand-silver-dark hover:text-brand-silver transition-colors py-2 disabled:opacity-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
