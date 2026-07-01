"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const CRITICAL_ROUTES = ["/shop", "/cart"] as const;

/** Prefetch high-traffic routes after initial paint */
export function RoutePrefetch() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      CRITICAL_ROUTES.forEach((route) => {
        router.prefetch(route);
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return null;
}
