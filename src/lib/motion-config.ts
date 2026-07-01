export const motionTokens = {
  duration: {
    instant: 0.1,
    fast: 0.2,
    normal: 0.35,
    slow: 0.55,
    slower: 0.8,
    page: 0.5,
  },
  delay: {
    none: 0,
    xs: 0.05,
    sm: 0.1,
    md: 0.15,
    lg: 0.25,
    stagger: 0.07,
    staggerChild: 0.08,
  },
  ease: {
    luxury: [0.22, 1, 0.36, 1] as const,
    outExpo: [0.16, 1, 0.3, 1] as const,
    inOut: [0.65, 0, 0.35, 1] as const,
  },
  spring: {
    gentle: { stiffness: 260, damping: 28, mass: 0.8 },
    snappy: { stiffness: 400, damping: 32, mass: 0.6 },
    magnetic: { stiffness: 150, damping: 15, mass: 0.1 },
    cursor: { stiffness: 500, damping: 40, mass: 0.2 },
    cursorRing: { stiffness: 280, damping: 30, mass: 0.4 },
    drawer: { stiffness: 320, damping: 36, mass: 0.9 },
  },
  hover: {
    lift: -3,
    scale: 1.02,
    imageScale: 1.05,
    duration: 0.35,
  },
  magnetic: {
    strength: 0.28,
    maxOffset: 12,
  },
} as const;

export type CursorVariant = "default" | "button" | "link" | "image" | "text" | "hidden";

export function getTransition(
  reducedMotion: boolean,
  duration: number = motionTokens.duration.normal
) {
  if (reducedMotion) {
    return { duration: 0 };
  }
  return {
    duration,
    ease: motionTokens.ease.luxury,
  };
}

export function getSpring(
  reducedMotion: boolean,
  config: keyof typeof motionTokens.spring = "gentle"
) {
  if (reducedMotion) {
    return { duration: 0 };
  }
  return motionTokens.spring[config];
}

export function getViewportMargin(reducedMotion: boolean) {
  return reducedMotion ? "0px" : "-80px";
}

export function getStaggerTransition(reducedMotion: boolean) {
  if (reducedMotion) {
    return { staggerChildren: 0, delayChildren: 0 };
  }
  return {
    staggerChildren: motionTokens.delay.stagger,
    delayChildren: motionTokens.delay.staggerChild,
  };
}
