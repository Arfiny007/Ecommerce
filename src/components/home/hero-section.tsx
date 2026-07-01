"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { hero, tagline } from "@/constants/branding";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";
import { Display, Lead, Eyebrow } from "@/components/common/typography";

export function HeroSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=85&auto=format&fit=crop"
          alt={hero.season}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-foreground/30" />
        <div className="absolute inset-0 bg-radial-vignette" aria-hidden />
      </div>

      <Container className="relative z-raised pb-20 pt-32 md:pb-28">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="max-w-3xl"
        >
          <Eyebrow className="mb-4 text-white/70">{hero.season}</Eyebrow>
          <Display className="text-background">
            {hero.headline}
            <br />
            <span className="italic">{hero.headlineAccent}</span> {hero.headlineEnd}
          </Display>
          <Lead className="mt-6 max-w-lg text-background/80">{tagline}</Lead>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              variant="cta"
              size="xl"
              asChild
              className="bg-background text-foreground hover:bg-background/90"
            >
              <Link href="/shop">
                Explore Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="xl"
              asChild
              className="border-background/30 text-background hover:bg-background/10"
            >
              <Link href="/#story">Our Story</Link>
            </Button>
          </div>
        </motion.div>
      </Container>

      {!reducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          aria-hidden
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-editorial text-background/50">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="h-8 w-px bg-background/40"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
