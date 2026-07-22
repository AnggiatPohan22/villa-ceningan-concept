import Image from "next/image";
import { property } from "@/data/property";

export function AboutSection() {
  return (
    <section className="section two-column coastal-intro" id="about">
      <div>
        <p className="eyebrow">Sea breeze comfort</p>
        <h2>A soft coastal hideaway with the warmth of a private home.</h2>
        <p>
          The homepage direction now moves away from standard hotel layouts. It leads with
          an editorial villa mood, calm ocean energy, cozy interiors, and booking actions that
          feel integrated into the visual story.
        </p>
        <div className="highlight-grid">
          {property.highlights.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
      <Image
        src={property.aboutImage}
        alt={`${property.name} interior and pool area`}
        width={720}
        height={540}
        className="rounded-image"
      />
    </section>
  );
}
