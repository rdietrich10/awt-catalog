import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-server";
import { sendContactNotification } from "@/lib/email";

interface ContactBody {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

function validate(body: unknown): body is ContactBody {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.subject === "string" &&
    b.subject.trim().length > 0 &&
    typeof b.message === "string" &&
    b.message.trim().length > 0 &&
    (b.phone === undefined || b.phone === "" || typeof b.phone === "string")
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!validate(body)) {
      return NextResponse.json(
        {
          error:
            "Hmm, something's off with your form. Make sure name, email, subject, and message are all filled in — we want to hear from you!",
        },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = body;

    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        subject: subject.trim(),
        message: message.trim(),
        email_sent: false,
      });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        {
          error:
            "Our database took a quick nap. Your message is important to us — please try again in a moment!",
        },
        { status: 500 }
      );
    }

    const emailSent = await sendContactNotification({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    if (emailSent) {
      await supabase
        .from("contact_submissions")
        .update({ email_sent: true })
        .eq("email", email.trim().toLowerCase())
        .order("created_at", { ascending: false })
        .limit(1);
    }

    return NextResponse.json({ success: true });
  } catch {
    console.error("Contact API error");
    return NextResponse.json(
      {
        error:
          "Something unexpected happened on our end. Don't worry — it's not you, it's us. Give it another shot!",
      },
      { status: 500 }
    );
  }
}
