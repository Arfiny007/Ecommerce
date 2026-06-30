"use client";

import Image from "next/image";
import { Section } from "@/components/common/section";
import { Heading, Eyebrow, Body } from "@/components/common/typography";
import { MotionWrapper } from "@/components/common/motion-wrapper";

const LOOKBOOK_IMAGES = [
  "photo-1509631179647-0177331693ae",
  "photo-1483985988355-763728e1935b",
  "photo-1490481651871-ab68de25d43d",
  "photo-1515886657613-9f3515b0c78f",
  "photo-1558618666-fcd25c85f82e",
  "photo-1445205170230-053b83016050",
];

export function LookbookSection() {
  return (
    <Section noPadding className="overflow-hidden py-16 md:py-24">
      <div className="mb-12 px-5 sm:px-8 lg:px-12">
        <Eyebrow>Lookbook</Eyebrow>
        <Heading className="mt-3">Spring Narratives</Heading>
      </div>

      <div className="flex gap-4 overflow-x-auto px-5 pb-4 hide-scrollbar sm:px-8 lg:px-12">
        {LOOKBOOK_IMAGES.map((id, index) => (
          <MotionWrapper
            key={id}
            variant="fadeUp"
            delay={index * 0.1}
            className="shrink-0"
          >
            <div
              className="relative overflow-hidden rounded-3xl"
              style={{
                width: index % 2 === 0 ? "320px" : "260px",
                height: index % 2 === 0 ? "480px" : "400px",
              }}
            >
              <Image
                src={`https://images.unsplash.com/${id}?w=640&q=85&auto=format&fit=crop`}
                alt={`Lookbook ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="320px"
              />
            </div>
          </MotionWrapper>
        ))}
      </div>
    </Section>
  );
}

export function EditorialSection() {
  return (
    <Section id="editorial">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <MotionWrapper variant="fadeUp">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=85&auto=format&fit=crop"
              alt="Editorial"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </MotionWrapper>
        <MotionWrapper variant="fadeUp" delay={0.2}>
          <Eyebrow>Editorial</Eyebrow>
          <Heading className="mt-4">
            Materiality
            <br />
            &amp; Form
          </Heading>
          <Body className="mt-6 max-w-md">
            Each piece in our collection is born from an obsession with material integrity
            and timeless design. We partner with artisans who share our commitment to
            craft, creating objects that transcend seasons.
          </Body>
        </MotionWrapper>
      </div>
    </Section>
  );
}

export function BrandStory() {
  return (
    <Section id="story" className="luxury-gradient">
      <div className="mx-auto max-w-3xl text-center">
        <MotionWrapper variant="blur">
          <Eyebrow>Our Story</Eyebrow>
          <Heading className="mt-4">
            Founded on the belief that luxury is found in restraint
          </Heading>
          <Body className="mx-auto mt-6 max-w-xl">
            MAISON was established to curate a world where exceptional craftsmanship
            meets contemporary sensibility. Every object we offer has been selected
            for its ability to enrich daily rituals with quiet elegance.
          </Body>
        </MotionWrapper>
      </div>
    </Section>
  );
}
