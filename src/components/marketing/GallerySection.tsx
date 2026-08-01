import Image from "next/image";
import { gallery } from "@/data/gallery";
import { property } from "@/data/property";

type GallerySectionProps = {
  images?: string[];
};

export function GallerySection({ images = gallery }: GallerySectionProps = {}) {
  return (
    <section className="section" id="gallery">
      <div className="section-heading">
        <p className="eyebrow">Gallery</p>
        <h2>Visual proof for the stay experience.</h2>
      </div>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <Image
            key={image}
            src={image}
            alt={`${property.name} gallery ${index + 1}`}
            width={720}
            height={540}
          />
        ))}
      </div>
    </section>
  );
}
