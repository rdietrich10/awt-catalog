import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-server";
import { sendInquiryNotification } from "@/lib/email";

interface ProductItem {
  name: string;
  slug: string;
  category: string;
}

interface InquiryBody {
  name: string;
  email: string;
  phone?: string;
  products: ProductItem[];
}

function validate(body: unknown): body is InquiryBody {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    Array.isArray(b.products) &&
    b.products.length > 0 &&
    b.products.every(
      (p: unknown) =>
        typeof p === "object" &&
        p !== null &&
        typeof (p as Record<string, unknown>).name === "string" &&
        typeof (p as Record<string, unknown>).slug === "string"
    ) &&
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
            "We need at least your name, email, and one product to get the ball rolling. Mind double-checking your form?",
        },
        { status: 400 }
      );
    }

    const { name, email, phone, products } = body;

    const { error: dbError } = await supabase
      .from("inquiry_submissions")
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        products,
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
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      products: products.map((p) => ({
        name: p.name,
        category: p.category || "Uncategorized",
      })),
    });

    if (emailSent) {
      await supabase
        .from("inquiry_submissions")
        .update({ email_sent: true })
        .eq("email", email.trim().toLowerCase())
        .order("created_at", { ascending: false })
        .limit(1);
    }

    return NextResponse.json({ success: true });
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
