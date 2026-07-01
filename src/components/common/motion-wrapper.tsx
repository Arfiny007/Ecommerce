"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import {
  fadeIn,
  fadeInUp,
  scaleIn,
  blurReveal,
  imageReveal,
  textReveal,
  slideInRight,
  slideInLeft,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";
import { getTransition, getViewportMargin } from "@/lib/motion-config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type AnimationVariant =
  | "fade"
  | "fadeUp"
  | "scale"
  | "blur"
  | "image"
  | "text"
  | "slideRight"
  | "slideLeft"
  | "stagger"
  | "staggerItem";

const variantMap = {
  fade: fadeIn,
  fadeUp: fadeInUp,
  scale: scaleIn,
  blur: blurReveal,
  image: imageReveal,
  text: textReveal,
  slideRight: slideInRight,
  slideLeft: slideInLeft,
  stagger: staggerContainer,
  staggerItem: staggerItem,
};

interface MotionWrapperProps extends HTMLMotionProps<"div"> {
  variant?: AnimationVariant;
  delay?: number;
  once?: boolean;
}

export function MotionWrapper({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
  once = true,
  ...props
}: MotionWrapperProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : "hidden"}
      whileInView={reducedMotion ? undefined : "visible"}
      viewport={{ once, margin: getViewportMargin(reducedMotion) }}
      variants={variantMap[variant]}
      transition={{ ...getTransition(reducedMotion), delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionStagger({
  children,
  className,
  once = true,
  ...props
}: HTMLMotionProps<"div"> & { once?: boolean }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : "hidden"}
      whileInView={reducedMotion ? undefined : "visible"}
      viewport={{ once, margin: getViewportMargin(reducedMotion) }}
      variants={staggerContainer}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={staggerItem} className={cn(className)} {...props}>
      {children}
    </motion.div>
  );
}
