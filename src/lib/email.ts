import nodemailer from "nodemailer";
import {
  contactEmailHtml,
  inquiryEmailHtml,
  insuranceVerificationEmailHtml,
} from "./email-templates";

const SMTP_HOST = process.env.SMTP_HOST ?? "mail.awtherapeutics.com";
const SMTP_PORT = parseInt(process.env.SMTP_PORT ?? "465", 10);
const SMTP_SECURE = process.env.SMTP_SECURE !== "false"; // true by default (SSL on port 465)
const SMTP_USER = process.env.SMTP_USER ?? "info@awtherapeutics.com";
const SMTP_PASS = process.env.SMTP_PASS;

const FROM_EMAIL = SMTP_USER;
const FROM_NAME = "AW Therapeutics";
const TO_EMAIL = "info@awclinics.com";
const BCC_EMAILS = ["reannedietrich@gmail.com"];

if (!SMTP_PASS) {
  console.warn("SMTP_PASS is not set. Emails will not be sent.");
}

function createTransporter() {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    // cPanel shared hosting often uses a cert issued to the server hostname
    // rather than the domain, so we disable strict TLS verification.
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
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
  if (!SMTP_PASS) {
    console.error("Cannot send email: SMTP_PASS not configured");
    return false;
  }

  const timestamp = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/New_York",
  });

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      to: TO_EMAIL,
      bcc: BCC_EMAILS,
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      subject: `New Contact: ${data.subject} — from ${data.name}`,
      html: contactEmailHtml({ ...data, timestamp }),
    });
    console.log("[email] contact notification sent successfully");
    return true;
  } catch (err) {
    const e = err as { code?: string; message?: string; command?: string; response?: string };
    console.error("[email] SMTP contact error — code:", e?.code, "message:", e?.message, "command:", e?.command, "response:", e?.response);
    return false;
  }
}

export async function sendInquiryNotification(
  data: InquiryPayload
): Promise<boolean> {
  if (!SMTP_PASS) {
    console.error("Cannot send email: SMTP_PASS not configured");
    return false;
  }

  const timestamp = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/New_York",
  });

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      to: TO_EMAIL,
      bcc: BCC_EMAILS,
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      subject: `New Inquiry from ${data.firstName} ${data.lastName} — ${data.products.length} Product${data.products.length === 1 ? "" : "s"}`,
      html: inquiryEmailHtml({ ...data, timestamp }),
    });
    return true;
  } catch (err) {
    const e = err as { code?: string; message?: string; command?: string; response?: string };
    console.error("[email] SMTP inquiry error — code:", e?.code, "message:", e?.message, "command:", e?.command, "response:", e?.response);
    return false;
  }
}

interface InsuranceVerificationPayload {
  referenceId: string;
}

export async function sendInsuranceVerificationNotification(
  data: InsuranceVerificationPayload
): Promise<boolean> {
  if (!SMTP_PASS) {
    console.error("Cannot send email: SMTP_PASS not configured");
    return false;
  }

  const timestamp = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/New_York",
  });

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      to: TO_EMAIL,
      bcc: BCC_EMAILS,
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      subject: `New Insurance Verification Request — Ref ${data.referenceId.slice(0, 8)}`,
      html: insuranceVerificationEmailHtml({
        referenceId: data.referenceId,
        timestamp,
      }),
    });
    return true;
  } catch (err) {
    const e = err as { code?: string; message?: string; command?: string; response?: string };
    console.error("[email] SMTP insurance error — code:", e?.code, "message:", e?.message, "command:", e?.command, "response:", e?.response);
    return false;
  }
}
