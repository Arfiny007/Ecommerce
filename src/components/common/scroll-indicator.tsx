"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

export function ScrollIndicator() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-navbar h-px origin-left bg-foreground"
      style={{ scaleX: progress }}
      aria-hidden
    />
  );
}
