import { homeTestimonial } from "@/data/home";

export function HomeTestimonialSection() {
  return (
    <section className="home2-testimonial" aria-labelledby="home-testimonial-title">
      <div className="home2-testimonial__inner">
        <p className="eyebrow">Testimonial</p>
        <h2 id="home-testimonial-title">What Client Say</h2>
        <blockquote>
          <p>{homeTestimonial.quote}</p>
        </blockquote>
        <div className="home2-testimonial__rating" aria-label="Five star rating">
          <span>*****</span>
        </div>
        <div className="home2-testimonial__author">
          <strong>{homeTestimonial.author}</strong>
          <span>{homeTestimonial.source}</span>
        </div>
      </div>
    </section>
  );
}
