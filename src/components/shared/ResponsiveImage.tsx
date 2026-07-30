import Image, { type ImageProps } from "next/image";

type ResponsiveImageProps = ImageProps & {
  frameClassName?: string;
};

export function ResponsiveImage({ className, frameClassName, sizes, ...props }: ResponsiveImageProps) {
  return (
    <div className={["responsive-image", frameClassName].filter(Boolean).join(" ")}>
      <Image
        className={["responsive-image__media", className].filter(Boolean).join(" ")}
        sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
        {...props}
      />
    </div>
  );
}
