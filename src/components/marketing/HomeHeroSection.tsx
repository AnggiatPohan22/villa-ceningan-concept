import Image from "next/image";
import Link from "next/link";
import { property } from "@/data/property";
import type { HomeHeroContent } from "@/lib/cms/content";

type HomeHeroSectionProps = {
  content?: HomeHeroContent;
};

export function HomeHeroSection({ content }: HomeHeroSectionProps = {}) {
  const hero = content ?? {
    eyebrow: "Welcome to Sanctuary",
    heading: property.name,
    description: "A place to experience and enjoy the life",
    image: property.heroImage,
    imageAlt: `${property.name} coastal villa and pool atmosphere at dusk`,
    primaryCTA: {
      label: "Explore Rooms",
      url: "/rooms"
    },
    secondaryCTA: {
      label: "Start Reservation",
      url: "/reservation"
    }
  };

  return (
    <section className="home2-hero" id="home" aria-labelledby="home-hero-title">
      <Image
        src={hero.image}
        alt={hero.imageAlt}
        fill
        priority
        sizes="100vw"
        className="home2-hero__image"
      />
      <div className="home2-hero__overlay" />
      <div className="home2-hero__content">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 id="home-hero-title">{hero.heading}</h1>
        <p>{hero.description}</p>
        <Link className="home2-hero__play" href={hero.primaryCTA.url} aria-label={hero.primaryCTA.label}>
          <span />
        </Link>
      </div>
    </section>
  );
}
