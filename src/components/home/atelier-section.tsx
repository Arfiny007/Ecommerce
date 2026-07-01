"use client";

import Image from "next/image";
import {
  CRAFTSMANSHIP,
  FABRIC_TECHNOLOGY,
  LUXURY_SERVICES,
} from "@/constants/editorial";
import { Section } from "@/components/common/section";
import { Eyebrow } from "@/components/common/typography";

const IMG = (id: string, w = 700) =>
  `https://images.unsplash.com/${id}?w=${w}&q=85&auto=format&fit=crop`;

/** Asymmetric bento — atelier craft, fibres, and client services in one grid */
export function AtelierSection() {
  const [hero, ...fabrics] = FABRIC_TECHNOLOGY.fabrics;
  const services = LUXURY_SERVICES.services.slice(0, 4);

  return (
    <Section spacing="md" background="muted" containerized={false} className="px-[var(--space-5)] sm:px-[var(--space-8)] lg:px-[var(--space-12)]">
      <div className="mx-auto max-w-[var(--container-default)]">
        <Eyebrow>{CRAFTSMANSHIP.eyebrow}</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-light md:text-4xl">
          The Atelier
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">{CRAFTSMANSHIP.lead}</p>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-6 md:grid-rows-4 md:gap-4">
          {/* Hero craft image — spans 4 cols, 2 rows */}
          <div className="relative col-span-2 row-span-2 overflow-hidden rounded-[var(--radius-2xl)] md:col-span-4 md:row-span-2">
            <Image
              src={IMG(CRAFTSMANSHIP.pillars[0].image, 1000)}
              alt={CRAFTSMANSHIP.pillars[0].title}
              fill
              className="object-cover"
              sizes="60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
              <p className="text-xs uppercase tracking-editorial text-background/70">Italian Tailoring</p>
              <p className="mt-2 max-w-sm text-sm text-background/90">
                {CRAFTSMANSHIP.pillars[0].body}
              </p>
            </div>
          </div>

          {/* Fabric swatches — stacked cells */}
          {fabrics.slice(0, 2).map((fabric) => (
            <div
              key={fabric.name}
              className="relative col-span-1 row-span-1 overflow-hidden rounded-[var(--radius-xl)] md:col-span-1 md:row-span-1"
            >
              <Image
                src={IMG(fabric.image, 400)}
                alt={fabric.name}
                fill
                className="object-cover"
                sizes="20vw"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-foreground/40 p-3">
                <p className="text-micro-caps text-background/80">
                  {fabric.composition}
                </p>
                <p className="text-xs font-medium text-background">{fabric.name}</p>
              </div>
            </div>
          ))}

          {/* Wide fabric strip */}
          <div className="relative col-span-2 overflow-hidden rounded-[var(--radius-xl)] md:col-span-4 md:row-span-1">
            <Image
              src={IMG(hero.image, 1200)}
              alt={hero.name}
              fill
              className="object-cover"
              sizes="80vw"
            />
            <div className="absolute inset-0 flex items-center justify-between bg-foreground/50 px-6">
              <div>
                <p className="text-xs uppercase tracking-editorial text-background/70">
                  {FABRIC_TECHNOLOGY.eyebrow}
                </p>
                <p className="font-display text-lg font-light text-background">{hero.name}</p>
              </div>
              <p className="hidden max-w-xs text-right text-xs text-background/80 md:block">
                {hero.detail}
              </p>
            </div>
          </div>

          {/* Services — typographic cells, no imagery */}
          <div className="col-span-2 grid grid-cols-2 gap-3 md:col-span-6 md:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-[var(--radius-xl)] border border-border-subtle bg-surface p-4"
              >
                <service.icon className="h-4 w-4 text-muted-foreground" aria-hidden />
                <p className="mt-3 text-xs font-medium">{service.title}</p>
                <p className="text-caption mt-1 leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <blockquote className="mt-8 border-l-2 border-foreground pl-6">
          <p className="font-display text-lg font-light italic">
            &ldquo;{CRAFTSMANSHIP.quote.text}&rdquo;
          </p>
          <cite className="mt-2 block text-xs not-italic text-muted-foreground">
            — {CRAFTSMANSHIP.quote.attribution}
          </cite>
        </blockquote>
      </div>
    </Section>
  );
}
