"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import {
  fadeIn,
  fadeInUp,
  scaleIn,
  blurReveal,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

type AnimationVariant = "fade" | "fadeUp" | "scale" | "blur" | "stagger" | "staggerItem";

const variantMap = {
  fade: fadeIn,
  fadeUp: fadeInUp,
  scale: scaleIn,
  blur: blurReveal,
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
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={variantMap[variant]}
      transition={{ delay }}
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
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
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
