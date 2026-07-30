"use client";

import { FormEvent, useState } from "react";
import { rooms } from "@/data/rooms";
import type { BookingInquiryPayload } from "@/lib/booking/booking-inquiry";

type HomeBookingForm = {
  adults: string;
  children: string;
} & Omit<BookingInquiryPayload, "guests">;

type BookingErrors = Partial<Record<keyof BookingInquiryPayload | "dateRange" | "form", string>>;

const initialForm: HomeBookingForm = {
  adults: "2",
  children: "0",
  checkIn: "",
  checkOut: "",
  guestEmail: "",
  guestName: "",
  guestPhone: "",
  roomSlug: rooms[0]?.slug ?? "",
  source: "Homepage Stitch booking section",
  specialRequest: ""
};

export function HomeBookingInquiryForm() {
  const [form, setForm] = useState<HomeBookingForm>(initialForm);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(name: keyof HomeBookingForm, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined, dateRange: undefined, form: undefined }));
  }

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const adultCount = Number(form.adults);
    const childCount = Number(form.children);
    const totalGuests = String(adultCount + childCount);
    const childNote = childCount > 0 ? `Children: ${childCount}.` : "";
    const payload: BookingInquiryPayload = {
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      guestEmail: form.guestEmail,
      guestName: form.guestName,
      guestPhone: form.guestPhone,
      guests: totalGuests,
      roomSlug: form.roomSlug,
      source: form.source,
      specialRequest: [childNote, form.specialRequest].filter(Boolean).join(" ")
    };

    try {
      const response = await fetch("/api/booking-inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
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
    <form className="home-booking-form" aria-label="Homepage booking inquiry" onSubmit={submitInquiry} noValidate>
      <label className="home-booking-form__wide">
        <span>Full Name</span>
        <input
          name="guestName"
          onChange={(event) => updateField("guestName", event.target.value)}
          placeholder="Enter your name"
          type="text"
          value={form.guestName}
          aria-invalid={Boolean(errors.guestName)}
        />
        {errors.guestName ? <em>{errors.guestName}</em> : null}
      </label>

      <label>
        <span>Email Address</span>
        <input
          name="guestEmail"
          onChange={(event) => updateField("guestEmail", event.target.value)}
          placeholder="name@email.com"
          type="email"
          value={form.guestEmail}
          aria-invalid={Boolean(errors.guestEmail)}
        />
        {errors.guestEmail ? <em>{errors.guestEmail}</em> : null}
      </label>

      <label>
        <span>Phone Number</span>
        <input
          name="guestPhone"
          onChange={(event) => updateField("guestPhone", event.target.value)}
          placeholder="+62..."
          type="tel"
          value={form.guestPhone}
          aria-invalid={Boolean(errors.guestPhone)}
        />
        {errors.guestPhone ? <em>{errors.guestPhone}</em> : null}
      </label>

      <label>
        <span>Adults</span>
        <select name="adults" onChange={(event) => updateField("adults", event.target.value)} value={form.adults}>
          {Array.from({ length: 8 }, (_, index) => String(index + 1)).map((value) => (
            <option key={value} value={value}>
              {value} {value === "1" ? "Adult" : "Adults"}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Children</span>
        <select name="children" onChange={(event) => updateField("children", event.target.value)} value={form.children}>
          {Array.from({ length: 5 }, (_, index) => String(index)).map((value) => (
            <option key={value} value={value}>
              {value} {value === "1" ? "Child" : "Children"}
            </option>
          ))}
        </select>
      </label>

      <label className="home-booking-form__wide">
        <span>Room Type</span>
        <select
          name="roomSlug"
          onChange={(event) => updateField("roomSlug", event.target.value)}
          value={form.roomSlug}
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
        <span>Check-In</span>
        <input
          name="checkIn"
          onChange={(event) => updateField("checkIn", event.target.value)}
          type="date"
          value={form.checkIn}
          aria-invalid={Boolean(errors.checkIn)}
        />
        {errors.checkIn ? <em>{errors.checkIn}</em> : null}
      </label>

      <label>
        <span>Check-Out</span>
        <input
          name="checkOut"
          onChange={(event) => updateField("checkOut", event.target.value)}
          type="date"
          value={form.checkOut}
          aria-invalid={Boolean(errors.checkOut || errors.dateRange)}
        />
        {errors.checkOut ? <em>{errors.checkOut}</em> : null}
      </label>

      <label className="home-booking-form__wide">
        <span>Additional Notes</span>
        <textarea
          name="specialRequest"
          onChange={(event) => updateField("specialRequest", event.target.value)}
          placeholder="Tell us about any special requirements..."
          rows={3}
          value={form.specialRequest}
          aria-invalid={Boolean(errors.specialRequest)}
        />
        {errors.specialRequest ? <em>{errors.specialRequest}</em> : null}
      </label>

      {errors.dateRange ? <p className="home-booking-form__error">{errors.dateRange}</p> : null}
      {errors.guests ? <p className="home-booking-form__error">{errors.guests}</p> : null}
      {errors.form ? <p className="home-booking-form__error">{errors.form}</p> : null}

      <button className="home-booking-form__submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Preparing Inquiry..." : "Confirm Booking Inquiry"}
      </button>
    </form>
  );
}
