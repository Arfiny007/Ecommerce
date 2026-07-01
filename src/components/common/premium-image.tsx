"use client";

import { useState, useRef, useCallback } from "react";
import Image, { type ImageProps } from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { getTransition } from "@/lib/motion-config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsTouchDevice } from "@/hooks/use-is-touch-device";

interface PremiumImageProps extends Omit<ImageProps, "onLoad"> {
  aspectRatio?: "square" | "portrait" | "landscape" | "editorial";
  rounded?: "md" | "lg" | "xl" | "2xl" | "3xl";
  zoomOnHover?: boolean;
  tiltOnHover?: boolean;
  overlay?: boolean;
  overlayClassName?: string;
  containerClassName?: string;
  revealMask?: boolean;
}

const aspectClasses = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  editorial: "aspect-[4/5]",
};

const roundedClasses = {
  md: "rounded-[var(--radius-md)]",
  lg: "rounded-[var(--radius-lg)]",
  xl: "rounded-[var(--radius-xl)]",
  "2xl": "rounded-[var(--radius-2xl)]",
  "3xl": "rounded-[var(--radius-3xl)]",
};

export function PremiumImage({
  aspectRatio = "portrait",
  rounded = "2xl",
  zoomOnHover = true,
  tiltOnHover = true,
  overlay = false,
  overlayClassName,
  containerClassName,
  revealMask = true,
  className,
  alt,
  ...props
}: PremiumImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!tiltOnHover || reducedMotion || isTouch || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
      const y = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
      setTilt({ x, y });
    },
    [isTouch, reducedMotion, tiltOnHover]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const enableTilt = tiltOnHover && !reducedMotion && !isTouch;

  return (
    <div
      ref={containerRef}
      data-cursor-image
      onMouseMove={enableTilt ? handleMouseMove : undefined}
      onMouseLeave={enableTilt ? handleMouseLeave : undefined}
      className={cn(
        "group relative overflow-hidden bg-surface-muted gpu-accelerated",
        aspectClasses[aspectRatio],
        roundedClasses[rounded],
        containerClassName
      )}
    >
      {!loaded && (
        <Skeleton className="absolute inset-0 h-full w-full animate-shimmer rounded-none" />
      )}

      {revealMask && !loaded && !reducedMotion && (
        <motion.div
          className="absolute inset-0 z-10 bg-background"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={getTransition(reducedMotion, 0.7)}
          style={{ transformOrigin: "left center" }}
          aria-hidden
        />
      )}

      <motion.div
        className="absolute inset-0"
        style={
          enableTilt
            ? {
                rotateX: tilt.x,
                rotateY: tilt.y,
                transformPerspective: 800,
              }
            : undefined
        }
        animate={enableTilt ? { rotateX: tilt.x, rotateY: tilt.y } : undefined}
        transition={getTransition(reducedMotion, 0.25)}
      >
        <Image
          alt={alt}
          fill
          className={cn(
            "object-cover transition-luxury",
            zoomOnHover && "group-hover:scale-[1.05]",
            !loaded && "opacity-0",
            loaded && "opacity-100",
            className
          )}
          onLoad={() => setLoaded(true)}
          {...props}
        />
      </motion.div>

      {/* Light reflection */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-background/20 via-transparent to-transparent opacity-0 transition-luxury group-hover:opacity-100"
      />

      {overlay && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 transition-luxury group-hover:opacity-100",
            overlayClassName
          )}
        />
      )}
    </div>
  );
}
