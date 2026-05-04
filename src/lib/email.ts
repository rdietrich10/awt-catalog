import sgMail from "@sendgrid/mail";
import {
  contactEmailHtml,
  inquiryEmailHtml,
  insuranceVerificationEmailHtml,
} from "./email-templates";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = "noreply@awtherapeutics.com";
const TO_EMAIL = "info@awclinics.com";
const BCC_EMAILS = ["reannedietrich@gmail.com"];

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
      from: { email: FROM_EMAIL, name: "AW Therapeutics" },
      subject: `New Contact: ${data.subject} \u2014 from ${data.name}`,
      html: contactEmailHtml({ ...data, timestamp }),
    });
    console.error("[email] contact notification sent successfully");
    return true;
  } catch (err: unknown) {
    const sgErr = err as { code?: number; response?: { body?: unknown } };
    console.error("[email] SendGrid contact error \u2014 code:", sgErr?.code, "body:", JSON.stringify(sgErr?.response?.body));
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
      subject: `New Inquiry from ${data.firstName} ${data.lastName} \u2014 ${data.products.length} Product${data.products.length === 1 ? "" : "s"}`,
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
      subject: `New Insurance Verification Request \u2014 Ref ${data.referenceId.slice(0, 8)}`,
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
