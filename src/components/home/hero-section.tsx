"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { hero, tagline } from "@/constants/branding";
import { HERO_VIDEO } from "@/constants/home-content";
import { getFeaturedProducts } from "@/constants/products";
import { formatPrice } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";
import { Eyebrow, Lead } from "@/components/common/typography";
import { TextReveal, LineReveal } from "@/components/home/text-reveal";
import { Surface } from "@/components/common/surface";

const FLOATING_PRODUCTS = getFeaturedProducts().slice(0, 2);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const reducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [1, 1.12]);
  const bgY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, 60]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    const play = () => {
      video.play().catch(() => setVideoFailed(true));
    };

    video.addEventListener("canplay", () => {
      setVideoReady(true);
      play();
    });
    video.addEventListener("error", () => setVideoFailed(true));

    return () => {
      video.removeEventListener("canplay", play);
    };
  }, [reducedMotion]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    mouseX.set(x * 24);
    mouseY.set(y * 16);
  };

  const showVideo = !reducedMotion && !videoFailed;

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[100dvh] items-stretch overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={{ scale: bgScale, y: bgY }}
      >
        {showVideo ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={HERO_VIDEO.poster}
            aria-hidden
          >
            <source src={HERO_VIDEO.src} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={HERO_VIDEO.poster}
            alt={hero.season}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/40 to-foreground/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-foreground/30" />
        <div className="absolute inset-0 bg-radial-vignette" aria-hidden />
        <div className="absolute inset-0 bg-radial-bloom opacity-40" aria-hidden />
        <div className="absolute inset-0 bg-noise" aria-hidden />
      </motion.div>

      <Container className="relative z-raised flex min-h-[100dvh] items-end pb-24 pt-28 lg:items-center lg:pb-0">
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="grid w-full items-end gap-12 lg:grid-cols-12 lg:items-center lg:gap-8"
        >
          <div className="lg:col-span-7 xl:col-span-6">
            <LineReveal delay={0.2}>
              <Eyebrow className="mb-6 text-background/70">{hero.season}</Eyebrow>
            </LineReveal>

            <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-light leading-[0.95] tracking-[var(--tracking-tighter)] text-background">
              <LineReveal delay={0.35}>
                <span className="block">
                  <TextReveal delay={0.4}>{hero.headline}</TextReveal>
                </span>
              </LineReveal>
              <LineReveal delay={0.55} className="mt-1">
                <span className="block italic">
                  <TextReveal delay={0.6}>{hero.headlineAccent}</TextReveal>
                </span>
              </LineReveal>
              <LineReveal delay={0.75} className="mt-1">
                <span className="block">
                  <TextReveal delay={0.8}>{hero.headlineEnd}</TextReveal>
                </span>
              </LineReveal>
            </h1>

            <LineReveal delay={1}>
              <Lead className="mt-8 max-w-md text-background/75">{tagline}</Lead>
            </LineReveal>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
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
            </motion.div>
          </div>

          <div className="relative hidden lg:col-span-5 lg:block xl:col-span-6">
            <div className="relative mx-auto h-[520px] w-full max-w-md">
              {FLOATING_PRODUCTS.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.9 + index * 0.15,
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute w-[220px]"
                  style={{
                    x: springX,
                    y: springY,
                    rotate: index === 0 ? -4 : 5,
                    top: index === 0 ? "8%" : "38%",
                    right: index === 0 ? "12%" : "28%",
                    zIndex: index === 0 ? 2 : 1,
                  }}
                >
                  <Link href={`/product/${product.slug}`}>
                    <Surface
                      variant="glass"
                      rounded="2xl"
                      padding="sm"
                      className="overflow-hidden shadow-luxury transition-luxury hover:shadow-luxury"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-xl)]">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="220px"
                        />
                      </div>
                      <div className="mt-3 px-1 pb-1">
                        <p className="text-xs font-medium text-background">{product.name}</p>
                        <p className="text-[10px] text-background/60">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </Surface>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute bottom-8 left-0 surface-glass rounded-[var(--radius-full)] px-4 py-2 text-[10px] uppercase tracking-editorial text-background/80"
              >
                SS26 — Now Available
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>

      {!reducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-8 left-1/2 z-raised -translate-x-1/2"
          aria-hidden
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] uppercase tracking-editorial text-background/50">
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex h-10 w-6 items-start justify-center rounded-[var(--radius-full)] border border-background/30 p-1.5"
            >
              <motion.div
                animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <ArrowDown className="h-3 w-3 text-background/70" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {!videoReady && showVideo && (
        <div className="pointer-events-none absolute inset-0 z-10 bg-foreground/20" aria-hidden />
      )}
    </section>
  );
}
