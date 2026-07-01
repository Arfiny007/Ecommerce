"use client";

import Image from "next/image";
import { brandStory } from "@/constants/branding";
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { Heading, Eyebrow, Body } from "@/components/common/typography";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { PremiumImage } from "@/components/common/premium-image";

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
    <Section noPadding containerized={false} className="overflow-hidden py-[var(--section-py-md)]">
      <Container className="mb-12">
        <Eyebrow>Lookbook</Eyebrow>
        <Heading className="mt-3">Spring Narratives</Heading>
      </Container>

      <div className="flex gap-4 overflow-x-auto px-[var(--space-5)] pb-4 hide-scrollbar sm:px-[var(--space-8)] lg:px-[var(--space-12)]">
        {LOOKBOOK_IMAGES.map((id, index) => (
          <MotionWrapper
            key={id}
            variant="image"
            delay={index * 0.08}
            className="shrink-0"
          >
            <div
              className="relative overflow-hidden rounded-[var(--radius-3xl)]"
              style={{
                width: index % 2 === 0 ? "320px" : "260px",
                height: index % 2 === 0 ? "480px" : "400px",
              }}
            >
              <Image
                src={`https://images.unsplash.com/${id}?w=640&q=85&auto=format&fit=crop`}
                alt={`Lookbook ${index + 1}`}
                fill
                className="object-cover transition-luxury hover:scale-[1.04]"
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
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <MotionWrapper variant="image" className="lg:col-span-6">
          <PremiumImage
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=85&auto=format&fit=crop"
            alt="Editorial"
            aspectRatio="editorial"
            rounded="3xl"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </MotionWrapper>
        <MotionWrapper variant="fadeUp" delay={0.15} className="lg:col-span-6">
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
    <Section
      id="story"
      background="gradient"
      eyebrow={brandStory.eyebrow}
      title={brandStory.heading}
      headerAlign="center"
    >
      <MotionWrapper variant="blur" className="mx-auto max-w-2xl text-center">
        <Body className="mx-auto prose-width">{brandStory.body}</Body>
      </MotionWrapper>
    </Section>
  );
}
