"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/shared/Button";
import { property } from "@/data/property";

const subjectOptions = ["General Inquiry", "Availability Request", "Villa Services", "Special Request"];

export function ContactInquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const whatsappMessage = [
      `Hello ${property.name}, I would like to send a contact inquiry.`,
      name ? `Name: ${name}` : "",
      email ? `Email: ${email}` : "",
      subject ? `Subject: ${subject}` : "",
      message ? `Message: ${message}` : ""
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `https://wa.me/${property.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
  }

  return (
    <form className="contact-form" aria-label="Contact inquiry" onSubmit={submitInquiry}>
      <div className="contact-form__heading">
        <h2>Send an Inquiry</h2>
        <p>Share your stay preferences and our concierge will continue the conversation directly.</p>
      </div>

      <div className="contact-form__grid">
        <label>
          <span>Name</span>
          <input name="name" placeholder="Your full name" required type="text" />
        </label>
        <label>
          <span>Email</span>
          <input name="email" placeholder="email@example.com" required type="email" />
        </label>
      </div>

      <label>
        <span>Subject</span>
        <select name="subject" defaultValue={subjectOptions[0]}>
          {subjectOptions.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Message</span>
        <textarea name="message" placeholder="Tell us about your island stay, arrival plan, or special request." required rows={5} />
      </label>

      <Button className="contact-form__submit" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Opening WhatsApp..." : "Submit Inquiry"}
      </Button>
    </form>
  );
}
