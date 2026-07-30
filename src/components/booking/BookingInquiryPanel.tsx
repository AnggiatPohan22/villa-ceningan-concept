"use client";

import { FormEvent, useRef, useState } from "react";
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

const countryDialCodes = [
  { name: "Indonesia", dialCode: "+62", iso: "ID" },
  { name: "Australia", dialCode: "+61", iso: "AU" },
  { name: "United States", dialCode: "+1", iso: "US" },
  { name: "United Kingdom", dialCode: "+44", iso: "GB" },
  { name: "Singapore", dialCode: "+65", iso: "SG" },
  { name: "Malaysia", dialCode: "+60", iso: "MY" },
  { name: "Thailand", dialCode: "+66", iso: "TH" },
  { name: "Philippines", dialCode: "+63", iso: "PH" },
  { name: "Vietnam", dialCode: "+84", iso: "VN" },
  { name: "Japan", dialCode: "+81", iso: "JP" },
  { name: "South Korea", dialCode: "+82", iso: "KR" },
  { name: "China", dialCode: "+86", iso: "CN" },
  { name: "Hong Kong", dialCode: "+852", iso: "HK" },
  { name: "India", dialCode: "+91", iso: "IN" },
  { name: "United Arab Emirates", dialCode: "+971", iso: "AE" },
  { name: "Saudi Arabia", dialCode: "+966", iso: "SA" },
  { name: "Germany", dialCode: "+49", iso: "DE" },
  { name: "France", dialCode: "+33", iso: "FR" },
  { name: "Netherlands", dialCode: "+31", iso: "NL" },
  { name: "Italy", dialCode: "+39", iso: "IT" },
  { name: "Spain", dialCode: "+34", iso: "ES" },
  { name: "Switzerland", dialCode: "+41", iso: "CH" },
  { name: "Sweden", dialCode: "+46", iso: "SE" },
  { name: "Norway", dialCode: "+47", iso: "NO" },
  { name: "Denmark", dialCode: "+45", iso: "DK" },
  { name: "New Zealand", dialCode: "+64", iso: "NZ" },
  { name: "Canada", dialCode: "+1", iso: "CA" },
  { name: "Brazil", dialCode: "+55", iso: "BR" },
  { name: "Mexico", dialCode: "+52", iso: "MX" },
  { name: "South Africa", dialCode: "+27", iso: "ZA" }
];

function clampGuestCount(value: number) {
  return Math.min(12, Math.max(1, value));
}

function openDatePicker(input: HTMLInputElement | null) {
  input?.focus();

  try {
    (input as (HTMLInputElement & { showPicker?: () => void }) | null)?.showPicker?.();
  } catch {
    // Some browsers only allow showPicker during direct pointer interaction.
  }
}

export function BookingInquiryPanel({ variant = "default" }: BookingInquiryPanelProps) {
  const [form, setForm] = useState<BookingInquiryPayload>({
    ...initialForm,
    source: variant === "hero" ? "Homepage hero booking form" : "Booking page inquiry form"
  });
  const [errors, setErrors] = useState<BookingErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryDialCodes[0]);
  const [countryQuery, setCountryQuery] = useState(countryDialCodes[0].name);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);

  const countryResults = countryDialCodes
    .filter((country) => {
      const query = countryQuery.trim().toLowerCase();

      return !query || country.name.toLowerCase().includes(query) || country.dialCode.includes(query) || country.iso.toLowerCase().includes(query);
    })
    .slice(0, 6);

  function updateField(name: keyof BookingInquiryPayload, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined, dateRange: undefined, form: undefined }));
  }

  function updatePhone(countryCode: string, number: string) {
    updateField("guestPhone", `${countryCode} ${number}`.trim());
  }

  function selectCountry(country: (typeof countryDialCodes)[number]) {
    setSelectedCountry(country);
    setCountryQuery(country.name);
    setIsCountryOpen(false);
    updatePhone(country.dialCode, phoneNumber);
  }

  function updatePhoneNumber(value: string) {
    setPhoneNumber(value);
    updatePhone(selectedCountry.dialCode, value);
  }

  function updateGuests(value: number) {
    updateField("guests", String(clampGuestCount(value)));
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
          ref={checkInRef}
          type="date"
          name="checkIn"
          value={form.checkIn}
          onClick={() => openDatePicker(checkInRef.current)}
          onFocus={() => openDatePicker(checkInRef.current)}
          onChange={(event) => updateField("checkIn", event.target.value)}
          aria-invalid={Boolean(errors.checkIn)}
        />
        {errors.checkIn ? <em>{errors.checkIn}</em> : null}
      </label>

      <label>
        <span>Check Out</span>
        <input
          ref={checkOutRef}
          type="date"
          name="checkOut"
          value={form.checkOut}
          onClick={() => openDatePicker(checkOutRef.current)}
          onFocus={() => openDatePicker(checkOutRef.current)}
          onChange={(event) => updateField("checkOut", event.target.value)}
          aria-invalid={Boolean(errors.checkOut || errors.dateRange)}
        />
        {errors.checkOut ? <em>{errors.checkOut}</em> : null}
      </label>

      <label>
        <span>Guests</span>
        <div className="booking-panel__stepper">
          <button type="button" aria-label="Decrease guests" onClick={() => updateGuests(Number(form.guests || 1) - 1)}>
            -
          </button>
          <input
            type="number"
            name="guests"
            min="1"
            max="12"
            inputMode="numeric"
            value={form.guests}
            onChange={(event) => updateGuests(Number(event.target.value || 1))}
            aria-invalid={Boolean(errors.guests)}
          />
          <button type="button" aria-label="Increase guests" onClick={() => updateGuests(Number(form.guests || 1) + 1)}>
            +
          </button>
        </div>
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

      <div className="booking-panel__phone-group">
        <label className="booking-panel__country">
          <span>Country Code</span>
          <input
            type="search"
            value={countryQuery}
            onChange={(event) => {
              setCountryQuery(event.target.value);
              setIsCountryOpen(true);
            }}
            onFocus={() => setIsCountryOpen(true)}
            onBlur={() => window.setTimeout(() => setIsCountryOpen(false), 140)}
            aria-label="Search country code"
            aria-expanded={isCountryOpen}
            aria-controls="booking-country-results"
            aria-autocomplete="list"
            role="combobox"
          />
          <small>{selectedCountry.iso} {selectedCountry.dialCode}</small>
          {isCountryOpen ? (
            <div className="booking-panel__country-results" id="booking-country-results" role="listbox">
              {countryResults.map((country) => (
                <button
                  aria-selected={selectedCountry.iso === country.iso}
                  key={`${country.iso}-${country.dialCode}`}
                  type="button"
                  onClick={() => selectCountry(country)}
                  onMouseDown={() => selectCountry(country)}
                  role="option"
                >
                  <span>{country.name}</span>
                  <strong>{country.dialCode}</strong>
                </button>
              ))}
              {countryResults.length === 0 ? <p>No country found.</p> : null}
            </div>
          ) : null}
        </label>

        <label>
          <span>Phone / WhatsApp</span>
          <input
            type="tel"
            name="guestPhoneLocal"
            placeholder="823 8635 7012"
            value={phoneNumber}
            onChange={(event) => updatePhoneNumber(event.target.value)}
            aria-invalid={Boolean(errors.guestPhone)}
          />
        </label>
        {errors.guestPhone ? <em>{errors.guestPhone}</em> : null}
      </div>

      {variant === "default" ? (
        <>
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
