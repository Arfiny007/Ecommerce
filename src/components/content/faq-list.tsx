"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/constants/content/support";

interface FaqListProps {
  items: FaqItem[];
}

export function FaqList({ items }: FaqListProps) {
  const categories = [...new Set(items.map((i) => i.category))];

  return (
    <div className="mx-auto max-w-3xl space-y-12">
      {categories.map((category) => (
        <div key={category}>
          <h3 className="mb-4 text-xs font-medium uppercase tracking-editorial text-muted-foreground">
            {category}
          </h3>
          <Accordion type="single" collapsible className="rounded-[var(--radius-xl)] border border-border-subtle px-4">
            {items
              .filter((i) => i.category === category)
              .map((item) => (
                <AccordionItem key={item.question} value={item.question}>
                  <AccordionTrigger className="text-left text-sm md:text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
