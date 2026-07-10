import sgMail from "@sendgrid/mail";
import {
  contactEmailHtml,
  inquiryEmailHtml,
  insuranceVerificationEmailHtml,
} from "./email-templates";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
// Must be a verified sender identity / authenticated domain in SendGrid.
const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL ?? "info@awtherapeutics.com";
const FROM_NAME = "AW Therapeutics";
const TO_EMAIL = "info@awclinics.com";
const BCC_EMAILS = ["reannedietrich@gmail.com"];

if (!SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY is not set. Emails will not be sent.");
} else {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

interface SendGridErrorBody {
  errors?: { message?: string; field?: string | null }[];
}

function logSendGridError(context: string, err: unknown) {
  const e = err as {
    code?: number;
    message?: string;
    response?: { body?: SendGridErrorBody };
  };
  console.error(
    `[email] SendGrid ${context} error — code:`,
    e?.code,
    "message:",
    e?.message,
    "response:",
    JSON.stringify(e?.response?.body)
  );
}

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  sex?: string;
  dateOfBirth?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  message: string;
  referralCode?: string;
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
  firstName: string;
  lastName: string;
  sex: string;
  dateOfBirth: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  referralCode?: string;
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
      from: { email: FROM_EMAIL, name: FROM_NAME },
      subject: `New Contact: ${data.subject} — from ${data.name}`,
      html: contactEmailHtml({ ...data, timestamp }),
    });
    console.log("[email] contact notification sent successfully");
    return true;
  } catch (err) {
    logSendGridError("contact", err);
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
      from: { email: FROM_EMAIL, name: FROM_NAME },
      subject: `New Inquiry from ${data.firstName} ${data.lastName} — ${data.products.length} Product${data.products.length === 1 ? "" : "s"}`,
      html: inquiryEmailHtml({ ...data, timestamp }),
    });
    return true;
  } catch (err) {
    logSendGridError("inquiry", err);
    return false;
  }
}

interface InsuranceVerificationPayload {
  referenceId: string;
}

export async function sendInsuranceVerificationNotification(
  data: InsuranceVerificationPayload
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
      from: { email: FROM_EMAIL, name: FROM_NAME },
      subject: `New Insurance Verification Request — Ref ${data.referenceId.slice(0, 8)}`,
      html: insuranceVerificationEmailHtml({
        referenceId: data.referenceId,
        timestamp,
      }),
    });
    return true;
  } catch (err) {
    logSendGridError("insurance", err);
    return false;
  }
}
