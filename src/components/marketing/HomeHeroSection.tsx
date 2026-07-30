import Image from "next/image";
import Link from "next/link";
import { property } from "@/data/property";

export function HomeHeroSection() {
  return (
    <section className="home2-hero" id="home" aria-labelledby="home-hero-title">
      <Image
        src={property.heroImage}
        alt={`${property.name} coastal villa and pool atmosphere at dusk`}
        fill
        priority
        sizes="100vw"
        className="home2-hero__image"
      />
      <div className="home2-hero__overlay" />
      <div className="home2-hero__content">
        <p className="eyebrow">Welcome to Sanctuary</p>
        <h1 id="home-hero-title">{property.name}</h1>
        <p>A place to experience and enjoy the life</p>
        <Link className="home2-hero__play" href="#home-about" aria-label="Explore Villa Ceningan">
          <span />
        </Link>
      </div>
    </section>
  );
}
