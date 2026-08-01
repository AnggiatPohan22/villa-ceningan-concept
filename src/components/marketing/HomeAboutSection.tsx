import Image from "next/image";
import { property } from "@/data/property";
import type { HomeAboutContent } from "@/lib/cms/content";

type HomeAboutSectionProps = {
  content?: HomeAboutContent;
};

export function HomeAboutSection({ content }: HomeAboutSectionProps = {}) {
  const about = content ?? {
    heading: "A best place to enjoy your life",
    description:
      "Set on the calm side of Nusa Ceningan, Villa Ceningan brings together warm island hospitality, quiet interiors, and the simple luxury of waking close to the water.",
    image: property.aboutImage,
    imageAlt: `${property.name} private terrace and outdoor bath atmosphere`
  };

  return (
    <section className="home2-about" id="home-about" aria-labelledby="home-about-title">
      <div className="home2-about__media">
        <Image
          src={about.image}
          alt={about.imageAlt}
          fill
          sizes="(min-width: 900px) 44vw, 100vw"
          className="home2-about__image"
        />
        <div className="home2-about__seal" aria-hidden="true">
          Villa Ceningan
        </div>
      </div>
      <div className="home2-about__content">
        <div className="section-kicker">
          <span />
          <p>Little About Us</p>
        </div>
        <h2 id="home-about-title">{about.heading}</h2>
        <p>{about.description}</p>
        <div className="home2-about__signature">
          <strong>Villa Ceningan Team</strong>
          <span>Island hosts and stay curators</span>
        </div>
      </div>
    </section>
  );
}
