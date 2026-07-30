export type LegalPageContent = {
  slug: "terms" | "privacy" | "cookies";
  eyebrow: string;
  title: string;
  summary: string;
  updatedAt: string;
  sections: Array<{
    title: string;
    body: string[];
  }>;
};

export const legalPages: LegalPageContent[] = [
  {
    slug: "terms",
    eyebrow: "Guest Agreement",
    title: "Terms of Service",
    summary:
      "These terms outline how guests may use the Villa Ceningan website, submit reservation inquiries, and communicate with our concierge team.",
    updatedAt: "July 29, 2026",
    sections: [
      {
        title: "Reservation inquiries",
        body: [
          "Submitting a reservation inquiry does not automatically confirm a booking. Our team will review availability, room preference, and guest details before confirming the stay.",
          "Rates, availability, inclusions, and room assignments may change until the reservation is confirmed by Villa Ceningan."
        ]
      },
      {
        title: "Guest responsibilities",
        body: [
          "Guests are responsible for providing accurate contact, arrival, and stay information when sending an inquiry.",
          "Guests agree to respect villa policies, local community rules, and the quiet character of the property during their stay."
        ]
      },
      {
        title: "Payments and cancellations",
        body: [
          "Any deposit, payment schedule, cancellation window, or refund condition will be shared directly by the concierge before a reservation is confirmed.",
          "If a payment gateway or booking engine is introduced later, its specific terms may apply in addition to these terms."
        ]
      },
      {
        title: "Website content",
        body: [
          "Images, room descriptions, services, rates, and guest benefits are provided as hospitality information and may be updated as the property evolves.",
          "Villa Ceningan may update these terms to reflect changes in operations, guest services, or applicable requirements."
        ]
      }
    ]
  },
  {
    slug: "privacy",
    eyebrow: "Data Care",
    title: "Privacy Policy",
    summary:
      "This policy explains how Villa Ceningan handles inquiry details, contact information, and communication preferences shared through the website.",
    updatedAt: "July 29, 2026",
    sections: [
      {
        title: "Information we collect",
        body: [
          "We may collect guest name, email, phone or WhatsApp number, stay dates, room preference, guest count, and message details when a user submits an inquiry.",
          "We may also receive basic technical information from standard website hosting logs, such as browser type, device type, and approximate access time."
        ]
      },
      {
        title: "How information is used",
        body: [
          "Guest information is used to respond to reservation inquiries, coordinate stay details, prepare concierge support, and improve the guest communication experience.",
          "Villa Ceningan does not sell guest inquiry information."
        ]
      },
      {
        title: "Communication",
        body: [
          "By submitting an inquiry, guests allow Villa Ceningan to respond using the contact method provided, including WhatsApp, phone, or email.",
          "Guests may request that their inquiry details be corrected or removed by contacting the concierge team."
        ]
      },
      {
        title: "Data protection",
        body: [
          "We aim to keep guest inquiry information handled with reasonable care and only for as long as needed for hospitality, operational, or legal purposes.",
          "If third-party booking, payment, analytics, or marketing tools are added later, this privacy policy should be updated to describe those providers."
        ]
      }
    ]
  },
  {
    slug: "cookies",
    eyebrow: "Website Preferences",
    title: "Cookies Policy",
    summary:
      "This policy explains how cookies and similar browser technologies should be handled on the Villa Ceningan website.",
    updatedAt: "July 29, 2026",
    sections: [
      {
        title: "What cookies are",
        body: [
          "Cookies are small browser files used by websites to remember preferences, support functionality, or understand how visitors use a site.",
          "At this stage, the Villa Ceningan website should only rely on essential or preference-based browser behavior unless additional tools are intentionally added."
        ]
      },
      {
        title: "Essential cookies",
        body: [
          "Essential cookies or local browser storage may be used to support basic website functionality, security, navigation, forms, or saved preferences.",
          "These are usually required for the site to work properly and do not need the same consent treatment as advertising or tracking cookies."
        ]
      },
      {
        title: "Analytics and marketing cookies",
        body: [
          "If analytics, advertising pixels, retargeting scripts, or third-party marketing tools are added later, Villa Ceningan should ask for consent before loading non-essential cookies.",
          "When that happens, a lightweight cookie consent banner or preference popup should be added alongside this policy page."
        ]
      },
      {
        title: "Managing cookies",
        body: [
          "Visitors can manage or delete cookies through their browser settings.",
          "For the current site stage, a dedicated Cookies Policy page is the cleanest approach. A popup is best added only when non-essential tracking tools are actually installed."
        ]
      }
    ]
  }
];

export function getLegalPage(slug: LegalPageContent["slug"]) {
  return legalPages.find((page) => page.slug === slug);
}
