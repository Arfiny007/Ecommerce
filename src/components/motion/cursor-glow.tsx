"use client";

import { motion } from "framer-motion";
import { useMotionSafe } from "@/components/motion/motion-provider";

export function CursorGlow() {
  const motionCtx = useMotionSafe();

  if (!motionCtx?.cursorEnabled) return null;

  const { pointer } = motionCtx;

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute h-[480px] w-[480px] rounded-[var(--radius-full)] opacity-30"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--champagne) 18%, transparent) 0%, transparent 70%)",
          left: pointer.x,
          top: pointer.y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          left: pointer.x,
          top: pointer.y,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 28, mass: 0.6 }}
      />
    </div>
  );
}
