import Link from "next/link";
import { Container } from "@/components/common/container";
import { Heading, Body, Eyebrow } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import { MaintenanceIllustration } from "@/components/illustrations/maintenance-illustration";
import { MAINTENANCE_PAGE } from "@/constants/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Maintenance",
  description: MAINTENANCE_PAGE.lead,
  path: "/maintenance",
  noIndex: true,
});

export default function MaintenancePage() {
  return (
    <Container className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <MaintenanceIllustration />
      <Eyebrow className="mt-8">{MAINTENANCE_PAGE.eyebrow}</Eyebrow>
      <Heading className="mt-4">{MAINTENANCE_PAGE.title}</Heading>
      <Body className="mt-4 max-w-md">{MAINTENANCE_PAGE.lead}</Body>
      <Body className="mt-2 max-w-md text-xs">{MAINTENANCE_PAGE.body}</Body>
      <Button variant="luxury" className="mt-8" asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </Container>
  );
}
