"use client";

import { Section } from "@/components/common/section";
import { JournalPreview } from "@/components/editorial";

export function JournalPreviewSection() {
  return (
    <Section spacing="md" eyebrow="Journal" title="From the Atelier">
      <JournalPreview limit={3} showHeader={false} />
    </Section>
  );
}
