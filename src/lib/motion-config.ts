export const motionTokens = {
  duration: {
    instant: 0.1,
    fast: 0.2,
    normal: 0.35,
    slow: 0.55,
    slower: 0.8,
  },
  ease: {
    luxury: [0.22, 1, 0.36, 1] as const,
    outExpo: [0.16, 1, 0.3, 1] as const,
  },
} as const;

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

export function getViewportMargin(reducedMotion: boolean) {
  return reducedMotion ? "0px" : "-80px";
}
