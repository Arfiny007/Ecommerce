"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  offset?: [number, number];
}

export function ParallaxLayer({
  children,
  className,
  speed = 0.3,
  offset = [0, 1],
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    offset,
    reducedMotion ? [0, 0] : [speed * 60, speed * -60]
  );

  return (
    <motion.div ref={ref} style={{ y }} className={cn("gpu-accelerated", className)}>
      {children}
    </motion.div>
  );
}

interface ScrollParallaxProps {
  children: React.ReactNode;
  className?: string;
  inputRange?: number[];
  outputRange?: (number | string)[];
}

export function ScrollParallax({
  children,
  className,
  inputRange = [0, 1],
  outputRange = [0, -80],
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    inputRange,
    reducedMotion ? [0, 0] : (outputRange as [number, number])
  );

  return (
    <motion.div ref={ref} style={{ y }} className={cn(className)}>
      {children}
    </motion.div>
  );
}
