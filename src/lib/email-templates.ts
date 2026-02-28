interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  timestamp: string;
}

interface InquiryEmailData {
  name: string;
  email: string;
  phone?: string;
  products: { name: string; category: string }[];
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
  <title>${title}</title>
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
  const content = `
    <h2 style="margin:0 0 8px;font-size:16px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.white};font-family:Georgia,'Times New Roman',serif;">
      New Contact Submission
    </h2>
    <p style="margin:0 0 24px;font-size:13px;color:${BRAND.silver};">
      Someone reached out through the contact form.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BRAND.border};border-radius:4px;">
      ${fieldRow("Name", data.name)}
      <tr><td colspan="2" style="border-bottom:1px solid ${BRAND.border};"></td></tr>
      ${fieldRow("Email", `<a href="mailto:${data.email}" style="color:${BRAND.gold};text-decoration:none;">${data.email}</a>`)}
      <tr><td colspan="2" style="border-bottom:1px solid ${BRAND.border};"></td></tr>
      ${fieldRow("Phone", data.phone || "Not provided")}
      <tr><td colspan="2" style="border-bottom:1px solid ${BRAND.border};"></td></tr>
      ${fieldRow("Subject", data.subject)}
      <tr><td colspan="2" style="border-bottom:1px solid ${BRAND.border};"></td></tr>
      ${fieldRow("Message", data.message)}
      <tr><td colspan="2" style="border-bottom:1px solid ${BRAND.border};"></td></tr>
      ${fieldRow("Received", data.timestamp)}
    </table>`;

  return baseLayout(`New Contact: ${data.subject}`, content);
}

export function inquiryEmailHtml(data: InquiryEmailData): string {
  const productRows = data.products
    .map(
      (p) => `
    <tr>
      <td style="padding:10px 12px;font-size:14px;color:${BRAND.white};border-bottom:1px solid ${BRAND.border};">${p.name}</td>
      <td style="padding:10px 12px;font-size:12px;color:${BRAND.silver};border-bottom:1px solid ${BRAND.border};">${p.category}</td>
    </tr>`
    )
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
      ${fieldRow("Name", data.name)}
      <tr><td colspan="2" style="border-bottom:1px solid ${BRAND.border};"></td></tr>
      ${fieldRow("Email", `<a href="mailto:${data.email}" style="color:${BRAND.gold};text-decoration:none;">${data.email}</a>`)}
      <tr><td colspan="2" style="border-bottom:1px solid ${BRAND.border};"></td></tr>
      ${fieldRow("Phone", data.phone || "Not provided")}
      <tr><td colspan="2" style="border-bottom:1px solid ${BRAND.border};"></td></tr>
      ${fieldRow("Received", data.timestamp)}
    </table>
    <!-- Products -->
    <h3 style="margin:0 0 12px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.gold};">
      Requested Products (${data.products.length})
    </h3>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BRAND.border};border-radius:4px;">
      <tr>
        <th style="padding:10px 12px;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:${BRAND.silverDim};text-align:left;border-bottom:2px solid ${BRAND.gold};">Product</th>
        <th style="padding:10px 12px;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:${BRAND.silverDim};text-align:left;border-bottom:2px solid ${BRAND.gold};">Category</th>
      </tr>
      ${productRows}
    </table>
    <p style="margin:24px 0 0;padding:16px;background-color:${BRAND.black};border:1px solid ${BRAND.border};border-radius:4px;font-size:12px;color:${BRAND.silver};line-height:1.6;">
      <strong style="color:${BRAND.gold};">Next step:</strong> Physician review required per AW Therapeutics protocol.
      Review selections and prepare invoice within 24 hours.
    </p>`;

  return baseLayout(
    `New Inquiry: ${data.products.length} Products from ${data.name}`,
    content
  );
}
