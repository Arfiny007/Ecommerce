"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/common/logo";
import { blurReveal } from "@/lib/animations";
import { motionTokens } from "@/lib/motion-config";
import { getTransition } from "@/lib/motion-config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={getTransition(false, motionTokens.duration.slower)}
          className="fixed inset-0 z-loading flex items-center justify-center bg-background"
        >
          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-8"
          >
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.35em" }}
              transition={getTransition(false, motionTokens.duration.slower)}
            >
              <Logo size="xl" asLink={false} animated />
            </motion.div>

            <motion.div
              className="h-px bg-foreground/20"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 96, opacity: 1 }}
              transition={getTransition(false, motionTokens.duration.slow)}
            />

            <motion.div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1 w-1 rounded-full bg-foreground/40"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    delay: i * motionTokens.delay.sm,
                    ease: motionTokens.ease.inOut,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
