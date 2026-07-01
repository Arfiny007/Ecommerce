"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CAMPAIGN_STORY } from "@/constants/editorial";
import { Section } from "@/components/common/section";
import { Body, Eyebrow, Heading } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import { EditorialQuote, ImageCollage } from "@/components/editorial";

export function CampaignStorySection() {
  return (
    <Section spacing="md" background="muted">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Eyebrow>{CAMPAIGN_STORY.eyebrow}</Eyebrow>
          <Heading className="mt-3">{CAMPAIGN_STORY.title}</Heading>
          <Body className="mt-4">{CAMPAIGN_STORY.lead}</Body>
          <Body className="mt-4">{CAMPAIGN_STORY.body}</Body>
          <div className="mt-6">
            <EditorialQuote
              text={CAMPAIGN_STORY.quote}
              attribution={CAMPAIGN_STORY.attribution}
              variant="inline"
            />
          </div>
          <Button variant="luxury" className="mt-8" asChild>
            <Link href={CAMPAIGN_STORY.cta.href}>
              {CAMPAIGN_STORY.cta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="lg:col-span-7">
          <ImageCollage
            images={CAMPAIGN_STORY.images.map((img) => ({
              src: img.src,
              alt: img.alt,
            }))}
          />
        </div>
      </div>
    </Section>
  );
}
