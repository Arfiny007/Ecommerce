"use client";

import { useEffect } from "react";
import { ErrorFallback } from "@/components/common/error-fallback";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <ErrorFallback
      reset={reset}
      message="A section of the page failed to load. You can retry or navigate elsewhere."
    />
  );
}
