import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageWithCaptionProps {
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: "portrait" | "landscape" | "square";
  className?: string;
  priority?: boolean;
}

const aspectClasses = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[16/10]",
  square: "aspect-square",
};

export function ImageWithCaption({
  src,
  alt,
  caption,
  aspectRatio = "landscape",
  className,
  priority,
}: ImageWithCaptionProps) {
  return (
    <figure className={cn("group", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-[var(--radius-2xl)]",
          aspectClasses[aspectRatio]
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="image-hover-zoom"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs uppercase tracking-editorial text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
