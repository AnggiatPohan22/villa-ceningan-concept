import { property } from "@/data/property";
import { rooms } from "@/data/rooms";

export type BookingInquiryPayload = {
  checkIn: string;
  checkOut: string;
  guests: string;
  roomSlug: string;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  specialRequest?: string;
  source?: string;
};

export type BookingInquiryValidation = {
  errors: Partial<Record<keyof BookingInquiryPayload | "dateRange", string>>;
  values: BookingInquiryPayload;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function normalizeBookingInquiry(payload: unknown): BookingInquiryPayload {
  const input = typeof payload === "object" && payload !== null ? payload as Record<string, unknown> : {};

  return {
    checkIn: cleanString(input.checkIn),
    checkOut: cleanString(input.checkOut),
    guests: cleanString(input.guests),
    roomSlug: cleanString(input.roomSlug),
    guestName: cleanString(input.guestName),
    guestPhone: cleanString(input.guestPhone),
    guestEmail: cleanString(input.guestEmail),
    specialRequest: cleanString(input.specialRequest),
    source: cleanString(input.source)
  };
}

export function validateBookingInquiry(payload: unknown): BookingInquiryValidation {
  const values = normalizeBookingInquiry(payload);
  const errors: BookingInquiryValidation["errors"] = {};
  const roomExists = rooms.some((room) => room.slug === values.roomSlug);
  const guestsNumber = Number(values.guests);
  const checkInTime = Date.parse(values.checkIn);
  const checkOutTime = Date.parse(values.checkOut);

  if (!values.checkIn || Number.isNaN(checkInTime)) {
    errors.checkIn = "Select a valid check-in date.";
  }

  if (!values.checkOut || Number.isNaN(checkOutTime)) {
    errors.checkOut = "Select a valid check-out date.";
  }

  if (!errors.checkIn && !errors.checkOut && checkOutTime <= checkInTime) {
    errors.dateRange = "Check-out must be after check-in.";
  }

  if (!Number.isInteger(guestsNumber) || guestsNumber < 1 || guestsNumber > 12) {
    errors.guests = "Choose between 1 and 12 guests.";
  }

  if (!roomExists) {
    errors.roomSlug = "Choose one of the available room types.";
  }

  if (values.guestName.length < 2) {
    errors.guestName = "Enter the guest name.";
  }

  if (values.guestPhone.length < 7) {
    errors.guestPhone = "Enter an active phone or WhatsApp number.";
  }

  if (values.guestEmail && !emailPattern.test(values.guestEmail)) {
    errors.guestEmail = "Enter a valid email address.";
  }

  if (values.specialRequest && values.specialRequest.length > 500) {
    errors.specialRequest = "Special request must be 500 characters or fewer.";
  }

  return { errors, values };
}

export function hasBookingInquiryErrors(errors: BookingInquiryValidation["errors"]) {
  return Object.keys(errors).length > 0;
}

export function buildBookingInquiryMessage(values: BookingInquiryPayload) {
  const room = rooms.find((item) => item.slug === values.roomSlug);
  const lines = [
    `Hello ${property.name}, I want to check availability.`,
    "",
    `Room type: ${room?.name ?? values.roomSlug}`,
    `Check-in: ${values.checkIn}`,
    `Check-out: ${values.checkOut}`,
    `Guests: ${values.guests}`,
    `Guest name: ${values.guestName}`,
    `Phone/WhatsApp: ${values.guestPhone}`,
    values.guestEmail ? `Email: ${values.guestEmail}` : "",
    values.specialRequest ? `Special request: ${values.specialRequest}` : "",
    values.source ? `Source: ${values.source}` : ""
  ].filter(Boolean);

  return lines.join("\n");
}

export function buildBookingInquiryWhatsAppUrl(values: BookingInquiryPayload) {
  return `https://wa.me/${property.whatsapp}?text=${encodeURIComponent(buildBookingInquiryMessage(values))}`;
}
