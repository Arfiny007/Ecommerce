import Image from "next/image";
import type { StoreLocation } from "@/constants/content/company";

interface StoreLocationsGridProps {
  locations: StoreLocation[];
}

export function StoreLocationsGrid({ locations }: StoreLocationsGridProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {locations.map((store) => (
        <article
          key={store.id}
          className="overflow-hidden rounded-[var(--radius-2xl)] border border-border-subtle bg-surface"
        >
          <div className="relative aspect-[16/10]">
            <Image
              src={`https://images.unsplash.com/${store.image}?w=800&q=85&auto=format&fit=crop`}
              alt={store.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-6 md:p-8">
            <p className="text-xs font-medium uppercase tracking-editorial text-muted-foreground">
              {store.city}
            </p>
            <h3 className="mt-2 font-display text-xl font-light md:text-2xl">
              {store.name}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">{store.address}</p>
            <p className="mt-1 text-sm text-muted-foreground">{store.phone}</p>
            <p className="mt-3 text-xs text-muted-foreground">{store.hours}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {store.services.map((service) => (
                <span
                  key={service}
                  className="rounded-[var(--radius-full)] border border-border-subtle px-3 py-1 text-xs text-muted-foreground"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
