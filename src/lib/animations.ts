import type { Variants, Transition } from "framer-motion";
import { motionTokens } from "@/lib/motion-config";

const { duration, ease, delay } = motionTokens;

const luxuryTransition = (d: number = duration.normal): Transition => ({
  duration: d,
  ease: ease.luxury,
});

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: luxuryTransition(duration.slow),
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: luxuryTransition(duration.slower),
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: luxuryTransition(duration.slower),
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: luxuryTransition(duration.slow),
  },
};

export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: luxuryTransition(duration.slower),
  },
};

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: luxuryTransition(duration.slower),
  },
};

export const textReveal: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: luxuryTransition(duration.slow),
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: luxuryTransition(duration.slow),
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: luxuryTransition(duration.slow),
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: delay.stagger,
      delayChildren: delay.staggerChild,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: luxuryTransition(duration.normal),
  },
};

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    scale: 0.985,
    filter: "blur(6px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: luxuryTransition(duration.page),
  },
  exit: {
    opacity: 0,
    scale: 1.008,
    filter: "blur(4px)",
    transition: luxuryTransition(duration.fast),
  },
};

export const drawerItem: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      ...luxuryTransition(duration.normal),
      delay: i * delay.xs,
    },
  }),
  exit: { opacity: 0, x: 16, transition: luxuryTransition(duration.fast) },
};

export const buttonInteraction = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: motionTokens.hover.lift,
    transition: luxuryTransition(motionTokens.hover.duration),
  },
  tap: { scale: 0.97, transition: luxuryTransition(duration.instant) },
};

export const hoverLift = {
  rest: { y: 0, boxShadow: "var(--shadow-subtle)" },
  hover: {
    y: motionTokens.hover.lift,
    boxShadow: "var(--shadow-elevated)",
    transition: luxuryTransition(duration.fast),
  },
};

export const luxuryEase = ease.luxury;
export const defaultTransition = luxuryTransition();
