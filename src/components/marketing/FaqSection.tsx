import { faqs } from "@/data/faqs";

export function FaqSection() {
  return (
    <section className="section faq" id="faq">
      <div>
        <p className="eyebrow">Build Direction</p>
        <h2>Prepared for booking and real-time availability.</h2>
      </div>
      <div className="faq-list">
        {faqs.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
