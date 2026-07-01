"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { brandStory } from "@/constants/branding";
import { BRAND_TIMELINE, BRAND_QUOTE } from "@/constants/home-content";
import { Section } from "@/components/common/section";
import { Body, Eyebrow, Heading } from "@/components/common/typography";
import { MotionWrapper, MotionStagger, MotionItem } from "@/components/common/motion-wrapper";
import { ParallaxLayer } from "@/components/home/parallax-layer";
import { Surface } from "@/components/common/surface";

const STORY_IMAGES = [
  "photo-1469334031218-e382a71b716b",
  "photo-1483985988355-763728e1935b",
];

export function BrandStory() {
  return (
    <Section
      id="story"
      spacing="lg"
      background="gradient"
      containerized={false}
      className="overflow-hidden"
    >
      <div className="px-[var(--space-5)] sm:px-[var(--space-8)] lg:px-[var(--space-12)]">
        <div className="mx-auto max-w-[var(--container-default)]">
          <MotionWrapper variant="blur" className="mx-auto max-w-3xl text-center">
            <Eyebrow>{brandStory.eyebrow}</Eyebrow>
            <Heading className="mt-4">{brandStory.heading}</Heading>
            <Body className="mx-auto mt-6 prose-width">{brandStory.body}</Body>
          </MotionWrapper>

          <div className="relative mt-20 grid gap-8 lg:grid-cols-12">
            <ParallaxLayer speed={0.15} className="lg:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-3xl)]">
                <Image
                  src={`https://images.unsplash.com/${STORY_IMAGES[0]}?w=700&q=85&auto=format&fit=crop`}
                  alt="Brand heritage"
                  fill
                  className="object-cover"
                  sizes="40vw"
                />
              </div>
            </ParallaxLayer>

            <div className="flex flex-col justify-center lg:col-span-7">
              <MotionStagger className="relative space-y-0 border-l border-border-subtle pl-8">
                {BRAND_TIMELINE.map((item, index) => (
                  <MotionItem key={item.year}>
                    <div className="relative pb-12 last:pb-0">
                      <div className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-[var(--radius-full)] bg-foreground" />
                      <p className="font-display text-3xl font-light text-muted-foreground">
                        {item.year}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-light">{item.title}</h3>
                      <p className="mt-2 max-w-md text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      {index < BRAND_TIMELINE.length - 1 && (
                        <div className="absolute bottom-0 left-0 h-px w-16 bg-border-subtle" />
                      )}
                    </div>
                  </MotionItem>
                ))}
              </MotionStagger>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-24"
          >
            <Surface variant="elevated" rounded="3xl" padding="lg" className="mx-auto max-w-4xl">
              <span
                className="font-display text-[6rem] leading-none text-foreground/10"
                aria-hidden
              >
                &ldquo;
              </span>
              <blockquote className="-mt-12 font-display text-2xl font-light leading-[var(--leading-snug)] md:text-3xl">
                {BRAND_QUOTE.text}
              </blockquote>
              <cite className="mt-6 block text-sm not-italic text-muted-foreground">
                — {BRAND_QUOTE.attribution}
              </cite>
            </Surface>

            <ParallaxLayer speed={-0.2} className="absolute -right-4 -top-12 hidden w-48 lg:block">
              <div className="relative aspect-square overflow-hidden rounded-[var(--radius-2xl)] shadow-luxury">
                <Image
                  src={`https://images.unsplash.com/${STORY_IMAGES[1]}?w=400&q=85&auto=format&fit=crop`}
                  alt="Editorial detail"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            </ParallaxLayer>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
