import { NextResponse } from "next/server";
import { supabase, logAuditEvent } from "@/lib/supabase-server";
import { sendInsuranceVerificationNotification } from "@/lib/email";
import { insuranceVerificationSchema } from "@/lib/validations";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/rate-limit";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png"]);
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

async function uploadCardImage(
  file: File,
  side: "front" | "back",
): Promise<{ path: string } | { error: string }> {
  if (!ALLOWED_TYPES.has(file.type)) {
    return { error: `Insurance card (${side}) must be a JPEG or PNG image.` };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { error: `Insurance card (${side}) must be under 10 MB.` };
  }

  const ext = file.type === "image/png" ? "png" : "jpg";
  const storagePath = `${crypto.randomUUID()}-${side}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from("insurance-cards")
    .upload(storagePath, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    console.error(`Storage upload error (${side}):`, error);
    return { error: `Failed to upload insurance card (${side}). Please try again.` };
  }

  return { path: `insurance-cards/${storagePath}` };
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const rl = checkRateLimit(`insurance:${ip}`, {
      limit: 10,
      windowMs: 15 * 60 * 1000,
    });

    if (!rl.allowed) {
      return NextResponse.json(
        {
          error:
            "Hold tight! You've submitted several requests recently. Please wait a few minutes before trying again — your information is important to us.",
        },
        { status: 429, headers: getRateLimitHeaders(rl) },
      );
    }

    const formData = await request.formData();

    const fields: Record<string, string> = {};
    for (const key of [
      "firstName", "lastName", "dateOfBirth",
      "addressLine1", "addressLine2", "city", "state", "zip",
      "phone", "sex", "email",
      "insuranceCompany", "policyNumber",
    ]) {
      const val = formData.get(key);
      if (typeof val === "string") fields[key] = val;
    }

    const consentVal = formData.get("hipaaConsent");
    const hipaaConsent = consentVal === "true" || consentVal === "on";

    const parsed = insuranceVerificationSchema.safeParse({
      ...fields,
      hipaaConsent,
    });

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]?.message ?? "Invalid input";
      return NextResponse.json(
        {
          error: `Almost there — ${firstIssue}. Double-check your form and give it another go!`,
        },
        { status: 400, headers: getRateLimitHeaders(rl) },
      );
    }

    const cardFront = formData.get("cardFront");
    const cardBack = formData.get("cardBack");

    if (!(cardFront instanceof File) || !(cardBack instanceof File)) {
      return NextResponse.json(
        {
          error:
            "We need both sides of your insurance card to verify coverage. Please upload the front and back images.",
        },
        { status: 400, headers: getRateLimitHeaders(rl) },
      );
    }

    const [frontResult, backResult] = await Promise.all([
      uploadCardImage(cardFront, "front"),
      uploadCardImage(cardBack, "back"),
    ]);

    if ("error" in frontResult) {
      return NextResponse.json(
        { error: frontResult.error },
        { status: 400, headers: getRateLimitHeaders(rl) },
      );
    }
    if ("error" in backResult) {
      return NextResponse.json(
        { error: backResult.error },
        { status: 400, headers: getRateLimitHeaders(rl) },
      );
    }

    const {
      firstName, lastName, dateOfBirth,
      addressLine1, addressLine2, city, state, zip,
      phone, sex, email, insuranceCompany, policyNumber,
    } = parsed.data;

    const { data: insertData, error: dbError } = await supabase
      .from("insurance_verification_requests")
      .insert({
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dateOfBirth,
        address_line1: addressLine1,
        address_line2: addressLine2 || null,
        city,
        state,
        zip,
        phone,
        sex,
        email,
        insurance_company: insuranceCompany,
        policy_number: policyNumber,
        card_front_path: frontResult.path,
        card_back_path: backResult.path,
        email_sent: false,
      })
      .select("id")
      .single();

    if (dbError || !insertData) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        {
          error:
            "Our system hit a small snag saving your information. Don't worry — please try again in a moment and we'll get it sorted!",
        },
        { status: 500 },
      );
    }

    const referenceId = insertData.id as string;

    const emailSent = await sendInsuranceVerificationNotification({
      referenceId,
    });

    if (emailSent) {
      await supabase
        .from("insurance_verification_requests")
        .update({ email_sent: true })
        .eq("id", referenceId);
    }

    logAuditEvent({
      event_type: "insurance_verification_submission",
      table_name: "insurance_verification_requests",
      record_id: referenceId,
      ip_address: ip,
      details: { email_sent: emailSent },
    });

    return NextResponse.json(
      { success: true, referenceId },
      { headers: getRateLimitHeaders(rl) },
    );
  } catch {
    console.error("Insurance verification API error");
    return NextResponse.json(
      {
        error:
          "Something unexpected happened on our end. Your data is safe — please try again in a moment!",
      },
      { status: 500 },
    );
  }
}
