"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Expand, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getTransition } from "@/lib/motion-config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ProductGalleryLightbox } from "@/components/product/product-gallery-lightbox";
import type { Product } from "@/types/product";

interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const images = product.images;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const touchStartX = useRef(0);
  const reducedMotion = useReducedMotion();

  const goTo = useCallback(
    (index: number) => {
      setSelectedIndex((index + images.length) % images.length);
    },
    [images.length]
  );

  const goNext = useCallback(() => goTo(selectedIndex + 1), [goTo, selectedIndex]);
  const goPrev = useCallback(() => goTo(selectedIndex - 1), [goTo, selectedIndex]);

  useEffect(() => {
    const preload = (index: number) => {
      if (index >= 0 && index < images.length) {
        const img = new window.Image();
        img.src = images[index];
      }
    };
    preload(selectedIndex + 1);
    preload(selectedIndex - 1);
  }, [selectedIndex, images]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxOpen) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev, lightboxOpen]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin({ x, y });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  const secondaryImages = images.slice(1, 3);

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        {/* Vertical thumbnail strip — desktop */}
        <div
          className="hidden flex-col gap-3 md:flex"
          role="tablist"
          aria-label="Product images"
        >
          {images.map((image, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={selectedIndex === index}
              aria-label={`View image ${index + 1}`}
              onClick={() => setSelectedIndex(index)}
              className="relative h-20 w-16 shrink-0 overflow-hidden rounded-[var(--radius-lg)] border-2 transition-luxury focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {selectedIndex === index && (
                <motion.span
                  layoutId="pdp-thumb-active"
                  className="absolute inset-0 z-10 rounded-[var(--radius-lg)] border-2 border-foreground"
                  transition={getTransition(reducedMotion)}
                />
              )}
              <Image
                src={image}
                alt=""
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>

        {/* Bento layout */}
        <div className="flex-1 space-y-3">
          <div
            className="relative overflow-hidden rounded-[var(--radius-3xl)] bg-surface-muted"
            onMouseEnter={() => !reducedMotion && setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              onClick={() => setLightboxOpen(true)}
              className="relative block aspect-[4/5] w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Open fullscreen gallery"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={reducedMotion ? false : { opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reducedMotion ? undefined : { opacity: 0 }}
                  transition={getTransition(reducedMotion, 0.45)}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[selectedIndex]}
                    alt={`${product.name} — image ${selectedIndex + 1}`}
                    fill
                    className={cn(
                      "object-cover transition-luxury",
                      isZooming && !reducedMotion && "scale-150"
                    )}
                    style={
                      isZooming && !reducedMotion
                        ? { transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%` }
                        : undefined
                    }
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority={selectedIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </button>

            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-[var(--radius-full)] surface-glass shadow-soft transition-luxury hover:scale-105"
              aria-label="Expand to fullscreen"
            >
              <Expand className="h-4 w-4" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="icon-action absolute left-3 top-1/2 -translate-y-1/2 surface-glass shadow-soft md:hidden"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={goNext}
                  className="icon-action absolute right-3 top-1/2 -translate-y-1/2 surface-glass shadow-soft md:hidden"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}
          </div>

          {/* Bento secondary grid */}
          {secondaryImages.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {secondaryImages.map((image, i) => {
                const index = i + 1;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-[var(--radius-2xl)] transition-luxury focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      selectedIndex === index && "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                    )}
                    aria-label={`View image ${index + 1}`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover transition-luxury hover:scale-105"
                      sizes="25vw"
                      loading="lazy"
                    />
                  </button>
                );
              })}
            </div>
          )}

          {/* Horizontal thumbnails — mobile */}
          <div className="flex gap-2 overflow-x-auto pb-1 md:hidden" role="tablist">
            {images.map((image, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={selectedIndex === index}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "relative h-16 w-14 shrink-0 overflow-hidden rounded-[var(--radius-lg)] border-2 transition-luxury",
                  selectedIndex === index ? "border-foreground" : "border-transparent"
                )}
              >
                <Image src={image} alt="" fill className="object-cover" sizes="56px" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <ProductGalleryLightbox
        images={images}
        productName={product.name}
        initialIndex={selectedIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        onIndexChange={setSelectedIndex}
      />
    </>
  );
}
