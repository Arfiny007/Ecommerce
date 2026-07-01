import Image from "next/image";
import { cn } from "@/lib/utils";

interface FabricItem {
  name: string;
  composition: string;
  weight: string;
  origin: string;
  image: string;
  detail: string;
}

interface MaterialShowcaseProps {
  fabrics: FabricItem[];
  className?: string;
}

export function MaterialShowcase({ fabrics, className }: MaterialShowcaseProps) {
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2", className)}>
      {fabrics.map((fabric) => (
        <article
          key={fabric.name}
          className="overflow-hidden rounded-[var(--radius-2xl)] border border-border-subtle"
        >
          <div className="relative aspect-[16/10]">
            <Image
              src={`https://images.unsplash.com/${fabric.image}?w=600&q=85&auto=format&fit=crop`}
              alt={fabric.name}
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div className="p-5">
            <h3 className="font-display text-lg font-light">{fabric.name}</h3>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>
                <dt className="uppercase tracking-editorial">Composition</dt>
                <dd className="mt-0.5 text-foreground">{fabric.composition}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-editorial">Weight</dt>
                <dd className="mt-0.5 text-foreground">{fabric.weight}</dd>
              </div>
              <div className="col-span-2">
                <dt className="uppercase tracking-editorial">Origin</dt>
                <dd className="mt-0.5 text-foreground">{fabric.origin}</dd>
              </div>
            </dl>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {fabric.detail}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
