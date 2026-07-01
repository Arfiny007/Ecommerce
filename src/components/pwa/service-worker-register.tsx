"use client";

import { useEffect } from "react";

const SW_PATH = "/sw.js";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("serviceWorker" in navigator) ||
      process.env.NODE_ENV !== "production"
    ) {
      return;
    }

    navigator.serviceWorker
      .register(SW_PATH, { scope: "/" })
      .catch(() => {
        // SW registration is best-effort
      });
  }, []);

  return null;
}
