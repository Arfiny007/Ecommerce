"use client";

import { ErrorFallback } from "@/components/common/error-fallback";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-background font-sans antialiased">
        <ErrorFallback
          title="Application error"
          message="FINY FASHIONS encountered a critical error. Please refresh the page."
          reset={reset}
        />
      </body>
    </html>
  );
}
