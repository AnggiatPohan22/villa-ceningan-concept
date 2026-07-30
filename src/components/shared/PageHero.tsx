import Image from "next/image";
import type { ReactNode } from "react";

type PageHeroProps = {
  actions?: ReactNode;
  align?: "left" | "center";
  eyebrow?: string;
  imageAlt?: string;
  imagePriority?: boolean;
  imageSrc?: string;
  title: string;
  description?: string;
};

export function PageHero({
  actions,
  align = "left",
  eyebrow,
  imageAlt,
  imagePriority = false,
  imageSrc,
  title,
  description
}: PageHeroProps) {
  return (
    <section className={`page-hero page-hero--${align} ${imageSrc ? "page-hero--image" : ""}`}>
      {imageSrc ? (
        <div className="page-hero__media" aria-hidden={!imageAlt}>
          <Image
            src={imageSrc}
            alt={imageAlt ?? ""}
            fill
            priority={imagePriority}
            sizes="100vw"
            className="page-hero__image"
          />
        </div>
      ) : null}
      <div className="page-hero__content">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
        {actions ? <div className="page-hero__actions">{actions}</div> : null}
      </div>
    </section>
  );
}
