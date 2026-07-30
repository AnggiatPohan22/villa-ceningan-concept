import { SectionHeading } from "@/components/shared/SectionHeading";
import { homeFaqs } from "@/data/home";

export function HomeFaqSection() {
  return (
    <section className="home-faq section" aria-labelledby="home-faq-title">
      <SectionHeading
        align="center"
        eyebrow="Concierge Desk"
        title="Frequently Asked Questions"
      />
      <div className="home-faq__list">
        {homeFaqs.map((faq) => (
          <details className="home-faq__item" key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
