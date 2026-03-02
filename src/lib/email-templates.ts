import { escapeHtml } from "./sanitize";

interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  timestamp: string;
}

interface ProductVariant {
  strength: string;
  vialSize: string;
  concentration: string;
  schedule: string;
  price?: number;
  membershipPrice?: number;
  sku?: string;
}

interface InquiryProduct {
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
  variants?: ProductVariant[];
  keyBenefits?: string[];
}

interface InquiryEmailData {
  firstName: string;
  lastName: string;
  sex: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  products: InquiryProduct[];
  timestamp: string;
}

const BRAND = {
  black: "#0A0A0A",
  darkGray: "#141414",
  border: "#262626",
  gold: "#C9A84C",
  white: "#F5F5F5",
  silver: "#A3A3A3",
  silverDim: "#737373",
} as const;

function baseLayout(title: string, content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.black};font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.black};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="padding:24px 32px;border-bottom:2px solid ${BRAND.gold};">
              <h1 style="margin:0;font-size:20px;letter-spacing:3px;text-transform:uppercase;color:${BRAND.gold};font-family:Georgia,'Times New Roman',serif;">
                AW Therapeutics
              </h1>
              <p style="margin:4px 0 0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.silverDim};">
                Americare Wellness, LLC
              </p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;background-color:${BRAND.darkGray};border:1px solid ${BRAND.border};border-top:none;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px;text-align:center;">
              <p style="margin:0;font-size:11px;color:${BRAND.silverDim};line-height:1.6;">
                AW Therapeutics &mdash; Americare Wellness, LLC<br/>
                2828 S Seacrest Blvd #213, Boynton Beach, FL 33435<br/>
                (561) 536-3166 &middot; info@awclinics.com
              </p>
              <p style="margin:12px 0 0;font-size:10px;color:${BRAND.silverDim};">
                This is an internal notification. Do not forward.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function fieldRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:8px 12px;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${BRAND.silverDim};white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:8px 12px;font-size:14px;color:${BRAND.white};line-height:1.5;">${value}</td>
    </tr>`;
}

export function contactEmailHtml(data: ContactEmailData): string {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const phone = escapeHtml(data.phone || "Not provided");
  const subject = escapeHtml(data.subject);
  const message = escapeHtml(data.message);
  const timestamp = escapeHtml(data.timestamp);

  const content = `
    <h2 style="margin:0 0 8px;font-size:16px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.white};font-family:Georgia,'Times New Roman',serif;">
      New Contact Submission
    </h2>
    <p style="margin:0 0 24px;font-size:13px;color:${BRAND.silver};">
      Someone reached out through the contact form.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BRAND.border};border-radius:4px;">
      ${fieldRow("Name", name)}
      <tr><td colspan="2" style="border-bottom:1px solid ${BRAND.border};"></td></tr>
      ${fieldRow("Email", `<a href="mailto:${email}" style="color:${BRAND.gold};text-decoration:none;">${email}</a>`)}
      <tr><td colspan="2" style="border-bottom:1px solid ${BRAND.border};"></td></tr>
      ${fieldRow("Phone", phone)}
      <tr><td colspan="2" style="border-bottom:1px solid ${BRAND.border};"></td></tr>
      ${fieldRow("Subject", subject)}
      <tr><td colspan="2" style="border-bottom:1px solid ${BRAND.border};"></td></tr>
      ${fieldRow("Message", message)}
      <tr><td colspan="2" style="border-bottom:1px solid ${BRAND.border};"></td></tr>
      ${fieldRow("Received", timestamp)}
    </table>`;

  return baseLayout(`New Contact: ${subject}`, content);
}

function formatPrice(price?: number): string {
  if (price == null) return "—";
  return `$${price.toFixed(2)}`;
}

function productCard(p: InquiryProduct, idx: number): string {
  const name = escapeHtml(p.name);
  const category = escapeHtml(p.category);

  const metaRows: string[] = [];

  if (p.sku) {
    metaRows.push(fieldRow("SKU", escapeHtml(p.sku)));
  }
  if (p.genericName) {
    metaRows.push(fieldRow("Generic", escapeHtml(p.genericName)));
  }
  if (p.medicationClass) {
    metaRows.push(fieldRow("Class", escapeHtml(p.medicationClass)));
  }
  if (p.administrationRoute) {
    metaRows.push(fieldRow("Route", escapeHtml(p.administrationRoute)));
  }
  if (p.isBlend && p.blendComponents?.length) {
    metaRows.push(
      fieldRow("Blend", p.blendComponents.map((c) => escapeHtml(c)).join(", "))
    );
  }

  const hasPricing = p.price != null || p.membershipPrice != null;

  const variantRows =
    p.variants && p.variants.length > 0
      ? p.variants
          .map(
            (v) => `
      <tr>
        <td style="padding:6px 8px;font-size:12px;color:${BRAND.white};border-bottom:1px solid ${BRAND.border};">${escapeHtml(v.strength)}</td>
        <td style="padding:6px 8px;font-size:12px;color:${BRAND.silver};border-bottom:1px solid ${BRAND.border};">${escapeHtml(v.vialSize)}</td>
        <td style="padding:6px 8px;font-size:12px;color:${BRAND.silver};border-bottom:1px solid ${BRAND.border};">${escapeHtml(v.concentration)}</td>
        <td style="padding:6px 8px;font-size:12px;color:${BRAND.silver};border-bottom:1px solid ${BRAND.border};">${escapeHtml(v.schedule)}</td>
        <td style="padding:6px 8px;font-size:12px;color:${BRAND.white};border-bottom:1px solid ${BRAND.border};text-align:right;">${formatPrice(v.price)}</td>
      </tr>`
          )
          .join("")
      : "";

  const benefitsList =
    p.keyBenefits && p.keyBenefits.length > 0
      ? `<td style="padding:8px 12px;" colspan="2">
          <p style="margin:0 0 4px;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:${BRAND.silverDim};">Key Benefits</p>
          <ul style="margin:0;padding-left:16px;">
            ${p.keyBenefits.map((b) => `<li style="font-size:12px;color:${BRAND.silver};line-height:1.6;">${escapeHtml(b)}</li>`).join("")}
          </ul>
        </td>`
      : "";

  return `
    <!-- Product ${idx + 1} -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BRAND.border};border-radius:4px;margin-bottom:16px;">
      <!-- Header -->
      <tr>
        <td colspan="2" style="padding:12px;background-color:${BRAND.black};border-bottom:2px solid ${BRAND.gold};">
          <h4 style="margin:0;font-size:15px;color:${BRAND.white};font-family:Georgia,'Times New Roman',serif;">${name}</h4>
          <p style="margin:2px 0 0;font-size:11px;color:${BRAND.silverDim};">${category}${hasPricing ? ` &middot; <span style="color:${BRAND.gold};">${formatPrice(p.price)}</span>` : ""}${p.membershipPrice != null ? ` <span style="color:${BRAND.silverDim};">(Member: ${formatPrice(p.membershipPrice)})</span>` : ""}</p>
        </td>
      </tr>
      <!-- Meta -->
      ${metaRows.length > 0 ? metaRows.join(`<tr><td colspan="2" style="border-bottom:1px solid ${BRAND.border};"></td></tr>`) : ""}
      <!-- Variants -->
      ${
        variantRows
          ? `<tr>
              <td colspan="2" style="padding:8px 12px 4px;">
                <p style="margin:0;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:${BRAND.gold};">Variants</p>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="padding:0 8px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <th style="padding:6px 8px;font-size:9px;letter-spacing:1px;text-transform:uppercase;color:${BRAND.silverDim};text-align:left;border-bottom:1px solid ${BRAND.gold};">Strength</th>
                    <th style="padding:6px 8px;font-size:9px;letter-spacing:1px;text-transform:uppercase;color:${BRAND.silverDim};text-align:left;border-bottom:1px solid ${BRAND.gold};">Vial</th>
                    <th style="padding:6px 8px;font-size:9px;letter-spacing:1px;text-transform:uppercase;color:${BRAND.silverDim};text-align:left;border-bottom:1px solid ${BRAND.gold};">Conc.</th>
                    <th style="padding:6px 8px;font-size:9px;letter-spacing:1px;text-transform:uppercase;color:${BRAND.silverDim};text-align:left;border-bottom:1px solid ${BRAND.gold};">Schedule</th>
                    <th style="padding:6px 8px;font-size:9px;letter-spacing:1px;text-transform:uppercase;color:${BRAND.silverDim};text-align:right;border-bottom:1px solid ${BRAND.gold};">Price</th>
                  </tr>
                  ${variantRows}
                </table>
              </td>
            </tr>`
          : ""
      }
      <!-- Benefits -->
      ${benefitsList ? `<tr>${benefitsList}</tr>` : ""}
    </table>`;
}

interface InsuranceVerificationEmailData {
  referenceId: string;
  timestamp: string;
}

export function insuranceVerificationEmailHtml(
  data: InsuranceVerificationEmailData,
): string {
  const refId = escapeHtml(data.referenceId);
  const timestamp = escapeHtml(data.timestamp);

  const content = `
    <h2 style="margin:0 0 8px;font-size:16px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.white};font-family:Georgia,'Times New Roman',serif;">
      New Insurance Verification Request
    </h2>
    <p style="margin:0 0 24px;font-size:13px;color:${BRAND.silver};">
      A new insurance verification request has been submitted for blood testing services.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BRAND.border};border-radius:4px;">
      ${fieldRow("Reference ID", `<span style="font-family:monospace;color:${BRAND.gold};">${refId}</span>`)}
      <tr><td colspan="2" style="border-bottom:1px solid ${BRAND.border};"></td></tr>
      ${fieldRow("Received", timestamp)}
    </table>
    <p style="margin:24px 0 0;padding:16px;background-color:${BRAND.black};border:1px solid ${BRAND.border};border-radius:4px;font-size:12px;color:${BRAND.silver};line-height:1.6;">
      <strong style="color:${BRAND.gold};">Action required:</strong> Log in to the
      <a href="https://supabase.com/dashboard" style="color:${BRAND.gold};text-decoration:underline;">secure dashboard</a>
      to review the full submission details and insurance card images. Do not reply to this email with patient information.
    </p>
    <p style="margin:12px 0 0;font-size:11px;color:${BRAND.silverDim};line-height:1.5;">
      This notification intentionally omits Protected Health Information (PHI) in compliance with HIPAA guidelines.
      All patient data is stored securely and must be accessed through the authorized dashboard.
    </p>`;

  return baseLayout("New Insurance Verification Request", content);
}

export function inquiryEmailHtml(data: InquiryEmailData): string {
  const firstName = escapeHtml(data.firstName);
  const lastName = escapeHtml(data.lastName);
  const fullName = `${firstName} ${lastName}`;
  const sex = escapeHtml(data.sex);
  const address1 = escapeHtml(data.address1);
  const address2 = data.address2 ? escapeHtml(data.address2) : "";
  const city = escapeHtml(data.city);
  const state = escapeHtml(data.state);
  const zip = escapeHtml(data.zip);
  const phone = escapeHtml(data.phone);
  const email = escapeHtml(data.email);
  const timestamp = escapeHtml(data.timestamp);

  const addressLine = address2
    ? `${address1}<br/>${address2}<br/>${city}, ${state} ${zip}`
    : `${address1}<br/>${city}, ${state} ${zip}`;

  const divider = `<tr><td colspan="2" style="border-bottom:1px solid ${BRAND.border};"></td></tr>`;

  const productCards = data.products
    .map((p, i) => productCard(p, i))
    .join("");

  const content = `
    <h2 style="margin:0 0 8px;font-size:16px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.white};font-family:Georgia,'Times New Roman',serif;">
      New Product Inquiry
    </h2>
    <p style="margin:0 0 24px;font-size:13px;color:${BRAND.silver};">
      A customer submitted an inquiry for physician review.
    </p>
    <!-- Customer Info -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BRAND.border};border-radius:4px;margin-bottom:24px;">
      ${fieldRow("Name", fullName)}
      ${divider}
      ${fieldRow("Sex", sex)}
      ${divider}
      ${fieldRow("Address", addressLine)}
      ${divider}
      ${fieldRow("Phone", phone)}
      ${divider}
      ${fieldRow("Email", `<a href="mailto:${email}" style="color:${BRAND.gold};text-decoration:none;">${email}</a>`)}
      ${divider}
      ${fieldRow("Received", timestamp)}
    </table>
    <!-- Products -->
    <h3 style="margin:0 0 16px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.gold};">
      Requested Products (${data.products.length})
    </h3>
    ${productCards}
    <p style="margin:8px 0 0;padding:16px;background-color:${BRAND.black};border:1px solid ${BRAND.border};border-radius:4px;font-size:12px;color:${BRAND.silver};line-height:1.6;">
      <strong style="color:${BRAND.gold};">Next step:</strong> Physician review required per AW Therapeutics protocol.
      Review selections and prepare invoice within 24 hours.
    </p>`;

  return baseLayout(
    `New Inquiry: ${data.products.length} Products from ${fullName}`,
    content
  );
}
