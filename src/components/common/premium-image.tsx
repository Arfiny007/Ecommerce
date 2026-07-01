"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface PremiumImageProps extends Omit<ImageProps, "onLoad"> {
  aspectRatio?: "square" | "portrait" | "landscape" | "editorial";
  rounded?: "md" | "lg" | "xl" | "2xl" | "3xl";
  zoomOnHover?: boolean;
  overlay?: boolean;
  overlayClassName?: string;
  containerClassName?: string;
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
  overlay = false,
  overlayClassName,
  containerClassName,
  className,
  alt,
  ...props
}: PremiumImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn(
        "group relative overflow-hidden bg-surface-muted",
        aspectClasses[aspectRatio],
        roundedClasses[rounded],
        containerClassName
      )}
    >
      {!loaded && (
        <Skeleton className="absolute inset-0 h-full w-full animate-shimmer rounded-none" />
      )}
      <Image
        alt={alt}
        fill
        className={cn(
          "object-cover transition-luxury",
          zoomOnHover && "group-hover:scale-[1.04]",
          !loaded && "opacity-0",
          loaded && "opacity-100",
          className
        )}
        onLoad={() => setLoaded(true)}
        {...props}
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
