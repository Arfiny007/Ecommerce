import { Container } from "@/components/common/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function RootLoading() {
  return (
    <Container className="section-empty flex min-h-[50vh] flex-col items-center justify-center">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-6 h-10 w-64" />
      <Skeleton className="mt-4 h-5 w-96 max-w-full" />
    </Container>
  );
}
