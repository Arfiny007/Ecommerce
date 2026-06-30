import Link from "next/link";
import { Container } from "@/components/common/container";
import { Heading, Body } from "@/components/common/typography";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
        404
      </p>
      <Heading className="mt-4">Page Not Found</Heading>
      <Body className="mt-4 max-w-md">
        The page you are looking for does not exist or has been moved.
      </Body>
      <Button variant="luxury" className="mt-8" asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </Container>
  );
}
