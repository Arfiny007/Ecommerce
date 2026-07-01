import Image from "next/image";
import { cn } from "@/lib/utils";

interface CollageImage {
  src: string;
  alt: string;
}

interface ImageCollageProps {
  images: CollageImage[];
  className?: string;
}

export function ImageCollage({ images, className }: ImageCollageProps) {
  const [main, ...rest] = images;

  return (
    <div className={cn("grid grid-cols-12 gap-3", className)}>
      {main && (
        <div className="relative col-span-12 aspect-[16/10] overflow-hidden rounded-[var(--radius-2xl)] md:col-span-7 md:aspect-[4/5] md:row-span-2">
          <Image src={main.src} alt={main.alt} fill className="object-cover" sizes="40vw" priority />
        </div>
      )}
      {rest.map((img, i) => (
        <div
          key={i}
          className={cn(
            "relative overflow-hidden rounded-[var(--radius-xl)]",
            i === 0 ? "col-span-6 aspect-square md:col-span-5" : "col-span-6 aspect-[4/3] md:col-span-5"
          )}
        >
          <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="25vw" />
        </div>
      ))}
    </div>
  );
}
