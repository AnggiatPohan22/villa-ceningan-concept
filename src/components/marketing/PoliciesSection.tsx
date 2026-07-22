import { policies } from "@/data/policies";

export function PoliciesSection() {
  return (
    <section className="section policies">
      <div className="section-heading">
        <p className="eyebrow">Guest Policies</p>
        <h2>Clear stay rules before guests confirm.</h2>
      </div>
      <div className="policy-grid">
        {policies.map((policy) => (
          <article key={policy.title}>
            <h3>{policy.title}</h3>
            <p>{policy.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
