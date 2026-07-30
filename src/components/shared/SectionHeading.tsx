type SectionHeadingProps = {
  align?: "left" | "center";
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ align = "left", eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
