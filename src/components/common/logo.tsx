"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { shortName, logoSubtitle } from "@/constants/branding";

const sizeStyles = {
  sm: {
    primary: "text-lg tracking-[0.25em]",
    subtitle: "text-[8px] tracking-[0.35em]",
    gap: "gap-0.5",
  },
  md: {
    primary: "text-xl tracking-[0.3em] md:text-2xl",
    subtitle: "text-[9px] tracking-[0.4em] md:text-[10px]",
    gap: "gap-1",
  },
  lg: {
    primary: "text-3xl tracking-[0.3em] md:text-4xl",
    subtitle: "text-[10px] tracking-[0.45em] md:text-xs",
    gap: "gap-1",
  },
  xl: {
    primary: "text-4xl tracking-[0.35em] md:text-5xl lg:text-6xl",
    subtitle: "text-xs tracking-[0.5em] md:text-sm",
    gap: "gap-1.5",
  },
} as const;

interface LogoProps {
  size?: keyof typeof sizeStyles;
  showSubtitle?: boolean;
  className?: string;
  subtitleClassName?: string;
  asLink?: boolean;
  animated?: boolean;
  variant?: "default" | "inverse";
}

export function Logo({
  size = "md",
  showSubtitle = true,
  className,
  subtitleClassName,
  asLink = true,
  animated = false,
  variant = "default",
}: LogoProps) {
  const styles = sizeStyles[size];
  const isInverse = variant === "inverse";

  const content = (
    <motion.div
      className={cn(
        "group inline-flex flex-col items-center",
        styles.gap,
        className
      )}
      whileHover={animated ? { scale: 1.02 } : undefined}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        className={cn(
          "font-display font-light leading-none transition-opacity duration-300 group-hover:opacity-80",
          styles.primary,
          isInverse ? "text-white" : "text-foreground"
        )}
      >
        {shortName}
      </span>
      {showSubtitle && (
        <span
          className={cn(
            "font-sans font-medium uppercase leading-none transition-opacity duration-300 group-hover:opacity-70",
            styles.subtitle,
            isInverse ? "text-white/70" : "text-muted-foreground",
            subtitleClassName
          )}
        >
          {logoSubtitle}
        </span>
      )}
    </motion.div>
  );

  if (asLink) {
    return (
      <Link href="/" aria-label={`${shortName} ${logoSubtitle} — Home`} className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}
