"use client";

import { useRef, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { LOOKBOOK_SLIDES } from "@/constants/home-content";
import { Container } from "@/components/common/container";
import { Eyebrow, Heading } from "@/components/common/typography";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const SLIDE_COUNT = LOOKBOOK_SLIDES.length;
const HORIZONTAL_SHIFT_PERCENT = -72;

/** Gaussian-ish falloff: 1 at center, fades to `min` within `spread` of scroll progress */
function falloff(progress: number, center: number, spread: number, min: number): number {
  const distance = Math.abs(progress - center);
  if (spread <= 0) return progress === center ? 1 : min;
  const t = Math.min(distance / spread, 1);
  return min + (1 - min) * (1 - t);
}

function slideCenter(index: number, total: number): number {
  if (total <= 1) return 0.5;
  return index / (total - 1);
}

export function HorizontalLookbook() {
  const targetRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, (progress) => {
    if (reducedMotion) return "0%";
    return `${progress * HORIZONTAL_SHIFT_PERCENT}%`;
  });

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      const section = targetRef.current;
      if (!section || reducedMotion) return;

      const rect = section.getBoundingClientRect();
      const inPinnedZone = rect.top <= 0 && rect.bottom >= window.innerHeight;
      if (!inPinnedZone) return;

      const maxScroll = section.offsetHeight - window.innerHeight;
      const currentScroll = -rect.top;

      if (
        (e.deltaY > 0 && currentScroll < maxScroll) ||
        (e.deltaY < 0 && currentScroll > 0)
      ) {
        e.preventDefault();
        window.scrollBy({ top: e.deltaY, behavior: "auto" });
      }
    },
    [reducedMotion]
  );

  useEffect(() => {
    if (reducedMotion) return;
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [handleWheel, reducedMotion]);

  const centers = useMemo(
    () => LOOKBOOK_SLIDES.map((_, i) => slideCenter(i, SLIDE_COUNT)),
    []
  );

  if (reducedMotion) {
    return (
      <section className="py-[var(--section-py-md)]">
        <Container className="mb-12">
          <Eyebrow>Lookbook</Eyebrow>
          <Heading className="mt-3">Spring Narratives</Heading>
        </Container>
        <div className="flex gap-4 overflow-x-auto px-[var(--space-5)] hide-scrollbar">
          {LOOKBOOK_SLIDES.map((slide) => (
            <LookbookSlide key={slide.id} slide={slide} tall />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={targetRef} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden bg-background">
        <Container className="mb-10 flex items-end justify-between">
          <div>
            <Eyebrow>Lookbook</Eyebrow>
            <Heading className="mt-3">Spring Narratives</Heading>
          </div>
          <p className="hidden text-xs uppercase tracking-editorial text-muted-foreground md:block">
            Scroll to journey →
          </p>
        </Container>

        <motion.div
          style={{ x }}
          className="flex gap-6 px-[var(--space-5)] will-change-transform sm:px-[var(--space-8)] lg:px-[var(--space-12)]"
        >
          {LOOKBOOK_SLIDES.map((slide, index) => (
            <ScrollScaledSlide
              key={slide.id}
              slide={slide}
              index={index}
              center={centers[index]}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface ScrollScaledSlideProps {
  slide: (typeof LOOKBOOK_SLIDES)[number];
  index: number;
  center: number;
  scrollYProgress: MotionValue<number>;
}

function ScrollScaledSlide({
  slide,
  index,
  center,
  scrollYProgress,
}: ScrollScaledSlideProps) {
  const scale = useTransform(scrollYProgress, (progress) =>
    falloff(progress, center, 0.15, 0.88)
  );

  const opacity = useTransform(scrollYProgress, (progress) =>
    falloff(progress, center, 0.2, 0.5)
  );

  return (
    <motion.div
      style={{ scale, opacity }}
      className="shrink-0 snap-center gpu-accelerated"
    >
      <LookbookSlide slide={slide} tall={index % 2 === 0} />
    </motion.div>
  );
}

function LookbookSlide({
  slide,
  tall = true,
}: {
  slide: (typeof LOOKBOOK_SLIDES)[number];
  tall?: boolean;
}) {
  return (
    <article className="group relative shrink-0">
      <div
        className={cn(
          "relative overflow-hidden rounded-[var(--radius-3xl)]",
          tall
            ? "h-[min(70vh,560px)] w-[min(42vw,380px)]"
            : "h-[min(58vh,460px)] w-[min(36vw,320px)]"
        )}
      >
        <Image
          src={`https://images.unsplash.com/${slide.image}?w=800&q=85&auto=format&fit=crop`}
          alt={slide.title}
          fill
          className="object-cover transition-luxury duration-700 group-hover:scale-[1.05]"
          sizes="400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <p className="text-[10px] uppercase tracking-editorial text-background/60">
            Look {slide.id}
          </p>
          <h3 className="mt-2 font-display text-2xl font-light text-background md:text-3xl">
            {slide.title}
          </h3>
          <p className="mt-2 max-w-xs text-sm text-background/70">{slide.caption}</p>
        </div>
      </div>
    </article>
  );
}

export function LookbookSection() {
  return <HorizontalLookbook />;
}
