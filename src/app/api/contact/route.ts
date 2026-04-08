import { NextResponse } from "next/server";
import { supabase, logAuditEvent } from "@/lib/supabase-server";
import { sendContactNotification } from "@/lib/email";
import { contactSchema } from "@/lib/validations";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    const rl = checkRateLimit(`contact:${ip}`, { limit: 30, windowMs: 15 * 60 * 1000 });

    if (!rl.allowed) {
      return NextResponse.json(
        {
          error:
            "Whoa there, speedster! You've sent a lot of messages recently. Take a breather and try again in a few minutes.",
        },
        { status: 429, headers: getRateLimitHeaders(rl) }
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]?.message ?? "Invalid input";
      return NextResponse.json(
        {
          error: `Hmm, something's off with your form \u2014 ${firstIssue}. Double-check and give it another go!`,
        },
        { status: 400, headers: getRateLimitHeaders(rl) }
      );
    }

    const { name, email, phone, subject, message } = parsed.data;

    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        name,
        email,
        phone: phone || null,
        subject,
        message,
        email_sent: false,
      });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        {
          error:
            "Our database took a quick nap. Your message is important to us \u2014 please try again in a moment!",
        },
        { status: 500 }
      );
    }

    const emailSent = await sendContactNotification({
      name,
      email,
      phone: phone || undefined,
      subject,
      message,
    });
    console.error("[contact] email_sent:", emailSent);

    if (emailSent) {
      await supabase
        .from("contact_submissions")
        .update({ email_sent: true })
        .eq("email", email)
        .eq("email_sent", false);
    }

    await logAuditEvent({
      event_type: "contact_submission",
      table_name: "contact_submissions",
      ip_address: ip,
      details: { subject, email_sent: emailSent },
    });

    return NextResponse.json(
      { success: true },
      { headers: getRateLimitHeaders(rl) }
    );
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      {
        error:
          "Something unexpected happened on our end. Don't worry \u2014 it's not you, it's us. Give it another shot!",
      },
      { status: 500 }
    );
  }
}
