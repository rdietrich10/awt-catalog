import sgMail from "@sendgrid/mail";
import {
  contactEmailHtml,
  inquiryEmailHtml,
  insuranceVerificationEmailHtml,
} from "./email-templates";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = "chris@postscarcity.ai";
const TO_EMAIL = "info@awclinics.com";
const BCC_EMAILS = ["cjohndesign@gmail.com"];

if (!SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY is not set. Emails will not be sent.");
}

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

interface InquiryProductPayload {
  name: string;
  category: string;
  slug?: string;
  sku?: string;
  genericName?: string;
  medicationClass?: string;
  administrationRoute?: string;
  isBlend?: boolean;
  blendComponents?: string[];
  price?: number;
  membershipPrice?: number;
  variants?: {
    strength: string;
    vialSize: string;
    concentration: string;
    schedule: string;
    price?: number;
    membershipPrice?: number;
    sku?: string;
  }[];
  keyBenefits?: string[];
}

interface InquiryPayload {
  name: string;
  email: string;
  phone?: string;
  products: InquiryProductPayload[];
}

export async function sendContactNotification(
  data: ContactPayload
): Promise<boolean> {
  if (!SENDGRID_API_KEY) {
    console.error("Cannot send email: SENDGRID_API_KEY not configured");
    return false;
  }

  const timestamp = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/New_York",
  });

  try {
    await sgMail.send({
      to: TO_EMAIL,
      bcc: BCC_EMAILS,
      from: { email: FROM_EMAIL, name: "AW Therapeutics" },
      subject: `New Contact: ${data.subject} — from ${data.name}`,
      html: contactEmailHtml({ ...data, timestamp }),
    });
    return true;
  } catch (err) {
    console.error("SendGrid contact email error:", err);
    return false;
  }
}

export async function sendInquiryNotification(
  data: InquiryPayload
): Promise<boolean> {
  if (!SENDGRID_API_KEY) {
    console.error("Cannot send email: SENDGRID_API_KEY not configured");
    return false;
  }

  const timestamp = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/New_York",
  });

  try {
    await sgMail.send({
      to: TO_EMAIL,
      bcc: BCC_EMAILS,
      from: { email: FROM_EMAIL, name: "AW Therapeutics" },
      subject: `New Inquiry from ${data.name} — ${data.products.length} Product${data.products.length === 1 ? "" : "s"}`,
      html: inquiryEmailHtml({ ...data, timestamp }),
    });
    return true;
  } catch (err) {
    console.error("SendGrid inquiry email error:", err);
    return false;
  }
}

interface InsuranceVerificationPayload {
  referenceId: string;
}

export async function sendInsuranceVerificationNotification(
  data: InsuranceVerificationPayload,
): Promise<boolean> {
  if (!SENDGRID_API_KEY) {
    console.error("Cannot send email: SENDGRID_API_KEY not configured");
    return false;
  }

  const timestamp = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/New_York",
  });

  try {
    await sgMail.send({
      to: TO_EMAIL,
      bcc: BCC_EMAILS,
      from: { email: FROM_EMAIL, name: "AW Therapeutics" },
      subject: `New Insurance Verification Request — Ref ${data.referenceId.slice(0, 8)}`,
      html: insuranceVerificationEmailHtml({
        referenceId: data.referenceId,
        timestamp,
      }),
    });
    return true;
  } catch (err) {
    console.error("SendGrid insurance verification email error:", err);
    return false;
  }
}
