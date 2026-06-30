"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";
import { Display, Lead } from "@/components/common/typography";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=85&auto=format&fit=crop"
          alt="Spring Summer Collection"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
      </div>

      <Container className="relative z-10 pb-20 pt-32 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-white/70">
            Spring / Summer 2026
          </p>
          <Display className="text-white">
            The Art of
            <br />
            <span className="italic">Considered</span> Living
          </Display>
          <Lead className="mt-6 max-w-lg text-white/80">
            Discover meticulously crafted essentials for those who seek beauty in every detail.
          </Lead>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button variant="luxury" size="xl" asChild className="bg-white text-black hover:bg-white/90">
              <Link href="/shop">
                Explore Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="xl"
              asChild
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Link href="/#story">Our Story</Link>
            </Button>
          </div>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="h-8 w-px bg-white/40"
          />
        </div>
      </motion.div>
    </section>
  );
}
