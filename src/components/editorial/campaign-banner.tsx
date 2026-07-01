import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, Heading, Lead } from "@/components/common/typography";
import { cn } from "@/lib/utils";

interface CampaignBannerProps {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  href: string;
  ctaLabel?: string;
  className?: string;
  reversed?: boolean;
}

export function CampaignBanner({
  eyebrow,
  title,
  body,
  image,
  href,
  ctaLabel = "Explore",
  className,
  reversed,
}: CampaignBannerProps) {
  return (
    <div
      className={cn(
        "grid items-center gap-8 overflow-hidden rounded-[var(--radius-3xl)] border border-border-subtle bg-surface-muted lg:grid-cols-2 lg:gap-0",
        className
      )}
    >
      <div
        className={cn(
          "relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px]",
          reversed && "lg:order-2"
        )}
      >
        <Image src={image} alt={title} fill className="object-cover" sizes="50vw" />
      </div>
      <div className={cn("p-8 lg:p-12", reversed && "lg:order-1")}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading className="mt-3 text-3xl md:text-4xl">{title}</Heading>
        <Lead className="mt-4 text-base">{body}</Lead>
        <Button variant="luxury" className="mt-6" asChild>
          <Link href={href}>
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
