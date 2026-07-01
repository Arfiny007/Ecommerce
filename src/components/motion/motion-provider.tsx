"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CursorVariant } from "@/lib/motion-config";
import { useIsTouchDevice } from "@/hooks/use-is-touch-device";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface MotionContextValue {
  cursorVariant: CursorVariant;
  setCursorVariant: (variant: CursorVariant) => void;
  cursorEnabled: boolean;
  pointer: { x: number; y: number };
}

const MotionContext = createContext<MotionContextValue | null>(null);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotion();
  const cursorEnabled = !isTouch && !reducedMotion;

  useEffect(() => {
    if (!cursorEnabled) return;

    const onMove = (e: MouseEvent) => {
      setPointer({ x: e.clientX, y: e.clientY });
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const explicit = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (explicit === "hidden") {
        setCursorVariant("hidden");
        return;
      }
      if (explicit === "button" || target.closest("button, [role='button']")) {
        setCursorVariant("button");
        return;
      }
      if (explicit === "image" || target.closest("[data-cursor-image]")) {
        setCursorVariant("image");
        return;
      }
      if (explicit === "text" || target.closest("[data-cursor-text]")) {
        setCursorVariant("text");
        return;
      }
      if (explicit === "link" || target.closest("a")) {
        setCursorVariant("link");
        return;
      }
      setCursorVariant("default");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    document.documentElement.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [cursorEnabled]);

  const value = useMemo(
    () => ({
      cursorVariant,
      setCursorVariant,
      cursorEnabled,
      pointer,
    }),
    [cursorVariant, cursorEnabled, pointer]
  );

  return (
    <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
  );
}

export function useMotion() {
  const ctx = useContext(MotionContext);
  if (!ctx) {
    throw new Error("useMotion must be used within MotionProvider");
  }
  return ctx;
}

export function useMotionSafe() {
  return useContext(MotionContext);
}
