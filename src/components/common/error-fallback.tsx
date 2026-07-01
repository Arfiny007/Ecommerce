import Link from "next/link";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

interface ErrorFallbackProps {
  title?: string;
  message?: string;
  reset?: () => void;
}

export function ErrorFallback({
  title = "Something went wrong",
  message = "We encountered an unexpected error. Please try again or return to the homepage.",
  reset,
}: ErrorFallbackProps) {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
        Error
      </p>
      <h1 className="mt-4 font-display text-3xl font-light md:text-4xl">{title}</h1>
      <p className="mt-4 max-w-md text-sm text-muted-foreground">{message}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {reset && (
          <Button variant="luxury" onClick={reset}>
            Try again
          </Button>
        )}
        <Button variant="outline" asChild>
          <Link href="/">Return home</Link>
        </Button>
      </div>
    </Container>
  );
}
