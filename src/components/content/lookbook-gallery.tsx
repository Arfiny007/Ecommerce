"use client";

import Image from "next/image";
import { useState } from "react";
import { LOOKBOOK_SPREADS } from "@/constants/content/lookbook";
import { Caption, Subheading } from "@/components/common/typography";
import { cn } from "@/lib/utils";

export function LookbookGallery() {
  const [activeId, setActiveId] = useState(LOOKBOOK_SPREADS[0].id);

  const active = LOOKBOOK_SPREADS.find((s) => s.id === activeId) ?? LOOKBOOK_SPREADS[0];

  return (
    <div>
      <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-3xl)] md:aspect-[16/10]">
        <Image
          key={active.id}
          src={`https://images.unsplash.com/${active.image}?w=1400&q=90&auto=format&fit=crop`}
          alt={active.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-8">
          <Caption>{active.season}</Caption>
          <Subheading as="h3" className="mt-2 text-foreground">
            {active.title}
          </Subheading>
          <p className="mt-2 text-sm text-muted-foreground">{active.caption}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-9">
        {LOOKBOOK_SPREADS.map((spread) => (
          <button
            key={spread.id}
            onClick={() => setActiveId(spread.id)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-[var(--radius-lg)] border-2 transition-luxury",
              activeId === spread.id
                ? "border-foreground"
                : "border-transparent opacity-60 hover:opacity-100"
            )}
            aria-label={`View ${spread.title}`}
          >
            <Image
              src={`https://images.unsplash.com/${spread.image}?w=200&q=80&auto=format&fit=crop`}
              alt={spread.title}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
