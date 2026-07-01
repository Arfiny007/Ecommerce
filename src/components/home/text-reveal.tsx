"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { luxuryEase } from "@/lib/animations";
import { motionTokens } from "@/lib/motion-config";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p" | "span";
}

export function TextReveal({
  children,
  className,
  delay = 0,
  as: Tag = "span",
}: TextRevealProps) {
  const reducedMotion = useReducedMotion();
  const words = children.split(" ");

  if (reducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag className={cn("inline-flex flex-wrap gap-x-[0.3em]", className)}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: motionTokens.duration.slower,
              delay: delay + i * motionTokens.delay.stagger,
              ease: luxuryEase,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

interface LineRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function LineReveal({ children, className, delay = 0 }: LineRevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: motionTokens.duration.slower, delay, ease: luxuryEase }}
      >
        {children}
      </motion.div>
    </div>
  );
}
