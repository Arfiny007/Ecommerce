import Link from "next/link";
import { Container } from "@/components/common/container";
import { Heading, Body, Eyebrow } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import { NotFoundIllustration } from "@/components/illustrations/not-found-illustration";
import { NOT_FOUND_PAGE } from "@/constants/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Page Not Found",
  description: NOT_FOUND_PAGE.lead,
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <Container className="section-empty flex min-h-[70vh] flex-col items-center justify-center text-center">
      <NotFoundIllustration />
      <Eyebrow className="mt-8">{NOT_FOUND_PAGE.eyebrow}</Eyebrow>
      <Heading className="mt-4">{NOT_FOUND_PAGE.title}</Heading>
      <Body className="mt-4 max-w-md">{NOT_FOUND_PAGE.lead}</Body>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button variant="luxury" asChild>
          <Link href="/">{NOT_FOUND_PAGE.cta}</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/shop">{NOT_FOUND_PAGE.secondaryCta}</Link>
        </Button>
      </div>
    </Container>
  );
}
