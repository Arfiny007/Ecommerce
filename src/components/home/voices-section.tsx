"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/constants/home-content";
import { INSTAGRAM_FEED } from "@/constants/editorial";
import { socialLinks } from "@/constants/branding";
import { Section } from "@/components/common/section";
import { InstagramIcon } from "@/components/common/social-icons";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { luxuryEase } from "@/lib/animations";

/**
 * Voices — testimonial theatre above an instagram mosaic.
 * Unique stacked layout: carousel stage + social grid.
 */
export function VoicesSection() {
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

  return (
    <Section spacing="md" background="muted" headerAlign="center" eyebrow="Community" title="Voices of FINY">
      {/* Theatre stage — full-width quote */}
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[var(--radius-3xl)] border border-border-subtle bg-surface p-8 md:p-14">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -12 }}
            transition={{ duration: 0.5, ease: luxuryEase }}
            className="text-center"
          >
            <p className="font-display text-xl font-light italic leading-relaxed md:text-3xl">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <p className="mt-6 text-sm font-medium">{testimonial.author}</p>
            <p className="text-xs text-muted-foreground">
              {testimonial.role} · {testimonial.location}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Button variant="outline" size="icon" onClick={() => paginate(-1)} aria-label="Previous">
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
                className="h-1.5 rounded-full transition-luxury"
                style={{
                  width: i === active ? 20 : 6,
                  backgroundColor: i === active ? "var(--foreground)" : "var(--border)",
                }}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
          <Button variant="outline" size="icon" onClick={() => paginate(1)} aria-label="Next">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Instagram mosaic — separate visual rhythm below */}
      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <InstagramIcon className="h-4 w-4" aria-hidden />
            <span className="text-sm font-medium">@finyfashions</span>
          </div>
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-editorial text-muted-foreground hover:text-foreground"
          >
            Follow →
          </a>
        </div>
        <div className="grid grid-cols-4 gap-2 md:grid-cols-8 md:gap-2">
          {INSTAGRAM_FEED.map((item) => (
            <a
              key={item.id}
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-[var(--radius-md)]"
              aria-label={`Instagram post ${item.id}`}
            >
              <Image
                src={`https://images.unsplash.com/${item.image}?w=300&q=80&auto=format&fit=crop`}
                alt=""
                fill
                className="object-cover transition-luxury group-hover:scale-105"
                sizes="120px"
              />
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
