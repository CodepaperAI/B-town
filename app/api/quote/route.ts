import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type QuotePayload = {
  eventType?: string;
  eventDate?: string;
  city?: string;
  guests?: string;
  package?: string;
  name?: string;
  phone?: string;
  email?: string;
  whatsapp?: boolean;
  notes?: string;
  selectedServices?: string[];
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fallbackFromEmail = "B-Town Entertainment <hello@btownent.ca>";

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function stripWrappingQuotes(value: string) {
  return value.replace(/^["'`]+|["'`]+$/g, "").trim();
}

function normalizeFromEmail(value: string) {
  const cleaned = stripWrappingQuotes(value);

  if (!cleaned) {
    return "";
  }

  if (emailPattern.test(cleaned)) {
    return cleaned;
  }

  const displayMatch = cleaned.match(/^(.+?)\s*<([^<>]+)>$/);
  if (displayMatch) {
    const displayName = stripWrappingQuotes(displayMatch[1]) || "B-Town Entertainment";
    const email = displayMatch[2].trim();
    if (emailPattern.test(email)) {
      return `${displayName} <${email}>`;
    }
  }

  const embeddedEmail = cleaned.match(/[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+/);
  if (embeddedEmail) {
    const email = embeddedEmail[0];
    const displayName =
      stripWrappingQuotes(cleaned.replace(email, "").replace(/[<>]/g, "")) || "B-Town Entertainment";
    return `${displayName} <${email}>`;
  }

  return "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string | undefined) {
  const safe = escapeHtml(value && value.trim() ? value : "N/A");
  return `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#555;font-weight:600;width:180px;">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#111;">${safe}</td></tr>`;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.INQUIRY_TO_EMAIL || "";
  const fromEmail = normalizeFromEmail(process.env.INQUIRY_FROM_EMAIL || "") || fallbackFromEmail;
  const recipients = toEmail
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  if (!apiKey || recipients.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Email service is not configured." },
      { status: 500 }
    );
  }

  if (recipients.some((email) => !emailPattern.test(email))) {
    return NextResponse.json(
      { ok: false, error: "Inquiry recipient email is not configured correctly." },
      { status: 500 }
    );
  }

  let payload: QuotePayload;
  try {
    payload = (await request.json()) as QuotePayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const cleaned = {
    eventType: asText(payload.eventType),
    eventDate: asText(payload.eventDate),
    city: asText(payload.city),
    guests: asText(payload.guests),
    package: asText(payload.package),
    name: asText(payload.name),
    phone: asText(payload.phone),
    email: asText(payload.email),
    notes: asText(payload.notes),
    whatsapp: Boolean(payload.whatsapp),
    selectedServices: Array.isArray(payload.selectedServices)
      ? payload.selectedServices.map(asText).filter(Boolean)
      : []
  };

  const required: Array<keyof Pick<typeof cleaned, "eventType" | "eventDate" | "city" | "name" | "phone" | "email">> = [
    "eventType",
    "eventDate",
    "city",
    "name",
    "phone",
    "email"
  ];

  for (const key of required) {
    if (!cleaned[key]) {
      return NextResponse.json(
        { ok: false, error: `Missing required field: ${key}` },
        { status: 400 }
      );
    }
  }

  if (!emailPattern.test(cleaned.email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  if (cleaned.selectedServices.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Select at least one service." },
      { status: 400 }
    );
  }

  const subject = `New inquiry: ${cleaned.eventType} - ${cleaned.city} (${cleaned.eventDate})`;

  const html = `
    <div style="font-family:Helvetica,Arial,sans-serif;background:#f6f5f1;padding:24px;">
      <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #ece9df;">
        <div style="background:#17130d;color:#f1e7ce;padding:20px 24px;">
          <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#c9a96b;font-weight:700;">New Quote Request</p>
          <h1 style="margin:6px 0 0;font-size:22px;color:#fff;">B-Town Entertainment</h1>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${row("Name", cleaned.name)}
          ${row("Phone", cleaned.phone)}
          ${row("Email", cleaned.email)}
          ${row("WhatsApp OK?", cleaned.whatsapp ? "Yes" : "No")}
          ${row("Event type", cleaned.eventType)}
          ${row("Event date", cleaned.eventDate)}
          ${row("Venue / city", cleaned.city)}
          ${row("Guest count", cleaned.guests)}
          ${row("Package interest", cleaned.package)}
          ${row("Services", cleaned.selectedServices.join(", "))}
          ${row("Notes", cleaned.notes)}
        </table>
        <div style="padding:16px 24px;background:#fafaf6;color:#777;font-size:12px;">
          Sent from btownent.ca quote form.
        </div>
      </div>
    </div>
  `;

  const text = [
    `New inquiry - B-Town Entertainment`,
    ``,
    `Name: ${cleaned.name}`,
    `Phone: ${cleaned.phone}`,
    `Email: ${cleaned.email}`,
    `WhatsApp OK?: ${cleaned.whatsapp ? "Yes" : "No"}`,
    `Event type: ${cleaned.eventType}`,
    `Event date: ${cleaned.eventDate}`,
    `Venue/City: ${cleaned.city}`,
    `Guest count: ${cleaned.guests || "N/A"}`,
    `Package: ${cleaned.package || "N/A"}`,
    `Services: ${cleaned.selectedServices.join(", ")}`,
    `Notes: ${cleaned.notes || "N/A"}`
  ].join("\n");

  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: recipients,
      replyTo: cleaned.email,
      subject,
      html,
      text
    });

    if (result.error) {
      return NextResponse.json(
        { ok: false, error: result.error.message || "Failed to send email." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error sending email.";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
