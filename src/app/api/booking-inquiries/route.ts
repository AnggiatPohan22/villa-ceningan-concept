import { NextResponse } from "next/server";
import {
  buildBookingInquiryMessage,
  buildBookingInquiryWhatsAppUrl,
  hasBookingInquiryErrors,
  validateBookingInquiry
} from "@/lib/booking/booking-inquiry";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { errors: { form: "Invalid request body." } },
      { status: 400 }
    );
  }

  const validation = validateBookingInquiry(payload);

  if (hasBookingInquiryErrors(validation.errors)) {
    return NextResponse.json(
      { errors: validation.errors },
      { status: 422 }
    );
  }

  return NextResponse.json({
    message: buildBookingInquiryMessage(validation.values),
    whatsappUrl: buildBookingInquiryWhatsAppUrl(validation.values)
  });
}
