"use client";

import { FormEvent, useState } from "react";
import { rooms } from "@/data/rooms";
import type { BookingInquiryPayload } from "@/lib/booking/booking-inquiry";

type BookingInquiryPanelProps = {
  variant?: "default" | "hero";
};

type BookingErrors = Partial<Record<keyof BookingInquiryPayload | "dateRange" | "form", string>>;

const initialForm: BookingInquiryPayload = {
  checkIn: "",
  checkOut: "",
  guests: "2",
  roomSlug: rooms[0]?.slug ?? "",
  guestName: "",
  guestPhone: "",
  guestEmail: "",
  specialRequest: "",
  source: "Website booking inquiry"
};

export function BookingInquiryPanel({ variant = "default" }: BookingInquiryPanelProps) {
  const [form, setForm] = useState<BookingInquiryPayload>({
    ...initialForm,
    source: variant === "hero" ? "Homepage hero booking form" : "Booking page inquiry form"
  });
  const [errors, setErrors] = useState<BookingErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(name: keyof BookingInquiryPayload, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined, dateRange: undefined, form: undefined }));
  }

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/booking-inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
      const result = await response.json();

      if (!response.ok) {
        setErrors(result.errors ?? { form: "Please check the booking details." });
        return;
      }

      window.location.href = result.whatsappUrl;
    } catch {
      setErrors({ form: "Unable to prepare the WhatsApp inquiry. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className={`booking-panel booking-panel--${variant}`}
      aria-label="Booking inquiry"
      onSubmit={submitInquiry}
      noValidate
    >
      <div className="booking-panel__header">
        <span>{variant === "hero" ? "Set your preferences" : "Booking inquiry"}</span>
        <small>{variant === "hero" ? "Find your cozy island stay" : "Send a structured request directly to WhatsApp"}</small>
      </div>

      <label>
        <span>Check In</span>
        <input
          type="date"
          name="checkIn"
          value={form.checkIn}
          onChange={(event) => updateField("checkIn", event.target.value)}
          aria-invalid={Boolean(errors.checkIn)}
        />
        {errors.checkIn ? <em>{errors.checkIn}</em> : null}
      </label>

      <label>
        <span>Check Out</span>
        <input
          type="date"
          name="checkOut"
          value={form.checkOut}
          onChange={(event) => updateField("checkOut", event.target.value)}
          aria-invalid={Boolean(errors.checkOut || errors.dateRange)}
        />
        {errors.checkOut ? <em>{errors.checkOut}</em> : null}
      </label>

      <label>
        <span>Guests</span>
        <select
          name="guests"
          value={form.guests}
          onChange={(event) => updateField("guests", event.target.value)}
          aria-invalid={Boolean(errors.guests)}
        >
          {Array.from({ length: 12 }, (_, index) => String(index + 1)).map((value) => (
            <option key={value} value={value}>
              {value} {value === "1" ? "guest" : "guests"}
            </option>
          ))}
        </select>
        {errors.guests ? <em>{errors.guests}</em> : null}
      </label>

      <label>
        <span>Room Type</span>
        <select
          name="roomSlug"
          value={form.roomSlug}
          onChange={(event) => updateField("roomSlug", event.target.value)}
          aria-invalid={Boolean(errors.roomSlug)}
        >
          {rooms.map((room) => (
            <option key={room.slug} value={room.slug}>
              {room.name}
            </option>
          ))}
        </select>
        {errors.roomSlug ? <em>{errors.roomSlug}</em> : null}
      </label>

      <label>
        <span>Guest Name</span>
        <input
          type="text"
          name="guestName"
          placeholder="Your name"
          value={form.guestName}
          onChange={(event) => updateField("guestName", event.target.value)}
          aria-invalid={Boolean(errors.guestName)}
        />
        {errors.guestName ? <em>{errors.guestName}</em> : null}
      </label>

      <label>
        <span>Phone / WhatsApp</span>
        <input
          type="tel"
          name="guestPhone"
          placeholder="+62..."
          value={form.guestPhone}
          onChange={(event) => updateField("guestPhone", event.target.value)}
          aria-invalid={Boolean(errors.guestPhone)}
        />
        {errors.guestPhone ? <em>{errors.guestPhone}</em> : null}
      </label>

      {variant === "default" ? (
        <>
          <label>
            <span>Email</span>
            <input
              type="email"
              name="guestEmail"
              placeholder="name@email.com"
              value={form.guestEmail}
              onChange={(event) => updateField("guestEmail", event.target.value)}
              aria-invalid={Boolean(errors.guestEmail)}
            />
            {errors.guestEmail ? <em>{errors.guestEmail}</em> : null}
          </label>

          <label className="booking-panel__wide">
            <span>Special Request</span>
            <textarea
              name="specialRequest"
              placeholder="Arrival time, pickup request, celebration setup, or other notes"
              rows={4}
              value={form.specialRequest}
              onChange={(event) => updateField("specialRequest", event.target.value)}
              aria-invalid={Boolean(errors.specialRequest)}
            />
            {errors.specialRequest ? <em>{errors.specialRequest}</em> : null}
          </label>
        </>
      ) : null}

      {errors.dateRange ? <p className="booking-panel__error">{errors.dateRange}</p> : null}
      {errors.form ? <p className="booking-panel__error">{errors.form}</p> : null}

      <button className="button button-primary booking-panel__submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Preparing..." : "Send to WhatsApp"}
      </button>
    </form>
  );
}
