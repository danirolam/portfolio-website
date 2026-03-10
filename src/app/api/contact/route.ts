import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // ─── Option 1: Forward to an email service ───
    // Uncomment and configure one of the following:

    // Formspree:
    // const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ name, email, subject, message }),
    // });
    // if (!res.ok) throw new Error("Formspree error");

    // Resend (npm install resend):
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "contact@drolam.ca",
    //   to: process.env.CONTACT_EMAIL!,
    //   subject: `[Portfolio] ${subject || "New message"}`,
    //   text: `From: ${name} (${email})\n\n${message}`,
    // });

    // ─── Option 2: Log to console (development) ───
    console.log("📬 Contact form submission:", {
      name,
      email,
      subject,
      message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
