"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { getTransition } from "@/lib/motion-config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ProductGalleryLightboxProps {
  images: string[];
  productName: string;
  initialIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIndexChange: (index: number) => void;
}

export function ProductGalleryLightbox({
  images,
  productName,
  initialIndex,
  open,
  onOpenChange,
  onIndexChange,
}: ProductGalleryLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const touchStartX = useRef(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (open) setIndex(initialIndex);
  }, [open, initialIndex]);

  const goTo = useCallback(
    (next: number) => {
      const wrapped = (next + images.length) % images.length;
      setIndex(wrapped);
      onIndexChange(wrapped);
    },
    [images.length, onIndexChange]
  );

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(index + 1);
      if (e.key === "ArrowLeft") goTo(index - 1);
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, index, goTo, onOpenChange]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goTo(index + 1);
      else goTo(index - 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[100dvh] max-h-[100dvh] w-screen max-w-none rounded-none border-0 bg-background p-0">
        <DialogTitle className="sr-only">
          {productName} — image gallery
        </DialogTitle>

        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-[var(--radius-full)] surface-glass transition-luxury hover:scale-105"
          aria-label="Close gallery"
        >
          <X className="h-5 w-5" />
        </button>

        <div
          className="relative flex h-full items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0, scale: 1.02 }}
              transition={getTransition(reducedMotion, 0.4)}
              className="relative h-full w-full"
            >
              <Image
                src={images[index]}
                alt={`${productName} — image ${index + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <button
                onClick={() => goTo(index - 1)}
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-[var(--radius-full)] surface-glass transition-luxury hover:scale-105"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => goTo(index + 1)}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-[var(--radius-full)] surface-glass transition-luxury hover:scale-105"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to image ${i + 1}`}
              className={cn(
                "h-1.5 rounded-[var(--radius-full)] transition-luxury",
                i === index ? "w-6 bg-foreground" : "w-1.5 bg-muted-foreground/40"
              )}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
