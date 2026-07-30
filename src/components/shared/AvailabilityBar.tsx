"use client";

import Link from "next/link";
import { FormEvent, useMemo, useRef, useState } from "react";
import { Button } from "@/components/shared/Button";

type AvailabilityBarProps = {
  action?: string;
  ariaLabel?: string;
  className?: string;
  promoHref?: string;
  scrollTargetId?: string;
  submitLabel?: string;
};

const defaultAvailability = {
  checkIn: "2026-06-26",
  checkOut: "2026-06-29",
  guests: "3"
};

function openDatePicker(input: HTMLInputElement | null) {
  input?.focus();

  try {
    (input as (HTMLInputElement & { showPicker?: () => void }) | null)?.showPicker?.();
  } catch {
    // Browsers may reject showPicker unless it follows a direct user gesture.
  }
}

function formatDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return {
    day: String(day).padStart(2, "0"),
    month: new Intl.DateTimeFormat("en-US", { month: "long" }).format(date)
  };
}

export function AvailabilityBar({
  action = "/reservation",
  ariaLabel = "Availability search",
  className,
  promoHref = "/reservation",
  scrollTargetId,
  submitLabel = "Check Availability"
}: AvailabilityBarProps) {
  const [availability, setAvailability] = useState(defaultAvailability);
  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);
  const checkIn = useMemo(() => formatDate(availability.checkIn), [availability.checkIn]);
  const checkOut = useMemo(() => formatDate(availability.checkOut), [availability.checkOut]);
  const classNames = ["availability-bar", className].filter(Boolean).join(" ");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!scrollTargetId) {
      return;
    }

    event.preventDefault();
    document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <form action={action} aria-label={ariaLabel} className={classNames} onSubmit={handleSubmit}>
      <label className="availability-bar__field">
        <span className="availability-bar__label">Check-in</span>
        <strong className="availability-bar__value">{checkIn.day}</strong>
        <small className="availability-bar__detail">/ {checkIn.month}</small>
        <input
          ref={checkInRef}
          aria-label="Check-in date"
          className="availability-bar__native"
          name="checkIn"
          type="date"
          value={availability.checkIn}
          onChange={(event) => setAvailability((current) => ({ ...current, checkIn: event.target.value }))}
          onClick={() => openDatePicker(checkInRef.current)}
          onFocus={() => openDatePicker(checkInRef.current)}
        />
      </label>
      <label className="availability-bar__field">
        <span className="availability-bar__label">Check-out</span>
        <strong className="availability-bar__value">{checkOut.day}</strong>
        <small className="availability-bar__detail">/ {checkOut.month}</small>
        <input
          ref={checkOutRef}
          aria-label="Check-out date"
          className="availability-bar__native"
          name="checkOut"
          type="date"
          value={availability.checkOut}
          onChange={(event) => setAvailability((current) => ({ ...current, checkOut: event.target.value }))}
          onClick={() => openDatePicker(checkOutRef.current)}
          onFocus={() => openDatePicker(checkOutRef.current)}
        />
      </label>
      <label className="availability-bar__field">
        <span className="availability-bar__label">Guests</span>
        <strong className="availability-bar__value">{availability.guests.padStart(2, "0")}</strong>
        <select
          aria-label="Guests"
          className="availability-bar__native"
          name="guests"
          value={availability.guests}
          onChange={(event) => setAvailability((current) => ({ ...current, guests: event.target.value }))}
        >
          {Array.from({ length: 12 }, (_, index) => String(index + 1)).map((guest) => (
            <option key={guest} value={guest}>
              {guest.padStart(2, "0")} Guests
            </option>
          ))}
        </select>
      </label>
      <div className="availability-bar__cta">
        <Link className="availability-bar__promo" href={promoHref}>
          Have a promotion code?
        </Link>
        <Button size="sm" type="submit" variant="secondary">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
