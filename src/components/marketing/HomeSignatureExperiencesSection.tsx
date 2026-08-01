import Image from "next/image";
import Link from "next/link";
import { homeSignatureExperiences } from "@/data/home";
import type { ServiceItem } from "@/data/services";

type HomeSignatureExperience = {
  title: string;
  description: string;
  image: string;
  category: string;
};

type HomeSignatureExperiencesSectionProps = {
  services?: ServiceItem[];
};

function mapServiceExperiences(services: ServiceItem[]): HomeSignatureExperience[] {
  return services.slice(0, 4).map((service) => ({
    title: service.title,
    description: service.summary,
    image: service.image,
    category: service.eyebrow
  }));
}

export function HomeSignatureExperiencesSection({ services }: HomeSignatureExperiencesSectionProps = {}) {
  const experiences = services?.length ? mapServiceExperiences(services) : homeSignatureExperiences;

  return (
    <section className="home2-experiences" aria-labelledby="home-experiences-title">
      <div className="home2-experiences__header">
        <div>
          <p className="eyebrow">Curated Moments</p>
          <h2 id="home-experiences-title">Signature Experiences</h2>
        </div>
        <div className="home2-experiences__arrows" aria-hidden="true">
          <span />
          <span />
        </div>
      </div>
      <div className="home2-experiences__rail">
        {experiences.map((experience) => (
          <article className="home2-experience-card" key={experience.title}>
            <div className="home2-experience-card__media">
              <Image
                src={experience.image}
                alt={experience.description}
                fill
                sizes="(min-width: 900px) 380px, 78vw"
              />
              <span>{experience.category}</span>
            </div>
            <h3>{experience.title}</h3>
            <p>{experience.description}</p>
          </article>
        ))}
      </div>
      <div className="home2-section-cta">
        <Link className="ui-button ui-button--outline ui-button--md" href="/services">
          All Signature Service
        </Link>
      </div>
    </section>
  );
}
