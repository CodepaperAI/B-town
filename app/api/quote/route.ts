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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string | undefined) {
  const safe = escapeHtml(value && value.trim() ? value : "—");
  return `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#555;font-weight:600;width:180px;">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#111;">${safe}</td></tr>`;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.INQUIRY_TO_EMAIL;
  const fromEmail = process.env.INQUIRY_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return NextResponse.json(
      { ok: false, error: "Email service is not configured." },
      { status: 500 }
    );
  }

  let payload: QuotePayload;
  try {
    payload = (await request.json()) as QuotePayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const required: Array<keyof QuotePayload> = ["eventType", "eventDate", "city", "name", "phone", "email"];
  for (const key of required) {
    const value = payload[key];
    if (typeof value !== "string" || !value.trim()) {
      return NextResponse.json(
        { ok: false, error: `Missing required field: ${key}` },
        { status: 400 }
      );
    }
  }
  if (!Array.isArray(payload.selectedServices) || payload.selectedServices.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Select at least one service." },
      { status: 400 }
    );
  }

  const subject = `New inquiry: ${payload.eventType} — ${payload.city} (${payload.eventDate})`;

  const html = `
    <div style="font-family:Helvetica,Arial,sans-serif;background:#f6f5f1;padding:24px;">
      <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #ece9df;">
        <div style="background:#17130d;color:#f1e7ce;padding:20px 24px;">
          <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#c9a96b;font-weight:700;">New Quote Request</p>
          <h1 style="margin:6px 0 0;font-size:22px;color:#fff;">B-Town Entertainment</h1>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${row("Name", payload.name)}
          ${row("Phone", payload.phone)}
          ${row("Email", payload.email)}
          ${row("WhatsApp OK?", payload.whatsapp ? "Yes" : "No")}
          ${row("Event type", payload.eventType)}
          ${row("Event date", payload.eventDate)}
          ${row("Venue / city", payload.city)}
          ${row("Guest count", payload.guests)}
          ${row("Package interest", payload.package)}
          ${row("Services", (payload.selectedServices || []).join(", "))}
          ${row("Notes", payload.notes)}
        </table>
        <div style="padding:16px 24px;background:#fafaf6;color:#777;font-size:12px;">
          Sent from btownent.ca quote form.
        </div>
      </div>
    </div>
  `;

  const text = [
    `New inquiry — B-Town Entertainment`,
    ``,
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `WhatsApp OK?: ${payload.whatsapp ? "Yes" : "No"}`,
    `Event type: ${payload.eventType}`,
    `Event date: ${payload.eventDate}`,
    `Venue/City: ${payload.city}`,
    `Guest count: ${payload.guests || "—"}`,
    `Package: ${payload.package || "—"}`,
    `Services: ${(payload.selectedServices || []).join(", ")}`,
    `Notes: ${payload.notes || "—"}`
  ].join("\n");

  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: payload.email,
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
