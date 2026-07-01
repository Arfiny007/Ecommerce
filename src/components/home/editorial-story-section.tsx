"use client";

import Image from "next/image";
import { EDITORIAL_CHAPTERS } from "@/constants/home-content";
import { Section } from "@/components/common/section";
import { Eyebrow, Heading, Body } from "@/components/common/typography";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { ParallaxLayer } from "@/components/home/parallax-layer";
import { cn } from "@/lib/utils";

export function EditorialStorySection() {
  return (
    <div id="editorial" className="overflow-hidden">
      {EDITORIAL_CHAPTERS.map((chapter, index) => {
        const isRight = chapter.align === "right";
        const isEven = index % 2 === 0;

        return (
          <Section
            key={chapter.id}
            spacing={index === 0 ? "lg" : "md"}
            background={isEven ? "default" : "muted"}
            noPadding={false}
          >
            <div
              className={cn(
                "grid items-center gap-12 lg:grid-cols-12 lg:gap-20",
                isRight && "lg:[direction:rtl]"
              )}
            >
              <MotionWrapper
                variant="blur"
                className={cn(
                  "lg:col-span-7 lg:[direction:ltr]",
                  isRight ? "lg:col-start-6" : ""
                )}
              >
                <ParallaxLayer speed={isEven ? 0.2 : -0.15}>
                  <div className="relative">
                    <div
                      className={cn(
                        "relative aspect-[4/5] overflow-hidden rounded-[var(--radius-3xl)]",
                        isRight ? "lg:ml-auto lg:max-w-lg" : "lg:max-w-lg"
                      )}
                    >
                      <Image
                        src={`https://images.unsplash.com/${chapter.image}?w=900&q=85&auto=format&fit=crop`}
                        alt={chapter.title.replace("\n", " ")}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 45vw"
                      />
                    </div>
                    <div
                      className={cn(
                        "absolute -bottom-6 font-display text-[8rem] font-light leading-none text-foreground/5 select-none",
                        isRight ? "-left-8" : "-right-8"
                      )}
                      aria-hidden
                    >
                      {chapter.id}
                    </div>
                  </div>
                </ParallaxLayer>
              </MotionWrapper>

              <MotionWrapper
                variant="fadeUp"
                delay={0.15}
                className={cn("lg:col-span-5 lg:[direction:ltr]", isRight && "lg:col-start-1 lg:row-start-1")}
              >
                <div className={cn("max-w-md", isRight ? "lg:mr-auto" : "")}>
                  <Eyebrow>{chapter.eyebrow}</Eyebrow>
                  <Heading className="mt-4 whitespace-pre-line">{chapter.title}</Heading>
                  <Body className="mt-6">{chapter.body}</Body>
                  <div className="mt-8 h-px w-16 bg-foreground" />
                </div>
              </MotionWrapper>
            </div>
          </Section>
        );
      })}
    </div>
  );
}