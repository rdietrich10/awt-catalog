import { NextResponse } from "next/server";
import { supabase, logAuditEvent } from "@/lib/supabase-server";
import { sendInquiryNotification } from "@/lib/email";
import { inquirySchema } from "@/lib/validations";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    const rl = checkRateLimit(`inquiry:${ip}`, { limit: 20, windowMs: 15 * 60 * 1000 });

    if (!rl.allowed) {
      return NextResponse.json(
        {
          error:
            "Easy, tiger! You've submitted quite a few inquiries recently. Give it a few minutes and try again.",
        },
        { status: 429, headers: getRateLimitHeaders(rl) }
      );
    }

    const body = await request.json();
    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]?.message ?? "Invalid input";
      return NextResponse.json(
        {
          error: `We need a bit more info — ${firstIssue}. Mind double-checking your form?`,
        },
        { status: 400, headers: getRateLimitHeaders(rl) }
      );
    }

    const {
      firstName, lastName, sex, dateOfBirth,
      address1, address2, city, state, zip,
      phone, email, products, referralCode,
    } = parsed.data;

    const { error: dbError } = await supabase
      .from("inquiry_submissions")
      .insert({
        first_name: firstName,
        last_name: lastName,
        sex,
        date_of_birth: dateOfBirth,
        address1,
        address2: address2 || null,
        city,
        state,
        zip,
        phone,
        email,
        products,
        referral_code: referralCode || null,
        email_sent: false,
      });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        {
          error:
            "Our database is taking a breather. Your inquiry matters — please try again in a moment!",
        },
        { status: 500 }
      );
    }

    const emailSent = await sendInquiryNotification({
      firstName,
      lastName,
      sex,
      dateOfBirth,
      address1,
      address2: address2 || undefined,
      city,
      state,
      zip,
      phone,
      email,
      referralCode: referralCode || undefined,
      products: products.map((p) => ({
        name: p.name,
        slug: p.slug,
        category: p.category || "Uncategorized",
        sku: p.sku,
        genericName: p.genericName || "",
        medicationClass: p.medicationClass || "",
        administrationRoute: p.administrationRoute || "",
        isBlend: p.isBlend || false,
        blendComponents: p.blendComponents,
        price: p.price,
        membershipPrice: p.membershipPrice,
        variants: (p.variants || []).map((v) => ({
          ...v,
          sku: v.sku,
        })),
        keyBenefits: p.keyBenefits || [],
      })),
    });

    if (emailSent) {
      await supabase
        .from("inquiry_submissions")
        .update({ email_sent: true })
        .eq("email", email)
        .order("created_at", { ascending: false })
        .limit(1);
    }

    logAuditEvent({
      event_type: "inquiry_submission",
      table_name: "inquiry_submissions",
      ip_address: ip,
      details: { product_count: products.length, email_sent: emailSent },
    });

    return NextResponse.json(
      { success: true },
      { headers: getRateLimitHeaders(rl) }
    );
  } catch {
    console.error("Inquiry API error");
    return NextResponse.json(
      {
        error:
          "Something went sideways on our end. No worries — your products aren't going anywhere. Try again!",
      },
      { status: 500 }
    );
  }
}
