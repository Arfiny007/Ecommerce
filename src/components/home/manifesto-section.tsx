"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EDITORIAL_CHAPTERS } from "@/constants/home-content";
import { Container } from "@/components/common/container";
import { Eyebrow, Display, Body } from "@/components/common/typography";
import { Button } from "@/components/ui/button";

const IMG = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?w=${w}&q=85&auto=format&fit=crop`;

/**
 * Typographic manifesto — single-column editorial flow with full-bleed image breaks.
 * No side-by-side image/text splits.
 */
export function ManifestoSection() {
  return (
    <section id="editorial" className="py-[var(--section-py-md)]">
      <Container size="narrow" className="text-center">
        <Eyebrow>Manifesto</Eyebrow>
        <Display className="mt-4 text-4xl md:text-5xl">
          Three Chapters on Quiet Luxury
        </Display>
      </Container>

      <div className="mt-12 space-y-0">
        {EDITORIAL_CHAPTERS.map((chapter, index) => (
          <article key={chapter.id}>
            {/* Full-bleed image break */}
            <div className="relative aspect-[21/9] w-full overflow-hidden">
              <Image
                src={IMG(chapter.image)}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-foreground/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-[clamp(4rem,12vw,10rem)] font-light text-background/25">
                  {chapter.id}
                </span>
              </div>
            </div>

            {/* Narrow typographic column */}
            <Container size="narrow" className="py-10 md:py-14">
              <p className="text-xs uppercase tracking-editorial text-muted-foreground">
                {chapter.eyebrow}
              </p>
              <h3 className="mt-4 whitespace-pre-line font-display text-3xl font-light leading-tight md:text-4xl">
                {chapter.title}
              </h3>
              <Body className="mt-6">{chapter.body}</Body>
              {"pullQuote" in chapter && chapter.pullQuote && (
                <p className="mt-8 text-center font-display text-xl font-light italic text-muted-foreground md:text-2xl">
                  &ldquo;{chapter.pullQuote}&rdquo;
                </p>
              )}
            </Container>

            {/* Detail texture — inset mosaic, not a split */}
            {"detailImage" in chapter && chapter.detailImage && (
              <div className="flex justify-center gap-3 px-[var(--space-5)] pb-10">
                <div className="relative h-32 w-32 overflow-hidden rounded-[var(--radius-xl)] md:h-40 md:w-40">
                  <Image
                    src={IMG(chapter.detailImage, 400)}
                    alt="Material detail"
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      <Container size="narrow" className="text-center">
        <Button variant="outline" asChild>
          <Link href="/journal">
            Read the Journal
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </Container>
    </section>
  );
}
