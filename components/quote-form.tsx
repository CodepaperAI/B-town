"use client";

import { useMemo, useState } from "react";
import { Mail, MessageCircle, Send } from "lucide-react";
import { brand, eventTypes, packages, services } from "@/lib/content";
import { cn } from "@/lib/utils";

type FormState = {
  eventType: string;
  eventDate: string;
  city: string;
  guests: string;
  package: string;
  name: string;
  phone: string;
  email: string;
  whatsapp: boolean;
  notes: string;
  selectedServices: string[];
};

const initialState: FormState = {
  eventType: "",
  eventDate: "",
  city: "",
  guests: "",
  package: "",
  name: "",
  phone: "",
  email: "",
  whatsapp: true,
  notes: "",
  selectedServices: []
};

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const emailHref = useMemo(() => {
    const subject = encodeURIComponent(`Quote request: ${form.eventType || "Event"} in ${form.city || "GTA"}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Phone: ${form.phone}`,
        `Email: ${form.email}`,
        `Event type: ${form.eventType}`,
        `Date: ${form.eventDate}`,
        `City/Venue: ${form.city}`,
        `Guest count: ${form.guests}`,
        `Package interest: ${form.package}`,
        `Services: ${form.selectedServices.join(", ")}`,
        `WhatsApp preferred: ${form.whatsapp ? "Yes" : "No"}`,
        `Notes: ${form.notes}`
      ].join("\n")
    );

    return `mailto:${brand.email}?subject=${subject}&body=${body}`;
  }, [form]);

  const whatsappHref = useMemo(() => {
    const text = encodeURIComponent(
      `Hi B-Town Entertainment, I'd like a quote.\nEvent: ${form.eventType}\nDate: ${form.eventDate}\nCity/Venue: ${form.city}\nGuests: ${form.guests}\nServices: ${form.selectedServices.join(", ")}`
    );
    return `https://wa.me/16477000000?text=${text}`;
  }, [form]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function toggleService(service: string) {
    setForm((current) => {
      const exists = current.selectedServices.includes(service);
      return {
        ...current,
        selectedServices: exists
          ? current.selectedServices.filter((item) => item !== service)
          : [...current.selectedServices, service]
      };
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!form.eventType) nextErrors.eventType = "Choose an event type.";
    if (!form.eventDate) nextErrors.eventDate = "Add your event date.";
    if (!form.city.trim()) nextErrors.city = "Add your venue or city.";
    if (!form.name.trim()) nextErrors.name = "Add your name.";
    if (!form.phone.trim()) nextErrors.phone = "Add your phone number.";
    if (!form.email.trim()) nextErrors.email = "Add your email.";
    if (form.selectedServices.length === 0) {
      nextErrors.selectedServices = "Select at least one service.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !data.ok) {
        setSubmitError(data.error || "We couldn't send your request. Please try email or WhatsApp below.");
        setSubmitted(true);
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Network error. Please try email or WhatsApp below.");
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    const sent = !submitError;
    return (
      <div className="confirmation-pop rounded-[8px] border border-champagne/35 bg-ink/95 p-5 shadow-glow">
        <p className="text-xs font-extrabold uppercase text-champagne">
          {sent ? "Inquiry sent" : "Inquiry ready"}
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold leading-none text-ivory">
          {sent ? "Thanks — we got your details." : "Send your event details."}
        </h2>
        <p className="mt-4 text-sm leading-7 text-ivory/68">
          {sent
            ? "B-Town Entertainment will reply within a few hours. For the fastest response, continue on WhatsApp."
            : submitError || "Your quote details are prepared for B-Town Entertainment. Send by email or continue on WhatsApp for the fastest response."}
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <a
            href={emailHref}
            className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-[6px] bg-champagne px-4 text-sm font-extrabold uppercase text-[#17130d]"
          >
            <Mail aria-hidden="true" size={17} />
            Send Email
          </a>
          <a
            href={whatsappHref}
            className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-[6px] bg-peacock px-4 text-sm font-extrabold uppercase text-white"
          >
            <MessageCircle aria-hidden="true" size={17} />
            WhatsApp
          </a>
        </div>
        <button
          type="button"
          className="focus-ring mt-4 text-sm font-bold text-ivory/64 underline decoration-champagne/50 underline-offset-4 hover:text-ivory"
          onClick={() => {
            setSubmitted(false);
            setSubmitError(null);
          }}
        >
          Edit request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-[8px] border border-champagne/24 bg-ink/95 p-5 shadow-glow backdrop-blur-xl",
        compact ? "w-full max-w-xl" : "w-full"
      )}
      noValidate
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase text-champagne">Instant quote request</p>
          <h2 className="mt-2 font-display text-3xl font-bold leading-none text-ivory">
            Tell us the vibe.
          </h2>
        </div>
        <Send aria-hidden="true" className="text-champagne" size={22} />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Event type" error={errors.eventType}>
          <select
            value={form.eventType}
            onChange={(event) => update("eventType", event.target.value)}
            className="form-control"
            aria-invalid={Boolean(errors.eventType)}
          >
            <option value="">Select event</option>
            {eventTypes.map((eventType) => (
              <option key={eventType} value={eventType}>
                {eventType}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Event date" error={errors.eventDate}>
          <input
            type="date"
            value={form.eventDate}
            onChange={(event) => update("eventDate", event.target.value)}
            className="form-control"
            aria-invalid={Boolean(errors.eventDate)}
          />
        </Field>
        <Field label="Venue / city" error={errors.city}>
          <input
            type="text"
            value={form.city}
            onChange={(event) => update("city", event.target.value)}
            placeholder="Brampton, Mississauga, Toronto..."
            className="form-control"
            aria-invalid={Boolean(errors.city)}
          />
        </Field>
        <Field label="Guest count">
          <input
            type="number"
            min="1"
            value={form.guests}
            onChange={(event) => update("guests", event.target.value)}
            placeholder="250"
            className="form-control"
          />
        </Field>
        <Field label="Package interest" className="sm:col-span-2">
          <select
            value={form.package}
            onChange={(event) => update("package", event.target.value)}
            className="form-control"
          >
            <option value="">Choose a package or ask us to recommend</option>
            {packages.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <p className="text-sm font-bold text-ivory">Services needed</p>
        <div className={cn("mt-3 grid gap-2", compact ? "grid-cols-1" : "sm:grid-cols-2")}>
          {services.slice(0, compact ? 6 : services.length).map((service) => (
            <label
              key={service.slug}
              className="flex min-h-11 cursor-pointer items-center gap-3 rounded-[6px] border border-ivory/10 bg-ivory/[0.03] px-3 py-2 text-sm text-ivory/78 transition hover:border-champagne/40 hover:bg-ivory/[0.06]"
            >
              <input
                type="checkbox"
                checked={form.selectedServices.includes(service.title)}
                onChange={() => toggleService(service.title)}
                className="size-4 accent-champagne"
              />
              <span>{service.title}</span>
            </label>
          ))}
        </div>
        {errors.selectedServices ? (
          <p className="mt-2 text-sm font-semibold text-[#ffb4b4]">{errors.selectedServices}</p>
        ) : null}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input
            type="text"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            className="form-control"
            aria-invalid={Boolean(errors.name)}
          />
        </Field>
        <Field label="Phone" error={errors.phone}>
          <input
            type="tel"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            className="form-control"
            aria-invalid={Boolean(errors.phone)}
          />
        </Field>
        <Field label="Email" error={errors.email} className="sm:col-span-2">
          <input
            type="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            className="form-control"
            aria-invalid={Boolean(errors.email)}
          />
        </Field>
      </div>

      {!compact ? (
        <Field label="Notes" className="mt-4">
          <textarea
            value={form.notes}
            onChange={(event) => update("notes", event.target.value)}
            rows={4}
            placeholder="Tell us about entrances, music, effects, décor, family requests, or venue details."
            className="form-control resize-y"
          />
        </Field>
      ) : null}

      <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm text-ivory/70">
        <input
          type="checkbox"
          checked={form.whatsapp}
          onChange={(event) => update("whatsapp", event.target.checked)}
          className="mt-1 size-4 accent-champagne"
        />
        <span>WhatsApp is okay for quick follow-up and package details.</span>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="focus-ring mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[6px] bg-champagne px-5 text-sm font-extrabold uppercase text-[#17130d] transition hover:bg-champagne-deep hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Sending..." : "Get Instant Quote"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
  className
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block text-sm font-bold text-ivory">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-sm font-semibold text-[#ffb4b4]">{error}</span> : null}
    </label>
  );
}
