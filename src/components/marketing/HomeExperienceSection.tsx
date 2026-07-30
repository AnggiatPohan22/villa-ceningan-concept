import Image from "next/image";
import { Button } from "@/components/shared/Button";
import { property } from "@/data/property";

export function HomeExperienceSection() {
  return (
    <section className="home-experience" aria-labelledby="home-experience-title">
      <Image
        src={property.aboutImage}
        alt={`${property.name} peaceful villa interiors and pool atmosphere`}
        fill
        sizes="100vw"
        className="home-experience__image"
      />
      <div className="home-experience__overlay" />
      <div className="home-experience__content">
        <h2 id="home-experience-title">Experience a tapestry of island comfort</h2>
        <Button href="/villa" variant="secondary">
          Discover More
        </Button>
      </div>
    </section>
  );
}
