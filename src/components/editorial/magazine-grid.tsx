import Image from "next/image";
import { cn } from "@/lib/utils";

interface MagazineGridItem {
  src: string;
  alt: string;
  span?: "normal" | "tall" | "wide";
}

interface MagazineGridProps {
  items: MagazineGridItem[];
  className?: string;
}

export function MagazineGrid({ items, className }: MagazineGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4",
        className
      )}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            "relative overflow-hidden rounded-[var(--radius-xl)]",
            item.span === "tall" && "row-span-2 aspect-[3/5]",
            item.span === "wide" && "col-span-2 aspect-[16/9]",
            !item.span && "aspect-square",
            i === 0 && !item.span && "col-span-2 aspect-[16/10] md:col-span-2"
          )}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      ))}
    </div>
  );
}
