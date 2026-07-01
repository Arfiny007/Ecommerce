"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/constants/home-content";
import { Section } from "@/components/common/section";
import { Surface } from "@/components/common/surface";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { luxuryEase } from "@/lib/animations";

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const reducedMotion = useReducedMotion();

  const paginate = useCallback((dir: number) => {
    setDirection(dir);
    setActive((prev) => {
      const next = prev + dir;
      if (next < 0) return TESTIMONIALS.length - 1;
      if (next >= TESTIMONIALS.length) return 0;
      return next;
    });
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => paginate(1), 7000);
    return () => clearInterval(timer);
  }, [paginate, reducedMotion]);

  const testimonial = TESTIMONIALS[active];

  const variants = {
    enter: (dir: number) => ({
      x: reducedMotion ? 0 : dir > 0 ? 80 : -80,
      opacity: 0,
      filter: reducedMotion ? "blur(0px)" : "blur(8px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      x: reducedMotion ? 0 : dir > 0 ? -80 : 80,
      opacity: 0,
      filter: reducedMotion ? "blur(0px)" : "blur(8px)",
    }),
  };

  return (
    <Section
      spacing="lg"
      background="muted"
      eyebrow="Testimonials"
      title="Voices of FINY"
      headerAlign="center"
    >
      <div className="relative mx-auto max-w-4xl">
        <span
          className="pointer-events-none absolute -left-4 -top-8 font-display text-[10rem] leading-none text-foreground/5 select-none md:-left-12"
          aria-hidden
        >
          &ldquo;
        </span>

        <div className="relative min-h-[280px] overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: luxuryEase }}
            >
              <Surface variant="elevated" rounded="3xl" padding="lg" className="text-center shadow-luxury">
                <p className="font-display text-xl font-light leading-[var(--leading-relaxed)] italic md:text-2xl">
                  {testimonial.quote}
                </p>
                <div className="mt-8">
                  <p className="text-sm font-medium tracking-wide">{testimonial.author}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {testimonial.role} · {testimonial.location}
                  </p>
                </div>
              </Surface>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => paginate(-1)}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > active ? 1 : -1);
                  setActive(i);
                }}
                className="h-1.5 rounded-[var(--radius-full)] transition-luxury"
                style={{
                  width: i === active ? 24 : 8,
                  backgroundColor:
                    i === active ? "var(--foreground)" : "var(--border)",
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => paginate(1)}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Section>
  );
}
