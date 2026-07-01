"use client";

import { motion, useSpring } from "framer-motion";
import { motionTokens } from "@/lib/motion-config";
import { useMotion } from "@/components/motion/motion-provider";

const variantStyles = {
  default: { scale: 1, ring: 32, dot: 4 },
  button: { scale: 1.6, ring: 48, dot: 0 },
  link: { scale: 1.3, ring: 36, dot: 3 },
  image: { scale: 2, ring: 56, dot: 0 },
  text: { scale: 0.8, ring: 24, dot: 6 },
  hidden: { scale: 0, ring: 0, dot: 0 },
};

export function CustomCursor() {
  const { cursorEnabled, cursorVariant, pointer } = useMotion();

  const springConfig = motionTokens.spring.cursor;
  const ringConfig = motionTokens.spring.cursorRing;

  const x = useSpring(pointer.x, springConfig);
  const y = useSpring(pointer.y, springConfig);
  const ringX = useSpring(pointer.x, ringConfig);
  const ringY = useSpring(pointer.y, ringConfig);

  if (!cursorEnabled) return null;

  const style = variantStyles[cursorVariant];
  const visible = cursorVariant !== "hidden";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[200]"
      aria-hidden
    >
      <motion.div
        className="absolute rounded-[var(--radius-full)] border border-foreground/25 mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          width: style.ring,
          height: style.ring,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
          scale: style.scale,
        }}
        transition={{ type: "spring", ...ringConfig }}
      />
      <motion.div
        className="absolute rounded-[var(--radius-full)] bg-foreground mix-blend-difference"
        style={{
          x,
          y,
          width: style.dot,
          height: style.dot,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", ...springConfig }}
      />
    </div>
  );
}
