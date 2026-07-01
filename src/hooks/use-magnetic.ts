"use client";

import { useCallback, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { motionTokens } from "@/lib/motion-config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsTouchDevice } from "@/hooks/use-is-touch-device";

interface UseMagneticOptions {
  strength?: number;
  maxOffset?: number;
}

export function useMagnetic({
  strength = motionTokens.magnetic.strength,
  maxOffset = motionTokens.magnetic.maxOffset,
}: UseMagneticOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, motionTokens.spring.magnetic);
  const springY = useSpring(y, motionTokens.spring.magnetic);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || reducedMotion || isTouch) return;
      const rect = ref.current.getBoundingClientRect();
      const offsetX = e.clientX - (rect.left + rect.width / 2);
      const offsetY = e.clientY - (rect.top + rect.height / 2);
      const clamp = (v: number) =>
        Math.max(-maxOffset, Math.min(maxOffset, v * strength));
      x.set(clamp(offsetX));
      y.set(clamp(offsetY));
    },
    [isTouch, maxOffset, reducedMotion, strength, x, y]
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const disabled = reducedMotion || isTouch;

  return {
    ref,
    style: disabled ? undefined : { x: springX, y: springY },
    onMouseMove: disabled ? undefined : onMouseMove,
    onMouseLeave: disabled ? undefined : onMouseLeave,
  };
}
