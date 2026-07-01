"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ScrollRestoration() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reducedMotion ? "instant" : "instant",
    });
  }, [pathname, reducedMotion]);

  return null;
}
