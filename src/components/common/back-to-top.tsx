"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { getTransition } from "@/lib/motion-config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: 16 }}
          transition={getTransition(reducedMotion, 0.3)}
          className="fixed bottom-8 right-8 z-overlay"
        >
          <Magnetic>
            <Button
            variant="outline"
            size="icon"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="surface-glass shadow-soft"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          </Magnetic>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
