"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/shared/Button";
import type { CmsContactPageContent } from "@/lib/cms/content";

type ContactInquiryFormProps = {
  content: CmsContactPageContent["contactForm"];
  whatsAppNumber: string;
};

export function ContactInquiryForm({ content, whatsAppNumber }: ContactInquiryFormProps) {
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
      content.whatsAppMessageIntro,
      name ? `Name: ${name}` : "",
      email ? `Email: ${email}` : "",
      subject ? `Subject: ${subject}` : "",
      message ? `Message: ${message}` : ""
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `https://wa.me/${whatsAppNumber.replace(/[^\d]/g, "")}?text=${encodeURIComponent(whatsappMessage)}`;
  }

  return (
    <form className="contact-form" aria-label={content.ariaLabel} onSubmit={submitInquiry}>
      <div className="contact-form__heading">
        <h2>{content.heading}</h2>
        <p>{content.description}</p>
      </div>

      <div className="contact-form__grid">
        <label>
          <span>{content.nameLabel}</span>
          <input name="name" placeholder={content.namePlaceholder} required type="text" />
        </label>
        <label>
          <span>{content.emailLabel}</span>
          <input name="email" placeholder={content.emailPlaceholder} required type="email" />
        </label>
      </div>

      <label>
        <span>{content.subjectLabel}</span>
        <select name="subject" defaultValue={content.subjectOptions[0]}>
          {content.subjectOptions.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>{content.messageLabel}</span>
        <textarea name="message" placeholder={content.messagePlaceholder} required rows={5} />
      </label>

      <Button className="contact-form__submit" disabled={isSubmitting} type="submit">
        {isSubmitting ? content.submittingButtonLabel : content.submitButtonLabel}
      </Button>
    </form>
  );
}
