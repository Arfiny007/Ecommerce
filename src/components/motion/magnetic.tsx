"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useMagnetic } from "@/hooks/use-magnetic";
import { cn } from "@/lib/utils";

interface MagneticProps extends HTMLMotionProps<"div"> {
  strength?: number;
  maxOffset?: number;
}

export function Magnetic({
  children,
  className,
  strength,
  maxOffset,
  ...props
}: MagneticProps) {
  const magnetic = useMagnetic({ strength, maxOffset });

  return (
    <motion.div
      ref={magnetic.ref as React.RefObject<HTMLDivElement>}
      style={magnetic.style}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      className={cn("inline-flex gpu-accelerated", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
