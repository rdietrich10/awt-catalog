import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-server";
import {
  sendContactNotification,
  sendInquiryNotification,
  sendInsuranceVerificationNotification,
} from "@/lib/email";

const ADMIN_SECRET = process.env.ADMIN_SECRET;

export async function POST(request: Request) {
  // Simple secret-key auth
  const authHeader = request.headers.get("authorization");
  if (!ADMIN_SECRET || authHeader !== `Bearer ${ADMIN_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = {
    contacts: { found: 0, sent: 0, failed: 0 },
    inquiries: { found: 0, sent: 0, failed: 0 },
    insurance: { found: 0, sent: 0, failed: 0 },
  };

  // ── Contact submissions ─────────────────────────────────────────────────────
  const { data: contacts, error: contactsErr } = await supabase
    .from("contact_submissions")
    .select("*")
    .eq("email_sent", false)
    .order("created_at", { ascending: true });

  if (contactsErr) {
    console.error("[resend] failed to fetch contacts:", contactsErr);
  } else {
    results.contacts.found = contacts?.length ?? 0;
    for (const row of contacts ?? []) {
      const sent = await sendContactNotification({
        name: row.name,
        email: row.email,
        phone: row.phone ?? undefined,
        subject: row.subject,
        sex: row.sex ?? undefined,
        dateOfBirth: row.date_of_birth ?? undefined,
        address1: row.address1 ?? undefined,
        address2: row.address2 ?? undefined,
        city: row.city ?? undefined,
        state: row.state ?? undefined,
        zip: row.zip ?? undefined,
        message: row.message,
        referralCode: row.referral_code ?? undefined,
      });

      if (sent) {
        results.contacts.sent++;
        await supabase
          .from("contact_submissions")
          .update({ email_sent: true })
          .eq("id", row.id);
      } else {
        results.contacts.failed++;
      }
    }
  }

  // ── Inquiry submissions ─────────────────────────────────────────────────────
  const { data: inquiries, error: inquiriesErr } = await supabase
    .from("inquiry_submissions")
    .select("*")
    .eq("email_sent", false)
    .order("created_at", { ascending: true });

  if (inquiriesErr) {
    console.error("[resend] failed to fetch inquiries:", inquiriesErr);
  } else {
    results.inquiries.found = inquiries?.length ?? 0;
    for (const row of inquiries ?? []) {
      const sent = await sendInquiryNotification({
        firstName: row.first_name,
        lastName: row.last_name,
        sex: row.sex,
        dateOfBirth: row.date_of_birth,
        address1: row.address1,
        address2: row.address2 ?? undefined,
        city: row.city,
        state: row.state,
        zip: row.zip,
        phone: row.phone,
        email: row.email,
        referralCode: row.referral_code ?? undefined,
        products: row.products ?? [],
      });

      if (sent) {
        results.inquiries.sent++;
        await supabase
          .from("inquiry_submissions")
          .update({ email_sent: true })
          .eq("id", row.id);
      } else {
        results.inquiries.failed++;
      }
    }
  }

  // ── Insurance verification requests ────────────────────────────────────────
  const { data: insurance, error: insuranceErr } = await supabase
    .from("insurance_verification_requests")
    .select("id")
    .eq("email_sent", false)
    .order("created_at", { ascending: true });

  if (insuranceErr) {
    console.error("[resend] failed to fetch insurance requests:", insuranceErr);
  } else {
    results.insurance.found = insurance?.length ?? 0;
    for (const row of insurance ?? []) {
      const sent = await sendInsuranceVerificationNotification({
        referenceId: row.id,
      });

      if (sent) {
        results.insurance.sent++;
        await supabase
          .from("insurance_verification_requests")
          .update({ email_sent: true })
          .eq("id", row.id);
      } else {
        results.insurance.failed++;
      }
    }
  }

  console.log("[resend] results:", JSON.stringify(results));
  return NextResponse.json({ success: true, results });
}
